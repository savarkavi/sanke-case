import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Phone from "./Phone";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const ShowCase = () => {
  return (
    <section>
      <MaxWidthWrapper className="pb-24 lg:pb-52">
        <div className="flex flex-col gap-20 px-6 lg:px-8 items-center">
          <h1 className="tracking-tight text-balance lg:text-wrap text-center md:text-center font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
            Upload your photo and get your own{" "}
            <span className="relative px-2 bg-green-600 text-white rounded-sm">
              case
            </span>{" "}
            now
          </h1>
          <div className="flex flex-col items-center gap-16 md:flex-row w-full justify-center">
            <div className="relative w-[300px] lg:w-[350px] h-[600px] lg:h-[650px] rounded-lg flex-shrink-0">
              <Image
                src="/horse.jpg"
                alt="horse image"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <Image
              src="/arrow.png"
              alt="arrow image"
              width={80}
              height={60}
              className="rotate-90 md:rotate-0"
            />
            <Phone
              imageSrc="/horse_phone.jpg"
              className="w-[300px] h-[600px]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 items-center">
          <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
            <li className="w-fit">
              <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
              High-quality silicone material
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
              Scratch- and fingerprint resistant coating
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
              Wireless charging compatible
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-green-600 inline mr-1.5" />5 year
              print warranty
            </li>
          </ul>
          <Button className="bg-green-500 hover:bg-green-600">
            <Link href="/configure/upload" className="flex items-center gap-1">
              Create your case now <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default ShowCase;
