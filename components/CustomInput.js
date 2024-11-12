import React from 'react'
import { Text, TextInput, View } from 'react-native'
import Colors from '../screens/constants/colors';
import styles from '../assets/css/style';

const CustomInput = (props) => {
    const {
        field: { name, onBlur, onChange, value, },
        form: { errors, touched, setFieldTouched }, label, mandate,
        ...inputProps
    } = props

    const hasError = errors[name] && touched[name]

    return (
        <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
            <Text style={[styles.signLabel, styles.textDefault]}>{label}
            { label !== 'Void Password' &&                
            <Text style={[styles.font12, styles.textPri]}>*</Text>            
            } </Text>

            <TextInput
                style={[
                    styles.AddsignInput,
                    props.multiline && { height: props.numberOfLines * 40 },
                    hasError && styles.errorInput
                ]}
                value={value}
                onChangeText={(text) => onChange(name)(text)}
                placeholderTextColor={Colors.borderColor}
                onBlur={() => {
                    setFieldTouched(name)
                    onBlur(name)
                }}
                {...inputProps}
            />
            {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
        </View>
    )
}



export default CustomInput