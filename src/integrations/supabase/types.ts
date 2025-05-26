export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          candidate_id: string | null
          cover_letter: string | null
          created_at: string | null
          id: string
          job_id: string | null
          resume_url: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          candidate_id?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          resume_url?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          candidate_id?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          resume_url?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_profiles: {
        Row: {
          created_at: string | null
          education: string | null
          email: string
          experience: string | null
          full_name: string
          id: string
          resume_url: string | null
          skills: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          education?: string | null
          email: string
          experience?: string | null
          full_name: string
          id?: string
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          education?: string | null
          email?: string
          experience?: string | null
          full_name?: string
          id?: string
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      candidates: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          password: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          password: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          password?: string
        }
        Relationships: []
      }
      hiring_teams: {
        Row: {
          company_name: string
          created_at: string | null
          full_name: string
          id: string
          password: string
          work_email: string
        }
        Insert: {
          company_name: string
          created_at?: string | null
          full_name: string
          id?: string
          password: string
          work_email: string
        }
        Update: {
          company_name?: string
          created_at?: string | null
          full_name?: string
          id?: string
          password?: string
          work_email?: string
        }
        Relationships: []
      }
      interview_questions: {
        Row: {
          context: string | null
          created_at: string | null
          id: string
          interview_id: string | null
          question: string
        }
        Insert: {
          context?: string | null
          created_at?: string | null
          id?: string
          interview_id?: string | null
          question: string
        }
        Update: {
          context?: string | null
          created_at?: string | null
          id?: string
          interview_id?: string | null
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_questions_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_responses: {
        Row: {
          audio_url: string | null
          candidate_id: string | null
          created_at: string | null
          evaluation: string | null
          id: string
          interview_id: string | null
          question_id: string | null
          response: string
          transcription: string | null
        }
        Insert: {
          audio_url?: string | null
          candidate_id?: string | null
          created_at?: string | null
          evaluation?: string | null
          id?: string
          interview_id?: string | null
          question_id?: string | null
          response: string
          transcription?: string | null
        }
        Update: {
          audio_url?: string | null
          candidate_id?: string | null
          created_at?: string | null
          evaluation?: string | null
          id?: string
          interview_id?: string | null
          question_id?: string | null
          response?: string
          transcription?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "interview_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          application_id: string | null
          completed_at: string | null
          created_at: string | null
          feedback: string | null
          id: string
          scheduled_date: string | null
          score: number | null
          status: string
          updated_at: string | null
        }
        Insert: {
          application_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          scheduled_date?: string | null
          score?: number | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          application_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          scheduled_date?: string | null
          score?: number | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interviews_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      job_matches: {
        Row: {
          candidate_id: string
          created_at: string | null
          factors: Json | null
          id: string
          job_id: string | null
          match_score: number | null
          updated_at: string | null
        }
        Insert: {
          candidate_id: string
          created_at?: string | null
          factors?: Json | null
          id?: string
          job_id?: string | null
          match_score?: number | null
          updated_at?: string | null
        }
        Update: {
          candidate_id?: string
          created_at?: string | null
          factors?: Json | null
          id?: string
          job_id?: string | null
          match_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_matches_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_skills: {
        Row: {
          created_at: string | null
          id: string
          job_id: string | null
          skill: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          skill: string
        }
        Update: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          skill?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_skills_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          ai_generated: boolean | null
          ai_prompt: string | null
          company: string
          created_at: string | null
          created_by: string | null
          description: string
          id: string
          job_type: string
          location: string
          posted_date: string | null
          requirements: string
          salary: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          ai_generated?: boolean | null
          ai_prompt?: string | null
          company: string
          created_at?: string | null
          created_by?: string | null
          description: string
          id?: string
          job_type: string
          location: string
          posted_date?: string | null
          requirements: string
          salary?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          ai_generated?: boolean | null
          ai_prompt?: string | null
          company?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          id?: string
          job_type?: string
          location?: string
          posted_date?: string | null
          requirements?: string
          salary?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_job_match_score: {
        Args: {
          p_job_id: string
          p_candidate_skills: string[]
          p_candidate_experience: string
          p_job_requirements: string
          p_job_skills: string[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
