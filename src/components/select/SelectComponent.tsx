import { Box, CircularProgress, MenuItem, Select } from "@mui/material";
import { type Dispatch, type SetStateAction } from "react";

type Option = {
    [key: string]: string;
    name: string;
};

type SelectProps<V extends string = string> = {
    options: Option[];
    onChange: Dispatch<SetStateAction<V>>;
    value: V;
    itemKey?: string;
    isLoading: boolean
};

export default function SelectComponent<V extends string = string>({ options, onChange, value, itemKey = "id", isLoading }: SelectProps<V>) {

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
                        const newValue = e.target.value as V;
                        onChange(newValue);
                    }}
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