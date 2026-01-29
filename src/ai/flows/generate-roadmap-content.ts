'use server';

/**
 * @fileOverview A roadmap content generation AI agent.
 *
 * - generateRoadmapContent - A function that handles the roadmap content generation process.
 * - GenerateRoadmapContentInput - The input type for the generateRoadmapContent function.
 * - GenerateRoadmapContentOutput - The return type for the generateRoadmapContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRoadmapContentInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate a roadmap.'),
});
export type GenerateRoadmapContentInput = z.infer<typeof GenerateRoadmapContentInputSchema>;

const GenerateRoadmapContentOutputSchema = z.object({
  roadmap: z.array(
    z.object({
      milestone: z.string().describe('A key milestone in the roadmap.'),
      description: z.string().describe('A brief description of the milestone.'),
    })
  ).describe('A list of milestones and descriptions for the roadmap.'),
});
export type GenerateRoadmapContentOutput = z.infer<typeof GenerateRoadmapContentOutputSchema>;

export async function generateRoadmapContent(input: GenerateRoadmapContentInput): Promise<GenerateRoadmapContentOutput> {
  return generateRoadmapContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRoadmapContentPrompt',
  input: {schema: GenerateRoadmapContentInputSchema},
  output: {schema: GenerateRoadmapContentOutputSchema},
  prompt: `You are an expert in creating roadmaps for various topics.

  Based on the topic provided, generate a roadmap with key milestones and descriptions.

  Topic: {{{topic}}}

  Format the roadmap as a JSON array of objects, where each object has a milestone and a description field.
  Make sure the milestone field is a short title. Each description should contain a short summary of the task.
  Try to make it 5-10 milestones.

  Here is an example of the format that you need to use:
  [
    {
      "milestone": "Milestone 1",
      "description": "Description of milestone 1.",
    },
    {
      "milestone": "Milestone 2",
      "description": "Description of milestone 2.",
    }
  ]
  `,
});

const generateRoadmapContentFlow = ai.defineFlow(
  {
    name: 'generateRoadmapContentFlow',
    inputSchema: GenerateRoadmapContentInputSchema,
    outputSchema: GenerateRoadmapContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
