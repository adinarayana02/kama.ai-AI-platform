import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  work_type: string;
  salary_range: string | null;
  description: string;
  requirements: string;
  responsibilities: string;
  status: 'active' | 'draft' | 'closed';
  created_by: string;
  created_at: string | null;
  updated_at: string | null;
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Initial fetch of jobs
    fetchJobs();

    // Set up real-time subscription
    const subscription = supabase
      .channel('jobs_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen for all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'jobs',
          filter: `created_by=eq.${user.id}` // Changed from company_id to created_by
        },
        (payload) => {
          console.log('Real-time update:', payload);
          
          if (payload.eventType === 'INSERT') {
            // Add new job to the list
            setJobs(prev => [payload.new as Job, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            // Update existing job
            setJobs(prev => prev.map(job => 
              job.id === payload.new.id ? payload.new as Job : job
            ));
          } else if (payload.eventType === 'DELETE') {
            // Remove deleted job
            setJobs(prev => prev.filter(job => job.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('created_by', user?.id) // Changed from company_id to created_by
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      setJobs(data || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData: {
    title: string;
    location: string;
    work_type: string;
    description: string;
    requirements: string;
    salary_min: number;
    salary_max: number;
    company_id: string;
  }) => {
    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      // Get company name from hiring_teams table
      const { data: teamData, error: teamError } = await supabase
        .from('hiring_teams')
        .select('company_name')
        .eq('id', user.id)
        .single();

      if (teamError) {
        console.error('Error fetching company name:', teamError);
        throw new Error('Failed to fetch company information');
      }

      // Format the data to match the database schema
      const formattedData = {
        title: jobData.title,
        company: teamData?.company_name || 'Company Name',
        location: jobData.location,
        job_type: jobData.work_type,
        description: jobData.description,
        requirements: jobData.requirements,
        salary: `${jobData.salary_min}-${jobData.salary_max}`,
        created_by: user.id,
        posted_date: new Date().toISOString()
      };

      console.log('Creating job with data:', formattedData); // Add logging

      const { data, error } = await supabase
        .from('jobs')
        .insert([formattedData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message || 'Failed to create job');
      }

      if (!data) {
        throw new Error('No data returned after job creation');
      }

      console.log('Job created successfully:', data); // Add logging
      return data;
    } catch (err) {
      console.error('Error creating job:', err);
      throw err instanceof Error ? err : new Error('Failed to create job');
    }
  };

  return {
    jobs,
    loading,
    error,
    createJob,
    refreshJobs: fetchJobs
  };
} 