import Banner from "@/components/Banner";
import StartupCaregories from "@/components/StartupCaregories";
import SuccessStories from "@/components/SuccessStories";
import TrendingIdea from "@/components/TrendingIdea";


export default function Home() {
  return (
    <div className="w-auto md:w-11/12  mx-auto">
      <Banner />
      <TrendingIdea />
      <SuccessStories />
      <StartupCaregories />
    </div>
  );
}
