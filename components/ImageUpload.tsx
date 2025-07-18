"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
  onChange: (urls: string[]) => void;
  value: string[];
  endpoint: "postImage";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {value && value.length > 0 && value.map((url, idx) => (
        <div key={url} className="relative size-40">
          <img src={url} alt={`Upload ${idx + 1}`} className="rounded-md size-40 object-cover" />
          <button
            onClick={() => onChange(value.filter((_, i) => i !== idx))}
            className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
            type="button"
          >
            <XIcon className="h-4 w-4 text-white" />
          </button>
        </div>
      ))}
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          if (res && res.length > 0) {
            const urls = res.map(r => r.url);
            onChange([...value, ...urls]);
          }
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
        className="w-full"
        appearance={{
          button: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-extrabold py-4 px-12 rounded-3xl cursor-pointer transition text-2xl shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer w-[208px] cursor-pointer",
          container: "flex flex-col items-center justify-center w-full bg-transparent border-none !border-none shadow-none"
        }}
      />
    </div>
  );
}
export default ImageUpload;