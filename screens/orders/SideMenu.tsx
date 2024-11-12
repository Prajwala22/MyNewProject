import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from "expo-constants";
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../assets/css/style';
import DataSetupIcon from '../../assets/images/data_setup.js';
import InventoryIcon from '../../assets/images/inventory.js';
import LogoutIcon from '../../assets/images/logout_icon.js';
import FloorPlanningIcon from '../../assets/images/floorPlanning.js';
import MenuIcon from '../../assets/images/menu.js';
import OrdersIcon from '../../assets/images/orders.js';
import Outlet from '../../assets/images/Outlet.js';
import ReportIcon from '../../assets/images/Report Icon.js';
import UserSettingsIcon from '../../assets/images/user_settings.js';
import ViewFormAccess from '../../components/ViewFormAccess';
import { AuthContext } from '../../App';
import DineIn from '../../screens/orders/DineIn';
import Online from '../../screens/orders/Online';
import TakeAway from '../../screens/orders/TakeAway';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import Dashboard from '../dashboard/Dashboard';
import ReportsDashboard from '../dashboard/ReportsDashboard';
import MapAddingData from '../initialSetup/MapAddingData';
import SelectOutlet from '../initialSetup/SelectOutLet';
import SelectRestaurant from '../initialSetup/SelectRestaurant';
import Kitchen from '../orders/Kitchen';
import OrderStatus from '../masters/OrderStatus';
import TableDetails from '../masters/TableDetails';
import Role from '../Role';
import UpdateProfile from '../UpdateProfile';
import Users from '../Users';
import AddOutlet from '../masters/AddOutlet';
import Bar from '../orders/Bar';
import Category from '../masters/Category';
import Discount from '../masters/Discount';
import EditFormAccess from '../../screens/home/EditFormAccess';
import Inventory from './Inventory';
import Items from '../masters/Items';
import ItemsRecipe from '../masters/itemsRecipe';
import ItemStatus from '../masters/ItemStatus';
import ItemUpdateRecipe from '../masters/ItemUpdateRecipe';
import Menu from '../masters/Menu';
import Modifiers from '../masters/Modifiers';
import Orders from '../orders/Orders';
import PaymentsChart from '../dashboard/PaymentsChart';
// import PrintDesign from './PrintDesign';
import Productstock from '../../screens/home/Productstock';
import salesbyCategories from '../dashboard/salesbycategories';
import SalesbyItems from '../dashboard/SalesbyItems';
import SupplierOrders from '../../screens/home/SupplierOrders';
import Supplierstock from '../../screens/home/Supplierstock';
import TableTypeList from '../masters/TableTypeList';
import Tax from '../masters/Tax';
import TaxSetUp from '../masters/TaxSetUp';
import TotalOrderValue from '../dashboard/TotalOrderValue';
import userSales from '../dashboard/userSales';
import VoidOrder from '../dashboard/VoidOrder';
import { formId } from '../common/FormIdConstants';
import FloorPlanning from '../masters/FloorPlanning';
import { constRoleId } from "../common/RoleConstants";
import AddModifier from '../masters/AddModifier';
import PromoCode from '../masters/PromoCode';
import SideMenuHeaderMaster from '../../components/sideMenuHeaderMaster';

export default function SideMenu({ navigation, route }: { navigation: any, route: any }) {
  const Drawer = createDrawerNavigator();
  const version = Constants.manifest?.version;
  const [isSelected, setSelection] = useState(false);
  const [submenunvg, setsubmenunvg] = useState(false);
  const [usersettingmenu, setusersettingmenu] = useState(false);
  const [reportsmenu, setReportsmenu] = useState(false);
  const [profilesettingmenu, setprofilesettingmenu] = useState(false);
  const [inventorymenu, setInventoryMenu] = useState(false);
  const [data, setData] = useState([])
  const { signOut } = useContext(AuthContext);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [discountDataLength, setDiscountDataLength] = useState(null)
  const [productData, setProductData] = useState(null)
  const [productDataLength, setProductDataLength] = useState(null)
  const [supplierDataLength, setSupplierDataLength] = useState(null)
  const [stockDataLength, setstockDataLength] = useState(null)
  const [dashboardPermission, setDashBoardPermission] = useState([])
  const [outletsPermissions, setOutletsPermissions] = useState([])
  const [menuPermissions, setMenuPermissions] = useState([])
  const [masterPermissions, setMasterPermissions] = useState([])
  const [itemStatusPermissions, setItemStatusPermissions] = useState([])
  const [discountPermissions, setDiscountPermissions] = useState([])
  const [orderStatusPermissions, setOrderStatusPermissions] = useState([])
  const [sectionsPermissions, setSectionsPermissions] = useState([])
  const [tableDetailsPermissions, setTableDetailsPermissions] = useState([])
  const [taxPermissions, setTaxPermissions] = useState([])
  const [printDesignPermissions, setPrintDesignPermissions] = useState([])
  const [rolePermissions, setRolePermissions] = useState([])
  const [userPermissions, setUserPermissions] = useState([])
  const [reportsPermissions, setReportsPermissions] = useState([])
  const [userRoleId, setUserRoleId] = useState("")
  const roleIddashboard = "1"

  //Intial Login Check

  useEffect(() => {
    async function loginCheck() {
      const roleId = await AsyncStorage.getItem('userRoleId')
      setUserRoleId(roleId)
      const jsonValue: any = await AsyncStorage.getItem('userInfo')
      let loginData = JSON.parse(jsonValue);
      let userId = loginData.userId
      let token = loginData.token;
      let outletId = loginData.outletId
      let outletName = loginData.outletName

      const resById = await api.getPermissionById(token, roleId)
      const userPermissions = JSON.stringify(resById.data.permissions)
      AsyncStorage.setItem('permissions', userPermissions)
      const loginPermissions = JSON.parse(userPermissions)

      const restname = await AsyncStorage.getItem('restaurantName');
      const discountResult = await api.getAllMasterData(token, endPoint.GET_DISCOUNT + outletId);
      setDiscountDataLength(discountResult.data.length)
      const prodResult = await api.GetProductList(token, outletId);
      setProductData(prodResult.data)
      setProductDataLength(prodResult?.data)
      const supplierResult = await api.GetAllSupplier(token, outletId);
      setSupplierDataLength(supplierResult.data?.length)
      const stockResult = await api.GetProductSupplierMaster(token, outletId);
      setstockDataLength(stockResult.data?.length)

      if (restname !== null) {
        setInitialRoute("Dashboard")
      }
      //Compnay Admin Check
      else if (roleId === constRoleId.COMPANY_ADMIN_ID && discountResult.data?.length === 0) {
        setInitialRoute("MapAddingData")
      }
      //Product Admin Check
      else if (roleId === constRoleId.PRODUCT_ADMIN_ID) {
        setInitialRoute("Restaurant")
      }
      //Chef Login Check
      else if (roleId === constRoleId.CHEF_ID) {
        setInitialRoute("Restaurant")
      }
      //Bartender Login Check 
      else if (roleId === constRoleId.BARTENDER_ID) {
        setInitialRoute("Restaurant")
      }
      else if (roleId === constRoleId.CASHIER_ID) {
        setInitialRoute("Restaurant")
      }
      else if (discountResult.data != null) {
        setInitialRoute("Dashboard")
      }
      else if (restname == null) {
        setInitialRoute("Restaurant");
      }
      await AsyncStorage.setItem('outletName', outletName)
      const res = await api.getRestaurantDetails(token, userId)
      AsyncStorage.setItem('RestaurantName', res.data[0]?.restaurantName)
      //Compnay Admin Check
      if (roleId === constRoleId.COMPANY_ADMIN_ID) {
        await AsyncStorage.setItem('restaurantId', res.data[0].restaurantId)
      }
      let restaurantId = await AsyncStorage.getItem('restaurantId')


    }
    loginCheck();
  }, [initialRoute])

  //Version Check
  useEffect(async () => {
    checkLoginState()
  }, [true]);

  //retreiving data from local storage
  const checkLoginState = async () => {
    // retrieve the value of the user
    try {
      let jsonValue = await AsyncStorage.getItem('userInfo');
      let jsonValue2 = await AsyncStorage.getItem('userRegistrationInfo');
      let loginData = JSON.parse(String(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  //Method for navigating to login page
  const logout = async (navigation) => {
    await AsyncStorage.removeItem('userToken')
    await AsyncStorage.setItem('checkoutletId', '')
    await AsyncStorage.setItem('restaurantName', '')
    await AsyncStorage.setItem('RestaurantName', '')
    await AsyncStorage.setItem('outletName', '')
    navigation.navigate('Splash')  
  }

  //Logout popup alert
  const logoutAlert = (navigation) =>
    Alert.alert('Logout', 'Are you sure you want to Logout?', [
      {
        text: 'Cancel',
        onPress: () => {
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          logout(navigation); // Pass the navigation object here
        },
      },
    ]);

  /// Get Login User Details
  useEffect(() => {
    getUserDetails();
    checkPermissions();
    return () => {
      setData([]);
    }
  }, []);

  const getUserDetails = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let userId = loginData.userId
    let token = loginData.token;
    const result = await api.getAllMasterData(token, endPoint.GET_LOGIN_USER_DETAILS_BY_ID + userId);
    if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
    } else {
      setData(result.data);
    }
  }

  //Side Menu Permissions 
  const checkPermissions = async () => {
    const permissions = await AsyncStorage.getItem('permissions')
    const loginPermissions = JSON.parse(permissions)
    //Checking Permission for Outlets
    const fetchOutletsStatus = loginPermissions?.filter((item) => item.formId === formId.OUTLETS && item.isFormAccess === true)
    setOutletsPermissions(fetchOutletsStatus)
    //Checking Permissions for Modifiers
    const fetchMenuStatus = loginPermissions?.filter((item) => item.formId === formId.MODIFIERS && item.isFormAccess === true)
    setMenuPermissions(fetchMenuStatus)
    //Checking Permissions for Masters
    const fetchMastersStatus = loginPermissions?.filter((item) => item.formId === formId.MASTERS && item.isFormAccess === true)
    setMasterPermissions(fetchMastersStatus)
    //Checking Permissions for Itemstatus
    const fetchItemStatus = loginPermissions?.filter((item) => item.formId === formId.ITEMSTATUS && item.isFormAccess === true)
    setItemStatusPermissions(fetchItemStatus)
    //Checking Permissions for Discount
    const fetchDiscountStatus = loginPermissions?.filter((item) => item.formId === formId.DISCOUNTS && item.isFormAccess === true)
    setDiscountPermissions(fetchDiscountStatus)
    //Checking Permissions for Orderstatus
    const fetchOrderStatus = loginPermissions?.filter((item) => item.formId === formId.ORDERSTATUS && item.isFormAccess === true)
    setOrderStatusPermissions(fetchOrderStatus)
    //Checking Permissions for Section
    const fetchSectionsStatus = loginPermissions?.filter((item) => item.formId === formId.SECTION && item.isFormAccess === true)
    setSectionsPermissions(fetchSectionsStatus)
    //Checking Permissions for TableDetails
    const fetchTableDetailsStatus = loginPermissions?.filter((item) => item.formId === formId.TABLEDETAILS && item.isFormAccess === true)
    setTableDetailsPermissions(fetchTableDetailsStatus)
    //Checking Permissions for Tax
    const fetchTaxStatus = loginPermissions?.filter((item) => item.formId === formId.TAX && item.isFormAccess === true)
    setTaxPermissions(fetchTaxStatus)
    //Checking Permissions for PrintDesign
    const fetchPrintDesignStatus = loginPermissions?.filter((item) => item.formId === formId.PRINTDESIGN && item.isFormAccess === true)
    setPrintDesignPermissions(fetchPrintDesignStatus)
    //Checking Permissions for Role
    const fetchRoleStatus = loginPermissions?.filter((item) => item.formId === formId.ROLE && item.isFormAccess === true)
    setRolePermissions(fetchRoleStatus)
    //Checking Permissions for Users
    const fetchUserStatus = loginPermissions?.filter((item) => item.formId === formId.USERREGISTRATION && item.isFormAccess === true)
    setUserPermissions(fetchUserStatus)
    //Checking Permissions for Reposrts
    const fetchReportStatus = loginPermissions?.filter((item) => item.formId === formId.REPORTS && item.isFormAccess === true)
    setReportsPermissions(fetchReportStatus)
    AsyncStorage.setItem('RestaurantName', data?.userName)

  }

  function Dropdowncontent() {
    return (
      // {selected()}
      <TouchableOpacity onPress={() => selected()}>
      </TouchableOpacity>
    );
  }

  const selected = () => {
    if (!isSelected) {
      setSelection(false);
    } else {
      setSelection(true);
    }
  }

  //sidemenu
  const inventorySetup = () => {
    setsubmenunvg(false);
    setInventoryMenu(!inventorymenu);
    setusersettingmenu(false);
    setReportsmenu(false)
  }
  const submenunavigation = () => {
    setsubmenunvg(!submenunvg);
    setusersettingmenu(false);
    setInventoryMenu(false);
    setReportsmenu(false)

  }
  const usersettings = () => {
    setsubmenunvg(false);
    setusersettingmenu(!usersettingmenu);
    setInventoryMenu(false);
    setReportsmenu(false)
  }
  const profilesettings = () => {
    setprofilesettingmenu(!profilesettingmenu);
  }
  const reportssettings = () => {
    setReportsmenu(!reportsmenu);
    setInventoryMenu(false);
    setsubmenunvg(false);
    setusersettingmenu(false);
  }

  const Stack = createStackNavigator();

  function HomeStackNavigator({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Restaurant"
          component={SelectRestaurant}
        />
        <Stack.Screen name="Category" component={eleco}
          options={{
            headerTitle: (props: JSX.IntrinsicAttributes) => <LogoTitle {...props} />,
            headerShown: true,
            headerRight: () => {
              <View style={{ flex: 1, }}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={Images.setting}
                />
                <Image
                  style={{ width: 50, height: 50 }}
                  source={Images.default_avatar}
                />
              </View>
            }
          }}
        />
      </Stack.Navigator>
    );
  }
  const LabelTextMenu = ({ text }) => (
    <View style={styles.menuBlk}>
      <Text style={styles.drawerLabelSty}>
        {text}
      </Text>
    </View>
  )
  const LabelText = ({ text }) => (
    <View style={styles.menuBlk}>
      <Text style={styles.drawerLabelSty3}>
        {text}
      </Text>
    </View>
  )
  //Intial route Check
  return initialRoute !== null ? (
    
    <Drawer.Navigator initialRouteName={initialRoute as "Dashboard" | "Restaurant" | "MapAddingData"}
      useLegacyImplementation={false}
      screenOptions={{
        drawerPosition: "right",
        overlayColor: 'transparent',
        drawerStyle: {
          paddingVertical: 20,
          paddingHorizontal: 0,
          backgroundColor: '#fff',
          borderLeftColor: '#00000029',
          borderLeftWidth: 1,
        },
        drawerActiveBackgroundColor: 'white',
        drawerActiveTintColor: '#000',
      }}
      drawerContent={props => {
        {/*Sidemenu hide and display Modules by the userpermissions starts */ }
        return (
          <>
            <DrawerContentScrollView {...props}>

              {/*Data Setup Status Bar Starts*/}
              <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.proBtmBorder, styles.padB25, styles.marBtm20,]}>
                {/* <View style={[styles.editProIcon1]}> */}
                <Image
                  source={{ uri: `${data?.imagePath}` }}
                  style={styles.editProIcon}
                />
                {/* </View> */}
                <Text style={[styles.font16, styles.profileText, styles.mt14]}>
                  {data?.userName}
                </Text>

                <View style={[styles.sidemenuprogress, styles.wdth100]}>
                  {discountDataLength != null && productDataLength != null && supplierDataLength != null && stockDataLength != null ?
                    <View style={[styles.flexrow, styles.flexWrap]}>
                      <View style={styles.progressBar}>
                        <View style={[styles.progressView, { width: '100%' }]}></View>
                      </View>
                      <View style={[styles.flexrow, styles.justifyCenter, styles.width100per]}>
                        <TouchableOpacity onPress={() => navigation.navigate('MapAddingData')}><Text style={[styles.font12, styles.textBlack, styles.marTop5, styles.fontBold, styles.textCenter]}>Profile SetUp Completed</Text></TouchableOpacity>
                      </View>
                      <Text style={[styles.font11, styles.textBlack, styles.sidemenuCompletedAlign]}>100% Completed</Text>
                    </View> :
                    productDataLength != null && discountDataLength != null && supplierDataLength != null ?
                      <View style={[styles.flexrow, styles.flexWrap]}>
                        <View style={styles.progressBar}>
                          <View style={[styles.progressView, { width: '90%' }]}></View>
                        </View>
                        <View style={[styles.flexrow, styles.justifyCenter, styles.width100per]}>
                              <TouchableOpacity onPress={() => navigation.navigate('MapAddingData')}><Text style={[styles.font12, styles.textBlack, styles.marTop5, styles.fontBold, styles.textCenter]}>To Complete Profile Setup</Text></TouchableOpacity>
                            </View>
                        <Text style={[styles.font11, styles.textBlack, styles.sidemenuCompletedAlign]}>90% Completed</Text>
                      </View> :
                      productDataLength != null && discountDataLength != null ?
                        <View style={[styles.flexrow, styles.flexWrap]}>
                          <View style={styles.progressBar}>
                            <View style={[styles.progressView, { width: '80%' }]}></View>
                          </View>
                          <View style={[styles.flexrow, styles.justifyCenter, styles.width100per]}>
                              <TouchableOpacity onPress={() => navigation.navigate('MapAddingData')}><Text style={[styles.font12, styles.textBlack, styles.marTop5, styles.fontBold, styles.textCenter]}>To Complete Profile Setup</Text></TouchableOpacity>
                            </View>
                          <Text style={[styles.font11, styles.textBlack, styles.sidemenuCompletedAlign]}>80% Completed</Text>
                        </View> :
                        discountDataLength > 0 ?
                          <View style={[styles.flexrow, styles.flexWrap]}>
                            <View style={styles.progressBar}>
                              <View style={[styles.progressView, { width: '70%' }]}></View>
                            </View>
                            <View style={[styles.flexrow, styles.justifyCenter, styles.width100per]}>
                              <TouchableOpacity onPress={() => navigation.navigate('MapAddingData')}><Text style={[styles.font12, styles.textBlack, styles.marTop5, styles.fontBold, styles.textCenter]}>To Complete Profile Setup</Text></TouchableOpacity>
                            </View>
                            <Text style={[styles.font11, styles.textBlack, styles.sidemenuCompletedAlign]}>70% Completed</Text>
                          </View> : <TouchableOpacity onPress={() => navigation.navigate('MapAddingData')}><Text style={[styles.font12, styles.textBlack, styles.marTop5, styles.fontBold, styles.textCenter]}>To Complete Profile Setup</Text></TouchableOpacity>
                  }
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile')} style={[styles.editProfileBtn, styles.mt14]}><Text style={styles.textWhite}>Edit Profile</Text></TouchableOpacity>
              </View>
              {/*Data Setup Status Bar Ends*/}

              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || outletsPermissions[0]?.isFormAccess === true ?
                  <View>
                    <DrawerItem
                      label={() => (
                        <>
                          <View style={[styles.flexrow, styles.alignCenter]}>
                            <Outlet />
                            <Text style={[styles.drawerLabelSty, styles.padL12]}>
                              Outlets
                            </Text>
                          </View>
                        </>
                      )} onPress={() => navigation.navigate('AddOutlet')} />
                  </View> : null
                }
              </View>

              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || outletsPermissions[0]?.isFormAccess === true ?
                  <View>
                    <DrawerItem
                      label={() => (
                        <>
                          <View style={[styles.flexrow, styles.alignCenter]}>
                            <FloorPlanningIcon />
                            <Text style={[styles.drawerLabelSty, styles.padL12]}>
                              Floor Planning
                            </Text>
                          </View>
                        </>
                      )} onPress={() => navigation.navigate('FloorPlanning')} />
                  </View> : null
                }
              </View>

              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || menuPermissions[0]?.isFormAccess === true ?
                  <View>
                    <DrawerItem
                      label={() => (
                        <>
                          <View style={[styles.flexrow, styles.alignCenter]}>
                            <MenuIcon />
                            <Text style={[styles.drawerLabelSty, styles.padL12]}>
                              Menu
                            </Text>
                          </View>
                        </>
                      )} onPress={() => navigation.navigate('Menu')} />
                  </View> : null
                }
              </View>

              <DrawerItem
                label={() => (
                  <>
                    <View style={[styles.flexrow, styles.alignCenter]}>
                      <OrdersIcon />
                      <Text style={[styles.drawerLabelSty, styles.padL12]}>
                        Orders
                      </Text>
                    </View>
                  </>
                )} onPress={() => navigation.navigate('Orders')} />

              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || masterPermissions[0]?.isFormAccess === true ?
                  <View>
                    <DrawerItem
                      label={() => (
                        <>
                          <View style={[styles.flexrow, styles.justifyBetween, styles.alignCenter]}>
                            <View style={[styles.flexrow, styles.alignCenter]}>
                              <InventoryIcon />
                              <Text style={[styles.drawerLabelSty, styles.padL12]}>
                                Inventory
                              </Text>
                            </View>

                            {(inventorymenu == false) &&
                              <View><Image
                                source={(require('../../assets/images/dropdown.png'))}
                                style={styles.dropDownNotRot}
                                resizeMode='contain'
                              /></View>
                            }
                            {(inventorymenu == true) &&
                              <View><Image
                                source={(require('../../assets/images/dropdown.png'))}
                                style={styles.dropDownRot}
                                resizeMode='contain'
                              /></View>
                            }
                          </View>
                        </>
                      )} onPress={inventorySetup} />


                    {
                      (inventorymenu == true) && (
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText style={styles.drawerLabelSty3} text={"- Product"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty4}
                          onPress={() => navigation.navigate('ProductStock')} />
                      )
                    }


                    {
                      (inventorymenu == true) && (
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText style={styles.drawerLabelSty3} text={"- Supplier"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty4}
                          onPress={() => navigation.navigate('Supplierstock')} />
                      )
                    }
                    {
                      (inventorymenu == true) && (
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText style={styles.drawerLabelSty3} text={"- Order"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty4}
                          onPress={() => navigation.navigate('SupplierOrders')} />
                      )
                    }
                  </View> : null

                }

              </View>

              <DrawerItem
                label={() => (
                  <>
                    <View style={styles.menuBlk}>
                      <View style={[styles.flexrow, styles.alignCenter]}>
                        <DataSetupIcon />
                        <Text style={[styles.drawerLabelSty, styles.padL12]}>
                          Data Setup
                        </Text>
                      </View>
                      {(submenunvg == false) &&
                        <View><Image
                          source={(require('../../assets/images/dropdown.png'))}
                          style={styles.dropDownNotRot}
                          resizeMode='contain'
                        /></View>
                      }
                      {(submenunvg == true) &&
                        <View><Image
                          source={(require('../../assets/images/dropdown.png'))}
                          style={styles.dropDownRot}
                          resizeMode='contain'
                        /></View>
                      }
                    </View>
                  </>
                )} onPress={submenunavigation} />

              {
                (submenunvg == true) && (

                  <View>
                    {userRoleId === "61262a0f4d9ab38e75f63b4b" || userRoleId === constRoleId.COMPANY_ADMIN_ID || tableDetailsPermissions[0]?.isFormAccess === true ?
                      <View>
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- Category"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('Category')} />
                      </View> : null
                    }
                  </View>


                )
              }

              {/* {
                (submenunvg == true) && (

                  <View>
                    {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || itemStatusPermissions[0]?.isFormAccess === true ?
                      <View>
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText style={styles.drawerLabelSty3} text={"- Item Status"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty4}
                          onPress={() => navigation.navigate('ItemStatus')} />
                      </View> : null
                    }
                  </View>


                )
              } */}

              {
                (submenunvg == true) && (

                  <View>
                    {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || discountPermissions[0]?.isFormAccess === true ?
                      <View>
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- Discount"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('Discount')} />
                      </View> : null
                    }
                  </View>

                )
              }

              {/* {
                (submenunvg == true) && (

                  <View>
                    {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || discountPermissions[0]?.isFormAccess === true ?
                      <View>
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- PromoCode"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('PromoCode')} />
                      </View> : null
                    }
                  </View>

                )
              } */}

              {
                (submenunvg == true) && (
                  <View>
                    {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || orderStatusPermissions[0]?.isFormAccess === true ?
                      <View>
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- Order Status"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('OrderStatus')} />
                      </View> : null
                    }
                  </View>

                )
              }

              {
                (submenunvg == true) && (

                  <View>
                    {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || sectionsPermissions[0]?.isFormAccess === true ?
                      <View>
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- Sections"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('TableTypes')} />
                      </View> : null
                    }
                  </View>

                )
              }
              {
                (submenunvg == true) && (

                  <View>
                    {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || tableDetailsPermissions[0]?.isFormAccess === true ?
                      <View>
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- Table Details"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('TableDetail')} />
                      </View> : null
                    }
                  </View>


                )
              }
              {
                (submenunvg == true) && (

                  <View>
                    {userRoleId === "61262a0f4d9ab38e75f63b4b" || userRoleId === constRoleId.COMPANY_ADMIN_ID || tableDetailsPermissions[0]?.isFormAccess === true ?
                      <View>
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- Modifiers"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('Modifiers')} />
                      </View> : null
                    }
                  </View>


                )
              }
              {
                (submenunvg == true) && (
                  <View>
                    {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || taxPermissions[0]?.isFormAccess === true ?
                      <View>
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- Tax"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('Tax')} />
                      </View> : null

                    }
                  </View>

                )
              }

              {
                (submenunvg == true) && (

                  <View>
                    {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || printDesignPermissions[0]?.isFormAccess === true ?
                      <View>
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- Print Design"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('PrintDesign')} />
                      </View> : null

                    }
                  </View>

                )
              }

              <DrawerItem
                label={() => (
                  <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={[styles.flexrow, styles.alignCenter]}>
                        <UserSettingsIcon />
                        <Text style={[styles.drawerLabelSty, styles.padL12]}>
                          User Settings
                        </Text>
                      </View>
                      {(usersettingmenu == false) &&
                        <View><Image
                          source={(require('../../assets/images/dropdown.png'))}
                          style={styles.dropDownNotRot}
                          resizeMode='contain'
                        /></View>
                      }
                      {(usersettingmenu == true) &&
                        <View><Image
                          source={(require('../../assets/images/dropdown.png'))}
                          style={styles.dropDownRot}
                          resizeMode='contain'
                        /></View>
                      }
                    </View>
                  </>
                )} onPress={usersettings} />
              {
                (usersettingmenu == true) && (
                  <View>
                    {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || rolePermissions[0]?.isFormAccess === true ?
                      <View>
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- Role"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('Role')} />
                      </View> : null
                    }
                  </View>

                )
              }

              {
                (usersettingmenu == true) && (
                  <View>
                    {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || userPermissions[0]?.isFormAccess === true ?
                      <View>
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- Users"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('Users')} />
                      </View> : null
                    }
                  </View>

                )
              }

              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || reportsPermissions[0]?.isFormAccess === true ?
                  <View>
                    <DrawerItem
                      label={() => (
                        <>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={[styles.flexrow, styles.alignCenter]}>
                              <ReportIcon />
                              <Text style={[styles.drawerLabelSty, styles.padL12]}>
                                Reports
                              </Text>
                            </View>
                            {(reportsmenu == false) &&
                              <View><Image
                                source={(require('../../assets/images/dropdown.png'))}
                                style={styles.dropDownNotRot}
                                resizeMode='contain'
                              /></View>
                            }
                            {(reportsmenu == true) &&
                              <View><Image
                                source={(require('../../assets/images/dropdown.png'))}
                                style={styles.dropDownRot}
                                resizeMode='contain'
                              /></View>
                            }
                          </View>
                        </>
                      )} onPress={reportssettings} />
                    {
                      (reportsmenu == true) && (
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- Sales by Categories"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('salesbyCategories')} />
                      )
                    }
                    {
                      (reportsmenu == true) && (
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- Sales by Items"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('SalesbyItems')} />
                      )
                    }
                    {
                      (reportsmenu == true) && (
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- User Sales"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('userSales')} />
                      )
                    }
                    {
                      (reportsmenu == true) && (
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- Void Order"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('VoidOrder')} />
                      )
                    }
                    {
                      (reportsmenu == true) && (
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- Payments"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('PaymentsChart')} />
                      )
                    }
                    {
                      (reportsmenu == true) && (
                        <DrawerItem
                          label={() => (
                            <>
                              <LabelText text={"- Total Order Value"} />
                            </>
                          )}
                          labelStyle={styles.drawerLabelSty}
                          onPress={() => navigation.navigate('TotalOrderValue')} />
                      )
                    }
                  </View> : null
                }

              </View>

              <DrawerItem
                label={() => (
                  <>
                    <View style={[styles.flexrow, styles.alignCenter]}>
                      <LogoutIcon />
                      <Text style={[styles.drawerLabelSty, styles.padL12]}>
                        Logout
                      </Text>
                    </View>
                  </>
                )} onPress={logoutAlert} />
              <DrawerItem label={() => (
                <>
                  <View style={styles.versionContainer}>
                    <Text style={styles.verText}>
                      Version
                    </Text>
                    <Text style={[styles.verText, styles.padL5]}>
                      {version}
                    </Text>
                  </View></>
              )} 
              // onPress={function (): void {
              //   throw new Error('Function not implemented.');
              // }} 
              />

            </DrawerContentScrollView></>

        )
        {/*Sidemenu hide and display Modules by the userpermissions Ends */ }

      }}

    >
      {!(roleIddashboard === "1") && (
        <Drawer.Screen name="Dashboard" component={Dashboard} options={{
          headerShown: false,
          drawerLabel: "Dashboard",
          drawerLabelStyle: { ...styles.drawerLabelSty },
        }} />
      )}

      <Drawer.Screen name="Restaurant" component={SelectRestaurant} options={{
        headerShown: false,
        drawerLabel: "Select Restaurant",
        drawerItemStyle: { display: 'none' }
      }} />

      <Drawer.Screen name="SelectOutlet" component={SelectOutlet} options={{
        headerShown: false,
        drawerLabel: "Select Outlets",
        drawerItemStyle: { display: 'none' }

      }} />

      {/* <Drawer.Screen name="AddOutlet" component={AddOutlet} options={{
        headerShown: false,
        drawerLabel: "Outlets",

      }} /> */}
      <Drawer.Screen name="Dashboard" component={Dashboard} options={{
        headerShown: false,
        drawerLabel: "",
        drawerItemStyle: { display: 'none' }
      }} />

      <Drawer.Screen name="Menu" component={Menu} options={{
        headerShown: false,
        drawerLabel: "Menu",
        drawerLabelStyle: { ...styles.drawerLabelSty },

      }} />
      <Drawer.Screen name="Orders" component={Orders} options={{
        headerShown: false,
        drawerLabel: "Orders",
        drawerLabelStyle: { ...styles.drawerLabelSty },
      }} />
      <Drawer.Screen name="AddOutlet" component={AddOutlet} options={{
        headerShown: false,
        drawerLabel: "AddOutlet",
        drawerLabelStyle: { ...styles.drawerLabelSty },
      }} />
      <Drawer.Screen name="FloorPlanning" component={FloorPlanning} options={{
        headerShown: false,
        drawerLabel: "FloorPlanning",
        drawerLabelStyle: { ...styles.drawerLabelSty },
      }} />

      <Drawer.Screen name="DineIn" component={DineIn} options={{
        headerShown: false,
        drawerLabel: "",
        drawerItemStyle: { display: 'none' }
      }} />

      {/* take away */}
      <Drawer.Screen name="TakeAway" component={TakeAway} options={{
        headerShown: false,
        drawerLabel: "",
        drawerItemStyle: { display: 'none' }
      }} />
      {/* take away Ends */}

      {/* Online Starts */}
      <Drawer.Screen name="Online" component={Online} options={{
        headerShown: false,
        drawerLabel: "",
        drawerItemStyle: { display: 'none' }
      }} />
      {/* Online Ends */}
      <Drawer.Screen name="Inventory" component={Inventory} options={{
        headerShown: false,
        drawerLabel: "",
        drawerItemStyle: { display: 'none' }
      }} />
      <Drawer.Screen name="Category" component={Category} options={{
        headerShown: false,
        drawerLabel: "Category",
        drawerLabelStyle: { ...styles.drawerLabelSty },
      }} />
      <Drawer.Screen name="Items" component={Items} options={{
        headerShown: false,
        drawerLabel: "Items",
        drawerLabelStyle: { ...styles.drawerLabelSty },
      }} />
      <Drawer.Screen name="Kitchen" component={Kitchen} options={{
        headerShown: false,
        drawerLabel: "Kitchen",
        drawerLabelStyle: { ...styles.drawerLabelSty },
      }} />

<Drawer.Screen name="SideMenuHeaderMaster" component={SideMenuHeaderMaster} options={{
        headerShown: false,
        drawerLabel: "SideMenuHeaderMaster",
        drawerLabelStyle: { ...styles.drawerLabelSty },
      }} />

      <Drawer.Screen name="Bar" component={Bar} options={{
        headerShown: false,
        drawerLabel: "Bar",
        drawerLabelStyle: { ...styles.drawerLabelSty },
      }} />
      <Drawer.Screen name="ReportsDashboard" component={ReportsDashboard} options={{
        headerShown: false,
        drawerLabel: "ReportsDashboard",
        drawerLabelStyle: { ...styles.drawerLabelSty },
      }} />
      <Drawer.Screen name="MapAddingData" component={MapAddingData} options={{
        headerShown: false,
        drawerLabel: "MapAddingData",
        drawerLabelStyle: { ...styles.drawerLabelSty },
      }} />
      <Drawer.Screen name="ItemUpdateRecipe" component={ItemUpdateRecipe} options={{
        headerShown: false,
        drawerLabel: "ItemUpdateRecipe",
        drawerLabelStyle: { ...styles.drawerLabelSty },
      }} />
      <Drawer.Screen name="EditFormAccess" component={EditFormAccess} options={{
        headerShown: false,
        drawerLabel: "EditFormAccess",
        drawerLabelStyle: { ...styles.drawerLabelSty },
      }} />
      <Drawer.Screen name="ViewFormAccess" component={ViewFormAccess} options={{
        headerShown: false,
        drawerLabel: "ViewFormAccess",
        drawerLabelStyle: { ...styles.drawerLabelSty },
      }} />
      <Drawer.Screen name="ItemsRecipe" component={ItemsRecipe} options={{
        headerShown: false,
        drawerLabel: "ItemsRecipe",
        drawerLabelStyle: { ...styles.drawerLabelSty },
      }} />
      <Drawer.Screen name="UpdateProfile" component={UpdateProfile} options={{
        headerShown: false,
        drawerLabel: "UpdateProfile",
        drawerLabelStyle: { ...styles.drawerLabelSty },
      }} />
      <Drawer.Screen name="AddModifier" component={AddModifier} options={{
        headerShown: false,
        drawerLabel: "AddModifier",
        drawerLabelStyle: { ...styles.drawerLabelSty },
      }} />
      {
        (inventorymenu == true || inventorymenu == false) && (
          <Drawer.Screen name="ProductStock" component={Productstock} options={{
            headerShown: false,
            drawerLabel: "- Product/Stock",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {
        (inventorymenu == true) && (
          <Drawer.Screen name="SupplierOrders" component={SupplierOrders} options={{
            headerShown: false,
            drawerLabel: "- Orders",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {
        (inventorymenu == true || inventorymenu == false) && (
          <Drawer.Screen name="SupplierStock" component={Supplierstock} options={{
            headerShown: false,
            drawerLabel: "- Supplier",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }

      {
        (submenunvg == true) && (
          <Drawer.Screen name="ItemStatus" component={ItemStatus} options={{
            headerShown: false,
            drawerLabel: "- Item Status",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {
        (submenunvg == true) && (
          <Drawer.Screen name="Modifiers" component={Modifiers} options={{
            headerShown: false,
            drawerLabel: "- Modifiers",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {
        (submenunvg == true || submenunvg == false) && (
          <Drawer.Screen name="Discount" component={Discount} options={{
            headerShown: false,
            drawerLabel: "- Discount",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {
        (submenunvg == true || submenunvg == false) && (
          <Drawer.Screen name="PromoCode" component={PromoCode} options={{
            headerShown: false,
            drawerLabel: "- PromoCode",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {
        (submenunvg == true) && (
          <Drawer.Screen name="OrderStatus" component={OrderStatus} options={{
            headerShown: false,
            drawerLabel: "- Order Status",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {
        (submenunvg == true || submenunvg == false) && (
          <Drawer.Screen name="TableTypes" component={TableTypeList} options={{
            headerShown: false,
            drawerLabel: "- Sections",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {
        (submenunvg == true || submenunvg == false) && (
          <Drawer.Screen name="TableDetail" component={TableDetails} options={{
            headerShown: false,
            drawerLabel: "- Table Details",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {/* {
        (submenunvg == true || submenunvg == false) && (
          <Drawer.Screen name="Modifiers" component={Modifiers} options={{
            headerShown: false,
            drawerLabel: "- Modifiers",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      } */}
      {
        (submenunvg == true || submenunvg == false) && (
          <Drawer.Screen name="Tax" component={Tax} options={{
            headerShown: false,
            drawerLabel: "- Tax",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {
        (submenunvg == true) && (
          <Drawer.Screen name="TaxSetUp" component={TaxSetUp} options={{
            headerShown: false,
            drawerLabel: "- Tax SetUp",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {/* {
        (submenunvg == true) && (
          <Drawer.Screen name="PrintDesign" component={PrintDesign} options={{
            headerShown: false,
            drawerLabel: "- Print Design",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      } */}
      {
        (usersettingmenu == true) && (
          <Drawer.Screen name="Role" component={Role} options={{
            headerShown: false,
            drawerLabel: "- Role",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {

        (usersettingmenu == true) && (
          <Drawer.Screen name="Users" component={Users} options={{
            headerShown: false,
            drawerLabel: "- Users",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {
        (reportsmenu == true) && (
          <Drawer.Screen name="salesbyCategories" component={salesbyCategories} options={{
            headerShown: false,
            drawerLabel: "- Sales by Categories",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {
        (reportsmenu == true) && (
          <Drawer.Screen name="SalesbyItems" component={SalesbyItems} options={{
            headerShown: false,
            drawerLabel: "- Sales by Items",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {
        (reportsmenu == true) && (
          <Drawer.Screen name="userSales" component={userSales} options={{
            headerShown: false,
            drawerLabel: "- User Sales",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {
        (reportsmenu == true) && (
          <Drawer.Screen name="VoidOrder" component={VoidOrder} options={{
            headerShown: false,
            drawerLabel: "- Void Order",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {
        (reportsmenu == true) && (
          <Drawer.Screen name="PaymentsChart" component={PaymentsChart} options={{
            headerShown: false,
            drawerLabel: "- Payments",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
      {
        (reportsmenu == true) && (
          <Drawer.Screen name="TotalOrderValue" component={TotalOrderValue} options={{
            headerShown: false,
            drawerLabel: "- Total Order Value",
            drawerLabelStyle: { ...styles.drawerLabelSty1 },
          }} />
        )
      }
    </Drawer.Navigator>

  ) : null

}
