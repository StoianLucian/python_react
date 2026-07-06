import { Button, Popover } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import usePreviewFile from "../../api/hooks/tanstack/files/usePreviewFile";
import type { Entity } from "../../types/chat";
import PdfPreview from "../PdfPreview/PdfPreview";

// import { Document, Page } from "react-pdf";


// import { pdfjs } from "react-pdf";

// // IMPORTANT: match your installed pdfjs-dist version
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     "pdfjs-dist/build/pdf.worker.min.mjs",
//     import.meta.url
// ).toString();

// import { pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc =
//   `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// // import { pdfjs } from "react-pdf";


// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

// function ViewerPdf({ fileUrl }: { fileUrl: string }) {
//     return (
//         <Document file={fileUrl}>
//             <Page pageNumber={1} />
//         </Document>
//     );
// }

// src/components/PdfViewer.tsx

// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { searchPlugin } from '@react-pdf-viewer/search';
// import { zoomPlugin } from '@react-pdf-viewer/zoom';
// import '@react-pdf-viewer/zoom/lib/styles/index.css';

// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/search/lib/styles/index.css';



// function PdfViewer({ pdfUrl }: { pdfUrl: string }) {
//     const searchPluginInstance = searchPlugin();
//     const zoom = zoomPlugin()
//     const { Search, highlight } = searchPluginInstance;
//     // const {
//     //     ZoomIn,
//     //     ZoomOut,
//     //     ZoomPopover,
//     // } = zoom;

//     useEffect(() => {
//         if (!pdfUrl) return;

//         highlight(['invoice']);
//     }, [pdfUrl]);

//     return (
//         <div>
//             <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//                 <div style={{ marginBottom: 16 }}>
//                     <Search>
//                         {(props) => (
//                             <>
//                                 <input
//                                     value={props.keyword}
//                                     onChange={(e) => props.setKeyword(e.target.value)}
//                                 />
//                                 <button onClick={props.search}>Search</button>
//                             </>
//                         )}
//                     </Search>
//                 </div>

//                 {/* <div style={{ height: '800px', border: '1px solid #ddd' }}> */}
//                 <Viewer
//                     fileUrl={pdfUrl}
//                     defaultScale={1}
//                     plugins={[searchPluginInstance, zoom]}
//                     onDocumentLoad={() => {
//                         highlight(['invoice']);
//                     }}
//                 />
//                 {/* </div> */}
//             </Worker>
//         </div>
//     );
// }







export default function HoverPopover({ item, fileId }: { item: Entity, fileId?: string }) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    // const defaultLayout = useMemo(() => defaultLayoutPlugin(), []);

    const open = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    console.log(fileId)

    const { data: files = "", isFetching } = usePreviewFile(fileId!)

    const pdfUrl = useMemo(() => {
        if (!files) return null;
        return URL.createObjectURL(files);
    }, [files]);

    useEffect(() => {
        return () => {
            if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        };
    }, [pdfUrl]);

    // const zoomPluginInstance = zoomPlugin();
    // const { ZoomIn, ZoomOut, ZoomPopover } = zoomPluginInstance;


    return (
        <div>
            <Button
                onClick={open}
            >
                {item.content}
            </Button>

            <Popover className="text-right" slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: "rgba(0,0,0,0.3)",
                    },
                },
            }} open={!!anchorEl} anchorEl={anchorEl} onClose={(_event, reason) => {
                if (reason === "backdropClick") {
                    setAnchorEl(null);
                }
            }}>
                <Button onClick={() => { setAnchorEl(null) }}>X</Button>

                {/* <ReactPdf pdfUrl={pdfUrl} loading={isFetching} /> */}

                {/* <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>

                    <div style={{ height: "80vh", width: "100%" }}>
                        {pdfUrl && <Viewer fileUrl={pdfUrl} plugins={[zoomPluginInstance]}   className="w-screen h-[90vh] rounded"/>}
                    </div>


                </Worker> */}
                {/* {pdfUrl && <PdfViewer pdfUrl={pdfUrl} />} */}
                <PdfPreview pdfUrl={pdfUrl} loading={isFetching} pageNumber={item.page_number} />


            </Popover>
        </div >
    );
}

