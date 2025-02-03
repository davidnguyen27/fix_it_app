import { useEffect, useState } from "react";

const useCoundownTimer = (initialTime: number) => {
  const [timer, setTimer] = useState<number>(initialTime);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const resetTimer = () => {
    setTimer(initialTime);
  };

  return { timer, resetTimer };
};

export default useCoundownTimer;
