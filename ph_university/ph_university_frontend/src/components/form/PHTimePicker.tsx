import { Form, TimePicker, } from "antd";
import { Controller,} from "react-hook-form";

type TPHTimePickerProps = {
    label: string;
    name: string;
}

const PHTimePicker = ({label,name,}:TPHTimePickerProps) => {
 
    
    return (
        <Controller 
            name={name}
            // control={control}
            render={({field,fieldState:{error}})=>(
                <Form.Item label={label}>
                    <TimePicker
                        {...field}
                        style={{width:'100%'}}
                        size={"large"}
                        format={'HH:mm'}
                    />
                    {
                        error && <small style={{color:"red"}}>{error.message}</small>
                    }
                </Form.Item>
            )}
        />
    );
};

export default PHTimePicker;