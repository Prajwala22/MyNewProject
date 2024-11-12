import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import * as yup from 'yup';
import { default as style, default as styles } from '../../assets/css/style';
// import Header from '../../components/SidemeuItemsScreenHeader';
import TextInput from '../../components/Texinput';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import Colors from '../constants/colors';
import Header from '../../components/sideMenuHeaderMaster';
import { Platform } from 'react-native';

const allowedCharacters = /^[a-zA-Z0-9\s]+$/; // Regex pattern to allow only letters, numbers, and spaces

export default function ItemsRecipe({ navigation, route }: { navigation: any, route: any }) {
    const [categoryData, setCategoryData] = useState([]);
    const [catKey, setCatKey] = useState(0);
    const [taxKey, setTaxKey] = useState(0);
    const [itemName, setItemName] = useState({ value: '', error: '' })
    const [amount, setAmount] = useState({ value: '', error: '' })
    const [itemDescription, setDescription] = useState({ value: '', error: '' })
    const [taxData, setTaxData] = useState([])
    const [isDataPresent, setDataPreset] = useState(false);
    const [categoryFieldData, setCategoryFiledData] = useState('')
    const [taxFieldData, setTaxFiledData] = useState('')
    const [openItems, setOpenItems] = useState(false);
    const [outletData, setOutletData] = useState([]);
    const [outletChecked, setOutletChecked] = useState([]);

    const [itemOutlet, setItemOutlet] = useState([])
    const [checked, setChecked] = React.useState(true);
    const [ImageUigallery, setimageUriGallary] = useState('')
    const [image, setImage] = useState(null);
    const [imagebase64, setImagebase64] = useState(null);
    const [fileSize, setFileSize] = useState(null)
    const [imageExtension, setImageExtension] = useState(null);
    const [recipeData, setRecipeData] = useState([]);
    const isFocused = useIsFocused();
    const [productValue, setProductValue] = useState('')
    const [supplierValue, setSupplierValue] = useState([])
    const [itemKey, setItemKey] = useState(0)
    const [recipeListData, setRecipeListData] = useState([])
    const [openAddRecipe, setOpenAddRecipe] = useState(false)
    const [addRecipe, setAddRecipe] = useState(false);


    const [addRecipesubmit, setAddRecipesubmit] = useState(false);
    const [addCatsubmit, setAddCatsubmit] = useState(false);
    const [addTaxsubmit, setAddTaxsubmit] = useState(false);
    const [supplierVal, setSupplierVal] = useState(0)
    const [supplierSubmit, setSupplierSubmit] = useState(false)
    const [fileSizeError, setFileSizeError] = useState(false)
    const [taxFieldDataError, setTaxFieldDataError] = useState(false)
    const [isrefreshingresult, setIsrefreshingresult] = useState(false)
    const [openSuccessMsg, setopenSuccessMsg] = useState(false);
    const [checkedAllOutlet, setCheckedAllOutlet] = useState(false)
    const [itemDataLength, setItemDataLength] = useState(0)
    const [checkedOutlet, setCheckedOutlet] = useState({
        nr1: false,
        nr2: false
    });
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);
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
    const [outletserror, setOutletserror] = useState(false)

    useEffect(() => {
        setChecked(true);
        getOutletList();
        getOutletListbyID();
        return () => {
            setOutletData([]);
        }
    }, [isFocused]);


    //Get Outlet by Restaurant
    const getOutletList = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        const restaurantId: any = await AsyncStorage.getItem('restaurantId')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId
        var myJson = {
            IsAllItem: true,
            OutletId: outletId,
        }
        const itemResult = await api.CreateMasterData(endPoint.GET_ITEMS, token, myJson);
        setItemDataLength(itemResult?.data?.length)
    }
    const getOutletListbyID = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        const restaurantId: any = await AsyncStorage.getItem('restaurantId')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        const result = await api.getAllMasterData(token, endPoint.GET_OUTLETS_BY_RESTAURANT + restaurantId);
        if (result.success === true) {
            setOutletData(result.data.outlets)
            setList(result.data.outlets)
        }
    }

    // useEffect(() => {
    //     handleSelectAll()
    // }, [isCheckAll]);
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

    const handledeSelectAll = () => {
        setIsCheck([])
    };
    // Get Category List
    useEffect(() => {
        getCategory();
        return () => {
            setCategoryData([]);
        }
    }, [isFocused]);
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
    }, [isFocused]); const getTaxList = async () => {
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
    const itemNameValidator = (itemName: string) => {
        if (!itemName) return "Item Name is required."
        return ''
    }
    const itemAmountValidator = (itemName: string) => {
        if (!itemName) return "Amount is required."
        return ''
    }
    const itemDescriptiontValidator = (itemName: string) => {
        if (!itemName) return "Description is required."
        return ''
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
    //Create Item
    const handleSubmititem = async (data) => {
        const SelectItemNameError = itemNameValidator(itemName.value)
        const SelectAmountError = itemAmountValidator(amount.value)
        if (itemName || amount || itemDescription) {
            setItemName({ ...itemName, error: SelectItemNameError })
            setAmount({ ...amount, error: SelectAmountError })
            // setDescription({ ...itemDescription, error: SelectDescriptionError })

        }
        setAddCatsubmit(true)
        if (catKey != 0) {
            setAddCatsubmit(false)
        }
        setOutletserror(true)
        if (outletChecked.length != 0) {
            setOutletserror(false)
        }
        if (categoryFieldData?.length > 0 && itemName?.value?.length > 0 && amount?.value?.length > 0 && outletserror === false) {
            setIsrefreshingresult(true)
            const jsonValue: any = await AsyncStorage.getItem('userInfo')
            let loginData = JSON.parse(jsonValue);
            let token = loginData.token;
            let outletId = loginData.outletId;
            let itemObj = {
                itemName: itemName.value,
                description: itemDescription.value,
                itemCategoryId: categoryFieldData,
                isActive: checked,
                itemSubCategoryId: "string",
                itemAmount: amount.value,
                bomDetails: [
                ],
                isReadyMade: true,
                modifiers: [
                    "string"
                ],
                discount: [
                ],
                imageName: "",
                imagePath: imagebase64,
                imageExtension: imageExtension,
                recipe: recipeListData,
                taxId: taxFieldData,
                isBatchRecipe: false
            }
            var myJson = {
                item: itemObj,
                outlets: outletChecked

            }
            const result = await api.CreateMasterData(endPoint.CREATE_ITEMS, token, myJson);

            if (itemDataLength >= 1) {
                setopenSuccessMsg(true)
                setCatKey(0);
                setItemName({ value: '', error: '' });
                setAmount({ value: '', error: '' });
                setTaxKey(0);
                setDescription({ value: '', error: '' });
                setOutletChecked([]);
                setIsCheck([]);
                setIsCheckAll(false)
                removeImage();
                setRecipeData([]);
                setImagebase64(null)
                setTaxFiledData("")
                setOutletserror(false)
                setIsrefreshingresult(false)
                setCategoryFiledData('')
            }
            else {
                setOpenItems(false);
                navigation.navigate('MapAddingData')
                setOutletserror(false)
                setIsrefreshingresult(false)
                setCategoryFiledData('')
            }
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
                    <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Item Created Successfully</Text>
                    <TouchableOpacity style={styles.continueBtn} onPress={() => [successOpen(), navigation.navigate('Menu')]}>
                        <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
            // success popup - Ends
        );
    }

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

    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true, // Allows crop or resizing
          aspect: [4, 3], // Aspect ratio for the image
          quality: 1, // Quality of the image (0.0 to 1.0)
          base64: true, // Make sure base64 is included in the result
        });
    
        if (!result.canceled) {
          // Calculate the file size from the base64 string
          const fileSize = result?.assets[0]?.base64.length * (3 / 4) - 2;
    
          // Check if the file size exceeds 1MB
          if (fileSize > 1000000) {
            Alert.alert(
              'Info',
              'Please select an image less than 1MB.',
              [{ text: 'OK', onPress: () => {} }]
            );
          } else {
            alert("2")
            // Set the selected image URI
            setImage(result.uri);
    
            // Set the base64 string with the data URI format
            setImageBase64('data:image/jpg;base64,' + result?.assets[0]?.base64);
    
            // Get the file extension from the URI (after the last dot)
            let fileExtension = result?.assets[0]?.uri.slice(result?.assets[0]?.uri.lastIndexOf('.') + 1);
            setImageExtension(fileExtension);
    
            // Update the file size state
            setFileSize(fileSize);
    
            // Check if the file size exceeds 6MB
            if (fileSize > 6000000) {
              setFileSizeError(true);
            } else {
              setFileSizeError(false);
            }
          }
        } else {
          // User canceled the picker
          Alert.alert("No image selected");
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
        setItemKey(0)
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
        setAddRecipesubmit(false)
        setSupplierSubmit(false)
        setSupplierVal(0)
        setOpenAddRecipe(!openAddRecipe)
    };
    const openAddItemsRecipe = () => {
        setOpenAddRecipe(!openAddRecipe)
        setAddRecipesubmit(false)
        setSupplierSubmit(false)
        setSupplierVal(0)

    }
    const removeImage = () => {
        setImage(null)
    }

    //Add Recipe Popup
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
                                            <Text style={[styles.signLabel, styles.textDefault]}>Select Supplier <Text style={[styles.font12, styles.textPri]}>*</Text></Text>
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
                                                        if (option?.key) {
                                                            setFieldValue('supplierRecipe', option?.value);
                                                            Supplierdata(option?.value);
                                                            handleInputChangeRecipe(option?.value?.supplierName, 'supplierName')
                                                            handleInputChangeRecipe(option?.value?.supplierID, 'supplierID')
                                                            handleInputChangeRecipe(option?.value?.unit, 'unit')
                                                            handleInputChangeRecipe(option?.value?.price, 'price')
                                                            handleInputChangeRecipe(option?.key, 'key2')
                                                            setSupplierVal(option?.key)
                                                        }


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
                                            <Text style={[styles.signLabel, styles.textDefault]}>Amount </Text>
                                            <TextInput editable={false} selectTextOnFocus={false} style={styles.signInput} placeholder='Amount' value={supplierValue[0]?.price}>
                                                {recipeValues.price}
                                            </TextInput>
                                        </View>
                                        <View style={[styles.popupInputBlk, styles.wdth25, styles.paddRL15]}>
                                            <Text style={[styles.signLabel, styles.textDefault]}>Unit</Text>
                                            <TextInput editable={false} selectTextOnFocus={false} style={styles.signInput} placeholder='Unit'>
                                                {recipeValues.unit}
                                            </TextInput>

                                        </View>
                                        <View style={[styles.popupInputBlk, styles.wdth25, styles.paddRL15]}>
                                            <Text style={[styles.signLabel, styles.textDefault]}>Quantity</Text>
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

    const handleClick = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };
    //Reset Form
    const resetForm = () => {
        setCatKey(0);
        setItemName({ value: '', error: '' });
        setAmount({ value: '', error: '' });
        setTaxKey(0);
        setDescription({ value: '', error: '' });
        setOutletChecked([]);
        setIsCheck([]);
        setIsCheckAll(false)
        removeImage();
        setAddCatsubmit(false)
        setOutletserror(false)
        setAddTaxsubmit(false)
        setRecipeData([]);
        navigation.navigate('MenuCategory')
    }
    //------------------------------------ User Interface ------------------------------------------------------------------- 
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
                                    <Text style={styles.textStyle1}>Add Item</Text>
                                    <Text style={[styles.font11, styles.textDefault]}>Menu - Add Items</Text>
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
                                                initValue="Select Category"
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
                                    <View style={[styles.popupInputBlk, styles.width33, styles.paddRL15]}>
                                        <Text style={[styles.signLabel, styles.textDefault]}>Item Name<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                        <TextInput
                                            style={styles.AddsignInput}
                                            onChangeText={(text: any) => setItemName({ value: text })}
                                            value={itemName.value}
                                            errorText={itemName.error}
                                            error={!!itemName.error}
                                            errorText={itemName.error}

                                        />
                                    </View>
                                    <View style={[styles.popupInputBlk, styles.width33, styles.paddRL15]}>
                                        <Text style={[styles.signLabel, styles.textDefault]}>Amount<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                        {/* <TextInput
                                    style={styles.AddsignInput}
                                    value={amount.value}
                                    onChangeText={(text: any) => setAmount({ value: text })}
                                    keyboardType="numeric"
                                    errorText={amount.error}
                                    error={!!amount.error}
                                    errorText={amount.error}
                                /> */}
                                        <TextInput
                                            style={styles.AddsignInput}
                                            value={amount.value}
                                            onChangeText={(text: string) => {
                                                // if (allowedCharacters.test(text) || text === '') {
                                                //     setAmount({ value: text, error: '' });
                                                // }
                                                setAmount({ value: text, error: '' });
                                            }}
                                            keyboardType="numeric"
                                            errorText={amount.error}
                                            error={!!amount.error}
                                        />
                                    </View>
                                    <View style={[styles.popupInputBlk, styles.width33, styles.paddRL15]}>
                                        <Text style={[styles.signLabel, styles.textDefault]}>Select Tax<Text style={[styles.font12, styles.textPri]}></Text></Text>
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
                                                initValue="Select Tax"
                                                selectedKey={taxKey}
                                                onChange={(option) => {
                                                    if (option.key) {
                                                        setTaxFiledData(option.value)
                                                        setTaxKey(option.key)
                                                    }
                                                }}
                                            />
                                        </View>
                                        {/* {(taxKey === 0 && addTaxsubmit === true) &&
                                    <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Select Tax is required</Text>
                                } */}
                                    </View>
                                    <View style={[styles.popupInputBlk, styles.width33, styles.paddRL15]}>
                                        <Text style={[styles.signLabel, styles.textDefault]}>Description</Text>
                                        <TextInput
                                            style={styles.AddsignInput}
                                            onChangeText={(text: any) => setDescription({ value: text })}
                                            value={itemDescription.value}
                                        />
                                    </View>
                                    <View style={[styles.popupInputBlk, styles.wdth33, styles.paddRL15]}>
                                        <Text style={[styles.signLabel, styles.textDefault]}>Item Status</Text>
                                        <View style={styles.flexAlignRow}>
                                            <View style={[styles.flexAlignRow, styles.paddR15]}>
                                                <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setChecked(true) }}>
                                                    <View style={[styles.radioButton, checked === true && styles.radioBtnChecked]}>
                                                        {
                                                            (checked === true) ? <View style={styles.radioBtnView}></View> : null
                                                        }
                                                    </View>
                                                    <Text style={[styles.promoValue]}>Active</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={[styles.flexAlignRow, styles.paddR15]}>
                                                <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setChecked(false) }}>
                                                    <View style={[styles.radioButton, checked === false && styles.radioBtnChecked]}>
                                                        {
                                                            (checked === false) ? <View style={styles.radioBtnView}></View> : null
                                                        }
                                                    </View>
                                                    <Text style={[styles.promoValue]}>In Active</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    {/* {isCheck.length === 0 ?
                                <View style={[styles.popupInputBlk, styles.wdth33, styles.paddRL15]}>
                                    <TouchableOpacity onPress={() => handleSelectAll()} style={[styles.flexAlignRow, styles.marBtm5]}>
                                        <View style={[styles.checkbox]}>
                                        </View>
                                        <Text style={[styles.signLabel, styles.textDefault]}>Select All Outlets</Text>
                                    </TouchableOpacity>
                                    <FlatList
                                        data={outletData}
                                        numColumns={2}
                                        renderItem={({ item }) =>
                                            <View style={[styles.flexAlignRow, styles.padRgt15, styles.flexWrap, styles.wdth50, styles.marBtm8]}>

                                                <TouchableOpacity style={styles.flexAlignRow} onPress={() => {

                                                    const newIds = [...outletChecked];
                                                    const index = newIds.indexOf(item.outletId);
                                                    if (index > -1) {
                                                        newIds.splice(index, 1);
                                                    } else {
                                                        newIds.push(item.outletId)
                                                    }
                                                    setOutletChecked(newIds)
                                                    setItemOutlet(newIds)

                                                }

                                                }>
                                                    <View style={[styles.checkbox, outletChecked.includes(item.outletId) && styles.radioBtnChecked]}>
                                                        {
                                                            (outletChecked.includes(item.outletId)) ? <View style={styles.checkTick}></View> : null
                                                        }
                                                    </View>
                                                    <Text style={[styles.promoValue, styles.width70]}>{item.outletName}</Text>

                                                </TouchableOpacity>


                                            </View>}
                                        keyExtractor={item => item.outletId} />
                                </View> :

                                <View style={[styles.popupInputBlk, styles.wdth33, styles.paddRL15]}>
                                    <TouchableOpacity style={[styles.flexAlignRow, styles.marBtm5]} onPress={() => handledeSelectAll()}>
                                        <View style={[styles.checkbox, styles.radioBtnChecked]}>
                                            <View style={styles.checkTick}></View>
                                        </View>
                                        <Text style={[styles.signLabel, styles.textDefault]}>Select All Outlets</Text>
                                    </TouchableOpacity>
                                    <FlatList
                                        data={outletData}
                                        numColumns={2}
                                        renderItem={({ item }) =>
                                            <View style={[styles.flexAlignRow, styles.padRgt15, styles.flexWrap, styles.wdth50, styles.marBtm8]}>

                                                <TouchableOpacity style={styles.flexAlignRow} onPress={() => {

                                                    const newIds = [...outletChecked];
                                                    const index = newIds.indexOf(item.outletId);
                                                    if (index > -1) {
                                                        newIds.splice(index, 1);
                                                    } else {
                                                        newIds.push(item.outletId)
                                                    }
                                                    setOutletChecked(newIds)
                                                    setItemOutlet(newIds)

                                                }

                                                }>
                                                    <View style={[styles.checkbox, outletChecked.includes(item.outletId) && styles.radioBtnChecked]}>
                                                        {
                                                            (isCheck.includes(item.outletId)) ? <View style={styles.checkTick}></View> : null
                                                        }
                                                    </View>
                                                    <Text style={[styles.promoValue, styles.width70]}>{item.outletName}</Text>

                                                </TouchableOpacity>


                                            </View>}
                                        keyExtractor={item => item.outletId} />

                                </View>
                            } */}
                                    <View style={[styles.popupInputBlk, styles.wdth33, styles.paddRL15]}>
                                        <TouchableOpacity onPress={() => {
                                            setIsCheckAll(!isCheckAll); handleSelectAll()
                                        }} style={[styles.flexAlignRow, styles.marBtm5]}>
                                            <View style={[styles.checkbox, isCheckAll && styles.radioBtnChecked]}>
                                                {
                                                    isCheckAll ? <View style={styles.checkTick}></View> : null
                                                }
                                            </View>
                                            <Text style={[styles.signLabel, styles.textDefault]}>Select All Outlets<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                        </TouchableOpacity>
                                        <FlatList
                                            data={outletData}
                                            numColumns={2}
                                            renderItem={({ item }) =>
                                                <View style={[styles.flexAlignRow, styles.padRgt15, styles.flexWrap, styles.wdth50, styles.marBtm8]}>

                                                    {/* <TouchableOpacity style={styles.flexAlignRow} onPress={() => {

                                                const newIds = [...outletChecked];
                                                const index = newIds.indexOf(item.outletId);
                                                if (index > -1) {
                                                    newIds.splice(index, 1);
                                                } else {
                                                    newIds.push(item.outletId)
                                                }
                                                if (outletData.length === newIds.length) {
                                                    setIsCheckAll(true)
                                                }else{
                                                    setIsCheckAll(false)
                                                }
                                                
                                                setOutletChecked(newIds)
                                                setItemOutlet(newIds)

                                            }

                                            }>
                                                <View style={[styles.checkbox, outletChecked.includes(item.outletId) && styles.radioBtnChecked]}>
                                                    {
                                                        (outletChecked.includes(item.outletId)) ? <View style={styles.checkTick}></View> : null
                                                    }
                                                </View>
                                                <Text style={[styles.promoValue, styles.width70]}>{item.outletName}</Text>

                                            </TouchableOpacity> */}
                                                    <TouchableOpacity
                                                        style={styles.flexAlignRow}
                                                        onPress={() => {
                                                            const newIds = [...outletChecked];
                                                            const index = newIds.indexOf(item.outletId);

                                                            if (index > -1) {
                                                                newIds.splice(index, 1);
                                                            } else {
                                                                newIds.push(item.outletId);
                                                            }

                                                            // Update the state with the selected outlet IDs
                                                            setOutletChecked(newIds);


                                                            if (outletData.length === newIds.length) {
                                                                setIsCheckAll(true);
                                                                setOutletserror(false)

                                                            } else {
                                                                setIsCheckAll(false);
                                                                setOutletserror(true)
                                                            }
                                                            if (newIds.length === 0) {
                                                                setOutletserror(true)
                                                            }
                                                            else {
                                                                setOutletserror(false)
                                                            }
                                                        }}
                                                    >
                                                        <View style={[styles.checkbox, outletChecked.includes(item.outletId) && styles.radioBtnChecked]}>
                                                            {outletChecked.includes(item.outletId) ? <View style={styles.checkTick}></View> : null}
                                                        </View>
                                                        <Text style={[styles.promoValue, styles.width70]}>{item.outletName}</Text>
                                                    </TouchableOpacity>


                                                </View>}
                                            keyExtractor={item => item.outletId} />
                                        {(outletserror === true) &&
                                            <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Select Outlet is required</Text>
                                        }
                                    </View>

                                    <View style={[styles.popupInputBlk, styles.wdth33, styles.paddRL15]}>

                                        <TouchableOpacity onPress={() => pickImage()}>
                                            <Text style={[style.signLabel, style.font12, style.textDefault]}>Upload Image</Text>
                                            {/* <View>
                                        {image != null ?
                                            <Image style={styles.milImage} source={{ uri: `${image}` }} />
                                            : null
                                        }
                                    </View> */}
                                            <View style={style.dragdropCon}>
                                                <Image
                                                    style={[styles.dragFile, styles.resizecontain]}
                                                    source={(require('../../assets/images/file-plus.png'))}
                                                />
                                                <View style={[style.dragView]}>
                                                    <Text style={[style.font11, style.dragDorpText]}>Drag and Drop or</Text>
                                                    <Text style={[style.font11, style.textPri]}
                                                    //  onPress={() => {
                                                    //     // DocumentPicker.pickMultiple()
                                                    //     openGallery()
                                                    // }}


                                                    > browse</Text>
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
                                                addRecipe && recipeListData.length !== 0 ?

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
                                                    <View style={[styles.itemtableRow]} >
                                                        <Text style={[styles.tableCell, styles.textCenter, styles.padd20]}>No Receipe is there</Text>
                                                    </View>

                                            }

                                            {
                                                addRecipe && recipeListData.length !== 0 &&
                                                recipeListData.map((item, index) => (
                                                    <View style={[styles.itemtableRow]} >
                                                        <DataTable.Row style={styles.datatableextraline}>
                                                            <DataTable.Cell style={styles.flexSl}><Text style={[styles.tableHeader1, styles.tableCount]}>{index + 1}</Text></DataTable.Cell>
                                                            <DataTable.Cell style={styles.flexcat}><Text style={[styles.tableHeader1, styles.tableCount]}>{item.productName}</Text></DataTable.Cell>
                                                            <DataTable.Cell style={styles.tableHeader}><Text style={styles.tableHeader1}>{item.supplierName}</Text></DataTable.Cell>
                                                            <DataTable.Cell style={styles.flexitemAmt}><Text style={styles.tableHeader1}>{item.price}</Text></DataTable.Cell>
                                                            <DataTable.Cell style={styles.flexSta}><Text style={styles.tableHeader1}>{item.unit}</Text></DataTable.Cell>
                                                            <DataTable.Cell style={styles.flexSta}><Text style={[styles.tableHeader1, styles.textCenter]}>{item.quantity}</Text></DataTable.Cell>
                                                            <DataTable.Cell style={styles.flexSl} >
                                                                <View>
                                                                    <Pressable onPress={() => removeClickRecipe(index)} style={styles.editBtn}>
                                                                        <Image
                                                                            style={styles.DeleteIcon}
                                                                            source={(require('../../assets/images/trash_icon.png'))}
                                                                        />
                                                                    </Pressable>
                                                                </View>
                                                            </DataTable.Cell>
                                                        </DataTable.Row>
                                                    </View>
                                                ))
                                                // : <View style={[styles.itemtableRow]} >
                                                //     <Text style={[styles.tableCell, styles.textCenter, styles.padd20]}>No Receipe is there</Text>
                                                // </View>
                                            }

                                        </DataTable>

                                    </View>
                                </View>

                            </View>
                        </View>

                    </KeyboardAwareScrollView>

                    <View style={[styles.footerBtn, styles.flexrow, styles.justifyCenter]}>
                        <TouchableOpacity onPress={() => resetForm()}>
                            <View>
                                <Text style={[styles.cancelBtn, styles.marRgt18]}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.UpdateBtn} onPress={handleSubmititem}>
                            <View>
                                <Text style={styles.textWhite} onPress={handleSubmititem}>Continue</Text>
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
            {openSuccessMsg &&
                <Modal isVisible={openSuccessMsg}>
                    {SuccessPopup()}
                </Modal>
            }
        </>
    );
}