
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import DatePicker from 'react-native-neat-date-picker';
import { DataTable } from 'react-native-paper';
import XLSX from 'xlsx';
import styles from '../../assets/css/style';
import CalenderIcon from '../../assets/images/calendar.js';
import ExcelIcon from '../../assets/images/excel_icon.js';
import InternetDownIcon from '../../assets/images/internet_down.js';
import ModalDropDown from '../../assets/images/ModalDropDown.js';
import Header from '../../components/sideMenuHeaderMaster';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';


export default function VoidOrder({ navigation, route }: { navigation: any, route: any }) {
    const [data, setData] = useState([])
    const isFocused = useIsFocused();
    const [isDataPresent, setDataPreset] = useState(false);
    const [voidOrderListData, setVoidOrderListData] = useState([])
    const [voidOrderCount, setVoidOrderCount] = useState(0);
    const [noRecordmsg, setNorecordmsg] = useState(false)
    const optionsPerPage = [2, 3, 4];
    const [page, setPage] = useState(0);
    var count = 1;
    const _id: any = "";
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
  
    const [showView, setShowView] = useState(false);
    const [showViewId, setShowViewId] = useState('');
    const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
    const [outletData, setOutletData] = useState([]);
    const [outletKey, setOutletKey] = useState(0);
    const [isStartDateTimePickerVisible, setIsStartDateTimePickerVisible] = useState(false);
    const [isEndDateTimePickerVisible, setIsEndDateTimePickerVisible] = useState(false)
    const [selectedStartDate, setSelectedStartDate] = React.useState<any>();
    const [selectedEndDate, setSelectedEndDate] = React.useState<any>();
    const [dateError, setDateError] = useState(false);
    const [selectedOutletName, setSelectedOutletName] = useState('');

    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const from = page * numberOfItemsPerPage;
    var count = from + 1;
    const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);

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
    const [userRoleId, setuserRoleId] = useState('')
    const [outletId, setOutletId] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [outletName, setOutlet] = useState('');
    const [outletField, setOutletField] = useState(outletId)
    const [defauloutlet, setdefauloutlet] = useState('')

    useEffect(() => {
        const fetchData = async () => {
          try {
            setTimeout(() => getRestaurant(), 1000);
            const jsonValue = await AsyncStorage.getItem('userInfo');
            const loginData = JSON.parse(jsonValue);
            setdefauloutlet(loginData.outletId);
          } catch (error) {
            // Handle any errors that might occur during the asynchronous operations
          }
        };
        setSelectedEndDate(null);
        setSelectedStartDate(null);
        fetchData(); // Call the async function
      }, [isFocused]);
    useEffect(() => {
        setTimeout(() => getRestaurant(), 1000);
    }, [isFocused]);

    const getRestaurant = async () => {
        const userRoleId = await AsyncStorage.getItem('userRoleId')
        const restaurantName = await AsyncStorage.getItem('restaurantName')
        const outletName = await AsyncStorage.getItem('outletName')
        const outletAddress = await AsyncStorage.getItem('outletAddress')
        const outletid = await AsyncStorage.getItem('restaurantId')
        // setOutletId(outletId)
        setRestaurant(restaurantName)
        setOutlet(outletName)
        setuserRoleId(userRoleId)
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId
        setOutletField(outletId)

    }
    //Get Outlet by Restaurant
    useEffect(() => {

        getOutletList();
        return () => {
            +
                setData([]);
        }
    }, [isFocused]);
    const getOutletList = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        const restaurantId: any = await AsyncStorage.getItem('restaurantId')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        const result = await api.getAllMasterData(token, endPoint.GET_OUTLETS_BY_RESTAURANT + restaurantId);
        if (result.success === true) {
            setOutletData(result.data.outlets)
        }
        else {
        }
    }

    let outletDataArray = outletData.map((s, i) => {

        let newData = {
            key: i + 1,
            label: s.outletName,
            value: s.outletId
        }
        return newData;
    })
    //get User Sales list Api
    useEffect(() => {
        getVoidOrderList();
        return () => {
            setData([])
        }
    }, [isFocused]);
    const getVoidOrderList = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId
        let myJson = {
            outletId: outletField ? outletField : loginData.outletId,
            toDate: selectedEndDate,
            fromDate: selectedStartDate
        }
        const result = await api.CreateMasterData(endPoint.GET_ORDER_BY_COUNT, token, myJson)
        if (result.data.todayVoidOrderList.length === 0) {
            setDataPreset(false);

        } else {
            setData(result.data);
            setDataPreset(true);
            setVoidOrderListData(result.data.todayVoidOrderList)
            setVoidOrderCount(result.data?.todayVoidOrderList?.length)
        }
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

    // internet down popup - Ends
    const showDateTimePicker = (type: any) => {
        if (type === 'startDate') {
            setIsStartDateTimePickerVisible(true);
        } else if (type === 'endDate') {
            setIsEndDateTimePickerVisible(true);
        }
    };
    const hideDateTimePicker = (type: any) => {
        setIsStartDateTimePickerVisible(false);
        setIsEndDateTimePickerVisible(false);
    };
    const handleDatePicked = (date: any, type: any) => {
        const selDate = moment(date.dateString).format("YYYY-MM-DD");
        if (type === 'startDate') {
            setSelectedStartDate(selDate);
            hideDateTimePicker(type);
        } else if (type === 'endDate') {
            setSelectedEndDate(selDate);
            hideDateTimePicker(type);
        }
        setDateError(false);
    };
    //-------------------------- Export void Order List --------------------------------
    const filterVoidOrderList = () => {

        var dataVoidOrder = voidOrderListData.filter(function (item) {
            return item.orderNo
        }).map(function ({ orderNo, customerName, orderType, total, orderItemsStatus }) {
            return { orderNo, customerName, orderType, total, orderItemsStatus };
        });
        exportXlsx(dataVoidOrder)
    }

    const exportXlsx = async (data) => {
        var ws = XLSX.utils.json_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "VoidOrdersList", true);


        const wbout = XLSX.write(wb, {
            type: 'base64',
            bookType: "xlsx"
        });
        const uri = FileSystem.cacheDirectory + 'VoidOrdersList.xlsx';
        await FileSystem.writeAsStringAsync(uri, wbout, {
            encoding: FileSystem.EncodingType.Base64
        });
        FileSystem.downloadAsync(
            'http://techslides.com/demos/sample-videos/small.mp4',
            FileSystem.documentDirectory + 'small.mp4'
        )
            .then(({ uri }) => {
            })
            .catch(error => {
            });
        await Sharing.shareAsync(uri, {
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            dialogTitle: 'MyWater data',
            UTI: 'com.microsoft.excel.xlsx'
        });
    }
    //-------------------------- Export void Order List Ends -------------------------------------
    const colorOptions = {
        headerColor: '#EC187B',
        backgroundColor: '#fff',
        weekDaysColor: '#EC187B',
        selectedDateBackgroundColor: '#EC187B',
        confirmButtonColor

            : '#EC187B',
    }

    //Void Order Table List View
    const tableRow = (data) => (
        <View style={[styles.tableRow, { borderColor: '#F5F3F6' }]}>
            <DataTable.Row>
                <DataTable.Cell style={styles.userssl}><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>{data.customerName}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>{data.orderType}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>{data.orderNo}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>{data.subTotal}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>{data.orderStatus}</Text></DataTable.Cell>

            </DataTable.Row>
        </View>
    );
    //Pie Data to Pie Chart
    const pieData = [
        { value: voidOrderCount, color: '#008960', gradientCenterColor: '#008960' }
    ]

    // --------------------------------------------------- User Interface ------------------------------------------

    return (
        <>
            <Header heading={"Void Order"} />

            <DatePicker
                mode={'single'}
                colorOptions={colorOptions}
                modalStyles={{ backgroundColor: '#484D546E' }}
                isVisible={isStartDateTimePickerVisible}
                onConfirm={date => handleDatePicked(date, 'startDate')}
                onCancel={() => hideDateTimePicker('startDate')}
            />
            <DatePicker
                mode={'single'}
                colorOptions={colorOptions}
                modalStyles={{ backgroundColor: '#484D546E' }}
                isVisible={isEndDateTimePickerVisible}
                onConfirm={date => handleDatePicked(date, 'endDate')}
                onCancel={() => hideDateTimePicker('endDate')}
            />
            <ScrollView>
                <View style={styles.categoryBlkCon}>

                    <View style={[styles.flexrow, styles.justifyCenter]}>
                        <View style={[styles.dashColTop, styles.width50]}>
                            <View style={styles.dashTopCon}>
                                <View style={styles.leftCon}>
                                    <Text style={styles.dineInText}>Void Order</Text>
                                    <View style={styles.totComView}>
                                        <View style={styles.comCircle}></View>
                                        <Text style={[styles.completedText, styles.textDefault]}>{voidOrderCount} void Order </Text>
                                    </View>
                                </View>
                                <View style={[styles.dashrgtCon, styles.flexrow, styles.justifyEnd]}>
                                    <PieChart
                                        data={pieData}

                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.textcontainer1, styles.catSubBlk]}>
                        <Text style={styles.textStyle1}>
                            Void Orders - {selectedOutletName ? selectedOutletName : outletName}
                        </Text>
                        <View>
                        </View>
                    </View>

                    <View style={[styles.flexrow, styles.marBtm30, styles.alignCenter, styles.justifyBetween]}>
                        <View style={[styles.flexrow]}>
                            <View style={[styles.width170px]}>
                                <View style={styles.pickerView}>
                                    <ModalDropDown style={styles.outletImg} />
                                    <ModalSelector
                                        data={outletDataArray.sort(function (a, b) {
                                            return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0
                                        })} childrenContainerStyle={[styles.stateDateCon]}
                                        selectStyle={styles.selectText}
                                        selectTextStyle={[styles.font10, styles.textBlack]}
                                        optionContainerStyle={styles.selectCont}
                                        optionTextStyle={[styles.textStyle]}
                                        initValueTextStyle={[styles.font10, styles.textDate]}
                                        overlayStyle={styles.overlayText}
                                        cancelStyle={styles.selectCont}
                                        cancelContainerStyle={styles.cancelCont}
                                        cancelText={"Cancel"}
                                        initValue={outletDataArray.find(item => item.value === defauloutlet)?.label || ''}
                                        selectedKey={outletKey}
                                        onChange={(option) => {
                                            if (option.key) {
                                                setOutletKey(option.key)
                                                setOutletField(option.value)
                                                setSelectedOutletName(option.label);
                                            }
                                        }}
                                    />

                                </View>
                            </View>
                            <View style={[styles.width170px, styles.padL10]}>
  <TouchableOpacity style={[styles.stateDateCon, styles.flexrow, styles.alignCenter]}
    onPress={() => showDateTimePicker('startDate')}>
    <CalenderIcon />
    {selectedStartDate ?
      <View style={[styles.paddL5]}>
        <Text style={[styles.font9, styles.textDate]}>Start Date</Text>
        <Text style={[styles.font10, styles.textBlack]}>{selectedStartDate ?? null}</Text>
      </View> : <View style={[styles.paddL5]}>
        <Text style={[styles.font10, styles.textDate]}>Start Date</Text>
      </View>
    }
  </TouchableOpacity>
  {selectedEndDate < selectedStartDate && (
    <Text style={styles.errorText}>Start date cannot be greater than end date</Text>
  )}
</View>
<View style={[styles.width170px, styles.paddL10]}>
  <TouchableOpacity style={[styles.stateDateCon, styles.flexrow, styles.alignCenter]}
    onPress={() => showDateTimePicker('endDate')}>
    <CalenderIcon />
    {selectedEndDate ?
      <View style={[styles.paddL5]}>
        <Text style={[styles.font9, styles.textDate]}>End Date</Text>
        <Text style={[styles.font10, styles.textBlack]}>{selectedEndDate ?? null}</Text>
      </View> : <View style={[styles.paddL5]}>
        <Text style={[styles.font10, styles.textDate]}>End Date</Text>
      </View>
    }
  </TouchableOpacity>
</View>

<View style={[styles.paddL10]}>
  <TouchableOpacity
    style={[styles.SearchBtn, selectedEndDate < selectedStartDate && styles.disabledBtn]}
    disabled={selectedEndDate < selectedStartDate}
    onPress={() => {
      // Perform the search
      getVoidOrderList();
    }}
  >
    <Text style={[styles.textWhite, styles.font11]}>Filter</Text>
  </TouchableOpacity>
</View>
                        </View>
                        <TouchableOpacity onPress={() => filterVoidOrderList()} style={[styles.flexrow, styles.alignCenter, styles.height35]}>
                            <ExcelIcon />
                            <Text style={[styles.font9, styles.padL5, styles.textBlack]}>Export</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.paddB60]}>
                        <View style={styles.table}>
                            {!isDataPresent
                                ?
                                // no record HTML
                                <View style={styles.noRecordFoundView}>
                                    <Image
                                        style={styles.noRecordImage}
                                        source={(require('../../assets/images/clipboard.png'))}
                                    />
                                    <View>
                                        <Text style={styles.recordDisplay}>There are no Void Orders to display.</Text>
                                    </View>
                                </View>
                                // no record HTML Ends
                                :
                                <DataTable>
                                    {isDataPresent && (
                                        <DataTable.Header style={[styles.headerStyle]}>
                                            <DataTable.Title style={styles.userssl}><Text style={styles.tableHeader}>Sl .No</Text> </DataTable.Title>
                                            <DataTable.Title><Text style={styles.tableHeader}>Customer Name</Text> </DataTable.Title>
                                            <DataTable.Title><Text style={styles.tableHeader}>Order Type</Text></DataTable.Title>
                                            <DataTable.Title><Text style={styles.tableHeader}>Order Number</Text></DataTable.Title>
                                            <DataTable.Title><Text style={styles.tableHeader}>Amount</Text></DataTable.Title>
                                            <DataTable.Title><Text style={styles.tableHeader}>Status</Text></DataTable.Title>

                                        </DataTable.Header>
                                    )}
                                    <ScrollView >

                                        {voidOrderListData
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
                            }
                        </View>
                        {openInternetdownMsg &&
                            <Modal isVisible={openInternetdownMsg}>
                                {internetDownPop()}
                            </Modal>
                        }
                    </View>

                </View>
            </ScrollView>
        </>


    );

}