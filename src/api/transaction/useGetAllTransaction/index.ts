import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery } from "react-query";
import { Response } from "./types";

const useGetAllTransaction = (query: string) => {
  const auth = useAuthHeader();

  return useQuery<Response, Error>({
    queryKey: ["transactions", query],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/transactions?populate=unit&${query}`, {
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

export default useGetAllTransaction;