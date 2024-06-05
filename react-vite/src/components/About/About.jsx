import "./About.css";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <div className="about">
      {/* <h1>Welcome To My Bar</h1> */}

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
    </div>
  );
};

export default About;
