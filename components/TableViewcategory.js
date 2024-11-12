import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import styles from '../assets/css/style';
import Colors from '../screens/constants/colors';
import { endPoint } from '../services/api/apiConstant';
import api from '../services/api/callingApi';
import DeleteImg from '../assets/images/Delete_img.js';
import Modal from "react-native-modal";



export default function TableViewcategory({ data, updateDelete, sendEditData, ...props }) {
  // const numberOfItemsPerPageList = [5, 10, 15];
  const [numberOfItemsPerPageList, setNumberOfItemsPerPageList] = useState([]);
  useEffect(() => {
    const generateNumberOfItemsPerPageList = () => {
      const newList = [5, 10, 15]; // Only include 5, 10, and 15 in the list;
      setNumberOfItemsPerPageList(newList);
    };

    generateNumberOfItemsPerPageList();
  }, [data]);

  useEffect(() => {
    if (!numberOfItemsPerPageList.includes(numberOfItemsPerPage)) {
      onItemsPerPageChange(numberOfItemsPerPageList[0]);
    }
  }, [numberOfItemsPerPageList]);
  const [page, setPage] = useState(0);
  const [showView, setShowView] = useState(false);
  const [showViewId, setShowViewId] = useState('');
  // const [countIndex,setCountIndex] = useState(1)
  const [openDeleteSuccessMsg, setopenDeleteSuccessMsg] = useState(false);
  const [outletId, setOutletId] = useState(null)

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

  //Delete popup alert
  const deleteAlert = (categoryId) =>
    Alert.alert('Info', 'Are you sure you want to Delete Category?', [
      {
        text: 'Cancel',
        onPress: () => {
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          callDeleteApi(categoryId);
        },
      },
    ]);

  const callItemCategory = async (categoryId) => {
    await AsyncStorage.setItem('categoryIdItem', categoryId)
    navigation.navigate('Items')
  }

  const callDeleteApi = async (categoryId) => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;

    const result = await api.DeleteMasterData(endPoint.DELETE_CATEGORY + categoryId, token);
    if (result.success) {
      // Add a Toast on screen.
      // Toast.show('Category Deleted Successfully', {
      //   duration: Toast.durations.LONG,
      // });
      setopenDeleteSuccessMsg(!openDeleteSuccessMsg)
      if ((data.length - 1) % 5 == 0) {
        setPage(page - 1)
      }
      updateDelete()
    } else {
      Toast.show("Some Error occured. Please try again.");

    }
  }

  const callCategoryEdit = async (account) => {
    sendEditData(account)
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
  const tableRow = (account, index) => (
    <View style={[styles.tableRow, { borderColor: showView && showViewId == account.categoryId ? '#407C6A' : '#F5F3F6' }]} >
      <DataTable.Row style={styles.datatableextraline} key={account.categoryId}>
        <DataTable.Cell style={styles.userssl}><Text style={styles.tableCell}>{index}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{account.categoryName}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{account.categoryCode}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{account.location}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{account.description}</Text></DataTable.Cell>
        <DataTable.Cell >
          <View style={styles.tableButton}>
            <View>
              {
                showViewId != account.categoryId ?
                  <TouchableOpacity style={styles.viewBtn} onPress={() => {
                    setShowView(true)
                    setShowViewId(account.categoryId)
                  }
                  }>
                    <Image
                      style={styles.viewIcon}
                      source={(require('../assets/images/eye_icon.png'))}
                    />
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


            <TouchableOpacity onPress={() => callCategoryEdit(account)} style={[styles.viewBtn, styles.editBtn]}>
              <Image
                style={[styles.editIcon]}
                source={(require('../assets/images/edit_icon.png'))}
              />
            </TouchableOpacity>
            <Pressable onPress={() => successOpenDelete(account.categoryId)} style={styles.editBtn}>
              <Image
                style={styles.DeleteIcon}
                source={(require('../assets/images/trash_icon.png'))}
              />
            </Pressable>
          </View>
        </DataTable.Cell>
      </DataTable.Row>
      {
        showView && showViewId == account.categoryId &&
        <View style={styles.viewCon}>
          <View style={styles.ViewConBlk}>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Category Name :</Text>
              <Text style={styles.catValue}>{account.categoryName}</Text>
            </View>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Category Code : </Text>
              <Text style={styles.catValue}>{account.categoryCode}</Text>
            </View>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Category Location :</Text>
              <Text style={styles.catValue}>{account.location}</Text>
            </View>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Category Description :</Text>
              <Text style={styles.catValue}>{account.description}</Text>
            </View>

            <View style={styles.viewCatView}>
              <TouchableOpacity onPress={() => callItemCategory(account.categoryId)}>
                <Text style={styles.catName}>Items</Text>
              </TouchableOpacity>
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
          <DataTable.Header>
            <DataTable.Title style={styles.userssl}><Text style={styles.tableHeader}>Sl .No</Text> </DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Category Name</Text> </DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Category Code</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Location</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Description</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Action</Text></DataTable.Title>
          </DataTable.Header>

          <ScrollView >
            {data
              .slice(
                page * numberOfItemsPerPage,
                page * numberOfItemsPerPage + numberOfItemsPerPage
              )
              .map((row, index) => tableRow(row, index + 1))}

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
