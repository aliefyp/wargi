import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery } from "react-query";
import { Response } from "./types";

const useGetAllUnit = () => {
  const auth = useAuthHeader();

  return useQuery<Response, Error>({
    queryKey: "units",
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/units`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": auth || '',
        },
      });

      return response.json();
    },
  })
}

export default useGetAllUnit;