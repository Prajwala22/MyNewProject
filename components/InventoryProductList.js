import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import styles from '../assets/css/style';
import Colors from '../screens/constants/colors';
import api from '../services/api/callingApi';
import Modal from "react-native-modal";
import DeleteImg from '../assets/images/Delete_img.js'
import InternetDownIcon from '../assets/images/internet_down.js'
import EditIcon from '../assets/images/editIcon.js'
import TableDelete from '../assets/images/table_delete.js'
import EyeIcon from '../assets/images/login_eye.js';



export default function InventoryProductList({ data, updateDelete, sendEditData, ...props }) {
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

  const callDeleteApi = async (ProductId) => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;

    const result = await api.DeleteProduct(token, ProductId);
    if (result.success) {
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
  const callProductEdit = async (productData) => {
    sendEditData(productData)
  }
  const tableRow = (account) => (
    <View style={[styles.tableRow, { borderColor: showView && showViewId == account.productId ? '#407C6A' : '#F5F3F6' }]} >
      <DataTable.Row style={styles.datatableextraline} key={account.productId}>
        <DataTable.Cell style={styles.userssl}><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{account?.productName}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{account?.unit}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{account?.wMData?.productCode}</Text></DataTable.Cell>
        {/* <DataTable.Cell><Text style={styles.tableCell}>{account?.wMData?.supplierProductCode}</Text></DataTable.Cell> */}
        <DataTable.Cell><Text style={styles.tableCell}>{account?.wMData?.categoryName}</Text></DataTable.Cell>
        {/* <DataTable.Cell><Text style={styles.tableCell}>{account?.wMData?.subCategoryName}</Text></DataTable.Cell> */}
        <DataTable.Cell style={[styles.justifyCenter]}>
          <View style={styles.tableButton}>
            <View>
              {
                showViewId != account.productId ?
                  <TouchableOpacity style={styles.viewBtn} onPress={() => {
                    setShowView(true)
                    setShowViewId(account.productId)
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


            <TouchableOpacity onPress={() => callProductEdit(account)} style={[styles.viewBtn, styles.editBtn]}>
              <EditIcon />
            </TouchableOpacity>
            <Pressable onPress={() => successOpenDelete(account.productId)} style={styles.editBtn}>
              <TableDelete />
            </Pressable>
          </View>
        </DataTable.Cell>
      </DataTable.Row>
      {
        showView && showViewId == account.productId &&
        <View style={styles.viewCon}>
          <View style={[styles.tableViewBorder]}>
            <View style={styles.ViewConBlk}>
              <View style={styles.viewCatView}>
                <Text style={styles.catName}>Product Name : </Text>
                <Text style={styles.catValue}>{account?.productName}</Text>
              </View>
              <View style={styles.viewCatView}>
                <Text style={styles.catName}>Product Code : </Text>
                <Text style={styles.catValue}>{account?.wMData?.productCode}</Text>
              </View>
              <View style={styles.viewCatView}>
                <Text style={styles.catName}>Category Name : </Text>
                <Text style={styles.catValue}>{account?.wMData?.categoryName}</Text>
              </View>
              <View style={styles.viewCatView}>
                <Text style={styles.catName}>SubCategory Name : </Text>
                <Text style={styles.catValue}>{account?.wMData?.subCategoryName}</Text>
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
            <DataTable.Title><Text style={styles.tableHeader}>Product Name </Text> </DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Unit</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Product Code</Text></DataTable.Title>
            {/* <DataTable.Title><Text style={styles.tableHeader}>supplierProductCode</Text></DataTable.Title> */}
            <DataTable.Title><Text style={styles.tableHeader}>Category Name</Text></DataTable.Title>
            {/* <DataTable.Title><Text style={styles.tableHeader}>subCategoryName</Text></DataTable.Title> */}
            <DataTable.Title style={[styles.justifyCenter]}><Text style={styles.tableHeader}>Action</Text></DataTable.Title>
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
