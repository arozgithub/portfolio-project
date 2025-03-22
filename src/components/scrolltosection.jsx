import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToSection = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 60, // Offset for fixed navbar
            behavior: "smooth",
          });
        }
      }, 100); // Small delay to allow rendering
    }
  }, [hash]);

  return null;
};

export default ScrollToSection;
