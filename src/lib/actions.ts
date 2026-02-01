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


const SignupSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export type SignupState = {
  message?: string | null;
  errors?: {
    fullName?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  isSuccess?: boolean;
};

export async function handleSignup(prevState: SignupState, formData: FormData): Promise<SignupState> {
  const validatedFields = SignupSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input.",
    };
  }
  
  const { fullName, email, password } = validatedFields.data;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { errors: { _form: ["Server is not configured for authentication."] } };
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  
  if (listError) {
      return { errors: { _form: [`Database error: ${listError.message}`] } };
  }

  const role = users.length === 0 ? 'admin' : 'user';

  const { error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
          full_name: fullName,
          role: role,
      }
  });

  if (error) {
    if (error.message.includes('User with this email already exists')) {
      return {
        errors: {
          email: ['A user with this email already exists.'],
        },
      };
    }
    return { errors: { _form: [`Signup failed: ${error.message}`] } };
  }
  
  const successMessage = role === 'admin' 
    ? 'Signup successful! As the first user, you have been assigned the admin role. Please log in.' 
    : 'Signup successful! Please log in.';

  return { isSuccess: true, message: successMessage };
}

const InquirySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  mobile: z.string().optional(),
  purpose: z.string().min(1, { message: "Please select a purpose." }),
  vision: z.string().min(10, { message: "Vision must be at least 10 characters long." }),
  userId: z.string().optional(),
});

export type InquiryState = {
  message?: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    mobile?: string[];
    purpose?: string[];
    vision?: string[];
    _form?: string[];
  };
  isSuccess?: boolean;
};

export async function handleInquiry(prevState: InquiryState, formData: FormData): Promise<InquiryState> {
  const validatedFields = InquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    mobile: formData.get("mobile"),
    purpose: formData.get("purpose"),
    vision: formData.get("vision"),
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, mobile, purpose, vision, userId } = validatedFields.data;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    return { errors: { _form: ["Server is not configured for database operations."] } };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const insertData: any = { name, email, mobile, purpose, vision };
  if (userId) {
    insertData.user_id = userId;
  }

  const { error } = await supabase.from('inquiries').insert([insertData]);

  if (error) {
    let errorMessage = `Failed to submit inquiry: ${error.message}`;
    if (error.message.includes('inquiries') && (error.message.includes('does not exist') || error.message.includes('schema cache'))) {
        errorMessage = "The 'inquiries' table does not seem to exist in your database. An administrator needs to create it.";
    } else if (error.message.includes('violates row-level security policy')) {
        errorMessage = "Row-level security is preventing the submission. Please check the policies for the 'inquiries' table.";
    }
    return { errors: { _form: [errorMessage] } };
  }

  revalidatePath('/dashboard/inquiries');
  return { isSuccess: true, message: "Your inquiry has been submitted successfully! We will get back to you shortly." };
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

export async function updateUserName(userId: string, fullName: string): Promise<{ error?: string; success?: boolean }> {
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
    { user_metadata: { ...user.user_metadata, full_name: fullName } }
  );

  if (error) {
    return { error: `Failed to update user name: ${error.message}` };
  }

  revalidatePath('/dashboard/users');
  return { success: true };
}


export async function deleteUser(userId: string): Promise<{ error?: string; success?: boolean }> {
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

  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    return { error: `Failed to delete user: ${error.message}` };
  }

  revalidatePath('/dashboard/users');
  return { success: true };
}
