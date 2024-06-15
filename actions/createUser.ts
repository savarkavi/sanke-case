"use server";

import { db } from "@/db";

export const createUser = async ({ email }: { email: string | undefined }) => {
  if (!email) return;

  console.log("user created");

  try {
    await db.user.create({
      data: {
        email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
