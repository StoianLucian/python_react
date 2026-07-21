import { ApiMethod, request } from "./axiosConfig";

const SKILL_ROUTES = {
    SKILLS: "/skills",
}

export async function getSkills() {
    const skills = [
        {
            id: "send-email",
            name: "Send Email",
        },
        {
            id: "schedule-meeting",
            name: "Schedule Meeting",
        },
        {
            id: "create-calendar-event",
            name: "Create Calendar Event",
        },
        {
            id: "generate-report",
            name: "Generate Report",
        },
        {
            id: "summarize-text",
            name: "Summarize Text",
        },
        {
            id: "translate-text",
            name: "Translate Text",
        },
        {
            id: "analyze-data",
            name: "Analyze Data",
        },
        {
            id: "generate-invoice",
            name: "Generate Invoice",
        },
        {
            id: "create-task",
            name: "Create Task",
        },
        {
            id: "search-documents",
            name: "Search Documents",
        },
        {
            id: "upload-file",
            name: "Upload File",
        },
        {
            id: "download-report",
            name: "Download Report",
        },
        {
            id: "notify-user",
            name: "Notify User",
        },
        {
            id: "generate-qr-code",
            name: "Generate QR Code",
        },
        {
            id: "export-pdf",
            name: "Export PDF",
        },
    ];

    return skills
    return await request({ method: ApiMethod.GET, url: SKILL_ROUTES.SKILLS })
}
