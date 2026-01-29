'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function HomeSectionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a video file to upload.',
      });
      return;
    }

    setLoading(true);

    try {
      // 1. Upload video to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('public-assets') // Assumes a public bucket named 'public-assets'
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // 2. Get the public URL of the uploaded video
      const { data: urlData } = supabase.storage
        .from('public-assets')
        .getPublicUrl(fileName);

      if (!urlData.publicUrl) {
          throw new Error("Could not get public URL for the uploaded file.");
      }
      
      // 3. Save the public URL to the 'settings' table
      // Assumes a table 'settings' with a single row (id=1)
      const { error: dbError } = await supabase
        .from('settings')
        .update({ hero_video_url: urlData.publicUrl })
        .eq('id', 1)
        .single(); // Use single() if you expect only one row to be updated.

      if (dbError) {
        // If the row doesn't exist, insert it.
        if (dbError.code === 'PGRST116') { // 'PGRST116' is the code for "Not a single row was returned"
             const { error: insertError } = await supabase
                .from('settings')
                .insert({ id: 1, hero_video_url: urlData.publicUrl });
            if (insertError) {
                throw insertError;
            }
        } else {
            throw dbError;
        }
      }

      toast({
        title: 'Upload Successful',
        description: 'Your hero section video has been updated.',
      });

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: error.message || 'An unexpected error occurred. Make sure the storage bucket and settings table are configured correctly in Supabase.',
      });
    } finally {
      setLoading(false);
      const videoInput = document.getElementById('video') as HTMLInputElement;
        if(videoInput) {
            videoInput.value = "";
        }
      setFile(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold font-headline">Home Section</h1>
      <Card>
        <CardHeader>
          <CardTitle>Hero Section Background Video</CardTitle>
          <CardDescription>
            Upload a video to display in the background of the hero section on your homepage. The video will be muted and will loop automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="video">Video File (MP4 recommended)</Label>
            <Input id="video" type="file" accept="video/mp4,video/webm" onChange={handleFileChange} />
          </div>
          <Button onClick={handleUpload} disabled={loading || !file}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Upload Video
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
