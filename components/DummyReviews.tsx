import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Check, Star } from "lucide-react";

const DummyReviews = () => {
  return (
    <section className="pb-24">
      <MaxWidthWrapper>
        <div className="flex flex-col gap-y-16">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <Image
              src="/snake-2.png"
              alt="sname image"
              width={128}
              height={128}
            />
            <h1 className="tracking-tight text-balance lg:text-wrap text-center lg:text-left font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
              What our{" "}
              <span className="bg-green-600 px-2 text-white rounded-sm">
                customers
              </span>{" "}
              say
            </h1>
          </div>

          <div className="flex flex-col gap-16 lg:flex-row px-4">
            <div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                </div>
                <p>
                  &quot;The case feels durable and I even got a compliment on
                  the design. Had the case for two and a half months now and{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    the image is super clear
                  </span>
                  , on the case I had before, the image started fading into
                  yellow-ish color after a couple weeks. Love it.&quot;
                </p>
                <div className="flex gap-4 mt-2">
                  <Image
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                    src="/users/user-1.png"
                    alt="user"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">Jonathan</p>
                    <div className="flex gap-1.5 items-center text-zinc-600">
                      <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                      <p className="text-sm">Verified Purchase</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                </div>
                <p>
                  &quot;I usually keep my phone together with my keys in my
                  pocket and that led to some pretty heavy scratchmarks on all
                  of my last phone cases. This one, besides a barely noticeable
                  scratch on the corner,{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    looks brand new after about half a year
                  </span>
                  . I dig it.&quot;
                </p>
                <div className="flex gap-4 mt-2">
                  <Image
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                    src="/users/user-4.jpg"
                    alt="user"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">Josh</p>
                    <div className="flex gap-1.5 items-center text-zinc-600">
                      <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                      <p className="text-sm">Verified Purchase</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default DummyReviews;
