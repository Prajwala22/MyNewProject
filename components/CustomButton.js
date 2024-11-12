import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../screens/constants/colors'
const CustomButton = ({ label, onPress, fontSize, customstyles }) => {

    return (
        <View style={[styles.button, customstyles]} >
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.buttonText} >{label}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    button: {
        elevation: 0,
        backgroundColor: '#E83B42',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: 200,
    },
    buttonText: {
        fontSize: 14,
        lineHeight: 17,
        fontWeight: '400',
        color: Colors.white,
        textAlign: 'center',
    }
})

export default CustomButton;