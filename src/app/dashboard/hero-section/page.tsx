
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trash2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
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

export default function HeroSectionPage() {
  // Video state
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // For video upload
  const [isFetching, setIsFetching] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  // Logo state
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoLoading, setLogoLoading] = useState(false);
  const [isFetchingLogo, setIsFetchingLogo] = useState(true);
  const [isDeletingLogo, setIsDeletingLogo] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const fetchVideoUrl = async () => {
      setIsFetching(true);
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('hero_video_url')
          .eq('id', 1)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
          throw error;
        }

        if (data && data.hero_video_url) {
          setVideoUrl(data.hero_video_url);
        }
      } catch (error: any) {
        if (error.message?.includes('column "hero_video_url" does not exist')) {
            console.warn("Could not fetch hero video URL:", error.message);
        } else {
            console.error("Could not fetch hero video URL:", error.message);
        }
      } finally {
        setIsFetching(false);
      }
    };
    
    const fetchLogoUrl = async () => {
        setIsFetchingLogo(true);
        try {
          const { data, error } = await supabase
            .from('settings')
            .select('logo_url')
            .eq('id', 1)
            .single();
  
          if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
            throw error;
          }
  
          if (data && data.logo_url) {
            setLogoUrl(data.logo_url);
          }
        } catch (error: any) {
          if (error.message?.includes('logo_url') && error.message?.includes('does not exist')) {
            console.warn("Could not fetch logo URL:", error.message);
          } else {
            console.error("Could not fetch logo URL:", error.message);
          }
        } finally {
          setIsFetchingLogo(false);
        }
      };

    fetchVideoUrl();
    fetchLogoUrl();
  }, []);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLogoFile(e.target.files[0]);
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
      // If a video already exists, delete it first.
      if (videoUrl) {
        try {
          const oldUrl = new URL(videoUrl);
          const oldFilePath = oldUrl.pathname.split('/public-assets/')[1];
          if (oldFilePath) {
            await supabase.storage.from('public-assets').remove([oldFilePath]);
          }
        } catch (e) {
            console.warn("Could not delete old video, proceeding with upload.", e)
        }
      }

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

      setVideoUrl(urlData.publicUrl);
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
  
  const handleLogoUpload = async () => {
    if (!logoFile) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a logo file to upload.',
      });
      return;
    }

    setLogoLoading(true);

    try {
      // If a logo already exists, delete it first.
      if (logoUrl) {
        try {
          const oldUrl = new URL(logoUrl);
          const oldFilePath = oldUrl.pathname.split('/public-assets/')[1];
          if (oldFilePath) {
            await supabase.storage.from('public-assets').remove([oldFilePath]);
          }
        } catch (e) {
            console.warn("Could not delete old logo, proceeding with upload.", e)
        }
      }

      // 1. Upload logo to Supabase Storage
      const fileName = `logo-${Date.now()}-${logoFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('public-assets')
        .upload(fileName, logoFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // 2. Get the public URL
      const { data: urlData } = supabase.storage
        .from('public-assets')
        .getPublicUrl(fileName);

      if (!urlData.publicUrl) {
          throw new Error("Could not get public URL for the uploaded file.");
      }
      
      // 3. Upsert the public URL to the 'settings' table
      const { error: dbError } = await supabase
        .from('settings')
        .upsert({ id: 1, logo_url: urlData.publicUrl }, { onConflict: 'id' });
        
      if (dbError) {
        throw dbError;
      }

      setLogoUrl(urlData.publicUrl);
      toast({
        title: 'Upload Successful',
        description: 'Your site logo has been updated.',
      });

    } catch (error: any) {
        let description = `An unexpected error occurred: ${error.message}`;

        if (error.message === 'Bucket not found') {
            description = "The 'public-assets' storage bucket was not found. Please create it first.";
        } else if (error.message?.includes('relation "public.settings" does not exist')) {
            description = "The 'settings' table does not exist. Please create it with 'id' and 'logo_url' columns.";
        } else if (error.message?.includes('violates row-level security policy')) {
            description = `Row-level security is preventing the upload. Please disable RLS for the 'settings' table.`
        } else if (error.message?.includes("logo_url") && (error.message.includes("does not exist") || error.message.includes("schema cache"))) {
            description = "The 'logo_url' column does not exist in your 'settings' table. Please add a column named 'logo_url' of type 'text'.";
        }


      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: description,
      });
    } finally {
      setLogoLoading(false);
      const logoInput = document.getElementById('logo') as HTMLInputElement;
        if(logoInput) {
            logoInput.value = "";
        }
      setLogoFile(null);
    }
  };


  const handleDelete = async () => {
    if (!videoUrl) return;
    setIsDeleting(true);
    try {
        const url = new URL(videoUrl);
        const filePath = url.pathname.split('/public-assets/')[1];

        if (!filePath) {
            throw new Error("Could not determine file path from URL.");
        }
        
        // 1. Delete from Storage
        const { error: storageError } = await supabase.storage
            .from('public-assets')
            .remove([filePath]);

        if (storageError) {
            // Log but don't block DB update
            console.error("Storage deletion failed:", storageError);
        }

        // 2. Update database
        const { error: dbError } = await supabase
            .from('settings')
            .upsert({ id: 1, hero_video_url: null }, { onConflict: 'id' });

        if (dbError) {
            throw dbError;
        }

        setVideoUrl(null);
        toast({
            title: 'Video Deleted',
            description: 'The hero section video has been removed.',
        });

    } catch (error: any) {
         toast({
            variant: 'destructive',
            title: 'Deletion Failed',
            description: error.message || "Could not delete the video.",
        });
    } finally {
        setIsDeleting(false);
    }
  };

  const handleLogoDelete = async () => {
    if (!logoUrl) return;
    setIsDeletingLogo(true);
    try {
        const url = new URL(logoUrl);
        const filePath = url.pathname.split('/public-assets/')[1];

        if (!filePath) {
            throw new Error("Could not determine file path from URL.");
        }
        
        // 1. Delete from Storage
        const { error: storageError } = await supabase.storage
            .from('public-assets')
            .remove([filePath]);

        if (storageError) {
            console.error("Storage deletion failed:", storageError);
        }

        // 2. Update database
        const { error: dbError } = await supabase
            .from('settings')
            .upsert({ id: 1, logo_url: null }, { onConflict: 'id' });

        if (dbError) {
            throw dbError;
        }

        setLogoUrl(null);
        toast({
            title: 'Logo Deleted',
            description: 'The site logo has been removed.',
        });

    } catch (error: any) {
         toast({
            variant: 'destructive',
            title: 'Deletion Failed',
            description: error.message || "Could not delete the logo.",
        });
    } finally {
        setIsDeletingLogo(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center justify-center mb-4">
          <Button variant="ghost" asChild size="icon" className="absolute left-0">
              <Link href="/dashboard/settings">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to Settings</span>
              </Link>
          </Button>
          <h1 className="text-lg font-bold font-headline">Site Customization</h1>
      </div>
      
      {(isFetching || isFetchingLogo) ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <>
            <Card className="overflow-hidden">
                <div className="flex">
                    <div className="p-6 flex items-center justify-center bg-muted/30">
                        <CardTitle className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-muted-foreground tracking-widest uppercase text-sm">Hero Section Background Video</CardTitle>
                    </div>
                    <CardContent className="grid md:grid-cols-2 gap-6 items-start flex-grow p-6">
                         <div className="space-y-3">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="video" className="text-xs font-normal text-muted-foreground">Video File (MP4 recommended)</Label>
                                <Input id="video" type="file" accept="video/mp4,video/webm" onChange={handleFileChange} className="h-8 text-xs" />
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
                                                This action will permanently delete the hero section video. This cannot be undone.
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
            <Card className="overflow-hidden">
                <div className="flex">
                    <div className="p-6 flex items-center justify-center bg-muted/30">
                        <CardTitle className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-muted-foreground tracking-widest uppercase text-sm">Logo</CardTitle>
                    </div>
                    <CardContent className="flex-grow p-6">
                        <div className={`grid ${logoUrl ? 'grid-cols-2' : 'grid-cols-1'} gap-6 items-start`}>
                            <div className="space-y-3">
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="logo" className="text-xs font-normal text-muted-foreground">Logo File (PNG, JPG, SVG)</Label>
                                    <Input id="logo" type="file" accept="image/png, image/jpeg, image/svg+xml" onChange={handleLogoFileChange} className="h-8 text-xs" />
                                </div>
                                <Button onClick={handleLogoUpload} disabled={logoLoading || !logoFile} size="sm">
                                    {logoLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    {logoUrl ? 'Upload and Replace' : 'Upload Logo'}
                                </Button>
                            </div>

                            {logoUrl && (
                                <div className="relative">
                                    <div className="p-4 bg-muted/30 rounded-md flex items-center justify-center">
                                       <Image src={logoUrl} alt="Logo preview" width={150} height={50} className="object-contain" />
                                    </div>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="icon" className="absolute top-2 right-2 z-10 h-8 w-8 bg-red-600 hover:bg-red-700">
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Delete Logo</span>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action will permanently delete the site logo. This cannot be undone.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel disabled={isDeletingLogo}>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleLogoDelete} disabled={isDeletingLogo} className="bg-destructive hover:bg-destructive/90">
                                                {isDeletingLogo && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                Delete
                                            </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </div>
            </Card>
        </>
      )}
    </div>
  );
}
