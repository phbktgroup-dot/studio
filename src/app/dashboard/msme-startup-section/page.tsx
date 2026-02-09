'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function MsmeStartupSectionPage() {
  // Local Shops Video state
  const [localShopsFile, setLocalShopsFile] = useState<File | null>(null);
  const [localShopsLoading, setLocalShopsLoading] = useState(false);
  const [isFetchingLocalShops, setIsFetchingLocalShops] = useState(true);
  const [isDeletingLocalShops, setIsDeletingLocalShops] = useState(false);
  const [localShopsVideoUrl, setLocalShopsVideoUrl] = useState<string | null>(null);
  
  // Startups Video state
  const [startupsFile, setStartupsFile] = useState<File | null>(null);
  const [startupsLoading, setStartupsLoading] = useState(false);
  const [isFetchingStartups, setIsFetchingStartups] = useState(true);
  const [isDeletingStartups, setIsDeletingStartups] = useState(false);
  const [startupsVideoUrl, setStartupsVideoUrl] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const fetchVideos = async () => {
      setIsFetchingLocalShops(true);
      setIsFetchingStartups(true);
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('local_shops_video_url, startups_video_url')
          .eq('id', 1)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
          throw error;
        }

        if (data) {
          if (data.local_shops_video_url) {
            setLocalShopsVideoUrl(data.local_shops_video_url);
          }
          if (data.startups_video_url) {
            setStartupsVideoUrl(data.startups_video_url);
          }
        }
      } catch (error: any) {
          if (error.message?.includes('does not exist') && (error.message.includes('local_shops_video_url') || error.message.includes('startups_video_url'))) {
            console.warn("Could not fetch section video URLs because a column is missing. Please ensure 'local_shops_video_url' and 'startups_video_url' columns exist in the 'settings' table.", error.message);
          } else {
            console.error("Could not fetch section video URLs:", error.message);
          }
      } finally {
        setIsFetchingLocalShops(false);
        setIsFetchingStartups(false);
      }
    };
    
    fetchVideos();
  }, []);

  const createUploadHandler = (
    file: File | null,
    setLoading: (loading: boolean) => void,
    currentUrl: string | null,
    setVideoUrl: (url: string) => void,
    columnName: 'local_shops_video_url' | 'startups_video_url',
    fileInputId: string,
    setFile: (file: File | null) => void,
    toastTitle: string
  ) => async () => {
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
      if (currentUrl) {
        try {
          const oldUrl = new URL(currentUrl);
          const oldFilePath = oldUrl.pathname.split('/public-assets/')[1];
          if (oldFilePath) {
            await supabase.storage.from('public-assets').remove([oldFilePath]);
          }
        } catch (e) {
            console.warn("Could not delete old video, proceeding with upload.", e)
        }
      }

      const fileName = `${columnName}-${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('public-assets')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('public-assets')
        .getPublicUrl(fileName);

      if (!urlData.publicUrl) throw new Error("Could not get public URL for the uploaded file.");
      
      const { error: dbError } = await supabase
        .from('settings')
        .upsert({ id: 1, [columnName]: urlData.publicUrl }, { onConflict: 'id' });
        
      if (dbError) throw dbError;

      setVideoUrl(urlData.publicUrl);
      toast({
        title: 'Upload Successful',
        description: `Your ${toastTitle} video has been updated.`,
      });

    } catch (error: any) {
        let description = `An unexpected error occurred: ${error.message}`;

        if (error.message.includes('Bucket not found')) {
            description = "The 'public-assets' storage bucket was not found. Please create a public bucket with this name in your Supabase project's Storage section.";
        } else if (error.message.includes('relation "public.settings" does not exist')) {
            description = "The 'settings' table does not exist. Please create it in your Supabase project with an 'id' column.";
        } else if (error.message.includes('violates row-level security policy')) {
            description = `Row-level security is preventing the upload. Please go to Authentication > Policies in your Supabase dashboard and ensure RLS is disabled for the 'settings' table.`
        } else if (error.message?.includes(`column "${columnName}" does not exist`)) {
            description = `The '${columnName}' column does not exist in your 'settings' table. Please add a column named '${columnName}' of type 'text'.`;
        }

      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: description,
      });
    } finally {
      setLoading(false);
      const input = document.getElementById(fileInputId) as HTMLInputElement;
      if (input) input.value = "";
      setFile(null);
    }
  };

  const createDeleteHandler = (
    currentUrl: string | null,
    setIsDeleting: (deleting: boolean) => void,
    setVideoUrl: (url: null) => void,
    columnName: 'local_shops_video_url' | 'startups_video_url',
    toastTitle: string
  ) => async () => {
    if (!currentUrl) return;
    setIsDeleting(true);
    try {
        const url = new URL(currentUrl);
        const filePath = url.pathname.split('/public-assets/')[1];

        if (!filePath) throw new Error("Could not determine file path from URL.");
        
        await supabase.storage.from('public-assets').remove([filePath]);

        const { error: dbError } = await supabase
            .from('settings')
            .upsert({ id: 1, [columnName]: null }, { onConflict: 'id' });

        if (dbError) throw dbError;

        setVideoUrl(null);
        toast({
            title: 'Video Deleted',
            description: `The ${toastTitle} video has been removed.`,
        });

    } catch (error: any) {
         toast({
            variant: 'destructive',
            title: 'Deletion Failed',
            description: error.message || `Could not delete the ${toastTitle} video.`,
        });
    } finally {
        setIsDeleting(false);
    }
  };

  const handleLocalShopsUpload = createUploadHandler(localShopsFile, setLocalShopsLoading, localShopsVideoUrl, setLocalShopsVideoUrl, 'local_shops_video_url', 'local-shops-video', setLocalShopsFile, 'Local Shops');
  const handleStartupsUpload = createUploadHandler(startupsFile, setStartupsLoading, startupsVideoUrl, setStartupsVideoUrl, 'startups_video_url', 'startups-video', setStartupsFile, 'Startups');
  
  const handleDeleteLocalShops = createDeleteHandler(localShopsVideoUrl, setIsDeletingLocalShops, setLocalShopsVideoUrl, 'local_shops_video_url', 'Local Shops');
  const handleDeleteStartups = createDeleteHandler(startupsVideoUrl, setIsDeletingStartups, setStartupsVideoUrl, 'startups_video_url', 'Startups');

  const VideoUploader = ({
      title,
      file,
      handleFileChange,
      handleUpload,
      loading,
      videoUrl,
      handleDelete,
      isDeleting,
      inputId
  } : {
      title: string,
      file: File | null,
      handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
      handleUpload: () => void,
      loading: boolean,
      videoUrl: string | null,
      handleDelete: () => void,
      isDeleting: boolean,
      inputId: string
  }) => (
      <Card className="overflow-hidden">
          <div className="flex">
              <div className="p-6 flex items-center justify-center bg-muted/30">
                  <CardTitle className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-muted-foreground tracking-widest uppercase text-sm">{title}</CardTitle>
              </div>
              <CardContent className="grid md:grid-cols-2 gap-6 items-start flex-grow p-6">
                   <div className="space-y-3">
                      <div className="grid w-full items-center gap-1.5">
                          <Label htmlFor={inputId} className="text-xs font-normal text-muted-foreground">Video File (MP4 recommended)</Label>
                          <Input id={inputId} type="file" accept="video/mp4,video/webm" onChange={handleFileChange} className="h-8 text-xs" />
                      </div>
                      <Button onClick={handleUpload} disabled={loading || !file} size="sm">
                          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          {videoUrl ? 'Upload and Replace' : 'Upload Video'}
                      </Button>
                  </div>
                   <div>
                      {videoUrl ? (
                          <div className="relative">
                              <video key={videoUrl} src={videoUrl} controls className="w-full rounded-md aspect-[16/9]" />
                              <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                      <Button variant="destructive" size="icon" className="absolute top-2 right-2 z-10 h-8 w-8 bg-red-600 hover:bg-red-700">
                                          <Trash2 className="h-4 w-4" />
                                          <span className="sr-only">Delete Video</span>
                                      </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                      <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                          This action will permanently delete this video. This cannot be undone.
                                      </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                      <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
                                          {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                          Delete
                                      </AlertDialogAction>
                                      </AlertDialogFooter>
                                  </AlertDialogContent>
                              </AlertDialog>
                          </div>
                      ) : (
                          <div className="flex items-center justify-center bg-muted rounded-md aspect-[16/9]">
                              <p className="text-sm text-muted-foreground">No video uploaded</p>
                          </div>
                      )}
                  </div>
              </CardContent>
          </div>
      </Card>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center justify-center mb-4">
          <Button variant="ghost" asChild size="icon" className="absolute left-0">
              <Link href="/dashboard/settings">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to Settings</span>
              </Link>
          </Button>
          <h1 className="text-lg font-bold font-headline">MSMEs & Start-Up Section Videos</h1>
      </div>
      
      {(isFetchingLocalShops || isFetchingStartups) ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <>
            <VideoUploader 
                title="For Local Shops Video"
                file={localShopsFile}
                handleFileChange={(e) => setLocalShopsFile(e.target.files ? e.target.files[0] : null)}
                handleUpload={handleLocalShopsUpload}
                loading={localShopsLoading}
                videoUrl={localShopsVideoUrl}
                handleDelete={handleDeleteLocalShops}
                isDeleting={isDeletingLocalShops}
                inputId="local-shops-video"
            />
            <VideoUploader 
                title="For Startups Video"
                file={startupsFile}
                handleFileChange={(e) => setStartupsFile(e.target.files ? e.target.files[0] : null)}
                handleUpload={handleStartupsUpload}
                loading={startupsLoading}
                videoUrl={startupsVideoUrl}
                handleDelete={handleDeleteStartups}
                isDeleting={isDeletingStartups}
                inputId="startups-video"
            />
        </>
      )}
    </div>
  );
}
