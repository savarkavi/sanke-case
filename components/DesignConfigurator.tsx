"use client";

import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { Rnd } from "react-rnd";
import ResizeComponent from "./ResizeComponent";

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
  return (
    <div className="w-full h-full my-4">
      <div className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        <div className="w-60 h-full relative bg-opacity-50">
          <AspectRatio
            ratio={896 / 1831}
            className="relative bg-blue-500 rounded-[40px]"
          >
            <Image
              src="/phone-template.png"
              alt="phone template"
              fill
              className="z-[99]"
            />
          </AspectRatio>
        </div>
        <div className="absolute w-full h-full top-0 right-0 bg-gray-200/10" />
        <Rnd
          default={{
            width: width / 4,
            height: height / 4,
            x: 100,
            y: 100,
          }}
          lockAspectRatio
          resizeHandleComponent={{
            bottomLeft: <ResizeComponent />,
            bottomRight: <ResizeComponent />,
            topLeft: <ResizeComponent />,
            topRight: <ResizeComponent />,
          }}
        >
          <div className="relative w-full h-full z-[15]">
            <Image
              src={imageUrl}
              alt="your image"
              fill
              className="rounded-lg"
            />
          </div>
        </Rnd>
      </div>
    </div>
  );
};

export default DesignConfigurator;
