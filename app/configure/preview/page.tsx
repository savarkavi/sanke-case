import DesignPreview from "@/components/DesignPreview";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Steps from "@/components/Steps";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface PreviewPageParams {
  searchParams: {
    [key: string]: string | undefined;
  };
}

const PreiviewPage = async ({ searchParams }: PreviewPageParams) => {
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
  return (
    <MaxWidthWrapper className="min-h-[calc(100vh-138px)]">
      <Steps />
      <DesignPreview configuration={configuration} />
    </MaxWidthWrapper>
  );
};

export default PreiviewPage;
