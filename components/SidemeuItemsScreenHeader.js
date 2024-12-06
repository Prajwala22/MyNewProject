import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar } from 'react-native-paper';
import styless from '../assets/css/style.js';
import BarIcon from '../assets/images/bar.js';
import DashboardIcon from '../assets/images/dashbord.js';
import DineInIcon from '../assets/images/dine_in.js';
import InvenIcon from '../assets/images/inventory_icon.js';
import KitchenIcon from '../assets/images/kitchen_icon.js';
import OnlineIcon from '../assets/images/Online.js';
import ReportIcon from '../assets/images/Report Icon.js';
import TakeAwayIcon from '../assets/images/take_away.js';
import { constRoleId } from './../screens/common/RoleConstants'
import { formId } from '../screens/common/FormIdConstants';





export default function SidemeuItemsScreenHeader({ heading, ...props }) {
  const navigation = useNavigation();
  const [outletName, setOutlet] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [outletAddress, setAddress] = useState('');
  const [outletId, setOutletId] = useState('');
  const isFocused = useIsFocused();
  const [touchbilitydisable, setTouchbilitydisable] = useState(true);
  const [checkrestaurent, setcheckrestaurent] = useState('');
  const [checkoutletid, setcheckoutletid] = useState('');
  const [userRoleId, setuserRoleId] = useState('')
  const [userPermissions, setUserPermissions] = useState([])

  const [dashboardPermission, setDashBoardPermission] = useState([])
  const [dineInPermission, setDineInPermission] = useState([])
  const [takeAwayPermission, setTakeAwayPermission] = useState([])
  const [onlinePermission, setOnlinePermission] = useState([])
  const [kitchenPermission, setKitchenPermission] = useState([])
  const [reportsPermission, setReportsPermission] = useState([])
  const [barPermission, setBarPermission] = useState([])
  const [mastersPermission, setMastersPermission] = useState([])
  const [restName, setRestName] = useState('')
  // const [isDataPresent, setDataPreset] = useState('false');

  /// Get the category list
  useEffect(() => {
    getRestaurant();
    checkPermissions();
    setTimeout(() => getRestaurant(), 1000);
  }, [isFocused]);

  const getRestaurant = async () => {
    const permissions = await AsyncStorage.getItem('permissions')
    const loginPermissions = JSON.parse(permissions)
    setUserPermissions(loginPermissions)
    const userRoleId = await AsyncStorage.getItem('userRoleId')
    setuserRoleId(userRoleId)
    const jsonValue = await AsyncStorage.getItem('userInfo')
    console.log(jsonValue,"jsonValuejsonValue")
    let loginData = JSON.parse(jsonValue);
    let roleName = loginData.roleName
    const restaurantName = await AsyncStorage.getItem('restaurantName')
    const outletName = await AsyncStorage.getItem('outletName')
    const outletAddress = await AsyncStorage.getItem('outletAddress')
    const outletid = await AsyncStorage.getItem('restaurantId')
    console.log(outletid,"outletidoutletid")
    const checkoutletid = await AsyncStorage.getItem('checkoutletId')
    const prodRestName = await AsyncStorage.getItem('RestaurantName')
    setRestName(prodRestName)
    setOutletId(outletid)
    setRestaurantName(restaurantName)
    setOutlet(outletName)
    setAddress(outletAddress)
    setcheckrestaurent(restaurantName)
    setcheckoutletid(checkoutletid)

  }

  useEffect(async () => {
    if (checkrestaurent && checkoutletid) {
      setTouchbilitydisable(true)
    }
    else if (checkoutletid) {
      setTouchbilitydisable(false)

    }
    else if (checkrestaurent) {
      setTouchbilitydisable(false)
    }
  }, []);

  const callRestaturent = async () => {
    navigation.navigate('Restaurant', {
      otherParam: 'Restaurantexist'
    })
  }

  const checkPermissions = async () => {
    const permissions = await AsyncStorage.getItem('permissions')
    const loginPermissions = JSON.parse(permissions)
    //Checking Permissions for Dashboard
    const fetchDashboardStatus = loginPermissions.filter((item) => item.formId === formId.DASHBOARD && item.isFormAccess === true)
    setDashBoardPermission(fetchDashboardStatus)
    
    //Checking Permissions for DIne In
    const fetchDineInStatus = loginPermissions.filter((item) => item.formId === formId.DINEIN && item.isFormAccess === true)
    setDineInPermission(fetchDineInStatus)
    
    //Checking Permissions for Take Away
    const fetchTakeAwayStatus = loginPermissions.filter((item) => item.formId === formId.TAKEAWAY && item.isFormAccess === true)
    setTakeAwayPermission(fetchTakeAwayStatus)

    //Checking Permissions for Online
    const fetchOnlineStatus = loginPermissions.filter((item) => item.formId === formId.ONLINE && item.isFormAccess === true)
    setOnlinePermission(fetchOnlineStatus)

    //Checking Permissions for Masters
    const fetchInventoryStatus = loginPermissions.filter((item) => item.formId === formId.MASTERS && item.isFormAccess === true)
    setMastersPermission(fetchInventoryStatus)

    //Checking Permissions for Kitchen
    const fetchKitchenStatus = loginPermissions.filter((item) => item.formId === formId.KITCHEN && item.isFormAccess === true)
    setKitchenPermission(fetchKitchenStatus)

    //Checking Permissions for Bar
    const fetchBarStatus = loginPermissions.filter((item) => item.formId === formId.BAR && item.isFormAccess === true)
    setBarPermission(fetchBarStatus)

    //Checking Permissions for Reports
    const fetchReportsStatus = loginPermissions.filter((item) => item.formId === formId.REPORTS && item.isFormAccess === true)
    setReportsPermission(fetchReportsStatus)

  }

  return (
    <View style={[styless.waterheader, styless.headerBlk]}>
      <View style={styless.headerFlexCenter}>
        <View style={[styless.headerFlexCenter, styless.headerLeftSec]}>
          <Image style={styless.headerLogo} source={(require('../assets/images/logo.png'))} />
          {userRoleId === constRoleId.PRODUCT_ADMIN_ID ?
            <View>

              <View style={styless.headerFlexCenter}>
                <TouchableOpacity onPress={() => callRestaturent()} style={[styless.resFlex, styless.headingMargin]}>
                  <Text style={[styless.headingText]}>{restaurantName}</Text>
                  <Image style={styless.dropDownIcon} source={(require('../assets/images/chevron_left.png'))} />
                </TouchableOpacity>
              </View>

              <View style={styless.headerFlexCenter}>
                <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('SelectOutlet', { outletId: outletId })} style={[styless.resFlex, styless.headingMargin]}>
                  <Text ellipsizeMode='tail' numberOfLines={1} style={[styless.headingText, styless.width100px]}>{outletName}</Text>
                  <Image style={styless.dropDownIcon} source={(require('../assets/images/chevron_left.png'))} />
                </TouchableOpacity>
                <View style={[styless.headerFlexCenter, styless.online]}>
                  <View style={styless.onlineCircle}></View>
                  <Text style={styless.onlineText}>Online</Text>
                </View>
              </View>

            </View>
            :
            userRoleId === constRoleId.COMPANY_ADMIN_ID ?
              <View>
                <View style={styless.headerFlexCenter}>
                  <Text style={[styless.headingText]}>{restName}</Text>
                  <Image style={styless.dropDownIcon} source={(require('../assets/images/chevron_left.png'))} />
                </View>
                <View style={styless.headerFlexCenter}>
                  <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('SelectOutlet', { outletId: outletId })} style={[styless.resFlex, styless.headingMargin]}>
                    <Text ellipsizeMode='tail' numberOfLines={1} style={[styless.headingText, styless.width100px]} onPress={() => navigation.navigate('SelectOutlet', { outletId: outletId })}>{outletName}</Text>
                    <Image style={styless.dropDownIcon} source={(require('../assets/images/chevron_left.png'))} />
                  </TouchableOpacity>
                  <View style={[styless.headerFlexCenter, styless.online]}>
                    <View style={styless.onlineCircle}></View>
                    <Text style={styless.onlineText}>Online</Text>
                  </View>
                </View>
              </View>
              : null

          }
        </View>

        <View style={styless.dashboardMenuHeader}>

          <View>
            {dashboardPermission[0]?.isFormAccess === true ?
              <View>
                <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('Dashboard')}>
                  <View style={[styless.dashboardHeader, styless.headerRightBorder]}>
                    <DashboardIcon />

                    <Text style={[styless.font13, styless.menuText, styless.fontBold, styless.padtop5]}>Dashboard</Text>
                  </View>
                </TouchableOpacity>
              </View> : userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
                <View>
                  <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('Dashboard')}>
                    <View style={[styless.dashboardHeader, styless.headerRightBorder]}>
                      <DashboardIcon />

                      <Text style={[styless.font13, styless.menuText, styless.fontBold, styless.padtop5]}>Dashboard</Text>
                    </View>
                  </TouchableOpacity>
                </View> : null
            }
          </View>

          <View>
            {dineInPermission[0]?.isFormAccess === true ?
              <View>
                <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('DineIn')}>
                  <View style={[styless.dashboardHeader, styless.headerRightBorder]}>
                    <DineInIcon />
                    <Text style={[styless.font13, styless.menuText, styless.fontBold, styless.padtop5]}>Dine In</Text>
                  </View>
                </TouchableOpacity>
              </View> : userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
                <View>
                  <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('DineIn')}>
                    <View style={[styless.dashboardHeader, styless.headerRightBorder]}>
                      <DineInIcon />

                      <Text style={[styless.font13, styless.menuText, styless.fontBold, styless.padtop5]}>Dine In</Text>
                    </View>
                  </TouchableOpacity>
                </View> : null
            }
          </View>

          <View>
            {takeAwayPermission[0]?.isFormAccess === true ?
              <View>
                <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('TakeAway')}>
                  <View style={[styless.dashboardHeader, styless.headerRightBorder]}>
                    <TakeAwayIcon />
                    <Text style={[styless.font13, styless.menuText, styless.fontBold, styless.padtop5]}>Take Away</Text>
                  </View>
                </TouchableOpacity>
              </View> : userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
                <View>
                  <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('TakeAway')}>
                    <View style={[styless.dashboardHeader, styless.headerRightBorder]}>
                      <TakeAwayIcon />

                      <Text style={[styless.font13, styless.menuText, styless.fontBold, styless.padtop5]}>Take Away</Text>
                    </View>
                  </TouchableOpacity>
                </View> : null
            }
          </View>

          <View>
            {onlinePermission[0]?.isFormAccess === true ?
              <View>
                <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('Online')}>
                  <View style={[styless.dashboardHeader, styless.headerRightBorder]}>
                    <OnlineIcon />
                    <Text style={[styless.font13, styless.menuText, styless.fontBold, styless.padtop5]}>Online</Text>
                  </View>
                </TouchableOpacity>
              </View> : userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
                <View>
                  <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('Online')}>
                    <View style={[styless.dashboardHeader, styless.headerRightBorder]}>
                      <OnlineIcon />

                      <Text style={[styless.font13, styless.menuText, styless.fontBold, styless.padtop5]}>Online</Text>
                    </View>
                  </TouchableOpacity>
                </View> : null
            }
          </View>

          <View>
            {mastersPermission[0]?.isFormAccess === true ?
              <View>
                <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('Inventory')}>
                  <View style={[styless.dashboardHeader, styless.headerRightBorder, styless.headerLeftBorder]}>
                    <InvenIcon />
                    <Text style={[styless.font13, styless.menuText, styless.fontBold, styless.padtop5]}>Inventory</Text>
                  </View>
                </TouchableOpacity>
              </View> : userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
                <View>
                  <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('Inventory')}>
                    <View style={[styless.dashboardHeader, styless.headerRightBorder]}>
                      <InvenIcon />
                      <Text style={[styless.font13, styless.menuText, styless.fontBold, styless.padtop5]}>Inventory</Text>
                    </View>
                  </TouchableOpacity>
                </View> : null
            }
          </View>

          <View>
            {kitchenPermission[0]?.isFormAccess ?
              <View>
                <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('Kitchen')}>
                  <View style={[styless.dashboardHeader, styless.headerRightBorder]}>
                    <KitchenIcon />
                    <Text style={[styless.font13, styless.menuText, styless.fontBold, styless.padtop5]}>Kitchen</Text>
                  </View>
                </TouchableOpacity>
              </View> : userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
                <View>
                  <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('Kitchen')}>
                    <View style={[styless.dashboardHeader, styless.headerRightBorder]}>
                      <KitchenIcon />
                      <Text style={[styless.font13, styless.menuText, styless.fontBold, styless.padtop5]}>Kitchen</Text>
                    </View>
                  </TouchableOpacity>
                </View> : null
            }
          </View>

          <View>
            {barPermission[0]?.isFormAccess === true ?
              <View>
                <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('Bar')}>
                  <View style={[styless.dashboardHeader, styless.headerRightBorder]}>
                    <BarIcon />
                    <Text style={[styless.font13, styless.menuText, styless.fontBold, styless.padtop5]}>Bar</Text>
                  </View>
                </TouchableOpacity>
              </View> : userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
                <View>
                  <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('Bar')}>
                    <View style={[styless.dashboardHeader, styless.headerRightBorder]}>
                      <BarIcon />
                      <Text style={[styless.font13, styless.menuText, styless.fontBold, styless.padtop5]}>Bar</Text>
                    </View>
                  </TouchableOpacity>
                </View> : null
            }
          </View>

          <View>
            {reportsPermission[0]?.isFormAccess === true ?
              <View>
                <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('ReportsDashboard')}>
                  <View style={[styless.dashboardHeader]}>
                    <ReportIcon />
                    <Text style={[styless.font13, styless.menuText, styless.fontBold, styless.padtop5]}>Reports</Text>
                  </View>
                </TouchableOpacity>
              </View> : userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
                <View>
                  <TouchableOpacity disabled={touchbilitydisable} onPress={() => navigation.navigate('ReportsDashboard')}>
                    <View style={[styless.dashboardHeader, styless.headerRightBorder]}>
                      <ReportIcon />
                      <Text style={[styless.font13, styless.menuText, styless.fontBold, styless.padtop5]}>Reports</Text>
                    </View>
                  </TouchableOpacity>
                </View> : null
            }
          </View>

        </View>

      </View>

      {/* profil and setings icon */}
      <View style={styless.headerFlexCenter}>
        <View>
          <Appbar.Action style={{ alignSelf: 'flex-end' }}
            icon='menu'

            onPress={() => navigation.openDrawer()}
            {...props}
          />
        </View>
      </View>
      {/* profil and setings icon */}
    </View>
  )
}

const styles = StyleSheet.create({
  bottom: {
    flex: 0.2,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 50,
  },
  headerTitle: {
    flex: 0.8,
    position: 'relative',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },

})