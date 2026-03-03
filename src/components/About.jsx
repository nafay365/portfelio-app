import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='glass-card rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='dark:text-white text-gray-900 text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 dark:text-secondary text-gray-600 text-[17px] max-w-3xl leading-[30px]'
      >
        Hi, I'm Abdul Nafay, a Pakistan-based high school student with a deep-rooted passion for the intersection of design and code. As a Graphic Designer advanced in Adobe Illustrator and a seasoned Video Editor, I specialize in creating visual stories that stick.
        <br /><br />
        Beyond the visuals, I build for the web. I am an Intermediate Frontend Developer with a solid foundation in Backend Development, allowing me to bridge the gap between aesthetic design and functional technology. I don't just create things that look good—I build things that work.
        <br /><br />
        What sets me apart is my mastery of the physical machine. I specialize in Computer Hardware & Software Repair, with a technical understanding of hardware at a microscopic level. Whether it is troubleshooting complex software environments or performing precision component-level hardware diagnostics, I bridge the gap between digital creativity and physical engineering.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");

