import DesignConfigurator from "@/components/DesignConfigurator";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Steps from "@/components/Steps";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface DesignProps {
  searchParams: {
    [key: string]: string;
  };
}

const page = async ({ searchParams }: DesignProps) => {
  const { id } = searchParams;

  if (!id) {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: {
      id,
    },
  });

  if (!configuration) {
    return notFound();
  }

  const { imageUrl, width, height } = configuration;

  return (
    <MaxWidthWrapper className="min-h-[calc(100vh-138px)]">
      <Steps />
      <DesignConfigurator
        configId={id}
        imageUrl={imageUrl}
        width={width}
        height={height}
      />
    </MaxWidthWrapper>
  );
};

export default page;
