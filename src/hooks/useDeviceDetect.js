import { useState, useEffect } from 'react';

/**
 * Device detection hook for smart device switching
 * Returns true if device should use 2D Cozy Dev version
 */
const useDeviceDetect = () => {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [isMobileOS, setIsMobileOS] = useState(false);
  const [isLargeScreenMobile, setIsLargeScreenMobile] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({
    os: 'unknown',
    hardwareConcurrency: 0,
    screenWidth: 0,
    isMobile: false,
  });

  useEffect(() => {
    const detectDevice = () => {
      // Get user agent
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Check for mobile OS (Android, iOS, Chrome OS)
      const isAndroid = /android/i.test(userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const isChromeOS = /cros/i.test(userAgent);

      const mobileOS = isAndroid || isIOS || isChromeOS;
      setIsMobileOS(mobileOS);

      // Check hardware concurrency (number of CPU cores)
      const cores = navigator.hardwareConcurrency || 4;
      const lowEnd = cores < 4;
      setIsLowEndDevice(lowEnd);

      // Check screen size for tablets
      const screenWidth = window.innerWidth;
      const isLargeScreen = screenWidth >= 768 && mobileOS;
      setIsLargeScreenMobile(isLargeScreen);

      // Detect OS
      let os = 'desktop';
      if (isAndroid) os = 'android';
      else if (isIOS) os = 'ios';
      else if (isChromeOS) os = 'chromeos';
      else if (/Windows/i.test(userAgent)) os = 'windows';
      else if (/Mac/i.test(userAgent)) os = 'mac';

      setDeviceInfo({
        os,
        hardwareConcurrency: cores,
        screenWidth,
        isMobile: mobileOS,
      });
    };

    // Run detection
    detectDevice();

    // Re-check on resize for screen size changes
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  // Should use 2D version if:
  // 1. Mobile OS (Android, iOS, Chrome OS)
  // 2. Low end device (hardwareConcurrency < 4)
  // 3. Large screen but mobile OS (High-end tablet rule)
  const shouldUse2D = isMobileOS || isLowEndDevice || isLargeScreenMobile;

  return {
    shouldUse2D,
    isMobileOS,
    isLowEndDevice,
    isLargeScreenMobile,
    deviceInfo,
  };
};

export default useDeviceDetect;
