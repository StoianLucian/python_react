import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs';

type InputComponentProps = {
    value: string
    onChange: (value: string) => void
    label?: string
    type?: string
    helperText?: string
    variant?: InputComponentVariants
    error?: boolean
    frontIcon?: React.ReactNode,
    endIcon?: React.ReactNode,
    classNames?: string,
    isDisabled?: boolean
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

function InputComponent({
    value,
    onChange,
    label,
    type = InputComponentTypes.TEXT,
    helperText,
    variant = InputComponentVariants.OUTLINE,
    error,
    frontIcon,
    endIcon,
    classNames,
    isDisabled
}: InputComponentProps) {
    const [inputType, setInputType] = useState(type)

    function handleInputType(type: InputComponentTypes) {
        setInputType(type)
    }

    return (
        <TextField
            disabled={isDisabled}
            className={classNames}
            label={label}
            type={inputType}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            helperText={helperText}
            variant={variant}
            error={!!error}
            // autoComplete={
            //     type === InputComponentTypes.PASSWORD
            //         ? 'current-password'
            //         : type === InputComponentTypes.EMAIL
            //             ? 'email'
            //             : undefined
            // }
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
                                    tabIndex={0}
                                    cursor="pointer"
                                    onClick={() => handleInputType(InputComponentTypes.TEXT)}
                                />
                            ) : (
                                <BsEyeSlash
                                    tabIndex={0}
                                    cursor="pointer"
                                    onClick={() => handleInputType(InputComponentTypes.PASSWORD)}
                                />
                            ),
                        "aria-current": "true"
                    },
                }
                ),
                ...(frontIcon || endIcon) && {
                    input: {
                        ...(frontIcon && { startAdornment: frontIcon }),
                        ...(endIcon && { endAdornment: endIcon }),
                    }
                },
            }}
        />
    )
}

export default InputComponent