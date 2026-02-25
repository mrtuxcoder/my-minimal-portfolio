import Divider from "./components/divider"
import AboutMe from "./components/home/about-me"
import Education from "./components/home/education"
import Experience from "./components/home/experience"
import FeaturedWork from "./components/home/featured-work"
import HeroSection from "./components/home/hero-section"
import DevOps from "./components/home/devops"
import TechnicalActivities from "./components/home/technical-activities"

const page = () => {
  return (
    <main>
      <HeroSection/>
      <Divider/>
      <AboutMe/>
      <Divider/>
      <FeaturedWork/>
      <Divider/>
      <Experience/>
      <Divider/>
      <DevOps/>
      <Divider/>
      <TechnicalActivities/>
      <Divider/>
      <Education/>
      <Divider/>
    </main>
  )
}

export default page