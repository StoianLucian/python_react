import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../enums/queryKeys";
import { previewFile } from "../../../fileApi";

const usePreviewFile = (id?: string) => {
    // const navigate = useNavigate();
    const query = useQuery({
        queryKey: queryKeys.file(id!),
        queryFn: () => previewFile(id!),
        enabled: !!Number(id)
    });

    return query
};

export default usePreviewFile;
