import { useEffect, useState } from "react";
import { json } from "react-router-dom";

const headers = { "Content-Type": "application/json" };

export const useFetch = (
  path: string,
  method: string = "GET",
  postData: any = null
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        let result = null;
        switch (method) {
          case "POST":
          case "PUT":
            result = await (
              await fetch(path, {
                method,
                body: JSON.stringify(postData),
                headers,
              })
            ).json();
            break;
          case "DELETE":
            result = await (
              await fetch(path, {
                method,
                headers,
              })
            ).json();
            break;
          default:
            result = await (
              await fetch(path, {
                method,
                headers,
              })
            ).json();
            break;
        }
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [path, method, postData]);

  //   Handle Login
  const handleLogin = async(
    path: string,
    data: { username: string; password: string }
  ) => {
    return await (await fetch(path, { method: "POST", body: JSON.stringify(data), headers })).json();
  };
  return {
    data,
    error,
    isLoading,
    handleLogin
  };
};
