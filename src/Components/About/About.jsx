import React from "react";
import animation from "../../assets/animations/aboutUsAnimation.gif";
import {
  Container,
  Fade,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { X } from "lucide-react";
// const familyMembers = [
//   {
//     name: "John Doe",
//     role: "CEO",
//     image: "/placeholder.svg?height=200&width=200",
//     bio: "John has over 20 years of experience in business management and strategy.",
//   },
//   {
//     name: "Jane Smith",
//     role: "CTO",
//     image: "/placeholder.svg?height=200&width=200",
//     bio: "Jane is a tech visionary with a strong background in software engineering.",
//   },
//   {
//     name: "Mike Johnson",
//     role: "CFO",
//     image: "/placeholder.svg?height=200&width=200",
//     bio: "Mike brings 15 years of financial expertise to our team.",
//   },
//   {
//     name: "Sarah Williams",
//     role: "COO",
//     image: "/placeholder.svg?height=200&width=200",
//     bio: "Sarah excels in optimizing business operations and driving growth.",
//   },
//   {
//     name: "Alex Brown",
//     role: "CMO",
//     image: "/placeholder.svg?height=200&width=200",
//     bio: "Alex is a marketing guru with a passion for innovative strategies.",
//   },
// ];

const About = () => {
//   const [selectedMember, setSelectedMember] = useState(null);
  // Scrolling Bug Fixed
  window.scroll({ top: 0 });
  return (
    <div className=" min-h-screen pt-20 px-2 flex items-center sm:px-6 lg:px-8">
      <Fade in={true}>
        <Container>
          <div className="max-w-7xl pb-5 container mx-auto ">
            <div className="lg:grid md:grid-cols-2">
              {/* Animation */}
              <div className="col flex order-last justify-center">
                <img
                  className="xl:h-[30rem] lg:h-[28rem] md:h-[22rem] h-[17.5rem]"
                  src={animation}
                  alt="about_us"
                />
              </div>
              <div className="xl:space-y-7 lg:space-y-5 md:space-y-7 space-y-5 sm:mt-0 sm:px-0">
                {/* Title */}
                <span className="px-4 py-2 bg-[#2e7d32] hover:bg-[#123f1e] cursor-pointer text-white rounded-full text-sm">
                  About
                </span>
                <h2 className="xl:text-3xl md:text-3xl lg:text-2xl text-2xl font-semibold text-gray-800">
                  Welcome to Our Grocery App
                </h2>
                {/* Article */}
                <p className=" text-justify xl:text-base lg:text-sm md:text-base text-sm text-gray-600">
                  At <strong>Grocery</strong>, we are committed to providing you
                  with the freshest and highest quality products for your
                  everyday needs. Our extensive range includes fresh vegetables,
                  succulent meats, dairy products, pantry essentials, and much
                  more. We carefully select our suppliers to ensure that you
                  receive only the best.
                  <br />
                  <br />
                  With our user-friendly interface and reliable delivery
                  service, grocery shopping has never been easier. Simply browse
                  our wide selection, add items to your cart, and enjoy the
                  convenience of doorstep delivery. Say goodbye to long
                  supermarket queues and heavy bags.
                  <br />
                  <br />
                  We take pride in our commitment to exceptional customer
                  service. Our dedicated support team is always ready to assist
                  you with any questions or concerns you may have. Your
                  satisfaction is our top priority.
                  <br />
                  <br />
                  Experience the convenience and joy of shopping from the
                  comfort of your home. Join us at <strong>Grocery</strong> and
                  discover a new way to grocery shop.
                  <br />
                  <br />
                  Start shopping now and make your everyday life healthier and
                  more convenient.
                </p>
                <div className="mt-6">
                  {/* Button */}
                  {/* <button className="px-6 py-3 text-sm font-medium tracking-wider text-white bg-indigo-500 hover:bg-indigo-600 rounded-md">
                    Learn More
                  </button> */}

                  {/* Call to Action */}
                  {/* <div className="mt-4"></div> */}
                  {/* Values Section */}
                </div>
              </div>
            </div>
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <span className="px-4 py-2 bg-[#2e7d32] hover:bg-[#123f1e] cursor-pointer text-white rounded-full text-sm">
                    Our Values
                  </span>
                  <h2 className="text-3xl font-bold mt-4">
                    Hear what people are saying about our Products & Services.
                  </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Quality Products",
                      icon: "⚜️",
                    },
                    {
                      title: "Fresh Products",
                      icon: "🎯",
                    },
                    {
                      title: "On-Time Delivery",
                      icon: "✨",
                    },
                  ].map((item, index) => (
                    <Card key={index} className="p-6 text-center bg-[#123f1e]">
                      <div className="text-3xl mb-4">{item.icon}</div>
                      <h3 className="font-bold text-xl mb-4">{item.title}</h3>
                      <p className="text-[#123f1e] mb-4">
                        We always strive to provide our customers with the grace and gratitude. We provide top notch products as per our customer's requirements with happy faces.
                      </p>
                      <button
                        className="bg-[#2e7d32] hover:bg-[#123f1e] px-5 py-2.5 rounded-full text-sm text-white"
                      >
                        Read More →
                      </button>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Mission Section */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <span className="px-4 py-2 bg-[#2e7d32] hover:bg-[#123f1e] cursor-pointer text-white rounded-full text-sm">
                      Our Mission
                    </span>
                    <h2 className="text-3xl font-bold">
                      Hear what people are saying about our Products.
                    </h2>
                    <p className="text-black">
                      As Business Coaches, we not only understand the nuances
                      necessary to navigate the hiring cycle but can help
                      discover the right path to a rewarding career or
                      assistance in "moving up" the ladder.
                    </p>
                    {/* <button className="bg-[#2e7d32] hover:bg-[#123f1e] px-5 py-2.5 rounded-full text-sm text-white">
                      Join Our Coaching →
                    </button> */}
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">
                      "How we provide quality products for our customers and provide our customers with the best possible experience."
                    </h3>
                    <p className="text-black">
                      Our team of expert coaches understands the nuances
                      necessary to navigate the hiring cycle and can help
                      discover the right path to a rewarding career or
                      assistance in advancing your current position.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#2e7d32]" />
                        <span>We want to understand you.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#2e7d32]" />
                        <span>Positive Thoughts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#2e7d32]" />
                        <span>Fast Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </Container>
      </Fade>
    </div>
  );
};

export default About;
