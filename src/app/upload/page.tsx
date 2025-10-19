"use client";

import Upload from "@/components/Upload";


export default function UploadPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Upload a File to ImageKit</h1>
     <Upload />
    </main>
  );
}
