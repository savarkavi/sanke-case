"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

const STEPS = [
  {
    name: "Step 1: Add image",
    description: "Choose an image for your case",
    url: "/upload",
  },
  {
    name: "Step 2: Customize design",
    description: "Make the case yours",
    url: "/design",
  },
  {
    name: "Step 3: Summary",
    description: "Review your final design",
    url: "/preview",
  },
];

const Steps = () => {
  const pathname = usePathname();

  return (
    <div className="py-3 flex flex-col lg:flex-row lg:justify-center lg:my-8 lg:w-full">
      {STEPS.map((step, i) => {
        const isCompleted = STEPS.slice(i + 1).some((step) =>
          pathname.endsWith(step.url)
        );
        return (
          <div
            key={step.name}
            className={cn(
              "flex items-center gap-4 border-l-2 lg:border-l-0 lg:border-b-2 p-4 lg:flex-1 lg:justify-center",
              pathname.endsWith(step.url) && "border-black",
              isCompleted && "border-green-500"
            )}
          >
            <Image
              src={`/snake-${i + 1}.png`}
              alt="snake image"
              width={60}
              height={60}
            />
            <div className="flex flex-col gap-2 text-sm">
              <h2 className="font-semibold">{step.name}</h2>
              <p>{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
