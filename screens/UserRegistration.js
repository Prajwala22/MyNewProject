import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDocumentAsync } from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, Alert, Platform, Button, Pressable } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-number-input';
import Toast from 'react-native-root-toast';
import { default as style, default as styles } from '../assets/css/style';
import ButtonSubmit from '../components/Button';
import GeoLocationSearch from '../components/GeoLocationSearch';
import TextInput from '../components/Texinput';
import api from '../services/api/callingApi';
import * as FileSystem from 'expo-file-system';
import moment from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";
// import { TimePicker } from 'react-native-simple-time-picker';
import { endPoint } from '../services/api/apiConstant';
import ModalDropDown from '../assets/images/ModalDropDown.js';
import Colors from '../constants/Colors';
import ModalSelector from 'react-native-modal-selector';
import * as mime from 'react-native-mime-types';
import Modal from "react-native-modal";

const UserRegistration = ({ navigation }) => {
    const [resturant, setRestaurant] = useState({ value: '', error: '' });
    const [logoName, setLogoName] = useState({ value: '', error: '' })
    const [logoExtension, setLogoExtension] = useState({ value: '', error: '' })
    const [firstName, setFirstName] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [confirmpassword, setConfirmPassword] = useState({ value: '', error: '' });
    const [voidpassword, setVoidPassword] = useState({ value: '', error: '' });
    const [mobile, setMobile] = useState({ value: '', error: '' })
    const [address, setAddress] = useState({ value: '', error: '' });
    const [outlet, setOutlet] = useState({ value: '', error: '' })
    const [trn, setTrn] = useState({ value: '', error: '' });
    const [countryName, setCountryName] = useState('');
    const [showGeoSearch, setShowGeoSearch] = useState(false);
    const [streetName, setStreetName] = useState({ value: '', error: '' });
    const [isSelected, setSelection] = useState(false);
    const [singleFile, setSingleFile] = useState('');
    const [ImageUigallery, setimageUriGallary] = useState('')
    const [image, setImage] = useState(null);
    const [imagebase64, setImagebase64] = useState(null);
    const [imageExtension, setImageExtension] = useState(null);
    const [resumeFile, setResumeFile] = useState('')
    const [phone, setPhone] = useState([{
        number: mobile.value,
        isPrimary: true
    }])
    const [logo, setLogo] = useState({ value: '', error: '' })

    const placeHolderResturant = "Name of Resturant";
    const placeHolderOwnerName = "Owner Name";
    const placeHolderEmail = "Email";
    const placeholderTRNNumber = "TRN Number";
    const placeholderResetTime = "Reset Time";
    const placeholderAddress = "Address"
    const [isDisplayDate, setShow] = useState(false);
    const [isStartDateTimePickerVisible, setIsStartDateTimePickerVisible] = useState(false);
    const [isNextDateTimePickerVisible, setIsNextDateTimePickerVisible] = React.useState(
        false);
    // const [mydate, setDate] = useState(new Date());
    const [displaymode, setMode] = useState('date');
    const [selectedTime, setSelectTime] = React.useState();
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const handleChange = (value: { hours: number, minutes: number, seconds: number, ampm: string }) => {
        setHours(value.hours);
        setMinutes(value.minutes);
        setSeconds(value.seconds)
        setAmpm(value.ampm);
    };
    const handleReset = () => {
        setHours(0);
        setMinutes(0);
    };
    const [seconds, setSeconds] = React.useState(0);

    const [ampm, setAmpm] = React.useState("am");
    const showNextDateTimePicker = () => {
        setIsNextDateTimePickerVisible(true);
    };
    const [isDataPresent, setDataPreset] = useState(false);
    const [countryData, setcountryData] = useState([]);
    const [cityData, setcityData] = useState([]);
    const [cityFilterData, setCityFilterList] = useState([]);
    const [countryKey, setcountryKey] = useState(0)
    const [countryKeyerror, setcountryKeyError] = useState(false)
    const [cityKey, setcityKey] = useState(0)
    const [cityKeyerror, setcityKeyError] = useState(false)
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [date, setDate] = useState(new Date())
    const [countryId, setCountryId] = useState('')

    const [resetTime, setResetTime] = useState({ value: '', error: '' })
    const [openSuccessPaymentMsg, setopenSuccessPaymentMsg] = useState(false);



    // Get County and City List
    useEffect(() => {
        getCountryList();
        // getCityList();
        return () => {
            // setcountryData([]);
            // setcityData([]);
        }
    }, []);

    const getCountryList = async () => {
        const jsonValue = await AsyncStorage.getItem('userInfo')
        // let loginData = JSON.parse(jsonValue);
        // let token = loginData.token;
        // let outletId = loginData.outletId;

        const result = await api.getAllMasterData("", endPoint.GET_COUNTRY);
        setcountryData(result.data);
    }

    const getCityList = async (countryId) => {
        const jsonValue = await AsyncStorage.getItem('userInfo')
        // let loginData = JSON.parse(jsonValue);
        // let token = loginData.token;
        // let outletId = loginData.outletId;

        const resultCity = await api.GetCityBYCountryId(countryId);
        if (resultCity.data.length === 0) {

        } else {
            setcityData(resultCity.data);
        }
    }
    //Filter Country List
    let countryDataArray = countryData.map((s, i) => {

        let newData = {
            key: i + 1,
            label: s.countryName,
            value: s.countryName,
            countryId: s.id
        }
        return newData;
    })
    //Filter City List
    let cityDataArray = cityData.map((s, i) => {

        let newData = {
            key: i + 1,
            label: s.cityName,
            value: s.cityName,
        }
        return newData;
    })


    //Check Restaurant validation
    const resturantValidator = (resturant) => {
        if (!resturant) return "Restaurant Name is required."
        return ''
    }
    //Check owner name Validation
    const ownerValidator = (firstName) => {
        if (!firstName) return "Owner Name is required."
        return ''
    }
    //Check email validation
    const emailValidator = (email) => {
        const re = /\S+@\S+\.\S+/
        if (!email) return "Email is required."
        if (!re.test(email)) return 'Enter a valid Email.'
        return ''
    }
    //Check Reset Time Validation

    const resetValidator = (time) => {
        const re = /\S+:\S/
        if (!time) return "Reset Time is required."
        if (!re.test(time)) return 'Enter Valid time format(Ex 13:00)'
    }

    //Check mobile validation
    const mobileValidator = (mobile) => {

        if (!mobile) return "Mobile Number is required."
        // if (mobile.length > 9) return 'mobile must be at least 8 characters long.'
        return ''
    }
    //Check adress validation
    const addressValidator = (address) => {
        if (!address) return "Address is required."
        return ''
    }
    //Check outlet validation
    const outletValidator = (outlet) => {
        if (!outlet) return "Outlet is required."
        return ''
    }
    //Check trn validation
    const trnValidator = (trn) => {
        if (!trn) return "TRN No is required."
        return ''
    }
    //Check password validation
    const passwordValidator = (Password) => {
        if (!Password) {
            return "Password is required"
        }
        else () => {
            setPassword({ value: Password, error: '' })
        }
    }
    //Check confirm password validation
    const confirmpasswordValidator = (Confirmpassword) => {
        if (!Confirmpassword) {
            return "Confirm Password is required"
        }
        else () => {
            setConfirmPassword({ value: Confirmpassword, error: '' })
        }
        if (password.value != confirmpassword.value) {
            return "Password and Confirm Password Must Be Same"
        }
    }
    //Check Void password validation
    const voidPasswordValidator = (Password) => {
        if (!Password) {
            return "Void Password is required"
        }
        else () => {
            setVoidPassword({ value: Password, error: '' })
        }
    }

    //onsubmit sign up data
    const doSubmit = async () => {
        const SelectRestaurantError = resturantValidator(resturant?.value)
        const SelectOwnerNameError = ownerValidator(firstName?.value)
        const SelectEmailIdError = emailValidator(email?.value)
        const SelectResetTimeError = resetValidator("04:00")
        const SelectPhoneNumberError = mobileValidator(mobile?.value)
        const SelectAdressError = addressValidator(address?.value)
        const SelectTnrError = trnValidator(trn?.value)
        const SelectPasswordError = passwordValidator(password?.value)
        const SelectConfirmPasswordError = confirmpasswordValidator(confirmpassword?.value)
        // const SelectVoidPasswordError = voidPasswordValidator(voidpassword?.value)
        if (resturant || firstName || email || mobile || address || trn || password || confirmpassword || resetTime
        //    || voidpassword
            ) {
            setRestaurant({ ...resturant, error: SelectRestaurantError })
            setFirstName({ ...firstName, error: SelectOwnerNameError })
            setEmail({ ...email, error: SelectEmailIdError })
            setMobile({ ...mobile, error: SelectPhoneNumberError })
            setAddress({ ...address, error: SelectAdressError })
            setTrn({ ...trn, error: SelectTnrError })
            setPassword({ ...password, error: SelectPasswordError })
            setConfirmPassword({ ...confirmpassword, error: SelectConfirmPasswordError })
            setResetTime({ ...resetTime, error: SelectResetTimeError })
            // setVoidPassword({...voidpassword, error: SelectVoidPasswordError})
        }

        if (countryKey == 0) {
            setcountryKeyError(true)
            setcityKeyError(true)
            return false
        }

        // const jsonValue: any = await AsyncStorage.getItem('userInfo')
        // let loginData = JSON.parse(jsonValue);
        // let token = loginData.token;
        var myJson = {
            restaurant: {
                restaurantName: resturant.value,
                trnNo: trn.value,
                firstName: firstName.value,
                address: address.value,
                phone: [{ isPrimary: true, number: mobile.value }],
                email: email.value,
                password: password.value,
                isThemAgreed: true,
                logoPath: imagebase64,
                logoExtension: imageExtension,
                // reset: hours + ":" + minutes,
                // reset: selectedTime,
                //reset: resetTime.value,// as discussed with chaithanya commented this dynamic and added the static value 03/07/23
                reset: "04:00",
                country: country,
                city: city
            },
            isSameasOutlet: true,
            confirmPassword: confirmpassword.value,
            voidPassword: voidpassword.value,
            logo: logo.value,
            logoName: "",
            
            // tradeLicenseName: resumeFile?.name,inside restaurant object logopath(String), 
            // tradeLicensePath: resumeFile?.uri,
            // tradeLicenseExtension: resumeFile?.extn,
        }
        const result = await api.CreateRestaurant(myJson);
        if (result.success) {
            storeData(myJson);
            // Add a Toast on screen.
            // Toast.show('User Registered Successfully', {
            //     duration: Toast.durations.LONG,
            // });
            setopenSuccessPaymentMsg(true)
            // navigation.navigate('Login');
        }
        else if (result.success === false){
            Alert.alert(result.message)
        }
    }

    //Store user information
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('userRegistrationInfo', jsonValue)
        } catch (e) {
            // saving error
        }
    }
    //open  map popup to select address
    const getGeoModal = () => {
        setShowGeoSearch(true);
    }
    //close map popup
    const closeGeoSearchModal = () => {
        setShowGeoSearch(false);
    }
    //update location 
    const locationBasedFilter = (dataFromMap) => {
        setStreetName({ value: dataFromMap, error: '' });
        setAddress({ value: dataFromMap, error: '' });
        setOutlet({ value: dataFromMap, error: '' });
    };

    //ipload documnet file
    const selectOneFile = async () => {
        //Opening Document Picker for selection of one file
        try {
            const res = await getDocumentAsync({
                type: ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"],
                multiple: false,
                copyToCacheDirectory: true
            });
            if (res.type && res.type === 'cancel') {
                //If user canceled the document selection
            } else {
                //Setting the state to show single file attributes
                const base64String = await FileSystem.readAsStringAsync(
                    res.uri,
                    {
                        encoding: FileSystem.EncodingType.Base64,
                    });
                const extn = res.name ? res.name.split(".").pop() : "";
                const fileType = mime.lookup(extn);
                res.base64 = base64String;
                res.extn = extn;
                const fileUriPart = res.uri ? res.uri.split("/") : [];
                const filename = fileUriPart.length
                    ? decodeURIComponent(fileUriPart[fileUriPart.length - 1])?.replace(/\s/g, '_')
                    : "";
                res.filename = filename;
                res.fileType = fileType;
                setResumeFile(res);
            }
        } catch (err) {
            //For Unknown Error
            alert('Something went wrong. please try again later');
            throw err;
        }
    };

    //upload image
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });


        if (!result.canceled) {
            const fileSize = result?.assets[0]?.base64.length * 3 / 4 - 2; // Approximate size in bytes
            if(fileSize > 1000000){
                Alert.alert(	
                    'Info',
                    'Please select an image less than 1MB.',	
                  [{ text: 'OK', onPress: () => {} }]	
                );
              }
              else{
                setImage(result.uri);
                setImagebase64('data:image/jpg;base64,' + result?.assets[0]?.base64);
    
                let fileExtension = result?.assets[0]?.uri.slice(result?.assets[0]?.uri.lastIndexOf('.') + 1);
                setImageExtension(fileExtension)
                // let profiledata = {
                //     Image: "data:image/jpg;base64," + result.base64,
                //     ImageMimeType: "image/jpeg",
                //     ImageFileName: "Image",
                //     ImageExt: fileExtension
                // }
                // if (profiledata) {
    
                // }
              }
            
        }
    };
    const openGallery = () => {
        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                // You can also display the image using data:
                const source = { uri: 'data:image/jpeg;base64,' + response.base64 };
                setimageUriGallary(source);
            }
        });
    };


    //Set Time Input

    const showDateTimePicker = () => {
        setIsStartDateTimePickerVisible(true)
    };
    //Set Rest Time Input 

    const handleDatePicked = (time, type) => {

        const selDate = moment(time).format("LT");;
        if (type === 'time') {
            setSelectTime(selDate);
            hideDateTimePicker();
        }
    };
    const hideDateTimePicker = () => {
        setIsStartDateTimePickerVisible(false);
    };

    const onConfirm = (hour, minute) => {
        this.setState({ time: `${hour}:${minute}` });
        this.TimePicker.close();
    }
    const onCancel = () => {
        this.TimePicker.close();

    }
    const removeImage = () => {
        setImage(null)
    }
    const niceBytes = (x) => {
        const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let l = 0, n = parseInt(x, 10) || 0;
        while (n >= 1024 && ++l) {
            n = n / 1024;
        }
        return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
    };
//Payment Success
const successPaymentOpen = () => {
    setopenSuccessPaymentMsg(!openSuccessPaymentMsg)
  }
  //Payment Success Popup Ui
  const SuccessPaymentPopup = () => {
    return (
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
          <Image source={(require("../assets/images/placeordergif1.gif"))} style={[styles.marBtm20, styles.sucImg]} />
          <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>User Registered successfully</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => [successPaymentOpen(), navigation.navigate('Login')]}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - ends

    );
  }
    // ---------------------------------------- User Interface -----------------------------------------------------------------
    return (
        <>

            {/* registration form HTML */}
            <KeyboardAwareScrollView style={styles.regScroll}>

                {/* Header HTML */}
                <View style={[styles.regheader, styles.headerBlk]}>
                    <View style={[styles.flexrow, styles.alignCenter]}>
                        <Image
                            style={[styles.headerLogo]}
                            source={(require('../assets/images/logo.png'))}
                            resizeMode='contain'
                        />
                        <Text style={[styles.LogoText, styles.font16, styles.padl0]}>
                            WATERMELON POS
                        </Text>
                    </View>
                </View>
                {/* Header HTML - Ends */}

                <View style={[style.signUPView, style.regviewbg]}>
                    <Text style={[style.signHeading, style.textBlack, style.font32,]}>Sign Up</Text>

                    <View style={[style.flexrow, style.flexWrap]}>
                        {/* restaurant HTML */}
                        <View style={[style.signViewBlk, style.wdth50, style.pr15]}>
                            <Text style={[style.signLabel, style.font12, style.textDefault]}>Name of the Restaurant<Text style={[style.font12, style.textPri]}>*</Text></Text>
                            <TextInput
                                // label="Name of Resturant"
                                returnKeyType="next"
                                placeholder={placeHolderResturant}
                                multiline={false}
                                placeholderTextColor={"#fff"}
                                autoCorrect={false}
                                underlineColorAndroid={'#fff'}
                                secureTextEntry={false}
                                onChangeText={(text) => setRestaurant({ value: text, error: '' })}
                                value={resturant.value}
                                error={!!resturant.error}
                                errorText={resturant.error}
                                style={style.signInput}
                                description={undefined} />
                        </View>
                        {/* restaurant HTML - Ends */}

                        {/* owner name HTML */}
                        <View style={[style.signViewBlk, style.wdth50, style.paddL15]}>
                            <Text style={[style.signLabel, style.font12, style.textDefault]}>Owner Name<Text style={[style.font12, style.textPri]}>*</Text></Text>
                            <TextInput
                                // label="Owner Name"
                                placeholder={placeHolderOwnerName}
                                multiline={false}
                                style={style.signInput}
                                placeholderTextColor={"#fff"}
                                autoCorrect={false}
                                underlineColorAndroid={'#fff'}
                                secureTextEntry={false}
                                onChangeText={(text) => setFirstName({ value: text, error: '' })}
                                value={firstName.value}
                                error={!!firstName.error}
                                errorText={firstName.error}
                                description={undefined} />
                        </View>
                        {/* owner name HTML - Ends */}

                        {/* Email id  HTML */}
                        <View style={[style.signViewBlk, style.wdth50, style.pr15]}>
                            <Text style={[style.signLabel, style.font12, style.textDefault]}>Email<Text style={[style.font12, style.textPri]}>*</Text></Text>
                            <TextInput
                                // label="Email Id"
                                placeholder={placeHolderEmail}
                                multiline={false}
                                placeholderTextColor={"#fff"}
                                autoCorrect={false}
                                style={style.signInput}
                                underlineColorAndroid={'#fff'}
                                secureTextEntry={false}
                                onChangeText={(text) => setEmail({ value: text, error: '' })}
                                value={email.value}
                                error={!!email.error}
                                errorText={email.error}
                                description={undefined} />
                        </View>
                        {/* Email id HTML - Ends */}

                        {/* Phone number  HTML */}
                        <View style={[style.signViewBlk, style.wdth50, style.paddL15]}>
                            <Text style={[style.signLabel, style.font12, style.textDefault]}>Mobile Number<Text style={[style.font12, style.textPri]}>*</Text></Text>
                            {/* <PhoneInput
                                onChangeText={(text: any) => setMobile({ value: text, error: '' })}

                                onChangeCountry={(Country: { name: any; }) => {
                                    setCountryName(Country.name);
                                }}
                                value={countryName}
                                defaultValue={countryName}
                                defaultCode="AE"
                                withDarkTheme
                                withShadow
                                placeholder="Mobile Number"
                                containerStyle={style.phoneCon}
                                textContainerStyle={style.phoneinputContainer}
                                flagButtonStyle={style.phoneConflag}
                            /> */}
                            {/* <PhoneInput
                                onChangeText={(text: string) => {
                                    const isValid = /^\d{9}$/.test(text);       
                                    const errorMessage = isValid ? '' : 'Mobile number must be 9 digits & Only numbers';        
                                    setMobile({ value: text, error: errorMessage });
                                }}
                                onChangeCountry={(Country: { name: string }) => {
                                    setCountryName(Country.name);
                                }}
                                value={mobile.value}
                                defaultCode="AE"
                                withDarkTheme
                                withShadow
                                placeholder="Mobile Number"
                                containerStyle={style.phoneCon}
                                textContainerStyle={style.phoneinputContainer}
                                flagButtonStyle={style.phoneConflag}
                                textInputProps={{
                                    maxLength: 12,
                                    keyboardType: 'number-pad',
                                }}
                            /> */}
                            <PhoneInput                                
                            onChangeText={(text) => {                                    
                                // const isValid = /^\d+$/.test(text);                                    
                                // const errorMessage = isValid ? '' : 'Only numbers are allowed';                                    
                                // setMobile({ value: text, error: errorMessage });                                    
                                const isValid = /^\d{9}$/.test(text); // Ensure exactly 10 digits                                            
                                const errorMessage = isValid ? '' : 'Mobile number must be 9 digits & Only numbers';                                            
                                setMobile({ value: text, error: errorMessage });                                
                            }}                                
                                onChangeCountry={(Country) => {                                    
                                    setCountryName(Country.name);                                
                                    }}                                
                                    value={mobile.value}                                
                                    defaultCode="AE"                                
                                    withDarkTheme                                
                                    withShadow                                
                                    placeholder="Mobile Number"                                
                                    containerStyle={style.phoneCon}                                
                                    textContainerStyle={style.phoneinputContainer}                                
                                    flagButtonStyle={style.phoneConflag}                                
                                    textInputProps={{                                    
                                    maxLength: 12,                                    
                                    keyboardType: 'number-pad',                                
                                    }}                                
                                    textInputStyle={{height: 28, }}                                
                                    codeTextStyle={{                                    
                                    fontSize: 13,                                    
                                    lineHeight: 28,                                    
                                    height: 28,                                    
                                    fontWeight: '600',                                
                                    }}                            
                                    />
                            {mobile.error ? <Text style={[styles.font14, { color: Colors.dangerRed, paddingTop: 13 }]}>{mobile?.error}</Text> : null}


                        </View>
                        {/* phone number HTML - Ends */}

                        {/* password  HTML */}
                        <View style={[style.signViewBlk, style.wdth50, style.pr15]}>
                            <Text style={[style.signLabel, style.font12, style.textDefault]}>Password<Text style={[style.font12, style.textPri]}>*</Text></Text>
                            <TextInput
                                style={style.signInput}
                                secureTextEntry={false}
                                onChangeText={(text) => setPassword({ value: text, error: '' })}
                                errorText={password.error}
                                description={undefined} />
                        </View>
                        {/*  password HTML - Ends */}

                        {/* Confirm password  HTML */}
                        <View style={[style.signViewBlk, style.wdth50, style.paddL15]}>
                            <Text style={[style.signLabel, style.font12, style.textDefault]}>Confirm Password<Text style={[style.font12, style.textPri]}>*</Text></Text>
                            <TextInput
                                style={style.signInput}
                                secureTextEntry={false}
                                onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
                                errorText={confirmpassword.error}
                                description={undefined}
                            />
                        </View>
                        {/*  Confirm password HTML - Ends */}

                         {/* Void password  HTML */}
                         <View style={[style.signViewBlk, style.wdth50, style.pr15]}>
                            <Text style={[style.signLabel, style.font12, style.textDefault]}>Void Password<Text style={[style.font12, style.textPri]}></Text></Text>
                            <TextInput
  style={{
    borderRadius: 8,
    backgroundColor: "#fff",
    width: "100%",
    height: 50,
    color: "#000",
    fontSize: 16,
    lineHeight: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  }}
  secureTextEntry={true}
  onChangeText={(text) => handleChange(text)}
  errorText={null} // or set error message if needed
  description={null} // or set description if needed
/>

                        </View>
                        {/* Void  password HTML - Ends */}

                        {/* TRN no  HTML */}
                        <View style={[style.signViewBlk, style.wdth50, style.paddL15]}>
                            <Text style={[style.signLabel, style.font12, style.textDefault]}>TRN No<Text style={[style.font12, style.textPri]}>*</Text></Text>

                            <TextInput
                                // label="TRN Number"
                                style={style.signInput}
                                placeholder={placeholderTRNNumber}
                                multiline={false}
                                placeholderTextColor={"#fff"}
                                autoCorrect={false}
                                underlineColorAndroid={'#fff'}
                                secureTextEntry={false}
                                onChangeText={(text) => setTrn({ value: text, error: '' })}
                                value={trn.value}
                                error={!!trn.error}
                                errorText={trn.error}
                                description={undefined} />
                        </View>
                        {/*  TRN no HTML - Ends */}

                        {/* Set Time*/}

                        <View style={[style.signViewBlk, style.wdth50, style.pr15]}>
                            {/* <Text style={[style.signLabel, style.font12, style.textDefault]}>Reset Time (24 hours Format)<Text style={[style.font12, style.textPri]}>*</Text></Text>
                            <TextInput
                                // label="TRN Number"
                                style={style.signInput}
                                placeholder={placeholderResetTime}
                                multiline={false}
                                placeholderTextColor={"#fff"}
                                autoCorrect={false}
                                underlineColorAndroid={'#fff'}
                                secureTextEntry={false}
                                onChangeText={(text: any) => setResetTime({ value: text, error: '' })}
                                value={resetTime.value}
                                error={!!resetTime.error}
                                errorText={resetTime.error}
                                description={undefined} /> */}

                            <Text style={[styles.signLabel, styles.textDefault]}>Select Country<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                             <View style={styles.pickerView}>
                                <ModalDropDown style={styles.dropdonwImg} />
                                <ModalSelector
                                    data={countryDataArray.sort(function (a, b) {
                                        return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0
                                    })}
                                    childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                                    selectStyle={styles.selectText}
                                    optionContainerStyle={styles.selectCont}
                                    optionTextStyle={styles.textStyle}
                                    initValueTextStyle={styles.textStyle}
                                    overlayStyle={styles.overlayText}
                                    cancelStyle={styles.selectCont}
                                    cancelContainerStyle={styles.cancelCont}
                                    cancelText={"Cancel"}
                                    initValue={"Select Country"}
                                    selectedKey={countryKey}
                                    onChange={(option) => {
                                        if (option.key) {
                                            setcountryKey(option.key)
                                            const filterCityList = cityData.filter((item) => item.countryId === option.countryId)
                                            setCityFilterList(filterCityList)
                                            setCountry(option.value)
                                            getCityList(option.countryId)
                                            setcountryKeyError(false)
                                        }
                                    }}
                                />
                            </View> 
                            {countryKeyerror &&
                                <Text style={[styles.font14, { color: Colors.dangerRed, paddingTop: 13 }]}>Country is required</Text>
                            }
                        </View>

                        {/* Set Time Ends*/}


                        {/* Country HTML Starts */}
                        <View style={[styles.signViewBlk, styles.wdth50, styles.paddL15]}>
                            <Text style={[styles.signLabel, styles.textDefault]}>Select City<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                            <View style={styles.pickerView}>

                                <ModalDropDown style={styles.dropdonwImg} />
                                <ModalSelector
                                    data={cityDataArray.sort(function (a, b) {
                                        return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0
                                    })}
                                    childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                                    selectStyle={styles.selectText}
                                    optionContainerStyle={styles.selectCont}
                                    optionTextStyle={styles.textStyle}
                                    initValueTextStyle={styles.textStyle}
                                    overlayStyle={styles.overlayText}
                                    cancelStyle={styles.selectCont}
                                    cancelContainerStyle={styles.cancelCont}
                                    cancelText={"Cancel"}
                                    initValue={"Select City"}
                                    selectedKey={cityKey}
                                    onChange={(option) => {
                                        if (option.key) {
                                            setcityKey(option.key)
                                            setCity(option.value)
                                            setcityKeyError(false)
                                        }
                                    }}
                                /> 
                            </View>
                            {cityKeyerror &&
                                <Text style={[styles.font14, { color: Colors.dangerRed, paddingTop: 13 }]}>City is required</Text>
                            }
                        </View>
                        {/* Country HTML Ends */}

                        {/* City HTML Starts */}

                        <View style={[styles.signViewBlk, styles.wdth50, styles.pr15]}>
                            <Text style={[style.signLabel, style.font12, style.textDefault]}>Address<Text style={[style.font12, style.textPri]}>*</Text></Text>
                            <TouchableOpacity >
                                <TextInput
                                    value={address.value}
                                    onChangeText={(text) => {
                                        setAddress({ value: text, error: '' })
                                    }}
                                    returnKeyType="next"
                                    placeholder={placeholderAddress}
                                    multiline={false}
                                    placeholderTextColor={"#fff"}
                                    autoCorrect={false}
                                    error={!!address.error}
                                    errorText={address.error}
                                    description={undefined}
                                    secureTextEntry={false}
                                    style={[style.signInput]}
                                >
                                </TextInput>
                            </TouchableOpacity>

                            {/* select accurate HTML */}
                            <View style={style.selaccView}>
                                {/* <Image
                                    style={[styles.accurateImg, styles.resizecontain]}
                                    source={(require('../../assets/images/sign_accurate.png'))}
                                /> */}
                                {/* <TouchableOpacity onPress={() => getGeoModal()}>
                                </TouchableOpacity> */}
                                {/* <Text style={[style.font14, style.selcAccText]}>Select Location</Text> */}

                            </View>
                            {/* select accurate HTML - Ends */}

                            <View>
                                <View style={style.checkboxsign}>
                                    <TouchableOpacity style={styles.flexAlignRow}
                                        onPress={() => {
                                            setSelection(!isSelected);
                                        }} >
                                        <View style={[styles.checkbox, isSelected && styles.radioBtnChecked]}>
                                            {
                                                (isSelected) ? <View style={styles.checkTick}></View> : null
                                            }
                                        </View>
                                        <Text style={styles.checkboxText}>Outlet Address same as the restaurant address</Text>

                                    </TouchableOpacity>
                                </View>
                                {
                                    (isSelected) ?
                                        <Text style={[style.signLabel, style.font12, style.textDefault]}>
                                            Outlet Address
                                        </Text> : null

                                }
                                {isSelected && (
                                    <View style={[style.signInput, style.flexrow, style.alignCenter, style.heightauto]}>
                                        <Text style={[style.wdth100]}>
                                            {address.value}
                                        </Text>
                                    </View>
                                )}

                            </View>
                        </View>


                        {/* City HTML Ends */}

                        {/* Address  HTML */}
                        <View style={[style.signViewBlk, style.wdth50, style.paddL15]}>
                            <TouchableOpacity onPress={() => selectOneFile()}>
                                <Text style={[style.signLabel, style.font12, style.textDefault]}>Upload Document</Text>
                                <View style={style.dragdropCon}>
                                    <Image
                                        style={[styles.dragFile, styles.resizecontain]}
                                        source={(require('../assets/images/file-plus.png'))}
                                    />
                                    <View style={[style.dragView]}>
                                        <Text style={[style.font11, style.dragDorpText]}>Drag and Drop or</Text>
                                        <Text style={[style.font11, style.textPri]} onPress={() => {
                                            selectOneFile()
                                        }}> browse</Text>
                                        <Text style={[style.font11, style.dragDorpText]}> your files</Text>
                                        <Image source={ImageUigallery} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {resumeFile && resumeFile.type === 'success' && (
                                <View style={[style.popupInputBlk, style.wdth100, styles.marTop10, styles.flexrow, styles.alignCenter]}>
                                    <View style={[styles.wdth80]}>
                                        <Text style={[style.signLabel, style.font12, style.textBlack, styles.marBtm2, styles.fontBold]}>{resumeFile?.name ? resumeFile.name : ''}</Text>
                                        <Text style={[style.signLabel, style.font12, style.textDefault]}>{resumeFile?.size ? niceBytes(resumeFile.size) : ''}</Text>
                                    </View>
                                    <View style={[styles.wdth20, styles.flexrow, styles.justifyEnd]}>
                                        <Pressable style={styles.closeView} onPress={() => setResumeFile('')}>
                                            <Image
                                                style={[styles.DocDelete, styles.flexrow, styles.justifyEnd]}
                                                source={(require('../assets/images/docu_del_icon.png'))} />
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                        </View>
                        {/*  Address HTML - Ends */}



                        {/* upload document HTML */}
                        <View style={[style.signViewBlk, style.wdth50, style.pr15]}>
                            <TouchableOpacity onPress={() => pickImage()}>
                                <Text style={[style.signLabel, style.font12, style.textDefault]}>Upload Restaurant Logo</Text>
                                <View style={style.dragdropCon}>
                                    <Image
                                        style={[styles.dragFile, styles.resizecontain]}
                                        source={(require('../assets/images/file-plus.png'))}
                                    />
                                    <View style={[style.dragView]}>
                                        <Text style={[style.font11, style.dragDorpText]}>Drag and Drop or</Text>
                                        <Text style={[style.font11, style.textPri]} onPress={() => {
                                            pickImage()
                                        }}> browse</Text>
                                        <Text style={[style.font11, style.dragDorpText]}> your files</Text>
                                        <Image source={ImageUigallery} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {image != null ?
                                <View style={[style.popupInputBlk, style.width100per]}>
                                    <View style={[styles.wdth100, styles.flexrow, styles.flexWrap, styles.uploDocBlk, styles.alignCenter, styles.justifyBetween]}>
                                        <View style={[styles.wdth80, styles.flexrow, styles.alignCenter]}>
                                            <Image
                                                style={styles.milImage} source={{ uri: `${image}` }}
                                            />
                                            {/* <View style={[styles.padL10]}>
                                                <Text style={[styles.font14, styles.profileText, styles.marBtm2]}>{imageExtension}</Text>
                                                <Text style={[styles.font12, styles.profileText]}>{fileSize}</Text>
                                            </View> */}
                                        </View>
                                        <View style={[styles.wdth20, styles.flexrow, styles.justifyEnd]}>
                                            <Pressable style={styles.closeView} onPress={() => removeImage()}>
                                                <Image
                                                    style={[styles.DocDelete, styles.flexrow, styles.justifyEnd]}
                                                    source={(require('../assets/images/docu_del_icon.png'))} />
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                                : null
                            }
                        </View>

                        {/* upload document - Ends */}

                        {/* save and already account HTML */}
                        <View style={[style.saveAlreadyView, styles.pr15]}>
                            <ButtonSubmit mode="contained" onPress={doSubmit} style={style.signBtn}>Sign Up</ButtonSubmit>
                            <View style={[style.alreadyView, styles.wdth50]}>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[styles.flexrow, styles.justifyEnd, styles.alignCenter]}>
                                    <Text style={[style.font12, style.textBlack]}>Already have an account? </Text>
                                    <Text style={[styles.textPri, styles.font12]} onPress={() => navigation.navigate('Login')}>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* save and already account HTML - Ends */}

                    </View>
                </View>
            </KeyboardAwareScrollView>
            {/* registration form HTML - Ends */}

            <View>

                <View style={[styles.registrationContainerView]}>
                    <GeoLocationSearch showGeoModal={showGeoSearch} changeDisplayState={closeGeoSearchModal} mapFilterSearch={locationBasedFilter}></GeoLocationSearch>

                </View>
            </View>
            {openSuccessPaymentMsg &&
              <Modal isVisible={openSuccessPaymentMsg}>
                {SuccessPaymentPopup()}
              </Modal>
            }
            </>
    )
};

export default UserRegistration;
