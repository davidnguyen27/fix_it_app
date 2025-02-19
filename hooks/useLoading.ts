import { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const withLoading = async <T>(callback: () => Promise<T>): Promise<T> => {
    setLoading(true);
    try {
      return await callback();
    } finally {
      setLoading(false);
    }
  };
  return { loading, withLoading };
};

export default useLoading;
