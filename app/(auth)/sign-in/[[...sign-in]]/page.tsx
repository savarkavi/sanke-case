import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center pt-16 h-[calc(100vh-138px)]">
      <SignIn />
    </div>
  );
}
