"use client";

import { COLORS, FINISHES, MATERIALS, MODELS } from "@/app/utils/constants";
import { cn, formatPrice } from "@/lib/utils";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface DesignSidebarProps {
  width: number;
  height: number;
}

const DesignSidebar = ({ width, height }: DesignSidebarProps) => {
  const [options, setOptions] = useState({
    color: COLORS[0],
    model: MODELS[0],
    material: MATERIALS[0],
    finish: FINISHES[0],
  });

  return (
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
                      onClick={() => setOptions((prev) => ({ ...prev, color }))}
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
                    onClick={() => setOptions((prev) => ({ ...prev, finish }))}
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
        <Button size="sm" className="bg-green-500 hover:bg-green-600">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DesignSidebar;
