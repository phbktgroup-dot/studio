
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
  mobileNumber: z.string().min(10, { message: "Mobile number must be at least 10 digits." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters." })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export type SignupState = {
  message?: string | null;
  errors?: {
    fullName?: string[];
    mobileNumber?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
  isSuccess?: boolean;
};

export async function handleSignup(prevState: SignupState, formData: FormData): Promise<SignupState> {
  const validatedFields = SignupSchema.safeParse({
    fullName: formData.get("fullName"),
    mobileNumber: formData.get("mobileNumber"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { fullName, mobileNumber, email, password } = validatedFields.data;
  
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

  const { error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      phone: mobileNumber,
      email_confirm: true,
      user_metadata: {
          full_name: fullName,
          role: 'user',
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
  
  const successMessage = 'Signup successful! Please log in.';

  return { isSuccess: true, message: successMessage };
}

const InquirySchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  industry: z.string().min(1, { message: "Please select an industry." }),
  help: z.string().min(10, { message: "Message must be at least 10 characters long." }),
  userId: z.string().optional(),
});

export type InquiryState = {
  message?: string | null;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    industry?: string[];
    help?: string[];
    _form?: string[];
  };
  isSuccess?: boolean;
};

export async function handleInquiry(prevState: InquiryState, formData: FormData): Promise<InquiryState> {
  const validatedFields = InquirySchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    industry: formData.get("industry"),
    help: formData.get("help"),
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email, industry, help, userId } = validatedFields.data;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    return { errors: { _form: ["Server is not configured for database operations."] } };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const insertData: any = { 
    name: `${firstName} ${lastName}`, 
    email,
    purpose: industry,
    vision: help,
  };
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
