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
            {
                label && <label htmlFor={id}>{label}: </label>
            }
            {/* <input {...register(name)} type={type} id={id} /> */}
            
            <Controller 
                name={name}
                defaultValue={defaultValue}
                render={({field})=> <Input {...field} type={type} id={id} defaultValue={defaultValue} />}
            />
        </div>
    );
};

export default PHInput;