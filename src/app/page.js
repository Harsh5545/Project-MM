import CardComponent from "@/components/Home-Page-Components/CardComponent";
import HeroCarousel from "@/components/Home-Page-Components/HeroCarousel";
import HomeAbout from "@/components/Home-Page-Components/HomeAbout";
import HomeConsultation from "@/components/Home-Page-Components/HomeConsultation";
import HomeDinning from "@/components/Home-Page-Components/HomeDinning";
import HomeSection from "@/components/Home-Page-Components/HomeSection";
import HomeTestimonial from "@/components/Home-Page-Components/HomeTestimonial";


export default function Home() {
  return (
    <>
    <HeroCarousel/>
    <CardComponent/>
    <HomeDinning />
      <HomeAbout />
      <HomeTestimonial />
      <HomeConsultation />
      <HomeSection />
      </>
  );
}
