import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import styles from '../assets/css/style';
import api from '../services/api/callingApi';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '../screens/constants/colors';
import moment from 'moment';
import EyeIcon from '../assets/images/login_eye.js';

export default function OrdersPreparedListView({ data, updateDelete, sendEditData, sendPrintData, ...props }) {
    const numberOfItemsPerPageList = [5, 10, 15];
    const [page, setPage] = useState(0);
    const [showView, setShowView] = useState(false);
    const [showViewId, setShowViewId] = useState('');

    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const from = page * numberOfItemsPerPage;
    var count = from + 1;
    const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);
    const navigation = useNavigation();
    const printitemsdata = async (account) => {
        sendPrintData(account)
    }
    const [firsttime, setfirstTime] = useState(true)
    

    useEffect(() => {
        if(firsttime){
            setShowView(false)
            setShowViewId('')
        }
    }, [])



    const tableRow = (orderdata) => (
        <View style={[styles.tableRow, { borderColor: showView && showViewId == orderdata.orderId ? '#407C6A' : '#F5F3F6' }]} >
            <DataTable.Row key={orderdata.orderId}>
                <DataTable.Cell style={styles.userssl}><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
                {orderdata.orderType == 'Dine-in' ?
                    <DataTable.Cell><Text style={styles.tableCell}>T{orderdata.items[0].tableNo}</Text></DataTable.Cell>
                    :
                    <DataTable.Cell><Text style={styles.tableCell}>{orderdata.items[0].tableNo}</Text></DataTable.Cell>
                }
                <DataTable.Cell><Text style={styles.tableCell}>{orderdata.orderNo}</Text></DataTable.Cell>
                <DataTable.Cell style={[styles.orderDate, styles.paddR15]}><Text style={styles.tableCell}>{moment(orderdata.orderDateTime).format('YYYY-MM-DD H:mm')}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>{orderdata.subTotal}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>{orderdata.orderType}</Text></DataTable.Cell>
                <DataTable.Cell>{orderdata.orderStatus == 'Completed' ? <View style={[styles.runningStatus, styles.ComplStatus]}><Text style={[styles.font12, styles.fontBold, styles.TextGreen]}>{orderdata.orderStatus}</Text></View> : ''}</DataTable.Cell>
                <DataTable.Cell style={[styles.orderAction, styles.justifyCenter]}>
                    <View style={[styles.tableButton]}>
                        <View>

                            {
                                showViewId != orderdata.orderId ?
                                    <TouchableOpacity style={styles.viewBtn} onPress={() => {
                                        setShowView(true)
                                        setShowViewId(orderdata.orderId)
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
                        <TouchableOpacity onPress={() => printitemsdata(orderdata)} style={[styles.editBtn]}>
                            <Image style={[styles.editIcon]}
                                source={(require('../assets/images/printer.png'))} />
                        </TouchableOpacity>
                    </View>
                </DataTable.Cell>
            </DataTable.Row>
            {
                showView && showViewId == orderdata.orderId &&
                <View style={styles.viewCon}>
                    <View style={styles.tableViewBorder}>
                        <View style={styles.ViewConBlk}>
                            <View style={[styles.viewCatView, styles.width33]}>
                                <Text style={styles.catName}>Order Number : </Text>
                                <Text style={styles.catValue}>{orderdata.orderNo}</Text>
                            </View>
                            <View style={[styles.viewCatView, styles.width33]}>
                                <Text style={styles.catName}>Order Status : </Text>
                                <Text style={styles.catValue}>{orderdata.orderStatus}</Text>
                            </View>
                            <View style={[styles.viewCatView, styles.width33]}>
                                <Text style={styles.catName}>Order Type : </Text>
                                <Text style={styles.catValue}>{orderdata.orderType}</Text>
                            </View>
                            <View style={[styles.ViewConBlk, styles.viewTable]}>
                                <DataTable.Header style={styles.viewTableHead}>
                                    <DataTable.Title><Text style={styles.catName}>Item Name  </Text></DataTable.Title>
                                    <DataTable.Title><Text style={styles.catName}>Quantity  </Text></DataTable.Title>
                                    <DataTable.Title> <Text style={styles.catName}>Amount  </Text></DataTable.Title>
                                </DataTable.Header>
                                {orderdata.length !== 0 &&
                                    orderdata.items.map((orderitem, index) => (
                                        <DataTable.Row style={styles.viewTableHead}>
                                            <DataTable.Cell><Text style={styles.catValue}>{orderitem.itemName}</Text></DataTable.Cell>
                                            <DataTable.Cell><Text style={styles.catValue}>{orderitem.orderQuantity}</Text></DataTable.Cell>
                                            <DataTable.Cell><Text style={styles.catValue}>{orderitem.itemAmount}</Text></DataTable.Cell>
                                        </DataTable.Row>
                                    ))
                                }
                                <DataTable.Row style={styles.viewTableHead}>
                                    <DataTable.Cell></DataTable.Cell>
                                    <DataTable.Cell><Text style={[styles.catValue, styles.fontBold]}>Sub Total</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={[styles.catValue, styles.fontBold]}>{orderdata.subTotal}</Text></DataTable.Cell>
                                </DataTable.Row>
                            </View>
                        </View>
                    </View>
                </View>
            }
        </View>
    );
    return (


        <DataTable {...props}>
            <DataTable.Header style={[styles.headerStyle]}>
                <DataTable.Title style={styles.userssl}><Text style={styles.tableHeader}>Sl .No</Text> </DataTable.Title>
                <DataTable.Title><Text style={styles.tableHeader}>Table Number</Text> </DataTable.Title>
                <DataTable.Title><Text style={styles.tableHeader}>Order Number</Text></DataTable.Title>
                <DataTable.Title style={[styles.orderDate, styles.paddR15]}><Text style={styles.tableHeader}>Order Date</Text></DataTable.Title>
                <DataTable.Title><Text style={styles.tableHeader}>Amount</Text></DataTable.Title>
                <DataTable.Title><Text style={styles.tableHeader}>Order Type</Text></DataTable.Title>
                <DataTable.Title><Text style={styles.tableHeader}>Status</Text></DataTable.Title>
                <DataTable.Title style={[styles.orderAction, styles.justifyCenter]}><Text style={styles.tableHeader}>Action</Text>
                </DataTable.Title>
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
    );
}