
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BarChart } from "react-native-gifted-charts";
import ModalSelector from 'react-native-modal-selector';
import DatePicker from 'react-native-neat-date-picker';
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import XLSX from 'xlsx';
import { default as styles, default as styless } from '../../assets/css/style';
import CalenderIcon from '../../assets/images/calendar.js';
import ModalDropDown from '../../assets/images/ModalDropDown.js';
import Header from '../../components/sideMenuHeaderMaster';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';


export default function TotalOrderValue({ navigation, route }: { navigation: any, route: any }) {
  const [data, setData] = useState([])
  const isFocused = useIsFocused();
  const [isDataPresent, setDataPreset] = useState(false);
  const [dineInValuePerc, setDineinValuePerc] = useState(0)
  const [onlinePercen, setOnlinePerc] = useState(0)
  const [takeAwayValuePerc, setTakeAwayValuePerc] = useState(0)
  const [dineInValue, setDineinValue] = useState('')
  const [takeAwayValue, setTakeAwayValue] = useState('')
  const [onlineValue, setOnlinevalue] = useState('')
  const [totalPaymentcount, setTotalPaymentCount] = React.useState('');
  const [outlet, SetOutlet] = useState('')
  const [selectedOutletName, setSelectedOutletName] = useState('');

  const optionsPerPage = [2, 3, 4];
  const [page, setPage] = useState(0);
  var count = 1;
  const _id: any = "";
  const numberOfItemsPerPageList = [5, 10, 15];
  const [showView, setShowView] = useState(false);
  const [showViewId, setShowViewId] = useState('');
  const [isrefreshingresult, setIsrefreshingresult] = useState(false)


  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  var count = from + 1;

  const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);
  const navigate = useNavigation();

  const [isStartDateTimePickerVisible, setIsStartDateTimePickerVisible] = useState(false);
  const [isEndDateTimePickerVisible, setIsEndDateTimePickerVisible] = useState(false)
  const [selectedStartDate, setSelectedStartDate] = React.useState<any>();
  const [selectedEndDate, setSelectedEndDate] = React.useState<any>();
  const [dateError, setDateError] = useState(false);


  const [outletData, setOutletData] = useState([]);
  const [outletKey, setOutletKey] = useState(0);
  const [outletField, setOutletField] = useState('')

  useEffect(() => {
    setPage(0);
    const unsubscribe = navigate.addListener('focus', () => {
      resetDefaultValue();
    });
    return unsubscribe;

  }, [numberOfItemsPerPage]);

  const [userRoleId, setuserRoleId] = useState('')
  const [outletId, setOutletId] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [outletName, setOutlet] = useState('');
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
    setOutlet(outletName)
    setOutletId(outletId)
    setRestaurant(restaurantName)
    setOutlet(outletName)
    setuserRoleId(userRoleId)

  }
  const resetDefaultValue =
    () => {
      setPage(0);
      setShowView(false);
      setShowViewId('')
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
    getUserSalesList();
    return () => {
      setData([])
    }
  }, [isFocused]);
  const getUserSalesList = async () => {

    setIsrefreshingresult(true)
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const outletName = await AsyncStorage.getItem('outletName')
    setOutlet(outletName)
    setOutletField(outletId)
    let myJson = {
      outletId: outletField ? outletField : loginData.outletId,
      toDate: selectedEndDate,
      fromDate: selectedStartDate
    }
    const result = await api.CreateMasterData(endPoint.GET_ORDER_BY_COUNT, token, myJson)
    if (result.data?.dineInSales === 0 && result.data?.takeAwaySales === 0) {
      // Toast.show("Some Error occured. Please try again.");
      setDataPreset(false);
      setIsrefreshingresult(false)

    } else {
      setData(result.data);
      setDataPreset(true);
      setDineinValue(result.data?.dineInSales)
      setTakeAwayValue(result.data?.takeAwaySales)
      setOnlinevalue(result.data?.onlineSales)
      setDineinValuePerc(result.data?.dineInPercen?.toFixed(0))
      setOnlinePerc(result?.data?.onlinePercen?.toFixed(0))
      setTakeAwayValuePerc(result.data.takeAwayPerce?.toFixed(2))
      setTotalPaymentCount(result.data.todaySalesByCash + result.data.todaySalesByCard)
      setIsrefreshingresult(false)

    }
  }
  //OutletId Filter 
  const getUserSalesListOutletFilter = async () => {
    setIsrefreshingresult(true)

    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let myJson = {
      outletId: outletField ? outletField : loginData.outletId,
      toDate: selectedEndDate,
      fromDate: selectedStartDate
    }
    const result = await api.CreateMasterData(endPoint.GET_ORDER_BY_COUNT, token, myJson)
    if (result.data.dineInSales === 0 && result.data.takeAwaySales === 0) {
      // Toast.show("Some Error occured. Please try again.");
      setDataPreset(false);
      setIsrefreshingresult(false)

    } else {
      setData(result.data);
      setDataPreset(true);
      setDineinValue(result.data.dineInSales)
      setTakeAwayValue(result.data.takeAwaySales)
      setDineinValuePerc(result.data.dineInPercen?.toFixed(2))
      setOnlinePerc(result?.data?.onlinePercen?.toFixed(2))
      setTakeAwayValuePerc(result.data.takeAwayPerce?.toFixed(2))
      setTotalPaymentCount(result.data.todaySalesByCash + result.data.todaySalesByCard)
      setIsrefreshingresult(false)

    }
  }
  //Select Date Functionality
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

  const exportXlsx = async (data) => {
    var ws = XLSX.utils.json_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "TotalOrderValue", true);

    const wbout = XLSX.write(wb, {
      type: 'base64',
      bookType: "xlsx"
    });
    const uri = FileSystem.cacheDirectory + 'TotalOrderValues.xlsx';
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

  const barData = [

    {
      value: takeAwayValuePerc,
      frontColor: '#E83B42',
    },
    { value: dineInValuePerc, frontColor: '#008960' },
    { value: onlinePercen, frontColor: '#FF97C0' }
  ];
  //table Row for payments
  const tableRow = (data) => (
    <View>
      <DataTable.Row>
        <DataTable.Cell><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{data.dineInSales}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{data.takeAwaySales}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{data.onlineSales}</Text></DataTable.Cell>
      </DataTable.Row>

    </View>
  )
  const colorOptions = {
    headerColor: '#EC187B',
    backgroundColor: '#fff',
    weekDaysColor: '#EC187B',
    selectedDateBackgroundColor: '#EC187B',
    confirmButtonColor

      : '#EC187B',
  }
  // --------------------------------------------------- User Interface ------------------------------------------
  return (
    <>
      <Header heading={"Payments"} />

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
      <ScrollView style={styles.dashScrollView}>
        <View style={styles.categoryBlkCon}>
          <View style={[styles.flexrow, styles.justifyCenter]}>
            {isrefreshingresult ? <View style={[styless.flex1, styless.flexrow, styless.alignCenter, styless.justifyCenter, styless.loaderPopupBlk]}>
              <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
            </View> :
              <View style={[styles.dashColTop, styles.width50]}>
                <View style={styles.dashTopCon}>
                  <View style={styles.leftCon}>
                    <Text style={styles.dineInText}>Total Order value Percentage</Text>
                    <View style={styles.totComView}>
                      <View style={styles.comCircle}></View>
                      <Text style={[styles.completedText, styles.textDefault]}>{dineInValuePerc}% Dine In </Text>
                    </View>
                    <View style={styles.totComView}>
                      <View style={styles.penCircle}></View>
                      <Text style={[styles.completedText, styles.textDefault]}>{takeAwayValuePerc}% Take Away </Text>
                    </View>
                    <View style={styles.totComView}>
                      <View style={styles.TotalOrderValueOnline}></View>
                      <Text style={[styles.completedText, styles.textDefault]}>{onlinePercen}% Online </Text>
                    </View>
                  </View>
                  <View style={[styles.dashrgtCon, styles.flexrow, styles.justifyEnd, styles.padL10]}>
                    <BarChart
                      data={barData}
                      radius={90}
                    />
                  </View>
                </View>
              </View>
            }
          </View>

          <View style={[styles.textcontainer1, styles.catSubBlk]}>
            <Text style={styles.textStyle1}>
              Distribution of Order by Value - {selectedOutletName ? selectedOutletName : outletName}
            </Text>
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
      getUserSalesListOutletFilter();
    }}
  >
    <Text style={[styles.textWhite, styles.font11]}>Filter</Text>
  </TouchableOpacity>
</View>
            </View>
          </View>

          <ScrollView>
            <View style={styles.table}>
              {!isDataPresent
                ?
                <View style={styles.noRecordFoundView}>
                  <Image
                    style={styles.noRecordImage}
                    source={(require('../../assets/images/clipboard.png'))}
                  />
                  <View>
                    <Text style={styles.recordDisplay}>There are no Total Order Values to display.</Text>
                  </View>
                </View>
                :
                <View style={styles.table}>
                  <DataTable>
                    <DataTable.Header style={styles.tableHeaderRow}>
                      <DataTable.Title style={styles.FlexproducName}><Text style={styles.tableHeader}>SI No.</Text></DataTable.Title>
                      <DataTable.Title style={styles.FlexproducName}><Text style={styles.tableHeader}>Dine in Total Order Values</Text></DataTable.Title>
                      <DataTable.Title style={styles.FlexproducName}><Text style={styles.tableHeader}>Take Away Total Order Values</Text></DataTable.Title>
                      <DataTable.Title style={styles.FlexproducName}><Text style={styles.tableHeader}>Online Total Order Values</Text></DataTable.Title>
                    </DataTable.Header>
                    {
                      tableRow(data)
                    }
                  </DataTable>
                </View>
              }
            </View>
          </ScrollView>

        </View>
      </ScrollView>

    </>
  );
}