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

}
const PHForm = ({children,onSubmit,defaultValues}:TPHFormProps) => {
    const formConfig:TFormConfig = {};
    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues;
    }
    const methods = useForm(formConfig);
    
    return (
        <FormProvider {...methods}>
            <Form onFinish={methods.handleSubmit(onSubmit)} layout='vertical'>
                {children}
            </Form>
        </FormProvider>
    );
};

export default PHForm;