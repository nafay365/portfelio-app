import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='glass-card p-10 rounded-3xl w-full'
  >
    <p className='dark:text-white text-gray-900 font-black text-[48px]'>"</p>

    <div className='mt-1'>
      <p className='dark:text-white text-gray-900 tracking-wider text-[18px] whitespace-pre-line'>{testimonial}</p>

      <div className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          <p className='dark:text-white text-gray-900 font-medium text-[16px]'>
            <span className='blue-text-gradient'>@</span> {name}
          </p>

        </div>


      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className={`mt-12 bg-transparent rounded-[20px]`}>
      <div
        className={`glass-card rounded-2xl ${styles.padding}`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Expertise & Learning</p>
          <h2 className={styles.sectionHeadText}>About Nafay's Knowledge, courses and education.</h2>
        </motion.div>
      </div>
      <div className={`mt-5 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
