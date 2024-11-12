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



// import { ScrollView } from 'react-native-gesture-handler';

export default function ViewPromoCode({ data, updateDelete, sendEditData, ...props }) {
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

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);
  //Delete popup alert
  const deleteAlert = (promocodeId) =>
    Alert.alert('Info', 'Are you sure you want to Delete PromoCode?', [
      {
        text: 'Cancel',
        onPress: () => {
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          callDeleteApi(promocodeId);
        },
      },
    ]);

  const callDeleteApi = async (promocodeId) => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;

    const result = await api.DeleteMasterData(endPoint.DELETE_PROMOCODE + promocodeId, token);

    if ((result.success)) {
      Toast.show("Promo Code Deleted Successfully.");
      updateDelete()

    }
    else {
      // Add a Toast on screen.
      Toast.show("Some Error occured. Please try again.", {
        duration: Toast.durations.LONG,
      });
    }
  }
  const callPromoCodeEdit = async (PromoCodeData) => {
    sendEditData(PromoCodeData)
  }
  const tableRow = (PromoCodeData) => (
    <View style={[styles.tableRow, { borderColor: showView && showViewId == PromoCodeData.promocodeId ? '#407C6A' : '#F5F3F6' }]} >
      <DataTable.Row key={PromoCodeData.promocodeId}>
        <DataTable.Cell><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{PromoCodeData.promocodeName}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{PromoCodeData.promocode}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{PromoCodeData.promocodeType}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{PromoCodeData.description}</Text></DataTable.Cell>
        <DataTable.Cell >
          <View style={styles.tableButton}>
            <View>
              {
                showViewId != PromoCodeData.promocodeId ?
                  <TouchableOpacity style={styles.viewBtn} onPress={() => {
                    setShowView(true)
                    setShowViewId(PromoCodeData.promocodeId)
                  }
                  }>
                    {/* <Ionicons name="eye-outline" color={Colors.labelColor} size={20} style={styles.viewIcon} /> */}
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


            <TouchableOpacity onPress={() => callPromoCodeEdit(PromoCodeData)} style={[styles.viewBtn, styles.editBtn]}>
              {/* <FontAwesome name="edit" color={Colors.labelColor} size={20}  /> */}
              <Image
                style={[styles.editIcon]}
                source={(require('../assets/images/edit_icon.png'))}
              />
            </TouchableOpacity>
            <Pressable onPress={() => deleteAlert(PromoCodeData.promocodeId)} style={styles.editBtn}>
              {/* <Ionicons name="trash-outline" color={Colors.labelColor} size={20} style={styles.DeleteIcon} /> */}
              <Image
                style={styles.DeleteIcon}
                source={(require('../assets/images/trash_icon.png'))}
              />
            </Pressable>
          </View>
        </DataTable.Cell>
      </DataTable.Row>
      {
        showView && showViewId == PromoCodeData.promocodeId &&
        <View style={styles.viewCon}>
          <View style={styles.ViewConBlk}>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Promocode Name :</Text>
              <Text style={styles.catValue}>{PromoCodeData.promocodeName}</Text>
            </View>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Promocode : </Text>
              <Text style={styles.catValue}>{PromoCodeData.promocode}</Text>
            </View>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Promocode Type :</Text>
              <Text style={styles.catValue}>{PromoCodeData.PromocodeType}</Text>
            </View>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Promocode Value :</Text>
              <Text style={styles.catValue}>{PromoCodeData.PromocodeValue}</Text>
            </View>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Description :</Text>
              <Text style={styles.catValue}>{PromoCodeData.description}</Text>
            </View>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Terms and Condiditions :</Text>
              <Text style={styles.catValue}>{PromoCodeData.termsAndConditions}</Text>
            </View>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Discount Notes :</Text>
              <Text style={styles.catValue}>{PromoCodeData.discountNotes}</Text>
            </View>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Discounted Amount :</Text>
              <Text style={styles.catValue}>{PromoCodeData.discountedAmount}</Text>
            </View>
          </View>
        </View>
      }
    </View>
  );

  return (

    <DataTable {...props}>
      <DataTable.Header>
        <DataTable.Title><Text style={styles.tableHeader}>Sl.No</Text> </DataTable.Title>
        <DataTable.Title><Text style={styles.tableHeader}>Promocode Name</Text> </DataTable.Title>
        <DataTable.Title><Text style={styles.tableHeader}>Promocode</Text> </DataTable.Title>
        <DataTable.Title><Text style={styles.tableHeader}>Promocode Type</Text> </DataTable.Title>
        <DataTable.Title><Text style={styles.tableHeader}>Description</Text> </DataTable.Title>
        <DataTable.Title><Text style={styles.tableHeader}>Action</Text> </DataTable.Title>
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