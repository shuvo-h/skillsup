import { Form } from 'antd';
import Input from 'antd/es/input/Input';
import { Controller } from 'react-hook-form';

type TPHInputProps = {
    type?: string;
    id?: string;
    name?:string;
    label?:string;
    defaultValue?:string;
}
const PHInput = ({type='text',id='',name='',label='',defaultValue=undefined}:TPHInputProps) => {

    
    return (
        <div style={{marginBottom:'20px'}}> 
            <Controller 
                name={name}
                defaultValue={defaultValue}
                render={({field})=> <Form.Item label={label}>
                    <Input {...field} type={type} id={id} defaultValue={defaultValue} />
                </Form.Item>}
            />
        </div>
    );
};

export default PHInput;