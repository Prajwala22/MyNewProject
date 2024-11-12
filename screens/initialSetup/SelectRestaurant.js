import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native-paper';
import styless from '../../assets/css/style';
import Images from '../../assets/images/images';
import TickIcon from '../../assets/images/tick_icon.js';
import Header from '../../components/SidemeuItemsScreenHeader';
import api from '../../services/api/callingApi';
const { width, height } = Dimensions.get('screen')
import { constRoleId } from "../common/RoleConstants"



const SelectRestaurant = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)

    const [onClick, setOnClick] = useState(null)
    const [restData, setRestData] = ([])
    const [restaurantData, setRestaurantData] = useState([])
    const [userRestData, setUserRestaurantData] = useState([])
    useEffect(async () => {
        fetchRestaurants()

    }, []);


    const fetchRestaurants = async () => {
        setIsLoading(true)
        const roleId = await AsyncStorage.getItem('userRoleId')
        const jsonValue = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let userId = loginData.userId
        if (roleId === constRoleId.PRODUCT_ADMIN_ID) {
            const value = await AsyncStorage.getItem('userInfo');
            let loginData = JSON.parse(value);
            let token = loginData.token;
            setIsLoading(true)

            const result = await api.GetAllRestaurants(token)
            if (result.success === true) {
                setRestaurantData(result.data)
                setIsLoading(false)
            }
            else {
                setIsLoading(false)


            }

        }
        //Cashier Role Restaurants
        else if (roleId === constRoleId.CASHIER_ID) {
            const value = await AsyncStorage.getItem('userInfo');
            let loginData = JSON.parse(value);
            let token = loginData.token;

            setIsLoading(true)
            const allRestaurantsResult = await api.GetAllRestaurants(token)
            const result = await api.GetAllRestaurantsForCashier(token, userId)
            setRestaurantData(allRestaurantsResult.data)
            setUserRestaurantData(result.data)

            if (result.success === true && allRestaurantsResult.success === true) {
                const fetchRestaurant = allRestaurantsResult.data.filter((item) => item.restaurantId === result.data[0]?.restaurantId)
                setRestaurantData(fetchRestaurant)
                setIsLoading(false)

            }
            else {
                setIsLoading(false)


            }
        }
        //Chef Role Restaurants
        else if (roleId === constRoleId.CHEF_ID) {
            const value = await AsyncStorage.getItem('userInfo');
            let loginData = JSON.parse(value);
            let token = loginData.token;

            setIsLoading(true)
            const allRestaurantsResult = await api.GetAllRestaurants(token)
            const result = await api.GetAllRestaurantsForCashier(token, userId)
            setRestaurantData(allRestaurantsResult.data)
            setUserRestaurantData(result.data)

            if (result.success === true && allRestaurantsResult.success === true) {

                const fetchRestaurant = allRestaurantsResult.data.filter((item) => item.restaurantId === result.data[0]?.restaurantId)
                setRestaurantData(fetchRestaurant)
                setIsLoading(false)
            }
            else {
                setIsLoading(false)

            }
        }

        //Bartender Role Restaurants
        else if (roleId === constRoleId.BARTENDER_ID) {
            const value = await AsyncStorage.getItem('userInfo');
            let loginData = JSON.parse(value);
            let token = loginData.token;

            setIsLoading(true)
            const allRestaurantsResult = await api.GetAllRestaurants(token)
            const result = await api.GetAllRestaurantsForCashier(token, userId)
            setRestaurantData(allRestaurantsResult.data)
            setUserRestaurantData(result.data)

            if (result.success === true && allRestaurantsResult.success === true) {

                const fetchRestaurant = allRestaurantsResult.data.filter((item) => item.restaurantId === result.data[0]?.restaurantId)
                setRestaurantData(fetchRestaurant)
                setIsLoading(false)

            }
            else {
                setIsLoading(false)

            }
        }

    }

    const onSelectItem = async (pos) => {
        // setIsLoading(true)
        setOnClick(pos.restaurantId)

        await AsyncStorage.setItem('restaurantId', pos.restaurantId)
        await AsyncStorage.setItem('restaurantName', pos.restaurantName)
        navigation.navigate('SelectOutlet')

    }
    //SelectOutlet
    const renderItem = ({ item, index }) =>

        <Item title={item.restaurantName} onPress={() => onSelectItem(item)} onClick={onClick === item.restaurantId ? '1' : '0'} />;

        const Item = ({ title, onPress, onClick }) => (
            <View style={[styless.width33, styless.paddRL15, styless.padB15]}>
                <TouchableOpacity onPress={onPress}>
                    {
                        onClick == '1' &&
                        <View style={styles.tickStyles}>
                            <TickIcon />
                        </View>
                    }
                    <View style={[styless.restCol, styless.alignCenter, styless.flexrow, { backgroundColor: onClick == '1' ? '#0089601A' : '#ffffff', borderColor: onClick == '1' ? '#008960' : '#CCCCCC', borderWidth: 2 }]}>
                        <Image source={Images.app_logo}
                            style={{ width: 70, height: 70, margin: 5, borderRadius: 3 }} />
        
                        <Text style={[styles.title, {
                            color: onClick == '1' ?
                                '#008960' : '#000000'
                        }]}>{title}</Text>
                    </View >
                </TouchableOpacity>
            </View>
        
        );

    return (
        <>
            <Header heading={"Select Restaurant"} />
            {isLoading ?
        <View style={{ flex: 1 }}>
          <View style={[styless.flexrow, styless.alignCenter, styless.justifyCenter, styless.loaderImg]}>
            <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
          </View>
        </View> :
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <FlatList data={restaurantData.sort(function (a, b) {
                            return (a.restaurantName < b.restaurantName) ? -1 : (a.restaurantName > b.restaurantName) ? 1 : 0
                        })} renderItem={renderItem} keyExtractor={item => item.restaurantId}
                            numColumns={3}
                            ListHeaderComponent={() => <Text style={[styless.textStyle1, styless.paddL15, styless.marBtm16]}>Select Restaurant to Continue</Text>
                            }
                        />
                    </View>
                </View>
            </SafeAreaView>
}
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        justifyContent: 'flex-start',
        padding: 10,

        backgroundColor: '#F3F4F5'
    },
    item: {
        flex: 1,
        backgroundColor: '#ffffff',
        width: width / 3.25,
        padding: 15,
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 10,
        width: '60%',
        textAlign: 'left'
    },
    titleText: {
        fontSize: 32,
        fontWeight: '600', textAlign: "left",
        margin: 15

    }, button: {
        width: 200,
        backgroundColor: '#ef5350',


    },
    tickStyles: {
        position: 'absolute',
        elevation: 5,
        right: 3,
        padding: 10,
        top: 3
    },
    footerStyle: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',

    }

});

export default SelectRestaurant