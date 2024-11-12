import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import * as yup from 'yup';
import styles from '../../assets/css/style';
import InternetDownIcon from '../../assets/images/internet_down.js';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Header from '../../components/sideMenuHeaderMaster';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import TableView from './ViewItemStatus';



export default function ItemStatus({ navigation, route }: { navigation: any, route: any }) {
  const [isDataPresent, setDataPreset] = useState(false);
  const [openItemStatus, setOpenItemStatus] = useState(false);
  const [data, setTableData] = useState([]);
  const [editItemStatus, setEditItemStatus] = useState(false);
  const [editItemStatusData, setEditItemStatusData] = useState(null);
  const isFocused = useIsFocused();
  const [openSuccessMsg, setopenSuccessMsg] = useState(false);
  const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false);
  const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);


  //Validation check for Item status 
  const addItemStatusValidationSchema = yup.object().shape({
    itemStatusName: yup
      .string()
      .required('Item Status name is required'),
    itemStatusCode: yup
      .string()
      .required('Item Status code is required'),
    description: yup
      .string()
      .required('Description is required'),
  })
  //close Item status add and edit popup
  const toggleModal = () => {
    setOpenItemStatus(!openItemStatus)
  };
  //open add itemstatus popup
  const openAddItemStatus = () => {
    setOpenItemStatus(true)
  }
  //send itemstatus editdata 
  const sendDataToParent = (data) => {
    setEditItemStatusData(data)
    setEditItemStatus(true)
  };
  //open edit popup
  const toggleEdit = () => {
    setEditItemStatus(!editItemStatus)
  };

  //Get Itemstatus List
  useEffect(() => {
    getItemStatusList();
    return () => {
      setTableData([]);
    }
  }, [isFocused]);
  const getItemStatusList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const result = await api.getAllMasterData(token, endPoint.GET_ITEMSTATUS + outletId);
    if (result.data.length === 0) {
      setDataPreset(false);
    } else {
      setTableData(result.data);
      setDataPreset(true);
    }
  }
  //Create Item status
  const handleSubmit = async (data) => {

    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    var myJson = {
      itemStatusName: data.itemStatusName,
      itemStatusCode: data.itemStatusCode,
      description: data.description,
      outletId: outletId,
    }
    const result = await api.CreateMasterData(endPoint.CREATE_ITEMSTATUS, token, myJson);
    if (JSON.stringify(result.data) === null) {
      successInternetdownOpen()
    } else {
      getItemStatusList();
      successOpen()
      setOpenItemStatus(false)
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
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Item Status Created Successfully</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => successOpen()}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - Ends
    );
  }

  //Update Item status
  const updateItemStatus = async (data) => {

    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    var myJson = {
      itemStatusId: editItemStatusData.itemStatusId,
      itemStatusName: data.itemStatusName,
      itemStatusCode: data.itemStatusCode,
      description: data.description,
      outletId: outletId
    }
    const result = await api.UpdateMasterData(endPoint.EDIT_ITEMSTATUS + editItemStatusData.itemStatusId, token, myJson);
    if (JSON.stringify(result.data) === null) {
      successInternetdownOpen()
    } else {
      successOpenUpdate()
      setEditItemStatus(false)
      getItemStatusList();
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
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Item Status Updated Successfully</Text>
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


  //-------------------------------Item Status Edit  PopUp------------------------------------------------------

  const popupAddItemStatus = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>

          <View>
            <View>
              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Add Item Status
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>
              <Formik
                validationSchema={addItemStatusValidationSchema}
                initialValues={{
                  itemStatusName: '',
                  itemStatusCode: '',
                  description: '',
                }}
                onSubmit={values => handleSubmit(values)}
              >
                {({ handleSubmit, handleChange, isValid, values }) => (
                  <View>
                    <View style={[styles.popuprow]}>
                      <Field
                        component={CustomInput}
                        name="itemStatusName"
                        label="Item Status Name"
                        mandate={true}

                      />
                      <Field
                        component={CustomInput}
                        name="itemStatusCode"
                        label="Item Status Code"
                        mandate={true}
                      />
                    </View>
                    <View style={[styles.popuprow]}>
                      <Field
                        component={CustomInput}
                        name="description"
                        label="Description"
                        mandate={false}
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

  //-------------------------------Item Status Edit  PopUp--------------------------------------------------------

  const popupEditItemStatus = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>

          <View>
            <View>

              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Edit Item Status
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleEdit()}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>

              <Formik
                initialValues={{
                  itemStatusName: editItemStatusData.itemStatusName,
                  itemStatusCode: editItemStatusData.itemStatusCode,
                  description: editItemStatusData.description,
                }}
                onSubmit={values => updateItemStatus(values)}
              >
                {({ handleSubmit, handleChange, isValid, values }) => (
                  <View>
                    <View style={[styles.popuprow]}>
                      <Field
                        component={CustomInput}
                        name="itemStatusName"
                        label="Item Status Name"
                        mandate={true}

                      />

                      <Field
                        component={CustomInput}
                        name="itemStatusCode"
                        label="Item Status Code"
                        mandate={true}
                      />
                    </View>
                    <View style={[styles.popuprow]}>
                      <Field
                        component={CustomInput}
                        name="description"
                        label="Description"
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

  //-------------------------------------User Interface----------------------------------------------------------

  return (
    <>
      <Header heading={"Item Status"} />

      <ScrollView style={styles.categoryBlkCon}>
        <View style={[styles.textcontainer1, styles.catSubBlk]}>
          <Text style={styles.textStyle1}>
            Item Status
          </Text>
          <View>
          </View>

          <TouchableOpacity onPress={() => openAddItemStatus()}>
            <View style={styles.textcontainer2}>
              <Text style={styles.textStyle2}>
                Add Item Status
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
                  <Text style={styles.recordDisplay}>There are no Item Status to display.</Text>
                </View>

                <View style={styles.noRecordItem}>
                  <Text style={styles.addText} onPress={() => openAddItemStatus()}>
                    Add Item Status
                  </Text>
                  <Text style={styles.recordDisplay}>
                    to continue.
                  </Text>
                </View>
              </View>
              :
              <TableView data={data} sendEditData={sendDataToParent} updateDelete={() => getItemStatusList()} />
              // no record HTML Ends
            }
          </View>

          {openItemStatus &&
            <Modal isVisible={openItemStatus}>
              {popupAddItemStatus()}
            </Modal>
          }

          {editItemStatus &&
            <Modal isVisible={editItemStatus}>
              {popupEditItemStatus()}
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

