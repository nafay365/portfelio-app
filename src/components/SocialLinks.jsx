import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { socialLinks } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const SocialLinks = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText} dark:text-secondary text-gray-600`}>Connect with me</p>
                <h2 className={`${styles.sectionHeadText} dark:text-white text-gray-900`}>Social Links.</h2>
            </motion.div>

            <div className='mt-10 flex flex-wrap justify-center gap-10'>
                {socialLinks.map((social, index) => (
                    <motion.div
                        key={social.name || index}
                        variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                        className='flex flex-col items-center'
                    >
                        <a
                            href={social.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='w-20 h-20 dark:bg-white/10 bg-gray-200 backdrop-blur-sm border dark:border-white/20 border-gray-300 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-all duration-300 dark:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] shadow-lg'
                        >
                            <img
                                src={social.icon}
                                alt={social.name}
                                className='w-12 h-12 object-contain'
                            />
                        </a>
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(SocialLinks, "socials");
