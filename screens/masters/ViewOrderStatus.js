// ---------------------------------Created by  by K.Venkatesh on 25/03/2022-------------------------------------

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { DataTable } from 'react-native-paper';
import styles from '../../assets/css/style';
import DeleteImg from '../../assets/images/Delete_img.js';
import EditIcon from '../../assets/images/editIcon.js';
import InternetDownIcon from '../../assets/images/internet_down.js';
import EyeIcon from '../../assets/images/login_eye.js';
import TableDelete from '../../assets/images/table_delete.js';
import Colors from '../../screens/constants/colors';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';

export default function ViewOrderStatus({ data, updateDelete, sendEditData, ...props }) {
    // const numberOfItemsPerPageList = [5, 10, 15];
    //Changes From Prajwala on 30-06-2023
    const [numberOfItemsPerPageList, setNumberOfItemsPerPageList] = useState([]);
    useEffect(() => {
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
    const [showViewId, setShowViewId] = useState('');
    const [openDeleteSuccessMsg, setopenDeleteSuccessMsg] = useState(false);
    const [outletId, setOutletId] = useState(null)
    const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const from = page * numberOfItemsPerPage;
    var count = from + 1;
    const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);
    const navigation = useNavigation();

    //Pagenation
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
    // call delete api 
    const callDeleteApi = async (orderStatusId) => {
        const jsonValue = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;

        const result = await api.DeleteMasterData(endPoint.DELETE_ORDERSTATUS + orderStatusId, token);

        if ((result.success)) {
            setopenDeleteSuccessMsg(!openDeleteSuccessMsg)
            updateDelete()
        }
        else {
            successInternetdownOpen()
        }
    }
    // Delete Success msg 
    const successOpenDelete = (outletId) => {
        setopenDeleteSuccessMsg(!openDeleteSuccessMsg)
        setOutletId(outletId)
    }
    //  delete popup
    const SuccessUpdatePopup = () => {
        return (
            <View style={[styles.flexrow, styles.justifyCenter]}>
                <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
                    <View>
                        <Image source={(require("../../assets/images/trash_00000.gif"))} style={[styles.trashGif]} />
                        <DeleteImg style={styles.marBtm20} />
                    </View>
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
    //   delete popup - Ends

    //Send edit Orderstatus data
    const callOrderStatusEdit = async (OrderStatusData) => {
        sendEditData(OrderStatusData)
    }
    //Show orderstatus list table view
    const tableRow = (OrderStatusData) => (
        <View style={[styles.tableRow, { borderColor: showView && showViewId == OrderStatusData.orderStatusId ? '#407C6A' : '#F5F3F6' }]} >
            <DataTable.Row style={styles.datatableextraline} key={OrderStatusData.orderStatusId}>
                <DataTable.Cell style={styles.userssl}><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
                <DataTable.Cell style={styles.statusNameCode}><Text style={styles.tableCell}>{OrderStatusData.orderStatusName}</Text></DataTable.Cell>
                <DataTable.Cell style={[styles.StatusDes, styles.paddR25]}><Text style={styles.tableCell}>{OrderStatusData.description}</Text></DataTable.Cell>
                <DataTable.Cell style={[styles.justifyCenter]}>
                    <View style={styles.tableButton}>
                        <View>
                            {
                                showViewId != OrderStatusData.orderStatusId ?
                                    <TouchableOpacity style={styles.viewBtn} onPress={() => {
                                        setShowView(true)
                                        setShowViewId(OrderStatusData.orderStatusId)
                                    }
                                    }>
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

                        {/* Edit Order Status Popup call Starts*/}
                        <TouchableOpacity onPress={() => callOrderStatusEdit(OrderStatusData)} style={[styles.viewBtn, styles.editBtn]}>
                            <EditIcon />
                        </TouchableOpacity>
                        {/* Edit Order Status Popup call ends */}

                        {/* Delete Order status Popu Call Starts */}
                        <Pressable onPress={() => successOpenDelete(OrderStatusData.orderStatusId)} style={styles.editBtn}>
                            <TableDelete />
                        </Pressable>
                        {/*  Delete Order status Popu Call ends */}

                    </View>
                </DataTable.Cell>
            </DataTable.Row>
            {/*  View Order status details starts */}
            {
                showView && showViewId == OrderStatusData.orderStatusId &&
                <View style={styles.viewCon}>
                    <View style={[styles.tableViewBorder]}>
                        <View style={styles.ViewConBlk}>
                            <View style={styles.viewCatView}>
                                <Text style={styles.catName}>Order Status Name : </Text>
                                <Text style={styles.catValue}>{OrderStatusData.orderStatusName}</Text>
                            </View>
                            <View style={styles.viewCatView}>
                                <Text style={styles.catName}>Description : </Text>
                                <Text style={styles.catValue}>{OrderStatusData.description}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            }
            {/*  View Order status details ends */}
        </View>
    );
    // ----------------------------------------- User Interface ------------------------------------------------------------------
    return (
        <View>
            <View>
                <DataTable {...props}>
                    <DataTable.Header style={[styles.headerStyle]}>
                        <DataTable.Title style={styles.userssl}><Text style={styles.tableHeader}>Sl .No</Text> </DataTable.Title>
                        <DataTable.Title style={styles.statusNameCode}><Text style={styles.tableHeader}>Order Status Name</Text> </DataTable.Title>
                        <DataTable.Title style={[styles.StatusDes, styles.paddR25]}><Text style={styles.tableHeader}>Status</Text> </DataTable.Title>
                        <DataTable.Title style={[styles.justifyCenter]}><Text style={styles.tableHeader}>Action</Text> </DataTable.Title>
                    </DataTable.Header>
                    <ScrollView >

                        {data
                            .slice(
                                page * numberOfItemsPerPage,
                                page * numberOfItemsPerPage + numberOfItemsPerPage
                            )
                            .map((row) => tableRow(row))}
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
            {openInternetdownMsg &&
                <Modal isVisible={openInternetdownMsg}>
                    {internetDownPop()}
                </Modal>
            }
        </View>
    );

}
