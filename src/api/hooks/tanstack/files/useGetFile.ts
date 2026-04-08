import { useMutation } from "@tanstack/react-query";
import { getFile } from "../../../fileApi";



const useGetFile = () => {

  return useMutation({
    mutationFn: ({ id, filename }: { id: string; filename: string }) => getFile(id, filename),
  });
};

export default useGetFile;
