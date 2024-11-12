import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import styles from '../../assets/css/style';
import BarIcon from '../../assets/images/bar.js';
import DashboardIcon from '../../assets/images/dashbord.js';
import DineInIcon from '../../assets/images/dine_in.js';
import InvenIcon from '../../assets/images/inventory_icon.js';
import KitchenIcon from '../../assets/images/kitchen_icon.js';
import OnlineIcon from '../../assets/images/Online.js';
import ReportIcon from '../../assets/images/Report Icon';
import TakeAwayIcon from '../../assets/images/take_away.js';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import { constRoleId } from "../common/RoleConstants"
import { formId } from '../common/FormIdConstants';


export default function EditFormAccess({ navigation, route }: { navigation: any, route: any }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [userRoleId, setuserRoleId] = useState('')
  const [outletId, setOutletId] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [outletName, setOutlet] = useState('');
  const isFocused = useIsFocused();
  const [formListData, setFormListData] = useState([])
  const [formIdData, setFormIdData] = useState([])
  const [isDataPresent, setDataPreset] = useState(false);
  const [roleData, setRoleData] = useState(route.params)
  const [onSelectRoleData, setOnSelectRoleData] = useState(roleData.roleData)
  const [dashBoard, setDashboard] = useState(false)
  const [WalkIn, setWalkIn] = useState(false)
  const [dineIn, setDineIn] = useState(false)
  const [online, setOnline] = useState(false)
  const [kitchen, setKitchen] = useState(false)
  const [reports, setReports] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [masters, setMasters] = useState(false)
  const [tableDetails, setTableDetails] = useState(false)
  const [category, setCategory] = useState(false)
  const [restaurants, setRestaurants] = useState(false)
  const [tableType, setTableType] = useState(false)
  const [printDesign, setprintDesign] = useState(false)
  const [printView, setPrintView] = useState(false)
  const [role, setRole] = useState(false)
  const [items, setItems] = useState(false)
  const [orderStatus, setOrderStatus] = useState(false)
  const [itemStatus, setItemstatus] = useState(false)
  const [modifiers, setModifiers] = useState(false)
  const [promoCode, setPromocode] = useState(false)
  const [discount, setDiscount] = useState(false)
  const [outlet, setOutlets] = useState(false)
  const [tax, setTax] = useState(false)
  const [userRegistration, setUserRegistration] = useState(false)
  const [fromAccess, setFormAccess] = useState(false)
  const [wareHouse, setwareHouse] = useState(false)
  const [taxSetup, setTaxSetup] = useState(false)

  const [pAdmin, setPAdminPermissions] = useState([])
  const [cAdminPermissions, setCAdminPermissions] = useState([])
  const [cashierPermissions, setCashierPermissions] = useState([])
  const [kitchenPermissions, setKitchenPermissions] = useState([])
  const [bartenderPermissions, setBartenderPermissions] = useState([])
  const [driverPermissions, setDriverPermissions] = useState([])
  const [customRolePermissions, setCustomRolePermissions] = useState([])
  const [orderTakerPermisions, setOrderTakerPaermissions] = useState([])
  const [cashier, setcashier] = useState([])



  useEffect(() => {
    setTimeout(() => getRestaurant(), 1000);
    getFormNameList();
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

  //GET ROLE
  useEffect(() => {

    getRoleList();
  }, []);
  const getRoleList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    const result = await api.getAllMasterData(token, endPoint.GET_ROLE);
    const roleData = JSON.stringify(result.data)

    setRoleData(result.data)
    if (result.data?.length > 0) {

      const filterCashierPermissions = result.data.filter((item) => item.roleId == constRoleId.CASHIER_ID).map(({ permissions }) => ({ permissions }))
      setCashierPermissions(filterCashierPermissions)
      const filterCashier = result.data.filter((item) => item.roleId == '638094a1a4557ddb2128e50d').map(({ permissions }) => ({ permissions }))

      const filterBartenderresult = result.data.filter((item) => item.roleId == constRoleId.BARTENDER_ID).map(({ permissions }) => ({ permissions }));
      setBartenderPermissions(filterBartenderresult)

      if (filterBartenderresult[0]?.permissions[9]?.formId === formId.MASTERS && filterBartenderresult[0]?.permissions[9]?.isFormAccess === true) {
        setMasters(true)
      }


      setDataPreset(false);
    } else {
      setDataPreset(true);
    }
  }
  const toggleSwitchDashboard = (formId) => {

    setDashboard(previousState => !previousState);
  }
  const toggleSwitchWalkIn = () => setWalkIn(previousState => !previousState);
  const toggleSwitchDineIn = () => setDineIn(previousState => !previousState);
  const toggleSwitchOnline = () => setOnline(previousState => !previousState);
  const toggleSwitchKitchen = () => setKitchen(previousState => !previousState);
  const toggleSwitchReports = () => setReports(previousState => !previousState);
  const toggleSwitchAdmin = () => setAdmin(previousState => !previousState);
  const toggleSwitchMasters = () => setMasters(previousState => !previousState);
  const toggleSwitchTableDetails = () => setTableDetails(previousState => !previousState);
  const toggleSwitchCategory = () => setCategory(previousState => !previousState);
  const toggleSwitchRestaurant = () => setRestaurant(previousState => !previousState);
  const toggleSwitchTableType = () => setTableType(previousState => !previousState);
  const toggleSwitchPrintDesign = () => setprintDesign(previousState => !previousState);
  const toggleSwitchPrintView = () => setPrintView(true);
  const toggleSwitchRole = () => setRole(previousState => !previousState);
  const toggleSwitchItems = () => {

    setItems(previousState => !previousState);
  }
  const toggleSwitchOrderStatus = () => setOrderStatus(previousState => !previousState);
  const toggleSwitchItemStatus = () => setItemstatus(previousState => !previousState);
  const toggleSwitchModifiers = () => setModifiers(previousState => !previousState);
  const toggleSwitchPromocodes = () => setPromocode(previousState => !previousState);
  const toggleSwitchDiscounts = () => setDiscount(previousState => !previousState);
  const toggleSwitchTax = () => setTax(previousState => !previousState);
  const toggleSwitchOutlets = () => setOutlets(previousState => !previousState);
  const toggleSwitchUserRegistration = () => setUserRegistration(previousState => !previousState);
  const toggleSwitchFormAccess = () => setFormAccess(previousState => !previousState);
  const toggleSwitchWareHouse = () => setwareHouse(previousState => !previousState);
  const toggleSwitchTaxSetup = () => setTaxSetup(previousState => !previousState);

  //Get All Form Names API
  const getFormNameList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    const result = await api.getAllMasterData(token, endPoint.GET_FORM_NAME_LIST);
    const formIdFilter = result.data.map((item) => item.formId)
    setFormIdData(formIdFilter)
    if (result.data.length === 0) {
      setDataPreset(false)
    }
    else {
      setDataPreset(false)
      setFormListData(result.data)
    }


  }

  // --------------------------------------------------- User Interface ------------------------------------------

  return (
    <>
      <View style={[styles.waterheader, styles.headerBlk]}>

        <View style={styles.headerFlexCenter}>
          <View style={[styles.headerFlexCenter, styles.headerLeftSec, styles.headerRightBorder]}>
            <Image style={styles.headerLogo} source={(require('../../assets/images/logo.png'))} />
            {userRoleId === constRoleId.PRODUCT_ADMIN_ID ?
              <View>
                <View>
                  <View style={styles.headerFlexCenter}>
                    <TouchableOpacity onPress={() => navigation.navigate('Restaurant')} style={[styles.resFlex, styles.headingMargin]}>
                      <Text style={[styles.headingText]}>{restaurant}</Text>
                      <Image style={styles.dropDownIcon} source={(require('../../assets/images/chevron_left.png'))} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.headerFlexCenter}>
                    <TouchableOpacity onPress={() => navigation.navigate('SelectOutlet', { outletId: outletId })} style={[styles.resFlex, styles.headingMargin]}>
                      <Text ellipsizeMode='tail' numberOfLines={1} style={[styles.headingText, styles.width100px]}>{outletName}</Text>
                      <Image style={styles.dropDownIcon} source={(require('../../assets/images/chevron_left.png'))} />
                    </TouchableOpacity>
                    <View style={[styles.headerFlexCenter, styles.online]}>
                      <View style={styles.onlineCircle}></View>
                      <Text style={styles.onlineText}>Online</Text>
                    </View>
                  </View>
                </View>
              </View> :

              <View style={styles.headerFlexCenter}>
                <TouchableOpacity onPress={() => navigation.navigate('SelectOutlet', { outletId: outletId })} style={[styles.resFlex, styles.headingMargin]}>
                  <Text ellipsizeMode='tail' numberOfLines={1} style={[styles.headingText, styles.width100px]}>{outletName}</Text>
                  {/* <Image style={styless.dropDownIcon} source={(require('../../assets/images/chevron_left.png'))} /> */}
                </TouchableOpacity>
                <View style={[styles.headerFlexCenter, styles.online]}>
                  <View style={styles.onlineCircle}></View>
                  <Text style={styles.onlineText}>Online</Text>
                </View>
              </View>
            }

          </View>

          <View style={[styles.dashboardMenuHeader]}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
              <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                <DashboardIcon />
                <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Dashboard</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DineIn')}>
              <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                <DineInIcon />
                <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Dine In</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TakeAway')}>
              <View style={[styles.dashboardHeader, styles.headerRightBorder]}>

                <TakeAwayIcon />
                <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Take Away</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Online')}>
              <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                <OnlineIcon />
                <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Online</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Inventory')}>
              <View style={[styles.dashboardHeader, styles.headerRightBorder, styles.headerLeftBorder]}>
                <InvenIcon />
                <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Inventory</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Kitchen')}>
              <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                <KitchenIcon />
                <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Kitchen</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Bar')}>
              <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                <BarIcon />
                <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Bar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ReportsDashboard')}>
              <View style={[styles.dashboardHeader]}>
                <ReportIcon />
                <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Reports</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerFlexCenter}>

          <View>
            <Appbar.Action style={{ alignSelf: 'flex-end' }}
              icon='menu'
              onPress={() => navigation.openDrawer()}
            />
          </View>
        </View>
      </View>

      <ScrollView>

        <View style={styles.categoryBlkCon}>
          <View style={[styles.marBtm20]}>
            <Text style={[styles.font16, styles.textBlack, styles.marBtm2]}>User Role</Text>
            <Text style={styles.textStyle1}>{route.params.roleData?.roleName}</Text>
          </View>


          {roleData?.roleData?.permissions === null ?
            <View style={[styles.width100, styles.flexrow, styles.flexWrap]}>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Dashboard1</Text>
                  <Switch
                    onValueChange={toggleSwitchDashboard}
                    value={dashBoard} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Walk In</Text>
                  <Switch
                    onValueChange={toggleSwitchWalkIn}
                    value={WalkIn} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Dine In</Text>
                  <Switch
                    onValueChange={toggleSwitchDineIn}
                    value={dineIn} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Online</Text>
                  <Switch
                    onValueChange={toggleSwitchOnline}
                    value={online} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Kitchen</Text>
                  <Switch
                    onValueChange={toggleSwitchKitchen}
                    value={kitchen} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Reports</Text>
                  <Switch
                    onValueChange={toggleSwitchReports}
                    value={reports} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Admin</Text>
                  <Switch
                    onValueChange={toggleSwitchAdmin}
                    value={admin} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Masters</Text>
                  <Switch
                    onValueChange={toggleSwitchMasters}
                    value={masters} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Table Details</Text>
                  <Switch
                    onValueChange={toggleSwitchTableDetails}
                    value={tableDetails} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Category</Text>
                  <Switch
                    onValueChange={toggleSwitchCategory}
                    value={category} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Restaurant</Text>
                  <Switch
                    onValueChange={toggleSwitchRestaurant}
                    value={restaurants} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Table Type</Text>
                  <Switch
                    onValueChange={toggleSwitchTableType}
                    value={tableType} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Print Design</Text>
                  <Switch
                    onValueChange={toggleSwitchPrintDesign}
                    value={printDesign} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Print View</Text>
                  <Switch
                    onValueChange={toggleSwitchPrintView}
                    value={printView} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Role</Text>
                  <Switch
                    onValueChange={toggleSwitchRole}
                    value={role} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Items</Text>
                  <Switch
                    onValueChange={toggleSwitchItems}
                    value={items} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Order Status</Text>
                  <Switch
                    onValueChange={toggleSwitchOrderStatus}
                    value={orderStatus} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Items Status</Text>
                  <Switch
                    onValueChange={toggleSwitchItemStatus}
                    value={itemStatus} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Modifiers</Text>
                  <Switch
                    onValueChange={toggleSwitchModifiers}
                    value={modifiers} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Promo Code</Text>
                  <Switch
                    onValueChange={toggleSwitchPromocodes}
                    value={promoCode} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Discounts</Text>
                  <Switch
                    onValueChange={toggleSwitchDiscounts}
                    value={discount} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Outlets</Text>
                  <Switch
                    onValueChange={toggleSwitchOutlets}
                    value={outlet} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Tax</Text>
                  <Switch
                    onValueChange={toggleSwitchTax}
                    value={tax} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>User Registration</Text>
                  <Switch
                    onValueChange={toggleSwitchUserRegistration}
                    value={userRegistration} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Tax Setup</Text>
                  <Switch
                    onValueChange={toggleSwitchTaxSetup}
                    value={taxSetup} />

                </View>
              </View>
            </View> :

            <View style={[styles.width100, styles.flexrow, styles.flexWrap]}>

              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Dashboard2</Text>
                  <Switch
                    onValueChange={toggleSwitchDashboard}
                    value={dashBoard} />

                </View>
              </View>

              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Walk In</Text>
                  <Switch
                    onValueChange={toggleSwitchWalkIn}
                    value={WalkIn} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Dine In</Text>
                  <Switch
                    onValueChange={toggleSwitchDineIn}
                    value={dineIn} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Online</Text>
                  <Switch
                    onValueChange={toggleSwitchOnline}
                    value={online} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Kitchen</Text>
                  <Switch
                    onValueChange={toggleSwitchKitchen}
                    value={kitchen} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Reports</Text>
                  <Switch
                    onValueChange={toggleSwitchReports}
                    value={reports} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Admin</Text>
                  <Switch
                    onValueChange={toggleSwitchAdmin}
                    value={admin} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Masters</Text>
                  <Switch
                    onValueChange={toggleSwitchMasters}
                    value={masters} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Table Details</Text>
                  <Switch
                    onValueChange={toggleSwitchTableDetails}
                    value={tableDetails} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Category</Text>
                  <Switch
                    onValueChange={toggleSwitchCategory}
                    value={category} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Restaurant</Text>
                  <Switch
                    onValueChange={toggleSwitchRestaurant}
                    value={restaurants} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Table Type</Text>
                  <Switch
                    onValueChange={toggleSwitchTableType}
                    value={tableType} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Print Design</Text>
                  <Switch
                    onValueChange={toggleSwitchPrintDesign}
                    value={printDesign} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Print View</Text>
                  <Switch
                    onValueChange={toggleSwitchPrintView}
                    value={printView} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Role</Text>
                  <Switch
                    onValueChange={toggleSwitchRole}
                    value={role} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Items</Text>
                  <Switch
                    onValueChange={toggleSwitchItems}
                    value={items} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Order Status</Text>
                  <Switch
                    onValueChange={toggleSwitchOrderStatus}
                    value={orderStatus} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Items Status</Text>
                  <Switch
                    onValueChange={toggleSwitchItemStatus}
                    value={itemStatus} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Modifiers</Text>
                  <Switch
                    onValueChange={toggleSwitchModifiers}
                    value={modifiers} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Promo Code</Text>
                  <Switch
                    onValueChange={toggleSwitchPromocodes}
                    value={promoCode} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Discounts</Text>
                  <Switch
                    onValueChange={toggleSwitchDiscounts}
                    value={discount} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Outlets</Text>
                  <Switch
                    onValueChange={toggleSwitchOutlets}
                    value={outlet} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Tax</Text>
                  <Switch
                    onValueChange={toggleSwitchTax}
                    value={tax} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddL15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>User Registration</Text>
                  <Switch
                    onValueChange={toggleSwitchUserRegistration}
                    value={userRegistration} />

                </View>
              </View>
              <View style={[styles.width50, styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.paddR15, styles.marBtm20]}>
                <View style={[styles.formView, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                  <Text style={[styles.font14, styles.textBlack]}>Tax Setup</Text>
                  <Switch
                    onValueChange={toggleSwitchTaxSetup}
                    value={taxSetup} />

                </View>
              </View>
            </View>
          }
        </View>
      </ScrollView>
      <View style={[styles.footerBtn, styles.flexrow, styles.justifyCenter]}>
        <TouchableOpacity>
          <View>
            <Text style={[styles.cancelBtn, styles.marRgt18]} onPress={() => navigation.navigate('Role')}>Cancel</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.UpdateBtn}>
          <View>
            <Text style={styles.textWhite} onPress={() => navigation.navigate('Role')}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>

  )


}