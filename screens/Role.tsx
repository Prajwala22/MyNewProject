import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import * as yup from 'yup';
import styles from '../assets/css/style';
import InternetDownIcon from '../assets/images/internet_down.js';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import Header from '../components/sideMenuHeaderMaster';
import { endPoint } from '../services/api/apiConstant';
import api from '../services/api/callingApi';
import TableView from './ViewRole';




export default function Role({ navigation, route }: { navigation: any, route: any }) {

  const [data, setTableData] = useState([]);
  const [isDataPresent, setDataPreset] = useState(false);
  const [editRole, setEditRole] = useState(false);
  const [openRole, setOpenRole] = useState(false);
  const [editRoleData, setEditRoleData] = useState(null);
  const [openSuccessMsg, setopenSuccessMsg] = useState(false);
  const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false);
  const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
  const [userRoleId, setuserRoleId] = useState('')
  const [outletId, setOutletId] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [outletName, setOutlet] = useState('');
  const isFocused = useIsFocused();

  //Open Add Role Popup
  const openAddRole = () => {
    setOpenRole(true)
  }
  //Open Add Role Popup
  const toggleModal = () => {
    setOpenRole(!openRole)
  };
  //Open Edit Role Popup
  const toggleEdit = () => {
    setEditRole(!editRole)
  };
  //Send edit role data 
  const sendDataToParent = (data) => {
    setEditRoleData(data)
    setEditRole(true)
  };

  //Get User Info
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
  //Role Validation Check
  const addRoleValidationSchema = yup.object().shape({
    roleName: yup
      .string()
      .required('Role Name is required'),
    description: yup
      .string()
      .required('Description is required'),
  })

  //Get Role List
  useEffect(() => {

    getRoleList();
    return () => {

    }
  });
  const getRoleList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    const result = await api.getAllMasterData(token, endPoint.GET_ROLE);
    if (result.data.length === 0) {
      setDataPreset(false);
    } else {
      setTableData(result.data);
      setDataPreset(true);
    }
  }

  //Create Role
  const handleSubmit = async (data) => {

    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    var myJson = {
      roleName: data.roleName,
      description: data.description,
      outletId: data.outletId,
    }
    const result = await api.CreateMasterData(endPoint.CREATE_ROLE, token, myJson);
    if (JSON.stringify(result.data) === null) {
      successInternetdownOpen()
    } else {
      getRoleList();
      successOpen()
      setOpenRole(false)
    }
  }
  // Create Success msg 
  const successOpen = () => {
    setopenSuccessMsg(!openSuccessMsg)
  }
  // success popup
  const SuccessPopup = () => {
    return (
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
          <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Role Created Successfully</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => successOpen()}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - Ends
    );
  }
  //Update Role
  const updateRole = async (data) => {

    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    var myJson = {
      roleId: editRoleData.roleId,
      roleName: data.roleName,
      description: data.description,
    }
    const result = await api.UpdateMasterData(endPoint.EDIT_ROLE + editRoleData.roleId, token, myJson);
    if (JSON.stringify(result.data) === null) {
      successInternetdownOpen()
    } else {
      successOpenUpdate()
      setEditRole(false)
      getRoleList();
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
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Role Updated Successfully</Text>
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

  //Popup Add Role
  const popupAddRole = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>

          <View>
            <View>
              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Add Role
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                  <Image source={(require("../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>
              <Formik
                validationSchema={addRoleValidationSchema}
                initialValues={{
                  roleName: '',
                  description: '',
                }}
                onSubmit={values => handleSubmit(values)}
              >
                {({ handleSubmit, handleChange, isValid, values }) => (
                  <View>
                    <View style={styles.flxDirow}>

                      <Field
                        component={CustomInput}
                        name="roleName"
                        label="Role Name"
                        mandate={true}

                      />
                      <Field
                        component={CustomInput}
                        name="description"
                        label="Description"
                        mandate={false}
                      />
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.martop15}>
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

  //Popup Edit Role
  const popupEditRole = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>
          <View>
            <View>
              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Edit Role
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleEdit()}>
                  <Image source={(require("../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>

              <Formik
                validationSchema={addRoleValidationSchema}
                initialValues={{
                  roleName: editRoleData.roleName,
                  description: editRoleData.description,
                }}
                onSubmit={values => updateRole(values)}
              >
                {({ handleSubmit, handleChange, isValid, values }) => (
                  <View style={styles.flxDirow}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                      <Field
                        component={CustomInput}
                        name="roleName"
                        label="Role Name"
                        mandate={true}

                      />

                      <Field
                        component={CustomInput}
                        name="description"
                        label="Description"
                        mandate={true}
                      />
                    </View>

                    <View style={[styles.popupBtnCon, styles.wdth100]}>
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
  // -------------------------------------------  User Interface -----------------------------------------------------------------
  return (
    <>
      <Header heading={"Role"} />
      <ScrollView style={styles.categoryBlkCon}>
        <View style={[styles.textcontainer1, styles.catSubBlk]}>
          <Text style={styles.textStyle1}>
            Role
          </Text>
          <View>
          </View>

          {/* <TouchableOpacity onPress={() => openAddRole()}>
            <View style={styles.textcontainer2}>
              <Text style={styles.textStyle2}>
                Add Role
              </Text>
            </View>
          </TouchableOpacity> */}

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
                  <Text style={styles.recordDisplay}>There are no Roles to display.</Text>
                </View>

                <View style={styles.noRecordItem}>
                  {/* <Text style={styles.addText} onPress={() => openAddRole()}>
                    Add Role
                  </Text>
                  <Text style={styles.recordDisplay}>
                    to continue.
                  </Text> */}
                </View>
              </View>
              :
              <TableView data={data} sendEditData={sendDataToParent} updateDelete={() => getRoleList()} />
              // no record HTML Ends
            }
          </View>

          {openRole &&
            <Modal isVisible={openRole}>
              {popupAddRole()}
            </Modal>
          }

          {editRole &&
            <Modal isVisible={editRole}>
              {popupEditRole()}
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
