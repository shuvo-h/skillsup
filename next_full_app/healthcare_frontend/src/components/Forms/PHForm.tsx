import React from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type TFormConfig = {
    resolver?: any
    defaultValues?: Record<string,unknown>
}

type TPHFormProps = {
    children:React.ReactNode
    onSubmit: SubmitHandler<FieldValues>
} & TFormConfig
const PHForm = ({children,onSubmit,resolver,defaultValues}:TPHFormProps) => {
    const formConfig:TFormConfig = {}
    if (resolver) {
        formConfig['resolver'] = resolver
    }
    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues
    }
    const methods = useForm(formConfig);
    
    const submit:SubmitHandler<FieldValues> = (data,event) =>{
        // event.preventDefault(); 
        onSubmit(data);
        // methods.reset(); // reset the fields
    }
    /*
    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
          reset({ something: "" })
        }
      }, [formState, submittedData, reset])
    */

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(submit)}>
                {children}
            </form>
        </FormProvider>
    );
};

export default PHForm;