import { useState } from "react";
import axios from "axios";

const usePost = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);

  const postData = async (postData: any) => {
    try {
      setLoading(true);
      const response = await axios.post(url, postData);
      setData(response.data);
      setLoading(false);
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePost;
