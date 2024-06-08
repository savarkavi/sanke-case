"use client";

import { useUploadThing } from "@/app/utils/uploadthing";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Steps from "@/components/Steps";
import { ImagesIcon, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Dropzone from "react-dropzone";

const UploadPage = () => {
  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      router.push(`/configure/design?id=${configId}`);
    },
  });

  const onDropAccepted = (files: File[]) => {
    startUpload(files, { configId: undefined });
  };

  return (
    <MaxWidthWrapper className="py-4 h-[calc(100vh-138px)] flex flex-col">
      <Steps />
      <Dropzone onDrop={onDropAccepted}>
        {({ getRootProps, getInputProps }) => (
          <section className="h-full mt-2">
            <div
              {...getRootProps()}
              className="bg-gray-300/75 h-full rounded-lg flex justify-center items-center"
            >
              <input {...getInputProps()} />
              {isUploading ? (
                <div className="flex items-center gap-3">
                  <LoaderCircle className="text-green-500 animate-spin" />
                  <span>Uploding...</span>
                </div>
              ) : (
                <div className="flex flex-col gap-1 items-center">
                  <ImagesIcon />
                  <p>Click to upload or Drag and Drop</p>
                  <p>PNG, JPG, JPEG</p>
                </div>
              )}
            </div>
          </section>
        )}
      </Dropzone>
    </MaxWidthWrapper>
  );
};

export default UploadPage;
