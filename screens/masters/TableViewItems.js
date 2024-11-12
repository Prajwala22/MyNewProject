import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import styles from '../../assets/css/style';
import Colors from '../constants/colors';
import Modifiers from './Modifiers';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';

// import { ScrollView } from 'react-native-gesture-handler';

export default function TableViewItems({ data, updateDelete, sendEditData, sendModifiersData, ...props }) {

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

    //Delete popup alert
    const deleteAlert = (categoryId) =>
        Alert.alert('Info', 'Are you sure you want to Delete Item?', [
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

    const callDeleteApi = async (itemsId) => {
        const jsonValue = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        const result = await api.DeleteMasterData(endPoint.DELETE_ITEMS + itemsId, token);
        if (result.success) {
            // Add a Toast on screen.
            Toast.show('Item Deleted Successfully', {
                duration: Toast.durations.LONG,
            });

            if ((data.length - 1) % 5 == 0) {
                setPage(page - 1)
            }
            updateDelete()
        } else {

            Toast.show("Some Error occured. Please try again.");
            setDataPreset(false);
        }
    }

    const callCategoryEdit = async (account) => {
        sendEditData(account)
    }
    const callAddModifiers = async (Modifiers) => {
        sendModifiersData(Modifiers.id)
    }
    const onOpenEyePress = (Id) => {
        setShowView(true)
        setShowViewId(Id)
    }
    const onCloseEyePress = () => {
        setShowView(false)
        setShowViewId('')
    }

    const tableRow = (account) => (
        <View style={[styles.tableRow, { borderColor: showView && showViewId == account.id ? '#407C6A' : '#F5F3F6' }]} >
            <DataTable.Row style={styles.datatableextraline} key={account.id}>
                <DataTable.Cell><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>{account.itemName}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>{account.categoryName}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>{account.description}</Text></DataTable.Cell>
                <DataTable.Cell >
                    <View style={styles.tableButton}>
                        <View>
                            {
                                showViewId != account.id ?
                                    <TouchableOpacity style={styles.viewBtn} onPress={() => {
                                        setShowView(true)
                                        setShowViewId(account.id)
                                    }
                                    }>
                                        <Image
                                            style={styles.viewIcon}
                                            source={(require('../../assets/images/eye_icon.png'))}
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
                        <TouchableOpacity onPress={() => callAddModifiers(Modifiers)} style={[styles.viewBtn, styles.editBtn]}>
                            <Image
                                style={styles.modiIcon}
                                source={(require('../../assets/images/add-comment.png'))}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => callCategoryEdit(account)} style={[styles.viewBtn, styles.editBtn]}>
                            <Image
                                style={styles.editIcon}
                                source={(require('../../assets/images/edit_icon.png'))}
                            />
                        </TouchableOpacity>
                        <Pressable onPress={() => deleteAlert(account.id)} style={styles.editBtn}>
                            <Image
                                style={styles.DeleteIcon}
                                source={(require('../../assets/images/trash_icon.png'))}
                            />
                        </Pressable>
                    </View>
                </DataTable.Cell>
            </DataTable.Row>
            {
                showView && showViewId == account.id &&
                <View style={styles.viewCon}>
                    <View style={styles.ViewConBlk}>
                        <View style={styles.viewCatView}>
                            <Text style={styles.catName}>Item Name:</Text>
                            <Text style={styles.catValue}>{account.itemName}</Text>
                        </View>
                        <View style={styles.viewCatView}>
                            <Text style={styles.catName}>Category Name: </Text>
                            <Text style={styles.catValue}>{account.categoryName}</Text>
                        </View>
                        <View style={styles.viewCatView}>
                            <Text style={styles.catName}>Item Description:</Text>
                            <Text style={styles.catValue}>{account.description}</Text>
                        </View>
                    </View>
                </View>
            }
        </View>
    );

    return (

        <DataTable {...props}>
            <DataTable.Header>
                <DataTable.Title><Text style={styles.tableHeader}>Sl .No</Text> </DataTable.Title>
                <DataTable.Title><Text style={styles.tableHeader}>Item Name</Text> </DataTable.Title>
                <DataTable.Title><Text style={styles.tableHeader}>Category Name</Text></DataTable.Title>
                <DataTable.Title><Text style={styles.tableHeader}>Description</Text></DataTable.Title>
                <DataTable.Title><Text style={styles.tableHeader}>Action</Text>
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


