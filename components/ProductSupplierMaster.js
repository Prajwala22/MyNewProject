import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { DataTable } from 'react-native-paper';
import styles from '../assets/css/style';
import DeleteImg from '../assets/images/Delete_img.js';
import EditIcon from '../assets/images/editIcon.js';
import InternetDownIcon from '../assets/images/internet_down.js';
import TableDelete from '../assets/images/table_delete.js';
import api from '../services/api/callingApi';



export default function ProductSupplierMaster({ data, updateDelete, sendEditData, ...props }) {
  const numberOfItemsPerPageList = [5, 10, 15];
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

  const callDeleteApi = async (ProductSupplierId) => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;

    const result = await api.DeleteProductSupplierMaster(token, ProductSupplierId);
    if (result.success) {
      // Add a Toast on screen.
      // Toast.show('Stock Deleted Successfully', {
      //   duration: Toast.durations.LONG,
      // });
      setopenDeleteSuccessMsg(!openDeleteSuccessMsg)

      if ((data.length - 1) % 5 == 0) {
        setPage(page - 1)
      }
      updateDelete()
    } else {
      // Toast.show("Some Error occured. Please try again.");
      // successInternetdownOpen()

    }
  }

  // Delete Success msg 
  const successOpenDelete = (outletId) => {
    setopenDeleteSuccessMsg(!openDeleteSuccessMsg)
    setOutletId(outletId)
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

  const callStockEdit = async (stockData) => {
    sendEditData(stockData)
  }

  const tableRow = (account) => (
    <View style={[styles.tableRow, { borderColor: showView && showViewId == account._id ? '#407C6A' : '#F5F3F6' }]} >
      <DataTable.Row style={styles.datatableextraline} key={account._id}>
        <DataTable.Cell style={styles.userssl}><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
        <DataTable.Cell style={styles.productFlex}><Text style={styles.tableCell}>{account.productName}</Text></DataTable.Cell>
        <DataTable.Cell style={styles.productFlex}><Text style={styles.tableCell}>{account.supplierName}</Text></DataTable.Cell>
        <DataTable.Cell style={styles.unitflex1}><Text style={styles.tableCell}>{account.price}</Text></DataTable.Cell>
        <DataTable.Cell style={styles.unitflex1}><Text style={styles.tableCell}>{account.unit}</Text></DataTable.Cell>
        <DataTable.Cell style={styles.unitflex}><Text style={styles.tableCell}>{account.quantity}</Text></DataTable.Cell>
        <DataTable.Cell style={styles.qtyflex}><Text style={styles.tableCell}>{account.criticalQuantity}</Text></DataTable.Cell>
        <DataTable.Cell style={styles.qtyflex}><Text style={styles.tableCell}>{account.orderQuantity}</Text></DataTable.Cell>
        <View style={styles.InvenCreated}><Text style={styles.tableCell}>{moment(account.createdOn).format('YYYY-MM-DD H:mm')}</Text>
        </View>
        <DataTable.Cell style={[styles.orderAction, styles.justifyCenter]}>
          <View style={styles.tableButton}>
            <TouchableOpacity onPress={() => callStockEdit(account)} style={[styles.viewBtn, styles.editBtn]}>
              <EditIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => successOpenDelete(account._id)} style={styles.editBtn}>
              <TableDelete />
            </TouchableOpacity>
          </View>
        </DataTable.Cell>

      </DataTable.Row>

    </View>
  );

  return (
    <View>
      <View>
        <DataTable {...props}>
          <DataTable.Header style={[styles.headerStyle]}>
            <DataTable.Title style={styles.userssl}><Text style={styles.tableHeader}>Sl .No</Text> </DataTable.Title>
            <DataTable.Title style={styles.productFlex}><Text style={styles.tableHeader}>Product Name </Text> </DataTable.Title>
            <DataTable.Title style={styles.productFlex}><Text style={styles.tableHeader}>Supplier Name</Text></DataTable.Title>
            <DataTable.Title style={styles.unitflex1}><Text style={styles.tableHeader}>Price</Text></DataTable.Title>
            <DataTable.Title style={styles.unitflex1}><Text style={styles.tableHeader}>Unit</Text></DataTable.Title>
            <DataTable.Title style={styles.unitflex}><Text style={styles.tableHeader}>Quantity</Text></DataTable.Title>
            <DataTable.Title style={styles.qtyflex}><Text style={styles.tableHeader}>Critical Qty</Text></DataTable.Title>
            <DataTable.Title style={styles.qtyflex}><Text style={styles.tableHeader}>Order Qty</Text></DataTable.Title>
            <DataTable.Title style={styles.InvenCreated}><Text style={styles.tableHeader}>Created On</Text></DataTable.Title>
            <DataTable.Title style={[styles.orderAction, styles.justifyCenter]}><Text style={styles.tableHeader}>Action</Text> </DataTable.Title>
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
