// @ts-nocheck
"use server";

import { generateRoadmapContent } from "@/ai/flows/generate-roadmap-content";
import { z } from "zod";

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
