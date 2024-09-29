import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMutation, useQueryClient } from "react-query";
import { Response } from "./types";

const useDeleteIuran = () => {
  const queryClient = useQueryClient();
  const auth = useAuthHeader();

  const deleteIuran = async (iuran_id: number) => {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/iurans/${iuran_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth || '',
      },
    });

    return response.json();
  }


  return useMutation<Response, Error, number>(deleteIuran, {
    onSuccess: () => {
      queryClient.invalidateQueries('iurans');
    },
  });
}

export default useDeleteIuran;