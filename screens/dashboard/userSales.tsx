
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BarChart } from "react-native-gifted-charts";
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import DatePicker from 'react-native-neat-date-picker';
import XLSX from 'xlsx';
import { default as styles, default as styless } from '../../assets/css/style';
import CalenderIcon from '../../assets/images/calendar.js';
import ExcelIcon from '../../assets/images/excel_icon.js';
import InternetDownIcon from '../../assets/images/internet_down.js';
import ModalDropDown from '../../assets/images/ModalDropDown.js';
import DineInSales from '../../components/DineInSales';
import TakeAwaySales from '../../components/TakeAwaySales';
import Header from '../../components/sideMenuHeaderMaster';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';


export default function userSales({ navigation, route }: { navigation: any, route: any }) {
  const [data, setData] = useState([])
  const isFocused = useIsFocused();
  const [isDataPresent, setDataPreset] = useState(false);
  const [takeawaysales, setTakeAwaySales] = useState([])
  const [dineinsales, setDineinSales] = useState([])
  const optionsPerPage = [2, 3, 4];
  const [page, setPage] = useState(0);
  var count = 1;
  const _id: any = "";
  const numberOfItemsPerPageList = [5, 10, 15];
  const [showView, setShowView] = useState(false);
  const [showViewId, setShowViewId] = useState('');
  const [dineinUserSalesCount, setDineinUserSalesCount] = useState(0)
  const [takeawayUserSalesCount, setTakeAwayUserSalesCount] = useState(0)
  const [outlet, SetOutlet] = useState('')
  const [isrefreshingresult, setIsrefreshingresult] = useState(false)
  const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  var count = from + 1;
  const to = Math.min((page + 1) * numberOfItemsPerPage, data?.length);
  const [userRoleId, setuserRoleId] = useState('')
  const [outletId, setOutletId] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [outletName, setOutlet] = useState('');
  const [isStartDateTimePickerVisible, setIsStartDateTimePickerVisible] = useState(false);
  const [isEndDateTimePickerVisible, setIsEndDateTimePickerVisible] = useState(false)
  const [selectedStartDate, setSelectedStartDate] = React.useState<any>();
  const [selectedEndDate, setSelectedEndDate] = React.useState<any>();
  const [dateError, setDateError] = useState(false);
  const [outletData, setOutletData] = useState([]);
  const [outletKey, setOutletKey] = useState(0);
  const [outletField, setOutletField] = useState('')
  const [defauloutlet, setdefauloutlet] = useState('')
  const [selectedOutletName, setSelectedOutletName] = useState('');

  const [orderTypeKey, setOrderTypeKey] = useState(1)
  const filterordertypearray = [
    { key: 1, label: 'Dine In', value: 'Dine-in' },
    { key: 2, label: 'Take Away', value: 'Walk-in' },
  ]

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
    setOutletId(outletid)
    setRestaurant(restaurantName)
    setOutlet(outletName)
    setuserRoleId(userRoleId)

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
    const jsonValue: any = await AsyncStorage.getItem('userInfo');
    const restaurantId: any = await AsyncStorage.getItem('restaurantId');
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    const result = await api.getAllMasterData(token, endPoint.GET_OUTLETS_BY_RESTAURANT + restaurantId);
    if (result.success === true) {
      setOutletData(result.data?.outlets || []);
    }
  };

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
    getUserSalesList(orderTypeKey);
    return () => {
      setData([])
    }
  }, [isFocused]);
    const getUserSalesList = async () => {
    setIsrefreshingresult(true);
    const jsonValue: any = await AsyncStorage.getItem('userInfo');
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const outletName = await AsyncStorage.getItem('outletName');
    SetOutlet(outletName);
    let myJson = {
      outletId: outletField ? outletField : loginData.outletId,
      toDate: selectedEndDate,
      fromDate: selectedStartDate
    };
    const result = await api.CreateMasterData(endPoint.GET_ORDER_BY_COUNT, token, myJson);
    const responseData = result.data;

    if (responseData.success  === false) {
      setIsrefreshingresult(false);
      setDataPreset(false);
    } else {
      const dineinData = result.data?.todayDineInSalesList || [];
      const takeawayData = result.data?.todayTakeAwaySalesList || [];
      setData(result.data);
      setDataPreset(true);
      setDineinSales(dineinData);
      setTakeAwaySales(takeawayData);
      setIsrefreshingresult(false);
      setOrderTypeKey(orderTypeKey === 1 ? 1 : 2);
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
  //User Sales Count
  useEffect(() => {

    userSalesCountList();

    return () => {
    }
  });
  const userSalesCountList = () => {

    setDineinUserSalesCount(dineinsales.length)
    setTakeAwayUserSalesCount(takeawaysales.length)

  }
  const successInternetdownOpen = () => {
    setopenInternetdownMsg(!openInternetdownMsg)
  }
  // internet down popup
  const internetDownPop = () => {
    return (
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
          <InternetDownIcon style={[styles.marBtm20]} />
          {/* <Image source={(require("../../assets/images/success gif.gif"))} style={[styles.marBtm20, styles.sucImg]} /> */}

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
  const barData = [

    {
      value: dineinUserSalesCount,
      frontColor: '#008960',
    },
    { value: takeawayUserSalesCount, frontColor: '#E83B42' },
  ];

  const sendDataToParent = (data) => { // the callback. Use a better name

  };


  //----------------------------------------------------Excel User Sales Export -----------------------------

  const exportXlsx = async (orderTypeKey) => {
    if (orderTypeKey === 1) {
      var ws = XLSX.utils.json_to_sheet(dineinsales);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "UserSales", true);

      const wbout = XLSX.write(wb, {
        type: 'base64',
        bookType: "xlsx"
      });
      const uri = FileSystem.cacheDirectory + 'UserSales.xlsx';
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
    else {
      var ws = XLSX.utils.json_to_sheet(takeawaysales);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "UserSales", true);

      const wbout = XLSX.write(wb, {
        type: 'base64',
        bookType: "xlsx"
      });
      const uri = FileSystem.cacheDirectory + 'UserSales.xlsx';
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

  }
  //----------------------------------------------------Excel User Sales Export Ends-----------------------------

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
      <Header heading={"User Sales"} />

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

      {isrefreshingresult ? <View style={[styless.flex1, styless.flexrow, styless.alignCenter, styless.justifyCenter, styless.loaderPopupBlk]}>
        <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
      </View> :
        <ScrollView style={styles.dashScrollView}>
          <View style={styles.categoryBlkCon}>
            <View style={[styles.flexrow, styles.justifyCenter]}>
              <View style={[styles.dashColTop, styles.width50]}>
                <View style={styles.dashTopCon}>
                  <View style={styles.leftCon}>
                    <Text style={styles.dineInText}>Total User Sales</Text>
                    <View style={styles.totComView}>
                      <View style={styles.comCircle}></View>
                      <Text style={[styles.completedText, styles.textDefault]}>{dineinUserSalesCount} Dine In User Sales</Text>
                    </View>
                    <View style={styles.totComView}>
                      <View style={styles.penCircle}></View>
                      <Text style={[styles.completedText, styles.textDefault]}>{takeawayUserSalesCount} Take Away User Sales</Text>
                    </View>
                  </View>
                  <View style={[styles.dashrgtCon, styles.flexrow, styles.justifyEnd]}>
                  {dineinUserSalesCount > 0 && takeawayUserSalesCount > 0 && barData && barData.length > 0 && (

                    <BarChart
                      data={barData}
                      width={150}
                      height={200}
                      textFontSize={20}
                    />
                  )}
                  </View>
                </View>
              </View>
            </View>



            <View style={[styles.textcontainer1, styles.catSubBlk]}>
              <Text style={styles.textStyle1}>
                User Sales - {selectedOutletName ? selectedOutletName : outlet}
              </Text>
            </View>

            <View style={[styles.flexrow, styles.marBtm30, styles.alignCenter, styles.justifyBetween]}>
              <View style={[styles.flexrow]}>
                <View style={[styles.width170px]}>
                  <View style={styles.pickerView}>
                    <ModalDropDown style={styles.outletImg} />
                    <ModalSelector
                      data={filterordertypearray}
                      childrenContainerStyle={[styles.stateDateCon]}
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
                      selectedKey={orderTypeKey}
                      onChange={(option) => {
                        if (option.key) {
                          if (option.key == 1) {
                            getUserSalesList(option.key)
                          }
                          else {
                            getUserSalesList(option.key)
                          }
                        }
                      }}
                    />
                  </View>
                </View>
              </View>
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
                      initValue={outletName}
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
      getUserSalesList(orderTypeKey);
    }}
  >
    <Text style={[styles.textWhite, styles.font11]}>Filter</Text>
  </TouchableOpacity>
</View>
              </View>
              <TouchableOpacity onPress={() => exportXlsx(orderTypeKey)} style={[styles.flexrow, styles.alignCenter, styles.height35]}>
                <ExcelIcon />
                <Text style={[styles.font9, styles.padL5, styles.textBlack]}>Export</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.paddB60]}>
              <View style={styles.table}>
                {!isDataPresent
                  ?
                  <View style={styles.noRecordFoundView}>
                    <Image
                      style={styles.noRecordImage}
                      source={(require('../../assets/images/clipboard.png'))}
                    />
                    <View>
                      <Text style={styles.recordDisplay}>There are no User Sales to display.</Text>
                    </View>
                  </View>
                  : orderTypeKey === 1 ?
                    <DineInSales data={dineinsales} sendEditData={sendDataToParent} updateDelete={() => getUserSalesList(orderTypeKey)} /> : <TakeAwaySales data={takeawaysales} sendEditData={sendDataToParent} updateDelete={() => getUserSalesList(orderTypeKey)} />
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
      }
    </>
  );
}