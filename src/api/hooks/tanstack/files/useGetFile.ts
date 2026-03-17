import { useMutation, useQuery } from "@tanstack/react-query";
import { getFile, getFIles } from "../../../fileApi";


const useGetFile = () => {

  return useMutation({
    mutationFn: (id: any) => getFile(id),
    // refetchInterval: queryTime("1h"),
    // enabled: !!filters,
    // onError: (error: Error) => {
    //   showToaster(
    //     t(`${TRANSLATION_KEY.ERRORS}:${error}`),
    //     ToastStatusEnum.ERROR
    //   );
    // },
  });
};

export default useGetFile;
