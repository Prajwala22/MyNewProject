import React, { createContext, useReducer, useMemo, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SplashScreen from './screens/SplashScreen.js';
import IntroScreen from './screens/IntroScreen';
import LoginScreen from './screens/LoginScreen';
import SideMenu from './screens/orders/SideMenu';
import Dashboard from './screens/dashboard/Dashboard';
import api from './services/api/callingApi.js';
import ForgotPassword from './screens/ForgotPassword';
import UserRegistration from './screens/UserRegistration';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const AuthContext = createContext();

export default function Navigation({ colorScheme }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const [token, setToken] = useState(null);  // State to hold the refreshed token

  // Refresh token API call
  const refreshTokenAPI = async () => {
    try {

      const jsonValue = await AsyncStorage.getItem('userInfo');
     

      if (!jsonValue) {
        console.log("No user data found.");
        setIsLoading(false);
        return;
      }

      let loginData = JSON.parse(jsonValue);
      const emailId = loginData.username;
      const password = loginData.password;


      const result = await api.RefreshTokenGenerator(emailId, password);
      await AsyncStorage.setItem('userToken', result?.data?.token);

      if (result?.data?.token) {
        setToken(result.data.token);  // Set the refreshed token here
        storeData(result.data.token);
      } else {
        return;
      }

    } catch (error) {
    }
  };

  // Store the refreshed token to AsyncStorage
  const storeData = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
    } catch (e) {
      console.error("Error saving refreshed token:", e);
    }
  };
  


  // Use useEffect to periodically refresh the token
  useEffect(() => {
    const interval = setInterval(() => {
      refreshTokenAPI(); // Refresh the token every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        const userToken = data;
        await AsyncStorage.setItem('userToken', userToken);
        dispatch({ type: 'SIGN_IN', token: userToken });
      },
      // signOut: async () => {
      //   await AsyncStorage.removeItem('userToken');
      //   dispatch({ type: 'SIGN_OUT' });

      // },
      signOut: async () => {
        try {
          // Clear user token from AsyncStorage and update context state
          await AsyncStorage.removeItem('userToken');
          dispatch({ type: 'SIGN_OUT' });
        } catch (error) {
          console.error('Error signing out:', error);
        }
      },
      
    }),
    []
  );

    // Load token from AsyncStorage
    useEffect(() => {
      const bootstrapAsync = async () => {
        let userToken ;
        try {
          userToken = await AsyncStorage.getItem('userToken');
          console.log(userToken ,"userToken123")
  
        } catch (e) {
          console.error("Error loading token:", e);
        }
  
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      };
  
      bootstrapAsync();
    }, []);

  const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SideMenu" component={SideMenu} />
      <Stack.Screen name="UserRegistration" component={UserRegistration} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

    </Stack.Navigator>
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Intro">
          {state.isLoading  ? (
            <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
           ) : state.userToken == null  || !token? (  // Check both state.token and the refreshed token
             <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen
              name="SideMenu"
              component={SideMenu}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
