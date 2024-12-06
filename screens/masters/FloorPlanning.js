
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useRef } from 'react';
import { Image, View, ScrollView, Text, FlatList, SectionList, Toast, Dimensions, TouchableOpacity } from 'react-native';
import Header from '../../components/sideMenuHeaderMaster';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import { floorPlanningImages } from '../../screens/common/FloorPlanningConstants';
import Draggable from 'react-native-draggable';
import { default as styles, default as styless } from '../../assets/css/style';
import DraggableView from 'react-native-draggable-reanimated'
import { TabActions } from '@react-navigation/native';
import ModalSelector from 'react-native-modal-selector';
import { event } from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Interactable from 'react-native-interactable';
import { GestureDetector, PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedGestureHandler,
    useAnimatedStyle,
} from 'react-native-reanimated';

import DraggableTable from './DraggableTable'



// import { NestableScrollContainer, NestableDraggableFlatList } from "react-native-draggable-flatlist"
// import DraggableFlatList, {
//     ScaleDecorator,
//   } from "react-native-draggable-flatlist";


export default function FloorPlanning() {
    const navigation = useNavigation();  // Getting the navigation object

    const optionsPerPage = [2, 3, 4];
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [tableData, setTableData] = useState([])
    const [tableTempData, setTableTempData] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [isrefreshingresultTablelist, setisrefreshingresultTablelist] = useState(false)
    const [selectedValue, setSelectedValue] = useState("Top floor");
    const [tableTypeListData, setTableTypeListData] = useState([]);
    const [dragTable, setDragTable] = useState(false)
    const [outletId, setOutletId] = useState('')
    const [ondragSE1, setOndragSE1] = useState(0)
    const [tempflooringdata, setTempflooringdata] = useState([])
    const isFocused = useIsFocused();
    const [openSuccessMsg, setopenSuccessMsg] = useState(false);
    const [tableType, setTableType] = useState("")

    //Get Table Details and sections List
    useEffect(() => {
        setisrefreshingresultTablelist(true)
        getTableDetailsList();
        setSelectedValue("");
        setTableType("")
        return () => {
            setTableTempData([])
        }
    }, [isFocused]);

    const getTableDetailsList = async () => {
        const jsonValue = await AsyncStorage.getItem('userInfo');
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        setOutletId(outletId);

        const result = await api.getAllMasterData(token, endPoint.GET_TABLEDETAILS + outletId);
        const tableresult = await api.getAllMasterData(token, endPoint.GET_TABLE_TYPE + outletId);

        if (result.success) {
            setTableTempData(result.data);
            setTableTypeListData(tableresult.data);
            const filteredDefaultTableData = {
                key: 0,
                label: tableresult.data[0]?.tableTypeName,
                value: tableresult.data[0]?.tableTypeName,
            };
            let filtereddata = result.data.filter((el) => {
                return el.tableType === tableresult.data[0]?.tableTypeName;
            });
            setTableData(filtereddata);
            setTableType(tableresult.data[0]?.tableTypeName);
            setLoading(false);
        } else {
            alert('Error loading table details');
            setLoading(false);
        }
    };

    //filter table details method starts
    let tablenewarray = tableTypeListData.map((s, i) => {
        let newData1 = {
            key: s + i,
            label: s.tableTypeName,
            value: s.tableTypeName
        }
        return newData1

    })
    //filter table details method ends
    //update Table details
    const updateTableList = (data, status) => {
        let filtereddata = tableTempData.filter((el) => {
            return el.tableType === data.value || data.value === '';
        });
        setTableData(filtereddata);
        setSelectedValue(data.key);
        setTableType(data.value);
        if (!status) {
            getOnchangeTableDetailsList(data);
        }
    };
    //On Change Section API Call
    const getOnchangeTableDetailsList = async (data) => {
        setLoading(true);

        const jsonValue = await AsyncStorage.getItem('userInfo');
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        setOutletId(outletId);

        const result = await api.getAllMasterData(token, endPoint.GET_TABLEDETAILS + outletId);
        if (result.success) {
            setTableTempData(result.data);
            let filtereddata = result.data.filter((el) => {
                return el.tableType === data.value || data.value === '';
            });
            setTableData(filtereddata);
            setLoading(false);
        } else {
            alert('Error updating table details');
            setLoading(false);
        }
    };
    //OnDrag Method 
    const onMoveTable = (x, y, tableId) => {
        // Update table data or state
        const updatedTableData = tableData.map(obj => {
            if (obj.tableId === tableId) {
                return { ...obj, x: x, y: y };  // Update the position of the table
            }
            return obj;
        });
        setTableData(updatedTableData);
    };

    //Edit Drag Table API Integration
    const editDragTable = async () => {
        setDragTable(true)
        const jsonValue = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        const dragTableUpdate = await api.CreateMasterData(endPoint.DRAG_TABLE, token, tableData)
        if (dragTable === true) {
            setDragTable(false)
            successOpen();
        }
        // if (dragTableUpdate.status === 200) {
        //     // Convert the 'data' field to JSON (it seems like a stringified array)
        //     const tableData = dragTableUpdate.config.data;
        //     setDragTable(false)
        //     successOpen();
        //     // Log the table data
        // }
        // if (dragTable === true) {

        // }
    }



    // Create Success msg 
    const successOpen = () => {
        setopenSuccessMsg(!openSuccessMsg)
      }
    const SuccessPopup = () => {
        return (
            // success popup
            <View style={[styles.flex, styles.justifyCenter, styles.alignCenter, styles.left50]}>
                <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
                    <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
                    <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Floor Planning Updated Successfully</Text>
                    <TouchableOpacity style={styles.continueBtn} onPress={() => [successOpen(), navigation.navigate('FloorPlanning')]}>
                        <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
            // success popup - Ends
        );
    }
    // ---------------------------------------- User Interface ----------------------------------------------------------
    return (
        <>
            <Header heading={'Floor Planning'} />
            <ScrollView style={styles.categoryBlkCon}>
                <View style={[styles.textcontainer1, styles.catSubBlk]}>
                    <Text style={styles.textStyle1}>
                        Floor Planning
                    </Text>
                </View>
                <View style={[styles.paddB60]}>
                    <View style={[styles.table, {}]}>
                        <View style={[styles.flexrow, styless.alignCenter, styless.justifyBetween]}>
                            <View style={[styles.width50]}>
                                <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
                                {/* <ModalSelector
                                    data={tablenewarray}
                                    childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                                    selectStyle={styles.selectText}
                                    optionContainerStyle={styles.selectCont}
                                    optionTextStyle={styles.textStyle}
                                    initValueTextStyle={styles.textStyle}
                                    overlayStyle={styles.overlayText}
                                    cancelStyle={styles.selectCont}
                                    cancelContainerStyle={styles.cancelCont}
                                    cancelText={"Cancel"}
                                    initValue={tableType}
                                    selectedKey={selectedValue}
                                    onChange={(option) => {
                                        if (option.key) {
                                            updateTableList(option, false)
                                        }
                                    }}
                                /> */}
                                <ModalSelector
                                    data={tablenewarray}
                                    childrenContainerStyle={StyleSheet.flatten([styles.AddsignInput, styles.selectMainInput])}  // Merge the styles into a single object
                                    selectStyle={styles.selectText}
                                    optionContainerStyle={styles.selectCont}
                                    optionTextStyle={styles.textStyle}
                                    initValueTextStyle={styles.textStyle}
                                    overlayStyle={styles.overlayText}
                                    cancelStyle={styles.selectCont}
                                    cancelContainerStyle={styles.cancelCont}
                                    cancelText={"Cancel"}
                                    initValue={tableType}
                                    selectedKey={selectedValue}
                                    onChange={(option) => {
                                        if (option.key) {
                                            updateTableList(option, false);
                                        }
                                    }}
                                />

                            </View>
                            <TouchableOpacity onPress={() => editDragTable()}>
                                <View style={styles.textcontainer2}>
                                    <Text style={styles.textStyle2} onPress={() => editDragTable()}>
                                        {dragTable === true ? 'Save' : 'Edit'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* Show Square, Triangle and Circle with Empty and Occupied Status  Images Starts */}

                        <View style={{ height: Dimensions.get('window').height - 100 }}>
                            {tableData && tableData.map((item, index) =>

                                <DraggableTable
                                    key={index}
                                    item={item}
                                    floorPlanningImages={floorPlanningImages}
                                    dragTable={dragTable}
                                    onMoveTable={onMoveTable}
                                />
                            )}

                        </View>
                        {/* Show Square, Triangle and Circle with Empty and Occupied Status  Images Ends */}
                    </View>
                </View>
                {openSuccessMsg &&
                    <Modal isVisible={openSuccessMsg}>
                        {SuccessPopup()}
                    </Modal>
                }
                <TouchableOpacity
                    style={styles.continueBtn}
                    onPress={() => setopenSuccessMsg(true)}  // Open the popup
                >
                    <Text style={[styles.textWhite, styles.font16]}>Show Success Popup</Text>
                </TouchableOpacity>
            </ScrollView>

        </>
    )

}
