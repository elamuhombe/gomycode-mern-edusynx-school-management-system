import { useState } from "react";

const headers = { "Content-Type": "application/json" };

const useSubmitForm = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (path: string, method = "POST", postData: any )=>{
    setIsLoading(true);
    let result = null;
    try {
      switch (method) {
        case "POST":
          // console.log({postData})
          result = await (
            await fetch(path, {
              method,
              body: JSON.stringify(postData),
              headers,
            })
          ).json();
          break;
          case "PUT":
            try {
              const response = await fetch(path, {
                method,
                body: JSON.stringify({ ...postData, id: postData.id }),
                headers,
              });
          
              if (!response.ok) {
                throw new Error(`PUT request failed: ${response.status}`);
              }
          
              result = await response.json();
              return result;
            } catch (error) {
              console.error("Error submitting PUT request:", error);
              // Handle errors (e.g., display error message to user)
              throw error; // Re-throw for potential handling in the calling function
            }
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
      console.log({ result });
      return result;
    } catch (error) {
      setError("error");
    } finally {
      setIsLoading(false);
    }
    return result;
  };

  return {
    data,
    error,
    isLoading,
    submitForm,
  };
};

export default useSubmitForm;
