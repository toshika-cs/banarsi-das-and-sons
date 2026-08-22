import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BeginYourJourney } from "@/components/sections/begin-your-journey";
import { Craftsmanship } from "@/components/sections/craftsmanship";
import { CuratedForYou } from "@/components/sections/curated-for-you";
import { Hero } from "@/components/sections/hero";
import { NewArrivals } from "@/components/sections/new-arrivals";
import { OurStory } from "@/components/sections/our-story";
import { ShopByCategory } from "@/components/sections/shop-by-category";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <Hero />
        <CuratedForYou />
        <ShopByCategory />
        <NewArrivals />
        <Craftsmanship />
        <OurStory />
        <BeginYourJourney />
      </main>
      <SiteFooter />
    </>
  );
}
