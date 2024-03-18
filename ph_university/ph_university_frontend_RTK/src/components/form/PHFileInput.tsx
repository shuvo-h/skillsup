import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TPHFileInputProps = {
    type?: string;
    id?: string;
    name?:string;
    label?:string;
    defaultValue?:string;
    accept?:string;
}

const PHFileInput = ({id='',name='',label='',accept}:TPHFileInputProps) => {
    return (
        <Controller 
            name={name}
            render={({field:{onChange,value,...restField}})=>(
                <Form.Item label={label}>
                    <Input 
                        {...restField}
                        value={value?.fileName}
                        id={id}
                        onChange={(e)=>onChange(e.target.files?.[0])}
                        name="profile_img"
                        type="file"
                        accept={accept}
                    />
                </Form.Item>
            )}
        />
    );
};

export default PHFileInput;