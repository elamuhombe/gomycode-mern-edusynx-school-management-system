import { useEffect, useState } from "react";

const headers = { "Content-Type": "application/json" };

type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

const useFetch = (path: string, method: FetchMethod = "GET", postData: any = null) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const options: RequestInit = {
          method,
          headers,
        };
        if (method === "POST" || method === "PUT") {
          options.body = JSON.stringify(postData);
        }

        const response = await fetch(path, options);
        const result = await response.json();

        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [path, method, postData]);

  const handleLogin = async (loginPath: string, loginData: { username: string; password: string }) => {
    const response = await fetch(loginPath, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers,
    });
    return await response.json();
  };

  return {
    data,
    error,
    isLoading,
    handleLogin,
  };
};

export default useFetch;

