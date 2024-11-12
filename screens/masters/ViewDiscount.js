import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TouchableOpacity, View, Switch } from "react-native";
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
import TickIcon from '../../assets/images/tick_icon.js';


export default function TableViewDiscount({ data, updateDelete, sendEditData, ...props }) {
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
  const [discountStatus, setDiscountStatus] = useState()
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

  //Call Delete API
  const callDeleteApi = async (discountId) => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;

    const result = await api.DeleteMasterData(endPoint.DELETE_DISCONT + discountId, token);
    if (result.success) {
      setopenDeleteSuccessMsg(!openDeleteSuccessMsg)
      updateDelete()
    }
    else {
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
  const callDiscountEdit = async (discountData) => {
    sendEditData(discountData)
  }
  //Update Discount Status
  const updateDiscount = async (data) => {

    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    var myJson = {
      discountId: data.discountId,
      discountName: data.discountName,
      discountType: data.discountType,
      discountValue: data.discountValue,
      discoutNotes: data.discoutNotes,
      discountStatus: data.discountStatus,
      outletId: outletId,
    }
    const result = await api.UpdateMasterData(endPoint.EDIT_DISCOUNT + data.discountId, token, myJson);
  }

  //Show Discount List 
  const tableRow = (discountData) => (
    <View style={[styles.tableRow, { borderColor: showView && showViewId == discountData.discountId ? '#407C6A' : '#F5F3F6' }]} >
      <DataTable.Row style={styles.datatableextraline} key={discountData.discountId}>
        <DataTable.Cell style={styles.userssl}><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{discountData.discountName}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{discountData.discountType}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{discountData.discountValue}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{discountData.discoutNotes}</Text></DataTable.Cell>
        {/* <DataTable.Cell><View style={[styles.toggleButton, styles.toggleButtonActive]}>
          <View style={[styles.togglRound, styles.toogleRoundActive]}></View>
          </View></DataTable.Cell> */}
        <DataTable.Cell style={[styles.justifyCenter]}>
          <View style={styles.tableButton}>
            <View>
              {
                showViewId != discountData.discountId ?
                  <TouchableOpacity style={styles.viewBtn} onPress={() => {
                    setShowView(true)
                    setShowViewId(discountData.discountId)
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
            {/* Edit discount Popup starts  */}
            <TouchableOpacity onPress={() => callDiscountEdit(discountData)} style={[styles.viewBtn, styles.editBtn]}>
              <EditIcon />
            </TouchableOpacity>
            {/* Edit discount Popup ends  */}

            {/* discount delete Popup starts  */}
            <Pressable onPress={() => successOpenDelete(discountData.discountId)} style={styles.editBtn}>
              <TableDelete />
            </Pressable>
            {/* Discount delete Popup ends  */}
          </View>
        </DataTable.Cell>
      </DataTable.Row>
      {/* View Discount details starts  */}
      {
        showView && showViewId == discountData.discountId &&
        <View style={styles.viewCon}>
          <View style={[styles.tableViewBorder]}>
            <View style={styles.ViewConBlk}>
              <View style={styles.viewCatView}>
                <Text style={styles.catName}>Discount Name :</Text>
                <Text style={styles.catValue}>{discountData.discountName}</Text>
              </View>
              <View style={styles.viewCatView}>
                <Text style={styles.catName}>Discount Type : </Text>
                <Text style={styles.catValue}>{discountData.discountType}</Text>
              </View>
              <View style={styles.viewCatView}>
                <Text style={styles.catName}>Discount Value :</Text>
                <Text style={styles.catValue}>{discountData.discountValue}</Text>
              </View>
              <View style={styles.viewCatView}>
                <Text style={styles.catName}>Discount Notes :</Text>
                <Text style={styles.catValue}>{discountData.discoutNotes}</Text>
              </View>
              <View style={styles.viewCatView}>
                <Text style={styles.catName}>Dine In :</Text>
                {discountData.discountDineIn === true ?
                  <TickIcon /> : <View style={[styles.dangerIcon, styles.flexrow, styles.alignCenter, styles.justifyCenter]}>
                    <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon1} />
                    </View>}
              </View>
              <View style={styles.viewCatView}>
                <Text style={styles.catName}>Take Away :</Text>
                {discountData?.discountTakeAway === true ?
                  <TickIcon /> : <View style={[styles.dangerIcon, styles.flexrow, styles.alignCenter, styles.justifyCenter]}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon1} />
                  </View>} 
              </View>
              <View style={styles.viewCatView}>
                <Text style={styles.catName}>Online :</Text>
                {discountData?.discountEOrder === true ?
                  <TickIcon /> : <View style={[styles.dangerIcon, styles.flexrow, styles.alignCenter, styles.justifyCenter]}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon1} />
                  </View>}              
                  </View>
              <View style={styles.viewCatView}>
                <Text style={styles.catName}>On Total :</Text>
                {discountData?.discountOnTotal === true ?
                  <TickIcon /> : <View style={[styles.dangerIcon, styles.flexrow, styles.alignCenter, styles.justifyCenter]}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon1} />
                  </View>}              
                </View>

            </View>
          </View>
        </View>
      }
      {/* View Discount details ends  */}
    </View>
  );

  //-------------------------------------------- User Interface --------------------------------------------------------------------
  return (
    <View>
      <View>
        <DataTable {...props}>
          <DataTable.Header style={[styles.headerStyle]}>
            <DataTable.Title style={styles.userssl}><Text style={styles.tableHeader}>Sl.No</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Discount Name</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Discount Type</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Discount Value</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Discount Note</Text></DataTable.Title>
            {/* <DataTable.Title><Text style={styles.tableHeader}>Status</Text></DataTable.Title> */}
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