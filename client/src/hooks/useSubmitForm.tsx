import { useState } from "react";

const headers = { "Content-Type": "application/json" };

const useSubmitForm = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (path: string, method = "POST", postData:any) => {
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
    } catch (error) {
      setError("error");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    submitForm
  };
};

export default useSubmitForm;
