import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import * as yup from 'yup';
import { default as styles } from '../../assets/css/style';
import InternetDownIcon from '../../assets/images/internet_down.js';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Header from '../../components/sideMenuHeaderMaster';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import ViewOrderStatus from './ViewOrderStatus';
import { Platform } from 'react-native';



export default function OrderStatus({ navigation, route }: { navigation: any, route: any }) {
    const [isDataPresent, setDataPreset] = useState(false);
    const [openOrderStatus, setOpenOrderStatus] = useState(false);
    const [editOrderStatusData, setEditOrderStatusData] = useState(null);
    const [orderStatusData, setOrderStatusData] = useState([]);
    const [editOrderStatus, setEditOrderStatus] = useState(false);
    const [data, setTableData] = useState([]);
    const optionsPerPage = [2, 3, 4];
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    var count = 1;
    const orderStatusId: any = "";
    const isFocused = useIsFocused();
    const [openSuccessMsg, setopenSuccessMsg] = useState(false);
    const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false);
    const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);


    /// ----------------------------Get the Order Status list----------------------------------------------------
    useEffect(() => {

        getOrderStatusList();
        return () => {
            setTableData([]);
        }
    }, [isFocused]);
    const getOrderStatusList = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        const result = await api.getAllMasterData(token, endPoint.GET_ORDERSTATUS + outletId);
        if (result.data.length === 0) {

            setDataPreset(false);
        }
        else {
            setTableData(result.data);
            setDataPreset(true);
        }
    }

    // ----------------------------Get the Order Status list Ends-----------------------------------------------

    //Open Orderstatus Add Popup
    const openAddOrderStatus = () => {
        setOpenOrderStatus(true)
    }
    //Close add and editOrderstatus Popup
    const toggleModal = () => {
        setOpenOrderStatus(!openOrderStatus)
    };
    //Open Edit Orderstatus Popup
    const toggleEdit = () => {
        setEditOrderStatus(!editOrderStatus)
    };
    //Validation check for Orderstatus
    const addOrderStatusValidationSchema = yup.object().shape({
        orderStatusName: yup
            .string()
            .required('Order Status Name is required'),
        orderStatusDescription: yup
            .string()
            .required('Description is required'),
    })

    // ----------------------Create Order Status-----------------------------------------------------------------
    const handleSubmit = async (data) => {

        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;

        var myJson = {
            orderStatusName: data.orderStatusName,
            description: data.orderStatusDescription,
            outletId: outletId,
        }
        const result = await api.CreateMasterData(endPoint.CREATE_ORDERSTATUS, token, myJson);
        if (result.success) {
            successOpen()
            setOpenOrderStatus(false);
            getOrderStatusList();
        }
        else {
            successInternetdownOpen()

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
                    <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Order Status Created Successfully</Text>
                    <TouchableOpacity style={styles.continueBtn} onPress={() => successOpen()}>
                        <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
            // success popup - Ends
        );
    }

    // ----------------------Create Order Status Ends-------------------------------------------------------------


    //-------------------- Update Order Status-------------------------------------------------------------------
    const updateOrderStatus = async (data) => {

        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        var myJson = {
            OrderStatusId: editOrderStatusData.orderStatusId,
            orderStatusName: data.orderStatusName,
            description: data.orderStatusDescription,
            outletId: outletId,

        }
        const result = await api.UpdateMasterData(endPoint.EDIT_ORDERSTATUS + editOrderStatusData.orderStatusId, token, myJson);
        if (result.success) {
            successOpenUpdate()
            setEditOrderStatus(false)
            getOrderStatusList();
        }
        else {
            successInternetdownOpen()
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
                    <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Order Status Updated Successfully</Text>
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

    //----------------------- Update Order Status Ends-----------------------------------------------------------

    //Send edit order status data
    const sendDataToParent = (data) => {
        setEditOrderStatusData(data)
        setEditOrderStatus(true)
    };
    //Open Add Ordestatus Popup
    const popupAddOrderStatus = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>

                    <View>
                        <View>

                            <View style={styles.popupHeadWrap}>
                                <Text style={styles.textStyle3}>
                                    Add Order Status
                                </Text>
                                <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                                    <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                    <Text style={styles.closeText}>
                                        Close
                                    </Text>
                                </Pressable>
                            </View>
                            <Formik
                                validationSchema={addOrderStatusValidationSchema}
                                initialValues={{
                                    orderStatusName: '',
                                    orderStatusDescription: '',
                                }}
                                onSubmit={values => handleSubmit(values)}
                            >

                                {({ handleSubmit, handleChange, isValid, values }) => (
                                    <View>
                                        <View style={[styles.popuprow]}>
                                            <Field
                                                component={CustomInput}
                                                name="orderStatusName"
                                                label="Order Status Name"
                                                mandate={true}

                                            />
                                            <Field
                                                component={CustomInput}
                                                name="orderStatusDescription"
                                                label="Description"
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
                </View>
            </KeyboardAwareScrollView>
        );
    }
    //open Edit Orderstatus Popup
    const popupEditOrderStatus = () => {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.popupContainer}>
                    <View>
                        <View>
                            <View style={styles.popupHeadWrap}>
                                <Text style={styles.textStyle3}>
                                    Edit Order Status
                                </Text>
                                <Pressable style={styles.closeView} onPress={() => toggleEdit()}>
                                    <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                    <Text style={styles.closeText}>
                                        Close
                                    </Text>
                                </Pressable>
                            </View>

                            <Formik
                                validationSchema={addOrderStatusValidationSchema}
                                initialValues={{
                                    orderStatusName: editOrderStatusData.orderStatusName,
                                    orderStatusDescription: editOrderStatusData.description,
                                }}
                                onSubmit={values => updateOrderStatus(values)}
                            >
                                {({ handleSubmit, handleChange, isValid }) => (
                                    <View style={{ flex: 1, alignItems: 'stretch', }} >
                                        <View style={[styles.popuprow]}>
                                            <Field
                                                component={CustomInput}
                                                name="orderStatusName"
                                                label=" Order Status Name"
                                                mandate={true}
                                            />
                                            <Field
                                                component={CustomInput}
                                                name="orderStatusDescription"
                                                label="Description"
                                                mandate={true}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
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

    //--------------------------------------- User Inteface --------------------------------------------------------------
    return (
        <>
            <Header heading={"OrderStatus"} />
            <ScrollView style={styles.categoryBlkCon}>
                <View style={[styles.textcontainer1, styles.catSubBlk]}>
                    <Text style={styles.textStyle1}>
                        Order Status
                    </Text>
                    <View>
                    </View>

                    <TouchableOpacity onPress={() => openAddOrderStatus()}>
                        <View style={styles.textcontainer2}>
                            <Text style={styles.textStyle2}>
                                Add Order Status
                            </Text>
                        </View>
                    </TouchableOpacity>


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
                                    <Text style={styles.recordDisplay}>There are no Order Status to display.</Text>
                                </View>

                                <View style={styles.noRecordItem}>
                                    <Text style={styles.addText} onPress={() => openAddOrderStatus()}>
                                        Add Order Status
                                    </Text>
                                    <Text style={styles.recordDisplay}>
                                        to continue.
                                    </Text>
                                </View>
                            </View>
                            // no record HTML Ends 
                            :
                            <ViewOrderStatus data={data} sendEditData={sendDataToParent} updateDelete={() => getOrderStatusList()} />
                        }

                    </View>

                    {openOrderStatus &&
                        <Modal isVisible={openOrderStatus}>
                            {popupAddOrderStatus()}
                        </Modal>
                    }

                    {editOrderStatus &&
                        <Modal isVisible={editOrderStatus}>
                            {popupEditOrderStatus()}
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
                </View>
            </ScrollView>

        </>

    );
}

