

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Modal from "react-native-modal";
import ModalSelector from "react-native-modal-selector";
import Toast from "react-native-root-toast";
import * as yup from "yup";
import { default as style, default as styles } from "../../assets/css/style";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import Header from '../../components/sideMenuHeaderMaster';
import ViewModifier from "../../components/ViewModifier";
import { endPoint } from "../../services/api/apiConstant";
import api from "../../services/api/callingApi";
import Colors from "../constants/colors";
import DeleteIcon from '../../assets/images/modi_delete_icon.js'


export default function Modifiers({
    navigation,
    route,
}: {
    navigation: any;
    route: any;
}) {
    const [page, setPage] = useState(0);
    const optionsPerPage = [2, 3, 4];
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [openModifierGroup, setOpenModifierGroup] = useState(false);
    const [modifierGroupData, setModifierGroupData] = useState([]);
    const [editModifierGroup, setEditModifierGroup] = useState(false);
    const [editModifierGroupData, setEditModifierGroupData] = useState(null);
    const [data, setTableData] = useState([]);
    const [isDataPresent, setDataPreset] = useState(false);
    const id: any = "";
    const [userData, setUserData] = useState();
    const [itemerrormsg, setitemerrormsg] = useState(false);
    const [ingredienterrormsg, setingredienterrormsg] = useState(false);
    const [priceerrormsg, setpriceerrormsg] = useState(false);

    const [values, setValues] = useState([
        {
            itemFrom: "",
            itemId: "",
            price: "",
            itemName: "",
            key1: 0,
            key2: 0,
        },
    ]);
    const modifierlistcheck = () => {
        if (values[0].itemFrom === '') {
            setitemerrormsg(true)
        }
        if (values[0].itemName === '') {
            setingredienterrormsg(true)
        }

        if (values[0].price === '') {
            setpriceerrormsg(true)
        }
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

    const isFocused = useIsFocused();

    const [itemsDataList, setData] = useState([]);
    const [openSuccessModifierMsg, setopenSuccessModifierMsg] = useState(false);
    const [updateSuccessModifierMsg, setupdateSuccessModifierMsg] = useState(false);

    const [ingredientsDataList, setIngredintsDataList] = useState([]);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => { });
        return unsubscribe;
    }, [navigation]);

    // ------------------------Get Modifier Group List------------------------------------------------------------

    useEffect(() => {
        getModifierGroupList();
        return () => {
            setTableData([]);
        };
    }, [isFocused]);
    const getModifierGroupList = async () => {
        const jsonValue: any = await AsyncStorage.getItem("userInfo");
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;

        const result = await api.getAllMasterData(
            token,
            endPoint.GET_MODIFIERS_GROUP + outletId
        );
        if (result.data === null || result.data.length === 0) {
            // Toast.show("Some Error occured. Please try again.");
            setDataPreset(false);
        } else {
            setModifierGroupData(result.data);
            setTableData(result.data);
            setDataPreset(true);
        }
    };
    // ------------------------Get Modifier Group List Ends------------------------------------------------------

    const openAddModifierGroup = () => {
        setOpenModifierGroup(true);
        setitemerrormsg(false)
        setingredienterrormsg(false)
        setpriceerrormsg(false)
        setValues([
            {
                itemFrom: null,
                itemId: "",
                price: null,
                itemName: null,
                key1: 0,
                key2: 0,
            },
        ])

    };
    const toggleModal = () => {

        setOpenModifierGroup(!openModifierGroup);

    };
    const toggleEdit = () => {
        setEditModifierGroup(!editModifierGroup);
    };

    const addModifierGroupValidationSchema = yup.object().shape({
        modifierGroupName: yup.string().required("Modifier Name is required"),
        modifierGroupDescription: yup
            .string()
            .required("Description is required"),

        modifierGroupItemFrom: yup.string(),
        modifierPrice: yup.string(),
    });
    const editModifierGroupValidationSchema = yup.object().shape({
        modifierGroupName: yup.string().required("Modifier Name is required"),
        modifierGroupDescription: yup.string().required("Description is required"),
        modifierGroupItemFrom: yup.string(),
        modifierGroupItemName: yup.string(),
        modifierPrice: yup.string(),
    });
    // ----------------------Create Modifier Group ----------------------------------------------------------------
    const handleSubmit = async (data) => {

        const jsonValue: any = await AsyncStorage.getItem("userInfo");
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;

        var myJson = {
            groupName: data.modifierGroupName,
            description: data.modifierGroupDescription,
            modifierItems: values,
            outletId: outletId,
        };

        const result = await api.CreateMasterData(
            endPoint.CREATE_MODIFIER,
            token,
            myJson
        );
        if (result.success) {
            successModifierOpen()

            getModifierGroupList();
            // Toast.show("Modifier Group  Created successfully", {
            //     duration: Toast.durations.LONG,
            // });
            setValues([
                {
                    itemFrom: "Select Item",
                    itemId: "",
                    price: "",
                    itemName: "Select Item Name",
                    key1: 0,
                    key2: 0
                }
            ]);
            data.modifierGroupDescription = "",
                data.modifierGroupName = ""
            setOpenModifierGroup(false);
        } else {
            Toast.show("Some Error occured. Please try again.");
        }
    };
    // -----------------------Create Modifier Ends----------------------------------------------------------------

    // -------------------- Update Modifier  --------------------------------------------------------------------
    const updateModifierGroup = async (data) => {
        const jsonValue: any = await AsyncStorage.getItem("userInfo");
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        var myJson = {
            id: editModifierGroupData.id,
            groupName: data.modifierGroupName,
            description: data.modifierGroupDescription,
            modifierItems: values,
            outletId: outletId,
        };
        const result = await api.UpdateMasterData(
            endPoint.EDIT_MODIFIER + editModifierGroupData.id,
            token,
            myJson
        );

        if (result.success) {
            UpdatesuccessModifierOpen();
            // Add a Toast on screen.
            // Toast.show("Modifier Group Updated successfully", {
            //     duration: Toast.durations.LONG,
            // });
            setEditModifierGroup(false);
            getModifierGroupList();
        } else {
            Toast.show("Some Error occured. Please try again.");
        }
    };
    //----------------------- Update Modifier Group Ends----------------------------------------------------------
    const sendDataToParent = (data) => {
        // the callback. Use a better name
        setEditModifierGroupData(data);
        setValues(data.modifierItems);
        setEditModifierGroup(true);

        const itemfromarray = itemFromData.filter(
            (item) => item.value == data.modifierItems[0].itemFrom
        );

        const itemNameArray = modifierItemNameArray.filter(
            (item) => (item.value = data.modifierItem[0].itemId)
        );
    };

    const itemFromData = [
        { label: "Item Master", value: "Item Master" },
        { label: "Ingredients", value: "Ingredients" },
    ];

    /// Get the Item list
    useEffect(() => {
        getItemList();
        getIngredientsName();
        return () => {
            setData([]);
        };
    }, []);
    const getItemList = async () => {
        const jsonValue: any = await AsyncStorage.getItem("userInfo");
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        setUserData(loginData);
        var myJson = {
            IsAllItem: true,
            OutletId: outletId,
        };
        const result = await api.CreateMasterData(
            endPoint.GET_ITEMS,
            token,
            myJson
        );
        if (
            JSON.stringify(result.data) === null ||
            JSON.stringify(result.data) === "null" ||
            result.data === ""
        ) {
            Toast.show("Some Error occured. Please try again.");
        } else {
            setData(result.data);
        }
    };
    const UpdatesuccessModifierOpen = () => {
        setupdateSuccessModifierMsg(!updateSuccessModifierMsg)

    }

    const UpdateSuccessModifierPopup = () => {
        return (
            // success popup
            <View style={[styles.flexrow, styles.justifyCenter]}>
                <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
                    <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
                    <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Modifier Updated Successfully</Text>
                    <TouchableOpacity style={styles.continueBtn} onPress={() => [UpdatesuccessModifierOpen()]}>
                        <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
            // success popup - Ends
        );
    }
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
                    <TouchableOpacity style={styles.continueBtn} onPress={() => [successModifierOpen()]}>
                        <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
            // success popup - Ends
        );
    }
    const getIngredientsName = async () => {
        const jsonValue: any = await AsyncStorage.getItem("userInfo");
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        const result = await api.getAllMasterData(token, endPoint.GET_INGREDIENTS);
        if (
            JSON.stringify(result.data) === null ||
            JSON.stringify(result.data) === "null" ||
            result.data === ""
        ) {
            Toast.show("Some Error occured. Please try again.");
        } else {
            setIngredintsDataList(result.data);
        }
    };
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
    };
    const removeClick = (data) => {
        let index = data;
        const list = [...values];
        list.splice(index, 1);
        setValues(list);
    };

    function createInputs() {
        return values.map((el, i) => (
            <View style={[styles.marginBtm11, styles.wdth100]}>
                <View style={styles.flexAlignRowbet}>
                    <Text style={styles.modifierName}>Modifier {i + 1}</Text>
                    {values.length > 1 && ( // Show the "remove" button for items other than the first one
                        <Pressable style={styles.editBtn} onPress={() => removeClick(i)}>
                            {/* <Image
                                style={styles.DeleteIcon}
                                source={(require('../../assets/images/trash_icon.png'))}
                            /> */}
                            <DeleteIcon />
                        </Pressable>
                    )}
                </View>
                <View>
                    <View style={styles.flexrow}>
                        <View style={[styles.popupInputBlk, styles.wdth50, styles.pr15]}>
                            <Text style={[styles.signLabel, styles.textDefault]}>
                                {" "}
                                Select Item From
                                <Text style={[styles.font12, styles.textPri]}>*</Text>
                            </Text>
                            <View>
                                <Image
                                    source={require("../../assets/images/dropdown.png")}
                                    style={styles.dropdonwImg}
                                />
                                <ModalSelector
                                    data={modifierItemFromArray}
                                    childrenContainerStyle={[
                                        styles.AddsignInput,
                                        styles.selectMainInput,
                                    ]}
                                    selectStyle={styles.selectText}
                                    optionContainerStyle={styles.selectCont}
                                    optionTextStyle={styles.textStyle}
                                    initValueTextStyle={styles.textStyle}
                                    overlayStyle={styles.overlayText}
                                    cancelStyle={styles.selectCont}
                                    cancelContainerStyle={styles.cancelCont}
                                    cancelText={"Cancel"}
                                    //   initValue={el ? "ItemMaster" : "Select Item "}
                                    initValue={el ? el.itemFrom : "Select Item "}
                                    //   initValue='Select Item '
                                    selectedKey={el.key1}
                                    onChange={(option) => {
                                        if (option.key) {
                                            handleInputChange(option.value, "itemFrom", i);
                                            handleInputChange(option.key, "key1", i);
                                            setitemerrormsg(false)
                                        }
                                    }}
                                />
                            </View>
                            {el.itemFrom === "" && (
                                <Text style={[styles.errorText, { marginTop: 5 }]}>Item From is required</Text>
                            )}
                        </View>

                        {el.itemFrom === "Ingredients" ? (
                            <View
                            style={[styles.popupInputBlk, styles.wdth33, styles.paddL15]}>
                            <Text style={[styles.signLabel, styles.textDefault]}>
                                {" "}
                                Select Item Name
                                <Text style={[styles.font12, styles.textPri]}>*</Text>
                            </Text>
                            <View>
                                <Image
                                    source={require("../../assets/images/dropdown.png")}
                                    style={styles.dropdonwImg}
                                />
                                <ModalSelector
                                    data={modifierIngredientsArray}
                                    // data={modifierItemNameArray}
                                    childrenContainerStyle={[
                                        styles.AddsignInput,
                                        styles.selectMainInput,
                                    ]}
                                    selectStyle={styles.selectText}
                                    optionContainerStyle={styles.selectCont}
                                    optionTextStyle={styles.textStyle}
                                    initValueTextStyle={styles.textStyle}
                                    overlayStyle={styles.overlayText}
                                    cancelStyle={styles.selectCont}
                                    cancelContainerStyle={styles.cancelCont}
                                    cancelText={"Cancel"}
                                    // initValue='Select Item Names'
                                    initValue={el ? el.itemName : "Select Item Name"}
                                    selectedKey={el.key2}
                                    onChange={(option) => {
                                        if (option.key) {
                                            handleInputChange(option.value, "itemName", i);
                                            handleInputChange(option.key, "key2", i);
                                            setingredienterrormsg(false)
                                        }
                                    }}
                                />
                            </View>
                        </View>
                        ) : (
                            <View
                                style={[styles.popupInputBlk, styles.wdth33, styles.paddL15]}>
                                <Text style={[styles.signLabel, styles.textDefault]}>
                                    {" "}
                                    Select Item Name
                                    <Text style={[styles.font12, styles.textPri]}>*</Text>
                                </Text>
                                <View>
                                    <Image
                                        source={require("../../assets/images/dropdown.png")}
                                        style={styles.dropdonwImg}
                                    />
                                    <ModalSelector
                                        data={modifierItemNameArray}
                                        childrenContainerStyle={[
                                            styles.AddsignInput,
                                            styles.selectMainInput,
                                        ]}
                                        selectStyle={styles.selectText}
                                        optionContainerStyle={styles.selectCont}
                                        optionTextStyle={styles.textStyle}
                                        initValueTextStyle={styles.textStyle}
                                        overlayStyle={styles.overlayText}
                                        cancelStyle={styles.selectCont}
                                        cancelContainerStyle={styles.cancelCont}
                                        cancelText={"Cancel"}
                                        // initValue='Sel'
                                        initValue={el ? el.itemName : "Select Item Names"}
                                        selectedKey={el.key2}
                                        onChange={(option) => {
                                            if (option.key) {
                                                handleInputChange(option.value, "itemName", i);
                                                handleInputChange(option.key, "key2", i);
                                                setingredienterrormsg(false)
                                                // handleInputChange("rice", "itemName", i);
                                                // handleInputChange(0, "key2", i);
                                            }
                                        }}
                                    />
                                </View>
                                {el.itemName === "" && (
                                    <Text style={[styles.errorText, { marginTop: 5 }]}>Item Name is required</Text>
                                )}
                            </View>
                        )}
                        <View
                            style={[styles.popupInputBlk, styles.wdth33, styles.paddRL15]}>
                            <Text style={[styles.textDefault]}>Price <Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                            <TextInput
                                style={styles.signInput}
                                defaultValue={JSON.stringify(el.price)}
                                value={el.price === null ? "" : el.price}
                                keyboardType='numeric'
                                onChangeText={(text) => { handleInputChange(text, "price", i), setpriceerrormsg(false) }}
                            />
                            {el.price === "" && (
                                <Text style={[styles.errorText, { marginTop: 5 }]}>Price is required</Text>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        ));
    }

    // function createInputs() {
    //   return values.map((el, i) => (
    //     <View style={[styles.marginBtm11, styles.wdth100]} key={i}>
    //       <View style={styles.flexAlignRowbet}>
    //         <Text style={styles.modifierName}>Modifier</Text>
    //         <Pressable style={styles.removeTaxBtn} onPress={() => removeClick(i)}>
    //           <Text style={[styles.textDefault, { color: Colors.white }]}>
    //             remove
    //           </Text>
    //         </Pressable>
    //       </View>
    //       <View>
    //         <View style={styles.flexrow}>
    //           <View style={[styles.popupInputBlk, styles.wdth50, styles.pr15]}>
    //             <Text style={[styles.signLabel, styles.textDefault]}>
    //               {" "}
    //               Select Item From
    //               <Text style={[styles.font12, styles.textPri]}>*</Text>
    //             </Text>
    //             <View>
    //               <Image
    //                 source={require("../../assets/images/dropdown.png")}
    //                 style={styles.dropdonwImg}
    //               />
    //               <ModalSelector
    //                 data={modifierItemFromArray}
    //                 childrenContainerStyle={[
    //                   styles.AddsignInput,
    //                   styles.selectMainInput,
    //                 ]}
    //                 selectStyle={styles.selectText}
    //                 optionContainerStyle={styles.selectCont}
    //                 optionTextStyle={styles.textStyle}
    //                 initValueTextStyle={styles.textStyle}
    //                 overlayStyle={styles.overlayText}
    //                 cancelStyle={styles.selectCont}
    //                 cancelContainerStyle={styles.cancelCont}
    //                 cancelText={"Cancel"}
    //                 initValue={el ? el.itemFrom : "Select Item "}
    //                 selectedKey={el.key1}
    //                 onChange={(option) => {
    //                   if (option.key) {
    //                     handleInputChange(option.value, "itemFrom", i);
    //                     handleInputChange(option.key, "key1", i);
    //                   }
    //                   if (option.value === "Ingredients") {
    //                     handleInputChange("Select Item Names", "itemName", i);
    //                     handleInputChange(null, "key2", i);
    //                   } else if (option.value === "ItemMaster") {
    //                     handleInputChange("Select Item Names", "itemName", i);
    //                     handleInputChange(null, "key2", i);
    //                   }
    //                 }}
    //               />
    //             </View>
    //           </View>
    //           {el.itemFrom === "Ingredients" && (
    //             <View
    //               style={[styles.popupInputBlk, styles.wdth33, styles.paddR15]}>
    //               <Text style={[styles.signLabel, styles.textDefault]}>
    //                 {" "}
    //                 Select Item From
    //                 <Text style={[styles.font12, styles.textPri]}>*</Text>
    //               </Text>
    //               <View>
    //                 <Image
    //                   source={require("../../assets/images/dropdown.png")}
    //                   style={styles.dropdonwImg}
    //                 />
    //                 <ModalSelector
    //                   data={modifierIngredientsArray}
    //                   childrenContainerStyle={[
    //                     styles.AddsignInput,
    //                     styles.selectMainInput,
    //                   ]}
    //                   selectStyle={styles.selectText}
    //                   optionContainerStyle={styles.selectCont}
    //                   optionTextStyle={styles.textStyle}
    //                   initValueTextStyle={styles.textStyle}
    //                   overlayStyle={styles.overlayText}
    //                   cancelStyle={styles.selectCont}
    //                   cancelContainerStyle={styles.cancelCont}
    //                   cancelText={"Cancel"}
    //                   initValue={el ? el.itemName : "Select Item Names"}
    //                   selectedKey={el.key2}
    //                   onChange={(option) => {
    //                     if (option.key) {
    //                       handleInputChange(option.value, "itemName", i);
    //                       handleInputChange(option.key, "key2", i);
    //                     }
    //                   }}
    //                 />
    //               </View>
    //             </View>
    //           )}
    //           {el.itemFrom === "ItemMaster" && (
    //             <View
    //               style={[styles.popupInputBlk, styles.wdth33, styles.paddL15]}>
    //               <Text style={[styles.signLabel, styles.textDefault]}>
    //                 {" "}
    //                 Select Item Names
    //                 <Text style={[styles.font12, styles.textPri]}>*</Text>
    //               </Text>
    //               <View>
    //                 <Image
    //                   source={require("../../assets/images/dropdown.png")}
    //                   style={styles.dropdonwImg}
    //                 />
    //                 <ModalSelector
    //                   data={modifierItemNameArray}
    //                   childrenContainerStyle={[
    //                     styles.AddsignInput,
    //                     styles.selectMainInput,
    //                   ]}
    //                   selectStyle={styles.selectText}
    //                   optionContainerStyle={styles.selectCont}
    //                   optionTextStyle={styles.textStyle}
    //                   initValueTextStyle={styles.textStyle}
    //                   overlayStyle={styles.overlayText}
    //                   cancelStyle={styles.selectCont}
    //                   cancelContainerStyle={styles.cancelCont}
    //                   cancelText={"Cancel"}
    //                   initValue={el ? el.itemName : "Select Item Names"}
    //                   selectedKey={el.key2}
    //                   onChange={(option) => {
    //                     if (option.key) {
    //                       handleInputChange(option.value, "itemName", i);
    //                       handleInputChange(option.key, "key2", i);
    //                     }
    //                   }}
    //                 />
    //               </View>
    //             </View>
    //           )}
    //           <View
    //             style={[styles.popupInputBlk, styles.wdth33, styles.paddRL15]}>
    //             <Text style={[styles.textDefault]}>Price</Text>
    //             <TextInput
    //               style={styles.signInput}
    //               defaultValue={JSON.stringify(el.price)}
    //               value={el.price}
    //               keyboardType='numeric'
    //               onChangeText={(text) => handleInputChange(text, "price", i)}
    //             />
    //           </View>
    //         </View>
    //       </View>
    //     </View>
    //   ));
    // }

    let modifierItemFromArray = itemFromData.map((s, i) => {


        let newData = {
            key: i + 1,
            label: s.label,
            value: s.value,
        };
        return newData;
    });

    let modifierItemNameArray = itemsDataList.map((s, i) => {
        let newData = {
            key: i + 1,
            label: s.itemName,
            value: s.itemName,
        };
        return newData;
    });


    let modifierIngredientsArray = ingredientsDataList.map((s, i) => {
        let newData = {
            key: i + 1,
            label: s.childItemName,
            value: s.childItemName,
        };
        return newData;
    });

    const resetForm = () => {
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
        toggleModal();
    };

    const popupAddModifierGroup = () => {
        return (
            <View style={styles.popupContainer}>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    keyboardDismissMode='on-drag'>
                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>Add Modifier</Text>
                            <Pressable style={styles.closeView} onPress={() => resetForm()}>
                                <Image
                                    source={require("../../assets/images/cross_icon.png")}
                                    style={styles.crossIcon}
                                />
                                <Text style={styles.closeText}>Close</Text>
                            </Pressable>
                        </View>
                        <Formik
                            validationSchema={addModifierGroupValidationSchema}
                            initialValues={{
                                modifierGroupName: "",
                                modifierGroupDescription: "",
                                modifierGroupItemFrom: "",
                                modifierPrice: "",
                            }}
                            onSubmit={(values) => handleSubmit(values)}>
                            {({
                                handleSubmit,
                                handleChange,
                                isValid,
                                values,
                                setFieldValue,
                            }) => (
                                <View>
                                    <View style={[styles.popuprow]}>
                                        <Field
                                            component={CustomInput}
                                            name='modifierGroupName'
                                            label='Modifier Name'
                                            mandate={true}
                                        />
                                        <Field
                                            component={CustomInput}
                                            name='modifierGroupDescription'
                                            label='Description'
                                            mandate={true}
                                        />
                                    </View>

                                    <View style={styles.popupBtnCon}>
                                        {createInputs()}

                                        <CustomButton
                                            label={"Add Modifier item"}
                                            onPress={addClick}
                                            customstyles={styles.addTextPercentBtn}
                                        />
                                    </View>

                                    <TouchableOpacity onPress={() => { handleSubmit(), modifierlistcheck() }}>
                                        <View style={styles.popupBtnCon}>
                                            <CustomButton
                                                styles={styles.addCaaatBtn}
                                                label={"Continue"}
                                                onPress={() => { handleSubmit(), modifierlistcheck() }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>
                        <View style={style.saveAlreadyView}></View>
                    </View>
                </ScrollView>
            </View>
        );
    };
    const popupEditModifierGroup = () => {
        return (
            <View style={styles.popupContainer}>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    keyboardDismissMode='on-drag'>
                    <View>
                        <View style={styles.popupHeadWrap}>
                            <Text style={styles.textStyle3}>Edit Modifier</Text>
                            <Pressable style={styles.closeView} onPress={() => toggleEdit()}>
                                <Image
                                    source={require("../../assets/images/cross_icon.png")}
                                    style={styles.crossIcon}
                                />
                                <Text style={styles.closeText}>Close</Text>
                            </Pressable>
                        </View>
                        <Formik
                            validationSchema={editModifierGroupValidationSchema}
                            initialValues={{
                                modifierGroupName: editModifierGroupData.groupName,
                                modifierGroupDescription: editModifierGroupData.description,
                                modifierGroupItemFrom: "",
                                modifierGroupItemName: "",
                                modifierPrice: "",
                            }}
                            onSubmit={(values) => updateModifierGroup(values)}>
                            {({
                                handleSubmit,
                                handleChange,
                                isValid,
                                values,
                                setFieldValue,
                            }) => (
                                <View>
                                    <View style={[styles.popuprow]}>
                                        <Field
                                            component={CustomInput}
                                            name='modifierGroupName'
                                            label='Modifier Name'
                                            mandate={true}
                                        />
                                        <Field
                                            component={CustomInput}
                                            name='modifierGroupDescription'
                                            label='Description'
                                            mandate={true}
                                        />
                                    </View>

                                    <View style={styles.popupBtnCon}>
                                        {createInputs()}

                                        <CustomButton
                                            label={"Add Modifier item"}
                                            onPress={addClick}
                                            customstyles={styles.addTextPercentBtn}
                                        />
                                    </View>

                                    <TouchableOpacity onPress={() => { handleSubmit(), modifierlistcheck() }}>
                                        <View style={styles.popupBtnCon}>
                                            <CustomButton
                                                styles={styles.addCaaatBtn}
                                                label={"Continue"}
                                                onPress={() => { handleSubmit(), modifierlistcheck() }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>
                        <View style={style.saveAlreadyView}></View>
                    </View>
                </ScrollView>
            </View>
        );
    };

    return (
        <>
            <Header heading={"ModifierGroup"} />

            <View style={styles.categoryBlkCon}>
                <ScrollView>
                    <View style={[styles.textcontainer1, styles.catSubBlk]}>
                        <Text style={styles.textStyle1}>Modifier</Text>

                        <TouchableOpacity onPress={() => openAddModifierGroup()}>
                            <View style={styles.textcontainer2}>
                                <Text style={styles.textStyle2}>Add Modifier</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={[styles.table, styles.pb80]}>
                        {!isDataPresent ? (
                            // no record HTML
                            <View style={styles.noRecordFoundView}>
                                <Image
                                    style={styles.noRecordImage}
                                    source={require("../../assets/images/clipboard.png")}
                                />
                                <View>
                                    <Text style={styles.recordDisplay}>
                                        There are no Modifier to display.
                                    </Text>
                                </View>

                                <View style={styles.noRecordItem}>
                                    <Text
                                        style={styles.addText}
                                        onPress={() => openAddModifierGroup()}>
                                        Add Modifier
                                    </Text>
                                    <Text style={styles.recordDisplay}>to continue.</Text>
                                </View>
                            </View>
                        ) : (
                            // no record HTML Ends
                            <ViewModifier
                                data={data}
                                sendEditData={sendDataToParent}
                                updateDelete={() => getModifierGroupList()}
                            />
                        )}
                    </View>

                    {openModifierGroup && (
                        <Modal isVisible={openModifierGroup}>
                            {popupAddModifierGroup()}
                        </Modal>
                    )}
                    {openSuccessModifierMsg &&
                        <Modal isVisible={openSuccessModifierMsg}>
                            {SuccessModifierPopup()}
                        </Modal>
                    }
                    {updateSuccessModifierMsg &&
                        <Modal isVisible={updateSuccessModifierMsg}>
                            {UpdateSuccessModifierPopup()}
                        </Modal>
                    }
                    {editModifierGroup && (
                        <Modal isVisible={editModifierGroup}>
                            {popupEditModifierGroup()}
                        </Modal>
                    )}
                </ScrollView>
            </View>
        </>
    );
}
