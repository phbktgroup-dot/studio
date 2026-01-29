'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function HeroSectionPage() {
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
        .from('public-assets') 
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
      
      // 3. Upsert the public URL to the 'settings' table
      const { error: dbError } = await supabase
        .from('settings')
        .upsert({ id: 1, hero_video_url: urlData.publicUrl }, { onConflict: 'id' });
        
      if (dbError) {
        throw dbError;
      }

      toast({
        title: 'Upload Successful',
        description: 'Your hero section video has been updated.',
      });

    } catch (error: any) {
        let description = `An unexpected error occurred: ${error.message}`;

        if (error.message === 'Bucket not found') {
            description = "The 'public-assets' storage bucket was not found. Please create a public bucket with this name in your Supabase project's Storage section.";
        } else if (error.message?.includes('relation "public.settings" does not exist')) {
            description = "The 'settings' table does not exist. Please create it in your Supabase project. It should have an 'id' column (number, primary key) and a 'hero_video_url' column (text).";
        } else if (error.message?.includes('violates row-level security policy')) {
            description = `Row-level security is preventing the upload. Full error: "${error.message}". Please go to Authentication > Policies in your Supabase dashboard and ensure RLS is disabled for the 'settings' table.`
        }

      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: description,
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
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold font-headline">Hero Section</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hero Section Background Video</CardTitle>
          <CardDescription className="text-xs">
            Upload a video to display in the background of the hero section on your homepage. The video will be muted and will loop automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="video" className="text-xs">Video File (MP4 recommended)</Label>
            <Input id="video" type="file" accept="video/mp4,video/webm" onChange={handleFileChange} className="h-9 text-sm" />
          </div>
          <Button onClick={handleUpload} disabled={loading || !file} size="sm">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Upload Video
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
