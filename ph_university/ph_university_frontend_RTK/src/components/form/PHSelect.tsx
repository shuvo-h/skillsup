import { Form, Select, } from "antd";
import { Controller,} from "react-hook-form";

type PHSelectProps = {
    label: string;
    name: string;
    options: { value: string; label: string; disabled?: boolean }[] | undefined;
    disabled?: boolean;
    defaultValue?: string;
    mode?: "multiple" | 'tags' | undefined
}

const PHSelect = ({label,name,options,disabled,mode=undefined, defaultValue}:PHSelectProps) => {
 
    
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

export default PHSelect;