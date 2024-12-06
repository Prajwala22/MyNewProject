import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-root-toast';
import { default as style, default as styles } from '../assets/css/style';
import Button from '../components/Button';
import TextInput from '../components/Texinput';
import api from '../services/api/callingApi';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const placeHolderEmail = "Email";
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [userNotFound, setUserNotFound] = useState(false);

    //Check email validation
    const emailValidator = (email) => {
        if (!email) return "Email is required"
        return ''
    }

    //onsbmit Reset Password
    const doSubmit = async () => {

        const emailError = emailValidator(email?.value)

        if (emailError) {
            setEmail({ ...email, error: emailError });
            return;
        }
        const jsonValue = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        setEmail(loginData?.username)
        const result = await api.ForgotPassword(email?.value);
        if (result.success) {
           
            Alert.alert('we have sent an email with instructions to reset the password. Kindly check')
        }
        else {
            // Alert.alert('User Not Found')
            setUserNotFound(true);

        }

    }
    return (
        <KeyboardAwareScrollView style={style.forgotPassView}>

            <View style={style.forgetPassBlk}>
                <View style={style.forgotKey}>
                    <Image
                        style={[style.KeyIcon]}
                        source={(require('../assets/images/key_icon.png'))}
                    />
                </View>
                <Text style={[style.forgotText]}>Forgot Password</Text>
                <Text style={[styles.forgotPara]}>
                    Enter the email associated with your account and we'll send with instructions to reset your password
                </Text>
                <View style={[style.forgotInputView]}>
                    <Text style={[style.fogotLabel]}>Email<Text style={[style.font12, style.textPri]}>*</Text></Text>
                    <TextInput
                        returnKeyType="next"
                        placeholder={placeHolderEmail}
                        multiline={false}
                        placeholderTextColor={"#fff"}
                        autoCorrect={false}
                        underlineColorAndroid={'#fff'}
                        secureTextEntry={false}
                        onChangeText={(text) => setEmail({ value: text, error: '' })}
                        value={email?.value}
                        error={!!email?.error}
                        errorText={email?.error}
                        style={style.signInput}
                        description={undefined} />
                </View>
                {userNotFound ? (
                    <View style={{ marginRight: 200, marginTop: 10 }}>
                        <Text style={{ color: "red" }}>User Not Found</Text>
                    </View>
                ) : null}
                <Button mode="contained" onPress={doSubmit} style={[style.signBtn, style.resetBtn]}>Reset Password</Button>
                <Text style={[style.backLogin]} onPress={() => navigation.navigate('LoginScreen')}>Back to Log in</Text>

            </View>

        </KeyboardAwareScrollView>
    );
};
    
export default ForgotPassword;
