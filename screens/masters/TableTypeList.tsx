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
import TableView from './ViewTableType';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import { Platform } from 'react-native';



export default function TableTypeList({ navigation, route }: { navigation: any, route: any }) {
  const [tableTypeData, setTableTypeData] = useState([]);
  const [isDataPresent, setDataPreset] = useState(false);
  const [openTableType, setOpenTableType] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [editTableType, setEditTableType] = useState(false);
  const [data, setData] = useState([]);
  const [editTableData, setEditTableData] = useState(null);
  const optionsPerPage = [2, 3, 4];
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [tableTypeName, setTableTypeName] = useState({ value: '', error: '' });
  const [description, setDescription] = useState({ value: '', error: '' });
  const isFocused = useIsFocused();
  const [openSuccessMsg, setopenSuccessMsg] = useState(false);
  const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false);
  const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
  const [sectionDataLength, setSectionDataLength] = useState(0)
  const [userRoleId, setuserRoleId] = useState('')
  const [outletId, setOutletId] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [outletName, setOutlet] = useState('');

  //get User Info
  useEffect(() => {
    setTimeout(() => getUserinfo(), 1000);
  }, [isFocused]);

  const getUserinfo = async () => {
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


  //------------------------ Get the Table Type list-------------------------------------------------------------
  useEffect(() => {

    getTableTypeList();
    return () => {
      setData([]);
    }
  }, [isFocused]);

  const getTableTypeList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const result = await api.getAllMasterData(token, endPoint.GET_SECTIONS + outletId);
    setSectionDataLength(result.data.length)

    if (result.data === null) {
      setDataPreset(false);
    } else {
      setData(result.data);
      setDataPreset(true);
    }
  }

  // -----------------------Get the Table Type list Ends----------------------------------------------------------

  //Open add tabletype popup
  const openAddTableType = () => {
    setOpenTableType(true)
  }
  //Close add and edit tabletype popup
  const toggleModal = () => {
    setOpenTableType(!openTableType)
  };
  //open edit tabletype popup
  const toggleEdit = () => {
    setEditTableType(!editTableType)
  };

  //Validation Check for Tabletype 
  const addTableTypeValidationSchema = yup.object().shape({
    tableTypeName: yup
      .string()
      .required('Section Name is required'),
    description: yup
      .string()
      .required('Description is required'),
  })

  // ----------------------------Create Table Type List-----------------------------------------------------------------
  const handleSubmit = async (data) => {

    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    var myJson = {
      tableTypeName: data.tableTypeName,
      description: data.description,
      outletId: outletId,
    }
    const result = await api.CreateMasterData(endPoint.CREATE_SECTIONS, token, myJson);
    if (sectionDataLength >= 1) {
      successOpen()
      getTableTypeList();
      setOpenTableType(false)
    } else {
      getTempTableTypeList()

    }

  }

  //Temp List Data
  const getTempTableTypeList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const result = await api.getAllMasterData(token, endPoint.GET_SECTIONS + outletId);
     if(result.data?.length === 1 && result.data?.lenth < 1)
    setOpenTableType(false)
    navigation.navigate('MapAddingData')
    setOpenTableType(false)
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
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Section Created Successfully</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => successOpen()}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - Ends
    );
  }
  // ---------------------------Create Table Type List Ends------------------------------------------------------


  // --------------------------Update the Table Type list--------------------------------------------------------

  const updateTableType = async (data) => {

    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    var myJson = {
      tableTypeId: editTableData.tableTypeId,
      tableTypeName: data.tableTypeName,
      description: data.description,
      outletId: outletId
    }

    const result = await api.UpdateMasterData(endPoint.EDIT_SECTIONS + editTableData.tableTypeId, token, myJson);

    if (JSON.stringify(result.data) === null) {
      successInternetdownOpen()
    } else {
      successOpenUpdate()
      setEditTableType(false)
      getTableTypeList();

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
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Section Updated Successfully</Text>
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

  /// --------------------------Update the Table Type list Ends--------------------------------------------------


  //Send edit tabletype data 
  const sendDataToParent = (data) => {
    setEditTableData(data)
    setEditTableType(true)
  };


  // ------------------------Add Table Type Pop Up -------------------------------------------------------------

  const popupAddTableType = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>

          <View >
            <View>
              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Add Section
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>
              <Formik
                validationSchema={addTableTypeValidationSchema}
                initialValues={{
                  tableTypeName: '',
                  description: '',
                }}
                onSubmit={values => handleSubmit(values)}
              >
                {({ handleSubmit, handleChange, isValid, values }) => (
                  <View>
                    <View style={[styles.popuprow]}>
                      <Field
                        component={CustomInput}
                        name="tableTypeName"
                        label="Section Name"
                        mandate={true}

                      />
                      <Field
                        component={CustomInput}
                        name="description"
                        label="Description"
                        mandate={true}

                      />
                    </View>
                    <View style={styles.popupBtnCon}>
                      <TouchableOpacity onPress={handleSubmit}>
                        <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={handleSubmit} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>



        </View>
      </KeyboardAwareScrollView>
    );
  }

  // ------------------------Edit Table Type Pop Up --------------------------------------------------------------
  const popupEditTableType = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>
          <View>
            <View style={styles.popupHeadWrap}>
              <Text style={styles.textStyle3}>
                Edit Section
              </Text>
              <Pressable style={styles.closeView} onPress={() => toggleEdit()}>
                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                <Text style={styles.closeText}>
                  Close
                </Text>
              </Pressable>
            </View>
            <Formik
              validationSchema={addTableTypeValidationSchema}
              initialValues={{
                tableTypeName: editTableData.tableTypeName,
                description: editTableData.description,
              }}
              onSubmit={values => updateTableType(values)}
            >
              {({ handleSubmit, handleChange, isValid, values }) => (
                <View>
                  <View style={[styles.popuprow]}>
                    <Field
                      component={CustomInput}
                      name="tableTypeName"
                      label="Section Name"
                      mandate={true}

                    />
                    <Field
                      component={CustomInput}
                      name="description"
                      label="Description"
                      mandate={true}

                    />

                  </View>
                  <View style={styles.popupBtnCon}>


                    <TouchableOpacity onPress={handleSubmit}>
                      <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={handleSubmit} />
                    </TouchableOpacity>
                  </View>

                </View>
              )}
            </Formik>

          </View>


        </View>
      </KeyboardAwareScrollView>
    );
  }
  // ---------------------------HTML Page for Table Type List----------------------------------------------------
  return (
    <>
      <Header heading={"Product"} />

      <ScrollView style={styles.categoryBlkCon}>
        <View style={[styles.textcontainer1, styles.catSubBlk]}>
          <Text style={styles.textStyle1}>
            Sections
          </Text>
          <TouchableOpacity onPress={() => openAddTableType()}>

            <View style={styles.textcontainer2}>
              <Text style={styles.textStyle2}>
                Add Section
              </Text>
            </View>
          </TouchableOpacity>


        </View>

        <View style={[styles.paddB60]}>
          <View style={styles.table}>
            {!isDataPresent
              ?
              <View style={styles.noRecordFoundView}>
                <Image
                  style={styles.noRecordImage}
                  source={(require('../../assets/images/clipboard.png'))}
                />
                <View>
                  <Text style={styles.recordDisplay}>There are no Sections to display.</Text>
                </View>

                <View style={styles.noRecordItem}>
                  <Text style={styles.addText} onPress={() => openAddTableType()}>
                    Add Section
                  </Text>
                  <Text style={styles.recordDisplay}>
                    to continue.
                  </Text>
                </View>
              </View>
              :
              <TableView data={data} sendEditData={sendDataToParent} updateDelete={() => getTableTypeList()} />
            }
          </View>

          {openTableType &&
            <Modal isVisible={openTableType}>
              {popupAddTableType()}
            </Modal>
          }

          {editTableType &&
            <Modal isVisible={editTableType}>
              {popupEditTableType()}
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
