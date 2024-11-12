import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import * as yup from 'yup';
import styles from '../../assets/css/style';
import InternetDownIcon from '../../assets/images/internet_down.js';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Header from '../../components/sideMenuHeaderMaster';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import Colors from '../constants/colors';
import TableView from './ViewTax';
import Toast from 'react-native-root-toast';
import { Platform } from 'react-native';



export default function Tax({ navigation, route }: { navigation: any, route: any }) {
  const [data, setTaxData] = useState([]);
  const [isDataPresent, setDataPreset] = useState(false);
  const [editTax, setEditTax] = useState(false);
  const [openTax, setOpenTax] = useState(false);
  const [openTaxSetup, setOpenTaxSetup] = useState(false)
  const [outKey, setOutKey] = useState(0);
  const [outPercentage, setOutPercentage] = useState(0);
  const [isSelected1, setSelection1] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [editTaxData, setEditTaxData] = useState(null);
  const [checked, setChecked] = React.useState(true);
  const [taxPercentage, setTaxPercentage] = useState([])
  const [taxPercentagesprice, setTaxPercentageprice] = useState([])
  const [outletData, setOutletData] = useState([]);
  const isFocused = useIsFocused();
  const [percentError, setPercentError] = useState({ value: '', error: '' })
  const [openSuccessMsg, setopenSuccessMsg] = useState(false);
  const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false);
  const [openTaxSetupUpdateSuccessMsg, setopenTaxSetupUpdateSuccessMsg] = useState(false);
  const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
  const [taxsetUpId, setTaxsetUpId] = useState('')
  const [taxSetupData, setEdiTaxSetupData] = useState([])
  const [editTaxSetup, setEditTaxSetUp] = useState(false)
  const [taxId, setTaxId] = useState('')
  const taxRef: any = React.useRef();
  const [taxError, setTaxError] = useState(false)
  const [taxDataLength, settaxDataLength] = useState('')

  const [taxValues, setValues] = useState([{
    taxPercent: "",
    isDefault: true,
  }]);

  const [userRoleId, setuserRoleId] = useState('')
  const [outletId, setOutletId] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [outletName, setOutlet] = useState('');
  const [taxName, setTaxName] = useState('');
  const [taxNameError, setTaxNameError] = useState(false);


  //Get User Info
  useEffect(() => {
    setTimeout(() => getUserInfo(), 1000);
  }, [isFocused]);

  const getUserInfo = async () => {
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
  //Open Add Tax Popup
  const openAddTax = () => {
    setValues([{
      taxPercent: "",
      isDefault: true,
    }])
    setOpenTax(true)
    setTaxError(false)
  }
  //Close Add and Edit Tax
  const toggleModal = () => {
    setOpenTax(!openTax)
    setTaxNameError(false)
    setOpenTaxSetup(openTaxSetup)
    setTaxName("")

  };
  //Open Add Taxsetup Popup
  const togglemodal1 = () => {
    setOpenTaxSetup(!openTaxSetup)
    setOpenTax(openTax)


  }
  //Open Edit Tax Popup
  const toggleEdit = () => {
    setEditTax(!editTax)
  };
  //Open Edit Taxsetup Popup
  const toggleEditTaxSetup = () => {
    setEditTaxSetUp(!editTaxSetup)
  };


  const addTaxValidationSchema = yup.object().shape({
    taxPercent: yup.array().of(
      yup.object()
        .shape({
          item: yup.string()
            .min(2, 'Too Short!')
            .max(255, 'Too Long!')
            .required('Required'),
        })
    ),

  });

  const addTaxSetUpValidationSchema = yup.object().shape({
    outletName: yup
      .string()
      .required('Tax name is required'),
    percentage: yup
      .string()
      .required('Tax Percent is required'),
  })
  //GET TAX API
  useEffect(() => {
    setTaxName("");
    getTaxList();
    return () => {
      setTaxData([]);
    }
  }, []); const getTaxList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    const result = await api.getAllMasterData(token, endPoint.GET_TAX + outletId);
    settaxDataLength(result.data.length)
    if (result.data.length === 0) {
      // Alert.alert("Some Error occured. Please try again.");
      setDataPreset(false);
    } else {
      setTaxData(result.data);
      setDataPreset(true);
    }
  }
  const percentageValidator = (percentage: string) => {
    if (!percentage) return "Percentage is required."
    return ''
  }


  //CREATE TAX API
  const handleSubmit = async (data) => {
    if (taxName.length > 0) {
      const jsonValue: any = await AsyncStorage.getItem('userInfo')
      let loginData = JSON.parse(jsonValue);
      let token = loginData.token;
      let outletId = loginData.outletId
      const SelectPercentageError = percentageValidator(percentError.value)
      if (percentError) {
        setPercentError({ ...percentError, error: SelectPercentageError })
      }
      var myJson = {
        taxName: taxName,
        taxPercent: taxValues,
        outletId: loginData.outletId,
      }
      const result = await api.CreateMasterData(endPoint.CREATE_TAX, token, myJson);
      if (JSON.stringify(result.data) === null) {
        Alert.alert("Some Error occured. Please try again.");
        setTaxName("")
      } else {

        const TaxId = await AsyncStorage.setItem('taxId', result.data.taxId)
        setTaxPercentageprice(result.data.taxPercent)
        setOpenTax(false)
        setOpenTaxSetup(true)
        setTaxName("")
      }
      setTaxNameError(false)
    } else {
      setTaxNameError(true)
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
          {/* <Image source={(require("../../assets/images/success_msg_popup.png"))} style={[styles.marBtm20, styles.sucImg]} /> */}
          <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Tax Created Successfully</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => successOpen()}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - Ends
    );
  }
  //CREATE TAX SET UP
  const submitTaxSetup = async (taxData) => {

    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    const restaurantId: any = await AsyncStorage.getItem('restaurantId')
    const taxId: any = await AsyncStorage.getItem('taxId')

    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    var myJson = {
      taxId: taxId,
      isItemIncludeTax: isSelected1,
      percentage: taxData.percentage,
      restaurantId: restaurantId,
      outletId: outletId,
      isSubtractFromSubTotal: isSelected2
    }
    const result = await api.CreateMasterData(endPoint.CREATE_TAXSETUP, token, myJson);
    if (taxDataLength >= '1') {
      successOpen()
      getTaxList();
      setOpenTax(false)
      setOpenTaxSetup(false)
    } else {
      // Toast.show('Tax Created Successfully', {
      //   duration: Toast.durations.LONG,
      // });
      setOpenTax(false)
      setOpenTaxSetup(false)
      navigation.navigate('MapAddingData')
    }
  }
  //UPDATE TAX API
  const updateTax = async () => {
    if (taxName != "" && taxValues[0]?.taxPercent != "") {
      const jsonValue: any = await AsyncStorage.getItem('userInfo')
      let loginData = JSON.parse(jsonValue);
      let token = loginData.token;
      let outletId = loginData.outletId;
      var myJson = {
        outletId: outletId,
        taxId: editTaxData.taxId,
        taxName: taxName,
        taxPercent: taxValues
      }
      const result = await api.UpdateMasterData(endPoint.EDIT_TAX + editTaxData.taxId, token, myJson);
      if (JSON.stringify(result.data) === null) {

        Toast.show("Some Error occured. Please try again.");
      } else {
        setEditTax(false)
        setEditTaxSetUp(false)
        successOpenUpdate()
        getTaxList();
        setTaxName("");
      }
    }
    else {
      taxperVal()
    }
  }
  //UPDATE TAX SET UP
  const updateTaxSetUp = async (data) => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    const restaurantId: any = await AsyncStorage.getItem('restaurantId')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    var myJson = {
      id: taxSetupData.id,
      isItemIncludeTax: isSelected1,
      percentage: taxSetupData.percentage,
      outletId: outletId,
      restaurantId: taxSetupData.restaurantId,
      isSubtractFromSubTotal: isSelected2,
      taxId: taxId

    }

    const result = await api.UpdateMasterData(endPoint.EDIT_TAXSETUP + taxSetupData.id, token, myJson);
    if (JSON.stringify(result.data) === null) {

      Alert.alert("Some Error occured. Please try again.");
    } else {
      successOpenTaxsetupUpdate()
      setEditTaxSetUp(false)
      getTaxList();

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
          {/* <Image source={(require("../../assets/images/success_msg_popup.png"))} style={[styles.marBtm20, styles.sucImg]} /> */}
          <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Tax Updated Successfully</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => successOpenUpdate()}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - Ends
    );
  }
  // Tax Setup Update Success msg  
  const successOpenTaxsetupUpdate = () => {
    setopenTaxSetupUpdateSuccessMsg(!openTaxSetupUpdateSuccessMsg)
  }
  const SuccessTaxSetupUpdatePopup = () => {
    return (
      // success popup
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>

          {/* <Image source={(require("../../assets/images/success_msg_popup.png"))} style={[styles.marBtm20, styles.sucImg]} /> */}
          <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Tax SetUp Updated Successfully</Text>

          <TouchableOpacity style={styles.continueBtn} onPress={() => successOpenTaxsetupUpdate()}>
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

  //validation check percentage
  const checkValidation = (value) => {
    const textPercent = [...percentError, value]
  }

  const sendDataToParent = (data) => { // the callback. Use a better name
    setEditTaxData(data)
    setValues(data.taxPercent)
    setEditTax(true)
    setTaxName(data.taxName)
  };
  const sendDataToTaxSetupParent = (data) => {
    // the callback. Use a better name
    setEdiTaxSetupData(data)
    setValues(data.taxPercent)
    setEditTaxSetUp(true)
    // const outletarray = outletDataArray.filter((item) => item.value = data.value)
    // setOutletKey(outletarray[0]?.key)  };
  }
  const sendTaxIdToParant = (data) => {
    setTaxId(data)
  }
  function createInputs() {
    return taxValues.map((el, i) =>
      <View style={[styles.marginBtm11, styles.wdth100]}>

        <View style={[styles.popuprow, styles.alignCenter]}>
          <View style={[styles.popupInputBlk, styles.wdth50]}>
            <TextInput style={styles.AddsignInput} error={!!percentError.error} errorText={percentError.error} ref={taxRef} keyboardType='numeric' defaultValue={JSON.stringify((el.taxPercent))} value={el.taxPercent} onChangeText={(text) => [handleInputChange(text, 'taxPercent', i),
            setPercentError({ value: text, error: '' })]} />
            {taxError && (
              <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>
                Tax Percentage is required
              </Text>
            )}

          </View>
          <View style={[styles.popupInputBlk, styles.wdth30, styles.paddRL15]}>
            <Text style={[styles.signLabel, styles.textDefault]}>Default</Text>

            <View style={styles.flexAlignRow}>
              <View style={[styles.flexAlignRow, styles.paddR15]}>
                <TouchableOpacity style={styles.flexAlignRow} onPress={() => handleInputChange(true, 'isDefault', i)}>
                  <View style={[styles.radioButton, el.isDefault === true && styles.radioBtnChecked]}>
                    {
                      (el.isDefault === true) ? <View style={styles.radioBtnView}></View> : null
                    }
                  </View>
                  <Text style={[styles.promoValue]}>Active</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.flexAlignRow, styles.paddR15]}>
                <TouchableOpacity style={styles.flexAlignRow} onPress={() => handleInputChange(false, 'isDefault', i)}>
                  <View style={[styles.radioButton, el.isDefault === false && styles.radioBtnChecked]}>
                    {
                      (el.isDefault === false) ? <View style={styles.radioBtnView}></View> : null
                    }
                  </View>
                  <Text style={[styles.promoValue]}>In Active</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
          <View style={[styles.wdth20, styles.justifyEnd, styles.flexrow]}>
            {/* <Pressable style={styles.removeTaxBtn} onPress={() => removeClick(i)}>
                <Text style={[styles.textDefault, { color: Colors.white }]}>remove</Text>
              </Pressable> */}
            <Pressable onPress={() => removeClick(i)} style={styles.editBtn}>
              <Image
                style={styles.DeleteIcon}
                source={(require('../../assets/images/trash_icon.png'))}
              />
            </Pressable>
          </View>
        </View>
        {/* {
             !isValid &&
             <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Please Enter The Percentage</Text>
           } */}
      </View>
    );
  }


  const handleInputChange = (e, name, index) => {

    const list = [...taxValues];
    list[index][name] = e;
    setTaxError(false)

    setValues(list);


  };
  const addClick = () => {
    setValues([...taxValues,
    {
      taxPercent: "",
      isDefault: true,
    }
    ]);

  }
  const removeClick = (data) => {
    let index = data;


    const list = [...taxValues];
    list.splice(index, 1);
    setValues(list);
  }


  function handleChange(data, index) {
    let vals = [...taxValues.val];
    vals[index] = data;
    setValues({ val: vals });
  }
  //Get Outlet by Restaurant
  useEffect(() => {
    getOutletList();
    return () => {
      +
        setOutletData([]);
    }
  }, [isFocused]);
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


  // let outletArray = outletData.map((s, i) => {
  //   return (
  //     <Picker.Item key={i} value={s.value} label={s.label} />
  //   )

  // })
  let outletDataArray = outletData.map((s, i) => {
    let newData = {
      key: i + 1,
      label: s.outletName,
      value: s.outletName
    }
    return newData;
  })

  let percentDataArray = taxPercentagesprice.map((k, v) => {
    let newData = {
      key: v + 1,
      label: k.taxPercent,
      value: k.taxPercent
    }
    return newData;
  })
  //Tax Percent Validation
  const taxperVal = () => {
    if(taxName === ""){
      setTaxNameError(true)
    }
    if (taxValues[0]?.taxPercent === "") {
      setTaxError(true);
      taxRef.current.focus()
      return false
    }
    else {
      taxValues
    }
  }
  const popupAddTax = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>

        <View style={styles.popupContainer}>
          <View>
            <View>
              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Add Tax
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>
              <Formik
                validationSchema={addTaxValidationSchema}
                initialValues={{
                  taxName: '',
                }}
                onSubmit={values => handleSubmit(values)}
              >
                {({ handleSubmit, handleChange, isValid, values }) => (
                  <View>
                    <View style={styles.flxDirow}>
                      {/* <Field
                        component={CustomInput}
                        name="taxName"
                        label="Tax Name"
                        mandate={true}
                      /> */}
                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Tax Name<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <TextInput
                          style={[styles.AddsignInput, styles.selectMainInput]}
                          placeholder="Tax Name"
                          value={taxName}
                          onChangeText={(text) => { setTaxName(text), setTaxNameError(false) }}
                        />
                        {taxNameError === true && (
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Tax Name is required</Text>
                        )}
                      </View>
                    </View>
                    <View style={[styles.martop32, styles.paddRL15]}>
                      <View style={[styles.receipeCon]}>
                        <Text style={[styles.font16, styles.textBlack, styles.receipeText, styles.taxPerWidth]}>Tax Percentage</Text>

                        {
                          createInputs()
                        }
                        <View style={[styles.flexrow, styles.justifyEnd]}>
                          <TouchableOpacity onPress={addClick} style={[styles.UpdateBtn, styles.greenbtn]}>
                            <Text style={styles.textWhite} onPress={addClick}>Add</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    {taxValues[0]?.taxPercent === "" ?
                      <View>
                        <TouchableOpacity onPress={() => { taxperVal() }}>
                          <View style={styles.popupBtnCon}>
                            <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={() => taxperVal()} />
                          </View>
                        </TouchableOpacity>
                      </View>
                      :
                      <TouchableOpacity onPress={handleSubmit}>
                        <View style={styles.popupBtnCon}>
                          <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={handleSubmit} />
                        </View>
                      </TouchableOpacity>

                    }
                    {/* <TouchableOpacity onPress={handleSubmit} style={styles.martop15}>
                        <View style={styles.popupBtnCon}>
                          <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={handleSubmit} />
                        </View>
                      </TouchableOpacity> */}
                  </View>

                )}
              </Formik>

            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

    );
  }
  //Add Tax Setup Popup
  const popupAddTaxSetUp = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>
          <View>
            <View>
              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Add Tax SetUp
                </Text>
                <Pressable style={styles.closeView} onPress={() => togglemodal1()}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>
              <Formik
                validationSchema={addTaxSetUpValidationSchema}
                initialValues={{
                  outletName: '',
                  isItemIncludeTax: '',
                  isSubtractFromSubTotal: '',
                  percentage: '',
                }}
                onSubmit={values => submitTaxSetup(values)}
              >
                {({ handleSubmit, handleChange, isValid, values, setFieldValue, touched, errors }) => (
                  <View>

                    <View style={[styles.flxDirow]}>
                      <View style={[styles.popupInputBlk, styles.checkBlkSetup]}>
                        {/* <Checkbox
                            checkvalue={isSelected1}
                            value={isSelected1}
                            style={styles.taxsetCheckbox}
                            status={isSelected1 ? 'checked' : 'unchecked'}
                            onPress={() => {
                              setSelection1(!isSelected1);
                            }}
                          /> */}
                        <TouchableOpacity style={styles.flexAlignRow} onPress={() => {
                          setSelection1(!isSelected1);
                        }}>
                          <View style={[styles.checkbox, isSelected1 && styles.radioBtnChecked]}>
                            {
                              (isSelected1) ? <View style={styles.checkTick}></View> : null
                            }
                          </View>
                          <Text style={styles.promoValue}>  Is Item Include Tax?</Text>

                        </TouchableOpacity>
                      </View>


                      <View style={[styles.popupInputBlk, styles.checkBlkSetup]}>
                        {/* <Checkbox
                            checkvalue={isSelected2}
                            value={isSelected2}
                            style={styles.taxsetCheckbox}
                            status={isSelected2 ? 'checked' : 'unchecked'}
                            onPress={() => {
                              setSelection2(!isSelected2);
                            }}
                          />
                          <Text style={styles.checkboxText}>
                            Subtract from Subtotal
                          </Text> */}
                        <TouchableOpacity style={styles.flexAlignRow} onPress={() => {
                          setSelection2(!isSelected2);
                        }}>
                          <View style={[styles.checkbox, isSelected2 && styles.radioBtnChecked]}>
                            {
                              (isSelected2) ? <View style={styles.checkTick}></View> : null
                            }
                          </View>
                          <Text style={styles.promoValue}> Subtract from Subtotal</Text>

                        </TouchableOpacity>
                      </View>
                      <View style={[styles.popupInputBlk, styles.width100, styles.paddRL15]}>
                        <Text style={styles.modifierName}>
                          Please Select Outlets to visible the item
                        </Text>
                      </View>
                    </View>

                    <View style={styles.flxDirow}>
                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Outlet Name <Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <View style={styles.pickerView}>

                          <ModalSelector
                            data={outletDataArray.sort(function (a, b) {
                              return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0
                            })} initValue={"Select Outlet Name"}
                            childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                            selectStyle={styles.selectText}
                            optionContainerStyle={styles.selectCont}
                            optionTextStyle={styles.textStyle}
                            overlayStyle={styles.overlayText}
                            cancelStyle={styles.selectCont}
                            cancelContainerStyle={styles.cancelCont}
                            cancelText={"Cancel"}
                            selectedKey={outKey}
                            onChange={(option) => {
                              if (option.key) {
                                setFieldValue('outletName', option.value)
                                setOutKey(option.key)
                              }
                            }}
                          />
                        </View>

                        {touched.outletName && errors.outletName &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Outlet Name is required</Text>

                        }
                      </View>
                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Select Percentage <Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <View style={styles.pickerView}>
                          <ModalSelector
                            data={percentDataArray}
                            childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                            selectStyle={styles.selectText}
                            optionContainerStyle={styles.selectCont}
                            optionTextStyle={styles.textStyle}
                            initValueTextStyle={styles.textStyle}
                            overlayStyle={styles.overlayText}
                            cancelStyle={styles.selectCont}
                            cancelContainerStyle={styles.cancelCont}
                            cancelText={"Cancel"}
                            initValue={"Select Percentage"}
                            selectedKey={outPercentage}
                            onChange={(option) => {
                              if (option.key) {
                                setFieldValue('percentage', option.value)
                                setOutPercentage(option.key)
                              }
                            }}
                          />
                        </View>
                        {touched.percentage && errors.percentage &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Percentage is required</Text>
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

  const popupEditTax = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>
          <View>
            <View>

              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Edit Tax
                </Text>
                <Pressable style={styles.closeView} onPress={() => { toggleEdit(), setTaxName("") }}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>
              <Formik
                validationSchema={addTaxValidationSchema}
                initialValues={{

                  taxName: editTaxData.taxName,

                  taxPercent: [
                    {
                      taxPercent: "",
                      isDefault: ""
                    }
                  ],

                }}
                onSubmit={values => updateTax(values)}
              >
                {({ handleSubmit, handleChange, isValid, values }) => (
                  <View >
                    <View style={styles.flxDirow}>
                      {/* <Field
                        component={CustomInput}
                        name="taxName"
                        label="Tax Name"
                        mandate={true}
                      /> */}
                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Tax Name<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <TextInput
                          style={[styles.AddsignInput, styles.selectMainInput]}
                          placeholder="Tax Name"
                          value={taxName}
                          onChangeText={(text) => { setTaxName(text), setTaxNameError(false) }}
                        />
                        {taxNameError === true && (
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Tax Name is required</Text>
                        )}
                      </View>
                    </View>

                    <View style={styles.popupInputBlk}>
                      <View style={[styles.martop32, styles.paddRL15]}>
                        <View style={[styles.receipeCon]}>
                          <Text style={[styles.font16, styles.textBlack, styles.receipeText, styles.taxPerWidth]}>Tax Percentage</Text>

                          {
                            createInputs()
                          }
                          <View style={[styles.flexrow, styles.justifyEnd]}>
                            <TouchableOpacity onPress={addClick} style={[styles.UpdateBtn, styles.greenbtn]}>
                              <Text style={styles.textWhite} onPress={addClick}>Add</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>

                    <TouchableOpacity onPress={() => updateTax()}>
                      <View style={styles.popupBtnCon}>
                        <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={() => updateTax()} />
                      </View>
                    </TouchableOpacity>
                    {/* {taxValues[0]?.taxPercent === "" ?
                      <View>
                        <TouchableOpacity onPress={() => { taxperVal() }}>
                          <View style={styles.popupBtnCon}>
                            <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={() => taxperVal()} />
                          </View>
                        </TouchableOpacity>
                      </View>
                      :
                      <TouchableOpacity onPress={handleSubmit}>
                        <View style={styles.popupBtnCon}>
                          <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={updateTax()} />
                        </View>
                      </TouchableOpacity>

                    } */}

                  </View>
                )}
              </Formik>

            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

    );
  }

  //Update Tax Setup Popup
  const popupEditTaxSetup = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>
          <View>
            <View>
              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Edit Tax SetUp
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleEditTaxSetup()}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>
              <Formik
                validationSchema={addTaxSetUpValidationSchema}
                initialValues={{
                  outletName: taxSetupData.outletName,
                  isItemIncludeTax: taxSetupData.isItemIncludeTax,
                  isSubtractFromSubTotal: taxSetupData.isSubtractFromSubTotal,
                  percentage: (taxSetupData.percentage),
                }}
                onSubmit={values => updateTaxSetUp(values)}
              >
                {({ handleSubmit, handleChange, isValid, values, setFieldValue, touched, errors }) => (
                  <View>

                    <View style={[styles.flxDirow]}>
                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <TouchableOpacity style={styles.flexAlignRow} onPress={() => {
                          setSelection1(!isSelected1);
                        }}>
                          <View style={[styles.checkbox, isSelected1 && styles.radioBtnChecked]}>
                            {
                              (isSelected1) ? <View style={styles.checkTick}></View> : null
                            }
                          </View>
                          <Text style={styles.promoValue}> Is Item Include Tax?</Text>

                        </TouchableOpacity>
                      </View>


                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <TouchableOpacity style={styles.flexAlignRow} onPress={() => {
                          setSelection2(!isSelected2);
                        }}>
                          <View style={[styles.checkbox, isSelected2 && styles.radioBtnChecked]}>
                            {
                              (isSelected2) ? <View style={styles.checkTick}></View> : null
                            }
                          </View>
                          <Text style={styles.promoValue}> Subtract from Subtotal</Text>

                        </TouchableOpacity>
                      </View>
                      <View style={[styles.popupInputBlk, styles.width100, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>
                          Please Select Outlets to visible the item
                        </Text>
                      </View>
                    </View>

                    <View style={styles.flxDirow}>
                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Select Outlet<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <View style={styles.pickerView}>

                          <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
                          <ModalSelector
                            data={outletDataArray}
                            childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                            selectStyle={styles.selectText}
                            optionContainerStyle={styles.selectCont}
                            optionTextStyle={styles.textStyle}
                            initValueTextStyle={styles.textStyle}
                            overlayStyle={styles.overlayText}
                            cancelStyle={styles.selectCont}
                            cancelContainerStyle={styles.cancelCont}
                            cancelText={"Cancel"}
                            initValue={values.outletName}
                            selectedKey={outKey}
                            onChange={(option) => {
                              if (option.key) {
                                setFieldValue('outletName', option.value)
                                setOutKey(option.key)
                              }
                            }}
                          />

                        </View>

                        {touched.outletName && errors.outletName &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Please select Outlet</Text>

                        }
                      </View>

                      <Field
                        component={CustomInput}
                        name="percentage"
                        label="Percentage"
                        mandate={true}
                        editable={false}
                      />
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

  return (

    <>
      <Header heading={"Tax"} />

      <View style={styles.categoryBlkCon}>
        <View style={[styles.textcontainer1, styles.catSubBlk]}>
          <Text style={styles.textStyle1}>
            Tax
          </Text>
          <TouchableOpacity onPress={() => openAddTax()}>
            <View style={styles.textcontainer2}>
              <Text style={styles.textStyle2}>
                Add Tax
              </Text>
            </View>
          </TouchableOpacity>

        </View>

        <ScrollView>
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
                  <Text style={styles.recordDisplay}>There are no Tax to display.</Text>
                </View>

                <View style={styles.noRecordItem}>
                  <Text style={styles.addText} onPress={() => openAddTax()}>
                    Add Tax
                  </Text>
                  <Text style={styles.recordDisplay}>
                    to continue.
                  </Text>
                </View>
              </View>
              :
              <TableView data={data} sendEditTaxsetUpData={sendDataToTaxSetupParent} sendTaxId={sendTaxIdToParant} sendEditData={sendDataToParent} updateDelete={() => getTaxList()} />
              // no record HTML Ends
            }
          </View>

          {openTax &&
            <Modal isVisible={openTax}>
              {popupAddTax()}
            </Modal>
          }
          {openTaxSetup &&
            <Modal isVisible={openTaxSetup}>
              {popupAddTaxSetUp()}
            </Modal>
          }

          {editTax &&
            <Modal isVisible={editTax}>
              {popupEditTax()}
            </Modal>
          }
          {editTaxSetup &&
            <Modal isVisible={editTaxSetup}>
              {popupEditTaxSetup()}
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
          {openTaxSetupUpdateSuccessMsg &&
            <Modal isVisible={openTaxSetupUpdateSuccessMsg}>
              {SuccessTaxSetupUpdatePopup()}
            </Modal>
          }
          {openInternetdownMsg &&
            <Modal isVisible={openInternetdownMsg}>
              {internetDownPop()}
            </Modal>
          }
        </ScrollView>
      </View>

    </>


  );
}