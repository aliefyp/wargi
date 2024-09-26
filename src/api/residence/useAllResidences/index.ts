import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery } from "react-query";
import { Response } from "./types";

const useAllResidence = () => {
  const auth = useAuthHeader();

  return useQuery<Response, Error>({
    queryKey: "residence",
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/residences`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": auth || '',
        },
      });

      if (response.status === 403) {
        throw new Error("Forbidden");
      }

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to fetch");
      }

      return response.json();
    },
  })
}

export default useAllResidence;