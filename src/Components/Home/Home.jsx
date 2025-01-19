import { Fade } from "@mui/material"
import EnjoyOurFreshGroceryItems from "./EnjoyOurFreshGroceryItems/EnjoyOurFreshGroceryItems"
import Hero from "./Hero/Hero"
import OurBestQualities from "./OurBestQualities/OurBestQualities"
import OurServices from "./OurServices/OurServices"
import PopularCategories from "./PopularCategories/PopularCategories"

const Home = () => {
  // Scrolling Bug Fixed
  window.scroll({ top: 0 })

  return (
    <Fade in={true}>
      <main className='min-h-screen space-y-5 mb-9'>
        <Hero />
        <PopularCategories />
        <OurBestQualities />
        <EnjoyOurFreshGroceryItems />
        <OurServices />
      </main>
    </Fade>
  )
}

export default Home
