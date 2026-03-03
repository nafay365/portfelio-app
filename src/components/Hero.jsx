import { motion } from "framer-motion";

import { styles } from "../styles";
import { AvatarCanvas } from "./canvas";
import CozyDev2D from "./CozyDev2D";
import useDeviceDetect from "../hooks/useDeviceDetect";


const Hero = () => {
  const { shouldUse2D, deviceInfo } = useDeviceDetect();

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} dark:text-white text-gray-900`}>
            Hi, I'm <span className='text-[#915EFF]'>Abdul Nafay</span>
          </h1>

        </div>
      </div>

      {/* Background - 3D on desktop, Terminal on mobile */}
      <div className='absolute inset-0 z-0'>
        {shouldUse2D ? (
          <CozyDev2D />
        ) : (
          <AvatarCanvas />
        )}
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 dark:border-secondary border-gray-400 flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full dark:bg-secondary bg-gray-600 mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;

