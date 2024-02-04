import { Form, Select, } from "antd";
import { Controller } from "react-hook-form";

type PHSelectProps = {
    label: string;
    name: string;
    options:  {value: string | number, label: string}[];
    disabled?: boolean;
    defaultValue?: string;
}

const PHSelect = ({label,name,options,disabled, defaultValue}:PHSelectProps) => {
  

    return (
        <Controller 
            name={name}
            render={({field:{onChange}})=>(
                <Form.Item label={label}>
                    <Select
                        onChange={onChange}
                        defaultValue={defaultValue}
                        style={{width:'100%'}}
                        options={options}
                        disabled={disabled}
                        size={"large"}
                    />
                </Form.Item>
            )}
        />
    );
};

export default PHSelect;