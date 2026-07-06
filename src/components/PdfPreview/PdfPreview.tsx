import { Box, CircularProgress } from "@mui/material";

export default function PdfPreview({ pdfUrl, pageNumber }: { pdfUrl?: string | null, loading: boolean, pageNumber?: string }) {

    function setParams(
        paramMappings: Record<string, any>,
    ): string {
        const params = new URLSearchParams();

        Object.entries(paramMappings).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
                value.map((v) => params.append(key, v));
            } else if (
                !Array.isArray(value) &&
                value !== undefined &&
                value !== null &&
                value !== ""
            ) {
                params.append(key, value);
            }
        });

        return params.toString();
    }
    const paramMappings: Record<string, any> = {
        page: pageNumber,
    };
    return (
        <Box className="rounded">
            {pdfUrl ? (
                <iframe
                    className="w-[99vw] h-[90vh] rounded"
                    src={`${pdfUrl}#${setParams(paramMappings)}`}
                    title="PDF Preview"
                />
            ) : <CircularProgress />}
        </Box>
    );
}