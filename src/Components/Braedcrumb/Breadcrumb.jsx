import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Breadcrumb = () => {
  const [path, setPath] = React.useState(["Home"]);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = {
    Home: ["About", "Categories", "Services", "Contact"],
    Footer: [
      "AboutUs",
      "WhyUs",
      "Security",
      "Testimonials",
      "Account",
      "SupportCenter",
      "PrivacyPolicy",
      "TermsAndConditions",
    ],
  };

  React.useEffect(() => {
    const currentPath = location.pathname.split("/").filter(Boolean);
    if (currentPath.length === 0) {
      setPath(["Home"]);
    } else {
      setPath([
        "Home",
        ...currentPath.map(
          (segment) => segment.charAt(0).toUpperCase() + segment.slice(1)
        ),
      ]);
    }
  }, [location]);

  const handleClick = (item, index) => {
    if (item === "Home") {
      setPath(["Home"]);
      navigate("/");
      return;
    }

    const newPath = path
      .slice(0, index + 1)
      .join("/")
      .toLowerCase();
  };

  return (
    <div className="mt-16 w-full h-32 bg-green-900">
      <div className="relative p-12">
        <nav className="flex items-center space-x-2">
          {path.map((item, index) => (
            <React.Fragment key={item}>
              <span
                onClick={() => handleClick(item, index)}
                className="cursor-pointer text-white hover:underline transition-colors"
              >
                {item}
              </span>
              {index < path.length - 1 && (
                <span className="text-white">→</span> // Add arrow separator
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
