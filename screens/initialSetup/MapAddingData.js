import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Appbar } from 'react-native-paper';
import { default as styles, default as styless } from '../../assets/css/style';
import TickIcon from '../../assets/images/tick_icon.js';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
// import Header from '../../components/sideMenuHeaderMaster';
import Header from '../../components/SidemeuItemsScreenHeader';





export default function MapAddingData({ route, navigation }) {
    const [userRoleId, setuserRoleId] = useState('')
    const [outletId, setOutletId] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [outletAddress, setAddress] = useState('');
    const [outletName, setOutlet] = useState('');
    const isFocused = useIsFocused();
    const [touchbilitydisable, setTouchbilitydisable] = useState(true);
    const [checkoutletid, setcheckoutletid] = useState('');
    const [checkrestaurent, setcheckrestaurent] = useState('');
    const [outletDataLength, setOutletDataLength] = useState(0)
    const [catDataLength, setcatDataLength] = useState(0)
    const [taxDataLength, setTaxDataLength] = useState(0)
    const [itemDataLength, setItemDataLength] = useState(0)
    const [sectionData, setSectionData] = useState(null)
    const [sectionDataLength, setSectionDataLength] = useState(0)
    const [tableData, setTableData] = useState(null)
    const [tableDetailsDataLength, setTableDetailsDataLength] = useState(0)
    const [productData, setProductData] = useState(null)
    const [productDataLength, setProductDataLength] = useState(0)
    const [discountDataLength, setDiscountDataLength] = useState(0)
    const [supplierDataLength, setSupplierDataLength] = useState(0)
    const [stockData, setStockData] = useState(null)
    const [stockDataLength, setstockDataLength] = useState(0)
    const [catDataAdded, setCatDataAdded] = useState(false);
    const [itemDataAdded, setItemDataAdded] = useState(false);
    const [taxDataAdded, setTaxDataAdded] = useState(false);
    const [sectDataAdded, setSectDataAdded] = useState(false);
    const [disDataAdded, setDisDataAdded] = useState(false);
    const [tabDataAdded, setTabDataAdded] = useState(false);
    const [prodDataAdded, setProdDataAdded] = useState(false);
    const [supDataAdded, setSupDataAdded] = useState(false);
    const [stockDataAdded, setStockDataAdded] = useState(false);
    

    

    
 

    //Calling User Info
    useEffect(() => {
        getRestaurant();
        setcatDataLength(0)
        setTaxDataLength(0)
        setSectionDataLength(0)
        setItemDataLength(0)
        setDiscountDataLength(0)
        setTableDetailsDataLength(0)
        setProductDataLength(0)
        setSupplierDataLength(0)
        setstockDataLength(0)
        setCatDataAdded(false)
        setItemDataAdded(false)
        setTaxDataAdded(false)
        setSectDataAdded(false)
        setDisDataAdded(false)
        setTabDataAdded(false)
        setProdDataAdded(false)
        setSupDataAdded(false)
        setStockDataAdded(false)
    }, [isFocused]);

   
    const getRestaurant = async () => {
        const userRoleId = await AsyncStorage.getItem('userRoleId')
        const restaurantName = await AsyncStorage.getItem('restaurantName')
        const outletName = await AsyncStorage.getItem('outletName')
        const outletAddress = await AsyncStorage.getItem('outletAddress')
        const outletid = await AsyncStorage.getItem('restaurantId')
        const outletlength = await AsyncStorage.getItem('outletlength')
        const jsonValue = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId
        let restaurantId = await AsyncStorage.getItem('restaurantId')
        setRestaurant(restaurantName)
        setOutlet(outletName)
        setAddress(outletAddress)
        setuserRoleId(userRoleId)
        setcheckrestaurent(restaurantName)
        setcheckoutletid(checkoutletid)
        const result = await api.getAllMasterData(token, endPoint.GET_OUTLETLIST + restaurantId)
        setOutletDataLength(result.data.outlets?.length,'length')
        const catResult = await api.getAllMasterData(token, endPoint.GET_CATEGORY + loginData.outletId);

        if(catResult.data.length > 0){
            setCatDataAdded(true)
            setcatDataLength(catResult?.data?.length)

        }
        const taxResult = await api.getAllMasterData(token, endPoint.GET_TAX + outletId);

        var myJson = {
            IsAllItem: true,
            OutletId: outletId,
        }
        if(taxResult.data.length > 0){
            setTaxDataAdded(true)
            setTaxDataLength(taxResult?.data?.length)

        }
        const itemResult = await api.CreateMasterData(endPoint.GET_ITEMS, token, myJson);
        if(itemResult?.data?.length > 0){
            setItemDataAdded(true)
            setItemDataLength(itemResult?.data?.length)

        }
        const discountResult = await api.getAllMasterData(token, endPoint.GET_DISCOUNT + outletId);
        if(discountResult.data.length > 0){
            setDisDataAdded(true)
            setDiscountDataLength(discountResult?.data?.length)

        }
        const sectionResult = await api.getAllMasterData(token, endPoint.GET_SECTIONS + outletId);
        setSectionData(sectionResult.data)
        if(sectionResult.data.length > 0){
            setSectDataAdded(true)
            setSectionDataLength(sectionResult?.data?.length)

        }
        const tableResult = await api.getAllMasterData(token, endPoint.GET_TABLEDETAILS + outletId);
        setTableData(tableResult.data)
        if(tableResult.data.length > 0){
            setTabDataAdded(true)
            setTableDetailsDataLength(tableResult?.data?.length)

        }
        const prodResult = await api.GetProductList(token, outletId);
        setProductData(prodResult?.data)
        if(prodResult.data.length > 0){
            setProdDataAdded(true)
            setProductDataLength(prodResult?.data?.length)

        }
        const supplierResult = await api.GetAllSupplier(token, outletId);
        if(supplierResult.data.length > 0){
            setSupDataAdded(true)
            setSupplierDataLength(supplierResult.data?.length)

        }
        const stockResult = await api.GetProductSupplierMaster(token, outletId);
        setStockData(stockResult.data)
        if(stockResult.data.length > 0){
            setStockDataAdded(true)
            setstockDataLength(stockResult.data?.length)

        }
    }


    // ------------------------------------- User Interface -----------------------------------------------------------------------
return (
        <>
            <Header heading={"Map Adding Data"} />
            <ScrollView style={[styless.afterLoginScroll]}>
                <View style={[styless.afterloginView]}>
                    {/* heading HTML */}
                    <View style={[styless.marBtm34]}>
                        <View style={[styless.flexrow, styless.justifyCenter, styless.marBtm10, styless.alignCenter]}>
                            <Image source={(require("../../assets/images/pos_logo.png"))} style={styles.afterLoginLog} />
                            <Text style={[styless.font34, styless.textWhite, styless.fontBold, styless.padL5]}>Welcome to Watermelon POS</Text>
                        </View>
                        <Text style={[styless.font24, styless.textWhite, styless.textCenter]}>Please Follow the steps for a quick setup</Text>
                    </View>
                    {/* heading HTML - Ends */}

                    {/* steps View HTML */}
                    <View style={[styless.flexrow, styless.justifyBetween]}>
                        <View style={[styless.width30, styless.whiteBg, styless.stepsCol]}>
                            <Text style={[styless.textBlack, styless.fontBold, styless.font24, styless.textCenter, styless.marBtm2]}>Step 1</Text>
                            <View style={[styless.flexrow, styless.justifyCenter, styless.marBtm20]}>
                                <Text style={[styless.font11, styless.redText]}>*</Text>
                                <Text style={[styless.font11, styless.textDefault, styless.padL2]}>Mandatory</Text>
                            </View>
                            <View style={[styless.marBtm45]}>
                                {outletDataLength === 0 ?
                                    <TouchableOpacity style={[styless.addCatBtn]} onPress={() => navigation.navigate('AddOutlet')}>
                                        <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]}>Add Outlet*</Text>
                                    </TouchableOpacity> : 

                                    <TouchableOpacity style={[styless.addCatBtn]}>
                                        <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]}>Add Outlet*</Text>
                                    </TouchableOpacity>
                                }

                                {
                                    outletDataLength != 0  ?
                                        <TickIcon style={[styless.tickIcon]} /> : null

                                }
                                {outletDataLength != 0 ?
                                    <Text style={[styless.textCenter, styless.font11, styless.TextGreen, styless.positionabsolute]}>Outlet Added Successfully</Text> : null

                                }
                            </View>

                            <View style={[styless.marBtm45]}>
                                {catDataLength === 0  ?
                                    <TouchableOpacity style={[styless.addCatBtn]} onPress={() => navigation.navigate('Category')}>
                                        <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]}>Add Category*</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={[styless.addCatBtn]}>
                                        <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]}>Add Category*</Text>
                                    </TouchableOpacity>
                                }

                                {
                                    catDataLength != 0 ?
                                        <TickIcon style={[styless.tickIcon]} /> : null
                                }
                                {catDataLength != 0 ?
                                    <Text style={[styless.textCenter, styless.font11, styless.TextGreen, styless.positionabsolute]}>Category Added Successfully</Text> : null

                                }

                            </View>

                            <View style={[styless.marBtm45]}>
                                {taxDataLength === 0 ?
                                    <TouchableOpacity style={[styless.addCatBtn]} onPress={() => navigation.navigate('Tax')}>
                                        <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]}>Add Tax</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={[styless.addCatBtn]}>
                                        <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]}>Add Tax</Text>
                                    </TouchableOpacity>
                                }
                                {
                                    taxDataLength != 0 ?
                                        <TickIcon style={[styless.tickIcon]} /> : null

                                }
                                {taxDataLength != 0 ?
                                    <Text style={[styless.textCenter, styless.font11, styless.TextGreen, styless.positionabsolute]}>Tax Added Successfully</Text> : null

                                }


                            </View>
                            <View style={[styless.marBtm20]}>
                                { itemDataLength === 0  ?
                                    <TouchableOpacity style={[styless.addCatBtn]}>
                                        <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]} onPress={() => navigation.navigate('ItemsRecipe')}>Add Item</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={[styless.addCatBtn]}>
                                        <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]}>Add Item</Text>
                                    </TouchableOpacity>
                                }
                                {itemDataLength != 0 ?
                                    <TickIcon style={[styless.tickIcon]} /> : null

                                }
                                {itemDataLength != 0 ?
                                    <Text style={[styless.textCenter, styless.font11, styless.TextGreen, styless.positionabsolute]}>Item Added Successfully</Text> : null

                                }

                            </View>
                        </View>

                        <View style={[styless.width30, styless.whiteBg, styless.stepsCol]}>
                            <Text style={[styless.textBlack, styless.fontBold, styless.font24, styless.textCenter, styless.marBtm2]}>Step 2</Text>
                            <View style={[styless.flexrow, styless.justifyCenter, styless.marBtm20]}>
                                <Text style={[styless.font11, styless.stepText]}>*</Text>
                                <Text style={[styless.font11, styless.stepText, styless.padL2]}>Mandatory</Text>
                            </View>

                            <View style={[styless.marBtm45]}>
                                {sectionData === null ?
                                    <TouchableOpacity style={[styless.addCatBtn]}>
                                        <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]} onPress={() => navigation.navigate('TableTypes')}>Add Section</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={[styless.addCatBtn]}>
                                        <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]}>Add Section</Text>
                                    </TouchableOpacity>
                                }
                                {sectionDataLength != 0 ?
                                    <TickIcon style={[styless.tickIcon]} /> : null

                                }
                                {sectionDataLength != 0 ?
                                    <Text style={[styless.textCenter, styless.font11, styless.TextGreen, styless.positionabsolute]}>Section Added Successfully</Text> : null

                                }
                            </View>

                            <View style={[styless.marBtm45]}>
                                {tableData === null ?
                                    <TouchableOpacity style={[styless.addCatBtn]}>
                                        <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]} onPress={() => navigation.navigate('TableDetail')}>Add Table</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={[styless.addCatBtn]}>
                                        <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]}>Add Table</Text>
                                    </TouchableOpacity>
                                }
                                {tableDetailsDataLength != 0 ?
                                    <TickIcon style={[styless.tickIcon]} /> : null

                                }
                                {tableDetailsDataLength != 0 ?
                                    <Text style={[styless.textCenter, styless.font11, styless.TextGreen, styless.positionabsolute]}>Table Added Successfully</Text> : null

                                }
                            </View>

                            <View style={[styless.marBtm45]}>
                                { discountDataLength === 0  ?
                                    <TouchableOpacity style={[styless.addCatBtn]}>
                                        <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]} onPress={() => navigation.navigate('Discount')}>Add Discount</Text>
                                    </TouchableOpacity> : 
                                     
                                        <TouchableOpacity style={[styless.addCatBtn]} onPress={() => navigation.navigate('Dashboard')}>
                                            <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]}>Add Discount</Text>
                                        </TouchableOpacity>
                                        

                                }
                                {discountDataLength != 0 ?
                                    <TickIcon style={[styless.tickIcon]} /> : null

                                }
                                {discountDataLength != 0 ?
                                    <Text style={[styless.textCenter, styless.font11, styless.TextGreen, styless.positionabsolute]}>Discount Added Successfully</Text> : null

                                }
                            </View>
                        </View>

                        <View style={[styless.width30, styless.whiteBg, styless.stepsCol]}>
                            <Text style={[styless.textBlack, styless.fontBold, styless.font24, styless.textCenter, styless.marBtm2]}>Step 3</Text>
                            <View style={[styless.flexrow, styless.justifyCenter, styless.marBtm20]}>
                                <Text style={[styless.font11, styless.stepText]}>*</Text>
                                <Text style={[styless.font11, styless.stepText, styless.padL2]}>Optional</Text>
                            </View>
                            {/* <View style={[styless.marBtm45]}>
                                {productData === null ?
                                    <TouchableOpacity style={[styless.addCatBtn]}>
                                        <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]} onPress={() => navigation.navigate('ProductStock')}>Add Product</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={[styless.addCatBtn]}>
                                        <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]}>Add Product</Text>
                                    </TouchableOpacity>
                                }
                                {productDataLength != 0 ?
                                    <TickIcon style={[styless.tickIcon]} /> : null

                                }
                                {productDataLength != 0 ?
                                    <Text style={[styless.textCenter, styless.font11, styless.TextGreen, styless.positionabsolute]}>Product Added Successfully</Text> : null

                                }

                            </View>
                            <View style={[styless.marBtm45]}>

                                {supplierDataLength === 1 ?
                                    <TouchableOpacity style={[styless.addCatBtn]}>
                                        <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]} onPress={() => navigation.navigate('Supplierstock')}>Add Supplier</Text>
                                    </TouchableOpacity> : supplierDataLength != 0 ?
                                        <TouchableOpacity style={[styless.addCatBtn]}>
                                            <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]} onPress={() => navigation.navigate('Supplierstock')} >Add Supplier</Text>
                                        </TouchableOpacity> : <TouchableOpacity style={[styless.addCatBtn]}>
                                            <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]}>Add Supplier</Text>
                                        </TouchableOpacity>
                                }
                                {supplierDataLength != 0 ?
                                    <TickIcon style={[styless.tickIcon]} /> : null

                                }
                                {supplierDataLength != 0 ?
                                    <Text style={[styless.textCenter, styless.font11, styless.TextGreen, styless.positionabsolute]}>Supplier Added Successfully</Text> : null

                                }

                            </View> */}
                            <View style={[styless.marBtm45]}>
    {productData === null ?
        <TouchableOpacity style={[styless.addCatBtn]}>
            <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]} onPress={() => navigation.navigate('Productstock')}>Add Product</Text>
        </TouchableOpacity> :
        <TouchableOpacity style={[styless.addCatBtn]}>
            <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]}>Add Product</Text>
        </TouchableOpacity>
    }
    {productDataLength != 0 ?
        <TickIcon style={[styless.tickIcon]} /> : null
    }
    {productDataLength != 0 ? 
        <Text style={[styless.textCenter, styless.font11, styless.TextGreen, styless.positionabsolute]}>Product Added Successfully</Text>
        : null
    }
</View>
<View style={[styless.marBtm45]}>
    {supplierDataLength === 0 ?
        <TouchableOpacity style={[styless.addCatBtn]}>
            <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]} onPress={() => navigation.navigate('Supplierstock')}>Add Supplier</Text>
        </TouchableOpacity> : 
         <TouchableOpacity style={[styless.addCatBtn]}>
                <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]}>Add Supplier</Text>
            </TouchableOpacity>
    }
    {supplierDataLength != 0 ?
        <TickIcon style={[styless.tickIcon]} /> : null
    }
      {supplierDataLength != 0 ? 
        <Text style={[styless.textCenter, styless.font11, styless.TextGreen, styless.positionabsolute]}>Supplier Added Successfully</Text>
        : null
    }
</View>
                            <View style={[styless.marBtm45]}>
                                {
                                    stockData === null ?
                                        <TouchableOpacity style={[styless.addCatBtn]}>
                                            <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]} onPress={() => navigation.navigate('Inventory')} >Add Stock</Text>
                                        </TouchableOpacity> :
                                        <TouchableOpacity style={[styless.addCatBtn]}>
                                            <Text style={[styless.textWhite, styless.font13, styless.fontBold, styless.textCenter]}>Add Stock</Text>
                                        </TouchableOpacity>
                                }
                                {stockDataLength != 0 ?
                                    <TickIcon style={[styless.tickIcon]} /> : null

                                }
                                {stockDataLength != 0 ?
                                    <Text style={[styless.textCenter, styless.font11, styless.TextGreen, styless.positionabsolute]}>Stock Added Successfully</Text> : null

                                }

                            </View>
                            {catDataLength != 0 && taxDataLength != 0 && itemDataLength != 0 && sectionDataLength != 0 && tableDetailsDataLength != 0 && discountDataLength != 0 ?
                                <View>
                                    <TouchableOpacity style={[styless.addCatBtn, styless.skipBtn]}>
                                        <Text style={[styless.redText, styless.font13, styless.fontBold, styless.textCenter]} onPress={() => navigation.push('SideMenu')}>Skip this Step</Text>
                                    </TouchableOpacity>
                                </View> : null
                            }

                        </View>
                    </View>
                    {/* steps View HTML - Ends */}
                </View>
            </ScrollView>
            {/* Dynamic Status Bar based on data setup Starts */}
            {catDataLength != 0 && taxDataLength != 0 && itemDataLength != 0 && sectionDataLength != 0 && tableDetailsDataLength != 0 && discountDataLength != 0 && productDataLength != 0 && supplierDataLength != 0 && stockDataLength != null ?
                <View style={[styless.whiteBg, styless.stepsPro]}>
                    <View style={styless.progressBar}>
                        <View style={[styless.progressView, { width: '100%' }]}></View>
                    </View>
                    <Text style={[styless.font11, styless.textBlack, styless.footerCompletedAlign]}>100% Completed</Text>
                </View> : catDataLength != 0 && taxDataLength != 0 && itemDataLength != 0 && sectionDataLength != 0 && tableDetailsDataLength != 0 && discountDataLength != 0 && productDataLength != 0 && supplierDataLength != 0 ?
                    <View style={[styless.whiteBg, styless.stepsPro]}>
                        <View style={styless.progressBar}>
                            <View style={[styless.progressView, { width: '90%' }]}></View>
                        </View>
                        <Text style={[styless.font11, styless.textBlack, styless.footerCompletedAlign]}>90% Completed</Text>
                    </View> : catDataLength != 0 && taxDataLength != 0 && itemDataLength != 0 && sectionDataLength != 0 && tableDetailsDataLength != 0 && discountDataLength != 0 && productDataLength != 0 ?
                        <View style={[styless.whiteBg, styless.stepsPro]}>
                            <View style={styless.progressBar}>
                                <View style={[styless.progressView, { width: '80%' }]}></View>
                            </View>
                            <Text style={[styless.font11, styless.textBlack, styless.footerCompletedAlign]}>80% Completed</Text>
                        </View> : catDataLength != 0 && taxDataLength != 0 && itemDataLength != 0 && sectionDataLength != 0 && tableDetailsDataLength != 0 && discountDataLength != 0 ?
                            <View style={[styless.whiteBg, styless.stepsPro]}>
                                <View style={styless.progressBar}>
                                    <View style={[styless.progressView, { width: '70%' }]}></View>
                                </View>
                                <Text style={[styless.font11, styless.textBlack, styless.footerCompletedAlign]}>70% Completed</Text>
                            </View> : catDataLength != 0 && taxDataLength != 0 && itemDataLength != 0 && sectionDataLength != 0 && tableDetailsDataLength != 0 ?
                                <View style={[styless.whiteBg, styless.stepsPro]}>
                                    <View style={styless.progressBar}>
                                        <View style={[styless.progressView, { width: '60%' }]}></View>
                                    </View>
                                    <Text style={[styless.font11, styless.textBlack, styless.footerCompletedAlign]}>60% Completed</Text>
                                </View> : catDataLength != 0 && taxDataLength != 0 && itemDataLength != 0 && sectionDataLength != 0 ?
                                    <View style={[styless.whiteBg, styless.stepsPro]}>
                                        <View style={styless.progressBar}>
                                            <View style={[styless.progressView, { width: '50%' }]}></View>
                                        </View>
                                        <Text style={[styless.font11, styless.textBlack, styless.footerCompletedAlign]}>50% Completed</Text>
                                    </View> : catDataLength != 0 && taxDataLength != 0 && itemDataLength != 0 ?
                                        <View style={[styless.whiteBg, styless.stepsPro]}>
                                            <View style={styless.progressBar}>
                                                <View style={[styless.progressView, { width: '40%' }]}></View>
                                            </View>
                                            <Text style={[styless.font11, styless.textBlack, styless.footerCompletedAlign]}>40% Completed</Text>
                                        </View> : catDataLength != 0 && taxDataLength != 0 ?
                                            <View style={[styless.whiteBg, styless.stepsPro]}>
                                                <View style={styless.progressBar}>
                                                    <View style={[styless.progressView, { width: '30%' }]}></View>
                                                </View>
                                                <Text style={[styless.font11, styless.textBlack, styless.footerCompletedAlign]}>30% Completed</Text>
                                            </View> : outletDataLength != 0 && catDataLength != 0 ?
                                                <View style={[styless.whiteBg, styless.stepsPro]}>
                                                    <View style={styless.progressBar}>
                                                        <View style={[styless.progressView, { width: '20%' }]}></View>
                                                    </View>
                                                    <Text style={[styless.font11, styless.textBlack, styless.footerCompletedAlign]}>20% Completed</Text>
                                                </View> : outletDataLength != 0 ?
                                                    <View style={[styless.whiteBg, styless.stepsPro]}>
                                                        <View style={styless.progressBar}>
                                                            <View style={[styless.progressView, { width: '10%' }]}></View>
                                                        </View>
                                                        <Text style={[styless.font11, styless.textBlack, styless.footerCompletedAlign]}>10% Completed</Text>
                                                    </View> : null
            }
            {/* Dynamic Status Bar based on data setup Ends */}

        </>
    )

}