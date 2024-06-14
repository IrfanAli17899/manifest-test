import React, { Children, cloneElement, ReactElement } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message"
import Text from '../text'
import { theme } from '@src/theme'
import { StyleSheet } from 'react-native'

const FormItem = ({ name, children }: { name: string, children: ReactElement }) => {
    const { control } = useFormContext()
    const { field } = useController({
        name,
        control,
    })

    const Field = cloneElement(Children.only(children), { ...field })

    return (
        <>
            {Field}
            <Text type='body2' style={styles.error}>
                <ErrorMessage name={name} />
            </Text>
        </>
    )
}

export default FormItem;

const styles = StyleSheet.create({
    error: {
        color: theme.colors.error,
        marginBottom: 5,
        height: 23,
    }
})