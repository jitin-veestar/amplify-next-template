import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axios";

export const queryKey = {
  form: "form",
};

export async function submitForm(id: string | number, body: any) {
  const path = window.location.pathname;
  const url = "/form" + "/" + id;

  let res = await axios.put(url, body);
  console.log("body params", body);
  return res.data;
}

export async function registerForm(params: IRegisterFormPayload) {
  const path = window.location.pathname;
  params.path = path;
  let res = await axios.post("/form", params);
  return res.data;
}
export async function getForm(id: string | number) {
  const url = "/form" + "/" + id;
  console.log("id", id);
  let response = await axios.get(url).then((res) => res.data);
  return response.data;
}
export const useGetFormDetails = (params: { id: string | number }) => {
  return useQuery({
    queryKey: [queryKey.form],
    queryFn: () => getForm(params.id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
