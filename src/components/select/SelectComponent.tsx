import { Box, CircularProgress, MenuItem, Select } from "@mui/material";
import { type Dispatch, type SetStateAction } from "react";

type Option = {
    [key: string]: string;
    name: string;
};

type SelectProps = {
    options: Option[];
    onChange: Dispatch<SetStateAction<string>>;
    value: string | number;
    itemKey?: string;
    isLoading: boolean
};

export default function SelectComponent({ options, onChange, value, itemKey = "id", isLoading }: SelectProps) {

    return (
        <Box>
            {isLoading
                ?
                <CircularProgress size={50} />
                :
                <Select
                    className="w-full"
                    value={value}
                    onChange={(e) => {
                        const newValue = e.target.value as string;
                        onChange(newValue);
                    }}
                    // sx={{
                    //     position: "absolute",
                    //     opacity: 0,
                    //     width: 0,
                    //     height: 0,
                    //     pointerEvents: "none",
                    // }}
                >
                    {options.map((option) => (
                        <MenuItem key={option[itemKey]} value={option[itemKey]}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>}
        </Box>
    );
}