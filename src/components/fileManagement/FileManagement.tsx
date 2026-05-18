import { Box, Stack, Typography } from '@mui/material'
import { translations } from '../../../i18n'
import Icon, { IconsEnum } from '../Icons/Icon'
import InputComponent from '../inputComponent/InputComponent'
import { useState } from 'react'
import useGetFiles, { type File } from '../../api/hooks/tanstack/files/useGetFIles'
import { useUploadFile } from '../../api/hooks/tanstack/files/useUploadFile'
import FileDetails from '../FileDetails/FileDetails'
import LoadingRows from '../LoadingRows/LoadingRows'
import { useTranslation } from 'react-i18next'

type FileManagementProps = {
    isDragging: boolean
}

export default function FileManagement({ isDragging }: FileManagementProps) {

    const { t } = useTranslation();

    const [search, setSearch] = useState("")

    const handleSearch = (value: string) => {
        setSearch(value)
    }

    const { data: files = [], isLoading } = useGetFiles();
    const { mutateAsync: uploadFile } = useUploadFile();

    function renderFiles(files: File[], isLoading: boolean) {
        if (isLoading) {
            return <LoadingRows rows={10} />;
        }

        if (!files || files.length === 0) {
            return <p className="text-gray-500 text-center py-4">{t(translations.filesPage.noAvailableFiles)}</p>;
        }

        return (
            <>
                {files.map((file) => (
                    <FileDetails key={file.id} file={file} />
                ))}
            </>
        );
    }

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            const response = await uploadFile(files[0]);
            console.log(response);
        }

    };

    return (
        <Box className="flex flex-col gap-5 my-10">
            <InputComponent
                value={search}
                onChange={(value) => handleSearch(value)}
                endIcon={
                    <Icon
                        iconName={IconsEnum.PROFILE}
                        className='mx-1'
                    />
                }
            />
            <Box
                onDrop={handleDrop}
                className={`
                                h-60
                                transition-all duration-200
                                ${isDragging ? "bg-blue-50 border-blue-400" : ""}
                                border-2 border-dashed rounded-lg
                                flex justify-center items-center
                                flex-col
                            `}>
                <Icon iconName={IconsEnum.PDF} size={100} />
                {t(translations.filesPage.dragFile)}
            </Box>
            <Stack
                direction="column"
                className='h-[20rem]'
            >
                <Typography variant="h6" >Recently uploaded documents</Typography>
                {renderFiles(files, isLoading)}
            </Stack>
        </Box>
    )
}
