import { TextField } from '@mui/material'
import { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs';

type InputComponentProps = {
    value: string
    onChange: () => void
    label?: string
    type?: string
    helperText?: string
    variant?: InputComponentVariants
    error?: boolean
}

export enum InputComponentTypes {
    TEXT = "text",
    PASSWORD = "password",
    EMAIL = "email"
}

export enum InputComponentVariants {
    FILLED = "filled",
    OUTLINE = "outlined",
    STANDARD = "standard"
}

function InputComponent({ value, onChange, label, type = InputComponentTypes.TEXT, helperText, variant = InputComponentVariants.OUTLINE, error }: InputComponentProps) {
    const [inputType, setInputType] = useState(type)

    function handleInputType(type: InputComponentTypes) {
        setInputType(type)
    }

    return (
        <TextField
            label={label}
            type={inputType}
            onChange={onChange}
            value={value}
            helperText={helperText}
            variant={variant}
            error={!!error}
            slotProps={{
                formHelperText: {
                    sx: {
                        color: error ? 'red' : 'gray',
                        fontSize: '0.875rem',
                        fontWeight: error ? 600 : 400,
                    },
                },
                ...(type === InputComponentTypes.PASSWORD && {
                    input: {
                        endAdornment:
                            inputType === InputComponentTypes.PASSWORD ? (
                                <BsEye
                                    cursor="pointer"
                                    onClick={() => handleInputType(InputComponentTypes.TEXT)}
                                />
                            ) : (
                                <BsEyeSlash
                                    cursor="pointer"
                                    onClick={() => handleInputType(InputComponentTypes.PASSWORD)}
                                />
                            ),
                    },
                }
                )
            }}
        />
    )
}

export default InputComponent