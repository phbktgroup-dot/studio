
'use client';

import { useState, useActionState, useRef, useEffect } from 'react';
import { SquarePen, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { updateInquiryResolution, type ResolutionState } from '@/lib/actions';
import { useFormStatus } from 'react-dom';
import { Label } from '@/components/ui/label';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Save Resolution
    </Button>
  );
}

export function ResolutionDialog({ inquiryId, resolution }: { inquiryId: string, resolution?: string | null }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  const initialState: ResolutionState = { message: null, errors: {}, isSuccess: false };
  const [state, dispatch] = useActionState(updateInquiryResolution, initialState);

  useEffect(() => {
    if (state.isSuccess) {
      toast({
        title: 'Resolution Saved',
        description: state.message,
      });
      setOpen(false);
      formRef.current?.reset();
    } else if (state.message && !state.isSuccess && state.errors) {
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: state.message || state.errors?.resolution?.[0],
      });
    }
  }, [state, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <SquarePen className="h-3.5 w-3.5" />
          <span className="sr-only">Add/Edit Resolution</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inquiry Resolution</DialogTitle>
          <DialogDescription>
            Provide a resolution or notes for this inquiry. This will be visible to the user.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={dispatch}>
            <input type="hidden" name="inquiryId" value={inquiryId} />
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="resolution-text" className="sr-only">Resolution Details</Label>
                    <Textarea
                        id="resolution-text"
                        name="resolution"
                        defaultValue={resolution || ''}
                        className="min-h-[120px]"
                        placeholder="Type resolution details here..."
                        aria-describedby='resolution-error'
                    />
                    {state.errors?.resolution && <p id="resolution-error" className="text-sm text-destructive mt-1">{state.errors.resolution[0]}</p>}
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <SubmitButton />
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
