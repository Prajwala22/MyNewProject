import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { DataTable } from 'react-native-paper';
import styles from '../assets/css/style';
import DeleteImg from '../assets/images/Delete_img.js';
import InternetDownIcon from '../assets/images/internet_down.js';
import EyeIcon from '../assets/images/login_eye.js';
import Colors from '../screens/constants/colors';
import { endPoint } from '../services/api/apiConstant';
import api from '../services/api/callingApi';


export default function TableViewRoleList({ data, sendEditData, updateDelete, ...props }) {

  const numberOfItemsPerPageList = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [showView, setShowView] = useState(false);
  const [showViewId, setShowViewId] = useState('');
  const [openDeleteSuccessMsg, setopenDeleteSuccessMsg] = useState(false);
  const [outletId, setOutletId] = useState(null)
  const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
  const [userRoleId, setuserRoleId] = useState('')
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  var count = from + 1;
  const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);
  const navigation = useNavigation();

  //get User Information
  useEffect(async () => {
    setPage(0);
    const userRoleId = await AsyncStorage.getItem('userRoleId')
    setuserRoleId(userRoleId)
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
  const callRoleEdit = async (roleData) => {
    sendEditData(roleData)
  }
  //DELETE ALERT
  // const deleteAlert = (roleId) =>
  //   Alert.alert('Info', 'Are you sure you want to Delete Role?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => {
  //       },
  //       style: 'cancel',
  //     },
  //     {
  //       text: 'OK',
  //       onPress: () => {
  //         callDeleteApi(roleId);
  //       },
  //     },
  //   ]);
  //DELETE ROLE API
  const callDeleteApi = async (roleId) => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;

    const result = await api.DeleteMasterData(endPoint.DELETE_ROLE + roleId, token);
    if (result.success) {
      setopenDeleteSuccessMsg(!openDeleteSuccessMsg)

      if ((data.length - 1) % 5 == 0) {
        setPage(page - 1)
      }
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
  //   internet down popup - Ends

  const tableRow = (roleData) => (
    <View style={[styles.tableRow, { borderColor: showView && showViewId == roleData.roleId ? '#407C6A' : '#F5F3F6' }]} >
      <DataTable.Row style={styles.datatableextraline} key={roleData.roleId}>
        <DataTable.Cell style={styles.userssl}><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
        <DataTable.Cell style={styles.statusNameCode}><Text style={styles.tableCell}>{roleData.roleName}</Text></DataTable.Cell>
        <DataTable.Cell style={[styles.StatusDes, styles.paddR25]}><Text style={styles.tableCell}>{roleData.description}</Text></DataTable.Cell>
        <DataTable.Cell style={[styles.justifyCenter]}>
          <View style={styles.tableButton}>
            <View>
              {
                showViewId != roleData.roleId ?
                  <TouchableOpacity onPress={() => {
                    setShowView(true)
                    setShowViewId(roleData.roleId)
                    navigation.navigate('ViewFormAccess', roleData)
                  }
                  }>
                    <EyeIcon />
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
          </View>
        </DataTable.Cell>
      </DataTable.Row>
      {/* {
        showView && showViewId == roleData.roleId &&
        <View style={styles.viewCon}>
          <View style={[styles.tableViewBorder]}>
            <View style={styles.ViewConBlk}>
              <View style={styles.viewCatView}>
                <Text style={styles.catName}>Role Name : </Text>
                <Text style={styles.catValue}>{roleData.roleName}</Text>
              </View>
              <View style={styles.viewCatView}>
                <Text style={styles.catName}>Description : </Text>
                <Text style={styles.catValue}>{roleData.description}</Text>
              </View>
            </View>
          </View>
        </View>
      } */}
    </View>
  );

  //----------------------------------------------------------- User Interface -----------------------------------------------------
  return (
    <View>
      <View>
        <DataTable {...props}>
          <DataTable.Header style={[styles.headerStyle]}>
            <DataTable.Title style={styles.userssl}><Text style={styles.tableHeader}>Sl.No</Text> </DataTable.Title>
            <DataTable.Title style={styles.statusNameCode}><Text style={styles.tableHeader}>Role Name</Text> </DataTable.Title>
            <DataTable.Title style={[styles.StatusDes, styles.paddR25]}><Text style={styles.tableHeader}>Description</Text></DataTable.Title>
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