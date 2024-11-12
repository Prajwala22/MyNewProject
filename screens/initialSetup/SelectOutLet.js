import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import Colors from '../constants/colors';
import styless from '../../assets/css/style';
import TickIcon from '../../assets/images/tick_icon.js';
import Header from '../../components/SidemeuItemsScreenHeader';
import { endPoint } from '../../services/api/apiConstant';
import { default as api, default as callingApi } from '../../services/api/callingApi';

const { width, height } = Dimensions.get('screen')


const Item = ({ title, onPress, onClick, address, outletId, selectedoutletID }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor: onClick == '1' ? '#0089601A' : Colors.white, borderColor: onClick == '1' ? '#008960' : '#CCCCCC', borderWidth: 2 }]}>

        {
            onClick == '1' &&
            <View style={styles.tickStyles}>
                <TickIcon />
            </View>
        }
         {
            selectedoutletID == outletId &&
            <View style={styles.tickStyles}>
                <TickIcon />
            </View>
        }
        <View>
            <Text style={[styles.title, {
                color: onClick == '1' ?
                    '#008960' : Colors.black
            }]}>{title}</Text>
            <Text style={[styless.outletAd, {
                color: onClick == '1' ?
                    '#008960' : Colors.black,
            }]}>{address}</Text>

        </View >
    </TouchableOpacity>


);


const SelectOutlet = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(false)
    const [onClick, setOnClick] = useState(null)
    const [outletData, setOutletData] = useState([])
    const [userData, setUserData] = useState({})
    let token1;
    const isFocused = useIsFocused();
    const [data, setData] = useState([])

    React.useEffect(() => {
        // const interval = setInterval(() => {
        //     // this will always be 0
        //     fetchOutlets()
        // }, 3500);
        // return () => clearInterval(interval)
        fetchOutlets()
    }, []);
    useEffect(() => {
        fetchOutlets();
      
    },[]);
    const fetchOutlets = async () => {
        setIsLoading(true)
        const id = await AsyncStorage.getItem('restaurantId')
        const value = await AsyncStorage.getItem('userInfo');
        let loginData = JSON.parse(value);
        setOutletData(loginData.outletId)
        let token = loginData.token;
        const result = await callingApi.GetOutletsByRestaurants(token, id)

        if (result.success === true) {
            setIsLoading(false)
            setData(result?.data?.outlets)

        }
        else {
            setIsLoading(false)
        }

    }

    const onSelectItem = async (pos) => {

        let jsonValue = await AsyncStorage.getItem('userInfo');
        let loginData = JSON.parse(String(jsonValue));
        let token = loginData.token;
        let outletId = loginData.outletId;
        let address = loginData.address;
        let joinDate = loginData.joiningDate;
        let userImage = loginData.image;
        let idCard = loginData.idCardNo;
        let createdByuser = loginData.createdBy;
        let createOnUser = loginData.createdOn;
        let vuserVoidPassword = loginData.voidPassword
        

        var myJson = {
            username: loginData.username,
            password: loginData.password,
            emailId: loginData.username,
            roleid: '1',
            token: loginData.token,
            outletId: pos.outletId,
            userId: loginData.userId,
            restaurantId: outletId,
            address:address,
            joiningDate: joinDate,
            image: userImage,
            idCardNo: idCard,
            createdBy: createdByuser,
            createdOn: createOnUser,
            voidPassword: vuserVoidPassword

        }
        await AsyncStorage.setItem('checkoutletId', pos.outletId)
        storeData(myJson);
        const result1 = await api.getAllMasterData(loginData.token, endPoint.GET_CATEGORY + pos.outletId);
        setOnClick(pos.outletId)
        try {
            await AsyncStorage.setItem('outletAddress', pos.outletAddress)
            await AsyncStorage.setItem('outletName', pos.outletName)
        } catch (e) {
            // saving error
        }
        const discountResult = await api.getAllMasterData(token, endPoint.GET_DISCOUNT + pos.outletId);
        console.log(discountResult,"discountResult")
        if (discountResult?.data?.length > 0) {
            navigation.navigate('Dashboard')
        } else {
            navigation.navigate('MapAddingData')
        }

        // if (result1?.data?.length > 0) {
        //     navigation.navigate('Dashboard')
        // } else {
        //     navigation.navigate('Menu')
        // }
    }

    
    const storeData = async (value: any) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('userInfo', jsonValue)
        } catch (e) {
            // saving error
        }
    }
    const renderItem = ({ item, index }) =>

        <Item title={item.outletName} outletId={item.outletId} selectedoutletID={outletData} address={item.outletAddress} onPress={() => {onSelectItem(item),setOutletData([])}} onClick={onClick === item.outletId ? '1' : '0'} />;

    return (
        <>
            <Header heading={"Category"} />
            {isLoading ?
                <View style={{ flex: 1 }}>
                    <View style={[styless.flexrow, styless.alignCenter, styless.justifyCenter, styless.loaderImg]}>
                        <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
                    </View>
                </View> :
                <SafeAreaView style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <FlatList data={data.sort(function (a, b) {
                                return (a.outletName < b.outletName) ? -1 : (a.outletName > b.outletName) ? 1 : 0
                            })} renderItem={renderItem} keyExtractor={item => item.outletId}
                                numColumns={3}
                                ListHeaderComponent={() => <Text style={[styless.textStyle1, styless.paddL15, styless.marBtm16]}>Select Outlet to Continue</Text>
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
        paddingLeft: 20,
        backgroundColor: '#F3F4F5'
    },
    item: {
        flex: 1,
        backgroundColor: Colors.white,
        width: width / 3.35,
        padding: 20,
        margin: 15,
        justifyContent: 'flex-start',
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'left',
        lineHeight: 19,
        marginBottom: 8,
    },
    titleText: {
        fontSize: 32,
        textAlign: "left",
        margin: 15,
        lineHeight: 40
    }, button: {
        width: 200,
        backgroundColor: Colors.red400,


    },
    tickStyles: {
        position: 'absolute',
        elevation: 5,
        right: 5,
        top: 5
    },
    footerStyle: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    }

});
export default SelectOutlet;