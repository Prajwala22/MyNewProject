/**
 * Generated class for the AddOutlet Page.
 * Created by himanshu on 23/02/2022
 * User will be able to create Outlet here.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import { Appbar } from 'react-native-paper';
import * as yup from 'yup';
import { default as styles, default as styless } from '../../assets/css/style';
import BarIcon from '../../assets/images/bar.js';
import DashboardIcon from '../../assets/images/dashbord.js';
import DineInIcon from '../../assets/images/dine_in.js';
import InternetDownIcon from '../../assets/images/internet_down.js';
import InvenIcon from '../../assets/images/inventory_icon.js';
import KitchenIcon from '../../assets/images/kitchen_icon.js';
import OnlineIcon from '../../assets/images/Online.js';
import SuccessmsgPop from '../../assets/images/Outlet_created.js';
import ReportIcon from '../../assets/images/Report Icon';
import TakeAwayIcon from '../../assets/images/take_away.js';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import TableOutletView from '../../components/TableOutletView';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import Header from '../../components/sideMenuHeaderMaster';
import { formId } from '../common/FormIdConstants';
import { Platform } from 'react-native';
import { constRoleId } from "../common/RoleConstants";





export default function AddOutlet({ navigation, route }) {
  const [isPopupDisplayed, displayPopup] = useState(false);
  const [owner, setOwner] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [confirmpassword, setConfirmPassword] = useState({ value: '', error: '' });
  const [mobile, setMobile] = useState({ value: '', error: '' })
  const [address, setAddress] = useState({ value: '', error: '' });
  const [trn, setTrn] = useState({ value: '', error: '' });
  const [countryName, setCountryName] = useState('');
  const [showGeoSearch, setShowGeoSearch] = useState(false);
  const [streetName, setStreetName] = useState('Hajipur');
  const [isSelected, setSelection] = useState(false);
  const placeHolderResturant = "Name of Resturant";
  const placeHolderOwnerName = "Owner Name";
  const placeHolderEmail = "Email Id";
  const placeholderTRNNumber = "TRN Number";
  const [outletData, setOutletData] = useState([]);
  const [isDataPresent, setDataPreset] = useState(false);
  const [openOutlet, setOpenOutlet] = useState(false)
  const [editOutlet, setEditOutlet] = useState(false)
  const [editData, setEditData] = useState(null);
  const isFocused = useIsFocused();
  const [openSuccessMsg, setopenSuccessMsg] = useState(false);
  const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false);
  const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
  const [outletlength, setOutletlength] = useState(0)
  const [userRoleId, setuserRoleId] = useState('')
  const [outletId, setOutletId] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [outletName, setOutlet] = useState('');

  const [dashboardPermission, setDashBoardPermission] = useState([])
  const [dineInPermission, setDineInPermission] = useState([])
  const [takeAwayPermission, setTakeAwayPermission] = useState([])
  const [onlinePermission, setOnlinePermission] = useState([])
  const [kitchenPermission, setKitchenPermission] = useState([])
  const [reportsPermission, setReportsPermission] = useState([])
  const [barPermission, setBarPermission] = useState([])
  const [mastersPermission, setMastersPermission] = useState([])
  const [restName, setRestName] = useState('')



  useEffect(() => {
    setTimeout(() => getRestaurant(), 1000);
    checkPermissions();
  }, [isFocused]);

  const getRestaurant = async () => {
    const prodRestName = await AsyncStorage.getItem('RestaurantName')
    setRestName(prodRestName)
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


  const accounts = [
    {
      accNumber: '',
      accType: '',
      productCode: '',
      availBalance: '',
    },
  ];



  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
    });
    return unsubscribe;
  }, [navigation]);


  //Permissions Filter Method
  const checkPermissions = async () => {
    const permissions = await AsyncStorage.getItem('permissions')
    const loginPermissions = JSON.parse(permissions)

    //Checking Permission for Dashboard
    const fetchDashboardStatus = loginPermissions.filter((item) => item.formId === formId.DASHBOARD && item.isFormAccess === true)
    setDashBoardPermission(fetchDashboardStatus)
    //Checking Permission for Dinein
    const fetchDineInStatus = loginPermissions.filter((item) => item.formId === formId.DINEIN && item.isFormAccess === true)
    setDineInPermission(fetchDineInStatus)
    //Checking Permission for Takeaway
    const fetchTakeAwayStatus = loginPermissions.filter((item) => item.formId === formId.TAKEAWAY && item.isFormAccess === true)
    setTakeAwayPermission(fetchTakeAwayStatus)
    //Checking Permission for Online
    const fetchOnlineStatus = loginPermissions.filter((item) => item.formId === formId.ONLINE && item.isFormAccess === true)
    setOnlinePermission(fetchOnlineStatus)
    //Checking Permission for Inventory
    const fetchInventoryStatus = loginPermissions.filter((item) => item.formId === formId.MASTERS && item.isFormAccess === true)
    setMastersPermission(fetchInventoryStatus)
    //Checking Permission for Kitchen
    const fetchKitchenStatus = loginPermissions.filter((item) => item.formId === formId.KITCHEN && item.isFormAccess === true)
    setKitchenPermission(fetchKitchenStatus)
    //Checking Permission for Bar
    const fetchBarStatus = loginPermissions.filter((item) => item.formId === formId.BAR && item.isFormAccess === true)
    setBarPermission(fetchBarStatus)
    //Checking Permission for Reportsdashboard
    const fetchReportsStatus = loginPermissions.filter((item) => item.formId === formId.REPORTS && item.isFormAccess === true)
    setReportsPermission(fetchReportsStatus)

  }

  /// Get the category list
  useEffect(() => {
    getOutletList();
    return () => {
      setOutletData([]);
    }
  }, [isFocused]);

  const getOutletList = async () => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let restaurantId = await AsyncStorage.getItem('restaurantId')
    const result = await api.getAllMasterData(token, endPoint.GET_OUTLETLIST + restaurantId)

    if (result.data?.outlets?.length === 0) {

      setDataPreset(false)
    }
    else {
      setOutletData(result.data.outlets)
      setDataPreset(true)
      setOutletlength(result.data.outlets?.length)
    }

  }

  //Create outlet
  const handleSubmit = async (data) => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let restaurantId = await AsyncStorage.getItem('restaurantId')
    let myJson = {
      outletName: data.name,
      outletAddress: data.address,
      outletManager: data.manager
    }

    const result = await api.CreateMasterData(endPoint.CREATE_OUTLET + restaurantId, token, myJson);
    if (outletlength >= 1) {
      setOpenOutlet(false)
      successOpen()
      getOutletList()
    }
    else {
      getOutletList()

      tempGetOutletList()

    }

  }

  //Temp Outlet List 
  const tempGetOutletList = async () => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let restaurantId = await AsyncStorage.getItem('restaurantId')
    const result = await api.getAllMasterData(token, endPoint.GET_OUTLETLIST + restaurantId)

    if (result.data?.length === 1 && result.data?.lenth > 1) {
      setOpenOutlet(false)
      await AsyncStorage.setItem('tempoutId', result.data?.outlets[0]?.outletId)
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
          <View>
            <Image source={(require("../../assets/images/placeordergif.gif"))} style={[styles.OutletsucGif]} />
            <SuccessmsgPop style={styles.marBtm20} />
          </View>
          <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Outlet Created Successfully</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => successOpen()}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - Ends
    );
  }

  //Update Outlet
  const updateOutlet = async (data) => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    const loginData = JSON.parse(jsonValue)
    const token = loginData.token;
    const restaurantId = await AsyncStorage.getItem('restaurantId')
    var myJson = {
      outletId: editData.outletId,
      outletName: data.name,
      outletAddress: data.address,
      outletManager: data.manager
    }


    const result = await api.UpdateMasterData(endPoint.EDIT_OUTLET + restaurantId, token, myJson);

    if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
      // Toast.show("Some Error occured. Please try again.");
      successInternetdownOpen()
      setDataPreset(false);
    }

    else {
      successOpenUpdate();
      setEditOutlet(false);
      getOutletList();
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
          <View>
            <Image source={(require("../../assets/images/update_00000.gif"))} style={[styles.OutletupdateGif]} />
            <SuccessmsgPop style={styles.marBtm20} />
          </View>
          <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Outlet Updated Successfully</Text>
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

  const addOutletValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Outlet Name is required'),
    manager: yup
      .string()
      .required('Outlet Manager is required'),
    address: yup
      .string()
      .required('Outlet Address is required'),

  })
  const openAddOutlet = () => {
    setOpenOutlet(true)
  }
  const toggleModal = () => {
    setOpenOutlet(!openOutlet)
  }
  const toggleUpdate = () => {
    setEditOutlet(!editOutlet)
  }



  const sendDataToParent = (data) => { // the callback. Use a better name
    setEditData(data)
    setEditOutlet(true)
  };

  //Add Outlet Popup
  const popupAddOutlet = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>

          <View>
            <View>
              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Add Outlet
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>
              <Formik
                validationSchema={addOutletValidationSchema}
                initialValues={{
                  name: '',
                  manager: '',
                  address: '',
                }}
                onSubmit={values => handleSubmit(values)}
              >
                {({ handleSubmit }) => (
                  <View >
                    <View style={[styles.popuprow]}>
                      <Field
                        component={CustomInput}
                        name="name"
                        label="Outlet Name"
                        mandate={true}

                      />
                      <Field
                        component={CustomInput}
                        name="manager"
                        label="Outlet Manager"
                        mandate={true}
                      />
                    </View>
                    <View style={[styles.popuprow]}>
                      <Field
                        component={CustomInput}
                        name="address"
                        label="Outlet Address"
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
  //Update Outlet Popup
  const popupUpdateOutlet = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>

          <View>
            <View>
              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Edit Outlet
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleUpdate()}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>
              <Formik
                validationSchema={addOutletValidationSchema}
                initialValues={{
                  name: editData.outletName,
                  manager: editData.outletManager,
                  address: editData.outletAddress
                }}
                onSubmit={values => updateOutlet(values)}
              >
                {({ handleSubmit }) => (
                  <View >
                    <View style={[styles.popuprow]}>
                      <Field
                        component={CustomInput}
                        name="name"
                        label="Outlet Name"
                        mandate={true}

                      />
                      <Field
                        component={CustomInput}
                        name="manager"
                        label="Outlet Manager"
                        mandate={true}
                      />
                    </View>
                    <View style={[styles.popuprow]}>
                      <Field
                        component={CustomInput}
                        name="address"
                        label="Outlet Address"
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
  // ---------------------------------------- User Interface --------------------------------------------------------------------
  return (
    <>
       <Header heading={"Outlet"} /> 
      {/* <View style={[styles.waterheader, styles.headerBlk]}>

<View style={styles.headerFlexCenter}>
  <View style={[styles.headerFlexCenter, styles.headerLeftSec]}>
    <Image style={styles.headerLogo} source={(require('../../assets/images/logo.png'))} />
    {userRoleId === constRoleId.PRODUCT_ADMIN_ID ?
      <View>
        <View>
          <View style={styless.headerFlexCenter}>
            <TouchableOpacity onPress={() => navigation.navigate('Restaurant')} style={[styless.resFlex, styless.headingMargin]}>
              <Text style={[styless.headingText]}>{restaurant}</Text>
              <Image style={styless.dropDownIcon} source={(require('../../assets/images/chevron_left.png'))} />
            </TouchableOpacity>
          </View>

          <View style={styles.headerFlexCenter}>
            <TouchableOpacity onPress={() => navigation.navigate('SelectOutlet', { outletId: outletId })} style={[styless.resFlex, styless.headingMargin]}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={[styless.headingText, styless.width100px]}>{outletName}</Text>
              <Image style={styless.dropDownIcon} source={(require('../../assets/images/chevron_left.png'))} />
            </TouchableOpacity>
            <View style={[styles.headerFlexCenter, styles.online]}>
              <View style={styles.onlineCircle}></View>
              <Text style={styles.onlineText}>Online</Text>
            </View>
          </View>
        </View>
      </View> :

      <View>
        <View style={styless.headerFlexCenter}>
          <Text style={[styless.headingText]}>{restName}</Text>
          <Image style={styless.dropDownIcon} source={(require('../../assets/images/chevron_left.png'))} />
        </View>
        <View style={styles.headerFlexCenter}>
          <TouchableOpacity onPress={() => navigation.navigate('SelectOutlet', { outletId: outletId })} style={[styless.resFlex, styless.headingMargin]}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={[styless.headingText, styless.width100px]}>{outletName}</Text>
            <Image style={styless.dropDownIcon} source={(require('../../assets/images/chevron_left.png'))} />
          </TouchableOpacity>
          <View style={[styles.headerFlexCenter, styles.online]}>
            <View style={styles.onlineCircle}></View>
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>
      </View>
    }

  </View>

  <View style={[styles.dashboardMenuHeader]}>
    <View>
      <View>
        {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
              <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                <DashboardIcon />
                <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Dashboard</Text>
              </View>
            </TouchableOpacity>
          </View> : dashboardPermission[0]?.isFormAccess === true ?
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                  <DashboardIcon />
                  <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Dashboard</Text>
                </View>
              </TouchableOpacity>
            </View> : null
        }
      </View>
    </View>

    <View>
      <View>
        {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('DineIn')}>
              <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                <DineInIcon />
                <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Dine In</Text>
              </View>
            </TouchableOpacity>
          </View> : dineInPermission[0]?.isFormAccess === true ?
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('DineIn')}>
                <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                  <DineInIcon />
                  <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Dine In</Text>
                </View>
              </TouchableOpacity>
            </View> : null
        }
      </View>
    </View>

    <View>
      <View>
        {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
          <View>

            <TouchableOpacity onPress={() => navigation.navigate('TakeAway')}>
              <View style={[styles.dashboardHeader, styles.headerRightBorder, styles.dashMenuActive]}>
                <TakeAwayIcon />
                <Text style={[styles.font13, styles.priText, styles.fontBold, styles.padtop5]}>Take Away</Text>
              </View>
            </TouchableOpacity>
          </View> : takeAwayPermission[0]?.isFormAccess === true ?
            <View>

              <TouchableOpacity onPress={() => navigation.navigate('TakeAway')}>
                <View style={[styles.dashboardHeader, styles.headerRightBorder, styles.dashMenuActive]}>
                  <TakeAwayIcon />
                  <Text style={[styles.font13, styles.priText, styles.fontBold, styles.padtop5]}>Take Away</Text>
                </View>
              </TouchableOpacity>
            </View> : null
        }
      </View>
    </View>

    <View>
      <View>
        {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Online')}>
              <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                <OnlineIcon />
                <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Online</Text>
              </View>
            </TouchableOpacity>
          </View> : onlinePermission[0]?.isFormAccess === true ?
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Online')}>
                <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                  <OnlineIcon />
                  <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Online</Text>
                </View>
              </TouchableOpacity>
            </View> : null
        }
      </View>
    </View>

    <View>
      <View>
        {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Inventory')}>
              <View style={[styles.dashboardHeader, styles.headerRightBorder, styles.headerLeftBorder]}>
                <InvenIcon />
                <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Inventory</Text>
              </View>
            </TouchableOpacity>
          </View> : mastersPermission[0]?.isFormAccess === true ?
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Inventory')}>
                <View style={[styles.dashboardHeader, styles.headerRightBorder, styles.headerLeftBorder]}>
                  <InvenIcon />
                  <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Inventory</Text>
                </View>
              </TouchableOpacity>
            </View> : null
        }
      </View>

    </View>

    <View>
      <View>
        {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Kitchen')}>
              <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                <KitchenIcon />
                <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Kitchen</Text>
              </View>
            </TouchableOpacity>
          </View> : kitchenPermission[0]?.isFormAccess ?
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Kitchen')}>
                <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                  <KitchenIcon />
                  <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Kitchen</Text>
                </View>
              </TouchableOpacity>
            </View> : null
        }
      </View>
    </View>

    <View>
      <View>
        {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Bar')}>
              <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                <BarIcon />
                <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Bar</Text>
              </View>
            </TouchableOpacity>
          </View> : barPermission[0]?.isFormAccess === true ?
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Bar')}>
                <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                  <BarIcon />
                  <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Bar</Text>
                </View>
              </TouchableOpacity>
            </View> : null
        }
      </View>
    </View>

    <View>
      <View>
        {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('ReportsDashboard')}>
              <View style={[styles.dashboardHeader]}>
                <ReportIcon />
                <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Reports</Text>
              </View>
            </TouchableOpacity>
          </View> : reportsPermission[0]?.isFormAccess === true ?
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('ReportsDashboard')}>
                <View style={[styles.dashboardHeader]}>
                  <ReportIcon />
                  <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Reports</Text>
                </View>
              </TouchableOpacity>
            </View> : null
        }
      </View>
    </View>
  </View>
</View>

<View style={styless.headerFlexCenter}>
  <View>
    <Appbar.Action style={{ alignSelf: 'flex-end' }}
      icon='menu'
      onPress={() => navigation.navigate('SideMenu')}
    />
  </View>
</View>
</View> */}
      <ScrollView style={styles.categoryBlkCon}>
        <View style={[styles.textcontainer1, styles.catSubBlk]}>
          <Text style={styles.textStyle1}>
            Outlet
          </Text>
          <View>
          </View>

          <TouchableOpacity onPress={() => openAddOutlet()}>
            <View style={styles.textcontainer2}>

              <Text style={styles.textStyle2}>
                Add Outlet
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
                  <Text style={styles.recordDisplay}>There are no Outlet to display.</Text>
                </View>

                <View style={styles.noRecordItem}>
                  <Text style={styles.addText} onPress={() => openAddOutlet()}>
                    Add Outlet
                  </Text>
                  <Text style={styles.recordDisplay}>
                    to continue.
                  </Text>
                </View>
              </View>
              // no record HTML Ends
              :
              <TableOutletView data={outletData} sendEditData={sendDataToParent} updateDelete={() => getOutletList()} />
            }
          </View>

          {openOutlet &&
            <Modal isVisible={openOutlet} style={styles.popup}>
              {popupAddOutlet()}
            </Modal>
          }

          {editOutlet &&
            <Modal isVisible={editOutlet} style={styles.popup}>
              {popupUpdateOutlet()}
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