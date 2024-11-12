import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Field, Formik, useFormik } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import { Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import Toast from 'react-native-root-toast';
import * as yup from 'yup';
import { default as style, default as styles } from '../../assets/css/style';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Header from '../../components/sideMenuHeaderMaster'
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import Colors from '../constants/colors';
import DeleteIcon from '../../assets/images/modi_delete_icon.js'
import { Platform } from 'react-native';

export default function Modifiers({ navigation, route }) {
    const [page, setPage] = useState(0);
    const optionsPerPage = [2, 3, 4];
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [openModifierGroup, setOpenModifierGroup] = useState(false);
    const [values, setValues] = useState([{
        itemFrom: null,
        itemId: "",
        price: null,
        itemName: null,
        key1: 0,
        key2: 0

    }]);
    const [initialValues, setInitialValues] = useState([{
        modifierGroupName: '',
        modifierGroupDescription: '',
    }]);
    const isFocused = useIsFocused();

    const [itemsDataList, setData] = useState([]);

    const [ingredientsDataList, setIngredintsDataList] = useState([]);
    const [openSuccessModifierMsg, setopenSuccessModifierMsg] = useState(false);

    const [itemerrormsg, setitemerrormsg] = useState(false);
    const [ingredienterrormsg, setingredienterrormsg] = useState(false);
    const [priceerrormsg, setpriceerrormsg] = useState(false);
    const [modifierNameermsg, setModifierNameerrmsg] = useState(false);
    const [descriptionerrmsg, setDescriptionerrmsg] = useState(false)
    const [modifierName, setModifierName] = useState("")
    const [description, setDescription] = useState("")




    useEffect(() => {
        setPage(0)
    }, [isFocused]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        });
        return unsubscribe;
    }, [navigation]);

    const toggleModal = () => {
        setValues([
            {
                itemFrom: "",
                itemId: "",
                price: "",
                itemName: "",
                key1: 0,
                key2: 0
            }
        ]);
        setOpenModifierGroup(!openModifierGroup)
    };

    //validation for Add Modifer
    const addModifierGroupValidationSchema = yup.object().shape({
        modifierGroupName: yup
            .string()
            .required('Modifier Name is required'),
        modifierGroupDescription: yup
            .string()
            .required('Modifier Description is required'),

        modifierGroupItemFrom: yup
            .string(),
        modifierPrice: yup
            .string()
    })
    // ----------------------Create Modifier Group ----------------------------------------------------------------
    // const handleSubmit = async (data) => {
    //     if (values[0].itemFrom != '' && values[0].itemName != '' && values[0].price != '' && modifierName != '' && description != '') {
    //         const jsonValue = await AsyncStorage.getItem('userInfo')
    //         let loginData = JSON.parse(jsonValue);
    //         let token = loginData.token;
    //         let outletId = loginData.outletId;
    //         const filteredData = values.filter(
    //             (item) => item.itemFrom !== "" && item.itemName !== ""
    //         );
    //         var myJson = {
    //             groupName: modifierName,
    //             description: description,
    //             modifierItems: filteredData,
    //             outletId: outletId
    //         }
    //         const result = await api.CreateMasterData(endPoint.CREATE_MODIFIER, token, myJson);
    //         if (result.success) {
    //             successModifierOpen()
    //             resetForm();
    //             setValues([
    //                 {
    //                     itemFrom: null,
    //                     itemId: "",
    //                     price: null,
    //                     itemName: null,
    //                     key1: 0,
    //                     key2: 0
    //                 }
    //             ]);
    //         }
    //     }
    // }
    const handleSubmit = async (data) => {
        // const isValid = values.every(
        //   (item) => item.itemFrom !== null &&
        //     item.itemName !== null &&
        //     item.price !== null
        // );
        const isValid = values.every(
            (item) => item.itemFrom !== null &&
                item.itemName !== null &&
                item.price !== null &&
                item.itemFrom !== "" &&
                item.itemName !== "" &&
                item.price !== ""
        );
        console.log(isValid, "isValid")
        if (isValid && modifierName !== '' && description !== '') {
            const jsonValue = await AsyncStorage.getItem('userInfo');
            const loginData = JSON.parse(jsonValue);
            const token = loginData.token;
            const outletId = loginData.outletId;
            const filteredData = values.filter(
                (item) => item.itemFrom !== "" && item.itemName !== ""
            );
            const myJson = {
                groupName: modifierName,
                description: description,
                modifierItems: filteredData,
                outletId: outletId,
            };
            console.log(myJson, "myJson")
              const result = await api.CreateMasterData(
                endPoint.CREATE_MODIFIER,
                token,
                myJson
              );

              if (result.success) {
                successModifierOpen();
                resetForm();
                setValues([
                  {
                    itemFrom: null,
                    itemId: "",
                    price: null,
                    itemName: null,
                    key1: 0,
                    key2: 0,
                  },
                ]);
              }
        }
    };

    // -----------------------Create Modifier Ends----------------------------------------------------------------
    // Create Success msg 
    const successModifierOpen = () => {
        setopenSuccessModifierMsg(!openSuccessModifierMsg)

    }

    const SuccessModifierPopup = () => {
        return (
            // success popup
            <View style={[styles.flexrow, styles.justifyCenter]}>
                <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
                    <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
                    <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Modifier Created Successfully</Text>
                    <TouchableOpacity style={styles.continueBtn} onPress={() => [successModifierOpen(), navigation.navigate('MenuCategory')]}>
                        <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
            // success popup - Ends
        );
    }
    //Select Item from Array
    const itemFromData = [
        { label: 'Item Master', value: 'Item Master' },
        { label: 'Ingredients', value: 'Ingredients' },
    ];

    /// Get the Item list
    useEffect(() => {
        setValues([
            {
                itemFrom: null,
                itemId: "",
                price: null,
                itemName: null,
                key1: 0,
                key2: 0
            }
        ]);
        getItemList();
        getIngredientsName();
        setitemerrormsg(false);
        setingredienterrormsg(false);
        setpriceerrormsg(false);
        setModifierNameerrmsg(false);
        setDescriptionerrmsg(false);
        return () => {
            setData([]);
        }
    }, [isFocused]);
    const getItemList = async () => {
        const jsonValue = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        // setUserData(loginData)
        var myJson = {
            IsAllItem: true,
            OutletId: outletId,
        }
        const result = await api.CreateMasterData(endPoint.GET_ITEMS, token, myJson);
        if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
            Toast.show("Some Error occured. Please try again.");
        } else {
            setData(result.data);
        }
    }
    //Get Ingredients List API Calling
    const getIngredientsName = async () => {
        const jsonValue = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        const result = await api.getAllMasterData(token, endPoint.GET_INGREDIENTS);
        if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
            Toast.show("Some Error occured. Please try again.");
        } else {
            setIngredintsDataList(result.data);
        }

    }

    // const handleInputChange = (e, name, index) => {

    //     const list = [...values];
    //     list[index][name] = e;
    //     setValues(list);
    // };
    const handleInputChange = (e, name, index) => {
        const list = [...values];
        list[index][name] = e;

        if (name === 'itemFrom') {
            if (e === 'Item Master' && modifierItemNameArray.length > 0) {
                list[index].itemName = modifierItemNameArray[0].label;
                list[index].key2 = modifierItemNameArray[0].key;
                list[index].itemId = modifierItemNameArray[0].value;
            } else if (e === 'Ingredients' && modifierIngredientsArray.length > 0) {
                list[index].itemName = modifierIngredientsArray[0].label;
                list[index].key2 = modifierIngredientsArray[0].key;
                list[index].itemId = modifierIngredientsArray[0].value;
            }
        }

        setValues(list);
    };
    const addClick = () => {
        setValues([
            ...values,
            {
                itemFrom: null,
                itemId: "",
                price: null,
                itemName: null,
                key1: 0,
                key2: 0,
            },
        ]);
    }
    const removeClick = (data) => {
        // let vals = [...values.val];
        let index = data;


        const list = [...values];
        list.splice(index, 1);
        setValues(list);
    }
    const modifierlistcheck = async () => {
        if (values[0].itemFrom === '') {
            setitemerrormsg(true)
        }
        if (values[0].itemName === '') {
            setingredienterrormsg(true)
        }

        if (values[0].price === '') {
            setpriceerrormsg(true)
        }
        if (modifierName === "") {
            setModifierNameerrmsg(true)
        }
        if (description === "") {
            setDescriptionerrmsg(true)
        }
        setTimeout(() => {
            handleSubmit();
        }, 500);
        // handleSubmit();
        const updatedValues = values.map((item) => ({
            itemFrom: item.itemFrom === null ? "" : item.itemFrom,
            itemId: item.itemId === null ? "" : item.itemId,
            price: item.price === null ? "" : item.price,
            itemName: item.itemName === null ? "" : item.itemName,
            key1: item.key1,
            key2: item.key2,
        }));

        setValues(updatedValues);

    }

    //Looping the Add Modidfier fileds
    function createInputs() {
        return values.map((el, i) => (
            <View style={[styles.marginBtm11, styles.wdth100]}>
                <View style={[styles.flexrow, styles.flexWrap]}>
                    <View style={[styles.popupInputBlk, styles.wdth31, styles.pr15, values.length < 1 && styles.width33]}>
                        <Text style={[styles.signLabel, styles.textDefault]}> Select Item From<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <View>
                            <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
                            <ModalSelector
                                data={modifierItemFromArray}
                                childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                                selectStyle={styles.selectText}
                                optionContainerStyle={styles.selectCont}
                                optionTextStyle={styles.textStyle}
                                initValueTextStyle={styles.textStyle}
                                overlayStyle={styles.overlayText}
                                cancelStyle={styles.selectCont}
                                cancelContainerStyle={styles.cancelCont}
                                cancelText={"Cancel"}
                                initValue={el ? el.itemFrom : "Select Item "}
                                selectedKey={el.key1}
                                onChange={(option) => {
                                    if (option.key) {
                                        handleInputChange(option.value, 'itemFrom', i);
                                        handleInputChange(option.key, 'key1', i);
                                        setitemerrormsg(false);
                                    }
                                }}
                            />
                            {el.itemFrom === "" && (
                                <Text style={[styles.errorText, { marginTop: 5 }]}>Item From is required</Text>
                            )}
                        </View>
                    </View>
                    {el.itemFrom === 'Item Master' ? (
                        <View style={[styles.popupInputBlk, styles.wdth31, styles.paddL15, values.length < 1 && styles.width33]}>
                            <Text style={[styles.signLabel, styles.textDefault]}> Select Item Name<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                            <View>
                                <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
                                <ModalSelector
                                    data={modifierItemNameArray}
                                    childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                                    selectStyle={styles.selectText}
                                    optionContainerStyle={styles.selectCont}
                                    optionTextStyle={styles.textStyle}
                                    initValueTextStyle={styles.textStyle}
                                    overlayStyle={styles.overlayText}
                                    cancelStyle={styles.selectCont}
                                    cancelContainerStyle={styles.cancelCont}
                                    cancelText={"Cancel"}
                                    initValue={el ? el.itemName : (modifierItemNameArray[0] ? modifierItemNameArray[0].label : "Select Item Names")}
                                    selectedKey={el.key2}
                                    onChange={(option) => {
                                        if (option.key) {
                                            handleInputChange(option.label, 'itemName', i);
                                            handleInputChange(option.key, 'key2', i);
                                            handleInputChange(option.value, 'itemId', i);
                                            setingredienterrormsg(false);
                                        }
                                    }}
                                />
                            </View>
                            {el.itemName === "" && (
                                <Text style={[styles.errorText, { marginTop: 5 }]}>Item Name is required</Text>
                            )}
                        </View>
                    ) : (
                        <View style={[styles.popupInputBlk, styles.wdth31, styles.paddL15, values.length < 1 && styles.width33]}>
                            <Text style={[styles.signLabel, styles.textDefault]}> Select Item Name<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                            <View>
                                <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
                                <ModalSelector
                                    data={modifierIngredientsArray}
                                    childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                                    selectStyle={styles.selectText}
                                    optionContainerStyle={styles.selectCont}
                                    optionTextStyle={styles.textStyle}
                                    initValueTextStyle={styles.textStyle}
                                    overlayStyle={styles.overlayText}
                                    cancelStyle={styles.selectCont}
                                    cancelContainerStyle={styles.cancelCont}
                                    cancelText={"Cancel"}
                                    initValue={el ? el.itemName : (modifierIngredientsArray[0] ? modifierIngredientsArray[0].label : "Select Item Names")}
                                    selectedKey={el.key2}
                                    onChange={(option) => {
                                        if (option.key) {
                                            handleInputChange(option.label, 'itemName', i);
                                            handleInputChange(option.key, 'key2', i);
                                            handleInputChange(option.value, 'itemId', i);
                                            setingredienterrormsg(false);
                                        }
                                    }}
                                />
                            </View>
                            {el.itemName === "" && (
                                <Text style={[styles.errorText, { marginTop: 5 }]}>Item Name is required</Text>
                            )}
                        </View>
                    )}
                    <View style={[styles.popupInputBlk, styles.wdth31, styles.paddRL15, values.length < 1 && styles.width33]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Price <Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <TextInput style={styles.signInput}
                            keyboardType='numeric'
                            defaultValue={JSON.stringify(el.price)}
                            value={el.price === null ? "" : el.price}
                            onChangeText={(text) => { handleInputChange(text, 'price', i); setpriceerrormsg(false) }}
                        />
                        {el.price === "" && (
                            <Text style={[styles.errorText, { marginTop: 5 }]}>Price is required</Text>
                        )}
                    </View>
                    {values.length > 1 &&
                        <View style={[styles.width7, styles.flexrow, styles.justifyEnd, styles.padt15]}>
                            <Pressable onPress={() => removeClick(i)}>
                                <DeleteIcon />
                            </Pressable>
                        </View>
                    }
                </View>
            </View>
        ));
    }


    //Filterd the Itemfrom data
    let modifierItemFromArray = itemFromData.map((s, i) => {
        let newData = {
            key: i + 1,
            label: s.label,
            value: s.value
        }
        return newData
    })

    //FIltered Items List
    let modifierItemNameArray = itemsDataList.map((s, i) => {

        let newData = {
            key: i + 1,
            label: s.itemName,
            value: s.id
        }
        return newData
    })
    //Filtered Ingredients List
    let modifierIngredientsArray = ingredientsDataList.map((s, i) => {

        let newData = {
            key: i + 1,
            label: s.childItemName,
            value: s.id
        }
        return newData
    })
    //Reset Form
    const resetForm = () => {
        setValues([
            {
                itemFrom: null,
                itemId: "",
                price: null,
                itemName: null,
                key1: 0,
                key2: 0
            }
        ]);
        setModifierName("");
        setDescription("");
        setModifierNameerrmsg(false);
        setDescriptionerrmsg(false);
        setitemerrormsg(false);
        setingredienterrormsg(false);
        setpriceerrormsg(false);
    }

    return (
        <>
            <Header heading={"ModifierGroup"} />
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.categoryBlkCon}>
                    <View style={[styles.textcontainer1, styles.padB6]}>
                        <View>
                            <Text style={styles.textStyle1}>Add Modifier</Text>
                            <Text style={[styles.font11, styles.textDefault]}>Menu - Add Modifier</Text>
                        </View>
                    </View>
                    <View style={[styles.whiteBg, styles.padH10, styles.padV25]}>
                        <View style={[styles.flexrow, styles.flexWrap]}>
                            <View >
                                <View style={[styles.popuprow]}>
                                    <View style={[styles.popupInputBlk, styles.width50, styles.paddRL15]}>
                                        <Text style={[styles.signLabel, styles.textDefault]}>Modifier Name <Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                        <TextInput style={styles.signInput}
                                            defaultValue={modifierName}
                                            value={modifierName}
                                            onChangeText={(text) => [setModifierName(text), setModifierNameerrmsg(false)]} />
                                        {modifierNameermsg && (
                                            <Text style={[styles.errorText, { marginTop: 5 }]}>Modifier Name is required</Text>
                                        )}
                                    </View>
                                    <View style={[styles.popupInputBlk, styles.width50, styles.paddRL15]}>
                                        <Text style={[styles.signLabel, styles.textDefault]}>Description <Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                        <TextInput style={styles.signInput}
                                            defaultValue={description}
                                            value={description}
                                            onChangeText={(text) => [setDescription(text), setDescriptionerrmsg(false)]} />
                                        {descriptionerrmsg && (
                                            <Text style={[styles.errorText, { marginTop: 5 }]}>Description is required</Text>
                                        )}
                                    </View>
                                </View>
                                <View style={[styles.martop32, styles.paddRL15]}>
                                    <View style={[styles.receipeCon]}>
                                        <Text style={[styles.font16, styles.textBlack, styles.receipeText, styles.modifierWidth]}>Modifier</Text>

                                        {
                                            createInputs()
                                        }
                                        <View style={[styles.flexrow, styles.justifyEnd]}>
                                            <TouchableOpacity onPress={addClick} style={[styles.UpdateBtn, styles.greenbtn]}>
                                                <Text style={styles.textWhite} onPress={addClick}>Add Modifier Item</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={[styles.martop15, styles.popupBtnCon, styles.justifyCenter]}>
                                    <TouchableOpacity>
                                        <View>
                                            <Text style={[styles.cancelBtn, styles.marRgt18]} onPress={() => [navigation.navigate('MenuCategory'), resetForm()]}>Cancel</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.UpdateBtn} onPress={() => { modifierlistcheck() }} >
                                        <Text style={styles.textWhite} onPress={() => { modifierlistcheck() }}>Continue</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>


                {openSuccessModifierMsg &&
                    <Modal isVisible={openSuccessModifierMsg}>
                        {SuccessModifierPopup()}
                    </Modal>
                }
            </KeyboardAwareScrollView>

        </>

    );

}
