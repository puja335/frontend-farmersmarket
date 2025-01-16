// import OurServicesAndQualities from "../../OurServicesAndQualities/OurServicesAndQualities";
// import { useMediaQuery } from "@mui/material";
// import truck from "../../../assets/icons/service_icons/truck.png";
// import headphones from "../../../assets/icons/service_icons/headphones.png";
// import location from "../../../assets/icons/service_icons/location.png";
// import price from "../../../assets/icons/service_icons/price.png";
import { createContext } from "react";
// import CustomersReview from "../CustomersReview/CustomersReview";
import React from "react";
import { Carrot, Apple, Truck, Calendar, ShoppingBasket } from "lucide-react";
import CustomersReview from "../CustomersReview/CustomersReview";

export const servicesContext = createContext();
const OurServices = () => {
  const services = [
    {
      icon: <Apple className="w-12 h-12 text-green-600" />,
      title: "Local Produce",
      description:
        "Fresh, seasonal fruits and vegetables sourced directly from local farmers within 50 miles.",
      features: [
        "Organic Options",
        "Seasonal Varieties",
        "Farm-to-Table Quality",
      ],
    },
    {
      icon: <Truck className="w-12 h-12 text-blue-600" />,
      title: "Community Delivery",
      description:
        "Convenient home delivery and pickup options for local produce and market goods.",
      features: [
        "Weekly Subscription",
        "Flexible Scheduling",
        "Zero-Waste Packaging",
      ],
    },
    {
      icon: <Calendar className="w-12 h-12 text-orange-600" />,
      title: "Market Events",
      description:
        "Community workshops, cooking demonstrations, and seasonal festivals.",
      features: [
        "Cooking Classes",
        "Farmer Meet & Greets",
        "Local Artisan Showcases",
      ],
    },
  ];
  return (
    <servicesContext.Provider value={true}>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Community Farmers Market</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Supporting local agriculture, sustainable farming, and community
            connections.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {service.icon}
                <h2 className="ml-4 text-2xl font-semibold text-gray-800">
                  {service.title}
                </h2>
              </div>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-gray-600"
                  >
                    <Carrot className="w-5 h-5 mr-2 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-[#2e7d32] hover:bg-[#123f1e] text-white px-8 py-3 rounded-lg transition-colors">
            Explore Market Offerings
          </button>
        </div>
      </div>
      <CustomersReview />
    </servicesContext.Provider>
  );
};
export default OurServices;
