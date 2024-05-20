import Header from "@/components/layout/Header";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Hero from "@/components/layout/Hero";
import Categories from "@/components/layout/Categories"
import TopMenu from "@/components/layout/TopMenu";

export default function Home() {
  return (
    <div className="flex flex-col">
    <Hero/>
    <Categories/>
    <TopMenu/>
    <section className="text-center my-16" id="about">
      <SectionHeaders subHeader={'Nuestra historia'} mainHeader={'Sobre nosotros'} />
      <div className="max-w-md mx-auto mt-4 flex flex-col gap-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt, lorem id volutpat finibus, nibh orci volutpat ipsum, 
          sed dignissim sapien lectus sit amet turpis. Quisque a orci bibendum, euismod dolor a, fringilla lacus.
        </p>

        <p>
          In non neque neque. Proin et eros in libero luctus cursus. Nam eleifend facilisis nunc, ut semper risus ultrices ac. Duis lobortis vel sem
          id facilisis. Proin eget lectus nunc. Morbi viverra sed mi eu varius. 
        </p>
      </div>
    </section>
    </div>
  );
}
