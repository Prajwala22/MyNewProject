import React, { createContext, useReducer, useMemo, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen.js';
import IntroScreen from './screens/IntroScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPassword from './screens/ForgotPassword';
import UserRegistration from './screens/UserRegistration';
import SideMenu from './screens/orders/SideMenu';
import Dashboard from './screens/dashboard/Dashboard';
import DineIn from './screens/orders/DineIn';
import TakeAway from './screens/orders/TakeAway';
import Orders from './screens/orders/Orders';
import Online from './screens/orders/Online';
import Inventory from './screens/orders/Inventory';
import Kitchen from './screens/orders/Kitchen';
import Bar from './screens/orders/Bar';
import ReportsDashboard from './screens/dashboard/ReportsDashboard';
import MapAddingData from './screens/initialSetup/MapAddingData';
import SelectOutlet from './screens/initialSetup/SelectOutLet';
import UpdateProfile from './screens/UpdateProfile';
import AddOutlet from './screens/masters/AddOutlet';
import Discount from './screens/masters/Discount';
import FloorPlanning from './screens/masters/FloorPlanning';
import MenuCategory from './screens/masters/Menu';
import ItemsRecipe from './screens/masters/itemsRecipe';
import AddModifier from './screens/masters/AddModifier';
import Productstock from './screens/home/Productstock';
import Supplierstock from './screens/home/Supplierstock';
import SupplierOrders from './screens/home/SupplierOrders';
import Category from './screens/masters/Category';
import OrderStatus from './screens/masters/OrderStatus';
import TableTypes from './screens/masters/TableTypeList';
import TableDetail from './screens/masters/TableDetails';
import Tax from './screens/masters/Tax';
import EditFormAccess from './screens/home/EditFormAccess';
// import PrintDesign from './screens/home/PrintDesign';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Role from './screens/Role';
import Users from './screens/Users';
import SalesbyItems from './screens/dashboard/SalesbyItems';
import salesbyCategories from './screens/dashboard/salesbycategories';
import TotalOrderValue from './screens/dashboard/TotalOrderValue';
import PaymentsChart from './screens/dashboard/PaymentsChart';
import userSales from './screens/dashboard/userSales';
import VoidOrder from './screens/dashboard/VoidOrder';
import ItemStatus from './screens/masters/ViewItemStatus';
import TaxSetUp from './screens/masters/TaxSetUp'
import SelectRestaurant from './screens/initialSetup/SelectRestaurant';
import Items from './screens/masters/Items';
import ItemUpdateRecipe from './screens/masters/ItemUpdateRecipe';
import PromoCode from './screens/masters/PromoCode';
import api from './services/api/callingApi.js';

const Stack = createStackNavigator();
export const AuthContext = createContext();

export default function App() {
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return { ...prevState, userToken: action.token, isLoading: false };
      case 'SIGN_IN':
        return { ...prevState, isSignout: false, userToken: action.token };
      case 'SIGN_OUT':
        return { ...prevState, isSignout: true, userToken: null };
      default:
        return prevState;
    }
  }, { isLoading: true, isSignout: false, userToken: null });

  useEffect(() => {
    const interval = setInterval(() => {
      refreshTokenAPI();
    }, 50000); // refresh token every 50 seconds
    return () => clearInterval(interval);
  }, []);

  const refreshTokenAPI = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo');
      if (jsonValue) {
        const loginData = JSON.parse(jsonValue);
        const { username, password } = loginData;
        const result = await api.RefreshTokenGenerator(username, password);

        if (result?.data?.token) {
          const newToken = result.data.token;
          const updatedUserData = {
            ...loginData,
            token: newToken,
            address: result.data.address,
            joiningDate: result.data.joiningDate,
            image: result.data.image,
            idCardNo: result.data.idCardNo,
            voidPassword: result.data.voidPassword
          };
          storeData(updatedUserData);
          dispatch({ type: 'SIGN_IN', token: newToken });
        }
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('userRefreshInfo', jsonValue);
    } catch (e) {
      console.error("Error storing refreshed token:", e);
    }
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.error("Failed to load token:", e);
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(() => ({
    signIn: async (data, navigation) => {
      const userToken = data;
      await AsyncStorage.setItem('userToken', userToken);
      dispatch({ type: 'SIGN_IN', token: userToken });
      navigation.navigate('SideMenu');
    },
    signOut: async (data, navigation) => {
      try {
        await AsyncStorage.removeItem('userToken');
        dispatch({ type: 'SIGN_OUT' });
        if (navigation) {
          navigation.navigate('SplashScreen');
        }
      } catch (error) {
        console.error("Sign out error: ", error);
      }
    },
    signUp: async (data) => {
      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    },
  }), []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            <>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Intro" component={IntroScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="UserRegistration" component={UserRegistration} />
            </>
          ) : (
            <>
              <Stack.Screen name="SideMenu" component={SideMenu} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="DineIn" component={DineIn} />
<Stack.Screen name="TakeAway" component={TakeAway} />
<Stack.Screen name="Orders" component={Orders} />
<Stack.Screen name="Online" component={Online} />
<Stack.Screen name="Inventory" component={Inventory} />
<Stack.Screen name="Kitchen" component={Kitchen} />
<Stack.Screen name="Bar" component={Bar} />
<Stack.Screen name="ReportsDashboard" component={ReportsDashboard} />
<Stack.Screen name="MapAddingData" component={MapAddingData} />
<Stack.Screen name="SelectOutlet" component={SelectOutlet} />
<Stack.Screen name="UpdateProfile" component={UpdateProfile} />
<Stack.Screen name="AddOutlet" component={AddOutlet} />
<Stack.Screen name="Discount" component={Discount} />
<Stack.Screen name="FloorPlanning" component={FloorPlanning} />
<Stack.Screen name="MenuCategory" component={MenuCategory} />
<Stack.Screen name="ItemsRecipe" component={ItemsRecipe} />
<Stack.Screen name="AddModifier" component={AddModifier} />
<Stack.Screen name="Productstock" component={Productstock} />
<Stack.Screen name="Supplierstock" component={Supplierstock} />
<Stack.Screen name="SupplierOrders" component={SupplierOrders} />
<Stack.Screen name="Category" component={Category} />
<Stack.Screen name="OrderStatus" component={OrderStatus} />
<Stack.Screen name="TableTypes" component={TableTypes} />
<Stack.Screen name="TableDetail" component={TableDetail} />
<Stack.Screen name="Tax" component={Tax} />
<Stack.Screen name="Role" component={Role} />
<Stack.Screen name="Users" component={Users} />
<Stack.Screen name="SalesbyItems" component={SalesbyItems} />
<Stack.Screen name="salesbyCategories" component={salesbyCategories} />
<Stack.Screen name="TotalOrderValue" component={TotalOrderValue} />
<Stack.Screen name="PaymentsChart" component={PaymentsChart} />
<Stack.Screen name="userSales" component={userSales} />
<Stack.Screen name="VoidOrder" component={VoidOrder} />
<Stack.Screen name="ItemStatus" component={ItemStatus} />
<Stack.Screen name="TaxSetUp" component={TaxSetUp} />
<Stack.Screen name="SelectRestaurant" component={SelectRestaurant} />
<Stack.Screen name="EditFormAccess" component={EditFormAccess} />
<Stack.Screen name="Items" component={Items} />
<Stack.Screen name="ItemUpdateRecipe" component={ItemUpdateRecipe} />
<Stack.Screen name="PromoCode" component={PromoCode} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
