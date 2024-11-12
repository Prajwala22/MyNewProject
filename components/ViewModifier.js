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
import Modal from "react-native-modal";
import DeleteImg from '../assets/images/Delete_img.js';



export default function ViewModifier({ data, updateDelete, sendEditData, ...props }) {
  // const numberOfItemsPerPageList = [5, 10, 15];
  const [numberOfItemsPerPageList, setNumberOfItemsPerPageList] = useState([]);
  const [showView, setShowView] = useState(false);
  const [showViewId, setShowViewId] = useState('');
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
    setShowView(false)
    setShowViewId('')
    if (!numberOfItemsPerPageList.includes(numberOfItemsPerPage)) {
      onItemsPerPageChange(numberOfItemsPerPageList[0]);
    }
  }, [numberOfItemsPerPageList]);
  const [page, setPage] = useState(0);

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
  }, [numberOfItemsPerPage]);

  //Delete popup alert
  const deleteAlert = (id) =>
    Alert.alert('Info', 'Are you sure you want to Delete Modifier Group?', [
      {
        text: 'Cancel',
        onPress: () => {
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {

          callDeleteApi(id);
        },
      },
    ]);

  const callDeleteApi = async (id) => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    const result = await api.DeleteMasterData(endPoint.DELETE_MODIFIER + id, token);

    if ((result.success)) {
      // Toast.show("Modifier Group Deleted Successfully.");
      setopenDeleteSuccessMsg(!openDeleteSuccessMsg)
      if ((data.length - 1) % 5 == 0) {
        setPage(page - 1)
      }
      updateDelete()
    }
    else {
      // Add a Toast on screen.
      Toast.show("Some Error occured. Please try again.", {
        duration: Toast.durations.LONG,
      });
    }
  }

  const callModifierEdit = async (ModifierGroupData) => {
    sendEditData(ModifierGroupData)
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
  const tableRow = (ModifierGroupData) => (
    <View style={[styles.tableRow, { borderColor: showView && showViewId == ModifierGroupData.id ? '#407C6A' : '#F5F3F6' }]} >
      <DataTable.Row style={styles.datatableextraline} key={ModifierGroupData.id}>
        <DataTable.Cell><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{ModifierGroupData.groupName}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{ModifierGroupData.description}</Text></DataTable.Cell>
        <DataTable.Cell >
          <View style={styles.tableButton}>
            <View>
              {
                showViewId != ModifierGroupData.id ?
                  <TouchableOpacity style={styles.viewBtn} onPress={() => {
                    setShowView(true)
                    setShowViewId(ModifierGroupData.id)
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


            <TouchableOpacity onPress={() => callModifierEdit(ModifierGroupData)} style={[styles.viewBtn, styles.editBtn]}>
              <Image
                style={[styles.editIcon]}
                source={(require('../assets/images/edit_icon.png'))}
              />
            </TouchableOpacity>
            <Pressable onPress={() => successOpenDelete(ModifierGroupData.id)} style={styles.editBtn}>
              <Image
                style={styles.DeleteIcon}
                source={(require('../assets/images/trash_icon.png'))}
              />
            </Pressable>
          </View>
        </DataTable.Cell>
      </DataTable.Row>
      {
        showView && showViewId == ModifierGroupData.id &&
        <View style={styles.viewCon}>
          <View style={styles.ViewConBlk}>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Group Name :</Text>
              <Text style={styles.catValue}>{ModifierGroupData.groupName}</Text>
            </View>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Description : </Text>
              <Text style={styles.catValue}>{ModifierGroupData.description}</Text>
            </View>
            {
              ModifierGroupData.modifierItems.map((el, i) => (
                <>
                  <View style={styles.viewCatView}>
                    <Text style={styles.catName}>Item From :</Text>
                    <Text style={styles.catValue}>{el.itemFrom}</Text>
                  </View>
                  {/* <View style={styles.viewCatView}>
                    <Text style={styles.catName}>Item Id :</Text>
                    <Text style={styles.catValue}>{el.itemId}</Text>
                  </View> */}
                  <View style={styles.viewCatView}>
                    <Text style={styles.catName}>Item Name :</Text>
                    <Text style={styles.catValue}>{el.itemName}</Text>
                  </View>
                  <View style={styles.viewCatView}>
                    <Text style={styles.catName}>Price :</Text>
                    <Text style={styles.catValue}>{el.price}</Text>
                  </View>
                </>
              ))
            }

          </View>
        </View>
      }
    </View>
  );


  return (
    <ScrollView >
    <View>
     
        <DataTable {...props}>
          <DataTable.Header>
            <DataTable.Title><Text style={styles.tableHeader}>Sl.No</Text> </DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Modifier Name</Text> </DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Description</Text> </DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Action</Text> </DataTable.Title>
          </DataTable.Header>

            {data
              .slice(
                page * numberOfItemsPerPage,
                page * numberOfItemsPerPage + numberOfItemsPerPage
              )
              .map((row) => tableRow(row))}

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
     
      {openDeleteSuccessMsg &&
        <Modal isVisible={openDeleteSuccessMsg}>
          {SuccessUpdatePopup()}
        </Modal>
      }
    </View>
    </ScrollView>
  );

}
