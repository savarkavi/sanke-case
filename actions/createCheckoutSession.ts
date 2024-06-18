"use server";

import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Order } from "@prisma/client";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  try {
    const configuration = await db.configuration.findUnique({
      where: { id: configId },
    });

    if (!configuration) {
      throw new Error("No such configuration was found");
    }

    const user = await currentUser();

    if (!user) {
      throw new Error("You have to sign in first");
    }

    const dbUser = await db.user.findFirst({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
    });

    if (!dbUser) {
      throw new Error("No user found");
    }

    const { finish, material } = configuration;

    let price = 14_00;
    if (finish === "textured") price += 3_00;
    if (material === "polycarbonate") price += 5_00;

    let order: Order | undefined = undefined;

    const existingOrder = await db.order.findFirst({
      where: {
        userId: dbUser.id,
        configurationId: configuration.id,
      },
    });

    if (existingOrder) {
      order = existingOrder;
    } else {
      order = await db.order.create({
        data: {
          amount: price / 100,
          userId: dbUser.id,
          configurationId: configuration.id,
        },
      });
    }

    const product = await stripe.products.create({
      name: "custom iphone case",
      images: [configuration.imageUrl],
      default_price_data: {
        currency: "USD",
        unit_amount: price,
      },
    });

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure?preview?id=${configuration.id}`,
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: { allowed_countries: ["IN", "US"] },
      metadata: {
        userId: dbUser.id,
        orderId: order.id,
      },
      line_items: [{ price: product.default_price as string, quantity: 1 }],
    });

    return { url: stripeSession.url };
  } catch (error) {
    console.log(error);
    return { url: null };
  }
};
