"use client";

import { Configuration } from "@prisma/client";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import Phone from "./Phone";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "@/actions/createCheckoutSession";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const [showConfetti, setShowConffeti] = useState(false);
  const router = useRouter();

  useEffect(() => setShowConffeti(true), []);

  const { color, model, finish, material } = configuration;

  let totalPrice = 14_00;
  if (material === "polycarbonate") totalPrice += 5_00;
  if (finish === "textured") totalPrice += 3_00;

  const { mutate, isPending } = useMutation({
    mutationKey: ["checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) {
        if (url === `${process.env.NEXT_PUBLIC_SERVER_URL}`)
          toast.success("Order successful. Check you Email");
        router.push(url);
      } else {
        return;
      }
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later");
    },
  });

  return (
    <div className="w-full h-full">
      <div className="flex justify-center">
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 100 }}
        />
      </div>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-12 justify-center items-center mt-8 gap-6">
        <Phone
          imageSrc={configuration.croppedImageUrl!}
          className={cn(
            "w-[290px] h-[590px] md:w-[190px] md:h-[390px] xl:w-[290px] xl:h-[590px]",
            color === "black"
              ? "bg-black"
              : color === "blue"
              ? "bg-blue-500"
              : "bg-rose-500"
          )}
        />

        <div className="w-full">
          <div className="mt-6 sm:col-span-9 md:row-end-1">
            <h3 className="text-3xl font-bold tracking-tight text-gray-900">
              Your {model} Case
            </h3>
            <div className="mt-3 flex items-center gap-1.5 text-base">
              <Check className="h-4 w-4 text-green-500" />
              In stock and ready to ship
            </div>
          </div>

          <div className="sm:col-span-12 md:col-span-9 text-base">
            <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
              <div>
                <p className="font-medium text-zinc-950">Highlights</p>
                <ol className="mt-3 text-zinc-700 list-disc list-inside">
                  <li>Wireless charging compatible</li>
                  <li>TPU shock absorption</li>
                  <li>Packaging made from recycled materials</li>
                  <li>5 year print warranty</li>
                </ol>
              </div>
              <div>
                <p className="font-medium text-zinc-950">Materials</p>
                <ol className="mt-3 text-zinc-700 list-disc list-inside">
                  <li>High-quality, durable material</li>
                  <li>Scratch- and fingerprint resistant coating</li>
                </ol>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
                <div className="flow-root text-sm">
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600">Base price</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(14_00 / 100)}
                    </p>
                  </div>

                  {finish === "textured" ? (
                    <div className="flex items-center justify-between py-1 mt-2">
                      <p className="text-gray-600">Textured finish</p>
                      <p className="font-medium text-gray-900">
                        {formatPrice(3_00 / 100)}
                      </p>
                    </div>
                  ) : null}

                  {material === "polycarbonate" ? (
                    <div className="flex items-center justify-between py-1 mt-2">
                      <p className="text-gray-600">
                        Soft polycarbonate material
                      </p>
                      <p className="font-medium text-gray-900">
                        {formatPrice(5_00 / 100)}
                      </p>
                    </div>
                  ) : null}

                  <div className="my-2 h-px bg-gray-200" />

                  <div className="flex items-center justify-between py-2">
                    <p className="font-semibold text-gray-900">Order total</p>
                    <p className="font-semibold text-gray-900">
                      {formatPrice(totalPrice / 100)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end pb-12">
                <Button
                  onClick={() => mutate({ configId: configuration.id })}
                  className="px-4 sm:px-6 lg:px-8 bg-green-500 hover:bg-green-600 flex justify-center items-center w-24"
                >
                  {isPending ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Checkout"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPreview;
