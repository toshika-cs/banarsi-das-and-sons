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
        {/*
          The 1280 floor keeps stepping down as sections get their responsive
          pass, so the ones above can reflow while each of these keeps rendering
          at its exact Figma width. Nothing here changes at >= 1280.
        */}
        <div className="min-w-[1280px]">
          <Craftsmanship />
          <OurStory />
          <BeginYourJourney />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
