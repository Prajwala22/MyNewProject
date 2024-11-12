import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import { DataTable, Searchbar } from 'react-native-paper';
import * as yup from 'yup';
import styles from '../../assets/css/style';
import InternetDownIcon from '../../assets/images/internet_down.js';
import SearchIcon from '../../assets/images/search.js';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import InventorySupplierList from '../../components/InventorySupplierList';
import Header from '../../components/sideMenuHeaderMaster';
import api from '../../services/api/callingApi';
import { watermelon_base_url } from '../../services/api/constants';
import { Platform } from 'react-native';


export default function Supplierstock({ navigation, route }: { navigation: any, route: any }) {
    const [data, setData] = useState([]);
    const [supplierData, setSupplierData] = useState([])
    const [productlistdata, setProductListData] = useState([])

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

    const [productdata, setProductData] = useState([]);
    const [openSupplier, setOpenSuppliert] = useState(false)
    const [editSupplierData, setEditSupllierData] = useState(null)
    const [editSupplier, setEditSupplier] = useState(false)
    const [openSuccessMsg, setopenSuccessMsg] = useState(false);
    const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false);
    const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
    const [userRoleId, setuserRoleId] = useState('')
    const [supplierDataLength, setSupplierDataLength] = useState('0')

    const onChangeSearch = (text: any) => {
        setSearchQuery(text)
        if (text.length > 0) {
            // getProductRequest();
            // setDataPreset(true)
            const requestData = {
                page: "1",
                keyword: text
            }
            const getProductUrl = `${watermelon_base_url}/all-suppliers?Authorization=VjJGMFpYSnRaV3h2YmxCUFUwOXlaR1Z5Y21GbmFHRjJZWEo1WVRFMlFHZHRZV2xzTG1OdmJRPT0=`;//Production
            // const getProductUrl = `${watermelon_base_url}/all-suppliers?Authorization=VjJGMFpYSnRaV3h2YmxCUFUwOXlaR1Z5TVY4eFgzUmxjM1IxYzJWeVFHZHRZV2xzTG1OdmJRPT0=`;//Staging
            try {
                fetch(getProductUrl, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "cache-control": "no-cache",
                    },
                    body: JSON.stringify(requestData),
                }).then(res => res.json()).then(function (response) {
                    console.log(response.data,"dwerefgfrew")
                    if (response?.success === '1') {
                        setProductData(response.data)
                        setDataPreset(true)
                    }
                    else {
                        setProductData([]);
                        setDataPreset(false)
                    }
                });
            } catch (error) {
                Alert.alert(
                    "Error",
                    "Unable to delete task at this time. Please try again.",
                    [
                        {
                            text: "OK", style: "cancel", onPress: () => {
                            }
                        }
                    ]
                );
            }

        }
        else {
            getProductRequest();
        }
    }


    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Running Orders' },
        { key: 'second', title: 'Completed Orders' },
    ]);


    var count = 1;
    const _id: any = "";
    const supplierId: any = ""
    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        });
        return unsubscribe;
    }, [navigation]);
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

    }
    /// Get Product Supplier Master list

    useEffect(() => {
        getProductSupplierMasterList();
        getProductRequest();
        return () => {
            setData([]);
        }
    }, [isFocused]);

    const getProductSupplierMasterList = async () => {

        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        setOutletId(outletId)
        const result = await api.GetAllSupplier(token, outletId);
        console.log(result,"getproductsupplier")
        setSupplierDataLength(result.data.length)
        if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
            // Toast.show("Some Error occured. Please try again.");
            // successInternetdownOpen()
            setDataPreset(false);
        } else {
            setData(result.data);
            setDataPreset(false);
            setProductData([])
        }
    }

    const getProductRequest = () => {
        setSearchQuery("")
        const requestData = {
            page: "1",
            keyword: ""
        }
        const getProductUrl = `${watermelon_base_url}/all-suppliers?Authorization=VjJGMFpYSnRaV3h2YmxCUFUwOXlaR1Z5Y21GbmFHRjJZWEo1WVRFMlFHZHRZV2xzTG1OdmJRPT0=`;//Production
        // const getProductUrl = `${watermelon_base_url}/all-suppliers?Authorization=VjJGMFpYSnRaV3h2YmxCUFUwOXlaR1Z5TVY4eFgzUmxjM1IxYzJWeVFHZHRZV2xzTG1OdmJRPT0=`;//Staging
        try {
            fetch(getProductUrl, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                },
                body: JSON.stringify(requestData),
            }).then(res => res.json()).then(function (response) {
                if (response?.success === '1') {
                    setProductData(response.data)
                    setDataPreset(true)
                }
                else {
                    setProductData([]);
                    setDataPreset(false)
                }
            });
        } catch (error) {
            Alert.alert(
                "Error",
                "Unable to delete task at this time. Please try again.",
                [
                    {
                        text: "OK", style: "cancel", onPress: () => {
                        }
                    }
                ]
            );
        }
    };

    const openAddSupplier = () => {
        setOpenSuppliert(true)
        // setDataPreset(false)
        getProductRequest();
    }
    const toggleModal = () => {
        setOpenSuppliert(!openSupplier)
    };
    const toggleModalEdit = () => {
        setEditSupplier(!editSupplier)
    };
    const sendDataToParent = (data) => { // the callback. Use a better name
        setEditSupllierData(data)
        setEditSupplier(true)
        getProductRequest();

    };
    const generalsearchkeypad = async (text: any) => {

        if (searchQuery.length > 0) {
            getProductRequest()
            setDataPreset(true)
        }

    }


    //Inventory create product starts from here
    const submiteproductdata = async (productdata) => {

        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        const myjson = {
            wMsupplierId: productdata?._id,
            supplierName: productdata?.company_name,
            address: productdata?.address,
            contactNumber: productdata?.mobile_no,
            isInWatermelon: true,
            isDeleted: false,
            outletId: outletId
        }

        const result = await api.CreateInventorySupplier(token, myjson);
        console.log("resultresultresultresultresult:::::",result)
        if (result >= '1') {
            setOpenSuppliert(false)
            setSearchQuery('')
            successOpen()

        }
        else if(result.data === null ){
            Alert.alert('Something went wrong. please try again later')
        }
         else {
            setOpenSuppliert(false)
            setSearchQuery('')
            navigation.navigate('MapAddingData')
        }
        // if (result.data != null && result.message === "No Data available") {

        //     setOpenSuppliert(false)
        //     setSearchQuery('')
        //     navigation.navigate('MapAddingData')
        //     if (result.message === "Supplier is already available") {
        //         Alert.alert('Supplier is already available')
        //     }

        // } else {

        //     successOpen()
        //     getProductSupplierMasterList();
        //     setOpenSuppliert(false)
        //     setSearchQuery('')
        // }


    }
    //Validation for supplier
    const suppliervalidationschema = yup.object().shape({
        supplierName: yup.string().required('Supplier Name is required'),
        address: yup.string().required('Address is required'),
        // contactNumber: yup.string().required('Contact Number Required'),
        contactNumber: yup.string().required('Contact Number required').matches(/^[0-9]{9}$/, 'Contact Number must be exactly 9 digits and contain only numbers'),

    })
    //Manula Supplier Add Api 
    const manualSupplierAdd = async (data) => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;

        var myJson =

        {
            supplierName: data.supplierName,
            address: data.address,
            contactNumber: data.contactNumber,
            OutletId: outletId
        }
        const result = await api.CreateInventorySupplier(token, myJson)
        if (result >= '1') {
            getProductSupplierMasterList();
            setOpenSuppliert(false)
            setSearchQuery('')
            successOpen()

        }
        else if(result.data === null ){
            Alert.alert('Something went wrong. please try again later')
        }
         else {
            setOpenSuppliert(false)
            setSearchQuery('')
            navigation.navigate('MapAddingData')
        }
        // if (result.success) {
        //     // Toast.show('Supplier Created Successfully ', {
        //     //     duration: Toast.durations.LONG,
        //     // });
        //     successOpen()
        //     getProductSupplierMasterList();
        //     setOpenSuppliert(false)
        //     setSearchQuery('')
        // }
        // else {
        //     // Toast.show('Some Error Occured. Please try again.')
        //     // successInternetdownOpen()
        // }
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
                    <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Supplier Created Successfully</Text>
                    <TouchableOpacity style={styles.continueBtn} onPress={() => successOpen()}>
                        <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
            // success popup - Ends
        );
    }
    //Manula Supplier Edit Api 
    const manualSupplierEdit = async (data) => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;

        var myJson =

        {
            supplierId: editSupplierData.supplierId,
            supplierName: data.supplierName,
            address: data.address,
            contactNumber: data.contactNumber,
            OutletId: outletId
        }
        const result = await api.UpdateSupplier(token, myJson, editSupplierData.supplierId)
        if (result.success) {

            setEditSupplier(false)
            getProductSupplierMasterList();
            setSearchQuery('')
            // Toast.show('Supplier Updated Successfully ', {
            //     duration: Toast.durations.LONG,
            // });
            successOpenUpdate()
        }
        else {
            // Toast.show('Some Error Occured. Please try again.')
            // successInternetdownOpen()
        }
    }
    // Update Success msg 
    const successOpenUpdate = () => {
        setopenUpdateSuccessMsg(!openUpdateSuccessMsg)
    }
    const SuccessUpdatePopup = () => {
        return (
            // success popup
            <View style={[styles.flexrow, styles.justifyCenter]}>
                <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
                    {/* <Image source={(require("../../assets/images/success_msg_popup.png"))} style={[styles.marBtm20, styles.sucImg]} /> */}
                    <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
                    <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Supplier Updated Successfully</Text>
                    <TouchableOpacity style={styles.continueBtn} onPress={() => successOpenUpdate()}>
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
    const popupAddSupplier = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>

                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>
                                Add Supplier
                            </Text>
                            <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                <Text style={styles.closeText}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>
                        <View style={[styles.wdth100, styles.paddRL15]}>
                            <View style={[styles.flexrow, styles.justifyBetween, styles.marBtm20, styles.wdth100, styles.flexWrap]}>
                                {/* Search HTML */}
                                <View style={[styles.wdth50, styles.marBtm10]}>
                                    <Searchbar
                                        placeholder="Search"
                                        onChangeText={onChangeSearch}
                                        value={searchQuery}
                                        icon={() => <SearchIcon />}
                                        inputStyle={styles.searchInput}
                                        style={styles.searchContainer}
                                        onSubmitEditing={() => generalsearchkeypad('Search softkey pressed!')}
                                    />
                                </View>

                                <DataTable>
                                    {
                                        isDataPresent && productdata.length !== 0 && (
                                            <View style={[styles.producHeader]}>
                                                <DataTable.Header style={styles.headerStyle}>
                                                    <DataTable.Title style={styles.siNo}><Text style={styles.tableHeader}>Sl .No</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.FlexproducName}><Text style={styles.tableHeader}>Supplier Namer</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Address</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Contact Number</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Action </Text></DataTable.Title>
                                                </DataTable.Header>
                                            </View>
                                        )
                                    }

                                    {!isDataPresent && productdata.length === 0 && (
                                        <View style={[styles.tableRow, { borderColor: '#F5F3F6', paddingTop: 20, paddingBottom: 20 }]} >
                                            <View style={styles.noRecordFoundView}>
                                                <Image
                                                    style={styles.noRecordImage}
                                                    source={(require('../../assets/images/clipboard.png'))}
                                                />
                                                <View>
                                                    <Text style={styles.recordDisplay}>There is no Supplier to display.</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                    {
                                        isDataPresent && productdata.length !== 0 &&
                                        productdata.map((item, index) => (
                                            <View style={styles.ProductRow}>
                                                <DataTable.Row style={styles.datatableextraline} key={item._id}>
                                                    <DataTable.Cell style={styles.flexSl}><Text style={styles.tableCell}>{index + 1}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.FlexproducName}><Text style={styles.tableCell}> {item.company_name}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.address}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.mobile_no}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.producName}>
                                                        <TouchableOpacity onPress={() => submiteproductdata(item)}>
                                                            <View style={styles.textcontainer2}>
                                                                <Text style={styles.textStyle2} onPress={() => submiteproductdata(item)}>
                                                                    Add
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </DataTable.Cell>
                                                </DataTable.Row>
                                            </View>
                                        ))
                                    }
                                </DataTable>
                            </View>
                        </View>
                        <Formik
                            validationSchema={suppliervalidationschema}
                            initialValues={{
                                supplierName: '',
                                address: '',
                                contactNumber: ''
                            }}
                            onSubmit={values => manualSupplierAdd(values)}
                        >
                            {({ handleSubmit, handleChange, isValid, values }) => (
                                <View>
                                    <View style={[styles.popuprow]}>
                                        <Field
                                            component={CustomInput}
                                            name="supplierName"
                                            label="Supplier Name"
                                            mandate={true}

                                        />
                                        <Field
                                            component={CustomInput}
                                            name="address"
                                            label="Address"
                                            mandate={true}
                                        />
                                        <Field
                                            component={CustomInput}
                                            name="contactNumber"
                                            label="Contact Number"
                                            mandate={true}
                                        />
                                    </View>
                                    <TouchableOpacity onPress={handleSubmit}>
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
    const popupEditSupplier = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>

                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>
                                Edit Supplier
                            </Text>
                            <Pressable style={styles.closeView} onPress={() => toggleModalEdit()}>
                                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                <Text style={styles.closeText}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>
                        <View style={[styles.wdth100, styles.paddL15]}>
                            <View style={[styles.flexrow, styles.justifyBetween, styles.marBtm20, styles.wdth100, styles.flexWrap]}>
                                {/* Search HTML */}
                                <View style={[styles.wdth50]}>
                                    <Searchbar
                                        placeholder="Search"
                                        onChangeText={onChangeSearch}
                                        value={searchQuery}
                                        icon={() => <SearchIcon />}
                                        inputStyle={styles.searchInput}
                                        style={styles.searchContainer}
                                        onSubmitEditing={() => generalsearchkeypad('Search softkey pressed!')}
                                    />
                                </View>
                                <DataTable>
                                    {
                                        isDataPresent && (
                                            // <View style={[styles.producHeader]}>
                                            <DataTable.Header style={styles.headerStyle}>
                                                <DataTable.Title style={styles.flexSl}><Text style={styles.tableHeader}>Sl .No</Text></DataTable.Title>
                                                <DataTable.Title style={styles.FlexproducName}><Text style={styles.tableHeader}>Supplier Name</Text></DataTable.Title>
                                                <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Address</Text></DataTable.Title>
                                                <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Contact Number</Text></DataTable.Title>
                                                <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Action </Text></DataTable.Title>
                                            </DataTable.Header>
                                            // </View>
                                        )
                                    }

                                    {
                                        isDataPresent && productdata.length !== 0 &&
                                        productdata.map((item, index) => (
                                            <View style={styles.ProductRow}>
                                                <DataTable.Row style={styles.datatableextraline} key={item._id}>
                                                    <DataTable.Cell style={styles.flexSl}><Text style={styles.tableCell}>{index + 1}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.FlexproducName}><Text style={styles.tableCell}> {item.company_name}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.address}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.mobile_no}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.producName}>
                                                        <TouchableOpacity onPress={() => submiteproductdata(item)}>
                                                            <View style={styles.textcontainer2}>
                                                                <Text style={styles.textStyle2} onPress={() => submiteproductdata(item)}>
                                                                    Add
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </DataTable.Cell>
                                                </DataTable.Row>
                                            </View>
                                        ))
                                    }
                                    {!isDataPresent && productdata.length === 0 && (
                                        <View style={[styles.tableRow, { borderColor: '#F5F3F6', paddingTop: 20, paddingBottom: 20 }]} >
                                            <View style={styles.noRecordFoundView}>
                                                <Image
                                                    style={styles.noRecordImage}
                                                    source={(require('../../assets/images/clipboard.png'))}
                                                />
                                                <View>
                                                    <Text style={styles.recordDisplay}>There is no Supplier to display.</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                </DataTable>
                            </View>
                        </View>
                        <Formik
                            validationSchema={suppliervalidationschema}
                            initialValues={{
                                supplierName: editSupplierData.supplierName,
                                address: editSupplierData.address,
                                contactNumber: editSupplierData.contactNumber
                            }}
                            onSubmit={values => manualSupplierEdit(values)}
                        >
                            {({ handleSubmit, handleChange, isValid, values }) => (
                                <View>
                                    <View style={[styles.popuprow]}>
                                        <Field
                                            component={CustomInput}
                                            name="supplierName"
                                            label="Supplier Name"
                                            mandate={true}

                                        />
                                        <Field
                                            component={CustomInput}
                                            name="address"
                                            label="Address"
                                            mandate={true}
                                        />
                                        <Field
                                            component={CustomInput}
                                            name="contactNumber"
                                            label="Contact Number"
                                            mandate={true}
                                        />
                                    </View>
                                    <TouchableOpacity onPress={handleSubmit}>
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
    return (
        <>
            <Header heading={"Product"} />

            <ScrollView>
                <View style={styles.categoryBlkCon}>
                    <View style={[styles.textcontainer1, styles.catSubBlk]}>
                        <Text style={styles.textStyle1}>
                            Supplier
                        </Text>
                        <View>
                        </View>

                        <TouchableOpacity onPress={() => openAddSupplier()}>
                            <View style={styles.textcontainer2}>

                                <Text style={styles.textStyle2}>
                                    Add Supplier
                                </Text>

                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* <ScrollView>
                        <View style={styles.table}>
                            <InventorySupplierList data={data} sendEditData={sendDataToParent} updateDelete={() => getProductSupplierMasterList()} />
                        </View>
                    </ScrollView> */}
                    <ScrollView>

                        <View style={styles.table}>
                            {data?.length === 0 ?
                                <View style={styles.noRecordFoundView}>
                                    <Image
                                        style={styles.noRecordImage}
                                        source={(require('../../assets/images/clipboard.png'))}
                                    />
                                    <View>
                                        <Text style={styles.recordDisplay}>There are no Supplier to display.</Text>
                                    </View>

                                    <View style={styles.noRecordItem}>
                                        <Text style={styles.addText} onPress={() => openAddSupplier()}>
                                            Add Supplier
                                        </Text>
                                        <Text style={styles.recordDisplay}>
                                            to continue.
                                        </Text>
                                    </View>
                                </View>
                                : <InventorySupplierList data={data} sendEditData={sendDataToParent} updateDelete={() => getProductSupplierMasterList()} />
                            }
                        </View>
                    </ScrollView>

                </View>
                {openSupplier &&
                    <Modal isVisible={openSupplier} style={styles.popup}>
                        {popupAddSupplier()}
                    </Modal>
                }

                {editSupplier &&
                    <Modal isVisible={editSupplier} style={styles.popup}>
                        {popupEditSupplier()}
                    </Modal>
                }
                {openSuccessMsg &&
                    <Modal isVisible={openSuccessMsg}>
                        {SuccessPopup()}
                    </Modal>
                }
                {openUpdateSuccessMsg &&
                    <Modal isVisible={openUpdateSuccessMsg}>
                        {SuccessUpdatePopup()}
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