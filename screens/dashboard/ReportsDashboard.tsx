
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import ModalSelector from 'react-native-modal-selector';
import { Appbar } from 'react-native-paper';
import XLSX from 'xlsx';
import { default as styles, default as styless } from '../../assets/css/style';
import BarIcon from '../../assets/images/bar.js';
import CalenderIcon from '../../assets/images/calender_icon.js';
import DashboardIcon from '../../assets/images/dashbord.js';
import DineInIcon from '../../assets/images/dine_in.js';
import DineinReport from '../../assets/images/dine_in_reports.js';
import InvenIcon from '../../assets/images/inventory_icon.js';
import KitchenIcon from '../../assets/images/kitchen_icon.js';
import ModalDropDown from '../../assets/images/ModalDropDown.js';
import OnlineIcon from '../../assets/images/Online.js';
import PaymentReport from '../../assets/images/payment_report.js';
import ReportIcon from '../../assets/images/Report Icon_active.js';
import Printer from '../../assets/images/sales_printer.js';
import TakeAwayIcon from '../../assets/images/take_away.js';
import TakaAwayReport from '../../assets/images/take_away_report.js';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import ExcelIcon from '../../assets/images/excel_icon.js';
import DatePicker from 'react-native-neat-date-picker';
import * as Print from 'expo-print';
import Toast from 'react-native-root-toast';
import { constRoleId } from "../common/RoleConstants"
import { formId } from '../common/FormIdConstants';





export default function ReportsDashboard({ navigation, route }: { navigation: any, route: any }) {

  const isFocused = useIsFocused();
  const [outletId, setOutletId] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [outletAddress, setAddress] = useState('');
  const [userRoleId, setuserRoleId] = useState('')
  const [outletName, setOutlet] = useState('');
  const [data, setData] = useState([])
  const [isDataPresent, setDataPreset] = useState(false);
  const [takeawaysales, setTakeAwaySales] = useState([])
  const [dineinsales, setDineinSales] = useState([])
  const [dineinUserSalesCount, setDineinUserSalesCount] = useState(0)
  const [takeawayUserSalesCount, setTakeAwayUserSalesCount] = useState(0)
  const [outlet, SetOutlet] = useState('')
  const [isrefreshingresult, setIsrefreshingresult] = useState(false)
  const [isStartDateTimePickerVisible, setIsStartDateTimePickerVisible] = useState(false);
  const [isEndDateTimePickerVisible, setIsEndDateTimePickerVisible] = useState(false)
  const [isChooseDatePickerVisible, setIsChooseDateTimePickerVisible] = useState(false)
  const [selectedStartDate, setSelectedStartDate] = React.useState<any>();
  const [selectedEndDate, setSelectedEndDate] = React.useState<any>();
  const [selectedChooseDate, setSelectedChooseDate] = React.useState<any>();
  const [chooseDate, setChooseDate] = React.useState<any>();
  const [dateError, setDateError] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(true);
  const [runningStatusCount, setRunningStatusCount] = useState(0)
  const [completedStatusCount, setCompletedStatusCount] = useState(0)
  const [voidStatusCount, setVoidStatusCount] = useState(0)
  const [totalStatusCnt, setTotalStatusCount] = useState(0)
  const [todaySalseByCard, setTodaySalesByCard] = useState('')
  const [todaySalesByCash, setTodaySalesByCash] = useState('')
  const [dineInValuePerc, setDineinValuePerc] = useState(0)
  const [takeAwayValuePerc, setTakeAwayValuePerc] = useState(0)
  const [onlineValuePerc, setOnlineValuePerc] = useState(0)
  const [todaySalesbycardCount, setTodaySalesbyCardCount] = useState(0)
  const [todaySalesbyCashCount, setTodaySalesbyCashCount] = useState(0)
  const [todaySalesbyOnlineCount, setTodaySalesbyOnlineCount] = useState(0)
  const [totalPaymentcount, setTotalPaymentCount] = React.useState('');
  const [todaytakeAway, setTodayTakeAway] = useState('')
  const [onlineSales, setOnlineSales] = useState('')

  
  const [todayDineIn, setTodayDineIn] = useState('')
  const [totalToday, setTotalToday] = useState()
  const [dineInSalesCnt, setDineInSalescnt] = useState(0)
  const [takeAwaySalesCnt, setTakeAwaySalescnt] = useState(0)
  const [onlineSalesCnt, setOnlineSalesCnt] = useState(0)
  const [outletData, setOutletData] = useState([]);
  const [outletKey, setOutletKey] = useState(0);
  const [outletField, setOutletField] = useState('')
  const [todayDineInSalesList, setTodayDineInSalesList] = useState([])
  const [todayTakeAwaySalesList, setTodayTakeAwaySalesList] = useState([])
  const [todayOnlineSalesList, setTodayOnlineSalesList] = useState([])
  const [takeAwayFilterList, setTakeAwayFilterData] = useState([])
  const [totalSalesList, setTotalSalesList] = useState([])
  const [dashboardPermission, setDashBoardPermission] = useState([])
  const [dineInPermission, setDineInPermission] = useState([])
  const [takeAwayPermission, setTakeAwayPermission] = useState([])
  const [onlinePermission, setOnlinePermission] = useState([])
  const [kitchenPermission, setKitchenPermission] = useState([])
  const [reportsPermission, setReportsPermission] = useState([])
  const [barPermission, setBarPermission] = useState([])
  const [mastersPermission, setMastersPermission] = useState([])
  const [selectedPrinter, setSelectedPrinter] = React.useState();
  const [totalOrders, setTotalOrders] = useState(0)
  const [dineInOrders, setDineInOrders] = useState(0)
  const [takeAwayOrders, setTakeAwayOrders] = useState(0)
  const [onlineOrders, setOnlineOrders] = useState(0)
  const [ordersValue, setOrdersValue] = useState(0)
  const [cardAED, setCardAED] = useState(0)
  const [cashAED, setCashAED] = useState(0)
  const [onlineAED, setOnlineAED] = useState(0)
  const [tapandgoAED, setTapandgoAED] = useState(0)
  const [totalTax, setTotalTax] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [restName, setRestName] = useState('')
  const [loginAddress, setloginAddress] = useState('')
  const [defauloutlet, setdefauloutlet] = useState('')







  //Calling User Info
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => getRestaurant(), 1000);
        checkPermissions();
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

  const getRestaurant = async () => {
    const userRoleId = await AsyncStorage.getItem('userRoleId')
    const restaurantName = await AsyncStorage.getItem('restaurantName')
    const outletName = await AsyncStorage.getItem('outletName')
    const outletAddress = await AsyncStorage.getItem('outletAddress')
    const outletid = await AsyncStorage.getItem('restaurantId')
    const outletId = await AsyncStorage.getItem('checkoutletId')
    // setOutletField(outletId)
    setOutletId(outletId)
    setRestaurant(restaurantName)
    setOutlet(outletName)
    setAddress(outletAddress)
    setuserRoleId(userRoleId)
    const prodRestName = await AsyncStorage.getItem('RestaurantName')
    setRestName(prodRestName)
  }

  //Permissions Filter Method
  const checkPermissions = async () => {
    const permissions = await AsyncStorage.getItem('permissions')
    const loginPermissions = JSON.parse(permissions)

    //Checking Permission for Dashboard
    const fetchDashboardStatus = loginPermissions.filter((item) => item.formId === formId.DASHBOARD && item.isFormAccess === true)
    setDashBoardPermission(fetchDashboardStatus)
    //Checking Permission for Dinein
    const fetchDineInStatus = loginPermissions.filter((item) => item.formId === formId.DINEIN && item.isFormAccess === true)
    setDineInPermission(fetchDineInStatus)
    //Checking Permission for Takeaway
    const fetchTakeAwayStatus = loginPermissions.filter((item) => item.formId === formId.TAKEAWAY && item.isFormAccess === true)
    setTakeAwayPermission(fetchTakeAwayStatus)
    //Checking Permission for Online
    const fetchOnlineStatus = loginPermissions.filter((item) => item.formId === formId.ONLINE && item.isFormAccess === true)
    setOnlinePermission(fetchOnlineStatus)
    //Checking Permission for Inventory
    const fetchInventoryStatus = loginPermissions.filter((item) => item.formId === formId.MASTERS && item.isFormAccess === true)
    setMastersPermission(fetchInventoryStatus)
    //Checking Permission for Kitchen
    const fetchKitchenStatus = loginPermissions.filter((item) => item.formId === formId.KITCHEN && item.isFormAccess === true)
    setKitchenPermission(fetchKitchenStatus)
    //Checking Permission for Bar
    const fetchBarStatus = loginPermissions.filter((item) => item.formId === formId.BAR && item.isFormAccess === true)
    setBarPermission(fetchBarStatus)
    //Checking Permission for Reportsdashboard
    const fetchReportsStatus = loginPermissions.filter((item) => item.formId === formId.REPORTS && item.isFormAccess === true)
    setReportsPermission(fetchReportsStatus)

  }

  //Get Outlet by Restaurant
  useEffect(() => {

    getOutletList();
    setOutletKey(0)
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
    let loginAddress = loginData.address
    setloginAddress(loginAddress)
    const result = await api.getAllMasterData(token, endPoint.GET_OUTLETS_BY_RESTAURANT + restaurantId);
    if (result.success === true) {
      setOutletData(result.data.outlets)
    }
    else {
    }
  }
  //filter outlet
  let outletDataArray = outletData.map((s, i) => {

    let newData = {
      key: i + 1,
      label: s.outletName,
      value: s.outletId
    }
    return newData;
  })

  //Date Selecting Functionality 
  const showDateTimePicker = (type: any) => {
    if (type === 'startDate') {
      setIsStartDateTimePickerVisible(true);
    } else if (type === 'endDate') {
      setIsEndDateTimePickerVisible(true);
    }
    else if (type === 'chooseDate') {
      setIsChooseDateTimePickerVisible(true)
    }
  };

  const hideDateTimePicker = (type: any) => {
    setIsStartDateTimePickerVisible(false);
    setIsEndDateTimePickerVisible(false);
    setIsChooseDateTimePickerVisible(false)
  };
  const handleDatePicked = (date: any, type: any) => {
    const selDate = moment(date.dateString).format("YYYY-MM-DD");
    const chooseDate = moment(date.dateString).format("DD-MM-YYYY");
    if (type === 'startDate') {
      setSelectedStartDate(selDate);
      hideDateTimePicker(type);
    } else if (type === 'endDate') {
      setSelectedEndDate(selDate);
      hideDateTimePicker(type);
    }
    else if (type === 'chooseDate') {
      dailySalesreport()
      setSelectedChooseDate(selDate)
      setChooseDate(chooseDate)
    }
    setDateError(false);
  };


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



    let myJson = {
      outletId: outletField ? outletField : loginData.outletId,
      fromDate: selectedStartDate,
      toDate: selectedEndDate,
    }

    const result = await api.CreateMasterData(endPoint.GET_ORDER_BY_COUNT, token, myJson)
    if (result.data === null) {
      setOutletKey(0)
      setIsrefreshingresult(false)
      setDataPreset(false);
    } else {
      setData(result.data);
      setDataPreset(true);
      setTotalSalesList(result?.data?.totalSalesList)
      setDineInSalescnt(result?.data?.dineIn)
      setTakeAwaySalescnt(result?.data?.walkIn)
      setOnlineSalesCnt(result?.data?.online)
      setRunningStatusCount(result?.data?.runningOrders)
      setCompletedStatusCount(result?.data?.completedOrders)
      setVoidStatusCount(result?.data?.voidOrder)
      setTotalStatusCount(result?.data?.runningOrders + result?.data?.completedOrders)
      setTodaySalesByCard(result?.data?.todaySalesByCard)
      setTodaySalesByCash(result?.data?.todaySalesByCash)
      setDineinValuePerc(result?.data?.dineInPercen)
      setOnlineValuePerc(result?.data?.onlinePercen)
      setTakeAwayValuePerc(result?.data?.takeAwayPerce)
      setTodaySalesbyCashCount(result?.data?.todaySalesByCash)
      setTodaySalesbyOnlineCount(result?.data?.todaySalesByOnline)
      setTodaySalesbyCardCount(result?.data?.todaySalesByCard)
      setTotalPaymentCount(result?.data?.todaySalesByCash + result?.data?.todaySalesByCard)
      setTodayTakeAway(result?.data?.todayTakeAway?.toFixed(2))
      setTodayDineIn(result.data?.dineInSales)
      setOnlineSales(result?.data?.onlineSales)
      setTotalToday(result?.data?.todayTakeAway + result?.data?.dineInSales)
      setIsrefreshingresult(false)
      setTodayDineInSalesList(result.data?.todayDineInSalesList)
      setTodayTakeAwaySalesList(result.data?.todayTakeAwaySalesList)
      setTodayOnlineSalesList(result.data?.todayOnlineSalesList)
    }
  }

  //API Call with Outlet
  const getUserSalesListOutlet = async () => {
    setIsrefreshingresult(true)
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let defaultOutletId = loginData.outletId;
    let myJson = {
      outletId: outletField ? outletField : loginData.outletId,
      fromDate: selectedStartDate,
      toDate: selectedEndDate,
    }

    const result = await api.CreateMasterData(endPoint.GET_ORDER_BY_COUNT, token, myJson)
    if (result.success === false) {
      setIsrefreshingresult(false)
      setDataPreset(false);
    } else {
      setData(result.data);
      setDataPreset(true);
      setTotalSalesList(result?.data?.totalSalesList)
      setDineInSalescnt(result?.data?.dineIn)
      setTakeAwaySalescnt(result?.data?.walkIn)
      setRunningStatusCount(result?.data?.runningOrders)
      setCompletedStatusCount(result?.data?.completedOrders)
      setVoidStatusCount(result?.data?.voidOrder)
      setTotalStatusCount(result?.data?.runningOrders + result?.data?.completedOrders)
      setTodaySalesByCard(result?.data?.todaySalesByCard)
      setTodaySalesByCash(result?.data?.todaySalesByCash)
      setDineinValuePerc(result?.data?.dineInPercen)
      setTakeAwayValuePerc(result?.data?.takeAwayPerce)
      setTodaySalesbyCashCount(result?.data?.todaySalesByCash)
      setTodaySalesbyCardCount(result?.data?.todaySalesByCard)
      setTodaySalesbyOnlineCount(result?.data?.todaySalesByOnline)
      setTotalPaymentCount(result?.data?.todaySalesByCash + result?.data?.todaySalesByCard)
      setTodayTakeAway(result?.data?.todayTakeAway?.toFixed(2))
      setTodayDineIn(result.data?.dineInSales)
      setTotalToday(result?.data?.todayTakeAway + result?.data?.dineInSales)
      setIsrefreshingresult(false)
      setTodayDineInSalesList(result.data?.todayDineInSalesList)
      setTodayTakeAwaySalesList(result.data?.todayTakeAwaySalesList)
      setTodayOnlineSalesList(result.data?.todayOnlineSalesList)

    }
  }

  //Daily Sales Report Calling API
  const dailySalesreport = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let defaultOutletId = loginData.outletId;
    let myJson = {
      outletId: outletField ? outletField : loginData.outletId,
      fromDate: selectedChooseDate,
      toDate: selectedChooseDate,
    }

    if (selectedChooseDate === "undefined") {
      Toast.show('Something went wrong. please try again later')
    }
    else if (selectedChooseDate != undefined) {
      const result = await api.CreateMasterData(endPoint.GET_ORDERS_FOR_PRINT_BY_DATE, token, myJson)

      setTotalOrders(result.data?.totalOrders)
      setDineInOrders(result.data?.totalDineInOrders)
      setTakeAwayOrders(result.data?.totalTakeAwayOrders)
      setOnlineOrders(result.data?.totalOnlineOrders)
      setOrdersValue(result.data?.allOrdersValue)
      setCardAED(result.data?.byCardValue)
      setCashAED(result.data?.byCashValue)
      setOnlineAED(result.data?.byOnlineValue)
      setTapandgoAED(result.data?.byTapAndGoValue)
      setTotalTax(result.data?.totalTax)
      setTotalDiscount(result.data?.totalDiscount)
      print()
    }


  }

  //------------------------------- Order By Status Pie Chart ---------------------------------
  const orderByStatusData = [
    { value: completedStatusCount, color: '#8CDDED', gradientCenterColor: '#8CDDED' },
    { value: runningStatusCount, color: '#FF97C0', gradientCenterColor: '#FF97C0' },
  ]

  //------------------------------- Order By Status Pie Chart Ends ---------------------------------

  //--------------------------------------------Order Type Data-------------------------------------
  //Dine In Order Type

  const orderTypeDineInData = [
    {
      value: dineInSalesCnt,
      color: '#8CDDED',
      gradientCenterColor: '#8CDDED',
    },
    { value: 0, color: '#959FAD', gradientCenterColor: '#959FAD' },
  ];
  //Take Away Order Type
  const orderTypeTakeAwayData = [

    { value: takeAwaySalesCnt, color: '#FF97C0', gradientCenterColor: '#FF97C0' },
    { value: 0, color: '#959FAD', gradientCenterColor: '#959FAD' },

  ];

  //Online Order Type 
  const orderByStatusDataOnline = [

    { value: onlineSalesCnt, color: '#959DFF', gradientCenterColor: '#959DFF' },
    { value: 0, color: '#959DFF', gradientCenterColor: '#959DFF' },

  ];

  //------------------------------------- Payment Data ---------------------------------
  const PaymentValuePercData = [

    {
      value: takeAwayValuePerc,
      frontColor: '#8CDDED',
    },
    { value: dineInValuePerc, frontColor: '#FF97C0' },
    { value: onlineValuePerc, frontColor: '#959DFF' },

  ];
  //------------------------------------- Payment Data Ends ---------------------------------

  //------------------------------------- Mode of Payment data --------------------------------
  const modeOfPaymentData = [
    {
      value: todaySalesbyCashCount,
      frontColor: '#8CDDED',
    },
    { value: todaySalesbycardCount, frontColor: '#FF97C0' },

  ];
  //------------------------------------- Mode of Payment data Ends --------------------------------

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
  // ----------------------------------- Total Sales Chart Data  ------------------------------------------

  const areaData = [
    { value: dineInSalesCnt },
    { value: takeAwaySalesCnt }

  ]
  const totalSalesCountData = [
    { value: dineInSalesCnt, frontColor: '#8CDDED' },
    { value: takeAwaySalesCnt, frontColor: '#FF97C0' },
    { value: onlineSalesCnt, frontColor: '#959DFF' }

  ]
  // ----------------------------------- Total Sales Chart Data Ends ------------------------------------------

  //----------------------------- Total Sales List Export ------------------------------------------------
  const filterTotalSalesList = () => {
    var dataTakeAway = totalSalesList.filter(function (item) {
      return item.orderId
    }).map(function ({ orderNo, orderType, subTotal, orderStatus }) {
      return { orderNo, orderType, subTotal, orderStatus };
    });
    exportSalesXlsx(dataTakeAway);

  }
  const exportSalesXlsx = async (data) => {
    var ws = XLSX.utils.json_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "TakeAwaySales", true);

    const wbout = XLSX.write(wb, {
      type: 'base64',
      bookType: "xlsx"
    });
    const uri = FileSystem.cacheDirectory + 'TakeAwaySales.xlsx';
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
  //----------------------------- Total Sales List Export ------------------------------------------------


  //--------------TakeAway Sales Count Export--------------------------------------------------------------
  const filterTakeAwaySalesList = () => {
    var dataTakeAway = todayTakeAwaySalesList.filter(function (item) {
      return item.orderNo
    }).map(function ({ customerName, orderNo, total, orderItemsStatus }) {
      return { customerName, orderNo, total, orderItemsStatus };
    });

    exportXlsx(dataTakeAway);

  }
  const exportXlsx = async (data) => {
    var ws = XLSX.utils.json_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "TakeAwaySales", true);

    const wbout = XLSX.write(wb, {
      type: 'base64',
      bookType: "xlsx"
    });
    const uri = FileSystem.cacheDirectory + 'TakeAwaySales.xlsx';
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
  //---------------------- TakeAway Sales Count Export Ends ------------------------
  //--------------------------- Export DineIn Sales ----------------------------------
  const filterDineInSalesList = () => {

    var dataDineIn = todayDineInSalesList.filter(function (item) {
      return item.orderNo
    }).map(function ({ customerName, orderNo, total, orderItemsStatus }) {
      return { customerName, orderNo, total, orderItemsStatus };
    });
    exportXlsxDineIn(dataDineIn)

  }

  const exportXlsxDineIn = async (data) => {
    var ws = XLSX.utils.json_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DineInsales", true);
    const wbout = XLSX.write(wb, {
      type: 'base64',
      bookType: "xlsx"
    });
    const uri = FileSystem.cacheDirectory + 'DineInsales.xlsx';
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
  //--------------------------- Export DineIn Sales Ends ----------------------------------

  //--------------------------- Export Online Sales ---------------------------------------

  const filterOnlineSalesList = () => {
    getUserSalesList
    var dataOnline = todayOnlineSalesList.filter(function (item) {
      return item.orderNo
    }).map(function ({ customerName, orderNo, total, orderItemsStatus }) {
      return { customerName, orderNo, total, orderItemsStatus };
    });
    exportXlsxOnline(dataOnline)
  }
  const exportXlsxOnline = async (data) => {
    var ws = XLSX.utils.json_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "TakeAwaySales", true);

    const wbout = XLSX.write(wb, {
      type: 'base64',
      bookType: "xlsx"
    });
    const uri = FileSystem.cacheDirectory + 'TakeAwaySales.xlsx';
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
  //--------------------------- Export Online Sales Ends ----------------------------------

  //date Picker Color
  const colorOptions = {
    headerColor: '#EC187B',
    backgroundColor: '#fff',
    weekDaysColor: '#EC187B',
    selectedDateBackgroundColor: '#EC187B',
    confirmButtonColor
      : '#EC187B',
  }

  //Call Print Invoice
  const print = async () => {
    // First, hide the date/time picker dialog
    setIsChooseDateTimePickerVisible(false);
  
    // Introduce a small delay before triggering the print function
    setTimeout(async () => {
      try {
        // Initiate the print process
        await Print.printAsync({
          html: htmltable(),
          printerUrl: selectedPrinter?.url, // iOS only
        });
      } catch (error) {
        console.error('Error while printing:', error);
      }
    }, 300); // Adjust the timeout (e.g., 300ms) based on your UI response time
  };
  
 
  
  //Invoice HTML Table  
  const htmltable = () => {
    var table = '';
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds()
    var currentime = chooseDate + ' ' + hours + ':' + min + ':' + sec

    const html = `
       <html>
       <header></header>
       <title></title>
       <style>
       // @page {
       //   margin: 20px;
       //   size: 250px;
       // }
       body {
         width: 250px;
       }
       table {
         border-collapse: collapse;
         font-family: Arial;
         width: 250px;
       }
       .text-center {
         text-align: center;
       }
           table, th, td {
             color: 484D54;
             border:1px solid #484D54;
             font-size: 12px;
             line-height: 12px;
             text-alight: left;
           }
           th,td {
             padding: 5px;
           }
           .logo {
               width: 200px;
               object-fit: contain,
               margin: 0 0 3px 0;
           }
           .text-right {
             text-align: right;
           }
           .header_blk {
             display: flex;
             justify-content: center;
             align-items: center;
             flex-direction: column;
           }
           .rest_name {
             font-size: 12px;
             line-height: 14px;
             margin: 0 0 3px 0;
           }
           .fw-bold,  table th  {
             font-weight: 700;
           }
           .text_left {
             text-alight: left !important;
           }
           .heade_print {
             margin: 0;
             font-size: 12px;
             line-height: 15px;
             font-weight: 700;
             color: 484D54;
             text-align: center;
           }
       </style>
       <body>
         <table>
           <tr>
             <th colspan="5"><p class="heade_print">Sales Report</p></th>
           </tr>
           <tr>
           <td colspan="5">
             <div class="header_blk">
               <p class="rest_name fw-bold">${restName}</p>
               <p class="rest_name">${outletName}</p>
               <p class="rest_name">${loginAddress}</p>
             </div>
           </td>
           </tr>
           <tr>
           <td colspan="5" class="text-right">Date : ${currentime}</td>
         </tr>
         
           <tr>
             <td colspan="3" class="fw-bold">Type</td>
             <td colspan="2" class="fw-bold">Value</td>
           </tr>
           <tr>
             <td colspan="3" class="">Total Orders</td>
             <td colspan="2" class="">${totalOrders}</td>
           </tr>
           <tr>
           <td colspan="3" class="">Dine In Orders</td>
           <td colspan="2" class="">${dineInOrders}</td>
         </tr>
         <tr>

         <td colspan="3" class="">Take Away Orders</td>
         <td colspan="2" class="">${takeAwayOrders}</td>
          </tr>

          <tr>
          <td colspan="3" class="">Online Orders</td>
          <td colspan="2" class="">${onlineOrders}</td>
        </tr>

        <tr>
        <td colspan="3" class="">Orders Value</td>
        <td colspan="2" class="">${ordersValue}</td>
        </tr>

        <tr>
        <td colspan="3" class="">Card AED</td>
        <td colspan="2" class="">${cardAED}</td>
      </tr>

      <tr>
      <td colspan="3" class="">Cash AED</td>
      <td colspan="2" class="">${cashAED}</td>
      </tr>

      <tr>
      <td colspan="3" class="">Online AED</td>
      <td colspan="2" class="">${onlineAED}</td>
      </tr>

      <tr>
      <td colspan="3" class="">Tapandgo AED</td>
      <td colspan="2" class="">${tapandgoAED}</td>
      </tr>

      <tr>
      <td colspan="3" class="">Total Tax</td>
      <td colspan="2" class="">${totalTax}</td>
      </tr>

      <tr>
      <td colspan="3" class="">Total Discount</td>
      <td colspan="2" class="">${totalDiscount}</td>
      </tr>
         </table>
       </body>
       </html>
       `;
    return html;
  }

  // --------------------------------------------------- User Interface ----------------------------------------------------------
  return (
    <>
      {/* Reports Dashboard Header Ends */}
      <View style={[styles.waterheader, styles.headerBlk]}>
        <View style={styles.headerFlexCenter}>

          <View style={[styles.headerFlexCenter, styles.headerLeftSec]}>
            <Image style={styles.headerLogo} source={(require('../../assets/images/logo.png'))} />
            {userRoleId === constRoleId.PRODUCT_ADMIN_ID ?
              <View>
                <View>
                  <View style={styless.headerFlexCenter}>
                    <TouchableOpacity onPress={() => navigation.navigate('Restaurant')} style={[styless.resFlex, styless.headingMargin]}>
                      <Text style={[styless.headingText]}>{restaurant}</Text>
                      <Image style={styless.dropDownIcon} source={(require('../../assets/images/chevron_left.png'))} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.headerFlexCenter}>
                    <TouchableOpacity onPress={() => navigation.navigate('SelectOutlet', { outletId: outletId })} style={[styless.resFlex, styless.headingMargin]}>
                      <Text ellipsizeMode='tail' numberOfLines={1} style={[styless.headingText, styless.width100px]}>{outletName}</Text>
                      <Image style={styless.dropDownIcon} source={(require('../../assets/images/chevron_left.png'))} />
                    </TouchableOpacity>
                    <View style={[styles.headerFlexCenter, styles.online]}>
                      <View style={styles.onlineCircle}></View>
                      <Text style={styles.onlineText}>Online</Text>
                    </View>
                  </View>
                </View>
              </View> :


              <View>
                <View style={styless.headerFlexCenter}>
                  <Text style={[styless.headingText]}>{restName}</Text>
                  <Image style={styless.dropDownIcon} source={(require('../../assets/images/chevron_left.png'))} />
                </View>
                <View style={styles.headerFlexCenter}>
                  <TouchableOpacity onPress={() => navigation.navigate('SelectOutlet', { outletId: outletId })} style={[styless.resFlex, styless.headingMargin]}>
                    <Text ellipsizeMode='tail' numberOfLines={1} style={[styless.headingText, styless.width100px]}>{outletName}</Text>
                    <Image style={styless.dropDownIcon} source={(require('../../assets/images/chevron_left.png'))} />
                  </TouchableOpacity>
                  <View style={[styles.headerFlexCenter, styles.online]}>
                    <View style={styles.onlineCircle}></View>
                    <Text style={styles.onlineText}>Online</Text>
                  </View>
                </View>
              </View>
            }

          </View>



          <View style={[styles.dashboardMenuHeader]}>

            <View>
              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
                  <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                      <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                        <DashboardIcon />
                        <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Dashboard</Text>
                      </View>
                    </TouchableOpacity>
                  </View> : dashboardPermission[0]?.isFormAccess === true ?
                    <View>
                      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                        <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                          <DashboardIcon />
                          <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Dashboard</Text>
                        </View>
                      </TouchableOpacity>
                    </View> : null
                }
              </View>

            </View>

            <View>
              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
                  <View>
                    <TouchableOpacity onPress={() => navigation.navigate('DineIn')}>
                      <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                        <DineInIcon />
                        <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Dine In</Text>
                      </View>
                    </TouchableOpacity>
                  </View> : dineInPermission[0]?.isFormAccess === true ?
                    <View>
                      <TouchableOpacity onPress={() => navigation.navigate('DineIn')}>
                        <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                          <DineInIcon />
                          <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Dine In</Text>
                        </View>
                      </TouchableOpacity>
                    </View> : null
                }
              </View>
            </View>

            <View>
              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
                  <View>
                    <TouchableOpacity onPress={() => navigation.navigate('TakeAway')}>
                      <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                        <TakeAwayIcon />
                        <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Take Away</Text>
                      </View>
                    </TouchableOpacity>
                  </View> : takeAwayPermission[0]?.isFormAccess === true ?
                    <View>
                      <TouchableOpacity onPress={() => navigation.navigate('TakeAway')}>
                        <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                          <TakeAwayIcon />
                          <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Take Away</Text>
                        </View>
                      </TouchableOpacity>
                    </View> : null
                }
              </View>

            </View>

            <View>
              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
                  <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Online')}>
                      <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                        <OnlineIcon />
                        <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Online</Text>
                      </View>
                    </TouchableOpacity>
                  </View> : onlinePermission[0]?.isFormAccess === true ?
                    <View>
                      <TouchableOpacity onPress={() => navigation.navigate('Online')}>
                        <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                          <OnlineIcon />
                          <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Online</Text>
                        </View>
                      </TouchableOpacity>
                    </View> : null
                }
              </View>

            </View>

            <View>
              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
                  <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Inventory')}>
                      <View style={[styles.dashboardHeader, styles.headerRightBorder, styles.headerLeftBorder]}>
                        <InvenIcon />
                        <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Inventory</Text>
                      </View>
                    </TouchableOpacity>
                  </View> : mastersPermission[0]?.isFormAccess === true ?
                    <View>
                      <TouchableOpacity onPress={() => navigation.navigate('Inventory')}>
                        <View style={[styles.dashboardHeader, styles.headerRightBorder, styles.headerLeftBorder]}>
                          <InvenIcon />
                          <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Inventory</Text>
                        </View>
                      </TouchableOpacity>
                    </View> : null
                }
              </View>

            </View>

            <View>
              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
                  <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Kitchen')}>
                      <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                        <KitchenIcon />
                        <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Kitchen</Text>
                      </View>
                    </TouchableOpacity>
                  </View> : kitchenPermission[0]?.isFormAccess ?
                    <View>
                      <TouchableOpacity onPress={() => navigation.navigate('Kitchen')}>
                        <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                          <KitchenIcon />
                          <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Kitchen</Text>
                        </View>
                      </TouchableOpacity>
                    </View> : null
                }
              </View>

            </View>

            <View>
              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
                  <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Bar')}>
                      <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                        <BarIcon />
                        <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Bar</Text>
                      </View>
                    </TouchableOpacity>
                  </View> : barPermission[0]?.isFormAccess === true ?
                    <View>
                      <TouchableOpacity onPress={() => navigation.navigate('Bar')}>
                        <View style={[styles.dashboardHeader, styles.headerRightBorder]}>
                          <BarIcon />
                          <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Bar</Text>
                        </View>
                      </TouchableOpacity>
                    </View> : null
                }
              </View>
            </View>

            <View>
              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID || userRoleId === constRoleId.COMPANY_ADMIN_ID ?
                  <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ReportsDashboard')}>
                      <View style={[styles.dashboardHeader, styles.dashMenuActive]}>
                        <ReportIcon />
                        <Text style={[styles.font13, styles.priText, styles.fontBold, styles.padtop5]}>Reports</Text>
                      </View>
                    </TouchableOpacity>
                  </View> : reportsPermission[0]?.isFormAccess === true ?
                    <View>
                      <TouchableOpacity onPress={() => navigation.navigate('ReportsDashboard')}>
                        <View style={[styles.dashboardHeader, styles.dashMenuActive]}>
                          <ReportIcon />
                          <Text style={[styles.font13, styles.priText, styles.fontBold, styles.padtop5]}>Reports</Text>
                        </View>
                      </TouchableOpacity>
                    </View> : null
                }
              </View>
            </View>

          </View>

        </View>
        <View style={styless.headerFlexCenter}>
          <View>
            <Appbar.Action style={{ alignSelf: 'flex-end' }}
              icon='menu'
              onPress={() => navigation.openDrawer()}
            />
          </View>
        </View>
      </View>
      {/* Reports Dashboard Header Ends */}

      {/* Date Picker Starts Popup*/}

      {/* Select Start Date */}
      <DatePicker
        mode={'single'}
        colorOptions={colorOptions}
        modalStyles={{ backgroundColor: '#484D546E' }}
        isVisible={isStartDateTimePickerVisible}
        onConfirm={date => handleDatePicked(date, 'startDate')}
        onCancel={() => hideDateTimePicker('startDate')}
      />
      {/*Select End Date */}
      <DatePicker
        mode={'single'}
        colorOptions={colorOptions}
        modalStyles={{ backgroundColor: '#484D546E' }}
        isVisible={isEndDateTimePickerVisible}
        onConfirm={date => handleDatePicked(date, 'endDate')}
        onCancel={() => hideDateTimePicker('endDate')}
      />

      {/*Choose Date */}
      <DatePicker
        mode={'single'}
        colorOptions={colorOptions}
        modalStyles={{ backgroundColor: '#484D546E' }}
        isVisible={isChooseDatePickerVisible}
        onConfirm={date => handleDatePicked(date, 'chooseDate')}
        onCancel={() => hideDateTimePicker('chooseDate')}
      />
      {/* Date Picker Popup Ends */}

      <ScrollView nestedScrollEnabled={false} style={[styles.reportDashVieew]}>
        <View>
          {/* Outlet Dropdown Starts */}
          <View style={[styles.flexrow, styles.marBtm30, styles.alignCenter, styles.justifyBetween]}>
            <View style={[styles.flexrow, styles.marBtm30, styles.alignCenter, styles.justifyBetween]}>
              <View style={[styles.flexrow]}>
                <View style={[styles.width170px]}>
                  <View style={styles.pickerView}>
                    <ModalDropDown style={styles.outletImg} />
                    
                    <ModalSelector
                      data={outletDataArray.sort(function (a, b) {
                        return a.label.localeCompare(b.label);
                      })}
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
                      selectedKey={outletKey}
                      onChange={(option) => {
                        if (option.key) {
                          setOutletKey(option.key);
                          setOutletField(option.value);
                        }
                      }}
                    />
                  </View>
                </View>
                {/* <View style={[styles.width170px, styles.padL10]}>
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
                    <Text style={styles.errorText}>Start date cannot be greater than end date </Text>
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
                  <TouchableOpacity style={styles.SearchBtn} onPress={() => getUserSalesListOutlet()}>
                    <Text style={[styles.textWhite, styles.font11]}>Search</Text>
                  </TouchableOpacity>
                </View> */}
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
      getUserSalesListOutlet();
    }}
  >
    <Text style={[styles.textWhite, styles.font11]}>Search</Text>
  </TouchableOpacity>
</View>


              </View>
            </View>
            <TouchableOpacity onPress={() => showDateTimePicker('chooseDate')}>
              <View style={[styles.flexrow, styles.alignCenter]}>
                <Printer />
                <Text style={[styles.font9, styles.padL5, styles.priText]} onPress={() => showDateTimePicker('chooseDate')}>Print Sales Report</Text>
              </View>
            </TouchableOpacity>

          </View>
          {/* Outlet Dropdown Ends */}

          {/* Reports Dashboard Top Data UI Starts */}
          <Text style={[styles.textBlack, styles.font9, styles.marBtm20, styles.paddRL10]}>*By default past one week data shown below if no date range filter applied.</Text>

          <View style={[styles.dashTopHeader]}>
            <View style={[styles.dashColTop]}>
              <View style={[styles.dashTopCon, styles.justifyBetween]}>
                <View>
                  <Text style={[styles.textBlack, styles.font14, styles.fontBold, styles.padB6]}>AED {todaytakeAway}</Text>
                  <Text style={[styles.textBlack, styles.font12]}>Take Away Sales</Text>
                </View>
                <TakaAwayReport />
              </View>
            </View>
            <View style={[styles.dashColTop]}>
              <View style={[styles.dashTopCon, styles.justifyBetween]}>
                <View>
                  <Text style={[styles.textBlack, styles.font14, styles.fontBold, styles.padB6]}> AED {todayDineIn}</Text>
                  <Text style={[styles.textBlack, styles.font12]}>Dine-In Sales</Text>
                </View>
                <DineinReport />
              </View>
            </View>
            <View style={[styles.dashColTop]}>
              <View style={[styles.dashTopCon, styles.justifyBetween]}>
                <View>
                  <Text style={[styles.textBlack, styles.font14, styles.fontBold, styles.padB6]}>AED {onlineSales}</Text>
                  <Text style={[styles.textBlack, styles.font12]}>Online Sales</Text>
                </View>
                <PaymentReport />
              </View>
            </View>
          </View>
          {/* Reports Dashboard Top Data UI Ends */}

          <View style={[styles.dashTopHeader, styles.justifyBetween, { paddingHorizontal: 9, paddingBottom: 21 }]}>
            {/* Sales count HTML */}
            <View style={[styles.dashTopCon, styles.flexWrap, styles.salesColumn]}>
              <View style={[styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.wdth100, styles.marBtm30]}>
                <Text style={styles.dineInText}>Sales Count</Text>
                <View style={[styles.flexrow, styles.alignCenter]}>

                  <ExcelIcon />
                  <Text style={[styles.font9, styles.padL5, styles.textBlack]} onPress={() => filterTotalSalesList()}>Export</Text>
                </View>
              </View>
              {isrefreshingresult ? <View style={[styles.flexrow, styles.alignCenter, styles.justifyCenter, styles.pad20, styles.wdth100]}>
                <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
              </View> :
                <View style={[styles.flexrow]}>
                  <View style={[styles.salesColumn]}>
                    <BarChart
                      data={totalSalesCountData} />
                  </View>
                  <View style={styles.leftCon}>
                    <View style={styles.totComView}>
                      <View style={[styles.penCircle, styles.salesDineIn]}>
                      </View>
                      <Text style={[styles.completedText, styles.textDefault]}>{dineInSalesCnt} Dine In </Text>
                    </View>
                    <View style={styles.totComView}>
                      <View style={[styles.penCircle, styles.reppenCircle]}></View>
                      <Text style={[styles.completedText, styles.textDefault]}>{takeAwaySalesCnt} Take Away</Text>
                    </View>
                    <View style={styles.totComView}>
                      <View style={[styles.penCircle, styles.VoidCircle]}>
                      </View>
                      <Text style={[styles.completedText, styles.textDefault]}>{onlineSalesCnt} Online </Text>
                    </View>
                  </View>
                </View>
              }
            </View>
            {/* Sales count HTML - ends */}

            {/* order by Sales HTML */}
            <View style={[styles.dashTopCon, styles.flexWrap, styles.orderColumn]}>
              <View style={[styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.wdth100, styles.marBtm30]}>
                <Text style={styles.dineInText}>Order by Status</Text>
                <View style={[styles.flexrow, styles.alignCenter]}>
                  <ExcelIcon />
                  <Text style={[styles.font9, styles.padL5, styles.textBlack]} onPress={() => filterTotalSalesList()} >Export</Text>
                </View>
              </View>
              {isrefreshingresult ? <View style={[styles.flexrow, styles.alignCenter, styles.justifyCenter, styles.pad20, styles.wdth100]}>
                <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
              </View> :
                <View style={[styles.flexrow, styles.flexWrap]}>
                  <View style={[styles.width100, styles.flexrow, styles.justifyCenter]}>
                    <PieChart
                      data={orderByStatusData}
                      donut
                      showGradient
                      sectionAutoFocus
                      radius={70}
                      innerRadius={50}
                      innerCircleColor={'#fff'}
                      centerLabelComponent={() => {
                        return (
                          <View style={[styles.justifyCenter, styles.alignCenter]}>
                            <Text style={styles.chartCount}>{totalStatusCnt}</Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                  <View style={[styles.wdth100, styles.flexrow, styles.flexWrap]}>
                    <View style={[styles.totComView, styles.width50, styles.padR4]}>
                      <View style={[styles.penCircle, styles.reppenCircle]}>
                      </View>
                      <Text style={[styles.font10, styles.textBlack, styles.paddL5]}>{runningStatusCount} Running </Text>
                    </View>
                    <View style={[styles.totComView, styles.width50, styles.padR4]}>
                      <View style={[styles.penCircle, styles.repComCircle]}></View>
                      <Text style={[styles.font10, styles.textBlack, styles.paddL5]}>{completedStatusCount} Completed</Text>
                    </View>
                  </View>
                </View>
              }
            </View>
            {/* order by Sales HTML - Ends */}

          </View>

          <View style={[styles.dashTopHeader, styles.paddB60]}>

            {/* order type HTML */}
            <View style={[styles.dashColTop100]}>
              <View style={[styles.dashTopCon, styles.flexWrap]}>
                <View style={[styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.wdth100, styles.marBtm30]}>
                  <Text style={styles.dineInText}>Order Type</Text>
                </View>
                {isrefreshingresult ? <View style={[styles.flexrow, styles.alignCenter, styles.justifyCenter, styles.pad20, styles.wdth100]}>
                  <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
                </View> :
                  <View style={[styles.flexrow, styles.wdth100]}>
                    <View style={[styles.width33, styles.paddRL10, styles.dashedBorderRgt]}>
                      <View style={[styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.marBtm10]}>
                        <Text style={[styles.font12, styles.textBlack]}>Dine In Sales</Text>
                        <TouchableOpacity style={[styles.flexrow, styles.alignCenter]} onPress={() => filterDineInSalesList()}>
                          <ExcelIcon />
                          <Text style={[styles.font9, styles.padL5, styles.textBlack]} onPress={() => filterDineInSalesList()}>Export</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.flexColumn, styles.alignCenter]}>
                        <View >
                          <PieChart
                            data={orderTypeDineInData}
                            donut
                            showGradient
                            sectionAutoFocus
                            radius={70}
                            innerRadius={50}
                            innerCircleColor={'#fff'}
                            centerLabelComponent={() => {
                              return (
                                <View style={[styles.justifyCenter, styles.alignCenter]}>
                                  <Text style={styles.chartCount}>{dineInSalesCnt}</Text>
                                </View>
                              );
                            }}
                          />
                        </View>
                        <View style={[styles.wdth100, styles.flexrow, styles.flexWrap]}>
                        </View>
                      </View>
                    </View>
                    <View style={[styles.width33, styles.paddRL10, styles.dashedBorderRgt]}>
                      <View style={[styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.marBtm10]}>
                        <Text style={[styles.font12, styles.textBlack]}>Take Away Sales</Text>
                        <TouchableOpacity style={[styles.flexrow, styles.alignCenter]} onPress={() => filterTakeAwaySalesList()}>
                          <ExcelIcon />
                          <Text style={[styles.font9, styles.padL5, styles.textBlack]} onPress={() => filterTakeAwaySalesList()}>Export</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.flexColumn, styles.alignCenter]}>
                        <View>
                          <PieChart
                            data={orderTypeTakeAwayData}
                            donut
                            showGradient
                            sectionAutoFocus
                            radius={70}
                            innerRadius={50}
                            innerCircleColor={'#fff'}
                            centerLabelComponent={() => {
                              return (
                                <View style={[styles.justifyCenter, styles.alignCenter]}>
                                  <Text style={styles.chartCount}>{takeAwaySalesCnt}</Text>
                                </View>
                              );
                            }}
                          />
                        </View>
                        <View style={[styles.wdth100, styles.flexrow, styles.flexWrap]}>
                        </View>
                      </View>
                    </View>
                    <View style={[styles.width33, styles.paddRL10]}>
                      <View style={[styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.marBtm10]}>
                        <Text style={[styles.font12, styles.textBlack]}>Online Sales</Text>
                        <TouchableOpacity style={[styles.flexrow, styles.alignCenter]} onPress={() => filterOnlineSalesList()}>
                          <ExcelIcon />
                          <Text style={[styles.font9, styles.padL5, styles.textBlack]} onPress={() => filterOnlineSalesList()}>Export</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.flexColumn, styles.alignCenter]}>
                        <View>
                          <PieChart
                            data={orderByStatusDataOnline}
                            donut
                            showGradient
                            sectionAutoFocus
                            radius={70}
                            innerRadius={50}
                            innerCircleColor={'#fff'}
                            centerLabelComponent={() => {
                              return (
                                <View style={[styles.justifyCenter, styles.alignCenter]}>
                                  <Text style={styles.chartCount}>{onlineSalesCnt}</Text>
                                </View>
                              );
                            }}
                          />
                        </View>
                        <View style={[styles.wdth100, styles.flexrow, styles.flexWrap]}>
                        </View>
                      </View>
                    </View>
                  </View>
                }
              </View>
            </View>
            {/* order type HTML - Ends */}

            {/* Payment HTML */}
            <View style={[styles.dashColTop, styles.width50]}>
              <View style={[styles.dashTopCon, styles.flexWrap]}>
                <View style={[styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.wdth100, styles.marBtm30]}>
                  <Text style={styles.dineInText}>Payments</Text>
                </View>
                {isrefreshingresult ? <View style={[styles.flexrow, styles.alignCenter, styles.justifyCenter, styles.pad20, styles.wdth100]}>
                  <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
                </View> :
                  <View style={[styles.width100per]}>
                    <View style={[styles.width100per]}>
                      <BarChart
                        data={PaymentValuePercData}
                      />
                    </View>
                    <View style={[styles.flexrow, styles.justifyEnd]}>
                      <View style={styles.totComView}>
                        <View style={[styles.penCircle, styles.repComCircle]}>
                        </View>
                        <Text style={[styles.completedText, styles.textDefault]}>Take Away {takeAwayValuePerc?.toFixed(2)} %</Text>
                      </View>
                      <View style={[styles.totComView, styles.padL10]}>
                        <View style={[styles.penCircle, styles.reppenCircle]}></View>
                        <Text style={[styles.completedText, styles.textDefault]}>Dine In {dineInValuePerc?.toFixed(2)} %</Text>
                      </View>
                      <View style={[styles.totComView, styles.padL10]}>
                        <View style={[styles.penCircle, styles.VoidCircle]}></View>
                        <Text style={[styles.completedText, styles.textDefault]}>Online {onlineValuePerc?.toFixed(2)} %</Text>
                      </View>
                    </View>
                  </View>
                }
              </View>
            </View>
            {/* Payment HTML - Ends */}

            {/* mode of Payment HTML */}
            <View style={[styles.dashColTop, styles.width50]}>
              <View style={[styles.dashTopCon, styles.flexWrap]}>
                <View style={[styles.flexrow, styles.alignCenter, styles.justifyBetween, styles.wdth100, styles.marBtm30]}>
                  <Text style={styles.dineInText}>Mode of Payments</Text>
                </View>
                {isrefreshingresult ? <View style={[styles.flexrow, styles.alignCenter, styles.justifyCenter, styles.pad20, styles.wdth100]}>
                  <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
                </View> :
                  <View style={[styles.flexColumn, styles.alignCenter, styles.wdth100]}>
                    <View>
                      <BarChart
                        data={modeOfPaymentData}
                      />
                    </View>
                    <View style={[styles.flexrow, styles.justifyCenter, styles.martop15]}>
                      <View style={[styles.paddRL15, styles.dashedBorderRgt]}>
                        <View style={[styles.flexrow, styles.alignCenter, styles.justifyCenter, styles.padB6]}>
                          <Text style={[styles.font16, styles.fontBold, styles.textDefault]}>AED</Text>
                          <Text style={[styles.font16, styles.fontBold, styles.textBlack, styles.padL2]}>{data?.todaySalesByCash}</Text>
                        </View>
                        <View style={[styles.flexrow, styles.justifyCenter, styles.alignCenter]}>
                          <View style={[styles.penCircle, styles.repComCircle]}>
                          </View>
                          <Text style={[styles.font12, styles.textBlack, styles.padL5]}>Cash</Text>
                        </View>
                      </View>
                      <View style={[styles.paddRL15]}>
                        <View style={[styles.flexrow, styles.alignCenter, styles.justifyCenter, styles.padB6]}>
                          <Text style={[styles.font16, styles.fontBold, styles.textDefault]}>AED</Text>
                          <Text style={[styles.font16, styles.fontBold, styles.textBlack, styles.padL2]}>{data?.todaySalesByCard}</Text>
                        </View>
                        <View style={[styles.flexrow, styles.justifyCenter, styles.alignCenter]}>
                          <View style={[styles.penCircle, styles.reppenCircle]}>
                          </View>
                          <Text style={[styles.font12, styles.textBlack, styles.padL5]}>Card</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                }
              </View>
            </View>
            {/* mode of Payment HTML - Ends */}

          </View>
        </View>
      </ScrollView>

    </>
  )
}