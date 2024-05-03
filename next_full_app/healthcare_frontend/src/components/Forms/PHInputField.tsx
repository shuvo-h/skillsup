import { SxProps, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type TPHInputFieldProps = {
    name:string
    label?:string
    type?:string
    size?:"small"| "medium"
    fullWidth?:boolean
    sx?: SxProps
    placeholder?:string
    required?: boolean
}
const PHInputField = ({name,fullWidth,label,size="small",type="text",sx,placeholder,required}:TPHInputFieldProps) => {
    const {control} = useFormContext()
    return (
        <Controller
        control={control}
        name={name}
        render={({ field, fieldState:{error} }) => (
            <TextField 
            {...field}      // field = { onChange, onBlur, value, ref }
            label={label}
            type={type}
            variant={'outlined'}
            size={size}
            fullWidth={true}
            sx={{...sx}}
            placeholder={placeholder}
            required={required}
            value={field.value || ''} 
            error={!!error?.message} // convert to boolean
            helperText={error?.message}
            />
        )}
      />
    );
};

export default PHInputField;