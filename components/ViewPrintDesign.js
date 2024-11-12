import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, TouchableOpacity, View, Text, Image } from "react-native";
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import Colors from '../screens/constants/colors';
import api from '../services/api/callingApi';
import styles from '../assets/css/style';
import { endPoint } from '../services/api/apiConstant';
import EditIcon from '../assets/images/editIcon.js'
import TableDelete from '../assets/images/table_delete.js'
import EyeIcon from '../assets/images/login_eye.js';
import DeleteImg from '../assets/images/Delete_img.js'
import Modal from "react-native-modal";


export default function ViewPrintDesign({ data, updateDelete, sendEditData, ...props }) {
    const optionsPerPage = [2, 3, 4];
    // const numberOfItemsPerPageList = [5, 10, 15];
    //Changes From Prajwala on 30-06-2023
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
    //Changes From Prajwala on 30-06-2023
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const form = page * numberOfItemsPerPage;
    var count = form + 1;
    const navigation = useNavigation();
    const [openDeleteSuccessMsg, setopenDeleteSuccessMsg] = useState(false);
    const [printDesignId, setPrintDesignId] = useState(null)
    useEffect(() => {
        setPage(0);
    }, [numberOfItemsPerPage]);


    const callDeleteApi = async (id) => {

        const jsonValue = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;

        const result = await api.DeleteMasterData(endPoint.DELETE_PRINTDESIGN + id, token);

        if ((result.success)) {
            setopenDeleteSuccessMsg(!openDeleteSuccessMsg)
            if ((data.length - 1) % 5 == 0) {
                setPage(page - 1)
              }
            // Toast.show("Print Design Deleted Successfully.");
            updateDelete()

        }
        else {
            // Add a Toast on screen.
            Toast.show("Some Error occured. Please try again.", {
                duration: Toast.durations.LONG,
            });
        }
    }
    
    const callPrintDesignEdit = async (PrintDesignData) => {
        sendEditData(PrintDesignData)
    }

    const resetDefaultValue =
        () => {
            setPage(0);
            setShowView(false);
            setShowViewId('')
        }

  // Delete Success msg 
  const successOpenDelete = (data) => {
    if(data?.activeStatus === true){
        Toast.show("Delete not possible..!! This is active design")
    }
    else{
        setopenDeleteSuccessMsg(!openDeleteSuccessMsg)
        setPrintDesignId(data?.id)
    }
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
            <TouchableOpacity style={styles.continueBtn} onPress={() => callDeleteApi(printDesignId)}>
              <Text style={[styles.textWhite, styles.font16]}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
    const tableRow = (PrintDesignData) => (
        <View style={[styles.tableRow, { borderColor: showView && showViewId == PrintDesignData.id ? '#407C6A' : '#F5F3F6' }]} >
            <DataTable.Row style={styles.datatableextraline} key={PrintDesignData.id}>
                <DataTable.Cell style={styles.userssl}><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>Design {count - 1}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>{PrintDesignData.activeStatus ? "Active" : "Deactivated"}</Text></DataTable.Cell>
                <DataTable.Cell style={[styles.justifyCenter]}>
                    <View style={styles.tableButton}>
                        <View>
                            {
                                showViewId != PrintDesignData.id ?
                                    <TouchableOpacity style={styles.viewBtn} onPress={() => {
                                        setShowView(true)
                                        setShowViewId(PrintDesignData.id)
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
                        <TouchableOpacity onPress={() => callPrintDesignEdit(PrintDesignData)} style={[styles.viewBtn, styles.editBtn]}>
                            <EditIcon />
                        </TouchableOpacity>
                        <Pressable onPress={() => successOpenDelete(PrintDesignData)} style={styles.editBtn}>
                            <TableDelete />
                        </Pressable>
                    </View>
                </DataTable.Cell>
            </DataTable.Row>
            {
                showView && showViewId == PrintDesignData.id &&
                <View style={styles.viewCon}>
                    <View style={[styles.tableViewBorder]}>
                        <View style={styles.ViewConBlk}>
                            <View style={styles.viewCatView}>
                                <Text style={styles.catName}>Header Name :</Text>
                                <Text style={styles.catValue}> {PrintDesignData.printHeaderSettings.headerDetails} </Text>
                            </View>
                            <View style={styles.viewCatView}>
                                <Text style={styles.catName}>Footer Name : </Text>
                                <Text style={styles.catValue}> {PrintDesignData.printFooderSettings.fooderDetails} </Text>
                            </View>
                            <View style={styles.viewCatView}>
                                <Text style={styles.catName}> Item Header Setting :</Text>
                                <Text style={styles.catValue}> {PrintDesignData.printItemHeaderSettings.amount} </Text>

                                <Text style={styles.catValue}> {PrintDesignData.printItemHeaderSettings.discount} </Text>
                                <Text style={styles.catValue}> {PrintDesignData.printItemHeaderSettings.item}  </Text>
                                <Text style={styles.catValue}> {PrintDesignData.printItemHeaderSettings.quantity} </Text>
                            </View>
                            <View style={styles.viewCatView}>
                                <Text style={styles.catName}> General Setting :</Text>
                                <Text style={styles.catValue}> {PrintDesignData.printGenerealSettings.customer} </Text>
                                <Text style={styles.catValue}> {PrintDesignData.printGenerealSettings.title} </Text>
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
            <DataTable.Header style={styles.headerStyle}>
                <DataTable.Title style={styles.userssl}><Text style={styles.tableHeader}>Sl .No</Text></DataTable.Title>
                <DataTable.Title><Text style={styles.tableHeader}>Print Designs</Text> </DataTable.Title>
                <DataTable.Title><Text style={styles.tableHeader}>Status</Text> </DataTable.Title>
                <DataTable.Title style={styles.justifyCenter}><Text style={styles.tableHeader}>Action</Text></DataTable.Title>
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
                label={`${form + 1}-${to} of ${data.length}`}
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
