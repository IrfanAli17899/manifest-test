import React, { ReactNode, forwardRef, useImperativeHandle } from 'react';
import { useForm, SubmitHandler, UseFormProps, FormProvider, FieldValues, FieldErrors, SubmitErrorHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface FormProps<T extends FieldValues> extends UseFormProps<T> {
  children: ReactNode;
  onSubmit: (data: T | null, errors: FieldErrors<T> | null) => void;
  validationSchema: yup.ObjectSchema<T>;
}

export interface FormRef {
  submit: VoidFunction;
}

const FormInner = <T extends FieldValues>(
  { children, onSubmit, validationSchema, ...rest }: FormProps<T>,
  ref: React.Ref<FormRef>
) => {
  const methods = useForm<T>({
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    ...rest,
  });

  const _onSubmit: SubmitHandler<T> = (data) => {
    onSubmit?.(data, null);
  };

  const _onError: SubmitErrorHandler<T> = (errors) => {
    onSubmit?.(null, errors);
  };

  useImperativeHandle(ref, () => ({
    submit: () => methods.handleSubmit(_onSubmit, _onError)(),
  }));

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  );
};

const Form = forwardRef(FormInner) as <T extends FieldValues>(
  props: FormProps<T> & { ref?: React.Ref<FormRef> }
) => React.ReactElement;

export default Form;