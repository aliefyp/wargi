import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery, UseQueryOptions } from "react-query";
import { Response } from "./types";

interface Props extends UseQueryOptions<Response, Error> {
  iuran_id: number
}

const useGetIuranById = ({ iuran_id, ...rest }: Props) => {
  const auth = useAuthHeader();

  return useQuery<Response, Error>({
    queryKey: ["iurans", iuran_id],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/iurans/${iuran_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": auth || '',
        },
      });

      return response.json();
    },
    ...rest,
  })
}

export default useGetIuranById;