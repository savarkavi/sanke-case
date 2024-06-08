import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Check, Star } from "lucide-react";
import Phone from "./Phone";

const Hero = () => {
  return (
    <section>
      <MaxWidthWrapper className="pb-24 pt-10 flex flex-col gap-y-12 items-center lg:flex-row lg:items-start sm:pb-32 lg:gap-x-4 xl:gap-x-16 lg:pt-24 lg:pb-52">
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative w-32 h-32 hidden lg:block">
            <Image
              src="/snake-1.png"
              alt="snake image"
              fill
              className="object-contain hidden lg:block"
            />
          </div>
          <div className="flex flex-col items-center lg:items-start gap-y-8 mt-8 lg:mt-0">
            <h1 className="tracking-tight text-balance lg:text-wrap text-center lg:text-left font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
              Your Image on a{" "}
              <span className="bg-green-600 px-2 text-white rounded-sm">
                Custom
              </span>{" "}
              Phone Case
            </h1>
            <p className="text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
              Capture your favorite memories with your own,{" "}
              <span className="font-semibold">one-of-one</span> phone case.
              CaseCobra allows you to protect your memories, not just your phone
              case.
            </p>
            <ul className="flex flex-col gap-y-4">
              <li className="flex items-center gap-2">
                <Check className="text-green-500" />
                High-quality, durable material
              </li>
              <li className="flex items-center gap-x-2">
                <Check className="text-green-500" />5 year print guarantee
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500" />
                Modern iPhone models supported
              </li>
            </ul>
            <div className="flex -space-x-4">
              <Image
                src="/users/user-1.png"
                alt="user img"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <Image
                src="/users/user-2.png"
                alt="user img"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <Image
                src="/users/user-3.png"
                alt="user img"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <Image
                src="/users/user-4.jpg"
                alt="user img"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <Image
                src="/users/user-5.jpg"
                alt="user img"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between items-center lg:items-start gap-1">
              <div className="flex gap-0.5">
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
              </div>

              <p>
                <span className="font-semibold">1,250</span> happy customers
              </p>
            </div>
          </div>
        </div>

        <div className="h-full relative mt-8">
          <Image
            src="/your-image.png"
            alt="you image"
            width={160}
            height={160}
            className="absolute -right-40 2xl:-right-40 hidden 2xl:block"
          />
          <Phone
            imageSrc="/testimonials/1.jpg"
            className="w-[300px] h-[600px]"
          />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Hero;
