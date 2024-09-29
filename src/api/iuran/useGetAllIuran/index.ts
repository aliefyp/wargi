import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery } from "react-query";
import { Response } from "./types";

const useGetAllIuran = () => {
  const auth = useAuthHeader();

  return useQuery<Response, Error>({
    queryKey: "iurans",
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/iurans`, {
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

export default useGetAllIuran;