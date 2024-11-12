import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Formik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import styles from '../../assets/css/style';
import EditIcon from '../../assets/images/editIcon.js';
import InternetDownIcon from '../../assets/images/internet_down.js';
import EyeIcon from '../../assets/images/login_eye.js';
import ModalDropDown from '../../assets/images/ModalDropDown.js';
import TableDelete from '../../assets/images/table_delete.js';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/sideMenuHeaderMaster';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import Colors from '../constants/colors';
import * as yup from 'yup';
import { Platform } from 'react-native';



export default function SupplierOrders({ navigation, route }: { navigation: any, route: any }) {
    const [data, setData] = useState([]);
    const [supplierData, setSupplierData] = useState([])
    const [supplierOrderData, setSupplierOrderData] = useState([])

    const [restaurant, setRestaurant] = useState('');
    const [outletName, setOutlet] = useState('');
    const [outletId, setOutletId] = useState('');
    const [outletAddress, setAddress] = useState('');

    const optionsPerPage = [2, 3, 4];
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [isDataPresent, setDataPreset] = useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedValue2, setSelectedValue2] = useState("All Orders");
    const [activeTab, setActiveTab] = useState("Product/Stock");
    const isFocused = useIsFocused();
    const [orderType, setOrderType] = useState(0)
    const [activeOrderTypeDrop, setActiveOrderTypeDrop] = useState("Running")
    const [runningcolor, setRunningColor] = useState('#E83B42')
    const [preparedcolor, setPreparedColor] = useState('#484D54')
    const [completedcolor, setCompletedColor] = useState('#484D54')
    const [openProduct, setOpenProduct] = useState(false);
    const [productdata, setProductData] = useState([]);

    const [recipeData, setRecipeData] = useState([]);
    const [openOrder, setOpenOrder] = useState(false);
    const [productValue, setProductValue] = useState('')
    const [supplierValue, setSupplierValue] = useState([])
    const [productId, setProductId] = useState('')
    const [supplierid, setSupplierId] = useState('')
    const [remarks, onChangeremarks] = React.useState(" ");

    const [planned, setPlanned] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const [received, setReceived] = useState(false)
    const [grn, setgrn] = useState(false)
    const [plannedData, setPlannedData] = useState([])
    const [confirmedData, setConfirmedData] = useState([])
    const [receivedData, setReceivedData] = useState([])
    const [partialReceivedData, setPartialReceivedData] = useState([])
    const [partialRcvdDataById, setPartialReceivedDatabyId] = useState([])
    const [supplierOrderId, setSupplierOrderId] = useState('')
    const [quantityData, setQuantityData] = useState('')
    const [receivedIdMap, setReceivedIdMap] = useState('')

    const [filterPlanned, setfilterPlanned] = useState([])
    const [updateItemData, setUpdateItemData] = useState([])
    const [filterplanneddataById, setFilterPlanneddataById] = useState([])
    const [filterReceived, setfilterReceived] = useState([])
    const [filterGrn, setfilterGrn] = useState([])

    const [filterConfirmed, setfilterConfirmed] = useState([])
    const [prodFilterPlanned, setProdFilterPlanned] = useState([])
    const [showViewPlannedId, setShowViewPlannedId] = useState('')
    const [selectedItems, setSelectedItems] = useState([]);
    const [suplierupdateitemData, setsuplierupdateitemData] = useState('')
    const [showViewdeletPlannedId, setShowViewdeletPlannedId] = useState('')
    const [receivedQty, setReceivedQty] = useState('')

    const [confirmedIsDispatchedData, setConfirmedIsDispatchedData] = useState([])
    const [confirmedIsDispatched, setConfirmedIsDispatched] = useState(false)

    const [partialStatus, setPartialStatus] = useState(false)
    const [partialStatInsertGrn, setPartialStatInsertgrn] = useState(false)

    const [isSelected, setSelection] = useState(true)
    const [confirmedisdispatchedData, setConfirmedDispatchedData] = useState([])
    const [dispatchedQuantity, setDispatchedQuantity] = useState('')

    const [openSuccessMsg, setopenSuccessMsg] = useState(false);
    const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false);
    const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);

    const [rcvQtyGrn, setRcvQtyGrn] = useState(false)
    const [rcvQtyGrnedit, setRcvQtyGrnedit] = useState('')
    const [updateGrnremark, setUpdateGrnRemarks] = useState('')
    const [supplierIdUpdateGrn, setSupplierIdUpdateGrn] = useState('')
    const [itemRecievedDate, setItemRecievedDate] = useState('')

    const [partialRcvdfilterInsertgrn, setfilterPartilaInsertgrnData] = useState([])
    const [partialRcvdQtyIg, setPartialRcvdQtyIg] = useState('')
    const [isSelected1, setSelection1] = useState(true)
    const [remarksIg, onChangeremarksIg] = React.useState(" ");

    const [updatePgrn, setUpdatePgrn] = useState(false)
    const [rcvQtyPGrn, setRcvQtyPGrn] = useState(false)
    const [filterPGrnlistData, setFilterPGrnlistData] = useState([])
    const [filterPGrn, setfilterPGrn] = useState([])
    const [supplierIdPUpdateGrn, setSupplierIdPUpdateGrn] = useState('')
    const [rcvQtyPGrnedit, setRcvQtyPGrnedit] = useState('')
    const [updatePGrnremark, setUpdatePGrnRemarks] = useState('')
    const [itemPRecievedDate, setItemPRecievedDate] = useState('')

    const [userRoleId, setuserRoleId] = useState('')
    const [itemrecipeerror, setItemrecipeerror] = useState(false)


    const [recipeValues, setRecipeValues] = useState({
        productName: "",
        supplierName: "",
        price: "",
        unit: "",
        quantity: "",
        key1: 0,
        key2: 0

    });

    const addorderValidationSchema = yup.object().shape({
        itemForRecipe: yup
            .string()
            .required(),
            supplierRecipe: yup
            .string()
            .required(),
            quantity: yup
            .string()
            .required()
       
    })
    const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Running Orders' },
        { key: 'second', title: 'Completed Orders' },
    ]);

    var count = 1;
    const _id: any = "";
    const supplierId: any = ""
    const numberOfItemsPerPageList = [5, 10, 15];
    const [showView, setShowView] = useState(false);
    const [showViewId, setShowViewId] = useState('');

    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const from = page * numberOfItemsPerPage;
    var count = from + 1;
    const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);

    useEffect(() => {
        setPage(0);
        const unsubscribe = navigation.addListener('focus', () => {
            resetDefaultValue();
        });
        return unsubscribe;

    }, [numberOfItemsPerPage]);

    const resetDefaultValue =
        () => {
            setPage(0);
            setShowView(false);
            setShowViewId('')
        }
    useEffect(() => {
        getTableList();
    }, [isFocused])
    const getTableList = async () => {
        const userRoleId = await AsyncStorage.getItem('userRoleId')
        setuserRoleId(userRoleId)
        const restaurantName = await AsyncStorage.getItem('restaurantName')
        const outletName = await AsyncStorage.getItem('outletName')
        setRestaurant(restaurantName)
        setOutlet(outletName)
        setOutletId(outletId)
    }
    /// Get Product Supplier Master list

    useEffect(() => {
        getProductSupplierOrderList();
        return () => {
            setData([]);
        }
    }, [isFocused]);

    const getProductSupplierOrderList = async () => {

        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        const result = await api.GetSupplierOrder(token, outletId);
        if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
            // Toast.show("Some Error occured. Please try again.");
            // successInternetdownOpen()
            setDataPreset(false);

        } else {
            setData(result.data);
            setDataPreset(true);
            const filterplanned = result.data.filter((item) => item.status == "Planned")
            setPlannedData(filterplanned)
            const filterconfirmed = result.data.filter((item) => item.status == "Confirmed" && item.isDispatched == false)
            setConfirmedData(filterconfirmed)
            const filterConfirmedDispatchedData = result.data.filter((item) => item.status == "Confirmed" && item.isDispatched == true)
            setConfirmedDispatchedData(filterConfirmedDispatchedData)
            const filterreceived = result.data.filter((item) => item.status == "Received")
            setReceivedData(filterreceived)
            const partilaRec = result.data.filter((item) => item.status == "PartiallyReceived")
            setPartialReceivedData(partilaRec)

        }
    }

    //Get Recipe List
    useEffect(() => {

        getRecipeList();
        return () => {
            setRecipeData([]);
        }
    }, [isFocused]);
    const getRecipeList = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        const result = await api.GetrecipeList(token, outletId);

        console.log(result,"receipstresult")
        if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
            // Toast.show("Some Error occured. Please try again.");
            // successInternetdownOpen()

        } else {
            setRecipeData(result.data);

        }
    }



    //Add Order Api Calling
    const handleSubmit = async (data) => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        var myJson = {
            supplierId: supplierid,
            productId: productId,
            unit: recipeValues.unit,
            price: recipeValues.price,
            quantity: recipeValues.quantity,
            OutletId: outletId
        }
        const result = await api.SupplierOrder(token, myJson);
        setRecipeValues({
            productName: "",
            supplierName: "",
            price: "",
            unit: "",
            quantity: "",
            key1: 0,
            key2: 0

        });
        if (result.success) {
            successOpen()
            setOpenOrder(false)
            getProductSupplierOrderList()

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
                    {/* <Image source={(require("../../assets/images/success_msg_popup.png"))} style={[styles.marBtm20, styles.sucImg]} /> */}
                    <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
                    <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Order Created Successfully</Text>
                    <TouchableOpacity style={styles.continueBtn} onPress={() => successOpen()}>
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
                    {/* <Image source={(require("../../assets/images/success gif.gif"))} style={[styles.marBtm20, styles.sucImg]} /> */}

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

    const uniqueIds = [];

    const uniqueProductName = recipeData.filter(element => {
        const isDuplicate = uniqueIds.includes(element.productName);

        if (!isDuplicate) {
            uniqueIds.push(element.productName);

            return true;
        }

        return false;
    });

    // 👇️ [{id: 1, name: 'Tom'}, {id: 2, name: 'Nick'}]
    let productListArray = uniqueProductName.map((s, i) => {

        let newData = {
            key: i + 1,
            label: s.productName,
            value: s.productID
        }
        return newData
    })
    const openAddOrder = () => {
        setOpenOrder(true)
        setRecipeValues({
            productName: "",
            supplierName: "",
            price: "",
            unit: "",
            quantity: "",
            key1: 0,
            key2: 0

        });
    }
    const toggleOrder = () => {
        setOpenOrder(!openOrder)
        setRecipeValues({
            productName: "",
            supplierName: "",
            price: "",
            unit: "",
            quantity: "",
            key1: 0,
            key2: 0

        });
    };
    const handleInputChangeRecipe = (e, name) => {
        setRecipeValues(prevState => ({
            ...prevState,
            [name]: e
        }));

    };
    let filtersuplierdata = recipeData.filter((element => element.productID === productValue));

    const Supplierdata = (data: any) => {
        let supplierfilter = filtersuplierdata.filter((el => el.supplierName === data));
        setSupplierValue(supplierfilter)
    }


    let supplierListArray = filtersuplierdata.map((k, v) => {

        let newData = {
            key: v + 1,
            label: k.supplierName,
            value: k,
            name: k.supplierID
        }
        return newData
    });
    //Add Supplier Order Popup
    const popupAddOrder = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>
                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>
                                Add Order
                            </Text>
                            <Pressable style={styles.closeView} onPress={() => toggleOrder()}>
                                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                <Text style={styles.closeText}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>

                        <Formik
                         validationSchema={addorderValidationSchema}
                            initialValues={{

                                itemForRecipe: '',
                                supplierRecipe: '',
                                quantity:'',

                            }}
                            onSubmit={values => handleSubmit(values)}
                        >
                            {({ handleSubmit, handleChange, isValid, values, setFieldValue, touched, errors }) => (
                                <View style={{ flex: 1, alignItems: 'stretch', }} >

                                    <View style={[styles.popuprow]}>
                                        <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                                            <Text style={[styles.signLabel, styles.textDefault]}>Select Item <Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                            <View style={styles.pickerView}>
                                                <ModalDropDown style={styles.dropdonwImg} />
                                                <ModalSelector
                                                    data={productListArray}
                                                    childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                                                    selectStyle={styles.selectText}
                                                    optionContainerStyle={styles.selectCont}
                                                    optionTextStyle={styles.textStyle}
                                                    initValueTextStyle={styles.textStyle}
                                                    overlayStyle={styles.overlayText}
                                                    cancelStyle={styles.selectCont}
                                                    cancelContainerStyle={styles.cancelCont}
                                                    cancelText={"Cancel"}
                                                    initValue={"Select Item"}
                                                    selectedKey={recipeValues.key1}
                                                    onChange={(option) => {
                                                        if (option.key) {
                                                            setFieldValue('itemForRecipe', option.key)
                                                            setProductValue(option.value)
                                                            setProductId(option.value)
                                                            handleInputChangeRecipe(option.value, 'productName')

                                                            handleInputChangeRecipe(option.key, 'key1')
                                                            // setItemKey(option.key)
                                                        }
                                                    }}
                                                />
                                            </View>
                                            { touched.itemForRecipe  && errors.itemForRecipe &&(
                                                <Text
                                                    style={[
                                                        styles.signLabel,
                                                        { color: Colors.dangerRed },
                                                    ]}>
                                                    Select Item is required 
                                                </Text>
                                            )}
                                        </View>
                                        <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                                            <Text style={[styles.signLabel, styles.textDefault]}>Supplier<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                            <View style={styles.pickerView}>
                                                <ModalDropDown style={styles.dropdonwImg} />
                                                <ModalSelector
                                                    data={supplierListArray}
                                                    childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                                                    selectStyle={styles.selectText}
                                                    optionContainerStyle={styles.selectCont}
                                                    optionTextStyle={styles.textStyle}
                                                    initValueTextStyle={styles.textStyle}
                                                    overlayStyle={styles.overlayText}
                                                    cancelStyle={styles.selectCont}
                                                    cancelContainerStyle={styles.cancelCont}
                                                    cancelText={"Cancel"}
                                                    initValue={"Select Supplier"}
                                                    selectedKey={recipeValues.key2}
                                                    onChange={(option) => {
                                                        setFieldValue('supplierRecipe', option?.key);
                                                        setSupplierId(option.name)
                                                        Supplierdata(option.value);
                                                        handleInputChangeRecipe(option.value.supplierName, 'supplierName')
                                                        handleInputChangeRecipe(option.value.unit, 'unit')
                                                        handleInputChangeRecipe(option.value.price, 'price')
                                                        handleInputChangeRecipe(option.key, 'key2')

                                                    }}
                                                />

                                            </View>
                                            {touched.supplierRecipe && errors.supplierRecipe &&
                                                <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Select Supplier is required</Text>
                                            }
                                        </View>
                                    </View>

                                    <View style={[styles.flexrow]}>

                                        <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                                            <Text style={[styles.signLabel, styles.textDefault]}>Amount </Text>
                                            <TextInput editable={false} selectTextOnFocus={false} style={styles.signInput} placeholder='Amount' value={supplierValue[0]?.price}>
                                                {recipeValues.price}
                                            </TextInput>
                                        </View>
                                        <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                                            <Text style={[styles.signLabel, styles.textDefault]}>Unit</Text>
                                            <TextInput editable={false} selectTextOnFocus={false} style={styles.signInput} placeholder='Unit'>
                                                {recipeValues.unit}
                                            </TextInput>

                                        </View>

                                    </View>

                                    <View style={[styles.flexrow]}>
                                        <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                                            <Text style={[styles.signLabel, styles.textDefault]}>Order Quantity</Text>
                                            <TextInput style={styles.signInput} placeholder='Quantity'
                                                keyboardType='numeric'
                                                // onChangeText={(text: string) => {handleInputChangeRecipe(text, 'quantity'), setFieldValue('quantity', text)}}
                                                onChangeText={(text: string) => {
                                                    // Remove any non-numeric characters
                                                    const numericText = text.replace(/[^0-9]/g, '');
                                                   
                                                    // Update the input field with the cleaned numeric text
                                                    handleInputChangeRecipe(numericText, 'quantity');
                                                    setFieldValue('quantity', numericText);
                                                    }}
                                                >

                                            </TextInput>
                                            { errors.quantity &&
                                                <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Order Quantity is required.</Text>
                                            }
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={handleSubmit }>
                                        <View style={styles.popupBtnCon}>
                                            <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={handleSubmit} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>

                    </View>
                </View>
            </KeyboardAwareScrollView>

        );
    }

    //Update Quantity API
    const updateItemPlanned = async (data) => {
        const JsonValue: any = await AsyncStorage.getItem('userInfo');
        let loginData = JSON.parse(JsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId
        let orderid = data[0]._id
        var myJson =
        {
            // productID": "630e18633a51ca4cb1078005",
            //         "productName": "Guava",
            //         "unit": "4",
            //         "price": 0,
            //         "quantity": 12
            _id: orderid,
            wmOrderId: null,
            wmOrderNumber: null,
            supplierId: data[0].supplierId,
            wMsupplierId: null,
            supplierName: data[0].supplierName,
            items: suplierupdateitemData,
            status: data[0].status,
            isInWatermelon: false,
            isDispatched: false,
            isDeleted: false,
            OutletId: outletId,

        }
        const result = await api.UpdateItemQty(token, myJson, orderid)
        if (result.success) {
            Toast.show('Item Updated Successfully', {
                duration: Toast.durations.LONG,
            })
            setPlanned(!planned)
            getProductSupplierOrderList()

        }
        else {

        }
    }
    //Get GRN By OrderId

    const getGrnListByOrderId = async (orderid) => {
        // Alert.alert()
        const JsonValue: any = await AsyncStorage.getItem('userInfo');
        let loginData = JSON.parse(JsonValue);
        let token = loginData.token;
        const result = await api.getAllMasterData(token, endPoint.GET_GRNLIST_BY_ORDERID + orderid);
        if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {

            setDataPreset(false);
        } else {
            const grnFilterList = result.data.filter((item) => item.receivedSupplierOrder._id === orderid)
            setfilterGrn(grnFilterList)
            setgrn(!grn)

        }
    }
    //Get Partial Rcvd Grn List
    const getPGrnListByOrderId = async (orderid) => {
        const JsonValue: any = await AsyncStorage.getItem('userInfo');
        let loginData = JSON.parse(JsonValue);
        let token = loginData.token;
        const result = await api.getAllMasterData(token, endPoint.GET_GRNLIST_BY_ORDERID + orderid);
        if (result.data.length === 0) {

        } else {
            const grnFilterList = result.data.filter((item) => item.receivedSupplierOrder._id === orderid)
            setfilterPGrn(grnFilterList)
            setUpdatePgrn(!updatePgrn)
        }
    }

    //Insert GRN API Integration -- Confirmed and isDispatched
    const insertGrn = async (data) => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        var item = [
            {
                price: data[0].items[0]?.price,
                productID: data[0].items[0]?.productID,
                productName: data[0].items[0]?.productName,
                quantity: receivedQty,
                rangeId: data[0].items[0]?.rangeId,
                unit: data[0].items[0]?.unit,
                wmProductId: data[0].items[0]?.wmProductId,
            }
        ]
        let myJson = {
            receivedSupplierOrder: {

                _id: data[0]._id,
                isDeleted: false,
                isDispatched: true,
                isInWatermelon: true,
                items: item,
                outletId: data[0].outletId,
                status: data[0].status,
                supplierId: data[0].supplierId,
                supplierName: data[0].supplierName,
                wMsupplierId: data[0].wMsupplierId,
                wmOrderId: data[0].wmOrderId,
                wmOrderNumber: data[0].wmOrderNumber,
            },
            remarks: remarks
        }
        const result = await api.insertgrn(token, myJson)
        if (result.success) {
            setConfirmedIsDispatched(false)
            setPartialStatus(false)
        }
        else {
        }
    }

    //Update Grn API Integration - Received Status
    const updateGrn = async (grnId) => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;

        var item = [
            {
                price: filterGrn[0].receivedSupplierOrder?.items[0]?.price,
                productID: filterGrn[0].receivedSupplierOrder?.items[0]?.productID,
                productName: filterGrn[0].receivedSupplierOrder?.items[0]?.productName,
                quantity: rcvQtyGrnedit,
                rangeId: filterGrn[0].receivedSupplierOrder?.items[0]?.rangeId,
                unit: filterGrn[0].receivedSupplierOrder?.items[0]?.unit,
                wmProductId: filterGrn[0].receivedSupplierOrder?.items[0]?.wmProductId,
                grnId: grnId,
                itemReceivedDate: itemRecievedDate,

            }
        ]

        let myJson = {
            _id: grnId,
            receivedSupplierOrder: {
                _id: supplierIdUpdateGrn,
                supplierId: filterGrn[0].receivedSupplierOrder?.supplierId,
                supplierName: filterGrn[0].receivedSupplierOrder?.supplierName,
                wMsupplierId: filterGrn[0].receivedSupplierOrder?.wMsupplierId,
                wmOrderId: filterGrn[0].receivedSupplierOrder?.wmOrderId,
                wmOrderNumber: filterGrn[0].receivedSupplierOrder?.wmOrderNumber,
                items: item,
                status: filterGrn[0].receivedSupplierOrder?.status,
                isInWatermelon: true,
                isDispatched: true,

                isDeleted: false,
                outletId: filterGrn[0].receivedSupplierOrder?.outletId,
            },
            remarks: updateGrnremark,
            receivedDate: itemRecievedDate,
            isDeleted: false
        }

        const result = await api.updateGrn(token, myJson, grnId)
        if (result.data === null) {
            Toast.show('some error occured please try again later')

        }
        else {
            setgrn(!grn)
            getProductSupplierOrderList()
            setRcvQtyGrn(false)

        }


    }

    //Update Grn API Integration - Partially Received Status
    const updatePGrn = async (grnId) => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;

        var item = [
            {
                price: filterPGrn[0].receivedSupplierOrder?.items[0]?.price,
                productID: filterPGrn[0].receivedSupplierOrder?.items[0]?.productID,
                productName: filterPGrn[0].receivedSupplierOrder?.items[0]?.productName,
                quantity: rcvQtyPGrnedit,
                rangeId: filterPGrn[0].receivedSupplierOrder?.items[0]?.rangeId,
                unit: filterPGrn[0].receivedSupplierOrder?.items[0]?.unit,
                wmProductId: filterPGrn[0].receivedSupplierOrder?.items[0]?.wmProductId,
                grnId: grnId,
                itemReceivedDate: itemPRecievedDate,

            }
        ]

        let myJson = {
            _id: grnId,
            receivedSupplierOrder: {
                _id: supplierIdPUpdateGrn,
                supplierId: filterPGrn[0].receivedSupplierOrder?.supplierId,
                supplierName: filterPGrn[0].receivedSupplierOrder?.supplierName,
                wMsupplierId: filterPGrn[0].receivedSupplierOrder?.wMsupplierId,
                wmOrderId: filterPGrn[0].receivedSupplierOrder?.wmOrderId,
                wmOrderNumber: filterPGrn[0].receivedSupplierOrder?.wmOrderNumber,
                items: item,
                status: filterPGrn[0].receivedSupplierOrder?.status,
                isInWatermelon: true,
                isDispatched: true,

                isDeleted: false,
                outletId: filterPGrn[0].receivedSupplierOrder?.outletId,
            },
            remarks: updatePGrnremark,
            receivedDate: itemPRecievedDate,
            isDeleted: false
        }

        const result = await api.updateGrn(token, myJson, grnId)
        if (result.data?.length === 0) {
            Toast.show('some error occured please try again later')

        }
        else {
            setUpdatePgrn(!updatePgrn)
            getProductSupplierOrderList()
            setRcvQtyPGrn(false)
        }


    }

    //Insert GRN API Integration -- Partially received
    const insertGrnPartial = async (data) => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        var item = [
            {
                price: data[0].items[0]?.price,
                productID: data[0].items[0]?.productID,
                productName: data[0].items[0]?.productName,
                quantity: partialRcvdQtyIg,
                rangeId: data[0].items[0]?.rangeId,
                unit: data[0].items[0]?.unit,
                wmProductId: data[0].items[0]?.wmProductId,
            }
        ]
        let myJson = {
            receivedSupplierOrder: {

                _id: data[0]._id,
                isDeleted: false,
                isDispatched: true,
                isInWatermelon: true,
                items: item,
                outletId: data[0].outletId,
                status: data[0].status,
                supplierId: data[0].supplierId,
                supplierName: data[0].supplierName,
                wMsupplierId: data[0].wMsupplierId,
                wmOrderId: data[0].wmOrderId,
                wmOrderNumber: data[0].wmOrderNumber,
            },
            remarks: remarksIg
        }
        const result = await api.insertgrn(token, myJson)
        if (result.success) {
            Toast.show("Insert Grn Partial Created Successfully")
            setPartialStatInsertgrn(false)
        }
        else {
        }
    }
    //Order Confirm API
    const orderConfirm = async (orderId) => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        const result = await api.changeplannedstatus(orderId, outletId, token)
        if (result.success) {
            successInternetdownOpen()

        }
        else {
            Toast.show('Order Confirmed Successfully', {
                duration: Toast.durations.LONG,
            })
            getProductSupplierOrderList();
        }
    }

    const togglePlanned = () => {
        setPlanned(!planned)
    }

    const toggleConfirmed = () => {
        setConfirmed(!confirmed)
    }
    const toggleConfirmedIsDipatched = () => {
        setConfirmedIsDispatched(!confirmedIsDispatched)
    }
    const togglePartialReceivedView = () => {
        setPartialStatus(!partialStatus)
    }

    const toggleReceived = () => {
        setReceived(!received)
    }
    const toggleGrn = () => {
        setgrn(!grn)
    }

    const togglePartialReceivedInsertgrn = () => {
        setPartialStatInsertgrn(!partialStatInsertGrn)
    }
    const togglePUpdategrn = () => {
        setUpdatePgrn(!updatePgrn)
    }
    //Planned Data By Id 
    const plannedDatabyId = (id) => {
        const plannedDataFilterbyId = plannedData.filter((item) => item._id == id)
        setFilterPlanneddataById(plannedDataFilterbyId)
        setfilterPlanned(plannedDataFilterbyId[0]?.items)
        setPlanned(!planned)

    }

    //Confirmed Data By Id 
    const confirmedDatabyId = (id) => {
        const confirmedDataFilterbyId = confirmedData.filter((item) => item._id == id)
        setfilterConfirmed(confirmedDataFilterbyId[0]?.items)
        setConfirmed(!confirmed)

    }
    //Confirmed Data By Id is Dispatched
    const confirmedDatabyIdisDispatched = (id) => {
        const confirmedDataFilterbyId = confirmedisdispatchedData.filter((item) => item._id == id)
        setConfirmedIsDispatchedData(confirmedDataFilterbyId[0]?.items)

        setDispatchedQuantity(confirmedDataFilterbyId[0]?.items[0]?.quantity)
        setConfirmedIsDispatched(!confirmedIsDispatched)

    }

    //Received Data By Id
    const receivedDatabyId = (id) => {
        const receiveDataFilterbyId = receivedData.filter((item) => item._id === id)
        setfilterReceived(receiveDataFilterbyId[0]?.items)
        setReceived(!received)
    }
    //Partial Received Data By Id
    const partialRceivedbyId = (id) => {
        const receiveDataFilterbyId = partialReceivedData.filter((item) => item._id === id)
        setPartialReceivedDatabyId(receiveDataFilterbyId[0]?.items)
        setPartialStatus(!partialStatus)
    }
    //Calling Partial InsertGrn by Id
    const partialReceivedInsertgrnDatabyId = (id) => {
        const receiveDataFilterbyId = partialReceivedData.filter((item) => item._id === id)
        setfilterPartilaInsertgrnData(receiveDataFilterbyId[0]?.items)
        setPartialRcvdQtyIg(receiveDataFilterbyId[0]?.items[0]?.quantity)
        setPartialStatInsertgrn(!partialStatInsertGrn)
    }
    //Calling Grn by Id
    const receivedGrnDatabyId = (id) => {
        const receiveDataFilterbyId = receivedData.filter((item) => item._id === id)
        setfilterReceived(receiveDataFilterbyId[0]?.items)
        getGrnListByOrderId(id)
    }
    //Calling  PGrn by Id 
    const receivedPGrnDatabyId = (id) => {
        const receiveDataFilterbyId = partialReceivedData.filter((item) => item._id === id)
        setFilterPGrnlistData(receiveDataFilterbyId[0]?.items)
        getPGrnListByOrderId(id)
    }

    //filter planned item update
    const plannedItemfFilter = (prodId) => {
        const filterProd = filterPlanned.filter((item) => item?.productID === prodId)
        setProdFilterPlanned(filterProd)

    }
    //DELETE ALERT
    const deleteAlert = (supplierid) => {
        Alert.alert('Info', 'Are you sure you want to Delete Order', [
            {
                text: 'Cancel',
                onPress: () => {
                },
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    callDeleteApi(supplierid);
                },
            },
        ]);
    }
    //DELETE ROLE API
    const callDeleteApi = async (supplierid) => {
        const jsonValue = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;

        const result = await api.DeleteMasterData(endPoint.DELETE_SUPPLIER_ORDER + supplierid, token);
        if (result.success) {
            Toast.show('Order Deleted Successfully', {
                duration: Toast.durations.LONG,
            });
            getProductSupplierOrderList()
        }
        else {
            // Add a Toast on screen.
            // Toast.show("Some Error occured. Please try again.", {
            //     duration: Toast.durations.LONG,
            // });
            // successInternetdownOpen()
        }
    }

    //Supplier Order Table List View
    const tableRow = (data) => (
        <View style={[styles.tableRow, { borderColor: showView && showViewId == data._id ? '#407C6A' : '#F5F3F6' }]} >
            <DataTable.Row style={styles.datatableextraline} key={data._id}>
                <DataTable.Cell style={styles.userssl}><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>{data.wmOrderNumber}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>{data.supplierName}</Text></DataTable.Cell>
                {data.createdOn ?
                    <DataTable.Cell><Text style={styles.tableCell}>{moment(data.createdOn).format('YYYY-MM-DD H:mm')}</Text></DataTable.Cell> :
                    <DataTable.Cell><Text style={styles.tableCell}>{moment(data.lastModifiedOn).format('YYYY-MM-DD H:mm')}</Text></DataTable.Cell>

                }
                {
                    data.status == "Planned" &&
                    <DataTable.Cell><View style={[styles.runningStatus]}><Text style={[styles.font12, styles.fontBold, styles.redText]}>{data.status}</Text></View></DataTable.Cell>
                }


                {
                    data.status == "Confirmed" && data.isDispatched == false &&
                    <DataTable.Cell><View style={[styles.runningStatus, styles.Prepared]}><Text style={[styles.font12, styles.fontBold, styles.preText]}>{data.status}</Text></View> </DataTable.Cell>
                }

                {
                    data.status == "Confirmed" && data.isDispatched == true &&
                    <DataTable.Cell><View style={[styles.runningStatus, styles.Prepared]}><Text style={[styles.font12, styles.fontBold, styles.preText]}>{data.status}</Text></View> </DataTable.Cell>
                }
                {
                    data.status == "PartiallyReceived" &&
                    <DataTable.Cell><Text style={styles.tableCell}>{data.status}</Text></DataTable.Cell>
                }

                {
                    data.status == "Received" &&
                    <DataTable.Cell><View style={[styles.runningStatus, styles.ComplStatus]}><Text style={[styles.font12, styles.fontBold, styles.TextGreen]}>{data.status}</Text></View></DataTable.Cell>
                }
                {
                    data.status == "Planned" &&
                    <DataTable.Cell style={[styles.justifyCenter]}>
                        <View style={styles.tableButton}>
                            <View style={styles.viewBtn}>
                                {
                                    showViewId != data._id ?
                                        <TouchableOpacity onPress={() => {
                                            setShowViewId(data._id)
                                            plannedDatabyId(data._id)
                                        }

                                        }>
                                            <EyeIcon />

                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => {
                                            setShowView(false)
                                            setShowViewId('')
                                        }
                                        }>
                                            <EyeIcon />
                                        </TouchableOpacity>
                                }

                            </View>


                            <TouchableOpacity onPress={() => orderConfirm(data._id)} style={[styles.viewBtn, styles.editBtn]}>

                                <EditIcon />
                            </TouchableOpacity>
                            <Pressable style={styles.editBtn} onPress={() => deleteAlert(data._id)}>
                                <TableDelete />
                            </Pressable>
                        </View>
                    </DataTable.Cell>
                }


                {
                    data.status == "Confirmed" && data.isDispatched == false &&
                    <DataTable.Cell style={[styles.justifyCenter]}>
                        <View style={styles.tableButton}>
                            <View style={styles.viewBtn}>
                                {
                                    showViewId != data._id ?
                                        <TouchableOpacity onPress={() => {


                                            //   setShowView(true)
                                            setShowViewId(data._id)
                                            confirmedDatabyId(data._id)
                                        }
                                        }>
                                            <EyeIcon />

                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => {
                                            setShowView(false)
                                            setShowViewId('')
                                        }
                                        }>
                                            <EyeIcon />
                                        </TouchableOpacity>
                                }

                            </View>
                        </View>
                    </DataTable.Cell>
                }

                {
                    data.status == "Confirmed" && data.isDispatched == true &&
                    <DataTable.Cell style={[styles.justifyCenter]}>
                        <View style={styles.tableButton}>
                            <View style={[styles.viewBtn]}>
                                {
                                    showViewId != data._id ?
                                        <TouchableOpacity onPress={() => {


                                            //   setShowView(true)
                                            setShowViewId(data._id)
                                            confirmedDatabyIdisDispatched(data._id)
                                        }
                                        }>
                                            <EyeIcon />

                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => {
                                            setShowView(false)
                                            setShowViewId('')
                                        }
                                        }>
                                            <EyeIcon />
                                        </TouchableOpacity>
                                }

                            </View>


                            <TouchableOpacity style={[styles.editBtn]} onPress={() => confirmedDatabyIdisDispatched(data._id)}>
                                <EditIcon />
                            </TouchableOpacity>
                            {/* <Pressable style={styles.editBtn}>
                      <Image
                        style={styles.DeleteIcon}
                        source={(require('../../assets/images/trash_icon.png'))}
                      />
                    </Pressable> */}
                        </View>
                    </DataTable.Cell>
                }



                {
                    data.status == "Received" &&
                    <DataTable.Cell style={[styles.justifyCenter]}>
                        <View style={styles.tableButton}>
                            <View style={styles.viewBtn}>
                                {
                                    showViewId != data._id ?
                                        <TouchableOpacity onPress={() => {
                                            setShowViewId(data._id)
                                            receivedDatabyId(data._id)
                                        }

                                        }>
                                            <EyeIcon />

                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => {
                                            setShowView(false)
                                            setShowViewId('')
                                        }
                                        }>
                                            <EyeIcon />
                                        </TouchableOpacity>
                                }

                            </View>

                            <View style={[styles.editBtn]}>

                                {
                                    showViewId != data._id ?
                                        <TouchableOpacity onPress={() => {
                                            setShowViewId(data._id)
                                            receivedGrnDatabyId(data._id)
                                        }

                                        }>
                                            <EditIcon />

                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => {
                                            setShowView(false)
                                            setShowViewId('')
                                        }
                                        }>
                                            <EditIcon />
                                        </TouchableOpacity>
                                }
                            </View>
                            {/* <Pressable style={styles.editBtn}>
                      <Image
                        style={styles.DeleteIcon}
                        source={(require('../../assets/images/trash_icon.png'))}
                      />
                    </Pressable> */}
                        </View>
                    </DataTable.Cell>
                }
                {
                    data.status == "PartiallyReceived" &&
                    <DataTable.Cell >
                        <View style={styles.tableButton}>
                            <View style={[styles.viewBtn]}>
                                {
                                    showViewId != data._id ?
                                        <TouchableOpacity onPress={() => {
                                            setShowViewId(data._id)
                                            partialRceivedbyId(data._id)
                                        }

                                        }>
                                            <EyeIcon />

                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => {
                                            setShowView(false)
                                            setShowViewId('')
                                        }
                                        }>
                                            <EyeIcon />
                                        </TouchableOpacity>
                                }

                            </View>

                            <View style={[styles.viewBtn, styles.editBtn]}>

                                {
                                    showViewId != data._id ?
                                        <TouchableOpacity onPress={() => {
                                            setShowViewId(data._id)
                                            partialReceivedInsertgrnDatabyId(data._id)
                                        }

                                        }>
                                            <EditIcon />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => {
                                            setShowView(false)
                                            setShowViewId('')
                                        }
                                        }>
                                            <EditIcon />
                                        </TouchableOpacity>
                                }
                            </View>
                            <View style={[styles.editBtn]}>

                                {
                                    showViewId != data._id ?
                                        <TouchableOpacity onPress={() => {
                                            setShowViewId(data._id)
                                            receivedPGrnDatabyId(data._id)
                                        }

                                        }>
                                            <EyeIcon />

                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => {
                                            setShowView(false)
                                            setShowViewId('')
                                        }
                                        }>
                                            <EyeIcon />
                                        </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </DataTable.Cell>
                }
            </DataTable.Row>
        </View>
    );

    //update product in planned 
    const insertUpdateItemData = async (data) => {
        const newState = data.map(obj => {
            // 👇️ if id equals 2, update country property
            if (obj.productID === showViewPlannedId) {
                return { ...obj, quantity: quantityData };
            }
            return obj;
        });
        setsuplierupdateitemData(newState);
    }
    const DeleteorderItemData = async (data) => {
        const newTaskArray = filterPlanned.filter(task => task.productID !== data);
        setsuplierupdateitemData(newTaskArray)

    }

    useEffect(() => {
        if (suplierupdateitemData) {
            updateItemPlanned(filterplanneddataById)
        }
    }, [suplierupdateitemData]);


    //Planned Status Popup  
    const popupPlanned = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>
                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>
                                Planned
                            </Text>
                            <Pressable style={styles.closeView} onPress={() => togglePlanned()}>
                                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                <Text style={styles.closeText}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>
                        <View style={[styles.wdth100, styles.paddL15]}>
                            <View style={[styles.flexrow, styles.justifyBetween, styles.marBtm20, styles.wdth100, styles.flexWrap]}>
                                {
                                    <DataTable>

                                        {isDataPresent && (
                                            <View style={[styles.producHeader]}>
                                                <DataTable.Header style={styles.headerStyle}>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Sl.No</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Product Name</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Unit</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Price</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Quantity</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Action</Text></DataTable.Title>
                                                </DataTable.Header>
                                            </View>
                                        )
                                        }
                                        {
                                            isDataPresent && filterPlanned.length != 0 &&
                                            filterPlanned.map((item, index) => (
                                                <View style={styles.ProductRow}>
                                                    <DataTable.Row style={styles.tableHeaderRow} key={item?.productID}>
                                                        <DataTable.Cell style={styles.proSer}><Text style={styles.tableCell}>{index + 1}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.FlexproducName}><Text style={styles.tableCell}> {item.productName}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.unit}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}> {item.price}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.quantity}</Text></DataTable.Cell>
                                                        <DataTable.Cell>
                                                            <View style={styles.tableButton}>
                                                                <View>
                                                                    {
                                                                        showViewPlannedId != item.productID ?
                                                                            <TouchableOpacity style={styles.viewBtn} onPress={() => {
                                                                                setShowView(true)
                                                                                setShowViewPlannedId(item.productID)
                                                                                setProdFilterPlanned(item.productID)
                                                                            }
                                                                            }>

                                                                                <Image
                                                                                    style={[styles.editIcon]}
                                                                                    source={(require('../../assets/images/edit_icon.png'))}
                                                                                />
                                                                            </TouchableOpacity>
                                                                            :
                                                                            <TouchableOpacity style={styles.viewBtn} onPress={() => {
                                                                                setShowView(false)
                                                                                setShowViewPlannedId('')
                                                                            }
                                                                            }>
                                                                                <Image
                                                                                    style={[styles.editIcon]}
                                                                                    source={(require('../../assets/images/edit_icon.png'))}
                                                                                />
                                                                            </TouchableOpacity>
                                                                    }
                                                                </View>

                                                                <Pressable onPress={() => { DeleteorderItemData(item.productID) }} style={styles.editBtn}>
                                                                    <Image
                                                                        style={styles.DeleteIcon}
                                                                        source={(require('../../assets/images/trash_icon.png'))}
                                                                    />
                                                                </Pressable>
                                                            </View>
                                                        </DataTable.Cell>
                                                    </DataTable.Row>
                                                    {
                                                        showView && showViewPlannedId == item.productID &&
                                                        <View style={styles.viewCon}>
                                                            <View style={styles.ViewConBlk}>
                                                                <View style={styles.viewCatView}>
                                                                    <Text style={styles.catName}>Product Name :</Text>
                                                                    <Text style={styles.catValue}>{item.productName}</Text>
                                                                </View>
                                                                <View style={styles.viewCatView}>
                                                                    <Text style={styles.catName}>Unit : </Text>
                                                                    <Text style={styles.catValue}>{item.unit}</Text>
                                                                </View>
                                                                <View style={styles.viewCatView}>
                                                                    <Text style={styles.catName}>Price :</Text>
                                                                    <Text style={styles.catValue}>{item.price}</Text>
                                                                </View>
                                                                <View style={styles.viewCatView}>
                                                                    <Text style={styles.catName}>Quantity :</Text>
                                                                    <TextInput style={styles.signInput}
                                                                        onChangeText={(text) => setQuantityData(text)}>{item.quantity}</TextInput>

                                                                </View>
                                                                <TouchableOpacity onPress={() => insertUpdateItemData(filterPlanned)}>
                                                                    <View style={styles.popupBtnCon}>
                                                                        <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={() => insertUpdateItemData(filterPlanned)} />
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    }

                                                </View>
                                            ))
                                        }
                                    </DataTable>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
    //Confirmed Status Popup
    const popupConfirmed = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>
                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>
                                Confirmed
                            </Text>
                            <Pressable style={styles.closeView} onPress={() => toggleConfirmed()}>
                                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                <Text style={styles.closeText}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>
                        <View style={[styles.wdth100, styles.paddL15]}>
                            <View style={[styles.flexrow, styles.justifyBetween, styles.marBtm20, styles.wdth100, styles.flexWrap]}>
                                {
                                    <DataTable>
                                        {isDataPresent && (
                                            <View style={[styles.producHeader]}>
                                                <DataTable.Header style={styles.headerStyle}>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Sl .No</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Product Name</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Unit</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Price</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Quantity</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Action</Text></DataTable.Title>
                                                </DataTable.Header>
                                            </View>
                                        )
                                        }
                                        {
                                            isDataPresent && filterConfirmed.length != 0 &&
                                            filterConfirmed.map((item, index) => (
                                                <View style={styles.ProductRow}>
                                                    <DataTable.Row style={styles.tableHeaderRow} key={item._id}>
                                                        <DataTable.Cell style={styles.proSer}><Text style={styles.tableCell}>{index + 1}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.FlexproducName}><Text style={styles.tableCell}> {item.productName}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.unit}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}> {item.price}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.quantity}</Text></DataTable.Cell>
                                                        <DataTable.Cell>
                                                        </DataTable.Cell>
                                                    </DataTable.Row>
                                                </View>
                                            ))
                                        }

                                    </DataTable>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
    const popupConfirmedIsDispatched = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>
                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>
                                Confirmed Is Dispatched
                            </Text>
                            <Pressable style={styles.closeView} onPress={() => toggleConfirmedIsDipatched()}>
                                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                <Text style={styles.closeText}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>
                        <View style={[styles.wdth100, styles.paddL15]}>
                            <View style={[styles.flexrow, styles.justifyBetween, styles.marBtm20, styles.wdth100, styles.flexWrap]}>
                                {
                                    <DataTable>
                                        {isDataPresent && (
                                            <View style={[styles.producHeader]}>
                                                <DataTable.Header style={styles.headerStyle}>
                                                    <DataTable.Title style={styles.flexSl}><Text style={styles.tableHeader}>Sl .No</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.FlexproducName}><Text style={styles.tableHeader}>Product Name</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Unit</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Price</Text></DataTable.Title>
                                                    <DataTable.Title><Text style={styles.tableHeader}>Quantity</Text></DataTable.Title>
                                                    <DataTable.Title><Text style={styles.tableHeader}>Received Qty</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.justifyCenter}><Text style={styles.tableHeader}>Action</Text></DataTable.Title>
                                                </DataTable.Header>
                                            </View>
                                        )
                                        }
                                        {
                                            isDataPresent && confirmedIsDispatchedData.length != 0 &&
                                            confirmedIsDispatchedData.map((item, index) => (

                                                <View style={styles.ProductRow}>
                                                    <DataTable.Row style={styles.datatableextraline} key={item._id}>
                                                        <DataTable.Cell style={styles.flexSl}><Text style={styles.tableCell}>{index + 1}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.FlexproducName}><Text style={styles.tableCell}> {item.productName}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.unit}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}> {item.price}</Text></DataTable.Cell>
                                                        <DataTable.Cell>
                                                            <View><TextInput editable={false} style={styles.tableCell}>{receivedQty}</TextInput></View></DataTable.Cell>

                                                        <DataTable.Cell>
                                                            <View>
                                                                <TextInput keyboardType="numeric" style={[styles.AddsignInput, styles.height35]}
                                                                    onChangeText={(text) => setReceivedQty(text)}
                                                                >{item.quantity}
                                                                </TextInput>
                                                            </View>
                                                        </DataTable.Cell>

                                                        <DataTable.Cell style={[styles.justifyCenter]}>
                                                            <TouchableOpacity style={styles.flexAlignRow}
                                                                onPress={() => {
                                                                    setSelection(!isSelected)
                                                                }}>
                                                                <View style={[styles.checkbox, isSelected && styles.radioBtnChecked]}>
                                                                    {
                                                                        (isSelected) ? <View style={styles.checkTick}></View> : null
                                                                    }
                                                                </View>
                                                                <Text style={styles.checkboxText}>Mark Received</Text>

                                                            </TouchableOpacity>
                                                        </DataTable.Cell>

                                                    </DataTable.Row>
                                                </View>
                                            ))
                                        }

                                    </DataTable>

                                }
                            </View>
                            <View style={styles.marginBtm11}>
                                <View style={styles.wdth50}>
                                    <Text style={[styles.signLabel, styles.font12, styles.textDefault]}>Remarks</Text>
                                    <TextInput
                                        style={[styles.AddsignInput]}
                                        onChangeText={(text) => onChangeremarks(text)}
                                        placeholder='Remarks'
                                    />
                                </View>
                            </View>
                            <View style={[styles.flexrow, styles.justifyEnd]}>
                                {isSelected ?
                                    <CustomButton label={"Save"} onPress={() => insertGrn(confirmedisdispatchedData)} />
                                    : null}
                            </View>
                        </View>
                        <TextInput></TextInput>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }

    //Partially Received Status View  Popup
    const popupPartialReceivedView = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>
                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>
                                Partial Received View
                            </Text>
                            <Pressable style={styles.closeView} onPress={() => togglePartialReceivedView()}>
                                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                <Text style={styles.closeText}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>
                        <View style={[styles.wdth100, styles.paddL15]}>
                            <View style={[styles.flexrow, styles.justifyBetween, styles.marBtm20, styles.wdth100, styles.flexWrap]}>
                                {
                                    <DataTable>
                                        {isDataPresent && (
                                            <View style={[styles.producHeader]}>
                                                <DataTable.Header style={styles.headerStyle}>
                                                    <DataTable.Title style={styles.flexSl}><Text style={styles.tableHeader}>Sl .No</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.FlexproducName}><Text style={styles.tableHeader}>Product Name</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Unit</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Price</Text></DataTable.Title>
                                                    <DataTable.Title><Text style={styles.tableHeader}>Quantity</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.justifyCenter}><Text style={styles.tableHeader}>Action</Text></DataTable.Title>
                                                </DataTable.Header>
                                            </View>
                                        )
                                        }
                                        {
                                            isDataPresent && partialRcvdDataById.length != 0 &&
                                            partialRcvdDataById.map((item, index) => (

                                                <View style={styles.ProductRow}>
                                                    <DataTable.Row style={styles.datatableextraline} key={item._id}>
                                                        <DataTable.Cell style={styles.flexSl}><Text style={styles.tableCell}>{index + 1}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.FlexproducName}><Text style={styles.tableCell}> {item.productName}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.unit}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}> {item.price}</Text></DataTable.Cell>
                                                        <DataTable.Cell><Text style={styles.tableCell}>{item.quantity}</Text></DataTable.Cell>
                                                        <DataTable.Cell>
                                                        </DataTable.Cell>
                                                    </DataTable.Row>

                                                </View>
                                            ))
                                        }


                                    </DataTable>
                                }
                            </View>
                        </View>
                        <TextInput></TextInput>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
    //Partially Received Status Insert Grn Popup
    const popupPartialInsert = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>
                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>
                                Partial Insert GRN
                            </Text>
                            <Pressable style={styles.closeView} onPress={() => togglePartialReceivedInsertgrn()}>
                                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                <Text style={styles.closeText}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>
                        <View style={[styles.wdth100, styles.paddL15]}>
                            <View style={[styles.flexrow, styles.justifyBetween, styles.marBtm20, styles.wdth100, styles.flexWrap]}>
                                {
                                    <DataTable>
                                        {isDataPresent && (
                                            <View style={[styles.producHeader]}>
                                                <DataTable.Header style={styles.headerStyle}>
                                                    <DataTable.Title style={styles.flexSl}><Text style={styles.tableHeader}>Sl .No</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.FlexproducName}><Text style={styles.tableHeader}>Product Name</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Unit</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Price</Text></DataTable.Title>
                                                    <DataTable.Title><Text style={styles.tableHeader}>Quantity</Text></DataTable.Title>
                                                    <DataTable.Title><Text style={styles.tableHeader}>Received Qty</Text></DataTable.Title>
                                                    <DataTable.Title style={[styles.justifyCenter]}><Text style={styles.tableHeader}>Action</Text></DataTable.Title>
                                                </DataTable.Header>
                                            </View>
                                        )
                                        }
                                        {
                                            isDataPresent && partialRcvdfilterInsertgrn.length != 0 &&
                                            partialRcvdfilterInsertgrn.map((item, index) => (

                                                <View style={styles.ProductRow}>
                                                    <DataTable.Row style={styles.datatableextraline} key={item._id}>
                                                        <DataTable.Cell style={styles.flexSl}><Text style={styles.tableCell}>{index + 1}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={[styles.FlexproducName, styles.paddR8]}><Text style={styles.tableCell}> {item.productName}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.unit}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}> {item.price}</Text></DataTable.Cell>
                                                        <DataTable.Cell>
                                                            <View><TextInput editable={false} style={styles.tableCell}>{partialRcvdQtyIg}</TextInput></View></DataTable.Cell>
                                                        <DataTable.Cell>
                                                            <View>
                                                                <TextInput keyboardType="numeric" style={[styles.AddsignInput, styles.height35]}
                                                                    onChangeText={(text) => setPartialRcvdQtyIg(text)}
                                                                >{item.quantity}
                                                                </TextInput>
                                                            </View>
                                                        </DataTable.Cell>

                                                        <DataTable.Cell style={[styles.justifyCenter]}>
                                                            <TouchableOpacity style={styles.flexAlignRow}
                                                                onPress={() => {
                                                                    setSelection1(!isSelected1)
                                                                }}>
                                                                <View style={[styles.checkbox, isSelected1 && styles.radioBtnChecked]}>
                                                                    {
                                                                        (isSelected1) ? <View style={styles.checkTick}></View> : null
                                                                    }
                                                                </View>
                                                                <Text style={styles.checkboxText}>Mark Received</Text>

                                                            </TouchableOpacity>
                                                        </DataTable.Cell>

                                                    </DataTable.Row>
                                                </View>
                                            ))
                                        }

                                    </DataTable>

                                }
                            </View>
                            <View style={styles.marginBtm11}>
                                <View style={styles.wdth50}>
                                    <Text style={[styles.signLabel, styles.font12, styles.textDefault]}>Remarks</Text>
                                    <TextInput
                                        style={[styles.AddsignInput, styles.height35]}
                                        onChangeText={(text) => onChangeremarksIg(text)}
                                        placeholder='Remarks'
                                    />
                                </View>
                            </View>
                            <View style={[styles.flexrow, styles.justifyEnd]}>
                                {isSelected1 ?
                                    <CustomButton label={"Save"} onPress={() => insertGrnPartial(partialReceivedData)} />
                                    : null}
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
    //Partially Recieved Update Grn
    const popupPartialUpdateGrn = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>
                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>
                                Update Partial GRN
                            </Text>
                            <Pressable style={styles.closeView} onPress={() => [togglePUpdategrn(), setRcvQtyPGrn(false)]}>
                                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                <Text style={styles.closeText}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>
                        <View style={[styles.wdth100, styles.paddL15]}>
                            <View style={[styles.flexrow, styles.justifyBetween, styles.marBtm20, styles.wdth100, styles.flexWrap]}>
                                {
                                    <DataTable>
                                        {isDataPresent && (
                                            <View style={[styles.producHeader]}>
                                                <DataTable.Header style={styles.headerStyle}>
                                                    <DataTable.Title style={[styles.flexSl]}><Text style={styles.tableHeader}>Sl .No</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.FlexproducName}><Text style={styles.tableHeader}>Product Name</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Unit</Text></DataTable.Title>
                                                    <DataTable.Title><Text style={styles.tableHeader}>Price</Text></DataTable.Title>
                                                    <DataTable.Title><Text style={styles.tableHeader}>Quantity</Text></DataTable.Title>
                                                    {/* <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Received Quantity</Text></DataTable.Title> */}
                                                    {/* <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Received Quantity</Text></DataTable.Title> */}
                                                </DataTable.Header>
                                            </View>
                                        )
                                        }
                                        {
                                            isDataPresent && filterPGrnlistData.length != 0 &&
                                            filterPGrnlistData.map((item, index) => (

                                                <View style={styles.ProductRow}>
                                                    <DataTable.Row style={styles.datatableextraline} key={item._id}>
                                                        <DataTable.Cell style={[styles.flexSl]}><Text style={styles.tableCell}>{index + 1}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.FlexproducName}><Text style={styles.tableCell}> {item.productName}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={[styles.producName]}><Text style={styles.tableCell}>{item.unit}</Text></DataTable.Cell>
                                                        <DataTable.Cell><Text style={styles.tableCell}> {item.price}</Text></DataTable.Cell>
                                                        <DataTable.Cell><Text style={styles.tableCell}>{item.quantity}</Text></DataTable.Cell>
                                                    </DataTable.Row>
                                                </View>
                                            ))
                                        }

                                    </DataTable>
                                }
                            </View>
                        </View>

                        {rcvQtyPGrn ?
                            <View style={[styles.width50, styles.paddRL15]}>
                                <Text style={[styles.signLabel, styles.textDefault]}>Remarks</Text>
                                <TextInput style={[styles.AddsignInput, styles.height35]} onChangeText={(text) => setUpdatePGrnRemarks(text)}>{updatePGrnremark}</TextInput>
                            </View> : null

                        }
                        <View style={[styles.martop32, styles.paddRL15]}>
                            <View style={[styles.receipeCon]}>
                                <Text style={[styles.font16, styles.textBlack, styles.receipeText, styles.recQuaText]}>Received Quantity</Text>
                                {
                                    <DataTable>
                                        {isDataPresent &&
                                            (
                                                <View>
                                                    <DataTable.Header style={styles.headerBorder}>
                                                        <DataTable.Title style={[styles.flexSl]}><Text style={styles.tableHeader}>Sl .No</Text> </DataTable.Title>
                                                        <DataTable.Title style={[styles.FlexproducName]}><Text style={styles.tableHeader}>Product Name</Text></DataTable.Title>
                                                        <DataTable.Title><Text style={styles.tableHeader}>Received Quantity</Text> </DataTable.Title>
                                                        <DataTable.Title><Text style={styles.tableHeader}>Received Date</Text> </DataTable.Title>
                                                        <DataTable.Title style={styles.justifyCenter}><Text style={styles.tableHeader}>Action</Text> </DataTable.Title>
                                                    </DataTable.Header>
                                                </View>
                                            )}
                                        {
                                            isDataPresent && filterPGrn.length != 0 &&
                                            filterPGrn.map((item, index) => (

                                                <View style={[styles.itemtableRow]} >
                                                    <DataTable.Row style={styles.datatableextraline} key={item.receivedSupplierOrder._id}>
                                                        <DataTable.Cell style={[styles.flexSl]}><Text style={[styles.tableCell, styles.tableCount]}>{index + 1}</Text></DataTable.Cell>

                                                        <DataTable.Cell style={[styles.FlexproducName]}><TextInput style={styles.tableCell}>{item.receivedSupplierOrder.items[0]?.productName}</TextInput></DataTable.Cell>
                                                        {/* <View></View><DataTable.Cell><TextInput style={styles.tableCell} editable = {true}>{item.receivedSupplierOrder.items[0]?.quantity}</TextInput></DataTable.Cell> */}
                                                        <DataTable.Cell>
                                                            <View>
                                                                <TextInput keyboardType="numeric" style={[styles.AddsignInput, styles.height35]}
                                                                    editable={rcvQtyPGrn}
                                                                    onChangeText={(text) => [setRcvQtyPGrnedit(text), setRcvQtyPGrn(true)]}
                                                                >{item.receivedSupplierOrder.items[0]?.quantity}
                                                                </TextInput>
                                                            </View>
                                                        </DataTable.Cell>

                                                        <DataTable.Cell ><Text style={styles.tableCell}>{moment(item.receivedDate).format('YYYY-MM-DD H:mm')}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={[styles.justifyCenter]}>
                                                            {!rcvQtyPGrn ?
                                                                <View>

                                                                    <TouchableOpacity onPress={() => [setRcvQtyPGrn(true), setSupplierIdPUpdateGrn(item.receivedSupplierOrder._id), setItemPRecievedDate(item.receivedDate)]}>
                                                                        {/* <Image
                                                                      style={styles.DeleteIcon}
                                                                      source={(require('../../assets/images/edit_icon.png'))}
                                                                  /> */}
                                                                        <EditIcon />
                                                                    </TouchableOpacity>
                                                                </View> :
                                                                <View>
                                                                    <TouchableOpacity onPress={() => updatePGrn(item._id)}>
                                                                        {/* <Image
                                                                    style={styles.DeleteIcon}
                                                                    source={(require('../../assets/images/edit_icon.png'))}
                                                                /> */}
                                                                        <Text style={[styles.signLabel, styles.textDefault]}>Save</Text>
                                                                    </TouchableOpacity>
                                                                </View>

                                                            }

                                                        </DataTable.Cell>
                                                    </DataTable.Row>
                                                </View>
                                            ))}
                                    </DataTable>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
    //Received Status Popup
    const popupReceived = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>
                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>
                                Received
                            </Text>
                            <Pressable style={styles.closeView} onPress={() => toggleReceived()}>
                                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                <Text style={styles.closeText}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>
                        <View style={[styles.wdth100, styles.paddL15]}>
                            <View style={[styles.flexrow, styles.justifyBetween, styles.marBtm20, styles.wdth100, styles.flexWrap]}>
                                {
                                    <DataTable>
                                        {isDataPresent && (
                                            <View style={[styles.producHeader]}>
                                                <DataTable.Header style={styles.headerStyle}>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Sl .No</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Product Name</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Unit</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Price</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Quantity</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Action</Text></DataTable.Title>
                                                </DataTable.Header>
                                            </View>
                                        )
                                        }
                                        {
                                            isDataPresent && filterReceived.length != 0 &&
                                            filterReceived.map((item, index) => (

                                                <View style={styles.ProductRow}>
                                                    <DataTable.Row style={styles.tableHeaderRow} key={item._id}>
                                                        <DataTable.Cell style={styles.proSer}><Text style={styles.tableCell}>{index + 1}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.FlexproducName}><Text style={styles.tableCell}> {item.productName}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.unit}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}> {item.price}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.quantity}</Text></DataTable.Cell>
                                                        <DataTable.Cell>
                                                            {/* <View style={styles.tableButton}>
                                                                <View>
                                                                    {
                                                                        showViewId != filterReceived._id ?
                                                                            <TouchableOpacity style={styles.viewBtn} onPress={() => {
                                                                                setShowView(true)
                                                                                setShowViewId(filterReceived._id)
                                                                            }
                                                                            }>

                                                                                <Image
                                                                                    style={[styles.editIcon]}
                                                                                    source={(require('../../assets/images/edit_icon.png'))}
                                                                                />
                                                                            </TouchableOpacity>
                                                                            :
                                                                            <TouchableOpacity style={styles.viewBtn} onPress={() => {
                                                                                setShowView(false)
                                                                                setShowViewId('')
                                                                            }
                                                                            }>
                                                                                <Image
                                                                                    style={[styles.editIcon]}
                                                                                    source={(require('../../assets/images/edit_icon.png'))}
                                                                                />
                                                                            </TouchableOpacity>

                                                                    }
                                                                </View>
                                                            </View> */}
                                                        </DataTable.Cell>
                                                    </DataTable.Row>
                                                    {/* {
                                                        showView && showViewId == filterReceived._id &&

                                                        <View style={styles.viewCon}>
                                                            <View style={styles.ViewConBlk}>
                                                                <View style={styles.viewCatView}>
                                                                    <Text style={styles.catName}>Product Name :</Text>
                                                                    <Text style={styles.catValue}>{filterReceived.items?.productName}</Text>
                                                                </View>
                                                                <View style={styles.viewCatView}>
                                                                    <Text style={styles.catName}>Unit : </Text>
                                                                    <Text style={styles.catValue}>{filterReceived.items?.unit}</Text>
                                                                </View>
                                                                <View style={styles.viewCatView}>
                                                                    <Text style={styles.catName}>Price :</Text>
                                                                    <Text style={styles.catValue}>{filterReceived.items?.price}</Text>
                                                                </View>
                                                                <View style={styles.viewCatView}>
                                                                    <Text style={styles.catName}>Quantity :</Text>
                                                                    <TextInput style={styles.catValue}>{filterReceived.items?.quantity}</TextInput>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    } */}

                                                </View>
                                            ))
                                        }


                                    </DataTable>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }

    //Received Status Popup -- Update Grn
    const popupGrn = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>
                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>
                                GRN
                            </Text>
                            <Pressable style={styles.closeView} onPress={() => [toggleGrn(), setRcvQtyGrn(false)]}>
                                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                <Text style={styles.closeText}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>
                        <View style={[styles.wdth100, styles.paddRL15]}>
                            <View style={[styles.flexrow, styles.justifyBetween, styles.marBtm20, styles.wdth100, styles.flexWrap]}>
                                {
                                    <DataTable>
                                        {isDataPresent && (
                                            <DataTable.Header style={styles.headerStyle}>
                                                <DataTable.Title style={[styles.flexSl]}><Text style={styles.tableHeader}>Sl .No</Text></DataTable.Title>
                                                <DataTable.Title><Text style={styles.tableHeader}>Product Name</Text></DataTable.Title>
                                                <DataTable.Title><Text style={styles.tableHeader}>Unit</Text></DataTable.Title>
                                                <DataTable.Title><Text style={styles.tableHeader}>Price</Text></DataTable.Title>
                                                <DataTable.Title><Text style={styles.tableHeader}>Quantity</Text></DataTable.Title>
                                                {/* <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Received Quantity</Text></DataTable.Title> */}
                                                {/* <DataTable.Title style={styles.proSer}><Text style={styles.tableHeader}>Received Quantity</Text></DataTable.Title> */}
                                            </DataTable.Header>
                                        )
                                        }
                                        {
                                            isDataPresent && filterReceived.length != 0 &&
                                            filterReceived.map((item, index) => (

                                                <View style={[styles.tableRow, { borderColor: '#F5F3F6' }]} >
                                                    <DataTable.Row style={styles.datatableextraline} key={item._id}>
                                                        <DataTable.Cell style={[styles.flexSl]}><Text style={styles.tableCell}>{index + 1}</Text></DataTable.Cell>
                                                        <DataTable.Cell><Text style={styles.tableCell}> {item.productName}</Text></DataTable.Cell>
                                                        <DataTable.Cell><Text style={styles.tableCell}>{item.unit}</Text></DataTable.Cell>
                                                        <DataTable.Cell><Text style={styles.tableCell}> {item.price}</Text></DataTable.Cell>
                                                        <DataTable.Cell><Text style={styles.tableCell}>{item.quantity}</Text></DataTable.Cell>
                                                        {/* <DataTable.Cell> */}
                                                        {/* <View style={styles.tableButton}>
                                                                    <View>
                                                                        {
                                                                            showViewId != filterReceived._id ?
                                                                                <TouchableOpacity style={styles.viewBtn} onPress={() => {
                                                                                    setShowView(true)
                                                                                    setShowViewId(filterReceived._id)
                                                                                }
                                                                                }>
    
                                                                                    <Image
                                                                                        style={[styles.editIcon]}
                                                                                        source={(require('../../assets/images/edit_icon.png'))}
                                                                                    />
                                                                                </TouchableOpacity>
                                                                                :
                                                                                <TouchableOpacity style={styles.viewBtn} onPress={() => {
                                                                                    setShowView(false)
                                                                                    setShowViewId('')
                                                                                }
                                                                                }>
                                                                                    <Image
                                                                                        style={[styles.editIcon]}
                                                                                        source={(require('../../assets/images/edit_icon.png'))}
                                                                                    />
                                                                                </TouchableOpacity>
    
                                                                        }
                                                                    </View>
                                                                </View> */}
                                                        {/* </DataTable.Cell> */}
                                                    </DataTable.Row>

                                                </View>
                                            ))
                                        }


                                    </DataTable>
                                }
                            </View>
                        </View>

                        {rcvQtyGrn ?
                            <View style={[styles.width50, styles.paddRL15]}>
                                <Text style={[styles.signLabel, styles.textDefault]}>Remarks</Text>
                                <TextInput style={[styles.AddsignInput]} onChangeText={(text) => setUpdateGrnRemarks(text)}>{updateGrnremark}</TextInput>
                            </View> : null

                        }
                        <View style={[styles.martop32, styles.paddRL15]}>
                            <View style={[styles.receipeCon]}>
                                <Text style={[styles.font16, styles.textBlack, styles.receipeText, styles.recQuaText]}>Received Quantity</Text>
                                {
                                    <DataTable>
                                        {isDataPresent &&
                                            (
                                                <DataTable.Header style={styles.headerBorder}>
                                                    <DataTable.Title style={[styles.flexSl]}><Text style={styles.tableHeader}>Sl .No</Text> </DataTable.Title>
                                                    <DataTable.Title><Text style={styles.tableHeader}>Product Name</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.flexitemAmt}><Text style={styles.tableHeader}>Received Quantity</Text> </DataTable.Title>
                                                    <DataTable.Title><Text style={styles.tableHeader}>Received Date</Text> </DataTable.Title>
                                                    <DataTable.Title style={[styles.justifyCenter]}><Text style={styles.tableHeader}>Action</Text> </DataTable.Title>
                                                </DataTable.Header>
                                            )}
                                        {
                                            isDataPresent && filterGrn.length != 0 &&
                                            filterGrn.map((item, index) => (

                                                <View style={[styles.itemtableRow]} >
                                                    <DataTable.Row style={styles.datatableextraline} key={item.receivedSupplierOrder._id}>
                                                        <DataTable.Cell style={[styles.flexSl]}><Text style={[styles.tableCell, styles.tableCount]}>{index + 1}</Text></DataTable.Cell>

                                                        <DataTable.Cell><TextInput style={styles.tableCell}>{item.receivedSupplierOrder.items[0]?.productName}</TextInput></DataTable.Cell>
                                                        {/* <View></View><DataTable.Cell><TextInput style={styles.tableCell} editable = {true}>{item.receivedSupplierOrder.items[0]?.quantity}</TextInput></DataTable.Cell> */}
                                                        <DataTable.Cell style={styles.flexitemAmt}>
                                                            <View>
                                                                <TextInput keyboardType="numeric" style={[styles.AddsignInput, styles.height35]}
                                                                    editable={rcvQtyGrn}
                                                                    onChangeText={(text) => [setRcvQtyGrnedit(text), setRcvQtyGrn(true)]}
                                                                >{item.receivedSupplierOrder.items[0]?.quantity}
                                                                </TextInput>
                                                            </View>
                                                        </DataTable.Cell>

                                                        <DataTable.Cell ><Text style={styles.tableCell}>{moment(item.receivedDate).format('YYYY-MM-DD H:mm')}</Text></DataTable.Cell>
                                                        <DataTable.Cell style={[styles.justifyCenter]}>
                                                            {!rcvQtyGrn ?
                                                                <View>

                                                                    <TouchableOpacity style={styles.editBtn} onPress={() => [setRcvQtyGrn(true), setSupplierIdUpdateGrn(item.receivedSupplierOrder._id), setItemRecievedDate(item.receivedDate)]}>
                                                                        {/* <Image
                                                                      style={styles.DeleteIcon}
                                                                      source={(require('../../assets/images/edit_icon.png'))}
                                                                  /> */}
                                                                        <EditIcon />
                                                                    </TouchableOpacity>
                                                                </View> :
                                                                <View>
                                                                    <TouchableOpacity style={styles.editBtn} onPress={() => updateGrn(item._id)}>
                                                                        {/* <Image
                                                                    style={styles.DeleteIcon}
                                                                    source={(require('../../assets/images/edit_icon.png'))}
                                                                /> */}
                                                                        <Text style={[styles.signLabel, styles.textDefault]}>Save</Text>
                                                                    </TouchableOpacity>
                                                                </View>

                                                            }

                                                        </DataTable.Cell>
                                                    </DataTable.Row>
                                                </View>
                                            ))}
                                    </DataTable>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }

    return (
        <>
            <Header heading={"Product"} />

            <ScrollView>

                <View style={styles.categoryBlkCon}>
                    <View style={[styles.textcontainer1, styles.catSubBlk]}>
                        <Text style={styles.textStyle1}>
                            Orders
                        </Text>
                        <View>
                        </View>

                        <TouchableOpacity onPress={() => openAddOrder()}>
                            <View style={styles.textcontainer2}>

                                <Text style={styles.textStyle2}>
                                    Add Order
                                </Text>

                            </View>
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
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
                                        <Text style={styles.recordDisplay}>There are no Orders to display.</Text>
                                    </View>
                                    <View style={styles.noRecordItem}>
                                        <Text style={styles.addText} onPress={() => openAddOrder()}>
                                            Add Order
                                        </Text>
                                        <Text style={styles.recordDisplay}>
                                            to continue.
                                        </Text>
                                    </View>

                                    {/* <View style={styles.noRecordItem}>
                  <Text style={styles.addText} onPress={() => openAddCategory()}>
                    Add Category
                  </Text>
                  <Text style={styles.recordDisplay}>
                    to continue.
                  </Text>
                </View> */}
                                </View>
                                // no record HTML Ends
                                :
                                <DataTable>
                                    {isDataPresent && (
                                        <DataTable.Header style={[styles.headerStyle]}>
                                            <DataTable.Title style={styles.userssl}><Text style={styles.tableHeader}>Sl .No</Text> </DataTable.Title>
                                            <DataTable.Title><Text style={styles.tableHeader}>Order Id</Text> </DataTable.Title>
                                            <DataTable.Title><Text style={styles.tableHeader}>Supplier Name</Text></DataTable.Title>
                                            <DataTable.Title><Text style={styles.tableHeader}>Order Date</Text></DataTable.Title>
                                            <DataTable.Title><Text style={styles.tableHeader}>Status</Text></DataTable.Title>
                                            <DataTable.Title style={styles.justifyCenter}><Text style={styles.tableHeader}>Action</Text></DataTable.Title>

                                        </DataTable.Header>
                                    )}
                                    <ScrollView >

                                        {data
                                            .slice(
                                                page * numberOfItemsPerPage,
                                                page * numberOfItemsPerPage + numberOfItemsPerPage
                                            )
                                            .map((row) => tableRow(row))}

                                    </ScrollView>

                                    <DataTable.Pagination
                                        page={page}
                                        numberOfPages={Math.ceil(data.length / numberOfItemsPerPage)}
                                        onPageChange={(page) => setPage(page)}
                                        label={`${from + 1}-${to} of ${data.length}`}
                                        showFastPaginationControls
                                        numberOfItemsPerPageList={numberOfItemsPerPageList}
                                        numberOfItemsPerPage={numberOfItemsPerPage}
                                        onItemsPerPageChange={onItemsPerPageChange}
                                        selectPageDropdownLabel={'Rows per page'}
                                    />

                                </DataTable>
                            }
                        </View>
                    </ScrollView>

                </View>

                {openOrder &&

                    <Modal isVisible={openOrder} style={styles.popup}>
                        {popupAddOrder()}
                    </Modal>
                }
                {planned &&
                    <Modal isVisible={planned} style={styles.popup}>
                        {popupPlanned()}
                    </Modal>
                }
                {
                    confirmed &&
                    <Modal isVisible={confirmed} style={styles.popup}>
                        {popupConfirmed()}
                    </Modal>
                }
                {
                    received &&
                    <Modal isVisible={received} style={styles.popup}>
                        {popupReceived()}
                    </Modal>
                }

                {
                    grn &&
                    <Modal isVisible={grn} style={styles.popup}>
                        {popupGrn()}
                    </Modal>
                }

                {
                    confirmedIsDispatched &&
                    <Modal isVisible={confirmedIsDispatched} style={styles.popup}>
                        {popupConfirmedIsDispatched()}
                    </Modal>
                }
                {
                    partialStatus &&
                    <Modal isVisible={partialStatus} style={styles.popup}>
                        {popupPartialReceivedView()}
                    </Modal>
                }
                {
                    partialStatInsertGrn &&
                    <Modal isVisible={partialStatInsertGrn} style={styles.popup}>
                        {popupPartialInsert()}
                    </Modal>
                }
                {
                    updatePgrn &&
                    <Modal isVisible={updatePgrn} style={styles.popup}>
                        {popupPartialUpdateGrn()}
                    </Modal>
                }
                {openSuccessMsg &&
                    <Modal isVisible={openSuccessMsg}>
                        {SuccessPopup()}
                    </Modal>
                }

                {openInternetdownMsg &&
                    <Modal isVisible={openInternetdownMsg}>
                        {internetDownPop()}
                    </Modal>
                }
            </ScrollView>
        </>
    );


}
