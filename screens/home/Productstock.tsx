import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import { DataTable, Searchbar } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import * as yup from 'yup';
import styles from '../../assets/css/style';
import InternetDownIcon from '../../assets/images/internet_down.js';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import InventoryProductList from '../../components/InventoryProductList';
import api from '../../services/api/callingApi';
import { watermelon_base_url } from '../../services/api/constants';
import SearchIcon from '../../assets/images/search.js';
import Header from '../../components/sideMenuHeaderMaster';
import { Platform } from 'react-native';


export default function Productstock({ navigation, route }: { navigation: any, route: any }) {
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
    const [orderType, setOrderType] = useState(0)
    const [activeOrderTypeDrop, setActiveOrderTypeDrop] = useState("Running")
    const [runningcolor, setRunningColor] = useState('#E83B42')
    const [preparedcolor, setPreparedColor] = useState('#484D54')
    const [completedcolor, setCompletedColor] = useState('#484D54')
    const [openProduct, setOpenProduct] = useState(false);
    const [productdata, setProductData] = useState([]);
    const [editProductData, setEditProductData] = useState(null)
    const [editProduct, setEditProduct] = useState(false)
    const [openSuccessMsg, setopenSuccessMsg] = useState(false);
    const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false);
    const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
    const [userRoleId, setuserRoleId] = useState('')
    const [prodDataLength, setProdDataLength] = useState('')

    const onChangeSearch = (text: any) => {
        setSearchQuery(text)
        if (text.length > 0 ) {
            // getProductRequest();
            // setDataPreset(true)
            const requestData = {
                page: "1",
                keyword: text
            }
            const getProductUrl = `${watermelon_base_url}/all-products?Authorization=VjJGMFpYSnRaV3h2YmxCUFUwOXlaR1Z5Y21GbmFHRjJZWEo1WVRFMlFHZHRZV2xzTG1OdmJRPT0=`;//Production
            // const getProductUrl = `${watermelon_base_url}/all-products?Authorization=VjJGMFpYSnRaV3h2YmxCUFUwOXlaR1Z5TVY4eFgzUmxjM1IxYzJWeVFHZHRZV2xzTG1OdmJRPT0=`;//Staging
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
                    else{
                        setProductData([]);
                        setDataPreset(false)
                    }
                });
            }
            catch (error) {
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
            // setProductData([])
            // setDataPreset(false)
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
        const result = await api.GetProductSupplierMaster(token, outletId);
        console.log(result,"::resultresultresult::")
        if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
            // Toast.show("Some Error occured. Please try again.");
            // successInternetdownOpen()
            setDataPreset(false);

        } else {
            setData(result.data);
            setDataPreset(true);
        }
    }

    const getProductRequest = () => {
        setSearchQuery('')
        const requestData = {
            page: "1",
            keyword: ""
        }
        const getProductUrl = `${watermelon_base_url}/all-products?Authorization=VjJGMFpYSnRaV3h2YmxCUFUwOXlaR1Z5Y21GbmFHRjJZWEo1WVRFMlFHZHRZV2xzTG1OdmJRPT0=`;//Production
        // const getProductUrl = `${watermelon_base_url}/all-products?Authorization=VjJGMFpYSnRaV3h2YmxCUFUwOXlaR1Z5TVY4eFgzUmxjM1IxYzJWeVFHZHRZV2xzTG1OdmJRPT0=`;//Staging
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
                else{
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

    /// Get All Supplier list
    useEffect(() => {

        getSuppliersList();
        return () => {
            setSupplierData([]);
        }
    }, [isFocused]);
    const getSuppliersList = async () => {

        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        const result = await api.GetSupplier(token, outletId);
        if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
            // Toast.show("Some Error occured. Please try again.");
            // successInternetdownOpen()

        } else {
            setSupplierData(result.data);

        }
    }

    /// Get Supplier Orders list
    useEffect(() => {

        getallproductList();
        return () => {
            setProductListData([]);
        }
    }, [isFocused]);
    const getallproductList = async () => {

        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        const result = await api.GetProductList(token, outletId);
        if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
            setProductListData([])
        }
else if (result?.data?.length > 0) {
            setProductListData(result.data);
            setProdDataLength(result?.data?.length)
            setDataPreset(true)
        } else {
                        setProductListData([])
        }
    }

    const openAddProduct = () => {
        setOpenProduct(true);
        getProductRequest();
        // setDataPreset(false)
    }
    const toggleModal = () => {
        setOpenProduct(!openProduct)
        setSearchQuery('');
    };

    const toggleModalEdit = () => {
        setEditProduct(!editProduct)
    };
    const sendDataToParent = (data) => { // the callback. Use a better name
        setEditProductData(data)
        setEditProduct(true)
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
            productId: "",
            wMData: {
                wmProductId: productdata?._id,
                wmSupplierId: productdata?.user_type_id,
                supplierProductCode: productdata?.supplier_product_code,
                productCode: productdata?.product_code ? productdata?.product_code : null,
                categoryName: productdata?.category_name,
                categoryId: productdata?.category_id,
                subCategoryName: productdata?.subcategory_name,
                subCategoryId: productdata?.subcategory_id
            },
            pricingRange: {
                id: productdata?.pricing_range[0]?.id,
                priceunit: productdata?.pricing_range[0]?.priceunit,
                pricemoq: productdata?.pricing_range[0]?.pricemoq,
                ref: productdata?.pricing_range[0]?.ref,
                promo: productdata?.pricing_range[0]?.promo,
                sku_status: productdata?.pricing_range[0]?.sku_status,
                isuom: productdata?.pricing_range[0]?.isuom,
                display_sku_name: productdata?.pricing_range[0]?.display_sku_name
            },
            productName: productdata?.product_name,
            unit: productdata?.base_uom,
            isDeleted: false,
            outletId: outletId
        }
        const result = await api.CreateInventoryProduct(token, myjson);
        if (prodDataLength >= '1') {
            getallproductList();
            setOpenProduct(false)
            setSearchQuery('')
            successOpen()

        }
        else if(result.data === null ){
            Alert.alert('Something went wrong. please try again later')
        }
         else {
            setOpenProduct(false)
            setSearchQuery('')
            navigation.navigate('MapAddingData')
        }

    }

    //Manula Product Add Api 
    const manualProductAdd = async (data) => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;

        var myJson =

        {
            productName: data.productName,
            unit: data.unit,
            OutletId: outletId
        }
        const result = await api.CreateInventoryProduct(token, myJson)
        if (prodDataLength >= '2') {
            // Toast.show('Product Created Successfully ', {
            //     duration: Toast.durations.LONG,
            // });
            successOpen()
            getallproductList();
            setOpenProduct(false)
            setSearchQuery('')
        }
        else {
            setOpenProduct(false)
            setSearchQuery('')
            navigation.navigate('MapAddingData')   
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
                    <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Product Created Successfully</Text>
                    <TouchableOpacity style={styles.continueBtn} onPress={() => successOpen()}>
                        <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
            // success popup - Ends
        );
    }
    //Edit Product Data Api
    const manualProductEdit = async (data) => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;

        var myJson =
        {
            productId: editProductData.productId,
            productName: data.productName,
            unit: data.unit,
            OutletId: outletId
        }
        const result = await api.updateProduct(token, myJson, editProductData.productId)
        if (result.success) {
            // Toast.show('Product Updated Successfully ', {
            //     duration: Toast.durations.LONG,
            // });
            successOpenUpdate()
            getallproductList();
            setEditProduct(false)
            setSearchQuery('')
        }
        else {
            Toast.show('Some Error Occured. Please try again.')
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
                    <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Product Updated Successfully</Text>
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

    //ValidationShema for product
    const productvalidationschema = yup.object().shape({
        productName: yup
            .string()
            .required('Product Name is required'),
        unit: yup
            .string()
            .required('Unit is required')
    })


    const popupAddProduct = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>

                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>
                                Add Product
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
                                        icon={() => <SearchIcon />}
                                        // clearIcon={false}
                                        inputStyle={styles.searchInput}
                                        style={styles.searchContainer}
                                        placeholder="Search"
                                        onChangeText={onChangeSearch}
                                        value={searchQuery}
                                        onSubmitEditing={() => generalsearchkeypad('Search softkey pressed!')}
                                    />
                                </View>
                                <DataTable>
                                    {
                                      isDataPresent && productdata.length !== 0 && (
                                                <DataTable.Header style={styles.headerStyle}>
                                                    <DataTable.Title style={styles.flexSl}><Text style={styles.tableHeader}>Sl .No</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.FlexproducName}><Text style={styles.tableHeader}>Product Name</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Brand</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Product Category</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Unit</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Price Range </Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Action </Text></DataTable.Title>
                                                </DataTable.Header>
                                        )
                                    }
                                    { isDataPresent &&  productdata.length === 0 && (
                                <View style={[styles.tableRow, { borderColor:  '#F5F3F6' , paddingTop:20 , paddingBottom:20}]} >
                                     <View style={styles.noRecordFoundView}>
                                     <Image
                                       style={styles.noRecordImage}
                                       source={(require('../../assets/images/clipboard.png'))}
                                     />
                                     <View>
                                       <Text style={styles.recordDisplay}>There is no Product to display.</Text>
                                     </View>
                                   </View>
                                   </View>
                                )}
                                    {
                                        isDataPresent && productdata.length !== 0 &&
                                        productdata.map((item, index) => (
                                            <View style={[styles.tableRow, { borderColor:  '#F5F3F6' }]} >
                                                <DataTable.Row style={styles.datatableextraline} key={item.productId}>
                                                    <DataTable.Cell style={styles.flexSl}><Text style={styles.tableCell}>{index + 1}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.FlexproducName}><Text style={styles.tableCell}> {item.product_name}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.brand}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.category_name}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}> {item.base_uom}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item?.pricing_range[0]?.priceunit}</Text></DataTable.Cell>
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
                            validationSchema={productvalidationschema}
                            initialValues={{
                                productName: '',
                                unit: '',
                            }}
                            onSubmit={values => manualProductAdd(values)}
                        >
                            {({ handleSubmit, handleChange, isValid, values }) => (
                                <View>
                                    <View style={[styles.popuprow]}>
                                        <Field
                                            component={CustomInput}
                                            name="productName"
                                            label="Product Name"
                                            mandate={true}

                                        />
                                        <Field
                                            component={CustomInput}
                                            name="unit"
                                            label="Unit"
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

    const popupEditProduct = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>

                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>
                                Edit Product
                            </Text>
                            <Pressable style={styles.closeView} onPress={() => toggleModalEdit()}>
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
                                        isDataPresent && (
                                                <DataTable.Header style={styles.headerStyle}>
                                                    <DataTable.Title style={styles.flexSl}><Text style={styles.tableHeader}>Sl .No</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.FlexproducName}><Text style={styles.tableHeader}>Product Name</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Brand</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Product Category</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Unit</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Price Range </Text></DataTable.Title>
                                                    <DataTable.Title style={styles.producName}><Text style={styles.tableHeader}>Action </Text></DataTable.Title>
                                                </DataTable.Header>
                                        )
                                    }
                                    {
                                        isDataPresent && productdata.length !== 0 &&
                                        productdata.map((item, index) => (
                                            <View style={[styles.tableRow, { borderColor: '#F5F3F6' }]} >
                                                <DataTable.Row style={styles.datatableextraline} key={item.productId}>
                                                    <DataTable.Cell style={styles.flexSl}><Text style={styles.tableCell}>{index + 1}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.FlexproducName}><Text style={styles.tableCell}> {item.product_name}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.brand}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item.category_name}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}> {item.base_uom}</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.producName}><Text style={styles.tableCell}>{item?.pricing_range[0]?.priceunit}</Text></DataTable.Cell>
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
                            validationSchema={productvalidationschema}
                            initialValues={{
                                productName: editProductData.productName,
                                unit: editProductData.unit,
                            }}
                            onSubmit={values => manualProductEdit(values)}
                        >
                            {({ handleSubmit, handleChange, isValid, values }) => (
                                <View>
                                    <View style={[styles.popuprow]}>
                                        <Field
                                            component={CustomInput}
                                            name="productName"
                                            label="Product Name"
                                            mandate={true}

                                        />
                                        <Field
                                            component={CustomInput}
                                            name="unit"
                                            label="Unit"
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
              <Header heading={"Product"}/>

            <ScrollView>

                <View style={styles.categoryBlkCon}>
                    <View style={[styles.textcontainer1, styles.catSubBlk]}>
                        <Text style={styles.textStyle1}>
                            Product
                        </Text>
                        <View>
                        </View>

                        <TouchableOpacity onPress={() => openAddProduct()}>
                            <View style={styles.textcontainer2}>

                                <Text style={styles.textStyle2}>
                                    Add Product
                                </Text>

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.table}>
            {productlistdata.length === 0
              ?
              // no record HTML
              <View style={styles.noRecordFoundView}>
                <Image
                  style={styles.noRecordImage}
                  source={(require('../../assets/images/clipboard.png'))}
                />
                <View>
                  <Text style={styles.recordDisplay}>There are no Product to display.</Text>
                </View>

                    <View style={styles.noRecordItem}>
                  <Text style={styles.addText} onPress={() => openAddProduct()}>
                    Add Product
                  </Text>
                  <Text style={styles.recordDisplay}>
                    to continue.
                  </Text>
                </View>
              </View>
              :
              <ScrollView>
              <View style={styles.table}>
              <InventoryProductList data={productlistdata} sendEditData={sendDataToParent} updateDelete={() => getallproductList()} />
          </View>    
          </ScrollView>          // no record HTML Ends
            }
          </View>

                </View>
                {openProduct &&
                    <Modal isVisible={openProduct} style={styles.popup}>
                        {popupAddProduct()}
                    </Modal>
                }

                {editProduct &&
                    <Modal isVisible={editProduct} style={styles.popup}>
                        {popupEditProduct()}
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