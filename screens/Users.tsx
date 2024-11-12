import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import * as yup from 'yup';
import styles from '../assets/css/style';
import InternetDownIcon from '../assets/images/internet_down.js';
import ModalDropDown from '../assets/images/ModalDropDown.js';
import Checkbox from '../components/Checkbox';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import Header from '../components/sideMenuHeaderMaster';
import { endPoint } from '../services/api/apiConstant';
import api from '../services/api/callingApi';
import Colors from '../constants/Colors';
import TableView from './ViewUsers';
import { constRoleId } from "../screens/common/RoleConstants";
import { Platform } from 'react-native';



export default function Users({ navigation, route }: { navigation: any, route: any }) {

  const [data, setTableData] = useState([]);
  const [isDataPresent, setDataPreset] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [countryData, setcountryData] = useState([]);
  const [cityData, setcityData] = useState([]);
  const [cityFilterData, setCityFilterList] = useState([]);
  const [roleData, setroleData] = useState([]);
  const [reportingData, setreportingData] = useState([]);
  const [values, setValues] = useState({ val: [''] });
  const [checked, setChecked] = React.useState('first');
  const [mobileNo, setmobileNo] = useState([{
    number: "",
    isPrimary: true,
  }]);
  const [reportKey, setReportKey] = useState(0)
  const [countryKey, setcountryKey] = useState(0)
  const [cityKey, setcityKey] = useState(0)
  const [roleKey, setRoleKey] = useState(0)
  const [alternumber, setalternumber] = useState()
  const userId = "";
  const [openSuccessMsg, setopenSuccessMsg] = useState(false);
  const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false);
  const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
  const [userRoleId, setuserRoleId] = useState('')
  const [outletId, setOutletId] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [outletName, setOutlet] = useState('');
  const isFocused = useIsFocused();
  const [countryId, setCountryId] = useState('');
  const [roleId, setRoleId] = useState('')
  //Get user Info
  useEffect(() => {
    setTimeout(() => getRestaurant(), 1000);
  }, [isFocused]);

  const getRestaurant = async () => {
    const userRoleId = await AsyncStorage.getItem('userRoleId')
    const restaurantName = await AsyncStorage.getItem('restaurantName')
    const outletName = await AsyncStorage.getItem('outletName')
    const outletAddress = await AsyncStorage.getItem('outletAddress')
    const outletid = await AsyncStorage.getItem('restaurantId')
    setOutletId(outletId)
    setRestaurant(restaurantName)
    setOutlet(outletName)
    setuserRoleId(userRoleId)

  }
  //Open Add User Popup call
  const openAddUser = () => {
    setOpenUser(true)
  }
  //Open Add User Popu call
  const toggleModal = () => {
    setcountryKey(0)
    setcityKey(0)
    setRoleKey(0)
    setOpenUser(!openUser)
  };
  //Open Edit User Popu Call
  const toggleEdit = () => {
    setcountryKey(0)
    setcityKey(0) 
    setRoleKey(0)
    setEditUser(!editUser)
  };
  //User Validatiions Check
  const addUserValidationSchema = yup.object().shape({
    userName: yup
      .string()
      .required('User name is required'),
    password: yup
      .string()
      .required('Password is required'),
    // number: yup
    //   .string()
    //   .matches(/^\d+$/, 'Phone No. must contain only numbers')
    //   .required('Phone No. is required'),
    //   alternumber: yup.string()
    //   .required('Alternate Phone No. is required'),
    number: yup.string().matches(/^[0-9]{9}$/, 'Phone No must be exactly 9 digits and contain only numbers').required('Phone No. is required'),      
    alternumber: yup.string().required('Alternate Phone No. is required').matches(/^[0-9]{9}$/, 'Alternate Phone No must be exactly 9 digits and contain only numbers'),
    emailId: yup
      .string()
      .email('Invalid email')
      .required('Email ID is required'),
    address: yup
      .string()
      .required('Address is required'),
    city: yup
      .string()
      .required('City is required'),
    country: yup
      .string()
      .required('Country is required'),
    roleName: yup
      .string()
      .required('Role Name is required'),
    // reportingTo: yup
    //   .string()
    //   .required('Reporting To is required'),
  })


  //get All User List
  useEffect(() => {

    getUserList();
    return () => {
      setTableData([]);
    }
  }, []);
  const getUserList = async () => {
    let restaurantId = await AsyncStorage.getItem('restaurantId')
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const roleId = await AsyncStorage.getItem('userRoleId')
    if(roleId === constRoleId.PRODUCT_ADMIN_ID){
      const result = await api.getAllMasterData(token, endPoint.GET_USERS);
      if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
        successInternetdownOpen()
        setDataPreset(false);
      } else {
        setTableData(result.data);
        setDataPreset(true);
      }
    }
    else{
      const result = await api.getAllMasterData(token, endPoint.GETUSERSBYRESTID + restaurantId);
      if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
        successInternetdownOpen()
        setDataPreset(false);
      } else {
        setTableData(result.data);
        setDataPreset(true);
      }
    }
    
  }
  //Create User
  const handleSubmit = async (data) => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId
    let restaurantId = await AsyncStorage.getItem('restaurantId')
    var myJson = {
      userRegistration: {
        userName: data?.userName,
        password: data?.password,
        userRoleId: roleId,
        phoneNo: [
          {
            number: data.number,
            isPrimary: true
          },
          {
            number: data.alternumber,
            isPrimary: false
          }
        ],
        emailId: data.emailId,
        address: data.address,
        city: data.city,
        country: data.country,
        imageName: "",
        imageExtension: "",
         idCardNo: "74",
         joiningDate: "2023-08-23",
        shiftTiming: "Night",
        reportingTo: data.reportingTo,
        activeStatus: true,
        voidPassword: data.voidpassword,
        weekDays: [ "Sunday"],
        outletId: outletId,
        roleName: data?.roleName,
       
       
      },
      restaurantId: restaurantId,
       image: ""
    }
    const result = await api.CreateMasterData(endPoint.CREATE_USERS, token, myJson);
    setcountryKey(0)
    setcityKey(0)
    setRoleKey(0)
    delete myJson.userRegistration.city;
delete myJson.userRegistration.country;
delete myJson.userRegistration.roleName;
myJson.userRegistration.city = "Select City";
myJson.userRegistration.country = "Select Country";
myJson.userRegistration.roleName = "Select Role";

    if (JSON.stringify(result?.data) === null) {
      // internetDownPop()
    }
    else {
      successOpen()
      setOpenUser(false)
      getUserList();
      setcountryKey(0)
      setcityKey(0)
      setRoleKey(0)
    }
  }
  // Create Success msg 
  const successOpen = () => {
    setopenSuccessMsg(!openSuccessMsg)
  }

  const SuccessPopup = () => {
    return (
      // success popup
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
          <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>User Created Successfully</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => successOpen()}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - Ends
    );
  }
  //UPDATE USER
  const updateUser = async (data) => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    var myJson = {

      userId: editUserData.userId,
      userName: data.userName,
      password: data.password,
      userRoleId: data.userRoleId,
      phoneNo: [
        {
          number: data.number,
          isPrimary: true
        },
        {
          number: data.alternumber,
          isPrimary: false
        }
      ],
      emailId: data.emailId,
      address: data.address,
      city: data.city,
      country: data.country,
      reportingTo: data.reportingTo,
      outletId: outletId,

    }

    const result = await api.UpdateMasterData(endPoint.EDIT_USERS + editUserData.userId, token, myJson);
    if (JSON.stringify(result?.data) === null) {
      successInternetdownOpen()
    } else {
      successOpenUpdate()
      setEditUser(false)
      getUserList();
    }
  }
  // Update Success msg 
  const successOpenUpdate = () => {
    setopenUpdateSuccessMsg(!openUpdateSuccessMsg)
  }
  const SuccessUpdatePopup = () => {
    return (
      // success popup
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
          <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>User Updated Successfully</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => successOpenUpdate()}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - Ends
    );
  }
  //  Internet down msg 
  const successInternetdownOpen = () => {
    setopenInternetdownMsg(!openInternetdownMsg)
  }
  // internet down popup
  const internetDownPop = () => {
    return (
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
          <InternetDownIcon style={[styles.marBtm20]} />
          <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Oops!</Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Something went wrong!</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => successInternetdownOpen()}>
            <Text style={[styles.textWhite, styles.font16]}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // internet down popup - Ends

  // Get County and City List
  useEffect(() => {
    getCountryList();
    return () => {
      setcountryData([]);
      // setcityData([]);
    }
  }, []);
  const getCountryList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    const result = await api.getAllMasterData(token, endPoint.GET_COUNTRY);
    if (result?.data.length === 0) {
      successInternetdownOpen()
      setDataPreset(false);
    } else {
      setcountryData(result.data);
      setDataPreset(true);
    }
    // const resultCity = await api.getAllMasterData(token, endPoint.GET_CITY+countryId);
    // if (resultCity.data.length === 0) {

    // } else {
    //   setcityData(resultCity.data);
    // }
  }
  //Get Role List
  useEffect(() => {
    getRoleList();
    return () => {
      setroleData([]);
    }
  }, []);
  const getRoleList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    const result = await api.getAllMasterData(token, endPoint.GET_ROLE);
    if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
      successInternetdownOpen()
      setDataPreset(false);
    } else {
      setroleData(result.data);
      setDataPreset(true);
    }
  }
  //Get Reporting To List
  useEffect(() => {

    getReportingToList();
    return () => {
      setreportingData([]);
    }
  }, []);
  const getReportingToList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    const result = await api.getAllMasterData(token, endPoint.GET_REPORTING_TO);
    if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
      successInternetdownOpen()
      setDataPreset(false);
    } else {
      setreportingData(result.data);
      setDataPreset(true);
    }
  }

  //Filter Reporting To List
  let reportingDataArray = reportingData.map((s, i) => {

    let newData = {
      key: i + 1,
      label: s.userName,
      value: s.userName
    }
    return newData;
  })
  //Filter Role List
  let roleDataArray = roleData.map((s, i) => {

    let newData = {
      key: i + 1,
      label: s.roleName,
      value: s.roleId
    }
    return newData;
  })
  //FIlter Country List
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
  let cityDataArray = cityFilterData.map((s, i) => {

    let newData = {
      key: i + 1,
      label: s.cityName,
      value: s.cityName,
    }
    return newData;
  })
  //Get City List
  const getCityList = async (countryId, data) => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    const resultCity = await api.GetCityBYCountryId(countryId);
    if (resultCity?.data.length === 0) {

    } else {
      setcityData(resultCity.data);
      setCityFilterList(resultCity.data)
    }
  }
  //Send edit user data
  const sendDataToParent = (data) => {
    //Prepopulate country name
    const selectcountry = countryDataArray.filter((item) => item.value == data.country)
    setcountryKey(selectcountry[0]?.key)
    // //Prepopulate city name
    const selectcity = cityDataArray.filter((item) => item.value == data.city)
    setcityKey(selectcity[0]?.key)
    //Prepopulate role name
    getCityList(selectcountry[0]?.countryId, data)
    //Prepopulate reporting to name
    const selecreportingtoarray = reportingDataArray.filter((item) => item.value == data.reportingTo)
    setReportKey(selecreportingtoarray[0]?.key)

    setEditUserData(data)
    setEditUser(true)
  };

  // function createInputs(isValid: boolean) {
  //   return mobileNo.map((el, i) =>
  //     <View style={styles.modifierAddInput}>
  //       <View style={styles.flxDirow}>
  //         <View style={[styles.wdth50, styles.paddRL15]}>
  //           <Text style={[styles.modifierName]}>Users</Text>
  //         </View>
  //         <View style={[styles.wdth50, styles.flxDirow, styles.flexend, styles.paddRL15]}>
  //           <Pressable style={styles.removeTaxBtn} onPress={() => removeClick(i)}>
  //             <Text style={[styles.textDefault, { color: Colors.white }]}>remove</Text>
  //           </Pressable>
  //         </View>
  //       </View>
  //       <View style={styles.flxDirow}>
  //         <Text style={[styles.textDefault,]}>Phone No</Text>
  //         <TextInput style={styles.signInput}
  //           defaultValue={JSON.stringify((el.number))}
  //           value={el.number}
  //           onChangeText={(text) => handleInputChange(text, 'number', i)} />

  //         <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
  //           <Text style={[styles.signLabel, styles.textDefault]}>Is Primary</Text>
  //           <View style={[styles.checkBlkSetup]}>
  //             <Checkbox
  //               checkvalue={el.isPrimary}
  //               value={el.isPrimary}
  //               style={styles.taxsetCheckbox}
  //               status={el.isPrimary === true ? 'checked' : 'unchecked'}
  //               onPress={() => handleInputChange(true, 'isPrimary', i)}
  //             />
  //             <Text style={styles.checkboxText}>Primary Number </Text>
  //           </View>
  //         </View>
  //       </View>

  //     </View>
  //   );
  // }

  //multiple mobile numbers adding into an array
  const handleInputChange = (e, name, index) => {

    const list = [...mobileNo];
    list[index][name] = e;
    setmobileNo(list);


  };
  const addClick = () => {
    // setValues({ val: [...values.val, ''] })

    setmobileNo([...mobileNo,
    {
      number: " ",
      isPrimary: false,
    }
    ]);

  }

  //removing perticular mobile number
  const removeClick = (data) => {
    // let vals = [...values.val];
    let index = data;
    // vals.splice(index, 1);
    // setValues({ val: vals });

    const list = [...mobileNo];
    list.splice(index, 1);
    setmobileNo(list);
  }

  //-------------------------------------- Users Add Popup -----------------------------------------------------

  const popupAddUser = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>
          <View>
            <View>
              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Add User
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                  <Image source={(require("../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>
              <Formik
                validationSchema={addUserValidationSchema}
                initialValues={{
                  userName: '',
                  password: '',
                  voidpassword:'',
                  number: '',
                  emailId: '',
                  address: '',
                  city: '',
                  country: '',
                  roleName: '',
                  alternumber: ''
                  //  reportingTo: '',
                }}
                onSubmit={values => handleSubmit(values)}
              >
                {({ handleSubmit, handleChange, isValid, values, setFieldValue, touched, errors }) => (
                  <View>
                    <View style={styles.flxDirow}>
                      <Field
                        component={CustomInput}
                        name="userName"
                        label="User Name"
                        mandate={true}
                      />
                      <Field
                        component={CustomInput}
                        name="password"
                        label="Password"
                        mandate={true}
                      />
                       <Field
                        component={CustomInput}
                        name="voidpassword"
                        label="Void Password"
                        mandate={true}
                      />
                      <Field
                        component={CustomInput}
                        name="number"
                        label="Phone No"
                        mandate={true}
                        keyboardType="numeric"

                      />
                      <Field
                        component={CustomInput}
                        name="alternumber"
                        label="Alternate Phone No"
                        keyboardType="numeric"
                        mandate={false}

                      />
                      <Field
                        component={CustomInput}
                        name="emailId"
                        label="Email ID"
                        mandate={true}
                      />

                      <Field
                        component={CustomInput}
                        name="address"
                        label="Address"
                        mandate={true}
                      />
                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
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
                                setFieldValue('country', option.value)
                                setcountryKey(option.key)
                                setCountryId(option.countryId)
                                getCityList(option.countryId)
                                const filterCityList = cityData.filter((item) => item.countryId === option.countryId)
                                setCityFilterList(filterCityList)
                              }
                            }}
                          />
                        </View>
                        {touched.country && errors.country &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Country is required</Text>
                        }
                      </View>

                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
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
                                setFieldValue('city', option.value)

                              }
                            }}
                          />
                        </View>
                        {touched.city && errors.city &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>City is required</Text>
                        }
                      </View>

                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Select Role<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <View style={styles.pickerView}>
                          <ModalDropDown style={styles.dropdonwImg} />
                          <ModalSelector
                            data={roleDataArray.sort(function (a, b) {
                              return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0
                            })} childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                            selectStyle={styles.selectText}
                            optionContainerStyle={styles.selectCont}
                            optionTextStyle={styles.textStyle}
                            initValueTextStyle={styles.textStyle}
                            overlayStyle={styles.overlayText}
                            cancelStyle={styles.selectCont}
                            cancelContainerStyle={styles.cancelCont}
                            cancelText={"Cancel"}
                            initValue={"Select Role"}
                            selectedKey={roleKey}
                            onChange={(option) => {
                              if (option.key) {
                                setFieldValue('roleName', option.label)
                                setRoleKey(option.key)
                                setRoleId(option.value)
                              }
                            }}
                          />
                        </View>
                        {touched.roleName && errors.roleName &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Role Name is required</Text>
                        }
                      </View>

                      {/* <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Select Reporting To<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <View style={styles.pickerView}>

                          <ModalDropDown style={styles.dropdonwImg} />
                          <ModalSelector
                            data={reportingDataArray.sort(function (a, b) {
                              return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0
                            })} childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                            selectStyle={styles.selectText}
                            optionContainerStyle={styles.selectCont}
                            optionTextStyle={styles.textStyle}
                            initValueTextStyle={styles.textStyle}
                            overlayStyle={styles.overlayText}
                            cancelStyle={styles.selectCont}
                            cancelContainerStyle={styles.cancelCont}
                            cancelText={"Cancel"}
                            initValue={"Select Reporting To"}
                            selectedKey={reportKey}
                            onChange={(option) => {
                              if (option.key) {
                                setFieldValue('reportingTo', option.value)
                                setReportKey(option.key)
                              }
                            }}
                          />
                        </View>

                        {touched.reportingTo && errors.reportingTo &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Reporting To is required</Text>
                        }
                      </View> */}
                      {/* <Field
                        component={CustomInput}
                        name="idCardNo"
                        label="ID Card No."
                        mandate={false}
                      /> */}
                    </View>

                    <TouchableOpacity onPress={handleSubmit}>
                      <View style={styles.popupBtnCon}>
                        <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={handleSubmit} />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>

            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  //-------------------------------------- Users Edit Popup -----------------------------------------------------
  const popupEditUser = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>
          <View>

            <View>

              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Edit User
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleEdit()}>
                  <Image source={(require("../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>

              <Formik
                validationSchema={addUserValidationSchema}
                initialValues={{
                  userName: editUserData.userName,
                  number: editUserData?.phoneNo[0]?.number,
                  alternumber: editUserData?.phoneNo[1]?.number,
                  isPrimary: editUserData.isSelected,
                  emailId: editUserData.emailId,
                  address: editUserData.address,
                  city: editUserData.city,
                  country: editUserData.country,
                  roleName: editUserData.roleName,
                  password: editUserData.password,
                  voidpassword:editUserData.voidPassword,
                  // reportingTo: editUserData.reportingTo,
                  // idCardNo: editUserData.idCardNo,

                }}
                onSubmit={values => updateUser(values)}
              >
                {({ handleSubmit, handleChange, isValid, values, setFieldValue, touched, errors }) => (
                  <View>
                    <View style={styles.flxDirow}>
                      <Field
                        component={CustomInput}
                        name="userName"
                        label="User Name"
                        mandate={true}
                      />
                      <Field
                        component={CustomInput}
                        name="password"
                        label="Password"
                        mandate={true}
                      />
                       <Field
                        component={CustomInput}
                        name="voidpassword"
                        label="Void Password"
                        mandate={true}
                      />
                      <Field
                        component={CustomInput}
                        name="number"
                        label="Phone No"
                        mandate={true}
                        keyboardType="numeric"

                      />
                      <Field
                        component={CustomInput}
                        name="alternumber"
                        label="Alternate Phone No"
                        keyboardType="numeric"
                      />
                      <Field
                        component={CustomInput}
                        name="emailId"
                        label="Email ID"
                        mandate={true}
                      />
                      <Field
                        component={CustomInput}
                        name="address"
                        label="Address"
                        mandate={true}
                      />

                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Select Country<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <View style={styles.pickerView}>
                          <ModalDropDown style={styles.dropdonwImg} />
                          <ModalSelector
                            data={countryDataArray.sort(function (a, b) {
                              return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0
                            })} childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                            selectStyle={styles.selectText}
                            optionContainerStyle={styles.selectCont}
                            optionTextStyle={styles.textStyle}
                            initValueTextStyle={styles.textStyle}
                            overlayStyle={styles.overlayText}
                            cancelStyle={styles.selectCont}
                            cancelContainerStyle={styles.cancelCont}
                            cancelText={"Cancel"}
                            initValue={values.country}
                            selectedKey={countryKey}
                            onChange={(option) => {
                              if (option.key) {
                                setFieldValue('country', option.value)
                                setcountryKey(option.key)
                                getCityList(option.countryId)
                                const filterCityList = cityData.filter((item) => item.countryId === option.countryId)
                                setCityFilterList(filterCityList)
                              }
                            }}
                          />
                        </View>
                        {touched.country && errors.country &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Please select Country</Text>
                        }
                      </View>

                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Select Country<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
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
                            initValue={values.city}
                            selectedKey={cityKey}
                            onChange={(option) => {
                              if (option.key) {
                                setFieldValue('city', option.value)

                              }
                            }}
                          />
                        </View>
                        {touched.country && errors.country &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>City is required</Text>
                        }
                      </View>
                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Select Role<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <View style={styles.pickerView}>
                          <ModalDropDown style={styles.dropdonwImg} />
                          <ModalSelector
                            data={roleDataArray.sort(function (a, b) {
                              return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0
                            })} childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                            selectStyle={styles.selectText}
                            optionContainerStyle={styles.selectCont}
                            optionTextStyle={styles.textStyle}
                            initValueTextStyle={styles.textStyle}
                            overlayStyle={styles.overlayText}
                            cancelStyle={styles.selectCont}
                            cancelContainerStyle={styles.cancelCont}
                            cancelText={"Cancel"}
                            initValue={values.roleName}
                            selectedKey={roleKey}
                            onChange={(option) => {
                              if (option.key) {
                                setFieldValue('roleName', option.value)
                                setRoleKey(option.key)
                              }
                            }}
                          />
                        </View>
                        {touched.roleName && errors.roleName &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Please select Role Name</Text>
                        }
                      </View>

                      {/* <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Select Reporting To<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <View style={styles.pickerView}>
                          <ModalDropDown style={styles.dropdonwImg} />
                          <ModalSelector
                            data={reportingDataArray.sort(function (a, b) {
                              return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0
                            })} childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                            selectStyle={styles.selectText}
                            optionContainerStyle={styles.selectCont}
                            optionTextStyle={styles.textStyle}
                            initValueTextStyle={styles.textStyle}
                            overlayStyle={styles.overlayText}
                            cancelStyle={styles.selectCont}
                            cancelContainerStyle={styles.cancelCont}
                            cancelText={"Cancel"}
                            initValue={values.reportingTo}
                            selectedKey={reportKey}
                            onChange={(option) => {
                              if (option.key) {
                                setFieldValue('reportingTo', option.value)
                                setReportKey(option.key)
                              }
                            }}
                          />
                        </View>
                        {touched.reportingTo && errors.reportingTo &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Please select Reporting To</Text>
                        }
                      </View> */}
                      {/* <Field
                        component={CustomInput}
                        name="idCardNo"
                        label="ID Card No."
                      /> */}
                    </View>

                    <TouchableOpacity onPress={handleSubmit}>
                      <View style={styles.popupBtnCon}>
                        <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={handleSubmit} />
                      </View>
                    </TouchableOpacity>
                  </View>

                )}
              </Formik>

            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  //------------------------------------------- User Intreface ----------------------------------------------------------------------
  return (
    <>
      <Header heading={"Users"} />

      <ScrollView style={styles.categoryBlkCon}>
        <View style={[styles.textcontainer1, styles.catSubBlk]}>
          <Text style={styles.textStyle1}>
            Users
          </Text>
          <View>
          </View>

          <TouchableOpacity onPress={() => openAddUser()}>
            <View style={styles.textcontainer2}>
              <Text style={styles.textStyle2}>
                Add Users
              </Text>
            </View>
          </TouchableOpacity>

        </View>

        <View style={[styles.paddB60]}>
          <View style={styles.table}>
            {!isDataPresent
              ?
              // no record HTML
              <View style={styles.noRecordFoundView}>
                <Image
                  style={styles.noRecordImage}
                  source={(require('../assets/images/clipboard.png'))}
                />
                <View>
                  <Text style={styles.recordDisplay}>There are no Users to display.</Text>
                </View>

                <View style={styles.noRecordItem}>
                  <Text style={styles.addText} onPress={() => openAddUser()}>
                    Add User
                  </Text>
                  <Text style={styles.recordDisplay}>
                    to continue.
                  </Text>
                </View>
              </View>
              :
              <TableView data={data} sendEditData={sendDataToParent} updateDelete={() => getUserList()} />
              // no record HTML Ends
            }
          </View>

          {openUser &&
            <Modal isVisible={openUser}>
              {popupAddUser()}
            </Modal>
          }

          {editUser &&
            <Modal isVisible={editUser}>
              {popupEditUser()}
            </Modal>
          }
          {openSuccessMsg &&
            <Modal isVisible={openSuccessMsg}>
              {SuccessPopup()}
            </Modal>
          }
          {openUpdateSuccessMsg &&
            <Modal isVisible={openUpdateSuccessMsg}>
              {SuccessUpdatePopup()}
            </Modal>
          }
          {openInternetdownMsg &&
            <Modal isVisible={openInternetdownMsg}>
              {internetDownPop()}
            </Modal>
          }
        </View>
      </ScrollView >

    </>


  );

}