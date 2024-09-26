import { useMutation } from "react-query";
import { Response } from "./types";

interface Payload {
  identifier: string;
  password: string;
}

const useLogin = () => {
  return useMutation<Response, Error, Payload>(async (payload: Payload) => {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

export default useLogin;