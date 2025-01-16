import React from "react";
import Hero_bg from "../../../assets/backgrounds/1_bg.png";
import { Button, Container, useMediaQuery } from "@mui/material";
import hero_image from "../../../assets/landingpage/hero.png";
import hero_customer from "../../../assets/landingpage/hero-section.png";
import ful_kopi from "../../../assets/icons/ful_kopi_icon.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  // Media Query
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");
  const navigate = useNavigate();

  return (
    <section
      style={{ backgroundImage: `url(${Hero_bg})`, backgroundSize: "cover" }}
      className="py-16 bg-green-300/10"
    >
      <Container>
        <div className="sm:grid sm:grid-cols-2 flex flex-col">
          {/* Text */}
          <div className="col pt-3.5 flex items-center">
            <div className="xl:space-y-7 lg:space-y-6 md:space-y-4 sm:space-y-4 space-y-5 w-full sm:tracking-normal tracking-wide">
              {/* title */}
              <h1 className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-3xl font-bold capitalize xl:tracking-wide">
                Make healthy life 
                <div className="xl:my-2.5 lg:my-1.5 sm:my-0 md:my-0.5 my-1">
                  with <span className="text-green-500">fresh grocery</span>
                </div>
                products{" "}
                <img
                  className="inline xl:h-11 md:h-7 h-6"
                  src={ful_kopi}
                  alt="vegetable"
                />
              </h1>
              {/* description */}
              <p className="font-bold lg:text-base md:text-sm sm:text-xs text-sm">
                Get the best quality and most delicious grocery food in the
                world, you can get them our website. Fresh grocery every day to
                your family.
              </p>

              {/* Shop_now Btn */}
              <button
               className="text-white bg-[#2e7d32] hover:bg-[#1E5B20] px-12 py-2 rounded"
                onClick={() => navigate("/products")}
                sx={{ textTransform: "capitalize" }}
                variant="contained"
                size={isMediumScreen ? "medium" : "large"}
                color="success"
              >
                Shop Now
              </button>
       
            </div>
          </div>

          {/* Hero Img */}
          <div className="col flex">
            {/* <img className='xl:h-[30rem] lg:h-[26.5rem] md:h-[19rem] ms-auto h-[17rem]' src={hero_customer} alt="hero_customer" /> */}
            <img
              className="w-auto xl:h-[30rem] lg:h-[26.5rem] md:h-[19rem] h-[17rem]"
              src={hero_customer}
              alt="hero_customer"
            />
            <img
              className="w-auto xl:h-[30rem] lg:h-[26.5rem] md:h-[19rem] h-[17rem]"
              src={hero_image}
              alt="hero_customer"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
