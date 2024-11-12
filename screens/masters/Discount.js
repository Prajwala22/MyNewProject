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
import CustomButton from '../../components/CustomButton.js';
import CustomInput from '../../components/CustomInput.js';
import TableView from './ViewDiscount.js';
import Header from '../../components/sideMenuHeaderMaster.js';
import { endPoint } from '../../services/api/apiConstant.js';
import api from '../../services/api/callingApi.js';
import Colors from '../constants/colors.js';
import { Platform } from 'react-native';


export default function Discount({ navigation, route }) {

  const [isDataPresent, setDataPreset] = useState(false);
  const [openDiscount, setOpenDiscount] = useState(false);
  const [editDiscount, setEditDiscount] = useState(false);
  const [editData, setEditData] = useState(null);
  const [discountData, setDiscountData] = useState([]);
  const discountId = "";
  const [data, setTableData] = useState([]);
  const [editDiscountData, setEditDiscountData] = useState(null);
  const [disKey, setDisKey] = useState(0);
  const isFocused = useIsFocused();
  const [openSuccessMsg, setopenSuccessMsg] = useState(false);
  const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false);
  const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
  const [discountLength, setDiscountLength] = useState(0)
  const [userRoleId, setuserRoleId] = useState('')
  const [outletId, setOutletId] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [outletName, setOutlet] = useState('');

  const [isCheck, setChecked] = React.useState(false);
  const [orderTypeChecked, setOrderTypeChecked] = useState([])
  const [orderTypeOutlet, setOrderTypeOutlet] = useState([])
  const [isCheckDineIn, setIsCheckDineIn] = useState(false);
  const [isCheckTakeAway, setIsCheckTakeAway] = useState(false);
  const [isCheckOnline, setIsCheckOnline] = useState(false);
  const [isCheckOnTotal, setIsCheckOnTotal] = useState(false);
  const [isCheckDineInUpdate, setIsCheckDineInUpdate] = useState(false)
  const [isCheckTakeAwayUpdate, setIsTakeAwayUpdate] = useState(false)
  const [isCheckOnlineUpdate, setIsCheckOnlineUpdate] = useState(false)
  const [isCheckOnTotalUpdate, setIsCheckOnTotalUpdate] = useState(false)



  //get user Info
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
  //Open add discount Popup
  const openAddDiscount = () => {
    setOpenDiscount(true)
  }
  //close add and edit popup 
  const toggleModal = () => {
    setOpenDiscount(!openDiscount)
    setIsCheckDineIn(false);
    setIsCheckTakeAway(false);
    setIsCheckOnline(false);
    setIsCheckOnTotal(false);
    setDisKey(0);
  };
  //edit discount popup
  const toggleEdit = () => {
    // getDiscount()
    setEditDiscount(!editDiscount)
  };

  //Check validation for discount
  const addDiscountValidationSchema = yup.object().shape({

    discountName: yup
      .string()
      .required('Discount Name is required'),
    discountType: yup
      .string()
      .required('Discount Type is required'),
    discountValue: yup
      .string()
    .required('Discount Value is required')
    .matches(/^[0-9]+$/, 'Discount Value must contain only numbers'),
    discoutNotes: yup
      .string()
      .required('Discount Notes is required'),

  })

  //--------------------------Get Discount List-------------------------------------------------  

  useEffect(() => {

    getDiscountList();
    return () => {
      setTableData([]);
    }
  }, [isFocused]);
  const getDiscountList = async () => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    const result = await api.getAllMasterData(token, endPoint.GET_DISCOUNT + outletId);
    setDiscountLength(result.data.length)
    if (result.data.length === 0) {
      setDataPreset(false);
    } else {
      setDiscountData(result.data);
      setTableData(result.data);
      setDataPreset(true);
    }
  }


  //------------------------ Get Discount List Ends---------------------------------------- 

  // -------------------------Create Discount List-----------------------------------------
  const handleSubmit = async (data) => {

    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    var myJson = {
      discountName: data?.discountName,
      discountType: data?.discountType,
      discountValue: data?.discountValue,
      outletId: outletId,
      discoutNotes: data?.discoutNotes,
      discountDineIn: isCheckDineIn,
      discountTakeAway: isCheckTakeAway,
      discountEOrder: isCheckOnline,
      discountOnTotal: isCheckOnTotal,
      discountStatus: true
    }
    const result = await api.CreateMasterData(endPoint.CREATE_DISCOUNT, token, myJson);
    if (discountLength >= 1) {
      getDiscountList();
      successOpen()
      setOpenDiscount(false)
    } else {
      tempGetDiscountList()
    }
    setDisKey(0);
    data.discountType = ""
  }
  //Temp Discount list
  const tempGetDiscountList = async () => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    const result = await api.getAllMasterData(token, endPoint.GET_DISCOUNT + outletId);
    console.log(result,"discountData")
    setDiscountLength(result.data.length)

    if (result.data === null) {
      getDiscountList()
      setOpenDiscount(false)

    }
    else {
      setOpenDiscount(false)
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
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Discount Created Successfully</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => successOpen()}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - Ends
    );
  }

  // -------------------------Create Discount List Ends-------------------------------------


  //-----------------------------Update Discount List----------------------------------------

  const updateDiscount = async (data) => {

    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    var myJson = {
      discountId: editDiscountData?.discountId,
      discountName: data?.discountName,
      discountType: data?.discountType,
      discountValue: data?.discountValue,
      discoutNotes: data?.discoutNotes,
      discountStatus: isCheck,
      discountDineIn: isCheckDineInUpdate,
      discountTakeAway: isCheckTakeAwayUpdate,
      discountEOrder: isCheckOnlineUpdate,
      discountOnTotal: isCheckOnTotalUpdate,
      outletId: outletId,
    }
    const result = await api.UpdateMasterData(endPoint.EDIT_DISCOUNT + editDiscountData?.discountId, token, myJson);
    if (JSON.stringify(result.data) === null) {

      successInternetdownOpen()
    } else {
      successOpenUpdate()
      setEditDiscount(false)
      getDiscountList();

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
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Discount Updated Successfully</Text>
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

  //-------------- Update Discount List Ends---------------------------------------------------------------------

  //discount type dropdown data  
  const discountDropData = [
    { key: 1, label: 'Percentage', value: 'Percentage' },
    { key: 2, label: 'Amount', value: 'Amount' },

  ]

  //send edit discount data
  const sendDataToParent = (data) => { // the callback. Use a better name
    const discountarray = discountDropData.filter((item) => item?.value == data?.discountType )
    setDisKey(discountarray[0]?.key)
    setIsCheckDineInUpdate(data?.discountDineIn)
    setIsTakeAwayUpdate(data?.discountTakeAway)
    setIsCheckOnlineUpdate(data?.discountEOrder)
    setIsCheckOnTotalUpdate(data?.discountOnTotal)
    setChecked(data?.discountStatus)

    setEditDiscountData(data)
    setEditDiscount(true)
  };
  //-------------------------------Discount Add PopUp----------------------------------------
  const popupAddDiscount = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>

          <View>
            <View>
              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Add Discount
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>
              <Formik
                validationSchema={addDiscountValidationSchema}
                initialValues={{
                  discountName: '',
                  discountType: '',
                  discountValue: '',
                  discoutNotes: '',
                }}
                onSubmit={values => handleSubmit(values)}
              >
                {({ handleSubmit, handleChange, isValid, values, setFieldValue, touched, errors }) => (
                  <View  >
                    <View style={styles.flxDirow}>
                      <Field
                        component={CustomInput}
                        name="discountName"
                        label="Discount Name"
                        mandate={true}

                      />
                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Discount Type<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <View style={styles.pickerView}>
                          <ModalDropDown style={styles.dropdonwImg} />
                          <ModalSelector
                            data={discountDropData.sort(function (a, b) {
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
                            initValue={"Select Discount Type"}
                            selectedKey={disKey}
                            onChange={(option) => {

                              if (option.key) {
                                setFieldValue('discountType', option.value)
                                setDisKey(option.key)
                              }


                            }}
                          />

                        </View>
                        {touched.discountType && errors.discountType &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Discount Type is required</Text>
                        }
                      </View>

                      <Field
                        component={CustomInput}
                        name="discountValue"
                        label="Discount Value"
                        mandate={true}
                        keyboardType="numeric"
                      />
                      <Field
                        component={CustomInput}
                        name="discoutNotes"
                        label="Discount Notes"
                        mandate={true}
                      />
                    </View>

                    <View style={[styles.flexAlignRow, styles.paddRL15, styles.marBtm8]}>

                      <View style={[styles.flexAlignRow, styles.paddR15]}>
                        <TouchableOpacity style={styles.flexAlignRow} onPress={() => { [setIsCheckDineIn(!isCheckDineIn)] }}>

                          <View style={[styles.checkbox, isCheckDineIn === true && styles.radioBtnChecked]}>
                            {
                              (isCheckDineIn === true) ? <View style={styles.checkTick}></View> : null
                            }
                          </View>
                          <Text style={[styles.promoValue]}>Dine In</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={[styles.flexAlignRow, styles.paddR15]}>
                        <TouchableOpacity style={styles.flexAlignRow} onPress={() => { [setIsCheckTakeAway(!isCheckTakeAway), setIsTakeAwayUpdate(editDiscountData?.discountTakeAway)] }}>
                          <View style={[styles.checkbox, isCheckTakeAway === true && styles.radioBtnChecked]}>
                            {
                              (isCheckTakeAway === true) ? <View style={styles.checkTick}></View> : null
                            }
                          </View>
                          <Text style={[styles.promoValue]}>take Away</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={[styles.flexAlignRow, styles.paddR15]}>
                        <TouchableOpacity style={styles.flexAlignRow} style={styles.flexAlignRow} onPress={() => { setIsCheckOnline(!isCheckOnline) }}>
                          <View style={[styles.checkbox, isCheckOnline === true && styles.radioBtnChecked]}>
                            {
                              (isCheckOnline === true) ? <View style={styles.checkTick}></View> : null
                            }
                          </View>
                          <Text style={[styles.promoValue]}>Online</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={[styles.flexAlignRow, styles.paddR15]}>
                        <TouchableOpacity style={styles.flexAlignRow} style={styles.flexAlignRow} onPress={() => { setIsCheckOnTotal(!isCheckOnTotal) }}>
                          <View style={[styles.checkbox, isCheckOnTotal === true && styles.radioBtnChecked]}>
                            {
                              (isCheckOnTotal === true) ? <View style={styles.checkTick}></View> : null
                            }
                          </View>
                          <Text style={[styles.promoValue]}>On Total</Text>
                        </TouchableOpacity>
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

  //-------------------------------Discount Edit  PopUp----------------------------------------

  const popupEditDiscount = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>

          <View>

            <View>

              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Edit Discount
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleEdit()}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>

              <Formik
                validationSchema={addDiscountValidationSchema}
                initialValues={{
                  discountName: editDiscountData?.discountName,
                  discountType: editDiscountData?.discountType,
                  discountValue: JSON.stringify(editDiscountData?.discountValue),
                  discoutNotes: editDiscountData?.discoutNotes,
                }}
                onSubmit={values => updateDiscount(values)}
              >
                {({ handleSubmit, handleChange, isValid, values, setFieldValue, touched, errors }) => (
                  <View  >
                    <View style={[styles.popuprow]}>
                      <Field
                        component={CustomInput}
                        name="discountName"
                        label="Discount Name"
                        mandate={true}
                      />
                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Discount Type<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <View style={styles.pickerView}>
                          <ModalDropDown style={styles.dropdonwImg} />
                          <ModalSelector
                            data={discountDropData.sort(function (a, b) {
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
                            initValue={"Select Discount Type"}
                            selectedKey={disKey}
                            onChange={(option) => {
                              if (option.key) {
                                setFieldValue('discountType', option.value)
                                setDisKey(option.key)
                              }
                            }}
                          />
                        </View>

                        {touched.discountType && errors.discountType &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Discount Type is required</Text>
                        }
                      </View>

                    </View>

                    <View style={[styles.popuprow]}>
                      <Field
                        component={CustomInput}
                        name="discountValue"
                        label="Discount Value"
                        mandate={true}
                        keyboardType="numeric"
                      />
                      <Field
                        component={CustomInput}
                        name="discoutNotes"
                        label="Discount Notes"
                        mandate={false}
                      />
                      <View style={[styles.flexAlignRow, styles.paddRL15, styles.marBtm8, styles.width50]}>

                        <View style={[styles.flexAlignRow, styles.paddR15]}>
                          <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setIsCheckDineInUpdate(!isCheckDineInUpdate) }}>

                            <View style={[styles.checkbox, (isCheckDineInUpdate === true) && styles.radioBtnChecked]}>
                              {
                                (isCheckDineInUpdate === true) ? <View style={styles.checkTick}></View> : null
                              }
                            </View>
                            <Text style={[styles.promoValue]}>Dine In</Text>
                          </TouchableOpacity>
                        </View>

                        <View style={[styles.flexAlignRow, styles.paddR15]}>
                          <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setIsTakeAwayUpdate(!isCheckTakeAwayUpdate) }}>
                            <View style={[styles.checkbox, (isCheckTakeAwayUpdate === true) && styles.radioBtnChecked]}>
                              {
                                (isCheckTakeAwayUpdate === true) ? <View style={styles.checkTick}></View> : null
                              }
                            </View>
                            <Text style={[styles.promoValue]}>take Away</Text>
                          </TouchableOpacity>
                        </View>

                        <View style={[styles.flexAlignRow, styles.paddR15]}>
                          <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setIsCheckOnlineUpdate(!isCheckOnlineUpdate) }}>
                            <View style={[styles.checkbox, (isCheckOnlineUpdate === true) && styles.radioBtnChecked]}>
                              {
                                (isCheckOnlineUpdate === true) ? <View style={styles.checkTick}></View> : null
                              }
                            </View>
                            <Text style={[styles.promoValue]}>Online</Text>
                          </TouchableOpacity>
                        </View>

                        <View style={[styles.flexAlignRow, styles.paddR15]}>
                          <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setIsCheckOnTotalUpdate(!isCheckOnTotalUpdate) }}>
                            <View style={[styles.checkbox, (isCheckOnTotalUpdate === true) && styles.radioBtnChecked]}>
                              {
                                (isCheckOnTotalUpdate === true) ? <View style={styles.checkTick}></View> : null
                              }
                            </View>
                            <Text style={[styles.promoValue]}>On Total</Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={[styles.flexAlignRow, styles.marBtm8, styles.paddRL15, styles.wdth50]}>

                        <View style={[styles.flexAlignRow, styles.paddR15]}>
                          <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setChecked(!isCheck) }}>
                            <View style={[styles.radioButton, (isCheck === true) && styles.radioBtnChecked]}>
                              {
                                (isCheck === true) ? <View style={styles.radioBtnView}></View> : null

                              }
                            </View>
                            <Text style={[styles.promoValue]}>Active</Text>
                          </TouchableOpacity>
                        </View>

                        <View style={[styles.flexAlignRow, styles.paddR15]}>
                          <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setChecked(!isCheck) }}>
                            <View style={[styles.radioButton, (isCheck === false) && styles.radioBtnChecked]}>
                              {
                                (isCheck === false) ? <View style={styles.radioBtnView}></View> : null

                              }
                            </View>
                            <Text style={[styles.promoValue]}>In Active</Text>
                          </TouchableOpacity>
                        </View>

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
  //-------------------------------------User Interface---------------------------------------

  return (
    <>
      <Header heading={"Discount"} />

      <ScrollView style={styles.categoryBlkCon}>
        <View style={[styles.textcontainer1, styles.catSubBlk]}>
          <Text style={styles.textStyle1}>
            Discount
          </Text>

          <TouchableOpacity onPress={() => openAddDiscount()}>
            <View style={styles.textcontainer2}>
              <Text style={styles.textStyle2}>
                Add Discount
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
                  <Text style={styles.recordDisplay}>There are no Discount to display.</Text>
                </View>

                <View style={styles.noRecordItem}>
                  <Text style={styles.addText} onPress={() => openAddDiscount()}>
                    Add Discount
                  </Text>
                  <Text style={styles.recordDisplay}>
                    to continue.
                  </Text>
                </View>
              </View>
              :
              <TableView data={data} sendEditData={sendDataToParent} updateDelete={() => getDiscountList()} />
              // no record HTML Ends
            }
          </View>

          {openDiscount &&
            <Modal isVisible={openDiscount}>
              {popupAddDiscount()}
            </Modal>
          }

          {editDiscount &&
            <Modal isVisible={editDiscount}>
              {popupEditDiscount()}
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