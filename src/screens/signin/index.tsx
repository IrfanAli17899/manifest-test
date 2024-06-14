import React, { useRef } from 'react'
import { Button, Yup, Form, FormProps, Input, FormRef, FormItem, SocialButtons, AuthLink } from '@src/components'
import { useAsyncMutation, useAuth } from '@src/hooks'
import { showMessage } from 'react-native-flash-message'
import { PublicScreenProps } from '@src/types'
import { PublicLayout } from '@src/layouts'

const SignInScreen = () => {

  const formRef = useRef<FormRef>(null)

  const { signInWithEmailAndPassword } = useAuth();
  const [_signInWithEmailAndPassword, { loading }] = useAsyncMutation(signInWithEmailAndPassword, {
    onError: (error) => {
      showMessage({ message: error.message, type: "danger" })
    },
  });

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required()
  })

  const onSubmit: FormProps<Yup.InferType<typeof loginValidationSchema>>["onSubmit"] = (values, err) => {
    if (!err && values) {
      _signInWithEmailAndPassword(values)
    }
  }

  return (
    <PublicLayout
      title='Welcome,'
      description='Sign in to your existing manifest account'
    >
      <Form ref={formRef} onSubmit={onSubmit} validationSchema={loginValidationSchema}>
        <FormItem name="email">
          <Input icon={require("@assets/images/icons/mail-icon.png")} placeholder="Email*" />
        </FormItem>
        <FormItem name="password">
          <Input secureTextEntry icon={require("@assets/images/icons/lock-icon.png")}  placeholder="Password*" />
        </FormItem>
        <Button onPress={() => formRef.current?.submit()} loading={loading}>Sign In</Button>
      </Form>
      <AuthLink
        info='Create new account!'
        link='SignUp'
        linkText='Sign Up'
      />
      <SocialButtons />
    </PublicLayout>
  )
}

export default SignInScreen
