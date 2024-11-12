import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Pressable, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import * as yup from 'yup';
import { default as style, default as styles } from '../../assets/css/style';
import Header from '../../components/sideMenuHeaderMaster';
// import TextInput from '../../components/Texinput';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import Colors from '../constants/colors';

export default function ItemUpdateRecipe({ navigation, route }: { navigation: any, route: any }) {
    const [updateItemData, setUpdateItemData] = useState(route.params)
    const [categoryData, setCategoryData] = useState([]);
    const [catKey, setCatKey] = useState(null);
    const [catKeyLabel, setcatKeyLabel] = useState("");

    const [taxKey, setTaxKey] = useState<any>(null);
    // const [itemName, setItemName] = useState({ value: route.params?.itemName, error: '' })
    // const [amount, setAmount] = useState({ value: route.params?.itemAmount, error: '' })
    // const [itemDescription, setDescription] = useState({ value: route.params?.description, error: '' })
    const [taxData, setTaxData] = useState([])
    const [isDataPresent, setDataPreset] = useState(false);
    const [categoryFieldData, setCategoryFiledData] = useState('')
    const [taxFieldData, setTaxFiledData] = useState('')
    const [openItems, setOpenItems] = useState(false);
    const [outletData, setOutletData] = useState([]);
    const [outletChecked, setOutletChecked] = useState([]);
    const [itemOutlet, setItemOutlet] = useState(route.params.outlets)
    const [checked, setChecked] = useState(route.params.isActive);
    const [ImageUigallery, setimageUriGallary] = useState('')
    const [image, setImage] = useState<any>(route.params.imagePath);
    const [imagebase64, setImagebase64] = useState(null);
    const [fileSize, setFileSize] = useState(null)
    const [imageExtension, setImageExtension] = useState(null);
    const [recipeData, setRecipeData] = useState([]);
    const isFocused = useIsFocused();
    const [productValue, setProductValue] = useState('')
    const [supplierValue, setSupplierValue] = useState([])
    const [itemKey, setItemKey] = useState(0)
    const [recipeListData, setRecipeListData] = useState(route.params.recipe ? route.params.recipe : [])
    const [openAddRecipe, setOpenAddRecipe] = useState(false)
    const [addRecipe, setAddRecipe] = useState(false);
    const [addRecipesubmit, setAddRecipesubmit] = useState(false);
    const [addCatsubmit, setAddCatsubmit] = useState(false);
    const [addTaxsubmit, setAddTaxsubmit] = useState(false);
    const [supplierVal, setSupplierVal] = useState(0)
    const [supplierSubmit, setSupplierSubmit] = useState(false)
    const [fileSizeError, setFileSizeError] = useState(false)
    const [isrefreshingresult, setIsrefreshingresult] = useState(false)
    const [openSuccessMsg, setopenSuccessMsg] = useState(false);

    const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false);

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);
    const [itemName, setItemName] = useState(route.params?.itemName)
    const [amount, setAmount] = useState(route.params.itemAmount)
    const [itemDescription, setItemDescription] = useState(route.params?.description)
    // console.log(amount)
    // useEffect(() => {
    //     setChecked(route.params.isActive);
    // }, [route?.params?.isActive]);
    // useEffect(() => {
    //     setDescription({ value: route.params?.description, error: '' });
    // }, [route?.params?.description]);
    // console.log(taxKey, "taxKey")

    useEffect(() => {
        setImage(route?.params?.imagePath);
    }, [route?.params?.imagePath]);
    useEffect(() => {
        setUpdateItemData(route?.params);
        setItemName(route.params?.itemName);
        setAmount(route.params.itemAmount);
        setItemDescription(route.params?.description);
        setCategoryFiledData(route.params?.itemCategoryId)
        setTaxFiledData(route.params?.taxId);
        setRecipeListData(route.params.recipe ? route.params.recipe : [])
        setChecked(route.params.isActive)
    }, [route?.params]);
    // useEffect(() => {
    //     setOutletChecked(route?.params?.outlets);
    // }, [route?.params?.outlets]);
    // useEffect(() => {
    //     setItemName(route?.params?.itemName);
    // }, [route?.params?.itemName]);
    // useEffect(() => {
    //     setAmount(route?.params?.itemAmount);
    // }, [route?.params?.outlets]);
    const [outletserror, setOutletserror] = useState(false)


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

    useEffect(() => {
        getOutletList();
        return () => {
            setOutletData([]);
        }
    }, []);


    //Get Outlet by Restaurant
    const getOutletList = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        const restaurantId: any = await AsyncStorage.getItem('restaurantId')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        const result = await api.getAllMasterData(token, endPoint.GET_OUTLETS_BY_RESTAURANT + restaurantId);
        if (result.success === true) {
            setOutletData(result.data.outlets)
            const outletIds = result?.data?.outlets.map(item => item.outletId);
            setOutletChecked(outletIds)
            setList(result.data.outlets)
        }
        else {
        }
    }
    // Get Category List
    useEffect(() => {
        getCategory();
        return () => {
            setCategoryData([]);
        }
    }, []);
    //Get Category List
    const getCategory = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        const result_cat = await api.getAllMasterData(token, endPoint.GET_CATEGORY + outletId);
        if (JSON.stringify(result_cat.data) === null || JSON.stringify(result_cat.data) === "null" || result_cat.data === "") {
            Alert.alert("Some Error occured. Please try again.");
        } else {
            setCategoryData(result_cat.data);
        }
    };
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
            Alert.alert("Some Error occured. Please try again.");
            setDataPreset(false);
        } else {
            setTaxData(result.data);
            setDataPreset(true);
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

        if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
            // Toast.show("Some Error occured. Please try again.");

        } else {
            setRecipeData(result.data);

        }
    }
    //validation 
    const itemNameValidator = (itemName: string) => {
        if (!itemName) return "Item Name is required."
        return ''
    }
    const itemAmountValidator = (itemName: string) => {
        if (!itemName) return "Amount is required."
        return ''
    }
    // console.log(.value)
    //Update Item
    const updateItems = async (data) => {
        // const SelectItemNameError = itemNameValidator(itemName.value)
        // const SelectAmountError = itemAmountValidator(amount.value)

        // if (itemName || amount) {
        //     setItemName({ ...itemName, error: SelectItemNameError })
        //     // setAmount({ ...amount, error: SelectAmountError })
        //     // setDescription({ ...itemDescription, error: SelectDescriptionError })
        // }
        setOutletserror(true)
        if (outletChecked.length != 0) {
            setOutletserror(false)
        }
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        let itemObj = {
            id: updateItemData.id,
            itemName: itemName,
            description: itemDescription,
            itemCategoryId: categoryFieldData,
            isActive: checked,
            taxId: taxFieldData,
            isBatchRecipe: false,
            itemAmount: amount,
            bomDetails: [
            ],
            isReadyMade: true,
            modifiers: [
                "string"
            ],
            discount: [
            ],
            imageName: "",
            imagePath: image,
            imageExtension: "",
            recipe: recipeListData,
        }
        var myJson = {

            item: itemObj,
            outlets: outletChecked ? outletChecked : itemOutlet

        }
        // console.log(myJson, "myJson::")
        if (itemName != "" && amount != "" && outletserror === false) {
            setIsrefreshingresult(true)
            const result = await api.UpdateMasterData(endPoint.EDIT_ITEMS + updateItemData.id, token, myJson);
            // console.log(result, 'result')
            if (JSON.stringify(result.data) === null) {
                // Alert.alert("Some Error occured. Please try again.");
            } else {
                successOpenUpdate();
                setOutletserror(false)
                setImage(null);
                // setItemName("");
                // setAmount("")
                setItemDescription("");
                setCategoryFiledData('');
                setTaxFiledData('');
                setIsrefreshingresult(false)
            }
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
                    <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
                    <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Item Updated Successfully</Text>
                    <TouchableOpacity style={styles.continueBtn} onPress={() => [successOpenUpdate(), navigation.navigate('Menu')]}>
                        <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
            // success popup - Ends
        );
    }

    const handleSelectAll = () => {
        if (isCheckAll) {
            setIsCheck([]);
            setOutletChecked([])
            setOutletserror(true)
        } else {
            setOutletChecked(list.map(li => li.outletId));
            setOutletserror(false)
        }
    };
    // const handledeSelectAll = () => {
    //     setIsCheck([])
    // };
    let catarray = categoryData.map((s, i) => {

        let newData = {
            key: i + 1,
            label: s.categoryName,
            value: s.categoryId
        }
        return newData
    })
    let taxArray = taxData.map((v, k) => {
        let newData = {
            key: k + 1,
            label: v.taxPercent[0].taxPercent,
            value: v.taxId
        }
        return newData
    })
    useEffect(() => {
        dropdownData();
    }, []);

    const dropdownData = () => {
        const catDataArray = catarray.filter((item) => item.label == updateItemData.categoryName)
        setCatKey(catDataArray[0]?.key)
        const taxArrayData = taxArray.filter((item) => item.value == updateItemData.taxId)
        setTaxKey(taxArrayData[0]?.key)
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {

            const fileSize = result?.assets[0]?.base64.length * (3 / 4) - 2;
            if (fileSize > 1000000) {
                Alert.alert(
                    'Info',
                    'Please select an image less than 1MB.',
                    [{ text: 'OK', onPress: () => { } }]
                );
            }
            else {
                setImage(result?.assets[0]?.uri);
                setImagebase64('data:image/jpg;base64,' + result?.assets[0]?.base64);

                let fileExtension = result?.assets[0]?.uri.slice(result?.assets[0]?.uri.lastIndexOf('.') + 1);
                setImageExtension(fileExtension)
            }
            setFileSize(fileSize)
            if (fileSize > 6000000) {
                setFileSizeError(true);
            } else {
                setFileSizeError(false);
                const base64 = `data:image/jpg;base64,${result?.assets[0].base64}`;
            }
            let profiledata = {
                Image: "data:image/jpg;base64," + result?.assets[0].base64,
                // Image:"",
                ImageMimeType: "image/jpeg",
                ImageFileName: "Image",
                ImageExt: fileExtension

            }
            if (profiledata) {

            }
        }
    };
    const openGallery = () => {
        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                // You can also display the image using data:
                const source = { uri: 'data:image/jpeg;base64,' + response.base64 };
                setimageUriGallary(source);
            }
        });
    };
    const uniqueIds = [];

    const uniqueProductName = recipeData.filter(element => {
        const isDuplicate = uniqueIds.includes(element.productName);

        if (!isDuplicate) {
            uniqueIds.push(element.productName);

            return true;
        }

        return false;
    });

    let productListArray = uniqueProductName.map((s, i) => {

        let newData = {
            key: i + 1,
            label: s.productName,
            value: s.productID
        }
        return newData
    })
    const handleInputChangeRecipe = (e, name) => {
        setRecipeValues(prevState => ({
            ...prevState,
            [name]: e
        }));
    };
    let filtersuplierdata = recipeData.filter((element => element.productName === productValue));

    let supplierListArray = filtersuplierdata.map((k, v) => {

        let newData = {
            key: v + 1,
            label: k.supplierName,
            value: k
        }
        return newData
    });
    const Supplierdata = (data: any) => {
        let supplierfilter = filtersuplierdata.filter((el => el.supplierName === data));
        setSupplierValue(supplierfilter)
    }
    const addRecipeClick = () => {
        setAddRecipesubmit(true)
        setSupplierSubmit(true)
        if (itemKey !== 0 && supplierVal) {
            setAddRecipesubmit(false)
            setSupplierSubmit(false)
            setRecipeListData([...recipeListData, recipeValues])
            setOpenAddRecipe(!openAddRecipe)
        }
        setRecipeValues({
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
    };
    const addItemsValidationSchema = yup.object().shape({

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
    const removeClickRecipe = (data) => {
        let index = data;
        const list = [...recipeListData];
        list.splice(index, 1);
        setRecipeListData(list)
    }
    const toggleItemsAddRecipe = () => {
        setOpenAddRecipe(!openAddRecipe)
        setRecipeValues({
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
        setItemKey(0)
    };
    const openAddItemsRecipe = () => {
        setOpenAddRecipe(!openAddRecipe)
    }
    const removeImage = () => {
        setImage(null)

    }
    useEffect(() => {
        const selectedCategoryId = route.params?.categoryName;
        setCategoryFiledData(route.params?.itemCategoryId)
        if (selectedCategoryId) {
            setCatKey(selectedCategoryId);
        }
    }, [route.params?.categoryName]);

    useEffect(() => {
        const selectedtaxId = route.params?.taxId;
        setTaxFiledData(selectedtaxId)
        const taxObject = taxData.find((tax) => tax.taxId === selectedtaxId);

        const taxPercent = taxObject?.taxPercent?.[0]?.taxPercent ?? null;

        if (selectedtaxId) {
            setTaxKey(taxPercent);
        }
    }, [route.params?.taxId, taxData.length > 0]);
    //Add Reciep Popup
    const popupAddRecipe = () => {
        return (

            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>
                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>
                                Add Recipe
                            </Text>
                            <Pressable style={styles.closeView} onPress={() => toggleItemsAddRecipe()}>
                                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                <Text style={styles.closeText}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>
                        <Formik
                            validationSchema={addItemsValidationSchema}
                            initialValues={{

                                itemForRecipe: '',
                                supplierRecipe: '',
                                quantity: ''

                            }}
                            onSubmit={values => addRecipeClick(values)}
                        >
                            {({ handleSubmit, handleChange, isValid, values, setFieldValue, touched, errors }) => (
                                <View style={{ flex: 1, alignItems: 'stretch', }} >
                                    <View style={[styles.popuprow]}>
                                        <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                                            <Text style={[styles.signLabel, styles.textDefault]}>Select Item From Product<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                            <View style={styles.pickerView}>
                                                <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
                                                <ModalSelector
                                                    data={productListArray.sort(function (a, b) {
                                                        return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0
                                                    })}
                                                    childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                                                    selectStyle={styles.selectText}
                                                    optionContainerStyle={styles.selectCont}
                                                    optionTextStyle={styles.textStyle}
                                                    initValueTextStyle={styles.textStyle}
                                                    overlayStyle={styles.overlayText}
                                                    cancelStyle={styles.selectCont}
                                                    cancelContainerStyle={styles.cancelCont}
                                                    cancelText={"Cancel"}
                                                    initValue={"Select Item recipe"}
                                                    selectedKey={recipeValues.key1}
                                                    onChange={(option) => {
                                                        if (option.key) {
                                                            setFieldValue('itemForRecipe', option.key)
                                                            setProductValue(option.label)
                                                            handleInputChangeRecipe(option.label, 'productName')
                                                            handleInputChangeRecipe(option.value, 'productID')
                                                            handleInputChangeRecipe(option.key, 'key1')
                                                            setItemKey(option.key)
                                                            setAddRecipesubmit(false)
                                                        }
                                                    }}
                                                />
                                            </View>
                                            {(itemKey === 0 && addRecipesubmit === true) &&
                                                <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Select Item From Product is required</Text>
                                            }
                                        </View>
                                        <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                                            <Text style={[styles.signLabel, styles.textDefault]}>Select Supplier From Supplier<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                            <View style={styles.pickerView}>
                                                <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
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
                                                    initValue={"Select Supplier recipe"}
                                                    selectedKey={recipeValues.key2}
                                                    onChange={(option) => {
                                                        setFieldValue('supplierRecipe', option?.value);
                                                        Supplierdata(option?.value);
                                                        handleInputChangeRecipe(option?.value.supplierName, 'supplierName')
                                                        handleInputChangeRecipe(option?.value?.supplierID, 'supplierID')
                                                        handleInputChangeRecipe(option?.value?.unit, 'unit')
                                                        handleInputChangeRecipe(option?.value?.price, 'price')
                                                        handleInputChangeRecipe(option?.key, 'key2')
                                                        setSupplierVal(option?.key)

                                                    }}
                                                />

                                            </View>
                                            {supplierVal === 0 && supplierSubmit === true &&
                                                <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Select Supplier Recipe is required</Text>
                                            }
                                        </View>
                                    </View>
                                    <View style={[styles.flexrow]}>

                                        <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                                            <Text>Amount </Text>
                                            <TextInput editable={false} selectTextOnFocus={false} style={styles.signInput} placeholder='Amount' value={supplierValue[0]?.price}>
                                                {recipeValues?.price}
                                            </TextInput>
                                        </View>
                                        <View style={[styles.popupInputBlk, styles.wdth25, styles.paddRL15]}>
                                            <Text>Unit</Text>
                                            <TextInput editable={false} selectTextOnFocus={false} style={styles.signInput} placeholder='Unit'>
                                                {recipeValues?.unit}
                                            </TextInput>

                                        </View>
                                        <View style={[styles.popupInputBlk, styles.wdth25, styles.paddRL15]}>
                                            <Text>Quantity</Text>
                                            <TextInput style={styles.signInput} placeholder='Quantity' keyboardType="numeric"


                                                onChangeText={(text: string) => handleInputChangeRecipe(text, 'quantity')}>

                                            </TextInput>
                                        </View>
                                    </View>
                                    {
                                        <View style={[styles.popupBtnCon, styles.wdth100]}>

                                            <TouchableOpacity onPress={() => { addRecipeClick(); setAddRecipe(true) }} style={styles.UpdateBtn}>
                                                <Text style={styles.textWhite} onPress={() => { addRecipeClick(); setAddRecipe(true) }}>Continue</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </KeyboardAwareScrollView>

        )
    }
    // ---------------------------------------- User Interface ----------------------------------------------------------------
    return (
        <>
            <Header heading={"ItemRecipe"} />
            {isrefreshingresult ? <View style={[styles.flexrow, styles.alignCenter, styles.justifyCenter, styles.loaderImg]}>
                <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styles.loaderIcon} />
            </View> :
                <>
                    <KeyboardAwareScrollView>
                        <View style={styles.categoryBlkCon}>
                            <View style={[styles.textcontainer1, styles.padB6]}>
                                <View>
                                    <Text style={styles.textStyle1}>Update Item</Text>
                                    <Text style={[styles.font11, styles.textDefault]}>Menu - Update Items</Text>
                                </View>
                            </View>

                            <View style={[styles.whiteBg, styles.padH10, styles.padV25]}>
                                <View style={[styles.flexrow, styles.flexWrap]}>
                                    <View style={[styles.popupInputBlk, styles.width33, styles.paddRL15]}>
                                        <Text style={[styles.signLabel, styles.textDefault]}>Select Category<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                        <View style={styles.pickerView}>
                                            <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
                                            <ModalSelector
                                                data={catarray.sort(function (a, b) {
                                                    return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0
                                                })}
                                                childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                                                selectStyle={styles.selectText}
                                                optionContainerStyle={styles.selectCont}
                                                optionTextStyle={styles.textStyle}
                                                initValueTextStyle={styles.textStyle}
                                                overlayStyle={styles.overlayText}
                                                cancelStyle={styles.selectCont}
                                                cancelContainerStyle={styles.cancelCont}
                                                cancelText={"Cancel"}
                                                initValue={catKey}
                                                selectedKey={catKey}
                                                onChange={(option) => {
                                                    if (option.key) {
                                                        setCategoryFiledData(option.value)
                                                        setCatKey(option.key)
                                                    }
                                                }}
                                            />
                                        </View>
                                        {(catKey === 0 && addCatsubmit === true) &&
                                            <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Select category is required</Text>
                                        }
                                    </View>
                                    {/* <View style={[styles.popupInputBlk, styles.width33, styles.paddRL15]}>
                                <Text style={[styles.signLabel, styles.textDefault]}>Item Name<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                <TextInput
                                    style={styles.AddsignInput}
                                    defaultValue={route?.params?.itemName}
                                    onChangeText={(text: any) => setItemName({ value: text })}
                                    value={route.params?.itemName}
                                    errorText={itemName.error}
                                    error={!!itemName.error}
                                    errorText={itemName.error}

                                />
                            </View> */}
                                    <View style={[styles.popupInputBlk, styles.width33, styles.paddRL15]}>
                                        <Text style={[styles.signLabel, styles.textDefault]}>Item Name <Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                        <TextInput style={styles.signInput}
                                            defaultValue={itemName}
                                            value={itemName}
                                            onChangeText={(text) => setItemName(text)} />
                                        {itemName === "" && (
                                            <Text style={[styles.errorText, { marginTop: 5 }]}>Item Name is required</Text>
                                        )}
                                    </View>
                                    <View style={[styles.popupInputBlk, styles.width33, styles.paddRL15]}>
                                        <Text style={[styles.signLabel, styles.textDefault]}>Amount<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                        <TextInput style={styles.signInput}
                                            keyboardType='numeric'
                                            defaultValue={JSON.stringify(amount)}
                                            value={amount}
                                            onChangeText={(text) => setAmount(text)} />
                                        {amount === "" && (
                                            <Text style={[styles.errorText, { marginTop: 5 }]}>Amount is required</Text>
                                        )}
                                    </View>
                                    {/* <View style={[styles.popupInputBlk, styles.width33, styles.paddRL15]}>
                                <Text style={[styles.signLabel, styles.textDefault]}>Amount<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                <TextInput
                                    style={styles.AddsignInput}
                                    defaultValue={route?.params?.itemAmount?.toString()}
                                    onChangeText={(text: any) => setAmount({ value: text })}
                                    value={route.params?.itemAmount}
                                    keyboardType="numeric"
                                    errorText={amount.error}
                                    error={!!amount.error}
                                    errorText={amount.error}
                                />
                            </View> */}
                                    <View style={[styles.popupInputBlk, styles.width33, styles.paddRL15]}>
                                        <Text style={[styles.signLabel, styles.textDefault]}>Select Tax</Text>
                                        <View style={styles.pickerView}>
                                            <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
                                            <ModalSelector
                                                data={taxArray.sort(function (a, b) {
                                                    return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0
                                                })}
                                                childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                                                selectStyle={styles.selectText}
                                                optionContainerStyle={styles.selectCont}
                                                optionTextStyle={styles.textStyle}
                                                initValueTextStyle={styles.textStyle}
                                                overlayStyle={styles.overlayText}
                                                cancelStyle={styles.selectCont}
                                                cancelContainerStyle={styles.cancelCont}
                                                cancelText={"Cancel"}
                                                initValue={taxKey === null || taxKey === undefined ? "Select Tax" : taxKey}
                                                selectedKey={taxKey}
                                                onChange={(option) => {
                                                    if (option.key) {
                                                        setTaxFiledData(option.value)
                                                        setTaxKey(option.key)
                                                    }
                                                }}
                                            />
                                        </View>
                                        {(taxKey === 0 && addTaxsubmit === true) &&
                                            <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Select Tax is required</Text>
                                        }
                                    </View>
                                    {/* <View style={[styles.popupInputBlk, styles.width33, styles.paddRL15]}>
                                <Text style={[styles.signLabel, styles.textDefault]}>Description</Text>
                                <TextInput
                                    style={styles.AddsignInput}
                                    defaultValue={itemDescription.value}
                                    onChangeText={(text: any) => setDescription({ value: text })}
                                    value={itemDescription.value}
                                />
                            </View> */}
                                    <View style={[styles.popupInputBlk, styles.width33, styles.paddRL15]}>
                                        <Text style={[styles.signLabel, styles.textDefault]}>Description</Text>
                                        <TextInput style={styles.signInput}
                                            defaultValue={itemDescription}
                                            value={itemDescription}
                                            onChangeText={(text) => setItemDescription(text)} />
                                    </View>
                                    <View style={[styles.popupInputBlk, styles.wdth33, styles.paddRL15]}>
                                        <Text style={[styles.signLabel, styles.textDefault]}>Item Status</Text>
                                        <View style={styles.flexAlignRow}>
                                            <View style={[styles.flexAlignRow, styles.paddR15]}>
                                                <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setChecked(true) }}>
                                                    <View style={[styles.radioButton, checked && styles.radioBtnChecked]}>
                                                        {
                                                            (checked) ? <View style={styles.radioBtnView}></View> : null
                                                        }
                                                    </View>
                                                    <Text style={[styles.promoValue]}>Active</Text>
                                                </TouchableOpacity>
                                                {/* <RadioButton
                                                       value={checked}
                                                       status={checked === true ? 'checked' : 'unchecked'}
                                                      
                                                   /> */}
                                            </View>
                                            <View style={[styles.flexAlignRow, styles.paddR15]}>
                                                <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setChecked(false) }}>
                                                    <View style={[styles.radioButton, checked && styles.radioBtnChecked]}>
                                                        {
                                                            (!checked) ? <View style={styles.radioBtnView}></View> : null
                                                        }
                                                    </View>
                                                    <Text style={[styles.promoValue]}>In Active </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.popupInputBlk, styles.wdth33, styles.paddRL15]}>
                                        <TouchableOpacity onPress={() => { setIsCheckAll(!isCheckAll); handleSelectAll() }} style={[styles.flexAlignRow, styles.marBtm5]}>
                                            <View style={[styles.checkbox]}>
                                                {outletData.length === outletChecked.length && (
                                                    <View style={styles.checkTick}></View>
                                                )}
                                            </View>
                                            <Text style={[styles.signLabel, styles.textDefault]}>Select All Outlets<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                        </TouchableOpacity>
                                        <FlatList
                                            data={outletData}
                                            numColumns={2}
                                            renderItem={({ item }) => (
                                                <View style={[styles.flexAlignRow, styles.padRgt15, styles.flexWrap, styles.wdth50, styles.marBtm8]}>
                                                    <TouchableOpacity style={styles.flexAlignRow} onPress={() => {
                                                        const newIds = [...outletChecked];

                                                        const index = newIds.indexOf(item.outletId);
                                                        if (index > -1) {
                                                            newIds.splice(index, 1);
                                                        } else {
                                                            newIds.push(item.outletId)
                                                        }

                                                        if (outletData.length === newIds.length) {
                                                            setIsCheckAll(true)
                                                            setOutletserror(false)
                                                        } else {
                                                            setIsCheckAll(false)
                                                            setOutletserror(true)
                                                        }
                                                        if (newIds.length === 0) {
                                                            setOutletserror(true)
                                                        }
                                                        else {
                                                            setOutletserror(false)
                                                        }
                                                        setOutletChecked(newIds)
                                                        setItemOutlet(newIds)
                                                    }}>

                                                        {/* <View style={[styles.checkbox, outletChecked.includes(item.outletId) && styles.radioBtnChecked]}>
                                                    {outletChecked.includes(item.outletId) && (
                                                        <View style={styles.checkTick}></View>
                                                    )}
                                                </View>
                                                <Text style={[styles.promoValue, styles.width70]}>{item.outletName}</Text> */}
                                                        <View style={[styles.checkbox, outletChecked.includes(item.outletId) && styles.radioBtnChecked]}>
                                                            {outletChecked.includes(item.outletId) ? <View style={styles.checkTick}></View> : null}
                                                        </View>
                                                        <Text style={[styles.promoValue, styles.width70]}>{item.outletName}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                            keyExtractor={item => item.outletId}
                                        />
                                        {(outletserror === true) &&
                                            <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Select Outlet is required</Text>
                                        }
                                    </View>


                                    <View style={[styles.popupInputBlk, styles.wdth33, styles.paddRL15]}>

                                        <TouchableOpacity onPress={() => pickImage()}>
                                            <Text style={[style.signLabel, style.font12, style.textDefault]}>Upload Image</Text>
                                            <View style={style.dragdropCon}>
                                                <Image
                                                    style={[styles.dragFile, styles.resizecontain]}
                                                    source={(require('../../assets/images/file-plus.png'))}
                                                />
                                                <View style={[style.dragView]}>
                                                    <Text style={[style.font11, style.dragDorpText]}>Drag and Drop or</Text>
                                                    <Text style={[style.font11, style.textPri]} onPress={() => {
                                                        openGallery()
                                                    }}> browse</Text>
                                                    <Text style={[style.font11, style.dragDorpText]}> your files</Text>
                                                    <Image source={ImageUigallery} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    {image != null ?
                                        <View style={[style.popupInputBlk, style.wdth33, style.paddRL12]}>
                                            <Text style={[style.signLabel, style.font12, style.textDefault]}></Text>
                                            <View style={[styles.wdth100, styles.flexrow, styles.flexWrap, styles.uploDocBlk, styles.alignCenter, styles.justifyBetween]}>
                                                <View style={[styles.wdth80, styles.flexrow, styles.alignCenter]}>
                                                    <Image
                                                        style={styles.milImage} source={{ uri: `${image}` }}
                                                    />
                                                    <View style={[styles.padL10]}>
                                                        <Text style={[styles.font14, styles.profileText, styles.marBtm2]}>{imageExtension}</Text>
                                                        {/* <Text style={[styles.font12, styles.profileText]}>{fileSize}</Text> */}
                                                    </View>
                                                </View>
                                                <View style={[styles.wdth20]}>
                                                    <Pressable style={styles.closeView} onPress={() => removeImage()}>
                                                        <Image
                                                            style={[styles.DocDelete, styles.flexrow, styles.justifyEnd]}
                                                            source={(require('../../assets/images/docu_del_icon.png'))} />
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View>
                                        : null
                                    }

                                </View>


                                <View style={[styles.martop32, styles.paddRL15]}>
                                    <View style={[styles.receipeCon]}>
                                        <Text style={[styles.font16, styles.textBlack, styles.receipeText]}>Recipe</Text>
                                        <View style={[styles.flexrow, styles.justifyEnd, styles.marBtm26]}>
                                            <TouchableOpacity onPress={() => openAddItemsRecipe()} style={styles.UpdateBtn}>
                                                <Text style={styles.textWhite} onPress={() => openAddItemsRecipe()}>Add</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <DataTable>
                                            {
                                                recipeListData && recipeListData.length > 0 ?

                                                    <DataTable.Header style={styles.headerBorder}>
                                                        <DataTable.Title style={styles.flexSl}><Text style={styles.tableHeader}>Sl .No</Text> </DataTable.Title>
                                                        <DataTable.Title style={styles.flexcat}><Text style={styles.tableHeader}>Product Name</Text></DataTable.Title>
                                                        <DataTable.Title><Text style={styles.tableHeader}>Supplier Name</Text> </DataTable.Title>
                                                        <DataTable.Title style={styles.flexitemAmt}><Text style={styles.tableHeader}>Price</Text> </DataTable.Title>
                                                        <DataTable.Title style={styles.flexSta}><Text style={styles.tableHeader}>Unit</Text></DataTable.Title>
                                                        <DataTable.Title style={styles.flexSta}><Text style={[styles.tableHeader, styles.textCenter]}>Quantity</Text></DataTable.Title>
                                                        <DataTable.Title style={styles.flexSl}><Text style={styles.tableHeader}></Text>
                                                        </DataTable.Title>
                                                    </DataTable.Header>
                                                    :
                                                    <View style={[styles.itemtableRow]}>
                                                        <Text style={[styles.tableCell, styles.textCenter, styles.padd20]}>
                                                            No Recipe is there
                                                        </Text>
                                                    </View>

                                            }

                                            {
                                                recipeListData && recipeListData?.length > 0 &&
                                                recipeListData?.map((item, index) => (
                                                    <View style={[styles.itemtableRow]} key={index}>
                                                        <DataTable.Row style={styles.datatableextraline}>
                                                            <DataTable.Cell style={styles.flexSl}>
                                                                <Text style={[styles.tableHeader1, styles.tableCount]}>
                                                                    {index + 1}
                                                                </Text>
                                                            </DataTable.Cell>
                                                            <DataTable.Cell style={styles.flexcat}>
                                                                <Text style={styles.tableHeader1}>{item.productName}</Text>
                                                            </DataTable.Cell>
                                                            <DataTable.Cell style={styles.tableHeader}>
                                                                <Text style={styles.tableHeader1}>{item.supplierName}</Text>
                                                            </DataTable.Cell>
                                                            <DataTable.Cell style={styles.flexitemAmt}>
                                                                <Text style={styles.tableHeader1}>{item.price}</Text>
                                                            </DataTable.Cell>
                                                            <DataTable.Cell style={styles.flexSta}>
                                                                <Text style={styles.tableHeader1}>{item.unit}</Text>
                                                            </DataTable.Cell>
                                                            <DataTable.Cell style={styles.flexSta}>
                                                                <Text style={[styles.tableHeader1, styles.textCenter]}>
                                                                    {item.quantity}
                                                                </Text>
                                                            </DataTable.Cell>
                                                            <DataTable.Cell style={styles.flexSl}>
                                                                <View>
                                                                    <Pressable
                                                                        onPress={() => removeClickRecipe(index)}
                                                                        style={styles.editBtn}
                                                                    >
                                                                        <Image
                                                                            style={styles.DeleteIcon}
                                                                            source={require('../../assets/images/trash_icon.png')}
                                                                        />
                                                                    </Pressable>
                                                                </View>
                                                            </DataTable.Cell>
                                                        </DataTable.Row>
                                                    </View>
                                                ))
                                                // ) : (
                                                //     <View style={[styles.itemtableRow]}>
                                                //         <Text style={[styles.tableCell, styles.textCenter, styles.padd20]}>
                                                //             No Recipe is there
                                                //         </Text>
                                                //     </View>
                                                // )
                                            }


                                        </DataTable>

                                    </View>
                                </View>

                            </View>
                        </View>
                    </KeyboardAwareScrollView>

                    <View style={[styles.footerBtn, styles.flexrow, styles.justifyCenter]}>
                        <TouchableOpacity>
                            <View>
                                <Text style={[styles.cancelBtn, styles.marRgt18]} onPress={() => navigation.navigate('Menu')}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.UpdateBtn} onPress={updateItems}>
                            <View>
                                <Text style={styles.textWhite} onPress={updateItems}>Continue</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </>
            }
            {openAddRecipe &&
                <Modal isVisible={openAddRecipe}>
                    {popupAddRecipe()}
                </Modal>
            }
            {openUpdateSuccessMsg &&
                <Modal isVisible={openUpdateSuccessMsg}>
                    {SuccessUpdatePopup()}
                </Modal>
            }
        </>
    );
}

