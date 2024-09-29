import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMutation, useQueryClient } from "react-query";
import { Payload, Response } from "./types";

const useInsertIuran = () => {
  const queryClient = useQueryClient();
  const auth = useAuthHeader();

  const insertIuran = async (payload: Payload) => {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/iurans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth || '',
      },
      body: JSON.stringify(payload),
    });

    return response.json();
  }


  return useMutation<Response, Error, Payload>(insertIuran, {
    onSuccess: () => {
      queryClient.invalidateQueries('iurans');
    },
  });
}

export default useInsertIuran;