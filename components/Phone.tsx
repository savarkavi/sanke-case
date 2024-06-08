import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  dark?: boolean;
  imageSrc: string;
  className: string;
}

const Phone = ({ imageSrc, className, dark = false }: PhoneProps) => {
  return (
    <div className="relative h-full">
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={
            dark
              ? "/phone-template-dark-edges.png"
              : "/phone-template-white-edges.png"
          }
          alt="phone image"
          fill
          className="object-contain z-[99]"
        />
      </div>
      <div className={cn("absolute top-0", className)}>
        <Image
          src={imageSrc}
          alt="overlay image"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Phone;
