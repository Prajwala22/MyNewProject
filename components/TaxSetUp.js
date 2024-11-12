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



export default function TableViewTaxSetUp({ data, sendEditData, updateDelete, ...props }) {

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
  const callTaxSetUpEdit = async (taxSetUpData) => {
    sendEditData(taxSetUpData)
  }
  const deleteAlert = (id) =>
    Alert.alert('Info', 'Are you sure you want to Delete Tax SetUp?', [
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

    const result = await api.DeleteMasterData(endPoint.DELETE_TAXSETUP + id, token);
    if (result.success) {
      Toast.show('TaxSetUp Deleted Successfully', {
        duration: Toast.durations.LONG,
      });
      updateDelete()
    }
    else {
      // Add a Toast on screen.
      Toast.show("Some Error occured. Please try again.", {
        duration: Toast.durations.LONG,
      });
    }
  }

  const tableRow = (taxSetUpData) => (
    <View style={[styles.tableRow, { borderColor: showView && showViewId == taxSetUpData.id ? '#407C6A' : '#F5F3F6' }]} >
      <DataTable.Row style={styles.datatableextraline} key={taxSetUpData.id}>
        <DataTable.Cell style={styles.userssl}><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{taxSetUpData.outletName}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{JSON.stringify(taxSetUpData.isItemIncludeTax)}</Text></DataTable.Cell>

        <DataTable.Cell >
          <View style={styles.tableButton}>
            <View>
              {
                showViewId != taxSetUpData.id ?
                  <TouchableOpacity style={styles.viewBtn} onPress={() => {
                    setShowView(true)
                    setShowViewId(taxSetUpData.id)
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


            <TouchableOpacity onPress={() => callTaxSetUpEdit(taxSetUpData)} style={[styles.viewBtn, styles.editBtn]}>
              <Image
                style={[styles.editIcon]}
                source={(require('../assets/images/edit_icon.png'))}
              />
            </TouchableOpacity>
            <Pressable onPress={() => deleteAlert(taxSetUpData.id)} style={styles.editBtn}>
              <Image
                style={styles.DeleteIcon}
                source={(require('../assets/images/trash_icon.png'))}
              />
            </Pressable>
          </View>
        </DataTable.Cell>
      </DataTable.Row>
      {
        showView && showViewId == taxSetUpData.id &&
        <View style={styles.viewCon}>
          <View style={styles.ViewConBlk}>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Outlet Name :</Text>
              <Text style={styles.catValue}>{taxSetUpData.outletName}</Text>
            </View>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Percentage : </Text>
              <Text style={styles.catValue}>{taxSetUpData.percentage}</Text>
            </View>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Is Item Include Tax : </Text>
              <Text style={styles.catValue}>{JSON.stringify(taxSetUpData.isItemIncludeTax)}</Text>
            </View>
            <View style={styles.viewCatView}>
              <Text style={styles.catName}>Subtract from sub total : </Text>
              <Text style={styles.catValue}>{JSON.stringify(taxSetUpData.isSubtractFromSubTotal)}</Text>
            </View>
          </View>
        </View>
      }
    </View>
  );

  return (

    <DataTable {...props}>
      <DataTable.Header>
        <DataTable.Title style={styles.userssl}><Text style={styles.tableHeader}>Sl.No</Text></DataTable.Title>
        <DataTable.Title><Text style={styles.tableHeader}>Outlet Name</Text></DataTable.Title>
        <DataTable.Title><Text style={styles.tableHeader}>Item Included</Text></DataTable.Title>
        <DataTable.Title><Text style={styles.tableHeader}>Action</Text></DataTable.Title>

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