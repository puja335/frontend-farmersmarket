import React from "react";
import { Container, Fade } from "@mui/material";
import {
  LocalShipping,
  VerifiedUser,
  Timer,
  Savings,
} from "@mui/icons-material";

const WhyUs = () => {
  window.scroll({ top: 0 });

  const features = [
    {
      icon: <LocalShipping className="text-green-600 text-5xl" />,
      title: "Fast Delivery",
      description:
        "Same-day delivery for orders placed before 2 PM. Our efficient logistics network ensures your groceries arrive fresh and on time.",
    },
    {
      icon: <VerifiedUser className="text-green-600 text-5xl" />,
      title: "Quality Guarantee",
      description:
        "We partner with trusted local farmers and suppliers. Every product undergoes strict quality checks before reaching you.",
    },
    {
      icon: <Timer className="text-green-600 text-5xl" />,
      title: "24/7 Service",
      description:
        "Order anytime, day or night. Our customer service team is always available to assist you with your shopping needs.",
    },
    {
      icon: <Savings className="text-green-600 text-5xl" />,
      title: "Best Prices",
      description:
        "Regular deals, seasonal discounts, and loyalty rewards help you save more while shopping for premium quality groceries.",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-10">
      <Fade in={true}>
        <Container>
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our Grocery Service?
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We combine convenience, quality, and reliability to provide you
              with the best online grocery shopping experience.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-green-50 rounded-xl p-8 mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatItem number="10k+" label="Happy Customers" />
              <StatItem number="98%" label="Satisfaction Rate" />
              <StatItem number="1hr" label="Average Delivery Time" />
              <StatItem number="5k+" label="Products Available" />
            </div>
          </div>
        </Container>
      </Fade>
    </div>
  );
};

const StatItem = ({ number, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-green-600 mb-2">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

export default WhyUs;
