import DummyReviews from "@/components/DummyReviews";
import Hero from "@/components/Hero";
import ShowCase from "@/components/ShowCase";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <Hero />
      <ShowCase />
      <DummyReviews />
    </div>
  );
}
