import { useState, useEffect, useCallback } from "react";

const useNavBarScrollAnimate = () => {
  const [showBG, setBG] = useState(false);

  const handleScroll = useCallback(() => {
    setBG(window.scrollY > 0);
  }, [showBG]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return { showBG };
};

export default useNavBarScrollAnimate;
