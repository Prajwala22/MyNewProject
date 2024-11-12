import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as Print from 'expo-print';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import { Appbar, Searchbar } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import styles, { default as styless } from '../../assets/css/style';
import BarIcon from '../../assets/images/bar.js';
import DashboardIcon from '../../assets/images/dashbord.js';
import DineInIcon from '../../assets/images/dine_in.js';
import InternetDownIcon from '../../assets/images/internet_down.js';
import InvenIcon from '../../assets/images/inventory_icon.js';
import KitchenIcon from '../../assets/images/kitchen_icon_active.js';
import OnlineIcon from '../../assets/images/Online.js';
import ReportIcon from '../../assets/images/Report Icon';
import SearchIcon from '../../assets/images/search.js';
import TakeAwayIcon from '../../assets/images/take_away.js';
import api from '../../services/api/callingApi';
import { constRoleId } from "../common/RoleConstants"
import { formId } from '../common/FormIdConstants';




export default function Kitchen({ navigation, route }: { navigation: any, route: any }) {
  const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
  const [data, setData] = useState([]);
  const [prepareddata, setPreparedData] = useState([]);
  const [readydata, setReadyData] = useState([]);
  const [tempdata, setTempData] = useState([]);
  const [tempprepareddata, setTempPreparedData] = useState([]);
  const [tempreadydata, setTempReadyData] = useState([]);
  const [runningOrderListdata, setRunningOrderListData] = useState([])
  const [restaurant, setRestaurant] = useState('');
  const [outletName, setOutlet] = useState('');
  const [outletId, setOutletId] = useState('');
  const [isDataPresent, setDataPreset] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const isFocused = useIsFocused();
  const [showViewId, setShowViewId] = useState('');
  const [showView, setShowView] = useState(false);
  const [isrefreshingkichendata, setisrefreshingkichendata] = useState(false);
  const [printdata, setPrintData] = useState([]);
  const [itemorderDate, setItemorderDate] = React.useState();
  const [itemorderDateOnly, setItemorderDateOnly] = React.useState();

  const [itemorderType, setItemOrderType] = React.useState();
  const [itemorderNo, setItemOrderNo] = React.useState();
  const [openNotes, setOpenNotes] = useState(false)
  const [notesDisplay, setNotesDisplay] = useState('')
  const [finalNotesDisplay, setFinalNotesDisplay] = useState('')
  const [tableNo, setTableNo] = useState(" ")
  const [itemsId, setItemsId] = useState([])
  const [totaldineorder, settotaldineorder] = useState([])
  const [totalTakawayorder, settotalTakawayorder] = useState([])
  const [readydineorder, setreadydineorder] = useState([])
  const [readyTakawayorder, setreadyTakawayorder] = useState([])
  const [userRoleId, setuserRoleId] = useState('')
  const [dashboardPermission, setDashBoardPermission] = useState([])
  const [dineInPermission, setDineInPermission] = useState([])
  const [takeAwayPermission, setTakeAwayPermission] = useState([])
  const [onlinePermission, setOnlinePermission] = useState([])
  const [kitchenPermission, setKitchenPermission] = useState([])
  const [reportsPermission, setReportsPermission] = useState([])
  const [barPermission, setBarPermission] = useState([])
  const [mastersPermission, setMastersPermission] = useState([])
  const [selectedPrinter, setSelectedPrinter] = React.useState();
  const [restName, setRestName] = useState('')



  //Search Items in the order
  const handlesearchchange = (text: any) => {
    setSearchQuery(text);
    if (text.length > 0) {
      const filtereddata = tempdata.filter(element => {
        return parseInt(element.orderNo) === parseInt(text);
      });
      setData(filtereddata)
      const filteredprpare = tempprepareddata.filter(element => {
        return parseInt(element.orderNo) === parseInt(text);
      });
      setPreparedData(filteredprpare)
      const filteredready = tempreadydata.filter(element => {
        return parseInt(element.orderNo) === parseInt(text);
      });
      setReadyData(filteredready)

    } else {
      setData(tempdata)
      setPreparedData(tempprepareddata)
      setReadyData(tempreadydata)
    }
  }

  //Get User information
  useEffect(() => {
    checkPermissions();
    getUserInfo();
    setShowView(false)
  }, [isFocused])
  const getUserInfo = async () => {
    const userRoleId = await AsyncStorage.getItem('userRoleId')
    setuserRoleId(userRoleId)
    const restaurantName = await AsyncStorage.getItem('restaurantName')
    const outletName = await AsyncStorage.getItem('outletName')
    setRestaurant(restaurantName)
    setOutlet(outletName)
    setOutletId(outletId)
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

  //Auto Refresh 
  React.useEffect(() => {
    const interval = setInterval(() => {
      // this will always be 0
      GetOrdersByStatus()
    }, 50000);
    return () => clearInterval(interval)
  }, []);
  const GetOrdersByStatus = async () => {
    setisrefreshingkichendata(true)
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let emailId = loginData.username;
    let token = loginData.token;
    let orderType = 'Running'
    let outletId = loginData.outletId
    const result = await api.GetOrdersByStatus(token, orderType, outletId);
    setisrefreshingkichendata(false)
  }

  /// Get the RunningOrders list
  useEffect(() => {
    getRunningOrdersList();
    return () => {
      setData([]);
      setRunningOrderListData([])
    }
  }, [isFocused]);

  const getRunningOrdersList = async () => {
    setisrefreshingkichendata(true)
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    let status = 'Running'
    let orderType = 'Running'
    const result = await api.GetOrdersByStatus(token, orderType, outletId);
    if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
      successInternetdownOpen()
      setDataPreset(false);

    } else {
      //   const filterData = result.data.filter((category) =>
      //   category.items.find((g) => g.itemStatus === "Order" && g.itemLocation === "Kitchen")
      // );
      const filterData1 = result.data.map((category) => {
        const filteredItems = category.items.filter(
          (item) => item.itemStatus === "Order" && item.itemLocation === "Kitchen"
        );

        return { ...category, items: filteredItems };
      });

      const filterData = filterData1.filter((category) => category.items.length > 0)
      setDataPreset(true);
      setRunningOrderListData(filterData)
      setisrefreshingkichendata(false)
      setData(filterData);
      setTempData(filterData)

      // Preparing Data starts from here
      // const filterPrepareData = result.data.filter((category) =>
      //   category.items.find((g) => g.itemStatus === "Prepared" && g.itemLocation === "Kitchen")
      // );
      const filterData2 = result.data.map((category) => {
        const filteredItems = category.items.filter(
          (item) => item.itemStatus === "Prepared" && item.itemLocation === "Kitchen"
        );

        return { ...category, items: filteredItems };
      });
      const filterPrepareData = filterData2.filter((category) => category.items.length > 0)
      setPreparedData(filterPrepareData)

      setTempPreparedData(filterPrepareData)
      //filter Ready order data
      // const filterRunningData = result.data.filter((category) =>
      //   category.items.find((g) => g.itemStatus === "Ready" && g.itemLocation === "Kitchen")
      // );
      const filterData3 = result.data.map((category) => {
        const filteredItems = category.items.filter(
          (item) => item.itemStatus === "Ready" && item.itemLocation === "Kitchen"
        );

        return { ...category, items: filteredItems };
      });
      const filterRunningData = filterData3.filter((category) => category.items.length > 0)
      setReadyData(filterRunningData)
      setTempReadyData(filterRunningData)
      //filter data by dinein order
      const filterDinerinorderData = result.data.filter((element) =>
        element.items.find((g) => element.orderType === "Dine-in" && g.itemLocation === "Kitchen")
      );
      //filter data by takeaway
      const filterWalkinorderData = result.data.filter((element) =>
        element.items.find((g) => element.orderType === "Walk-in" && g.itemLocation === "Kitchen")
      );

      const filterRunningdineData = filterRunningData.filter((element) =>
        element.orderType === "Dine-in"
      );
      const filterRunningtakeawayData = filterRunningData.filter((element) =>
        element.orderType === "Walk-in"
      );
      setreadyTakawayorder(filterRunningtakeawayData)
      setreadydineorder(filterRunningdineData)
      setreadydineorder(filterRunningData)

      settotalTakawayorder(filterWalkinorderData)
      settotaldineorder(filterDinerinorderData)
    }
  }
  //Preparing Status Api Call
  const preparingApiCall = async (data) => {
    setisrefreshingkichendata(false)
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    let Itemstatus = "Prepared"
    let myJson = data.map(function (item) {
      return item?.id
    });
    const result = await api.changeItemStatusPrep(showViewId, Itemstatus, myJson, token)
    if (result.success) {
      Toast.show('Item status changed Successfully!', {
        duration: Toast.durations.LONG,
      });
      getRunningOrdersList();
    }
    else {
      successInternetdownOpen()
    }
  }

  //Prepared data Call method
  const ReadyApiCall = async (data) => {
    setisrefreshingkichendata(false)
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    let Itemstatus = "Ready"
    let myJson = data.map(function (item) {
      return item?.id
    });
    const result = await api.changeItemStatusPrep(showViewId, Itemstatus, myJson, token)
    if (result.success) {
      Toast.show('Item status changed Successfully!', {
        duration: Toast.durations.LONG,
      });
      getRunningOrdersList();
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    else {
      successInternetdownOpen()
    }
  }

  //Print the order data 
  const htmltable = () => {
    var table = '';
    var itemstatus = '';
    for (let i in printdata) {
      var itemcount = parseInt(i) + 1;
      const item = printdata[i];
      if (itemorderType === 'Dine-in') {
        table = table + `
      <tr>
      <td colspan="2">${itemcount}</td> 
      <td colspan="2"> ${item?.itemName}</td>
      <td colspan="2"> ${item?.notes}</td>
      <td colspan="2"> ${item?.orderQuantity.toFixed(2)}</td> 
      </tr>`
      } else {
        table = table + `
      <tr>
      <td colspan="2">${itemcount}</td> 
      <td colspan="2"> ${item?.itemName}</td>
      <td colspan="2">NA</td>
      <td colspan="2"> ${item?.orderQuantity.toFixed(2)}</td> 
      </tr>`
      }
    }

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
            font-size: 11px;
            line-height: 11px;
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
          .Order_no {
            margin: 8px 0 0 0;
            font-size: 12px;
            line-height: 15px;
            color: 484D54;
            text-align: center;
          }
      </style>
      <body>
        <table>
          <tr>
          <th colspan="2">Order No: <span class="fw-bold">${itemorderNo}</span></th>
          <th colspan="4">Kitchen Print</th>
          <th colspan="2">Table No:${tableNo}</th>
           
          </tr>
          <tr>
            <td colspan="4" class="fw-bold">Order Type : ${itemorderType}</td>
           
            <td colspan="4" class="fw-bold">Time :${itemorderDateOnly} ${itemorderDate}</td>
          </tr>
          <tr>
            <th colspan="2">SI No</th>
            <th colspan="2">Item</th>
            <th colspan="2">Item Notes</th>
            <th colspan="2">Quantity</th>
          </tr>
          ${table}
            <tr>
            <td colspan="8" class="fw-bold"> Order Notes: ${finalNotesDisplay}</td> 
            <tr>
        </table>
        
      </body>
      </html>
      `;
    return html;
  }

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html: htmltable(),
      printerUrl: selectedPrinter?.url, // iOS only
    });
  }

  //Show Item Notes
  const toggleModa1 = () => {
    setOpenNotes(!openNotes)
  }

  //Open Item notes popup
  const notesPop = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>
          <View>
            <View style={styles.popupHeadWrap}>
              <Text style={styles.textStyle3}>
                Item Notes
              </Text>
              <Pressable style={styles.closeView} onPress={() => toggleModa1()}>
                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                <Text style={styles.closeText}>
                  Close
                </Text>
              </Pressable>
            </View>
            <View style={styles.paynowPopupRow}>
              <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                <Text>{notesDisplay}</Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }

  //----------------------------------------------- User Interface -----------------------------------------------------------------

  return (
    <>
      {/* Kitchen Header Starts*/}
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
                      <View style={[styles.dashboardHeader, styles.headerRightBorder, styles.dashMenuActive]}>
                        <KitchenIcon />
                        <Text style={[styles.font13, styles.priText, styles.fontBold, styles.padtop5]}>Kitchen</Text>
                      </View>
                    </TouchableOpacity>
                  </View> : kitchenPermission[0]?.isFormAccess ?
                    <View>
                      <TouchableOpacity onPress={() => navigation.navigate('Kitchen')}>
                        <View style={[styles.dashboardHeader, styles.headerRightBorder, styles.dashMenuActive]}>
                          <KitchenIcon />
                          <Text style={[styles.font13, styles.priText, styles.fontBold, styles.padtop5]}>Kitchen</Text>
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
                      <View style={[styles.dashboardHeader]}>
                        <ReportIcon />
                        <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Reports</Text>
                      </View>
                    </TouchableOpacity>
                  </View> : reportsPermission[0]?.isFormAccess === true ?
                    <View>
                      <TouchableOpacity onPress={() => navigation.navigate('ReportsDashboard')}>
                        <View style={[styles.dashboardHeader]}>
                          <ReportIcon />
                          <Text style={[styles.font13, styles.menuText, styles.fontBold, styles.padtop5]}>Reports</Text>
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
      {/* Kitchen Header Ends*/}

      <ScrollView>
        <View style={[styles.kitchenCon]}>
          <View style={[styles.flexrow, styles.justifyBetween, styles.marBtm20, styles.wdth100]}>
            {/* Search HTML */}
            <View style={[styles.wdth33]}>
              <Searchbar
                icon={() => <SearchIcon />}
                inputStyle={styles.searchInput}
                style={styles.searchContainer}
                placeholder="Search"
                onChangeText={(queryText: any) => handlesearchchange(queryText)}
                value={searchQuery}
              />
            </View>
            {/* Search HTML - Ends */}
            {/* dine and Take away HTML */}
            <View style={[styles.wdth50, styles.flexrow, styles.justifyEnd]}>

              <View style={[styles.flexrow, styles.alignCenter, styles.justifyCenter, styles.dineKitch]}>
                <Image
                  style={styles.dineImg}
                  source={(require('../../assets/images/catering.png'))}
                  resizeMode='contain' />
                <Text style={[styles.font13, styles.TextBlack, styles.fontWeiSemi, styles.padL4, styles.padR9]}>Dine In</Text>
                <View style={[styles.flexrow, styles.alignCenter]}>
                  <Text style={[styles.font13, styles.TextGreen, styles.fontWeiSemi]}>{readydineorder.length}</Text>
                  <Text style={[styles.font13, styles.TextBlack, styles.fontWeiSemi]}>/</Text>
                  <Text style={[styles.font9, styles.TextBlack, styles.fontWeiSemi]}>{totaldineorder.length}</Text>
                </View>
              </View>
              <View style={[styles.flexrow, styles.alignCenter, styles.justifyCenter, styles.dineKitch]}>
                <Image
                  style={styles.dineImg}
                  source={(require('../../assets/images/take_away.png'))}
                  resizeMode='contain' />
                <Text style={[styles.font13, styles.TextBlack, styles.fontWeiSemi, styles.padL4, styles.padR9]}>Take Away</Text>
                <View style={[styles.flexrow, styles.alignCenter]}>
                  <Text style={[styles.font13, styles.TextGreen, styles.fontWeiSemi]}>{readyTakawayorder.length}</Text>
                  <Text style={[styles.font13, styles.TextBlack, styles.fontWeiSemi]}>/</Text>
                  <Text style={[styles.font9, styles.TextBlack, styles.fontWeiSemi]}>{totalTakawayorder.length}</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.flexrow, styles.alignCenter, styles.justifyCenter, styles.dineKitch, { paddingHorizontal: 15 }]} onPress={() => getRunningOrdersList()}>
                <Image
                  style={styles.dineImg}
                  source={(require('../../assets/images/refresh-cw.png'))}
                  resizeMode='contain' />
              </TouchableOpacity>
            </View>
            {/* dine and Take away HTML - Ends */}
          </View>


          <View style={[styles.flexrow, styles.justifyBetween]}>
            <View style={[styles.wdth33, styles.padR6]}>
              {/* Received HTML */}
              <View style={[styles.wdth100, styles.receivedBg, styles.receivedCol]}>
                {/* Received header HTML */}
                <View style={[styles.flexrow, styles.alignCenter, styles.marBtm16]}>
                  <Text style={[styles.font13, styles.TextBlack, styles.fontWeiSemi, styles.padR4]}>Received</Text>
                  <View style={[styles.flexrow, styles.alignCenter, styles.justifyCenter, styles.receiCountBg, styles.CountRound]}>
                    <Text style={[styles.textWhite, styles.font10]}>{data?.length}</Text>
                  </View>
                </View>
                {/* Received header HTML - Ends */}
                {/* Received Each Block HTML */}
                {
                  isrefreshingkichendata ? <View style={[styless.flexrow, styless.alignCenter, styless.justifyCenter, styless.loaderImg]}>
                    <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
                  </View> :

                    <FlatList
                      nestedScrollEnabled
                      data={data}
                      extraData={data}
                      keyExtractor={(item, _index) => item.orderId}
                      renderItem={({ item }) =>
                        <View style={[styles.receivedBlk]}>
                          <TouchableOpacity style={styles.wdth100} onPress={() => {
                            setTableNo(item.items[0]?.tableNo)
                            setFinalNotesDisplay(item.finalNotes)
                            setShowView(true);
                            setShowViewId(item.orderId);
                            setPrintData(item?.items);
                            setItemsId(item?.items[0]?.itemId)
                            setItemorderDate(moment(item.orderDateTime).format('H:mm'));
                            setItemorderDateOnly(moment(item.orderDateTime).format("YYYY-MM-DD"))

                            setItemOrderType(item.orderType);
                            setItemOrderNo(item?.orderNo)
                          }}>
                            <View style={[styles.receivedHeader, styles.flexrow, styles.justifyBetween, styles.alignCenter]}>
                              <View>
                                <Text style={[styles.font11, styles.TextBlack, styles.fontWeiSemi, styles.marBtm2]}>#{item?.orderNo}</Text>
                                <Text style={[styles.font13, styles.TextBlack, styles.fontWeiSemi]}>{item?.items?.length} Items </Text>
                              </View>
                              <View style={[styles.receiTime, styles.redBg]}>
                                <Text style={[styles.font9, styles.textWhite]}>{moment(item.orderDateTime).format('H:mm')}</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                          {
                            showView && showViewId == item.orderId && (
                              <View style={styles.receivedBody}>
                                <View style={styles.KitchenTable}>
                                  <View style={[styles.flexrow, styles.borderBtm, styles.tablePad]}>
                                    <Text style={[styles.font11, styles.fontWeiSemi, styles.TextBlack, styles.wdth60]}>Items</Text>
                                    <Text style={[styles.font11, styles.fontWeiSemi, styles.TextBlack, styles.wdth20, styles.textCenter]}>Qty</Text>
                                    <Text style={[styles.font11, styles.fontWeiSemi, styles.TextBlack, styles.wdth20, styles.textCenter]}>Notes</Text>
                                  </View>
                                  {item.items.length !== 0 &&
                                    item.items.map((orderitem, index) => (
                                      <View style={[styles.flexrow, styles.borderBtm, styles.tablePad]}>
                                        <Text style={[styles.font11, styles.TextBlack, styles.wdth60]}>{orderitem?.itemName} </Text>
                                        <Text style={[styles.font11, styles.TextBlack, styles.wdth20, styles.textCenter]}>{orderitem?.orderQuantity}</Text>


                                        <View style={[styles.flexrow, styles.alignCenter, styles.wdth20, styles.justifyCenter]}>

                                          {
                                            orderitem?.notes != null && orderitem?.notes != '' ? (<View>
                                              <TouchableOpacity onPress={() => {
                                                setOpenNotes(!openNotes)
                                                setNotesDisplay(orderitem?.notes)

                                              }} >
                                                <Image
                                                  style={styles.dineImg}
                                                  source={(require('../../assets/images/kitchen_file.png'))}
                                                  resizeMode='contain' />
                                              </TouchableOpacity></View>) : <Text>NA</Text>
                                          }

                                        </View>
                                      </View>
                                    ))}

                                </View>

                                <View style={[styles.tablePad]}>
                                  {finalNotesDisplay != null && finalNotesDisplay != '' ? (<View>
                                    <Text style={[styles.font11, styles.textBlack, styles.textBold]}>Order Instruction: {finalNotesDisplay}</Text>
                                  </View>) : <Text style={[styles.font11, styles.textBlack, styles.textBold]}>Order Instruction: NA</Text>
                                  }
                                </View>

                                <View style={[styles.prapareView, styles.flexrow, styles.justifyCenter]}>
                                  <TouchableOpacity style={[styles.prepareBtn, styles.marLeft10]} onPress={() => preparingApiCall(item?.items)}>
                                    <Text style={[styles.font11, styles.textWhite, styles.textBold]}>Prepare</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={[styles.prepareBtn, styles.marLeft10]} onPress={print}>
                                    <Text style={[styles.font11, styles.textWhite, styles.textBold]} onPress={print}>Print</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            )
                          }

                          <View style={[styles.ReceivedFooter, styles.flexrow, styles.justifyBetween, styles.alignCenter]}>
                            {
                              (item.orderType == "Dine-in") ?
                                <View>
                                  <Text style={[styles.font11, styles.textDefault]}>{item.items[0].tableType} , {item.items[0].tableNo}</Text>
                                </View>
                                : <Text style={[styles.font11, styles.textDefault]}></Text>
                            }

                            <View style={[styles.flexrow, styles.alignCenter, styles.justifyEnd]}>
                              <Image
                                style={styles.dineImg}
                                source={(require('../../assets/images/catering.png'))}
                                resizeMode='contain' />
                              <Text style={[styles.font11, styles.TextBlack, styles.padL4, styles.padR9]}>{item.orderType}</Text>
                              {
                                showViewId != item.orderId ?
                                  <TouchableOpacity onPress={() => {
                                    setShowView(true)
                                    setShowViewId(item.orderId)
                                    setPrintData(item?.items)
                                    setItemorderDate(moment(item.orderDateTime).format('H:mm'))
                                    setItemorderDateOnly(moment(item.orderDateTime).format("YYYY-MM-DD"))

                                    setItemOrderType(item.orderType)
                                    setItemOrderNo(item?.orderNo)
                                  }
                                  }>
                                    <Image
                                      style={[styles.dineImg, styles.upimageRotate]}
                                      source={(require('../../assets/images/kitchen_drop_down.png'))}
                                      resizeMode='contain' />
                                  </TouchableOpacity>
                                  :
                                  <TouchableOpacity onPress={() => {
                                    setShowView(false)
                                    setShowViewId('')
                                  }
                                  }>
                                    <Image
                                      style={[styles.dineImg, styles.imgRotate]}
                                      source={(require('../../assets/images/kitchen_drop_down.png'))}
                                      resizeMode='contain' />

                                  </TouchableOpacity>
                              }
                            </View>
                          </View>
                        </View>
                      }
                      ListEmptyComponent={!isrefreshingkichendata && (
                        <View style={styles.loaderImg}>
                          <Text>No Items Received</Text>
                        </View>
                      )}
                    />
                }

                {/* Received Each Block HTML - Ends */}
              </View>

              {/* Received HTML - Ends */}
            </View>

            <View style={[styles.wdth33, styles.padL6, styles.padR6]}>
              {/*Preparing HTML */}
              <View style={[styles.wdth100, styles.preparaBg, styles.receivedCol]}>
                {/*Preparing header HTML */}
                <View style={[styles.flexrow, styles.alignCenter, styles.marBtm16]}>
                  <Text style={[styles.font13, styles.TextBlack, styles.fontWeiSemi, styles.padR4]}>Preparing</Text>
                  <View style={[styles.flexrow, styles.alignCenter, styles.justifyCenter, styles.redBg, styles.CountRound]}>
                    <Text style={[styles.textWhite, styles.font10]}>{prepareddata?.length}</Text>
                  </View>
                </View>
                {/*Preparing header HTML - Ends */}

                {/*Preparing Each Block HTML */}
                {
                  isrefreshingkichendata ? <View style={[styless.flexrow, styless.alignCenter, styless.justifyCenter, styless.loaderImg]}>
                    <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
                  </View> :

                    <FlatList
                      nestedScrollEnabled
                      data={prepareddata}
                      extraData={prepareddata}
                      keyExtractor={(item, _index) => item.orderId}
                      renderItem={({ item }) =>
                        <View style={[styles.receivedBlk]}>
                          <TouchableOpacity style={styles.wdth100} onPress={() => {
                            setTableNo(item.items[0]?.tableNo)
                            setFinalNotesDisplay(item.finalNotes)
                            setShowView(true);
                            setShowViewId(item.orderId);
                            setPrintData(item?.items);
                            setItemsId(item?.items[0]?.itemId)
                            setItemorderDate(moment(item.orderDateTime).format('H:mm'));
                            setItemorderDateOnly(moment(item.orderDateTime).format("YYYY-MM-DD"))
                            setItemOrderType(item.orderType);
                            setItemOrderNo(item?.orderNo)
                          }}>

                            <View style={[styles.receivedHeader, styles.flexrow, styles.justifyBetween, styles.alignCenter]}>
                              <View>
                                <Text style={[styles.font11, styles.TextBlack, styles.fontWeiSemi, styles.marBtm2]}>#{item?.orderNo}</Text>
                                <Text style={[styles.font13, styles.TextBlack, styles.fontWeiSemi]}>{item?.items?.length} Items </Text>
                              </View>
                              <View style={[styles.receiTime, styles.redBg]}>
                                <Text style={[styles.font9, styles.textWhite]}>{moment(item.orderDateTime).format('H:mm')}</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                          {
                            showView && showViewId == item.orderId && (
                              <View style={styles.receivedBody}>
                                <View style={styles.KitchenTable}>
                                  <View style={[styles.flexrow, styles.borderBtm, styles.tablePad]}>
                                    <Text style={[styles.font11, styles.fontWeiSemi, styles.TextBlack, styles.wdth60]}>Items</Text>
                                    <Text style={[styles.font11, styles.fontWeiSemi, styles.TextBlack, styles.wdth20, styles.textCenter]}>Qty</Text>
                                    <Text style={[styles.font11, styles.fontWeiSemi, styles.TextBlack, styles.wdth20, styles.textCenter]}>Notes</Text>
                                  </View>
                                  {item.items.length !== 0 &&
                                    item.items.map((orderitem, index) => (
                                      <View style={[styles.flexrow, styles.borderBtm, styles.tablePad]}>
                                        <Text style={[styles.font11, styles.TextBlack, styles.wdth60]}>{orderitem?.itemName} </Text>
                                        <Text style={[styles.font11, styles.TextBlack, styles.wdth20, styles.textCenter]}>{orderitem?.orderQuantity}</Text>


                                        <View style={[styles.flexrow, styles.alignCenter, styles.wdth20, styles.justifyCenter]}>

                                          {
                                            orderitem?.notes != null && orderitem?.notes != '' ? (<View>
                                              <TouchableOpacity onPress={() => {
                                                setOpenNotes(!openNotes)
                                                setNotesDisplay(orderitem?.notes)

                                              }} >
                                                <Image
                                                  style={styles.dineImg}
                                                  source={(require('../../assets/images/kitchen_file.png'))}
                                                  resizeMode='contain' />
                                              </TouchableOpacity></View>) : <Text>NA</Text>
                                          }

                                        </View>
                                      </View>
                                    ))}

                                </View>

                                <View style={[styles.tablePad]}>
                                  {finalNotesDisplay != null && finalNotesDisplay != '' ? (<View>
                                    <Text style={[styles.font11, styles.textBlack, styles.textBold]}>Order Instruction: {finalNotesDisplay}</Text>
                                  </View>) : <Text style={[styles.font11, styles.textBlack, styles.textBold]}>Order Instruction: NA</Text>
                                  }
                                </View>

                                <View style={[styles.prapareView, styles.flexrow, styles.justifyCenter]}>
                                  <TouchableOpacity style={[styles.prepareBtn, styles.marLeft10]} onPress={() => ReadyApiCall(item?.items)}>
                                    <Text style={[styles.font11, styles.textWhite, styles.textBold]}>Ready</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={[styles.prepareBtn, styles.marLeft10]} onPress={print}>
                                    <Text style={[styles.font11, styles.textWhite, styles.textBold]} onPress={print}>Print</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            )
                          }

                          <View style={[styles.ReceivedFooter, styles.flexrow, styles.justifyBetween, styles.alignCenter]}>
                            {
                              (item.orderType == "Dine-in") ?
                                <View>
                                  <Text style={[styles.font11, styles.textDefault]}>{item.items[0].tableType} , {item.items[0].tableNo}</Text>
                                </View>
                                : <Text style={[styles.font11, styles.textDefault]}></Text>
                            }

                            <View style={[styles.flexrow, styles.alignCenter, styles.justifyEnd]}>
                              <Image
                                style={styles.dineImg}
                                source={(require('../../assets/images/catering.png'))}
                                resizeMode='contain' />
                              <Text style={[styles.font11, styles.TextBlack, styles.padL4, styles.padR9]}>{item.orderType}</Text>
                              {
                                showViewId != item.orderId ?
                                  <TouchableOpacity onPress={() => {
                                    setShowView(true)
                                    setShowViewId(item.orderId)
                                    setPrintData(item?.items)
                                    setItemorderDate(moment(item.orderDateTime).format('H:mm'))
                                    setItemorderDateOnly(moment(item.orderDateTime).format("YYYY-MM-DD"))

                                    setItemOrderType(item.orderType)
                                    setItemOrderNo(item?.orderNo)
                                  }
                                  }>
                                    <Image
                                      style={[styles.dineImg, styles.upimageRotate]}
                                      source={(require('../../assets/images/kitchen_drop_down.png'))}
                                      resizeMode='contain' />
                                  </TouchableOpacity>
                                  :
                                  <TouchableOpacity onPress={() => {
                                    setShowView(false)
                                    setShowViewId('')
                                  }
                                  }>
                                    <Image
                                      style={[styles.dineImg, styles.imgRotate]}
                                      source={(require('../../assets/images/kitchen_drop_down.png'))}
                                      resizeMode='contain' />

                                  </TouchableOpacity>
                              }
                            </View>
                          </View>
                        </View>
                      }
                      ListEmptyComponent={!isrefreshingkichendata && (
                        <View style={styles.loaderImg}>
                          <Text>No Items Preparing</Text>
                        </View>
                      )}
                    />
                }
                {/*Preparing Each Block HTML - Ends */}

              </View>
              {/*Preparing HTML - Ends */}

            </View>

            <View style={[styles.wdth33, styles.padL6]}>
              {/* Ready HTML */}
              <View style={[styles.wdth100, styles.readyBg, styles.receivedCol]}>
                {/* Ready header HTML */}
                <View style={[styles.flexrow, styles.alignCenter, styles.marBtm16]}>
                  <Text style={[styles.font13, styles.TextBlack, styles.fontWeiSemi, styles.padR4]}>Ready</Text>
                  <View style={[styles.flexrow, styles.alignCenter, styles.justifyCenter, styles.greenBg, styles.CountRound]}>
                    <Text style={[styles.textWhite, styles.font10]}>{readydata?.length}</Text>
                  </View>
                </View>
                {/* Ready header HTML - Ends */}

                {
                  isrefreshingkichendata ? <View style={[styless.flexrow, styless.alignCenter, styless.justifyCenter, styless.loaderImg]}>
                    <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
                  </View> :

                    <FlatList
                      nestedScrollEnabled
                      data={readydata}
                      extraData={readydata}
                      keyExtractor={(item, _index) => item.orderId}
                      renderItem={({ item }) =>
                        <View style={[styles.receivedBlk]}>
                          <TouchableOpacity style={styles.wdth100} onPress={() => {
                            setTableNo(item.items[0]?.tableNo)
                            setFinalNotesDisplay(item.finalNotes)
                            setShowView(true);
                            setShowViewId(item.orderId);
                            setPrintData(item?.items);
                            setItemsId(item?.items[0]?.itemId)
                            setItemorderDate(moment(item.orderDateTime).format('H:mm'));
                            setItemorderDateOnly(moment(item.orderDateTime).format("YYYY-MM-DD"))

                            setItemOrderType(item.orderType);
                            setItemOrderNo(item?.orderNo)
                          }}>


                            <View style={[styles.receivedHeader, styles.flexrow, styles.justifyBetween, styles.alignCenter]}>
                              <View>
                                <Text style={[styles.font11, styles.TextBlack, styles.fontWeiSemi, styles.marBtm2]}>#{item?.orderNo}</Text>
                                <Text style={[styles.font13, styles.TextBlack, styles.fontWeiSemi]}>{item?.items?.length} Items </Text>
                              </View>
                              <View style={[styles.receiTime, styles.redBg]}>
                                <Text style={[styles.font9, styles.textWhite]}>{moment(item.orderDateTime).format('H:mm')}</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                          {
                            showView && showViewId == item.orderId && (
                              <View style={styles.receivedBody}>
                                <View style={styles.KitchenTable}>
                                  <View style={[styles.flexrow, styles.borderBtm, styles.tablePad]}>
                                    <Text style={[styles.font11, styles.fontWeiSemi, styles.TextBlack, styles.wdth60]}>Items</Text>
                                    <Text style={[styles.font11, styles.fontWeiSemi, styles.TextBlack, styles.wdth20, styles.textCenter]}>Qty</Text>
                                    <Text style={[styles.font11, styles.fontWeiSemi, styles.TextBlack, styles.wdth20, styles.textCenter]}>Notes</Text>
                                  </View>
                                  {item.items.length !== 0 &&
                                    item.items.map((orderitem, index) => (
                                      <View style={[styles.flexrow, styles.borderBtm, styles.tablePad]}>
                                        <Text style={[styles.font11, styles.TextBlack, styles.wdth60]}>{orderitem?.itemName} </Text>
                                        <Text style={[styles.font11, styles.TextBlack, styles.wdth20, styles.textCenter]}>{orderitem?.orderQuantity}</Text>


                                        <View style={[styles.flexrow, styles.alignCenter, styles.wdth20, styles.justifyCenter]}>

                                          {
                                            orderitem?.notes != null && orderitem?.notes != '' ? (<View>
                                              <TouchableOpacity onPress={() => {
                                                setOpenNotes(!openNotes)
                                                setNotesDisplay(orderitem?.notes)

                                              }} >
                                                <Image
                                                  style={styles.dineImg}
                                                  source={(require('../../assets/images/kitchen_file.png'))}
                                                  resizeMode='contain' />
                                              </TouchableOpacity></View>) : <Text>NA</Text>
                                          }

                                        </View>
                                      </View>
                                    ))}

                                </View>

                                <View style={[styles.tablePad]}>
                                  {finalNotesDisplay != null && finalNotesDisplay != '' ? (<View>
                                    <Text style={[styles.font11, styles.textBlack, styles.textBold]}>Order Instruction: {finalNotesDisplay}</Text>
                                  </View>) : <Text style={[styles.font11, styles.textBlack, styles.textBold]}>Order Instruction: NA</Text>
                                  }
                                </View>

                                <View style={[styles.prapareView, styles.flexrow, styles.justifyCenter]}>
                                  <TouchableOpacity style={[styles.prepareBtn, styles.marLeft10]} onPress={print}>
                                    <Text style={[styles.font11, styles.textWhite, styles.textBold]} onPress={print}>Print</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            )
                          }

                          <View style={[styles.ReceivedFooter, styles.flexrow, styles.justifyBetween, styles.alignCenter]}>
                            {
                              (item.orderType == "Dine-in") ?
                                <View>
                                  <Text style={[styles.font11, styles.textDefault]}>{item.items[0].tableType} , {item.items[0].tableNo}</Text>
                                </View>
                                : <Text style={[styles.font11, styles.textDefault]}></Text>
                            }

                            <View style={[styles.flexrow, styles.alignCenter, styles.justifyEnd]}>
                              <Image
                                style={styles.dineImg}
                                source={(require('../../assets/images/catering.png'))}
                                resizeMode='contain' />
                              <Text style={[styles.font11, styles.TextBlack, styles.padL4, styles.padR9]}>{item.orderType}</Text>
                              {
                                showViewId != item.orderId ?
                                  <TouchableOpacity onPress={() => {
                                    setShowView(true)
                                    setShowViewId(item.orderId)
                                    setPrintData(item?.items)
                                    setItemorderDate(moment(item.orderDateTime).format('H:mm'))
                                    setItemorderDateOnly(moment(item.orderDateTime).format("YYYY-MM-DD"))

                                    setItemOrderType(item.orderType)
                                    setItemOrderNo(item?.orderNo)
                                  }
                                  }>
                                    <Image
                                      style={[styles.dineImg, styles.upimageRotate]}
                                      source={(require('../../assets/images/kitchen_drop_down.png'))}
                                      resizeMode='contain' />
                                  </TouchableOpacity>
                                  :
                                  <TouchableOpacity onPress={() => {
                                    setShowView(false)
                                    setShowViewId('')
                                  }
                                  }>
                                    <Image
                                      style={[styles.dineImg, styles.imgRotate]}
                                      source={(require('../../assets/images/kitchen_drop_down.png'))}
                                      resizeMode='contain' />

                                  </TouchableOpacity>
                              }
                            </View>
                          </View>
                        </View>
                      }
                      ListEmptyComponent={!isrefreshingkichendata && (
                        <View style={styles.loaderImg}>
                          <Text>No Items Ready</Text>
                        </View>
                      )}
                    />
                }

              </View>
              {/* Ready HTML - Ends */}
            </View>
            {
              openNotes &&
              <Modal isVisible={openNotes}>
                {notesPop()}
              </Modal>
            }
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
