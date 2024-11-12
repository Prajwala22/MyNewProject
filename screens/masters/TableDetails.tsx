import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import * as yup from 'yup';
import styles from '../../assets/css/style';
import InternetDownIcon from '../../assets/images/internet_down.js';
import ModalDropDown from '../../assets/images/ModalDropDown.js';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Header from '../../components/sideMenuHeaderMaster';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import Colors from '../constants/colors';
import TableViewTableDetails from './TableViewTableDetails';
import Toast from 'react-native-root-toast';
import { Platform } from 'react-native';


export default function TableDetails({ navigation, route }: { navigation: any, route: any }) {

  const [isDataPresent, setDataPreset] = useState(false);
  const [openTableDetails, setOpenTableDetails] = useState(false);
  const [editTableDetails, setEditTableDetails] = useState(false);
  const [editData, setEditData] = useState(null);
  const [tableTypeKey, setTableTypeKey] = useState(0);
  const [tableDesignKey, setTableDesignKey] = useState(0)
  const [outletKey, setOutletKey] = useState(0);
  const [selectedOutletId, setSelectedOutletId] = useState(0);
  const [outletData, setOutletData] = useState([]);
  const isFocused = useIsFocused();
  const [sectionData, setSectionData] = useState([])
  const [openSuccessMsg, setopenSuccessMsg] = useState(false);
  const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false);
  const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
  const [tableLength, setTableLength] = useState(0)
  const [data, setData] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState('');
  const optionsPerPage = [2, 3, 4];
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  var count = 1;
  const [userRoleId, setuserRoleId] = useState('')
  const [outletId, setOutletId] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [outletName, setOutlet] = useState('');
  const [tableDesign, setTableDesign] = useState('')




  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    });
    return unsubscribe;
  }, [navigation]);

  //Get User Info
  useEffect(() => {
    setTimeout(() => getuserInfo(), 1000);
  }, [isFocused]);

  const getuserInfo = async () => {
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

  //Get Table Details List
  useEffect(() => {

    getTableDetailsList();
    return () => {
      setData([]);
    }
  }, [isFocused]);
  const getTableDetailsList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const result = await api.getAllMasterData(token, endPoint.GET_TABLEDETAILS + outletId);
    if (result.data === null) {
      setDataPreset(false);

    }
    else {
      setData(result.data);
      setDataPreset(true);
      setTableLength(result.data?.length)

    }
  }
  //Create Table Details
  const handleSubmit = async (data) => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    let restaurantId = await AsyncStorage.getItem('restaurantId')

    var myJson = {
      tableNo: data.tableNo,
      pilot: data.pilot,
      capacity: data.capacity,
      tableType: data.tableType,
      outletId: selectedOutletId,
      restaurantId: restaurantId,
      tableDesign: tableDesign,
      activeStatus: true
    }
    const result = await api.CreateMasterData(endPoint.CREATE_TABLEDETAILS, token, myJson);
    if (tableLength >= 1) {
      getTableDetailsList();
      successOpen()
      setOpenTableDetails(false)
      setTableDesignKey(0);
      setTableTypeKey(0);
      setOutletKey(0);

    } else {
      tempGetTableDetailsList()
    }
    // }
    // if (result.success) {
    //   // If result.success is true
    //   getTableDetailsList();
    //   successOpen();
    //   setOpenTableDetails(false);
    //   setTableDesignKey(0);
    //   setTableTypeKey(0);
    //   setOutletKey(0);
    // } else {
    //   // If result.success is false
    //   Toast.show(result.message);
    //   getTableDetailsList();
    //   setOpenTableDetails(false);
    //   setTableDesignKey(0);
    //   setTableTypeKey(0);
    //   setOutletKey(0);
    // }
  }

  //Temp table Details List

  const tempGetTableDetailsList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const result = await api.getAllMasterData(token, endPoint.GET_TABLEDETAILS + outletId);
    if (result.data === null) {
      getTableDetailsList()
      setOpenTableDetails(false)

    }
    else {
      setOpenTableDetails(false)
      navigation.navigate('MapAddingData')
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
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Table Created Successfully</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => successOpen()}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - Ends
    );
  }
  //Update Table Details
  const updateTableDetails = async (data) => {

    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    let restaurantId = loginData.restaurantId;

    var myJson = {
      tableId: editData.tableId,
      tableNo: data.tableNo,
      pilot: data.pilot,
      capacity: data.capacity,
      tableType: data.tableType,
      tableStatus: editData.tableStatus,
      restaurantId: editData.restaurantId,
      outletId: outletId,
      tableDesign: data.tableDesign,
      activeStatus: true,
      createdBy: editData.createdBy,
      createdOn: editData.createdOn
    }
    const result = await api.UpdateMasterData(endPoint.EDIT_TABLEDETAILS + editData.tableId, token, myJson);
    if (JSON.stringify(result.data) === null || result.success === false) {
      Alert.alert(result.message)
    } else {
      successOpenUpdate()
      setEditTableDetails(false)
      getTableDetailsList();
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
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Table Updated Successfully</Text>
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

  //Open add Table Details Popup 
  const openAddTableDetails = () => {
    setOpenTableDetails(true)
  }

  //Close add and edit Table Details Popup
  const toggleModal = () => {
    setOpenTableDetails(!openTableDetails)
  };
  //Open Edit Table Details Popup
  const toggleEdit = () => {
    setEditTableDetails(!editTableDetails)
  };

  //Check Table Details Validation
  const addTableDetailsValidationSchema = yup.object().shape({

    tableNo: yup
      .string()
      .required('Table No is required'),
    pilot: yup
      .string()
      .required('Pilot is required'),
    capacity: yup
      .string()
      .required('Capacity is required')
      .test('is-less-than-6', 'Capacity must be less than or equal to 6', (value) => value <= '6'),

    tableType: yup
      .string()
      .required('section type is required'),
    outlet: yup
      .string()
      .required('Outlet is required'),
    tableDesign: yup
      .string()
      .required('Design is required'),
  })

  //Get Sections
  

  //Get Outlet by Restaurant
  useEffect(() => {
    getTableTypeList();
    getOutletList();
    return () => {
      +
        setData([]);
    }
  }, [500]);
  const getOutletList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    const restaurantId: any = await AsyncStorage.getItem('restaurantId')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    const result = await api.getAllMasterData(token, endPoint.GET_OUTLETS_BY_RESTAURANT + restaurantId);
    if (result.success === true) {
      setOutletData(result.data.outlets)
    }
    else {
    }
  }

  //Filter Outlets
  let outletDataArray = outletData.map((s, i) => {

    let newData = {
      key: i + 1,
      label: s.outletName,
      value: s.outletId
    }
    return newData;
  })

  useEffect(() => {
    const timer = setTimeout(() => getTableTypeList(), 500);
  
    // Clean up the timer when the component unmounts or when selectedOutletId changes
    return () => {
      clearTimeout(timer);
    }
  }, [selectedOutletId]);

  const getTableTypeList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = selectedOutletId;
    const result = await api.getAllMasterData(token, endPoint.GET_SECTIONS + outletId);
    if (result.data === null) {
    } else {
      setSectionData(result.data);
    }
  }
  //filter Sections
  let sectionDataArray = sectionData.map((s, i) => {

    let newData = {
      key: i + 1,
      label: s.tableTypeName,
      value: s.tableTypeName
    }
    return newData;
  })
  //Select Table Design Data

  const tableDesignData = [
    { key: 1, label: 'Square', value: 'Square' },
    { key: 2, label: 'Triangle', value: 'Triangle' },
    { key: 3, label: 'Circle', value: 'Circle' }
  ]

  //Send edit Table Details 
  const sendDataToParent = (data) => {
    //Prepopulate Section
    const tabletypearray = sectionData.filter((item) => item.value == data.tableType)
    setTableTypeKey(tabletypearray[0]?.key)
    //Prepopulate Outlet
    const outletarray = outletDataArray.filter((item) => item.value = data.value)
    setOutletKey(outletarray[0]?.key)
    const sectionarray = sectionDataArray.filter((item) => item.value = data.value)
    setOutletKey(sectionarray[0]?.key)
    //filter Table design data
    // const tableDesignArray = tableDesignData.filter((item) => item.value === data.value)
    // setTableDesignKey(tableDesignArray[0]?.key)
    setEditData(data)
    setEditTableDetails(true)
  };
  const handleChangeText = (text:any) => {
  };
  //Add Table Details Popup
  const popupAddTableDetails = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>

          <View>
            <View>
              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Add Table Details
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>
              <Formik
                validationSchema={addTableDetailsValidationSchema}
                initialValues={{
                  tableNo: '',
                  pilot: '',
                  capacity: '',
                  tableType: '',
                  outlet: '',
                  tableDesign: ''

                }}
                onSubmit={values => handleSubmit(values)}
              >
                {({ handleSubmit, handleChange, isValid, values, setFieldValue, touched, errors }) => (
                  <View>
                    <View style={[styles.popuprow]}>
                      <Field
                        component={CustomInput}
                        name="tableNo"
                        label="Table No"
                        mandate={true}
                        keyboardType="numeric"
                      />
                      <Field
                        component={CustomInput}
                        name="pilot"
                        label="Pilot"
                        mandate={true}
                      />
                    </View>
                    <View style={[styles.popuprow]}>
                      <Field
                        component={CustomInput}
                        name="capacity"
                        label="Capacity"
                        mandate={true}
                        keyboardType="numeric"
                      />
                      {/* <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Table Design<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <View style={styles.pickerView}>
                          <ModalDropDown style={styles.dropdonwImg} />
                          <ModalSelector
                            data={tableDesignData}
                            childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                            selectStyle={styles.selectText}
                            optionContainerStyle={styles.selectCont}
                            optionTextStyle={styles.textStyle}
                            initValueTextStyle={styles.textStyle}
                            overlayStyle={styles.overlayText}
                            cancelStyle={styles.selectCont}
                            cancelContainerStyle={styles.cancelCont}
                            cancelText={"Cancel"}
                            initValue="Select Table Design"
                            selectedKey={tableDesignKey}
                            onChange={(option) => {
                              if (option.key) {
                                setFieldValue('tableDesign', option.value)
                                setTableDesignKey(option.key)
                                setTableDesign(option.label)
                              }
                            }}
                          />
                        </View>
                        {touched.tableDesign && errors.tableDesign &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Table Design is Required</Text>
                        }
                      </View> */}
                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Table Design<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <View style={styles.pickerView}>
                          <ModalDropDown style={styles.dropdonwImg} />
                          <ModalSelector
                            data={tableDesignData}
                            childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                            selectStyle={styles.selectText}
                            optionContainerStyle={styles.selectCont}
                            optionTextStyle={styles.textStyle}
                            initValueTextStyle={styles.textStyle}
                            overlayStyle={styles.overlayText}
                            cancelStyle={styles.selectCont}
                            cancelContainerStyle={styles.cancelCont}
                            cancelText={"Cancel"}
                            initValue="Select Table Design"
                            selectedKey={tableDesignKey}
                            onChange={(option) => {
                              if (option.key) {
                                setFieldValue('tableDesign', option.value)
                                setTableDesignKey(option.key)
                                setTableDesign(option.label)
                              }
                            }}
                          />
                        </View>
                        {touched.tableDesign && errors.tableDesign && (
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Table Design is required</Text>
                        )}
                      </View>

                    </View>

                    <View style={[styles.popuprow]}>
                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Select Outlet<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <View style={styles.pickerView}>
                          <ModalDropDown style={styles.dropdonwImg} />
                          <ModalSelector
                            data={outletDataArray.sort(function (a, b) {
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
                            initValue="Select Outlet"
                            selectedKey={outletKey}
                            onChange={(option) => {
                              if (option.key) {
                                setFieldValue('outlet', option.value)
                                setSelectedOutletId(option.value)
                                setOutletKey(option.key)
                              }
                            }}
                          />
                        </View>

                        {touched.outlet && errors.outlet &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Outlet Name is required</Text>

                        }
                      </View>
                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Section<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <View style={styles.pickerView}>
                          <ModalDropDown style={styles.dropdonwImg} />
                          <ModalSelector
                            data={sectionDataArray}
                            childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                            selectStyle={styles.selectText}
                            optionContainerStyle={styles.selectCont}
                            optionTextStyle={styles.textStyle}
                            initValueTextStyle={styles.textStyle}
                            overlayStyle={styles.overlayText}
                            cancelStyle={styles.selectCont}
                            cancelContainerStyle={styles.cancelCont}
                            cancelText={"Cancel"}
                            initValue="Select Section"
                            selectedKey={tableTypeKey}
                            onChange={(option) => {
                              if (option.key) {
                                setFieldValue('tableType', option.value)
                                setTableTypeKey(option.key)
                              }
                            }}
                          />
                        </View>

                        {touched.tableType && errors.tableType &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Section is required</Text>
                        }
                      </View>
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

  //Update Table Details Popup
  const popupEditTableDetails = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>

          <View>
            <View style={styles.popupHeadWrap}>
              <Text style={styles.textStyle3}>
                Edit Table Details
              </Text>
              <Pressable style={styles.closeView} onPress={() => toggleEdit()}>
                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                <Text style={styles.closeText}>
                  Close
                </Text>
              </Pressable>
            </View>

            <Formik
              validationSchema={addTableDetailsValidationSchema}
              initialValues={{
                tableNo: editData.tableNo,
                pilot: editData.pilot,
                capacity: JSON.stringify(editData.capacity),
                tableType: editData.tableType,
                outlet: editData.outletName,
                tableDesign: editData.tableDesign
              }}
              onSubmit={values => updateTableDetails(values)}
            >
              {({ handleSubmit, handleChange, isValid, values, setFieldValue, touched, errors }) => (
                <View>
                  <View style={[styles.popuprow]}>
                    <Field
                      component={CustomInput}
                      name="tableNo"
                      label="Table No"
                      mandate={true}
                      keyboardType="numeric"


                    />
                    <Field
                      component={CustomInput}
                      name="pilot"
                      label="Pilot"
                      mandate={true}
                    />
                  </View>
                  <View style={styles.flxDirow}>
                    <Field
                      component={CustomInput}
                      name="capacity"
                      label="Capacity"
                      keyboardType="numeric"
                      mandate={true}
                      onChangeText={(text:any) => handleChangeText(text)}
                    />
                    <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                      <Text style={[styles.signLabel, styles.textDefault]}>Table Design<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                      <View style={styles.pickerView}>
                        <ModalDropDown style={styles.dropdonwImg} />
                        <ModalSelector
                          data={tableDesignData}
                          childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                          selectStyle={styles.selectText}
                          optionContainerStyle={styles.selectCont}
                          optionTextStyle={styles.textStyle}
                          initValueTextStyle={styles.textStyle}
                          overlayStyle={styles.overlayText}
                          cancelStyle={styles.selectCont}
                          cancelContainerStyle={styles.cancelCont}
                          cancelText={"Cancel"}
                          initValue={values.tableDesign}
                          selectedKey={tableDesignKey}
                          onChange={(option) => {
                            if (option.key) {
                              setFieldValue('tableDesign', option.value)
                              setTableDesignKey(option.key)
                            }
                          }}
                        />
                      </View>
                      {touched.tableDesign && errors.tableDesign &&
                        <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Table Design is required</Text>
                      }
                    </View>
                  </View>
                  <View style={[styles.popuprow]}>

                    <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                      <Text style={[styles.signLabel, styles.textDefault]}>Select Outlet<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                      <View style={styles.pickerView}>
                        <ModalDropDown style={styles.dropdonwImg} />
                        <ModalSelector
                          data={outletDataArray.sort(function (a, b) {
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
                          initValue={values.outlet}
                          selectedKey={outletKey}
                          onChange={(option) => {
                            if (option.key) {
                              setFieldValue('outlet', option.value)
                              setOutletKey(option.key)
                            }
                          }}
                        />
                      </View>
                      {touched.outlet && errors.outlet &&
                        <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Outlet Name is </Text>
                      }
                    </View>
                    <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                      <Text style={[styles.signLabel, styles.textDefault]}>Section<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                      <View style={styles.pickerView}>
                        <ModalDropDown style={styles.dropdonwImg} />
                        <ModalSelector
                          data={sectionDataArray}
                          childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                          selectStyle={styles.selectText}
                          optionContainerStyle={styles.selectCont}
                          optionTextStyle={styles.textStyle}
                          initValueTextStyle={styles.textStyle}
                          overlayStyle={styles.overlayText}
                          cancelStyle={styles.selectCont}
                          cancelContainerStyle={styles.cancelCont}
                          cancelText={"Cancel"}
                          initValue={values.tableType}
                          selectedKey={tableTypeKey}
                          onChange={(option) => {
                            if (option.key) {
                              setFieldValue('tableType', option.value)
                              setTableTypeKey(option.key)
                            }
                          }}
                        />

                      </View>
                      {touched.tableType && errors.tableType &&
                        <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Section is required</Text>

                      }
                    </View>
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
      </KeyboardAwareScrollView>
    );
  }

  //----------------------------------- User Interface -----------------------------------------------------
  return (
    <>
      <Header heading={"Tbale Details"} />
      <ScrollView style={styles.categoryBlkCon}>
        <View style={[styles.textcontainer1, styles.catSubBlk]}>
          <Text style={styles.textStyle1}>
            Table Details
          </Text>
          <TouchableOpacity onPress={() => openAddTableDetails()}>
            <View style={styles.textcontainer2}>
              <Text style={styles.textStyle2}>
                Add Table Details
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
                  source={(require('../../assets/images/clipboard.png'))}
                />
                <View>
                  <Text style={styles.recordDisplay}>There are no Table details to display.</Text>
                </View>

                <View style={styles.noRecordItem}>
                  <Text style={styles.addText} onPress={() => openAddTableDetails()}>
                    Add Table Details
                  </Text>
                  <Text style={styles.recordDisplay}>
                    to continue.
                  </Text>
                </View>
              </View>
              // no record HTML Ends 
              :
              <TableViewTableDetails data={data} sendEditData={sendDataToParent} updateDelete={() => getTableDetailsList()} />
            }
          </View>
          {openTableDetails &&
            <Modal isVisible={openTableDetails}>
              {popupAddTableDetails()}
            </Modal>
          }

          {editTableDetails &&
            <Modal isVisible={editTableDetails}>
              {popupEditTableDetails()}
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
      </ScrollView>
    </>
  );

}