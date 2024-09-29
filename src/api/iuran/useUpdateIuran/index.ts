import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMutation, useQueryClient } from "react-query";
import { Payload, Response } from "./types";

const useUpdateIuran = () => {
  const queryClient = useQueryClient();
  const auth = useAuthHeader();

  const updateIuran = async ({ id, ...rest }: Payload) => {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/iurans/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth || '',
      },
      body: JSON.stringify(rest),
    });

    return response.json();
  }


  return useMutation<Response, Error, Payload>(updateIuran, {
    onSuccess: () => {
      queryClient.invalidateQueries('iurans');
    },
  });
}

export default useUpdateIuran;