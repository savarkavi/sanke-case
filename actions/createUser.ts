"use server";

import { db } from "@/db";

export const createUser = async ({ email }: { email: string | undefined }) => {
  console.log("user saved in DB");
  console.log(email);

  if (!email) return;
  console.log("okay");

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
