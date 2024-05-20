import Header from "@/components/layout/Header";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Hero from "@/components/layout/Hero";
import Welcome from "@/components/layout/Welcome"
import Categories from "@/components/layout/Categories"
import TopMenu from "@/components/layout/TopMenu";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Welcome/>
      <Hero/>
      <Categories/>
      <TopMenu/>
    </div>
  );
}
