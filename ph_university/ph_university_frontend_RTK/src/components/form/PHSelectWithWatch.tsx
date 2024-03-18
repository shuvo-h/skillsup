import { Form, Select, } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type PHSelectProps = {
    label: string;
    name: string;
    options: { value: string; label: string; disabled?: boolean }[] | undefined;
    disabled?: boolean;
    defaultValue?: string;
    mode?: "multiple" | 'tags' | undefined
    onValueChange: React.Dispatch<React.SetStateAction<any>>
}

const PHSelectWithWatch = ({label,name,options,disabled,mode=undefined,onValueChange, defaultValue}:PHSelectProps) => {
  // -------START: keep watch on value ad perform disable/enable----
  const methods = useFormContext();
  const inputValue = useWatch({
      control: methods.control,
      name: name,
    })
    useEffect(()=>{
        onValueChange(inputValue)
    },[inputValue])
    // -------END: keep watch on value ad perform disable/enable----
    
    return (
        <Controller 
            name={name}
            render={({field,fieldState:{error}})=>(
                <Form.Item label={label}>
                    <Select
                        {...field}
                        defaultValue={defaultValue}
                        style={{width:'100%'}}
                        options={options}
                        disabled={disabled}
                        size={"large"}
                        mode={mode}
                    />
                    {
                        error && <small style={{color:"red"}}>{error.message}</small>
                    }
                </Form.Item>
            )}
        />
    );
};

export default PHSelectWithWatch;