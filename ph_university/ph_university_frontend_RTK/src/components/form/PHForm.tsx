/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from 'antd';
import  { ReactNode } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type TPHFormProps = {
    // onSubmit: (data: FieldValues) => Promise<void>;
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode;
} & TFormConfig

type TFormConfig = {
    defaultValues?: Record<string,unknown>,
    resolver?: any; 
}
const PHForm = ({children,onSubmit,defaultValues,resolver}:TPHFormProps) => {
    const formConfig:TFormConfig = {};
    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues;
    }
    if (resolver) {
        formConfig['resolver'] = resolver;
    }
    const methods = useForm(formConfig);

    const submit:SubmitHandler<FieldValues> = (data:FieldValues) =>{
        
        onSubmit(data);
        methods.reset();
    }
    
    return (
        <FormProvider {...methods}>
            <Form onFinish={methods.handleSubmit(submit)} layout='vertical'>
                {children}
            </Form>
        </FormProvider>
    );
};

export default PHForm;