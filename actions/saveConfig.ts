"use server";

import { db } from "@/db";
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from "@prisma/client";

export interface SaveConfigParams {
  configId: string;
  model: PhoneModel;
  material: CaseMaterial;
  finish: CaseFinish;
  color: CaseColor;
}

export const saveConfig = async ({
  configId,
  model,
  material,
  finish,
  color,
}: SaveConfigParams) => {
  try {
    await db.configuration.update({
      where: {
        id: configId,
      },
      data: {
        model,
        material,
        finish,
        color,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
