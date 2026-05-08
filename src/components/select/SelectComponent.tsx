import { MenuItem, Select } from "@mui/material";
import { type Dispatch, type SetStateAction } from "react";

type Option = {
    [key: string]: string;
    name: string;
};

type SelectProps = {
    options: Option[];
    onChange: Dispatch<SetStateAction<string>>;
    value: string | number;
    itemKey: string;
};

export default function SelectComponent({ options, onChange, value, itemKey }: SelectProps) {

    return (
        <Select
            className="w-auto"
            value={value}
            onChange={(e) => {
                const newValue = e.target.value as string;
                onChange(newValue);
            }}
        >
            {options.map((option) => (
                <MenuItem key={option[itemKey]} value={option[itemKey]}>
                    {option.name}
                </MenuItem>
            ))}
        </Select>
    );
}