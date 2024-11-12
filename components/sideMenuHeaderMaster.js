import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar } from 'react-native-paper';
import styles from '../assets/css/style';
import BarIcon from '../assets/images/bar.js';
import DashboardIcon from '../assets/images/dashbord.js';
import DineInIcon from '../assets/images/dine_in.js';
import InvenIcon from '../assets/images/inventory_icon.js';
import KitchenIcon from '../assets/images/kitchen_icon.js';
import OnlineIcon from '../assets/images/Online.js';
import ReportIcon from '../assets/images/Report Icon';
import TakeAwayIcon from '../assets/images/take_away.js';
import { formId } from '../screens/common/FormIdConstants'
import { constRoleId } from "../screens/common/RoleConstants"

export default function SideMenuHeaderMaster({ heading }) {
  const navigation = useNavigation();  // Use the navigation hook to get access to navigation

  const [outletName, setOutlet] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [outletAddress, setAddress] = useState('');
  const [outletId, setOutletId] = useState('');
  const isFocused = useIsFocused();
  const [userRoleId, setUserRoleId] = useState('');
  const [userPermissions, setUserPermissions] = useState([]);
  
  // Permissions states
  const [dashboardPermission, setDashBoardPermission] = useState([]);
  const [dineInPermission, setDineInPermission] = useState([]);
  const [takeAwayPermission, setTakeAwayPermission] = useState([]);
  const [onlinePermission, setOnlinePermission] = useState([]);
  const [kitchenPermission, setKitchenPermission] = useState([]);
  const [reportsPermission, setReportsPermission] = useState([]);
  const [barPermission, setBarPermission] = useState([]);
  const [mastersPermission, setMastersPermission] = useState([]);
  
  const [restName, setRestName] = useState('');
  const [rest2Name, setRest2Name] = useState('');

  // Get restaurant and permissions data
  useEffect(() => {
    checkPermissions();
    getRestaurant();
    setTimeout(() => getRestaurant(), 1000);
  }, [isFocused]);

  const getRestaurant = async () => {
    const permissions = await AsyncStorage.getItem('permissions');
    const loginPermissions = JSON.parse(permissions);
    setUserPermissions(loginPermissions);

    const userRoleId = await AsyncStorage.getItem('userRoleId');
    setUserRoleId(userRoleId);

    const jsonValue = await AsyncStorage.getItem('userInfo');
    let loginData = JSON.parse(jsonValue);
    const restaurantName = await AsyncStorage.getItem('restaurantName');
    const outletName = await AsyncStorage.getItem('outletName');
    const outletAddress = await AsyncStorage.getItem('outletAddress');
    const outletId = await AsyncStorage.getItem('restaurantId');
    
    setOutletId(outletId);
    setRestaurantName(restaurantName);
    setOutlet(outletName);
    setAddress(outletAddress);
    setRestName(await AsyncStorage.getItem('RestaurantName'));
  };

  const checkPermissions = async () => {
    const permissions = await AsyncStorage.getItem('permissions');
    const loginPermissions = JSON.parse(permissions);

    setDashBoardPermission(loginPermissions.filter((item) => item.formId === formId.DASHBOARD && item.isFormAccess === true));
    setDineInPermission(loginPermissions.filter((item) => item.formId === formId.DINEIN && item.isFormAccess === true));
    setTakeAwayPermission(loginPermissions.filter((item) => item.formId === formId.TAKEAWAY && item.isFormAccess === true));
    setOnlinePermission(loginPermissions.filter((item) => item.formId === formId.ONLINE && item.isFormAccess === true));
    setMastersPermission(loginPermissions.filter((item) => item.formId === formId.MASTERS && item.isFormAccess === true));
    setKitchenPermission(loginPermissions.filter((item) => item.formId === formId.KITCHEN && item.isFormAccess === true));
    setBarPermission(loginPermissions.filter((item) => item.formId === formId.BAR && item.isFormAccess === true));
    setReportsPermission(loginPermissions.filter((item) => item.formId === formId.REPORTS && item.isFormAccess === true));
  };

  return (
    <>
      <View style={[styles.waterheader, styles.headerBlk]}>

        <View style={styles.headerFlexCenter}>
          <View style={[styles.headerFlexCenter, styles.headerLeftSec, styles.headerRightBorder]}>
            <Image style={styles.headerLogo} source={require('../assets/images/logo.png')} />
            {userRoleId === constRoleId.PRODUCT_ADMIN_ID ? (
              <View>
                <View>
                  <View style={styles.headerFlexCenter}>
                    <TouchableOpacity onPress={() => navigation.navigate('Restaurant')} style={[styles.resFlex, styles.headingMargin]}>
                      <Text style={[styles.headingText]}>{restaurantName}</Text>
                      <Image style={styles.dropDownIcon} source={require('../assets/images/chevron_left.png')} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.headerFlexCenter}>
                    <TouchableOpacity onPress={() => navigation.navigate('SelectOutlet', { outletId: outletId })} style={[styles.resFlex, styles.headingMargin]}>
                      <Text ellipsizeMode='tail' numberOfLines={1} style={[styles.headingText, styles.width100px]}>{outletName}</Text>
                      <Image style={styles.dropDownIcon} source={require('../assets/images/chevron_left.png')} />
                    </TouchableOpacity>
                    <View style={[styles.headerFlexCenter, styles.online]}>
                      <View style={styles.onlineCircle}></View>
                      <Text style={styles.onlineText}>Online</Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <View style={styles.headerFlexCenter}>
                  <Text style={[styles.headingText]}>{restName}</Text>
                  <Image style={styles.dropDownIcon} source={require('../assets/images/chevron_left.png')} />
                </View>
                <View style={styles.headerFlexCenter}>
                  <TouchableOpacity onPress={() => navigation.navigate('SelectOutlet', { outletId: outletId })} style={[styles.resFlex, styles.headingMargin]}>
                    <Text ellipsizeMode='tail' numberOfLines={1} style={[styles.headingText, styles.width100px]}>{outletName}</Text>
                    <Image style={styles.dropDownIcon} source={require('../assets/images/chevron_left.png')} />
                  </TouchableOpacity>
                  <View style={[styles.headerFlexCenter, styles.online]}>
                    <View style={styles.onlineCircle}></View>
                    <Text style={styles.onlineText}>Online</Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={styles.dashboardMenuHeader}>

            {/* Permissions-based rendering */}
            {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || dashboardPermission[0]?.isFormAccess === true ? (
              <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                  <DashboardIcon />
                  <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Dashboard</Text>
                </View>
              </TouchableOpacity>
            ) : null}

            <View>
              {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || dineInPermission[0]?.isFormAccess === true ?
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

            <View>
              {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || takeAwayPermission[0]?.isFormAccess === true ?
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate('TakeAway')}>
                    <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                      <TakeAwayIcon />
                      <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Take Away</Text>
                    </View>
                  </TouchableOpacity>
                </View> : null
              }
            </View>

            <View>
              {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || onlinePermission[0]?.isFormAccess === true ?
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

            <View>
              {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || mastersPermission[0]?.isFormAccess === true ?
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

            <View>
              {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || kitchenPermission[0]?.isFormAccess ?
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

            <View>
              {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || barPermission[0]?.isFormAccess === true ?
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
            <View>
              {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID || reportsPermission[0]?.isFormAccess === true ?
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

        {/* Menu icon to open the drawer */}
        <View style={styles.headerFlexCenter}>
          <Appbar.Action 
            style={{ alignSelf: 'flex-end' }} 
            icon="menu" 
            onPress={() => navigation.navigate('SideMenu')} // Open the drawer when menu icon is clicked
          />
        </View>

      </View>
    </>
  );
}
