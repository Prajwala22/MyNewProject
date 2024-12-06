import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import styles from '../assets/css/style';
import Colors from '../screens/constants/colors';
import { endPoint } from '../services/api/apiConstant.js';
import api from '../services/api/callingApi';
import EditIcon from '../assets/images/editIcon.js'
import TableDelete from '../assets/images/table_delete.js'
import EyeIcon from '../assets/images/login_eye.js';
import AddModiIcon from '../assets/images/add-comment.js';
import DiscountIcon from '../assets/images/percent.js';
import Modal from "react-native-modal";
import DeletePopupIcon from '../assets/images/trash.js'


// TableViewItems component
export default function TableViewItems({ data, updateDelete, sendEditData, sendDiscountData, sendModifierData, ...props }) {
console.log(data,"tableviewesdfxcgvbhjnkm")
    // const numberOfItemsPerPageList = [5, 10, 15];
    //Changes From Prajwala on 30-06-2023
    const [numberOfItemsPerPageList, setNumberOfItemsPerPageList] = useState([]);
    useEffect(() => {
        setShowView(false)
        setShowViewId('')
        const generateNumberOfItemsPerPageList = () => {
            const newList = [5, 10, 15]; // Only include 5, 10, and 15 in the list
            setNumberOfItemsPerPageList(newList);
        };

        generateNumberOfItemsPerPageList();
    }, [data]);

    useEffect(() => {
        if (!numberOfItemsPerPageList.includes(numberOfItemsPerPage)) {
            onItemsPerPageChange(numberOfItemsPerPageList[0]);
        }
    }, [numberOfItemsPerPageList]);
    //Changes From Prajwala on 30-06-2023

    const [page, setPage] = useState(0);
    const [showView, setShowView] = useState(false);
    const [showModifierdata, setShowViewModifierdata] = useState(false);

    const [showViewId, setShowViewId] = useState('');
    const [showViewarray, setShowViewArray] = useState({});
    const [isrefreshingresult, setIsrefreshingresult] = useState(false)


    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const from = page * numberOfItemsPerPage;
    var count = from + 1;
    const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);
    const navigation = useNavigation();
    const [openDeleteSuccessMsg, setopenDeleteSuccessMsg] = useState(false);
    const [outletId, setOutletId] = useState(null)

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


    const callDeleteApi = async (itemsId) => {
        const jsonValue = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        const result = await api.DeleteMasterData(endPoint.DELETE_ITEMS + itemsId, token);
        if (result.success) {
            // Add a Toast on screen.
            // Toast.show('Item deleted Successfully', {
            //     duration: Toast.durations.LONG,
            // });
            setopenDeleteSuccessMsg(!openDeleteSuccessMsg)
            if ((data.length - 1) % 5 == 0) {
                setPage(page - 1)
            }
            updateDelete()

            // data.filter(item=>item.id!==itemsId)
        } else {

            Alert.alert("Some Error occured. Please try again.");
            setDataPreset(false);


        }
    }

    const callCategoryEdit = async (account) => {
        sendEditData(account)
    }
    const callAddDiscount = async (discount) => {
        sendDiscountData(discount)
    }
    const callAddModifier = async (discount) => {
        sendModifierData(discount)
    }
    let modifierItemFromArray = showViewarray?.modifierGroupNameId?.map((s, i) => {
        return (
            <Text style={styles.catValue}>{i + 1}:    {s.modifierGroupName}{'\n'}</Text>
        )
    })


    const onOpenEyePress = (Id) => {

        setShowView(true)
        setShowViewId(Id)
    }
    const onCloseEyePress = () => {
        setShowView(false)
        setShowViewId('')
    }
    const successOpenDelete = (outletId) => {
        setopenDeleteSuccessMsg(!openDeleteSuccessMsg)
        setOutletId(outletId)
    }
    //    delete popup
    const SuccessUpdatePopup = () => {
        return (
            <View style={[styles.flexrow, styles.justifyCenter]}>
                <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
                    <DeletePopupIcon style={[styles.marBtm45]} />
                    <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm34]}>Are you sure want to delete?</Text>
                    <View style={[styles.flexrow, styles.alignCenter, styles.justifyCenter]}>
                        <TouchableOpacity style={[styles.noBtn, styles.marRgt30]} onPress={() => successOpenDelete()}>
                            <Text style={[styles.textPri, styles.font16]}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.continueBtn} onPress={() => callDeleteApi(outletId)}>
                            <Text style={[styles.textWhite, styles.font16]}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    const tableRow = (account) => (
        <View style={[styles.tableRow, { borderColor: showView && showViewId == account.id ? '#407C6A' : '#F5F3F6' }]} >
            <DataTable.Row style={styles.datatableextraline} key={account.id}>
                <DataTable.Cell style={styles.flexSl}><Text style={[styles.tableCell, styles.tableCount]}>{count++}</Text></DataTable.Cell>
                <DataTable.Cell style={styles.flexcat}><Text style={styles.tableCell}>{account.categoryName}</Text></DataTable.Cell>
                <DataTable.Cell style={styles.itemName}><Text style={styles.tableCell}>{account.itemName}</Text></DataTable.Cell>
                <DataTable.Cell style={styles.flexAmot}><Text style={styles.tableCell}>{account.itemAmount}</Text></DataTable.Cell>
                {/* <DataTable.Cell style={styles.flexAmot}><Text style={styles.tableCell}>{account.outletId}</Text></DataTable.Cell> */}

                <DataTable.Cell style={styles.flexSta}>
                    {account.isActive ? <View style={[styles.runningStatus, styles.ComplStatus]}><Text style={[styles.font12, styles.fontBold, styles.TextGreen]}>Active</Text></View> : <View style={[styles.runningStatus]}><Text style={[styles.font12, styles.fontBold, styles.redText]}>In Active</Text></View>}
                </DataTable.Cell>
                <DataTable.Cell style={[styles.flexitemAmt, styles.justifyCenter]}>
                    <View style={styles.tableButton}>
                        <View>
                            {
                                showViewId != account.id ?
                                    <TouchableOpacity style={styles.viewBtn} onPress={() => {
                                        setShowView(true)
                                        setShowViewId(account.id)
                                        setShowViewArray(account)
                                    }
                                    }>
                                        {/* <Ionicons name="eye-outline" color={Colors.labelColor} size={20} style={styles.viewIcon} /> */}
                                        <EyeIcon />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.viewBtn} onPress={() => {
                                        setShowView(false)
                                        setShowViewId('')
                                    }
                                    }>
                                        <Ionicons name="eye-off-outline" color={Colors.labelColor} size={20} style={styles.viewIcon} />

                                    </TouchableOpacity>
                            }
                        </View>
                        <TouchableOpacity onPress={() => callAddModifier(account)} style={[styles.viewBtn, styles.editBtn]}>
                            <AddModiIcon />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => callAddDiscount(account)} style={[styles.viewBtn, styles.editBtn]}>
                            {/* <View style={styles.popupBtnCon}>
                                <CustomButton styles={styles.addCaaatBtn} label={"Add Modifiers"}/>
                            </View> */}
                            <DiscountIcon />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('ItemUpdateRecipe', account)} style={[styles.viewBtn, styles.editBtn]}>
                            {/* <FontAwesome name="edit" color={Colors.labelColor} size={20}  /> */}
                            <EditIcon />
                        </TouchableOpacity>
                        <Pressable onPress={() => successOpenDelete(account.id)} style={styles.editBtn}>
                            {/* {/* <Ionicons name="trash-outline" color={Colors.labelColor} size={20} style={styles.DeleteIcon} /> */}
                            <TableDelete source={(require('../assets/images/trash_icon.png'))}
                            />
                        </Pressable>

                    </View>
                </DataTable.Cell>
            </DataTable.Row>
            {
                showView && showViewId == account.id &&
                <View style={styles.viewCon}>
                    <View style={styles.tableViewBorder}>
                        <View style={styles.ViewConBlk}>
                            <View style={styles.viewCatView}>
                                <Text style={styles.catName}>Item Name:{account?.discount[0]?.isPromocodeApplied} </Text>
                                <Text style={styles.catValue}>{account.itemName}</Text>
                            </View>
                            <View style={styles.viewCatView}>
                                <Text style={styles.catName}>Category Name :  </Text>
                                <Text style={styles.catValue}>{account.categoryName}</Text>
                            </View>
                            <View style={styles.viewCatView}>
                                <Text style={styles.catName}>Item Description : </Text>
                                <Text style={styles.catValue}>{account.description}</Text>
                            </View>
                            <View style={styles.viewCatView}>
                                <Text style={styles.catName}>Item Amount : </Text>
                                <Text style={styles.catValue}>{account.itemAmount}</Text>
                            </View>
                            <View style={styles.viewCatView}>
                                <Text style={styles.catName}>Is Ready Made : </Text>
                                <Text style={styles.catValue}>{(account.isReadyMade == true) ? "Active" : "In Active"}</Text>
                            </View>
                            <View style={styles.viewCatView}>
                                <Text style={styles.catName}>Modifers</Text>
                                {
                                    (showView == true && modifierItemFromArray?.length > 0) ? modifierItemFromArray : <Text style={styles.catValue}> :   NA</Text>
                                }
                            </View>
                            <>

                                {
                                    (account?.discount?.length > 0 && account?.discount[0]?.discountType != '') ? <>
                                        <View style={styles.viewCatView}>
                                            <Text style={styles.catName}>Discount Type </Text>
                                            <Text style={styles.catValue}>: {account?.discount[0]?.discountType} </Text>
                                        </View>
                                        <View style={styles.viewCatView}>
                                            <Text style={styles.catName}>Discount Value </Text>
                                            <Text style={styles.catValue}>: {account?.discount[0]?.discountValue} </Text>
                                        </View>
                                        {/* <View style={styles.viewCatView}>
                                            <Text style={styles.catName}>Discount Amount </Text>
                                            <Text style={styles.catValue}>: {account?.discount[0]?.discountedAmount} </Text>
                                        </View> */}
                                        <View style={styles.viewCatView}>
                                            <Text style={styles.catName}>Discount Notes </Text>
                                            <Text style={styles.catValue}>: {account?.discount[0]?.discountNotes} </Text>
                                        </View>
                                    </> : null
                                }
                                {
                                    (account?.discount?.length > 0 && account?.discount[0] && account?.discount[0]?.discountType == '') ? <>
                                        <View style={styles.viewCatView}>
                                            <Text style={styles.catName}>Promocode Type </Text>
                                            <Text style={styles.catValue}>: {account?.discount[0]?.promocodeDiscountType} </Text>
                                        </View>
                                        <View style={styles.viewCatView}>
                                            <Text style={styles.catName}>Promocode Value </Text>
                                            <Text style={styles.catValue}>: {account?.discount[0]?.promocodeDiscount} </Text>
                                        </View>
                                        <View style={styles.viewCatView}>
                                            <Text style={styles.catName}>Promocode Amount </Text>
                                            <Text style={styles.catValue}>: {account?.discount[0]?.promocodeAmount} </Text>
                                        </View>
                                        <View style={styles.viewCatView}>
                                            <Text style={styles.catName}>Promocode Notes </Text>
                                            <Text style={styles.catValue}>: {account?.discount[0]?.discountNotes}</Text>
                                        </View>
                                    </> : null
                                }
                                {
                                    account?.discount?.length <= 0 && (
                                        <View style={styles.viewCatView}>
                                            <Text style={styles.catName}>Discount </Text>
                                            <Text style={styles.catValue}>: NA </Text>
                                        </View>)
                                }

                            </>
                            {/* <View style={styles.viewCatView}>
                                <Text style={styles.catName}>Outlet Name : </Text>
                                <Text style={styles.catValue}>Krishna Grand</Text>
                            </View> */}
                        </View>
                    </View>
                </View>
            }
        </View>
    );

    return (
        <View>
            <View>
                <DataTable {...props}>
                    <DataTable.Header style={[styles.headerStyle]}>
                        <DataTable.Title style={styles.flexSl}><Text style={styles.tableHeader}>Sl .No</Text> </DataTable.Title>
                        <DataTable.Title style={styles.flexcat}><Text style={styles.tableHeader}>Category Name</Text></DataTable.Title>
                        <DataTable.Title style={styles.itemName}><Text style={styles.tableHeader}>Item Name</Text> </DataTable.Title>
                        <DataTable.Title style={styles.flexAmot}><Text style={styles.tableHeader}>Item Amount</Text> </DataTable.Title>
                        <DataTable.Title style={styles.flexSta}><Text style={styles.tableHeader}>Status</Text></DataTable.Title>
                        <DataTable.Title style={[styles.flexitemAmt, styles.justifyCenter]}><Text style={styles.tableHeader}>Action</Text>
                        </DataTable.Title>
                    </DataTable.Header>
                    <ScrollView >
                  
                    {data && data.length > 0 ? (
    data.slice(page * numberOfItemsPerPage, page * numberOfItemsPerPage + numberOfItemsPerPage)
        .map((row, index) => tableRow(row, index))
) : (
null)}


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
            </View>
            {openDeleteSuccessMsg &&
                <Modal isVisible={openDeleteSuccessMsg}>
                    {SuccessUpdatePopup()}
                </Modal>
            }
        </View>

    );
}
