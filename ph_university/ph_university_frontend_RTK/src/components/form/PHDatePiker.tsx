
import { DatePicker, Form } from 'antd';
import { Controller } from 'react-hook-form';

type TPHDatePikerProps = {
    id?: string;
    name?:string;
    label?:string;
}

const PHDatePiker = ({id='',name='',label=''}:TPHDatePikerProps) => {
    return (
        <Controller 
            name={name}
            render={({field})=> <Form.Item label={label}>
                <DatePicker {...field} size='large' id={id} style={{width:"100%"}} />
            </Form.Item>}
        />
    );
};

export default PHDatePiker;