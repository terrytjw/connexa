import { useState, useEffect } from "react";

interface dimensions {
  width: number | null;
  height: number | null;
}

export default function useWindowDimensions(): dimensions {
  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions(): dimensions {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width: width,
      height: height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState<dimensions>(
    getWindowDimensions()
  );

  function handleResize(): void {
    setWindowDimensions(getWindowDimensions());
  }

  useEffect(() => {
    if (hasWindow) {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}
