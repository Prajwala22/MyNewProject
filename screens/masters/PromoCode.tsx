import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import Toast from 'react-native-root-toast';
import * as yup from 'yup';
import { default as style, default as styles } from '../../assets/css/style';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Header from '../../components/SidemeuItemsScreenHeader';
import ViewPromoCode from '../../components/ViewPromoCode';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function PromoCode({ navigation, route }: { navigation: any, route: any }) {
    const [isDataPresent, setDataPreset] = useState(false);
    const [data, setTableData] = useState([]);
    const [openPromoCode, setOpenPromoCode] = useState(false);
    const [promoCodeData, setPromoCodeData] = useState([]);
    const [editPromoCodeData, setEditPromoCodeData] = useState(null);
    const [editPromoCode, setEditPromoCode] = useState(false);
    const optionsPerPage = [2, 3, 4];
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    var count = 1;
    const promocodeId: any = "";

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    /// ----------------------------Get the PromoCode list---------------------------------------------
    useEffect(() => {

        getPromoCodeList();
        return () => {
            setTableData([]);
        }
    }, []);
    const getPromoCodeList = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;

        const result = await api.getAllMasterData(token, endPoint.GET_PROMOCODE + outletId);
        if (result.success) {
            setTableData(result.data);
            setDataPreset(true);
        }
        else {
            Toast.show("Some Error occured. Please try again.");
            setDataPreset(false);
        }

    }

    /// ----------------------------Get the Promo Code list Ends--------------------------------------

    // ----------------------Create PromoCode-------------------------------------------------------------
    const handleSubmit = async (data) => {

        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;

        var myJson = {
            promocodeName: data.promoCodeName,
            promocode: data.promoCode,
            promocodeType: data.selectPromoCodeType,
            promocodeValue: parseInt(data.promoCodeValue),
            description: data.description,
            termsAndConditions: [data.termsAndConditions],
            discountNotes: data.discountNote,
            discountedAmount: parseInt(data.discountedAmount),
            outletId: outletId
        }
        const result = await api.CreateMasterData(endPoint.CREATE_PROMOCODE, token, myJson);
        if (result.success) {
            Toast.show('Promocode Created successfully', {
                duration: Toast.durations.LONG,
            });
            getPromoCodeList()
            setOpenPromoCode(false)
        }
        else {
            Toast.show("Some Error occured. Please try again.");

        }

    }
    // ----------------------Create PromoCode Ends---------------------------------------------

    //-------------------- Update PromoCode------------------------------------------------------ss
    const updatePromoCode = async (data) => {

        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        var myJson = {
            promocodeId: editPromoCodeData.promocodeId,
            promocodeName: data.promoCodeName,
            promocode: data.promoCode,
            promocodeType: data.selectPromoCodeType,
            promocodeValue: data.promoCodeValue,
            description: data.description,
            termsAndConditions: [data.termsAndConditions],
            discountNotes: data.discountNotes,
            discountedAmount: data.discountedAmount,
            outletId: outletId
        }
        const result = await api.UpdateMasterData(endPoint.EDIT_PROMOCODE + editPromoCodeData.promocodeId, token, myJson);
        if (result.success) {
            // Add a Toast on screen.
            Toast.show('Promo Code Updated successfully', {
                duration: Toast.durations.LONG,
            });
            setEditPromoCode(false)
            getPromoCodeList();
        }
        else {
            Toast.show("Some Error occured. Please try again.");
        }


    }
    //----------------------- Update PromoCode Ends----------------------------------------


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        });
        return unsubscribe;
    }, [navigation]);

    const openAddPromoCode = () => {
        setOpenPromoCode(true)
    }

    const toggleModal = () => {
        setOpenPromoCode(!openPromoCode)
    };
    const toggleEdit = () => {
        setEditPromoCode(!editPromoCode)
    };

    const promoCodeValidationSchema = yup.object().shape({

        promoCodeName: yup
            .string()
            .required('Promocode Name is required'),
        promoCode: yup
            .string()
            .required('PromoCode is required'),
        selectPromoCodeType: yup
            .string()
            .required('Select PromoCode Type is required'),
        promoCodeValue: yup
            .string()
            .required('Promocode Value is required'),
        description: yup
            .string()
            .required('description is required'),
        termsAndConditions: yup
            .string()
            .required('Terms And Conditions is required'),
        discountNote: yup
            .string()
            .required('Discount Note is required'),
        discountedAmount: yup
            .string()
            .required('Discounted Amount is required'),

    })

    const sendDataToParent = (data) => {
        setEditPromoCodeData(data)
        setEditPromoCode(true)
    };
    const promocodeType = [
        { label: 'Percentage', value: 'Percentage' },
        { label: 'Amount', value: 'Amount' },
    ];

    let promocodeTypeArray = promocodeType.map((k, v) => {
        return (
            <Picker.Item key={v} value={k.value} label={k.label} />
        )

    })
    //Add promocode Popup
    const popupAddPromoCode = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>
                    <View style={styles.popupHeadWrap}>
                        <Text style={styles.textStyle3}>
                            Add Promo Code
                        </Text>
                        <View style={styles.closeView}>
                            <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                <Text style={styles.closeText}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>

                    </View>

                    <Formik
                        validationSchema={promoCodeValidationSchema}
                        initialValues={{
                            promoCodeName: '',
                            promoCode: '',
                            selectPromoCodeType: '',
                            promoCodeValue: '',
                            description: '',
                            termsAndConditions: '',
                            discountNote: '',
                            discountedAmount: ''

                        }}
                        onSubmit={values => handleSubmit(values)}
                    >

                        {({ handleSubmit, handleChange, isValid, values, setFieldValue }) => (
                            <View style={{ flex: 1, alignItems: 'stretch', padding: 5 }} >
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <Field
                                        component={CustomInput}
                                        name="promoCodeName"
                                        label="promoCode Name"
                                        mandate={true}

                                    />
                                    <Field
                                        component={CustomInput}
                                        name="promoCode"
                                        label="Promocode"
                                        mandate={true}
                                    />
                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                                        <Text style={[styles.signLabel, styles.textDefault]}> Select Promocode Type<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                        <Picker style={{ borderWidth: 1 }}
                                            selectedValue={values.selectPromoCodeType}

                                            onValueChange={(text, index) => setFieldValue('selectPromoCodeType', text)}

                                        >
                                            {
                                                promocodeTypeArray != '' ?
                                                    <Picker.Item label='Select Promocode Type' value="" />
                                                    :
                                                    <Picker.Item label='' value="" />
                                            }
                                            {
                                                promocodeTypeArray
                                            }
                                        </Picker>
                                    </View>
                                    <Field
                                        component={CustomInput}
                                        name="promoCodeValue"
                                        label="Promocode Value"
                                        mandate={true}
                                    />
                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <Field
                                        component={CustomInput}
                                        name="description"
                                        label="Description"
                                        mandate={true}

                                    />
                                    <Field
                                        component={CustomInput}
                                        name="termsAndConditions"
                                        label="Terms And Conditions"
                                        mandate={true}
                                    />
                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <Field
                                        component={CustomInput}
                                        name="discountNote"
                                        label="Discount Note"
                                        mandate={true}

                                    />
                                    <Field
                                        component={CustomInput}
                                        name="discountedAmount"
                                        label="Discounted Amount"
                                        mandate={true}
                                    />
                                </View>

                                <View style={styles.popupBtnCon}>
                                    <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={handleSubmit} />
                                </View>
                            </View>

                        )}
                    </Formik>
                    <View style={style.saveAlreadyView}>

                    </View>

                </View>

            </KeyboardAwareScrollView>
        );
    }
    //Update Promocode Popup
    const popupEditPromoCode = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>
                    <View style={styles.popupHeadWrap}>
                        <Text style={styles.textStyle3}>
                            Edit Promo Code
                        </Text>
                        <View style={styles.closeView}>
                            <Pressable style={styles.closeView} onPress={() => toggleEdit()}>
                                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                <Text style={styles.closeText}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>

                    </View>
                    <View>
                        <Formik
                            validationSchema={promoCodeValidationSchema}
                            initialValues={{
                                promoCodeName: editPromoCodeData.promocodeName,
                                promoCode: editPromoCodeData.promocode,
                                selectPromoCodeType: editPromoCodeData.promocodeType,
                                promoCodeValue: JSON.stringify(editPromoCodeData.promocodeValue),
                                description: editPromoCodeData.description,
                                termsAndConditions: editPromoCodeData.termsAndConditions[0],
                                discountNote: editPromoCodeData.discountNotes,
                                discountedAmount: JSON.stringify(editPromoCodeData.discountedAmount)

                            }}
                            onSubmit={values => updatePromoCode(values)}
                        >

                            {({ handleSubmit, handleChange, isValid, values, setFieldValue }) => (
                                <View style={{ flex: 1, alignItems: 'stretch', padding: 5 }} >
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Field
                                            component={CustomInput}
                                            name="promoCodeName"
                                            label="promoCode Name"
                                            mandate={true}

                                        />
                                        <Field
                                            component={CustomInput}
                                            name="promoCode"
                                            label="Promocode"
                                            mandate={true}
                                        />
                                    </View>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                                            <Text style={[styles.signLabel, styles.textDefault]}>Select Promocode Type<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                            {/* <Picker style={{ borderWidth: 1 }}
                                            selectedValue={values.selectPromoCodeType}

                                            onValueChange={(text, index) => setFieldValue('selectPromoCodeType', text)}

                                        >
                                            {
                                                promocodeTypeArray != '' ?
                                                    <Picker.Item label='Select Promocode Type' value="" />
                                                    :
                                                    <Picker.Item label='' value="" />
                                            }
                                            {
                                                promocodeTypeArray
                                            }
                                        </Picker> */}
                                        </View>
                                        <Field
                                            component={CustomInput}
                                            name="promoCodeValue"
                                            label="Promocode Value"
                                            mandate={true}
                                        />
                                    </View>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Field
                                            component={CustomInput}
                                            name="description"
                                            label="Description"
                                            mandate={true}

                                        />
                                    </View>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Field
                                            component={CustomInput}
                                            name="termsAndConditions"
                                            label="Terms And Conditions"
                                            mandate={true}
                                        />
                                    </View>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Field
                                            component={CustomInput}
                                            name="discountNote"
                                            label="Discount Note"
                                            mandate={true}

                                        />
                                        <Field
                                            component={CustomInput}
                                            name="discountedAmount"
                                            label="Discounted Amount"
                                            mandate={true}
                                        />
                                    </View>

                                    <View style={styles.popupBtnCon}>
                                        <CustomButton label={"Continue"} onPress={handleSubmit} />
                                    </View>
                                </View>

                            )}
                        </Formik>
                        <View style={style.saveAlreadyView}>

                        </View>

                    </View>

                </View>
            </KeyboardAwareScrollView>
        );
    }
    // ----------------------------------------------- User Interface ---------------------------------------------------------
    return (
        <>
            <Header heading={"Promocode"} />

            <View style={styles.categoryBlkCon}>
                <ScrollView>
                    <View style={[styles.textcontainer1, styles.catSubBlk]}>
                        <Text style={styles.textStyle1}>
                            Add Promo Code to Continue
                        </Text>
                        <View style={styles.textcontainer2}>
                            <TouchableOpacity onPress={() => openAddPromoCode()}>
                                <Text style={styles.textStyle2}>
                                    Add Promocode
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                    <View style={[styles.table, styles.pb80]}>
                        <ViewPromoCode data={data} sendEditData={sendDataToParent} updateDelete={() => getPromoCodeList()} />
                        {!isDataPresent
                            &&
                            // no record HTML
                            <View style={styles.noRecordFoundView}>
                                <Image
                                    style={styles.noRecordImage}
                                    source={(require('../../assets/images/clipboard.png'))}
                                />
                                <View>
                                    <Text style={styles.recordDisplay}>There are no Promo Code to display.</Text>
                                </View>

                                <View style={styles.noRecordItem}>
                                    <Text style={styles.addText}>
                                        Add Promo Code
                                    </Text>
                                    <Text style={styles.recordDisplay}>
                                        to continue.
                                    </Text>
                                </View>
                            </View>
                            // no record HTML Ends
                        }

                    </View>

                    {openPromoCode &&
                        <Modal isVisible={openPromoCode}>
                            {popupAddPromoCode()}
                        </Modal>
                    }

                    {editPromoCode &&
                        <Modal isVisible={editPromoCode}>
                            {popupEditPromoCode()}
                        </Modal>
                    }
                </ScrollView>
            </View>

        </>
    );
}









