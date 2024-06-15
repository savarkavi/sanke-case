"use client";

import NextImage from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { Rnd } from "react-rnd";
import ResizeComponent from "./ResizeComponent";
import { useRef, useState } from "react";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/app/utils/constants";
import { cn, formatPrice } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronsUpDown, LoaderCircle } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useUploadThing } from "@/app/utils/uploadthing";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { SaveConfigParams, saveConfig } from "@/actions/saveConfig";
import { useRouter } from "next/navigation";

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  width: number;
  height: number;
}

const DesignConfigurator = ({
  configId,
  imageUrl,
  width,
  height,
}: DesignConfiguratorProps) => {
  const [renderedDimension, setRenderedDimension] = useState({
    width: width / 4,
    height: height / 4,
  });

  const [renderedPosition, setRenderedPosition] = useState({ x: 100, y: 100 });

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS)[number];
    material: (typeof MATERIALS)[number];
    finish: (typeof FINISHES)[number];
  }>({
    color: COLORS[0],
    model: MODELS[0],
    material: MATERIALS[0],
    finish: FINISHES[0],
  });

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: SaveConfigParams) => {
      await Promise.all([saveConfiguration(), saveConfig(args)]);
    },
    onError: () => {
      toast.error("Something went wrong. Try again later");
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`);
    },
  });

  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const saveConfiguration = async () => {
    try {
      const {
        left: phoneLeft,
        top: phoneTop,
        width: phoneWidth,
        height: phoneHeight,
      } = phoneCaseRef.current!.getBoundingClientRect();
      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();

      const leftOffset = phoneLeft - containerLeft;
      const topOffset = phoneTop - containerTop;

      const imgPostionX = renderedPosition.x - leftOffset;
      const imgPostionY = renderedPosition.y - topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = phoneWidth;
      canvas.height = phoneHeight;
      const ctx = canvas.getContext("2d");

      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl;
      await new Promise((resolve) => (userImage.onload = resolve));

      ctx?.drawImage(
        userImage,
        imgPostionX,
        imgPostionY,
        renderedDimension.width,
        renderedDimension.height
      );

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      const blob = base64ToBlob(base64Data, "image/png");
      const file = new File([blob], "filename.png", { type: "image/png" });

      await startUpload([file], { configId });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later");
    }

    function base64ToBlob(base64: string, mimeType: string) {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: mimeType });
    }
  };

  return (
    <div className="my-4 flex flex-col xl:flex-row gap-8 w-full h-full">
      <div className="w-full h-full">
        <div
          ref={containerRef}
          className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <div className="relative w-60 pointer-events-none aspect-[896/1831]">
            <AspectRatio
              ref={phoneCaseRef}
              ratio={896 / 1831}
              className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
            >
              <NextImage
                fill
                alt="phone image"
                src="/phone-template.png"
                className="pointer-events-none z-50 select-none"
              />
            </AspectRatio>
            <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
            <div
              className={cn(
                "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
                options.color.tw
              )}
            />
          </div>

          <Rnd
            default={{
              x: 150,
              y: 205,
              height: height / 4,
              width: width / 4,
            }}
            onResizeStop={(_, __, ref, ___, { x, y }) => {
              setRenderedDimension({
                height: parseInt(ref.style.height.slice(0, -2)),
                width: parseInt(ref.style.width.slice(0, -2)),
              });

              setRenderedPosition({ x, y });
            }}
            onDragStop={(_, data) => {
              const { x, y } = data;
              setRenderedPosition({ x, y });
            }}
            className="absolute z-20 border-[3px] border-primary"
            lockAspectRatio
            resizeHandleComponent={{
              bottomRight: <ResizeComponent />,
              bottomLeft: <ResizeComponent />,
              topRight: <ResizeComponent />,
              topLeft: <ResizeComponent />,
            }}
          >
            <div className="relative w-full h-full">
              <NextImage
                src={imageUrl}
                fill
                alt="your image"
                className="pointer-events-none"
              />
            </div>
          </Rnd>
        </div>
      </div>
      {/* Sidebar */}
      <div className="h-full xl:h-[37.5rem] flex flex-col">
        <ScrollArea className="h-full my-10 xl:my-0 xl:px-6">
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl font-bold">Customize your case</h2>
            <hr />
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3 items-start">
                <span className="capitalize font-semibold">{`Color: ${options.color.label}`}</span>
                <div className="flex gap-3">
                  {COLORS.map((color) => {
                    return (
                      <div
                        key={color.color}
                        className={cn(
                          "p-1 cursor-pointer",
                          options.color.color === color.color &&
                            "border border-black rounded-full"
                        )}
                        onClick={() =>
                          setOptions((prev) => ({ ...prev, color }))
                        }
                      >
                        <div className={cn("w-8 h-8 rounded-full", color.tw)} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-3 items-start">
                <span className="font-semibold">Model</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="w-full">
                    <Button
                      variant="ghost"
                      className="border flex items-center gap-3 justify-between w-full"
                    >
                      {options.model.label}
                      <ChevronsUpDown className="w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom">
                    {MODELS.map((model) => {
                      return (
                        <DropdownMenuItem
                          key={model.value}
                          onClick={() =>
                            setOptions((prev) => ({ ...prev, model }))
                          }
                        >
                          {model.label}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col gap-3 items-start">
                <span className="font-semibold">Material</span>
                <div className="flex flex-col gap-3 items-start w-full">
                  {MATERIALS.map((material) => (
                    <div
                      key={material.value}
                      className={cn(
                        "flex flex-col gap-2 py-3 px-6 border-2 rounded-lg text-sm w-full cursor-pointer",
                        options.material.label === material.label &&
                          "border-green-500"
                      )}
                      onClick={() =>
                        setOptions((prev) => ({ ...prev, material }))
                      }
                    >
                      <div className="flex items-center justify-between">
                        <span>{material.label}</span>
                        <span>{formatPrice(material.price / 100)}</span>
                      </div>
                      {material.description && (
                        <span className="text-gray-500">
                          {material.description}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 items-start mb-4">
                <span className="font-semibold">Finish</span>
                <div className="flex flex-col gap-3 items-start w-full">
                  {FINISHES.map((finish) => (
                    <div
                      key={finish.value}
                      className={cn(
                        "flex flex-col gap-2 py-3 px-6 border-2 rounded-lg text-sm w-full cursor-pointer",
                        options.finish.label === finish.label &&
                          "border-green-500"
                      )}
                      onClick={() =>
                        setOptions((prev) => ({ ...prev, finish }))
                      }
                    >
                      <div className="flex items-center justify-between">
                        <span>{finish.label}</span>
                        <span>{formatPrice(finish.price / 100)}</span>
                      </div>
                      {finish.description && (
                        <span className="text-gray-500">
                          {finish.description}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="flex items-center gap-6 self-end xl:px-6">
          <span>
            {formatPrice(
              (14_00 + options.material.price + options.finish.price) / 100
            )}
          </span>
          <Button
            size="sm"
            className="bg-green-500 w-24 hover:bg-green-600 flex justify-center items-center"
            onClick={() =>
              mutate({
                configId,
                model: options.model.value,
                material: options.material.value,
                finish: options.finish.value,
                color: options.color.color,
              })
            }
          >
            {isPending || isUploading ? (
              <LoaderCircle className="animate-spin w-4" />
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignConfigurator;
