import { useState, useEffect } from "react";
import "./About.css";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { CiLight } from "react-icons/ci";

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="about">
      <div className="image-container">
        <img src="/erikbar.png" alt="Erik's Bar" />
        <a
          href="https://github.com/ErikHervall11"
          className="icongit-wrapper"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="icongit" />
        </a>
        <a
          href="https://www.linkedin.com/in/erik-hervall-8ba620a3/"
          className="icongit-wrapper2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="icongit" />
        </a>
      </div>
      <CiLight className="light-bulb" />
      <CiLight className="light-bulb2" />
      <CiLight className="light-bulb3" />
    </div>
  );
};

export default About;
