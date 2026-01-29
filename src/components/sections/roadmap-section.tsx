// @ts-nocheck
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { handleGenerateRoadmap, type RoadmapState } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Wand2, PartyPopper, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Roadmap
        </>
      )}
    </Button>
  );
}

function Milestone({ milestone, description, index, isActive }) {
    return (
        <div className="flex items-start gap-4 relative pl-8">
            <div className={cn(
                "absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-500",
                isActive ? "border-primary bg-primary" : "border-border bg-muted"
            )}>
                {isActive && <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>}
            </div>
            <div className="flex-1 pb-12">
                <h4 className={cn(
                    "font-semibold font-headline transition-colors",
                    isActive ? "text-primary" : "text-foreground"
                )}>
                    {milestone}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}

export default function RoadmapSection() {
  const initialState: RoadmapState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(handleGenerateRoadmap, initialState);
  const { toast } = useToast();
  const [activeMilestone, setActiveMilestone] = useState(0);
  const roadmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.message && !state.isSuccess) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  useEffect(() => {
    const handleScroll = () => {
        if (!roadmapRef.current || !state.roadmap) return;
        const milestones = roadmapRef.current.children;
        const containerTop = roadmapRef.current.getBoundingClientRect().top;
        const scrollPosition = window.innerHeight * 0.4; // 40% from top
        
        for (let i = 0; i < milestones.length; i++) {
            const milestoneTop = milestones[i].getBoundingClientRect().top;
            if (milestoneTop < scrollPosition) {
                setActiveMilestone(i);
            }
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [state.roadmap]);

  return (
    <section id="roadmap" className="py-20 md:py-32 bg-background">
      <div className="container max-w-3xl text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          AI-Powered Business Roadmap
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Enter a business idea, a project, or a goal, and our AI will generate a strategic roadmap to guide your journey to success.
        </p>
        <form action={dispatch} className="mt-8 flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <div className="flex-grow">
            <Input
              name="topic"
              placeholder="e.g., 'Launch a SaaS for project management'"
              aria-describedby="topic-error"
              className="h-12 text-base"
            />
            {state.errors?.topic && (
              <p id="topic-error" className="text-sm text-destructive mt-1 text-left">
                {state.errors.topic[0]}
              </p>
            )}
          </div>
          <SubmitButton />
        </form>

        <div className="mt-16 text-left relative">
          {state.roadmap && state.roadmap.length > 0 && (
            <div ref={roadmapRef} className="relative">
                <div className="absolute left-[9px] top-0 h-full w-0.5 bg-border -z-10"></div>
                {state.roadmap.map((item, index) => (
                    <Milestone key={index} index={index} {...item} isActive={index <= activeMilestone} />
                ))}
            </div>
          )}
          {state.isSuccess === false && state.message && (
             <Card className="border-destructive/50 bg-destructive/10">
                <CardContent className="p-6 flex items-center gap-4">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                    <div>
                        <h3 className="font-semibold text-destructive">Roadmap Generation Failed</h3>
                        <p className="text-sm text-destructive/80">{state.message}</p>
                    </div>
                </CardContent>
             </Card>
          )}
        </div>

      </div>
    </section>
  );
}
