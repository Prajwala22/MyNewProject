// screens/LoginScreen.js
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-root-toast';
import { default as styles, default as styless } from '../assets/css/style';
import Button from '../components/Button';
 import { AuthContext } from '../App';
import Colors from '../screens/constants/colors';
import api from '../services/api/callingApi';
import { constRoleId } from "../screens/common/RoleConstants"
import { useNavigation } from '@react-navigation/native';
import SideMenu from '../screens/orders/SideMenu';

const LoginScreen = ({ navigation }) => {
    const [refreshKey, setRefreshKey] = useState(0);

   const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isLoading, setLoading] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [roleName, setRoleName] = useState()
  const [invalidMail, setInvalidMail] = useState({ value: '', error: '' });
  const [invalidPassword, setInvalidPassword] = useState({ value: '', error: '' });
  const placeHolderEmail = "Email ID";
  const placeHolderPassword = "Password";

   //hiding and displaying the loader after few seconds
   const displayLoader = async () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 5000);
}
//Get Login Credentials
useEffect(() => {
    getSavedUser();
}, []);

const reloadScreen = () => {
    navigation.replace('LoginScreen');
  };

const getSavedUser = async () => {
    const jsonValue = await AsyncStorage.getItem('userEmail')
    let loginEmail = JSON.parse(jsonValue);

    setEmail({ value: loginEmail, error: '' })
}
useEffect(() => {
    getSavedUserPassword();
}, []);

const getSavedUserPassword = async () => {
    const jsonValue = await AsyncStorage.getItem('password')
    let loginPassword = JSON.parse(jsonValue);

    setPassword({ value: loginPassword, error: '' })
}
//Check valid email 
const invalidEmailValidator = (email) => {
    if (!email) return "Invalid Email/Password"
    return ''
}
//Check valid password
const invalidPasswordValidator = (email) => {
    if (!email) return "Invalid Email/Password"
    return ''
}
//Check email validation
const emailValidator = (email) => {
    if (!email) return "Email is required"
    return ''
}
//Check password Validation
const passwordValidator = (password) => {
    if (!password) return "Password is required"
    if (password.length < 3) return 'Password must be at least 5 characters long.'
    return ''
}

/**
* Button Login pressed 
*/
const doLogin = async () => {
    setLoading(true)
    const invalidMailErrorMsg = invalidEmailValidator(email.value)
    const invalidPaswwordEErrorMsg = invalidPasswordValidator(password.value)

    if (email.value === invalidMail.value || password.value === invalidPassword.value) {
        setEmail({ ...email, error: invalidMailErrorMsg })
        setPassword({ ...password, error: invalidPaswwordEErrorMsg })
    }
    const emailErrorMsg = emailValidator(email.value)
    const passworErrorMsg = passwordValidator(password.value)

    if (email || password) {
        setEmail({ ...email, error: emailErrorMsg })
        setPassword({ ...password, error: passworErrorMsg })
    }
    const result = await api.Login(email.value, password.value);
    if (result?.data === null && password.value != "" && email.value != "") {
        setLoading(false);
        Toast.show("Username Or Password is incorrect", {
            duration: Toast.durations.LONG
        })
    }
    else {
        let token = result.data.token;
        await AsyncStorage.setItem('userRoleId', result.data.userRoleId)
        displayLoader();
        if (result.data.userRoleId === constRoleId.PRODUCT_ADMIN_ID) {
            if (JSON.stringify(result.data) === null) {
            } else {
                var myJson = {
                    username: email.value,
                    password: password.value,
                    emailId: result.data.emailId,
                    roleid: '1',
                    token: result?.data?.token,
                    outletId: result?.data?.outletId,
                    userId: result?.data?.userId,
                    restaurantId: result.data.restaurantId,
                    address: result.data?.address,
                    joiningDate: result.data?.joiningDate,
                    image: result.data?.image,
                    idCardNo: result.data?.idCardNo,
                    createdBy: result.data?.createdBy,
                    createdOn: result.data?.createdOn

                }
                storeData(myJson);
                // Add a Toast on screen.
                Toast.show('User Logged-In Successfully', {
                    duration: Toast.durations.LONG,
                });
                console.log("Login Vi")
                navigation.navigate(SideMenu);
                //signIn(result.data.userId)
                rememberMe()
            }
        }

        //Cashier Role Log In
        else if (result.data.userRoleId === constRoleId.CASHIER_ID) {

            var myJson2 = {
                username: email.value,
                password: password.value,
                emailId: result.data.emailId,
                roleid: '1',
                token: result?.data?.token,
                outletId: result?.data?.userOutlets[0]?.outletId,
                outletName: result?.data?.userOutlets[0]?.outletName,
                userId: result?.data?.userId,
                restaurantId: result.data.restaurantId,
                roleName: result.data.roleName,
                userRoleId: result.data.userRoleId,
                address: result.data?.address,
                joiningDate: result.data?.joiningDate,
                image: result.data?.image,
                idCardNo: result.data?.idCardNo,
                createdBy: result.data?.createdBy,
                createdOn: result.data?.createdOn

            }

            storeData(myJson2);
            // Add a Toast on screen.
            Toast.show('User Logged-In Successfully', {
                duration: Toast.durations.LONG,
            });
           // navigation.navigate('Dashboard')
             signIn(result.data.userId)
            rememberMe()
        }
        //Chef Role
        else if (result.data.userRoleId === constRoleId.CHEF_ID) {

            var myJson2 = {
                username: email.value,
                password: password.value,
                emailId: result.data.emailId,
                roleid: '1',
                token: result?.data?.token,
                outletId: result?.data?.userOutlets[0]?.outletId,
                outletName: result?.data?.userOutlets[0]?.outletName,
                userId: result?.data?.userId,
                restaurantId: result.data.restaurantId,
                roleName: result.data.roleName,
                userRoleId: result.data.userRoleId,
                address: result.data?.address,
                joiningDate: result.data?.joiningDate,
                image: result.data?.image,
                idCardNo: result.data?.idCardNo,
                createdBy: result.data?.createdBy,
                createdOn: result.data?.createdOn

            }

            storeData(myJson2);
            // Add a Toast on screen.
            Toast.show('User Logged-In Successfully', {
                duration: Toast.durations.LONG,
            });
           // navigation.navigate('Dashboard')
             signIn(result.data.userId)
            rememberMe()
        }
        //Bartender Role
        else if (result.data.userRoleId === constRoleId.BARTENDER_ID) {
            var myJson2 = {
                username: email.value,
                password: password.value,
                emailId: result.data.emailId,
                roleid: '1',
                token: result?.data?.token,
                outletId: result?.data?.userOutlets[0]?.outletId,
                outletName: result?.data?.userOutlets[0]?.outletName,
                userId: result?.data?.userId,
                restaurantId: result.data.restaurantId,
                roleName: result.data.roleName,
                userRoleId: result.data.userRoleId,
                address: result.data?.address,
                joiningDate: result.data?.joiningDate,
                image: result.data?.image,
                idCardNo: result.data?.idCardNo,
                createdBy: result.data?.createdBy,
                createdOn: result.data?.createdOn

            }

            storeData(myJson2);
            // Add a Toast on screen.
            Toast.show('User Logged-In Successfully', {
                duration: Toast.durations.LONG,
            });
            //navigation.navigate('Dashboard')
             signIn(result.data.userId)
            rememberMe()
        }
        //Company Admin Login 
        else if (result.data.userRoleId === constRoleId.COMPANY_ADMIN_ID) {
            console.log(result.data,"result.data")
            var myJson1 = {
                username: email.value,
                password: password.value,
                emailId: result.data.emailId,
                roleid: '1',
                token: result?.data?.token,
                outletId: result?.data?.userOutlets[0]?.outletId,
                outletName: result?.data?.userOutlets[0]?.outletName,
                userId: result?.data?.userId,
                restaurantId: result.data.restaurantId,
                roleName: result.data.roleName,
                userRoleId: result.data.userRoleId,
                address: result.data?.address,
                joiningDate: result.data?.joiningDate,
                image: result.data?.image,
                idCardNo: result.data?.idCardNo,
                createdBy: result.data?.createdBy,
                createdOn: result.data?.createdOn,
                voidPassword: result.data?.voidPassword

            }

            storeData(myJson1);
            // Add a Toast on screen.
            Toast.show('User Logged-In Successfully', {
                duration: Toast.durations.LONG,
            });
            console.log("via email and password");
            navigation.navigate('SideMenu');
            setTimeout(() => {
                navigation.navigate('SideMenu');  // Navigate to SideMenu after login simulation
                console.log("after via email and password");
              }, 1000);
            //signIn(result.data.token)
            //rememberMe()

            
            if (isSelected) {
                if (email.value != '' && password.value != '') {
                    try {
                        const jsonValue = JSON.stringify(email.value)
                        const jsonPasswordValue = JSON.stringify(password.value)
                        await AsyncStorage.setItem('userEmail', jsonValue)
                        await AsyncStorage.setItem('password', jsonPasswordValue)
                    } catch (e) {
                        // saving error
                    }
                }
            }
            console.log("via email and password", isSelected);
            console.log("via email and password", JSON.stringify(email.value));
            console.log("via email and password", JSON.stringify(password.value));

        }
    }

}
const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('userInfo', jsonValue)
    } catch (e) {
        // saving error
    }
}

const rememberMe = async () => {

    if (isSelected) {
        if (email.value != '' && password.value != '') {
            try {

                const jsonValue = JSON.stringify(email.value)
                const jsonPasswordValue = JSON.stringify(password.value)


                await AsyncStorage.setItem('userEmail', jsonValue)
                await AsyncStorage.setItem('password', jsonPasswordValue)

            } catch (e) {
                // saving error
            }

        }
    } else {
    }


}

const renderLoader = () => (
    <View style={styless.loaderContainer}>
      <Image source={require('../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
    </View>
  );
  
//Reset Form
const resetForm = () => {
setEmail({value: "", error: ""})
setPassword({value: "", error: ""})
}
//------------------------------------------ Usrer Interface -----------------------------------------------------------------------
return (
    
    <KeyboardAwareScrollView style={styless.loginBg}>

        {isLoading && email.value != '' && password.value != '' ?
            <View style={[styless.flex1, styless.flexrow, styless.alignCenter, styless.justifyCenter, styless.loaderPopupBlk]}>
                <Image source={require('../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
            </View> :
            <View style={[styless.loginMobileHeight]}>
                <View style={[styles.flex1, styles.flexrow, styles.alignCenter, styles.width100, styles.flexWrap]}>
                    {/* login left fields HTML */}
                    <View style={[styles.flex1, styles.bottomView, styles.alignCenter, styles.flexColumn, styles.justifyCenter]}>

                        <View style={[styles.flexrow, styles.alignCenter]}>
                            <Image
                                style={[styles.headingLogo, styles.resizecontain]}
                                source={(require('../assets/images/logo.png'))}
                                resizeMode='contain'
                            />
                            <Text style={styles.LogoText}>
                                WATERMELON POS
                            </Text>
                        </View>

                        <View style={styles.headingTextContainer2}>
                            <Text style={[styles.headingText2, styles.textCenter]}>
                                Sign In to your Account
                            </Text>
                        </View>

                        <Text style={styles.loginLabel}>Email </Text>
                        <View style={styles.loginFieldView}>
                            <TextInput
                                returnKeyType="next"
                                placeholder={placeHolderEmail}
                                multiline={false}
                                placeholderTextColor={"#fff"}
                                autoCorrect={false}
                                underlineColorAndroid={'#fff'}
                                secureTextEntry={false}
                                onChangeText={(text) => setEmail({ value: text, error: '' })}
                                value={email.value}
                                error={!!email.error}
                                errorText={email.error}
                                description={undefined}
                                style={[styles.loginInput]}
                            />
                            {email.error &&
                                <Text style={[styles.errorMsg, styles.loginerror]}>Email is required</Text>
                            }
                        </View>

                        <Text style={styles.loginLabel}>Password</Text>
                        <View style={styles.loginFieldView}>
                            {/* <TouchableOpacity style={styles.ShowEye}
                                onPress={() => {
                                    setIsSecureEntry((prev) => !prev);
                                }}>

                                <View>{isSecureEntry ? <EyeIcon style={styles.viewIcon} /> : <Ionicons name="eye-off-outline" color={Colors.labelColor} size={20} style={styles.viewIcon} />
                                }</View>

                            </TouchableOpacity> */}
                            <TextInput
                                placeholder={placeHolderPassword}
                                multiline={false}
                                placeholderTextColor={"#fff"}
                                autoCorrect={false}
                                underlineColorAndroid={'#fff'}
                                secureTextEntry={isSecureEntry}
                                onChangeText={(text) => [setPassword({ value: text, error: '' }), setInvalidPassword({ value: text, error: '' })]}
                                value={password.value}
                                style={[styles.loginInput, styles.padr40]}
                                description={undefined}
                            />
                            {password.error &&
                                <Text style={[styles.errorMsg, styles.loginerror]}>Password is required</Text>
                            }
                        </View>

                        <View style={[styles.checkboxConLogin, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.flexWrap]}>
                            <View style={[styles.flexrow, styles.checkView, styles.alignCenter]}>
                                <TouchableOpacity style={styles.flexAlignRow}
                                    onPress={() => {
                                        setSelection(!isSelected)
                                    }}>
                                    <View style={[styles.checkbox, isSelected && styles.radioBtnChecked]}>
                                        {
                                            (isSelected) ? <View style={styles.checkTick}></View> : null
                                        }
                                    </View>
                                    <Text style={styles.checkboxText}>Remember me</Text>
                                </TouchableOpacity>

                            </View>
                            <Text style={[styles.checkboxText, styles.forgetText]} numberOfLines={1} onPress={() => [navigation.navigate('ForgotPassword'), resetForm()]}>
                                Forgot Password?</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={doLogin}>
                                <Button mode="contained" onPress={doLogin} style={styles.signBtn}>Sign In</Button>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.flexrow, styles.justifyCenter, styles.alignCenter, styles.accSignView, styles.flexWrap]}>
                            <Text style={[styles.textBlack, styles.textCenter, styles.font11]}>Don't have an account? </Text>
                            <Text style={[styles.textPri, styles.font11]} onPress={() => [navigation.navigate('UserRegistration'), resetForm()]}>Sign up</Text>
                        </View>
                    </View>
                    {/* login left fields HTML - Ends */}

                    {/* login right image HTML */}
                    <View style={styles.logincontainer2}>
                        <Image
                            style={[styles.introImageStyle, styles.resizeCover]}
                            source={(require('../assets/images/asianman.png'))}
                        />
                    </View>
                    {/* login right image HTML - Ends */}
                </View>
            </View>
        }
    </KeyboardAwareScrollView>

);
  
};



export default LoginScreen;
