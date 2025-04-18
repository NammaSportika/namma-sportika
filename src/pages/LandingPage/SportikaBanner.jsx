import { motion } from "framer-motion";
import TiltedCard from "../../components/ui/TiltedCard";
import { useEffect, useState } from "react";

const SportikaBanner = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  
  useEffect(() => {
    setHasLoaded(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden" id="home">
      <img
        src="/imgs/BannerImg/Final.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
      />

      <div className="absolute inset-0 bg-black opacity-35"></div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4">
        <motion.div 
          className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl"
          initial={{ scale: 0.7, opacity: 0.5 }}
          animate={{ 
            scale: hasLoaded ? 1 : 0.7, 
            opacity: hasLoaded ? 1 : 0.5 
          }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            delay: 0.3
          }}
        >
          <div className="relative aspect-[4/3] w-full top-15">
            <TiltedCard
              imageSrc="/imgs/BannerImg/Bannner.png"
              altText="Sportika Logo"
              captionText="Sportika"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={10}
              scaleOnHover={1.03}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={false}
            />
          </div>
        </motion.div>

        <motion.div 
          className="mt-4 md:mt-6 transform transition-all duration-1000 ease-out"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: hasLoaded ? 1 : 0, 
            y: hasLoaded ? 0 : 20 
          }}
          transition={{ 
            duration: 0.8, 
            delay: 0.8 
          }}
        >
        </motion.div>
      </div>
    </div>
  );
};

export default SportikaBanner;