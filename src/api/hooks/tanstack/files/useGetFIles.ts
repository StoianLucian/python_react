import { useQuery } from "@tanstack/react-query";
import { getFIles } from "../../../fileApi";


const useGetFiles = () => {

  return useQuery({
    queryFn: () => getFIles(),
    queryKey: ["files"],
  });
};

export default useGetFiles;
