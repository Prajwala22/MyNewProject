import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import Toast from 'react-native-root-toast';
import * as yup from 'yup';
import styles from '../../assets/css/style';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Header from '../../components/SidemeuItemsScreenHeader';
import TableView from '../../components/TaxSetUp';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import Colors from '../constants/colors';



export default function Discount({ navigation, route }: { navigation: any, route: any }) {
  const [data, setTableData] = useState([]);
  const [isDataPresent, setDataPreset] = useState(false);
  const [editTaxSetUp, setEditTaxSetUp] = useState(false);
  const [openTaxSetUp, setOpenTaxSetUp] = useState(false);
  const [editTaxSetUpData, setEditTaxSetUpData] = useState(null);
  const [isSelected1, setSelection1] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [outKey, setOutKey] = useState(0);
  const [outletData, setOutletData] = useState([]);
  const isFocused = useIsFocused();




  const openAddTaxSetUp = () => {
    setOpenTaxSetUp(true)
  }
  const toggleModal = () => {
    setOpenTaxSetUp(!openTaxSetUp)
  };
  const toggleEdit = () => {
    setEditTaxSetUp(!editTaxSetUp)
  };
  const addTaxSetUpValidationSchema = yup.object().shape({

    outletName: yup
      .string()
      .required('Tax name is required'),
    percentage: yup
      .string()
      .required('Tax Percent is required'),

  })
  const sendDataToParent = (data) => { // the callback. Use a better name

    setEditTaxSetUpData(data)
    setEditTaxSetUp(true)
  };

  //GET TAX SET UP
  useEffect(() => {

    getTaxSetUpList();
    return () => {
      setTableData([]);
    }
  }, []);
  const getTaxSetUpList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    const result = await api.getAllMasterData(token, endPoint.GET_TAXSETUP + outletId);
    if (result.data.length === 0) {
      Alert.alert("Some Error occured. Please try again.");
      setDataPreset(false);
    } else {
      setTableData(result.data);
      setDataPreset(true);
    }
  }
  //CREATE TAX SET UP
  const handleSubmit = async (data) => {

    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    const restaurantId: any = await AsyncStorage.getItem('restaurantId')

    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    var myJson = {
      isItemIncludeTax: isSelected1,
      percentage: data.percentage,
      restaurantId: restaurantId,
      outletId: outletId,
      isSubtractFromSubTotal: isSelected2
    }
    const result = await api.CreateMasterData(endPoint.CREATE_TAXSETUP, token, myJson);
    if (result.data.length === 0) {
      Toast.show("Some Error occured. Please try again.");
    } else {
      getTaxSetUpList();
      // Add a Toast on screen.
      Toast.show('Tax Set Up Created successfully', {
        duration: Toast.durations.LONG,
      });

      setOpenTaxSetUp(false)

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
      id: editTaxSetUpData.id,
      isItemIncludeTax: isSelected1,
      percentage: data.percentage,
      outletId: outletId,
      restaurantId: restaurantId,
      isSubtractFromSubTotal: isSelected2

    }
    const result = await api.UpdateMasterData(endPoint.EDIT_TAXSETUP + editTaxSetUpData.id, token, myJson);
    if (JSON.stringify(result.data) === null) {

      Alert.alert("Some Error occured. Please try again.");
    } else {
      // Add a Toast on screen.
      Toast.show('Tax Set Up Updated successfully', {
        duration: Toast.durations.LONG,
      });
      setEditTaxSetUp(false)
      getTaxSetUpList();

    }

  }

  //Get Outlet by Restaurant
  useEffect(() => {

    getOutletList();
    return () => {
      +
        setTableData([]);
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


  let outletDataArray = outletData.map((s, i) => {

    let newData = {
      key: i,
      label: s.outletName,
      value: s.outletName
    }
    return newData;
  })




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
                <Pressable style={styles.closeView} onPress={() => toggleModal()}>
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
                onSubmit={values => handleSubmit(values)}
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
                        <Text style={[styles.signLabel, styles.textDefault]}>Outlet Name <Text style={[styles.font12, styles.textPri]}>*</Text></Text>
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
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Outlet Name is required</Text>

                        }
                      </View>

                      <Field
                        component={CustomInput}
                        name="percentage"
                        label="Percentage"
                        mandate={true}
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
                <Pressable style={styles.closeView} onPress={() => toggleEdit()}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>
              <Formik
                validationSchema={addTaxSetUpValidationSchema}
                initialValues={{
                  outletName: editTaxSetUpData.outletName,
                  isItemIncludeTax: editTaxSetUpData.isItemIncludeTax,
                  isSubtractFromSubTotal: editTaxSetUpData.isSubtractFromSubTotal,
                  percentage: (editTaxSetUpData.percentage),
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
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Outlet Name is required</Text>
                        }
                      </View>

                      <Field
                        component={CustomInput}
                        name="percentage"
                        label="Percentage"
                        mandate={true}
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

  // ---------------------------------- User Interface -----------------------------------------------------------------

  return (
    <>
      <Header heading={"TaxSetUp"} />

      <View style={styles.categoryBlkCon}>
        <View style={[styles.textcontainer1, styles.catSubBlk]}>
          <Text style={styles.textStyle1}>
            Tax SetUp
          </Text>

          <TouchableOpacity onPress={() => openAddTaxSetUp()}>
            <View style={styles.textcontainer2}>
              <Text style={styles.textStyle2}>
                Add TaxSetUp
              </Text>
            </View>
          </TouchableOpacity>

        </View>

        <ScrollView>
          <View style={styles.table}>
            <TableView data={data} sendEditData={sendDataToParent} updateDelete={() => getTaxSetUpList()} />
            {!isDataPresent
              &&
              <View style={styles.noRecordFoundView}>
                <Image
                  style={styles.noRecordImage}
                  source={(require('../../assets/images/clipboard.png'))}
                />
                <View>
                  <Text style={styles.recordDisplay}>There are no Items to display.</Text>
                </View>

                <View style={styles.noRecordItem}>
                  <Text style={styles.addText} onPress={() => openAddTaxSetUp()}>
                    Add Tax SetUp
                  </Text>
                  <Text style={styles.recordDisplay}>
                    to continue.
                  </Text>
                </View>
              </View>
            }

          </View>

          {openTaxSetUp &&
            <Modal isVisible={openTaxSetUp}>
              {popupAddTaxSetUp()}
            </Modal>
          }

          {editTaxSetUp &&
            <Modal isVisible={editTaxSetUp}>
              {popupEditTaxSetup()}
            </Modal>
          }
        </ScrollView>
      </View>

    </>


  );
}