import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Application {
  id: string;
  job_id: string;
  candidate_id: string | null;
  status: string;
  cover_letter: string | null;
  resume_url: string | null;
  created_at: string | null;
  updated_at: string | null;
  job?: {
    title: string;
    company: string;
  };
  candidate?: {
    full_name: string;
    email: string;
  };
}

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Initial fetch of applications
    fetchApplications();

    // Set up real-time subscription
    const subscription = supabase
      .channel('applications_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'applications',
          filter: `job_id=in.(${getJobIds()})` // Listen to applications for all jobs created by this user
        },
        (payload) => {
          console.log('Real-time application update:', payload);
          
          if (payload.eventType === 'INSERT') {
            // Add new application to the list
            fetchApplicationDetails(payload.new as Application).then(app => {
              if (app) setApplications(prev => [app, ...prev]);
            });
          } else if (payload.eventType === 'UPDATE') {
            // Update existing application
            fetchApplicationDetails(payload.new as Application).then(app => {
              if (app) {
                setApplications(prev => prev.map(application => 
                  application.id === app.id ? app : application
                ));
              }
            });
          } else if (payload.eventType === 'DELETE') {
            // Remove deleted application
            setApplications(prev => prev.filter(app => app.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const getJobIds = async () => {
    const { data: jobs } = await supabase
      .from('jobs')
      .select('id')
      .eq('created_by', user?.id);
    return jobs?.map(job => job.id).join(',') || '';
  };

  const fetchApplicationDetails = async (application: Application) => {
    try {
      // Fetch job details
      const { data: jobData } = await supabase
        .from('jobs')
        .select('title, company')
        .eq('id', application.job_id)
        .single();

      // Fetch candidate details if available
      let candidateData = null;
      if (application.candidate_id) {
        const { data } = await supabase
          .from('candidate_profiles')
          .select('full_name, email')
          .eq('user_id', application.candidate_id)
          .single();
        candidateData = data;
      }

      return {
        ...application,
        job: jobData,
        candidate: candidateData
      };
    } catch (err) {
      console.error('Error fetching application details:', err);
      return null;
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      
      // First get all jobs created by this user
      const { data: jobs } = await supabase
        .from('jobs')
        .select('id')
        .eq('created_by', user?.id);

      if (!jobs?.length) {
        setApplications([]);
        return;
      }

      // Then get all applications for these jobs
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .in('job_id', jobs.map(job => job.id))
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch details for each application
      const applicationsWithDetails = await Promise.all(
        (data || []).map(app => fetchApplicationDetails(app))
      );

      setApplications(applicationsWithDetails.filter((app): app is Application => app !== null));
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  return {
    applications,
    loading,
    error,
    refreshApplications: fetchApplications
  };
} 