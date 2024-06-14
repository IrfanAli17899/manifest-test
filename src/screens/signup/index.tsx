import React, { useRef } from 'react'
import { Button, Yup, Form, FormProps, Input, FormRef, FormItem, AuthLink } from '@src/components'
import { useAsyncMutation, useAuth } from '@src/hooks'
import { showMessage } from 'react-native-flash-message'
import { PublicLayout } from '@src/layouts'

const SignupScreen = () => {
  const { signUpWithEmailAndPassword } = useAuth();
  const [_signUpWithEmailAndPassword, { loading }] = useAsyncMutation(signUpWithEmailAndPassword, {
    onError: (error) => {
      showMessage({ message: error.message, type: "danger" })
    },
  })

  const formRef = useRef<FormRef>(null)

  const signupValidationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required()
  })

  const onSubmit: FormProps<Yup.InferType<typeof signupValidationSchema>>["onSubmit"] = (values, errors) => {
    if (!errors && values) {
      _signUpWithEmailAndPassword(values)
    }
  }

  return (
    <PublicLayout
      title='Create Account'
      description='Transform your ideas into reality by joining Manifest today!'
    >
      <Form ref={formRef} onSubmit={onSubmit} validationSchema={signupValidationSchema}>
        <FormItem name="name">
          <Input icon={require("@assets/images/icons/user-icon.png")} placeholder="Name*" />
        </FormItem>
        <FormItem name="email">
          <Input icon={require("@assets/images/icons/mail-icon.png")} placeholder="Email*" />
        </FormItem>
        <FormItem name="password">
          <Input secureTextEntry icon={require("@assets/images/icons/lock-icon.png")} placeholder="Password*" />
        </FormItem>
        <Button onPress={() => formRef.current?.submit()} loading={loading}>Sign Up</Button>
      </Form>
      <AuthLink
        info='Already have an account?'
        link='SignIn'
        linkText='Sign in'
      />
    </PublicLayout>
  )
}

export default SignupScreen
