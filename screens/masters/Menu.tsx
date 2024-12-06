/**
 * Generated class for the Category Page.
 * Created by himanshu on 23/02/2022
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import { Searchbar } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import * as yup from 'yup';
import { default as style, default as styles, default as styless } from '../../assets/css/style';
import InternetDownIcon from '../../assets/images/internet_down.js';
import ModalDropDown from '../../assets/images/ModalDropDown.js';
import SearchIcon from '../../assets/images/search.js';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import TableView from '../../components/menulist';
import Header from '../../components/sideMenuHeaderMaster';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import Colors from '../constants/colors';
import EyeIcon from '../../assets/images/login_eye.js';
import EyeOffIcon from '../../assets/images/eye-off.js'
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';




export default function MenuCategory({ navigation, route }: { navigation: any, route: any }) {

    const [isDataPresent, setDataPreset] = useState(false);
    const [isUpdateItem, setUpdateItem] = useState(false)
    const [addRecipe, setAddRecipe] = useState(false);

    const [openCategory, setOpenCategory] = useState(false);
    const [openModifier, setOpenModifier] = useState(false);
    const [openItems, setOpenItems] = useState(false);
    const [openDiscount, setOpenDiscount] = useState(false);
    const [openModifierpop, setopenModifierpop] = useState(false);
    const [userData, setUserData] = useState();
    const [editCategory, setEditCategory] = useState(false);
    const [editData, setEditData] = useState(null);
    const [locationKey, setLocationKey] = useState(0);
    const [catKey, setCatKey] = useState(0);
    const [taxKey, setTaxKey] = useState(0);
    const [outletData, setOutletData] = useState([]);
    const [outletChecked, setOutletChecked] = useState([]);
    const [outletCheckedItems, setOutletCheckedItems] = useState([]);
    const [outletCheckedEditItems, setOutletCheckedEditItems] = useState([]);
    const [itemKey, setItemKey] = useState(0)
    const [supplierKey, setSupplierKey] = useState(0)
    const [productValue, setProductValue] = useState('')
    const [supplierValue, setSupplierValue] = useState([])
    const [amoount, setAmount] = useState('')
    const [unit, setUnit] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [recipeListData, setRecipeListData] = useState([])
    const [categoryData, setCategoryData] = useState([]);
    const [recipeData, setRecipeData] = useState([]);
    const [itemAmount, setitemAmount] = useState([]);
    const [edititemdiscount, setedititemdiscount] = useState({})
    const [taxData, setTaxData] = useState([])
    const priceRef: any = React.useRef();
    const [priceError, setPriceError] = useState(false);
    const [ispromocodeselected, setIspromocodeselected] = useState(false);
    const [modValues, setValues] = useState([{
        itemFrom: "",
        itemId: "",
        price: "",
        itemName: "",
        key1: 0,
        key2: 0

    }]);
    const [recipeValues, setRecipeValues] = useState({
        productName: "",
        productID: "",
        supplierName: "",
        supplierID: "",
        price: "",
        unit: "",
        quantity: "",
        key1: 0,
        key2: 0

    });
    const [itemsDataListModifier, setDataModifier] = useState([]);
    const [locationError, setErrorMessage] = useState('Select Location  is required');
    const [data, setData] = useState([]);
    const [ingredientsDataList, setIngredintsDataList] = useState([]);

    const optionsPerPage = [2, 3, 4];
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    var count = 1;
    const categoryId: any = "";
    const id: any = "";
    const isFocused = useIsFocused();
    const [checked, setChecked] = React.useState(true);
    const [checkedItems, setCheckedItems] = React.useState(true);
    const [checkeddiscnt, setCheckeddiscnt] = React.useState(false);
    const [checkeddiscntId, setCheckeddiscntId] = React.useState("");
    const [checkedpromo, setCheckedpromo] = React.useState(false);
    const [checkedpromoId, setCheckedpromoId] = React.useState("");
    const [GetDiscount, setGetDiscount] = useState([]);
    const [discountdataparticular, setdiscountdataparticular] = useState([]);
    const [promocode, setPromocode] = useState([]);
    const [showdiscountclickdata, setshowdiscountclickdata] = useState(true);
    const [showpromodata, setshowpromodata] = useState(false);
    const [showdiscountdata, setshowdiscountdata] = useState(false);
    const [showdpromodataonclk, setshowdpromodataonclk] = useState(false);
    const [getpromofilterdata, setgetpromofilterdata] = useState([]);
    const [modifierGroupData, setModifierGroupData] = useState([]);
    const [modifierGroupDatafilter, setModifierGroupDataFilter] = useState([]);
    const [openEditItems, setOpenEditItems] = useState(false);
    const [editItems, setEditItems] = useState({});
    const [editmodiferItems, setEditModifierItems] = useState({});
    const [query, setQuery] = useState('');
    const [ImageUigallery, setimageUriGallary] = useState('')
    const [image, setImage] = useState(null);
    const [imagebase64, setImagebase64] = useState(null);
    const [imageExtension, setImageExtension] = useState(null);
    const [profiledata, setProfileData] = useState([])
    const [openSuccessMsg, setopenSuccessMsg] = useState(false);
    const [openSuccessModifierMsg, setopenSuccessModifierMsg] = useState(false);
    const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false);
    const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
    const [isrefreshingresult, setIsrefreshingresult] = useState(false)
    const [userRoleId, setuserRoleId] = useState('')
    const [outletId, setOutletId] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [outletName, setOutlet] = useState('');
    const [modifirerror, setmodifirerror] = useState(false)
    const [showView, setShowView] = useState(false);
    const [showViewId, setShowViewId] = useState('');

    useEffect(() => {
        setTimeout(() => getRestaurant(), 1000);
    }, [isFocused]);

    const getRestaurant = async () => {
        const userRoleId = await AsyncStorage.getItem('userRoleId')
        const restaurantName = await AsyncStorage.getItem('restaurantName')
        const outletName = await AsyncStorage.getItem('outletName')
        const outletAddress = await AsyncStorage.getItem('outletAddress')
        const outletid = await AsyncStorage.getItem('restaurantId')
        setOutletId(outletId)
        setRestaurant(restaurantName)
        setOutlet(outletName)
        setuserRoleId(userRoleId)

    }

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);


    /// Get the category list
    useEffect(() => {
        getDiscountout();
        return () => {
            setGetDiscount([]);
        }
    }, [isFocused]);

    const getDiscountout = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        const result1 = await api.getAllMasterData(token, endPoint.GET_DISCOUNT + outletId);
        if (JSON.stringify(result1.data) === null || JSON.stringify(result1.data) === "null" || result1.data === "") {
        } else {
            setGetDiscount(result1.data);
        }
    }
    /// Get the category list
    useEffect(() => {
        getPromocodes();
        return () => {
            setPromocode([]);
        }
    }, [isFocused]);

    const getPromocodes = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        const result1 = await api.getAllMasterData(token, endPoint.GET_PROMOCODE + outletId);
        if (JSON.stringify(result1.data) === null || JSON.stringify(result1.data) === "null" || result1.data === "") {
            successInternetdownOpen()
        } else {
            setPromocode(result1.data);
        }

    }
    /// Get the category list
    useEffect(() => {
        getCategoryList();
        return () => {
            setData([]);
        }
    }, [isFocused]);
    const getCategoryList = async () => {
        setIsrefreshingresult(true)
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        var myJson = {
            IsAllItem: true,
            OutletId: outletId,
        }
        const result = await api.CreateMasterData(endPoint.GET_ITEMS, token, myJson);
        setIsrefreshingresult(false)

        if (result.data.length === 0) {
            setDataPreset(false);
            setUpdateItem(false)
        } else {
            setIsrefreshingresult(false)
            setData(result.data);
            setDataPreset(true);
            setUpdateItem(true)
        }
    }
    // ------------------------Get Modifier Group List------------------------------------------

    useEffect(() => {

        getModifierGroupList();
        return () => {
            setModifierGroupData([]);
            setModifierGroupDataFilter([]);
        }
    }, [isFocused]); const getModifierGroupList = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;

        const result = await api.getAllMasterData(token, endPoint.GET_MODIFIERS_GROUP + outletId);
        if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
            successInternetdownOpen()
        } else {
            setModifierGroupData(result.data);
            setModifierGroupDataFilter(result.data)
        }
    }
    // ------------------------Get Modifier Group List Ends-------------------------------------
    const openAddCategory = () => {
        setOpenCategory(true)
    }
    const toggleItemsEdit = () => {
        setOpenEditItems(!openEditItems)
    };
    const showdiscountype = (discntId) => {
        setCheckeddiscntId(discntId)
        setgetpromofilterdata([])
        const result = GetDiscount.filter(data => data.discountId == discntId)
        setdiscountdataparticular(result)
        if (discountdataparticular) {
            setshowdiscountdata(true)
        }
    }
    const showpromotype = (promocodeids) => {
        setCheckedpromoId(promocodeids)
        setdiscountdataparticular([])
        const result = promocode.filter(data => data.promocodeId == promocodeids)
        setgetpromofilterdata(result)
        if (getpromofilterdata) {
            setshowpromodata(true)
        }
    }


    const sendDisocuntDataToParent = (data) => {
        setedititemdiscount(data)
        setshowdpromodataonclk(false)
        setshowdiscountclickdata(false)
        setOpenDiscount(!openDiscount)
    }
    const sendModifierDataToParent = (data) => {
        setEditModifierItems(data)
        setopenModifierpop(!openModifierpop)

        //Push Modifiers to outletCheckedItems array if already items has modifiers
        data?.modifierGroupNameId.forEach((groupIdObj) => {
            if (modifierGroupData.some((item) => item.id === groupIdObj.modifierGroupId)) {
                outletCheckedItems.push(groupIdObj.modifierGroupId);
            }
        });

    }


    const toggleModal = () => {
        setOpenCategory(!openCategory)
    };

    const toggleModa3 = () => {
        setCheckeddiscntId("")
        setCheckedpromoId("")
        setOpenDiscount(!openDiscount)
    };
    const toggleModa4 = () => {
        setmodifirerror(false)
        setopenModifierpop(!openModifierpop)
        setOutletCheckedItems([])
    };

    const addCategoryValidationSchema = yup.object().shape({
        name: yup
            .string()
            .required('Name of the Category is required'),
        categoryCode: yup
            .string()
            .required('Category Code is required'),
        location: yup
            .string()
            .required('Location is required'),
        categoryDescription: yup
            .string()
            .required('Category Description is required'),
    })

    const handleSubmit = async (data) => {
        if (openCategory == true) {
            handleSubmitcategory(data)
        }
    }

    // --------------------------------- Create Category Starts -------------------------------------------------
    const handleSubmitcategory = async (data) => {

        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;

        var myJson = {
            categoryName: data.name,
            categoryCode: data.categoryCode,
            description: data.categoryDescription,
            outletId: outletId,
            location: data.location
        }
        const result = await api.CreateMasterData(endPoint.CREATE_CATEGORY, token, myJson);
        if (JSON.stringify(result.data) === null) {
            successInternetdownOpen()
        } else {
            // Add a Toast on screen.
            getCategoryList();
            successOpen()
            setOpenCategory(false)
            getCategory()
            setLocationKey(0);

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
                    <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
                    <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Category Created Successfully</Text>
                    <TouchableOpacity style={styles.continueBtn} onPress={() => successOpen()}>
                        <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
            // success popup - Ends
        );
    }
    // --------------------------------- Create Category Ends -------------------------------------------------

    const sendDataToParent = (data) => { // the callback. Use a better name
        setEditItems(data)
        setCheckedItems(data.isActive)
        setUpdateItem(true)
        setOutletCheckedEditItems(data.outlets)
        setOutletCheckedItems(data.outlets)
    };

    //Choose category Location 
    const locationDropDownData = [
        { key: 1, label: 'Kitchen', value: 'Kitchen' },
        { key: 2, label: 'Warehouse', value: 'Warehouse' },

    ]

    //Get Category List
    useEffect(() => {
        getCategory();
        return () => {
            setCategoryData([]);
        }
    }, []);

    const getCategory = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        const result_cat = await api.getAllMasterData(token, endPoint.GET_CATEGORY + outletId);
        if (JSON.stringify(result_cat.data) === null || JSON.stringify(result_cat.data) === "null" || result_cat.data === "") {
            successInternetdownOpen()
        } else {
            setCategoryData(result_cat.data);
        }

    };
    //Add Items
    const submitmodifer = async () => {
        if (outletCheckedItems.length > 0) {
            const jsonValue: any = await AsyncStorage.getItem('userInfo')
            let loginData = JSON.parse(jsonValue);
            let token = loginData.token;
            let outletId = loginData.outletId;
            let itemObj = {
                id: editmodiferItems.id,
                itemName: editmodiferItems.itemName,
                description: editmodiferItems.description,
                itemCategoryId: editmodiferItems.itemCategoryId,
                isActive: editmodiferItems.isActive,
                itemAmount: editmodiferItems.itemAmount,
                bomDetails: [
                ],
                isReadyMade: true,
                modifiers:
                    outletCheckedItems
                ,
                discount: [
                    {
                        isPromocodeApplied: ispromocodeselected,
                        promocodeDiscountType: "",
                        promocodeDiscount: 0,
                        promocodeAmount: 0,
                        discountType: discountdataparticular[0]?.discountType,
                        discountValue: discountdataparticular[0]?.discountValue,
                        discountNotes: discountdataparticular[0]?.discoutNotes
                    }
                ],
                imageName: "",
                imagePath: null,
                imageExtension: "",
            }
            var myJson = {

                item: itemObj,
                outlets: editmodiferItems.outlets

            }
            const result = await api.UpdateMasterData(endPoint.EDIT_ITEMS + editItems.id, token, myJson);
            if (JSON.stringify(result.data) === null) {
            } else {
                // Add a Toast on screen.
                Toast.show('Items Updated successfully', {
                    duration: Toast.durations.LONG,
                });
                setopenModifierpop(!openModifierpop)
                getCategoryList()
                setOutletCheckedItems([])

            }
        } else {
            setmodifirerror(true)
            setOutletCheckedItems([])

        }


    }

    const submitdiscount = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        if (checkeddiscntId.length !== 0) {
            let itemObj = {
                id: edititemdiscount.id,
                itemName: edititemdiscount.itemName,
                description: edititemdiscount.description,
                itemCategoryId: edititemdiscount.itemCategoryId,
                isActive: edititemdiscount.isActive,
                itemAmount: parseInt(edititemdiscount.itemAmount),
                bomDetails: [
                ],
                isReadyMade: true,
                modifiers:
                    edititemdiscount.modifiers
                ,

                discount: [
                    {
                        isPromocodeApplied: ispromocodeselected,
                        promocodeDiscountType: getpromofilterdata[0]?.promocodeType,
                        promocodeDiscount: getpromofilterdata[0]?.promocodeValue,
                        promocodeAmount: 90,
                        discountType: discountdataparticular[0]?.discountType ? discountdataparticular[0]?.discountType : "",
                        discountValue: discountdataparticular[0]?.discountValue ? discountdataparticular[0]?.discountValue : 0,
                        discountedAmount: getpromofilterdata[0]?.discountedAmount,
                        discountNotes: discountdataparticular[0]?.discoutNotes ? discountdataparticular[0]?.discoutNotes : ""
                    }

                ],
                imageName: "",
                imagePath: null,
                imageExtension: "",
            }
            var myJson = {

                item: itemObj,
                outlets: edititemdiscount.outlets

            }
        } else {
            let itemObj = {
                id: edititemdiscount.id,
                itemName: edititemdiscount.itemName,
                description: edititemdiscount.description,
                itemCategoryId: edititemdiscount.itemCategoryId,
                isActive: edititemdiscount.isActive,
                itemAmount: parseInt(edititemdiscount.itemAmount),
                bomDetails: [
                ],
                isReadyMade: true,
                modifiers:
                    edititemdiscount.modifiers
                ,

                discount: [
                    {
                        isPromocodeApplied: true,
                        promocodeDiscountType: getpromofilterdata[0]?.promocodeType,
                        promocodeDiscount: getpromofilterdata[0]?.promocodeValue,
                        promocodeAmount: 34,
                        discountType: "",
                        discountValue: 0,
                        discountedAmount: 0,
                        discountNotes: getpromofilterdata[0]?.discountNotes
                    }

                ],
                imageName: "",
                imagePath: null,
                imageExtension: "",
            }
            var myJson = {

                item: itemObj,
                outlets: edititemdiscount.outlets

            }
        }

        const result = await api.UpdateMasterData(endPoint.EDIT_ITEMS + edititemdiscount?.id, token, myJson);
        if (JSON.stringify(result.data) === null) {
            successInternetdownOpen()
        } else {
            // Add a Toast on screen.
            Toast.show('Items Updated successfully', {
                duration: Toast.durations.LONG,
            });
            setOpenDiscount(!openDiscount)
            getCategoryList()
        }
        setCheckeddiscntId("")
        setCheckedpromoId("")
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

    /// Get the Item list
    useEffect(() => {
        getItemList();
        getIngredientsName();
        return () => {
            setData([]);
        }
    }, []);
    const getItemList = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        setUserData(loginData)
        var myJson = {
            IsAllItem: true,
            OutletId: outletId,
        }
        const result = await api.CreateMasterData(endPoint.GET_ITEMS, token, myJson);
        if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
        } else {
            setDataModifier(result.data);
        }
    }
    useEffect(() => {
        getOutletList()
        return () => {
            setData([]);
        }
    }, []);
    const getIngredientsName = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        const result = await api.getAllMasterData(token, endPoint.GET_INGREDIENTS);
        if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
            successInternetdownOpen()
        } else {
            setIngredintsDataList(result.data);
        }

    }
    //Get Outlet by Restaurant
    const getOutletList = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        const restaurantId: any = await AsyncStorage.getItem('restaurantId')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        const result = await api.getAllMasterData(token, endPoint.GET_OUTLETS_BY_RESTAURANT + restaurantId);
        if (result.success === true) {
            setOutletData(result.data.outlets)
        }
        else {
        }
    }
    //GET TAX API
    useEffect(() => {

        getTaxList();
        return () => {
            setTaxData([]);
        }
    }, []); const getTaxList = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;

        const result = await api.getAllMasterData(token, endPoint.GET_TAX + outletId);
        if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
            successInternetdownOpen()
        } else {
            setTaxData(result.data);
        }
    }
    const itemFromData = [
        { label: 'Item Master', value: 'Item Master' },
        { label: 'Ingredients', value: 'Ingredients' },
    ];
    const showdpromodataonclick = () => {
        setshowdpromodataonclk(!showdpromodataonclk)
        setshowdiscountclickdata(false)
    }

    const showdiscountdataonclick = () => {
        setshowdiscountclickdata(!showdiscountclickdata)
        setshowdpromodataonclk(false)

    }

    let DiscountFromArray = GetDiscount.map((s, i) => {
        return (
            <View style={[styles.flexAlignRow, styles.marBtm10]}>
                <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setCheckedpromoId(""), setCheckedpromo(!checkedpromo), setCheckeddiscnt(!checkeddiscnt), showdiscountype(s.discountId) }}>
                    <View style={[styles.radioButton, checkeddiscntId === s.discountId && styles.radioBtnChecked]}>
                        {
                            (checkeddiscntId === s.discountId) ? <View style={styles.radioBtnView}></View> : null
                        }
                    </View>
                    <Text style={[styles.promoValue]}>Discount Name :{s.discountName}</Text>
                </TouchableOpacity>
            </View>
        )
    })
    let PromocodeFromArray = promocode.map((s, i) => {
        return (
            <View style={[styles.flexAlignRow, styles.marBtm10]}>
                <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setCheckeddiscntId(""), setCheckedpromo(!checkedpromo), showpromotype(s.promocodeId), setIspromocodeselected(true); }}>
                    <View style={[styles.radioButton, checkedpromoId === s.promocodeId && styles.radioBtnChecked]}>
                        {
                            (checkedpromoId === s.promocodeId) ? <View style={styles.radioBtnView}></View> : null
                        }
                    </View>
                    <Text style={[styles.promoValue]}>Promo Name :{s.promocodeName} - Promo Code : {s.promocode}</Text>
                </TouchableOpacity>

            </View>
        )
    })

    const handleSearch = (text: any) => {
        setQuery(text);
        const formattedQuery = text.toLowerCase();
        // let filteredData = modifierGroupDatafilter.filter((item) => { // search from a full list, and not from a previous search results list
        //     if (item.groupName.toLowerCase().match(text))
        //         return item;
        // })
        let filteredData = modifierGroupDatafilter.filter((item) =>
            item.groupName.toLowerCase().includes(text.toLowerCase())
        );

        setModifierGroupData(filteredData);
    };



    //Add category Popup
    const popupAddCategory = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>
                    <View>
                        <View>
                            <View style={styles.popupHeadWrap}>
                                <Text style={styles.textStyle3}>
                                    Add Category
                                </Text>
                                <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                                    <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                    <Text style={styles.closeText}>
                                        Close
                                    </Text>
                                </Pressable>
                            </View>
                            <Formik
                                validationSchema={addCategoryValidationSchema}
                                initialValues={{
                                    name: '',
                                    categoryCode: '',
                                    location: '',
                                    categoryDescription: '',
                                }}
                                onSubmit={values => handleSubmit(values)}
                            >
                                {({ handleSubmit, handleChange, isValid, values, setFieldValue, touched, errors }) => (
                                    <View  >
                                        <View style={[styles.popuprow]}>
                                            <Field
                                                component={CustomInput}
                                                name="name"
                                                label="Name of the Category"
                                                mandate={true}

                                            />
                                            <Field
                                                component={CustomInput}
                                                name="categoryCode"
                                                label="Category Code"
                                                mandate={true}
                                            />
                                        </View>
                                        <View style={styles.popuprow}>
                                            <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                                                <Text style={[styles.signLabel, styles.textDefault]}>Select Location<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                                <View style={styles.pickerView}>
                                                    <ModalDropDown style={styles.dropdonwImg} />
                                                    <ModalSelector
                                                        data={locationDropDownData}
                                                        childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                                                        selectStyle={styles.selectText}
                                                        optionContainerStyle={styles.selectCont}
                                                        optionTextStyle={styles.textStyle}
                                                        overlayStyle={styles.overlayText}
                                                        cancelStyle={styles.selectCont}
                                                        cancelContainerStyle={styles.cancelCont}
                                                        cancelText={"Cancel"}
                                                        initValue="Select Location"
                                                        selectedKey={locationKey}
                                                        onChange={(option) => {
                                                            if (option.key) { // workaround for ios https://github.com/peacechen/react-native-modal-selector/issues/140
                                                                setFieldValue('location', option.value)
                                                                setLocationKey(option.key)
                                                            }

                                                        }}
                                                    />
                                                </View>
                                                {touched.location && errors.location &&
                                                    <Text style={[styles.signLabel, { color: Colors.dangerRed }]}> Select Location is required</Text>

                                                }
                                            </View>

                                            <Field
                                                component={CustomInput}
                                                name="categoryDescription"
                                                label="Category Description"
                                                mandate={false}
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
                </View>
            </KeyboardAwareScrollView>
        );
    }

    const popupAddDiscount = () => {
        return (
            <View style={[styles.popupheight]}>
                <KeyboardAwareScrollView enableOnAndroid={true}
                    enableAutomaticScroll={(Platform.OS === 'ios')}>
                    <View style={[styles.popupContainer]}>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>
                                Add Discount for<Text style={styles.addmoifieritem}> {edititemdiscount?.itemName}</Text>
                            </Text>
                            <Pressable style={styles.closeView} onPress={() => toggleModa3()}>
                                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                <Text style={styles.closeText}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>
                        <View style={styles.disPromoBlk}>
                            <View style={[styles.paddR8, styles.discountBlk]}>
                                <View style={styles.discountSeg}>
                                    <Text style={[styles.tableCell, style.marBtm10]}>Choose Discount</Text>
                                    <ScrollView style={styles.disHei}>
                                        {
                                            (DiscountFromArray)
                                        }
                                    </ScrollView>
                                </View>
                                <View style={[styles.discountSeg, styles.disseg]}>
                                    <Text style={[styles.tableCell, style.marBtm10]}>Selected Discount</Text>
                                    {
                                        (
                                            <View>
                                                <View style={styles.discountvalueBlk}>
                                                    <Text style={styles.tableHeader}>Discount Type : </Text><Text style={[styles.promoValue]}>{discountdataparticular[0]?.discountType}</Text>
                                                </View>
                                                <View style={styles.discountvalueBlk}>
                                                    <Text style={styles.tableHeader}>Discount Value : </Text><Text style={[styles.promoValue]}>{discountdataparticular[0]?.discountValue}</Text>
                                                </View>
                                                <View style={styles.discountvalueBlk}>
                                                    <Text style={styles.tableHeader}>Discount Amount : </Text><Text style={[styles.promoValue]}>{discountdataparticular[0]?.discountType}</Text>
                                                </View>
                                                <View style={styles.discountvalueBlk}>
                                                    <Text style={styles.tableHeader}>Discount Notes : </Text><Text style={[styles.promoValue]}>{discountdataparticular[0]?.discoutNotes}</Text>
                                                </View>
                                            </View>
                                        )

                                    }
                                </View>
                            </View>

                            <View style={[styles.paddL8, styles.discountBlk]}>
                                <View style={[styles.discountSeg]}>
                                    <Text style={[styles.tableCell, style.marBtm10]}>Add Promo Code</Text>
                                    <ScrollView style={styles.disHei}>

                                        {
                                            (PromocodeFromArray)
                                        }
                                    </ScrollView>
                                </View>
                                <View style={[styles.discountSeg, styles.disseg]}>
                                    <Text style={[styles.tableCell, style.marBtm10]}>Selected Promo Code</Text>
                                    {
                                        (
                                            <View>
                                                <View style={styles.discountvalueBlk}>
                                                    <Text style={styles.tableHeader}>Promo Type : </Text><Text style={[styles.promoValue]}>{getpromofilterdata[0]?.promocodeType}</Text>
                                                </View>
                                                <View style={styles.discountvalueBlk}>
                                                    <Text style={styles.tableHeader}>Promo Value : </Text><Text style={[styles.promoValue]}>{getpromofilterdata[0]?.promocodeValue}</Text>
                                                </View>
                                                <View style={styles.discountvalueBlk}>
                                                    <Text style={styles.tableHeader}>Promo Amount : </Text><Text style={[styles.promoValue]}>{getpromofilterdata[0]?.promocodeType}</Text>
                                                </View>
                                                <View style={styles.discountvalueBlk}>
                                                    <Text style={styles.tableHeader}>Promo Notes : </Text><Text style={[styles.promoValue]}>{getpromofilterdata[0]?.PromoNotes}</Text>
                                                </View>
                                            </View>
                                        )

                                    }
                                </View>

                                <View style={[styles.wdth100, styles.martop15]}>
                                    <TouchableOpacity onPress={() => submitdiscount()}>
                                        <View>
                                            <CustomButton styles={styles.addCaaatBtn} onPress={() => submitdiscount()} label={"Continue"} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>






                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
    //Add modifier to Item
    const popupAddModifier = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>
                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>
                                Add Modifier Groups for<Text style={styles.addmoifieritem}> {editmodiferItems?.itemName}</Text>
                            </Text>
                            <Pressable style={styles.closeView} onPress={() => toggleModa4()}>
                                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                <Text style={styles.closeText}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>
                        <View style={{ flex: 1, margin: 10 }}>
                            <Searchbar
                                icon={() => <SearchIcon />}
                                inputStyle={styles.searchInput}
                                style={styles.searchContainer}
                                placeholderTextColor={'#484D54'}
                                placeholder="Search Modifier Group Name"
                                onChangeText={(queryText: any) => handleSearch(queryText)}
                                value={query}
                            />
                            <FlatList
                                data={modifierGroupData}
                                renderItem={({ item }) =>
                                    <View style={[styles.wdth100, styles.tableRow, styles.marTop10, { borderColor: showView && showViewId == item.id ? '#407C6A' : '#F5F3F6' }]}>
                                        <View style={[styles.flexAlignRow, styles.flexWrap]}>

                                            <View style={[styles.pad15, styles.wdth100]}>
                                                <TouchableOpacity style={[styles.flexAlignRow, styles.wdth100, styles.flexWrap, styles.justifyBetween]}
                                                    onPress={() => {
                                                        const newIds = [...outletCheckedItems];
                                                        const index = newIds.indexOf(item.id);
                                                        if (index > -1) {
                                                            newIds.splice(index, 1);
                                                        } else {
                                                            newIds.push(item.id)
                                                        }
                                                        setOutletCheckedItems(newIds)
                                                    }
                                                    }>
                                                    <View style={[styles.flexrow, styles.alignCenter]}>
                                                        <View style={[styles.checkbox, outletCheckedItems.includes(item?.id) && styles.radioBtnChecked]}>
                                                            {

                                                                (outletCheckedItems.includes(item?.id)) ? <View style={styles.checkTick}></View> : null
                                                            }
                                                        </View>
                                                        <Text style={[styles.promoValue, styles.lineHeight20, styles.padL5]}>{item.groupName}</Text>

                                                    </View>
                                                    <View style={[styles.padL5]}>

                                                        {
                                                            showViewId != item.id ?
                                                                <TouchableOpacity onPress={() => {
                                                                    setShowView(true)
                                                                    setShowViewId(item?.id)
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
                                                                    <EyeOffIcon />
                                                                </TouchableOpacity>
                                                        }
                                                    </View>
                                                </TouchableOpacity>
                                            </View>


                                        </View>
                                        <View>
                                            {
                                                showView && showViewId == item.id &&
                                                <View style={styles.viewCon}>
                                                    <View style={[styles.tableViewBorder]}>
                                                        <View style={styles.ViewConBlk}>
                                                            <View style={styles.viewCatView}>
                                                                <Text style={styles.catName}>Group Name :</Text>
                                                                <Text style={styles.catValue}>{item.groupName}</Text>
                                                            </View>
                                                            <View style={styles.viewCatView}>
                                                                <Text style={styles.catName}>Item Name : </Text>
                                                                <Text style={styles.catValue}>{item?.modifierItems[0]?.itemName}</Text>
                                                            </View>
                                                            <View style={styles.viewCatView}>
                                                                <Text style={styles.catName}>Price : </Text>
                                                                <Text style={styles.catValue}>{item?.modifierItems[0]?.price}</Text>
                                                            </View>
                                                        </View>

                                                    </View>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                }
                                keyExtractor={item => item.outletId} />
                        </View>
                        {(modifirerror === true) &&
                            <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Select Modifier is required</Text>
                        }
                        <TouchableOpacity onPress={() => submitmodifer()}>
                            <View style={styles.popupBtnCon}>
                                <CustomButton styles={styles.addCaaatBtn} onPress={() => submitmodifer()} label={"Continue"} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }


    return (
        <>
            <Header heading={"Menu"} />

            <ScrollView style={styles.categoryBlkCon}>
                <View style={[styles.textcontainer1, styles.catSubBlk]}>
                    <Text style={styles.textStyle1}>
                        Menu
                    </Text>
                    <View>
                    </View>
                    <View style={styles.itemFlex}>
                        <TouchableOpacity onPress={() => openAddCategory()}>
                            <View style={[styles.textcontainer2, styles.margrgt10]}>
                                <Text style={styles.textStyle2}>
                                    Add Category
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ItemsRecipe')}>
                            <View style={[styles.textcontainer2, styles.margrgt10]}>
                                <Text style={styles.textStyle2}>
                                    Add Item
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setmodifirerror(false), navigation.navigate('AddModifier') }}>
                            <View style={styles.textcontainer2}>
                                <Text style={styles.textStyle2}>
                                    Add Modifier
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={[styles.paddB60]}>
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
                                    <Text style={styles.recordDisplay}>There are no Items to display.</Text>
                                </View>

                                <View style={styles.noRecordItem}>
                                    <Text style={styles.addText} onPress={() => navigation.navigate('ItemsRecipe')}>
                                        Add Item
                                    </Text>
                                    <Text style={styles.recordDisplay}>
                                        to continue.
                                    </Text>
                                </View>
                            </View>
                            // no record HTML Ends
                            :
                            <View>
                                {isrefreshingresult ? <View style={[styless.flexrow, styless.alignCenter, styless.justifyCenter, styless.loaderImg]}>
                                    <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
                                </View> :
                                    <TableView data={data} sendEditData={sendDataToParent} sendDiscountData={sendDisocuntDataToParent} sendModifierData={sendModifierDataToParent} updateDelete={() => getCategoryList()} />

                                }
                            </View>

                        }

                    </View>
                    {openCategory &&
                        <Modal isVisible={openCategory}>
                            {popupAddCategory()}
                        </Modal>
                    }

                    {openDiscount &&
                        <Modal isVisible={openDiscount}>
                            {popupAddDiscount()}
                        </Modal>
                    }
                    {openModifierpop &&
                        <Modal isVisible={openModifierpop}>
                            {popupAddModifier()}
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
                </View>
            </ScrollView>

        </>
    );

}