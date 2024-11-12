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
import DeleteImg from '../assets/images/Delete_img.js'
import { endPoint } from '../services/api/apiservice';
import Modal from "react-native-modal";
import { constRoleId } from "../screens/common/RoleConstants"
import CompleteActionImg from '../assets/images/completed_icon.js'



export default function OrdersListView({ data, updateDelete, sendVoidOrderdData, ...props }) {
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

  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  var count = from + 1;

  const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);
  const navigation = useNavigation();
  const [outletId, setOutletId] = useState(null)
  const [openDeleteSuccessMsg, setopenDeleteSuccessMsg] = useState(false);
  // const loginRoleId = await AsyncStorage.getItem('userRoleId')
  const [roleId, setRoleId] = useState('')
  useEffect(() => {
    async function userRoleId() {
      const userRoleId = await AsyncStorage.getItem('userRoleId')
      setRoleId(userRoleId)
    }
    userRoleId()
  });
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
  //Calling Delete API
  const callDeleteApi = async (orderId) => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;

    const result = await api.DeleteMasterData(endPoint.DELETE_ORDER + orderId, token);
    if (result.success) {
      // Toast.show('Discount deleted Successfully', {
      //   duration: Toast.durations.LONG,
      // });
      setopenDeleteSuccessMsg(!openDeleteSuccessMsg)
      updateDelete()
    }
    else {
      // Add a Toast on screen.
      // Toast.show("Some Error occured. Please try again.", {
      //   duration: Toast.durations.LONG,
      // });
      // successInternetdownOpen()
    }
  }

  const callVoidPasswordPop = async (account) => {
    sendVoidOrderdData(account)
  }
  // Delete Success msg 
  const successOpenDelete = (orderId) => {
    setopenDeleteSuccessMsg(!openDeleteSuccessMsg)
    setOutletId(orderId)
  }
  //    delete popup
  const SuccessUpdatePopup = () => {
    return (
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
          <View>
            <Image source={(require("../assets/images/trash_00000.gif"))} style={[styles.trashGif]} />
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
  const callDiscountEdit = async (discountData) => {
    sendEditData(discountData)
  }

  //Complete Order API Calling
  const callCompleteOrderApi = async (orderId) => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let Itemstatus = "Completed"
    let myJson = orderId
    const result = await api.changeOrderStatus(orderId, Itemstatus, myJson, token)
    if (result.success) {
      Toast.show('Order status changed Successfully!', {
        duration: Toast.durations.LONG,
      });
      updateDelete();
    }
    else {
      Toast.show('Something went wrong. please try again later')
    }
  }


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
<DataTable.Cell>
  <Text style={styles.tableCell}>
    {orderdata.orderType === "Walk-in" ? "Take Away" : orderdata.orderType}
  </Text>
</DataTable.Cell>    
    <DataTable.Cell><View style={[styles.runningStatus]}><Text style={[styles.font12, styles.fontBold, styles.redText]}>{orderdata.orderStatus}</Text></View></DataTable.Cell>
        <DataTable.Cell style={[styles.orderAction, styles.justifyCenter]}>
          <View style={styles.tableButton}>
            <View>

              {
                showViewId != orderdata.orderId ?
                  <TouchableOpacity onPress={() => {
                    setShowView(true)
                    setShowViewId(orderdata.orderId)
                  }
                  }>
                    <Ionicons name="eye-outline" color={Colors.labelColor} size={20} style={styles.viewIcon} />
                    {/* <Image
                      style={styles.viewIcon}
                      source={(require('../assets/images/eye_icon.png'))}
                    /> */}
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => {
                    setShowView(false)
                    setShowViewId('')
                  }
                  }>
                    <Ionicons name="eye-off-outline" color={Colors.labelColor} size={20} style={styles.viewIcon} />

                  </TouchableOpacity>
              }
            </View>
            {roleId === constRoleId.COMPANY_ADMIN_ID ?
              <Pressable onPress={() => callVoidPasswordPop(orderdata)} style={styles.editBtn}>
                <Image
                  style={styles.DeleteIcon}
                  source={(require('../assets/images/trash_icon.png'))}
                />
              </Pressable> :
              <Pressable onPress={() => successOpenDelete(orderdata.orderId)} style={styles.editBtn}>
                <Image
                  style={styles.DeleteIcon}
                  source={(require('../assets/images/trash_icon.png'))}
                />
              </Pressable>
            }
            {/* {
                orderdata.orderType === "Walk-in" || orderdata.orderType === "Online" ?
                  <View>
                    <Pressable onPress={() => successOpenDelete(orderdata.orderId)} style={styles.editBtn}>
                      <Image
                        style={styles.DeleteIcon}
                        source={(require('../assets/images/edit_icon.png'))}
                      />
                    </Pressable>
                  </View> : null

              } */}
            {orderdata.orderType === "Walk-in" || orderdata.orderType === "Online" && orderdata.isPaid ?
              <Pressable onPress={() => callCompleteOrderApi(orderdata.orderId)} style={styles.editBtn}>
                <CompleteActionImg />
              </Pressable> :
              null
            }
          </View>
        </DataTable.Cell>
      </DataTable.Row>
      {
        showView && showViewId == orderdata.orderId &&
        <View style={styles.viewCon}>
          <View style={[styles.tableViewBorder]}>
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
                <DataTable.Header style={[styles.viewTableHead]}>
                  <DataTable.Title><Text style={[styles.catName,{lineHeight: 20,}]}>Item Name</Text></DataTable.Title>
                  <DataTable.Title><Text style={[styles.catName,{lineHeight: 20,}]}>Quantity</Text></DataTable.Title>
                  <DataTable.Title> <Text style={[styles.catName,{lineHeight: 20,}]}>Amount</Text></DataTable.Title>
                </DataTable.Header>

                {orderdata.length !== 0 &&
                  orderdata.items.map((orderitem, index) => (
                    <DataTable.Row style={styles.viewTableHead}>
                      <DataTable.Cell><Text style={styles.catValue}>{orderitem.itemName}</Text></DataTable.Cell>
                      <DataTable.Cell><Text style={styles.catValue}>{orderitem.orderQuantity}</Text></DataTable.Cell>
                      <DataTable.Cell><Text style={styles.catValue}>{orderitem.itemAmount}</Text></DataTable.Cell>
                    </DataTable.Row>
                  ))}
                <DataTable.Row style={styles.viewTableHead}>
                  <DataTable.Cell><Text style={styles.catValue}></Text></DataTable.Cell>
                  <DataTable.Cell><Text style={[styles.catValue, styles.fontBold]}>SubTotal</Text></DataTable.Cell>
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
    <View>
      <View>
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

          {/* <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(data.length / numberOfItemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${data.length}`}
            showFastPaginationControls
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={numberOfItemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            selectPageDropdownLabel={'Rows per page'}
          /> */}
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