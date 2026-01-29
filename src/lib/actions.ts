// @ts-nocheck
"use server";

import { generateRoadmapContent } from "@/ai/flows/generate-roadmap-content";
import { z } from "zod";
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const RoadmapSchema = z.object({
  topic: z.string().min(3, { message: "Topic must be at least 3 characters long." }),
});

export type RoadmapState = {
  message?: string | null;
  errors?: {
    topic?: string[];
  };
  roadmap?: {
    milestone: string;
    description: string;
  }[] | null;
  isSubmitting?: boolean;
  isSuccess?: boolean;
};

export async function handleGenerateRoadmap(prevState: RoadmapState, formData: FormData): Promise<RoadmapState> {
  const validatedFields = RoadmapSchema.safeParse({
    topic: formData.get("topic"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input.",
    };
  }

  const { topic } = validatedFields.data;

  try {
    const { roadmap } = await generateRoadmapContent({ topic });
    if (roadmap && roadmap.length > 0) {
      return {
        message: "Roadmap generated successfully!",
        roadmap,
        isSuccess: true,
      };
    } else {
       return { message: "Failed to generate roadmap. The AI returned an empty result.", isSuccess: false };
    }
  } catch (error) {
    console.error("Roadmap generation failed:", error);
    return { message: "An unexpected error occurred. Please try again later.", isSuccess: false };
  }
}


export async function updateUserRole(userId: string, role: 'admin' | 'user'): Promise<{ error?: string; success?: boolean }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { error: 'Supabase admin credentials are not configured.' };
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { data: { user }, error: fetchError } = await supabaseAdmin.auth.admin.getUserById(userId);

  if (fetchError) {
    return { error: `Failed to fetch user: ${fetchError.message}` };
  }
  
  const { error } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    { user_metadata: { ...user.user_metadata, role: role } }
  );

  if (error) {
    return { error: `Failed to update user role: ${error.message}` };
  }

  revalidatePath('/dashboard/users');
  return { success: true };
}
