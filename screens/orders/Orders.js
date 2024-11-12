import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Toast from 'react-native-root-toast';
import * as Print from 'expo-print';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import { default as style, default as styles } from '../../assets/css/style';
import InternetDownIcon from '../../assets/images/internet_down.js';
import ModalDropDown from '../../assets/images/ModalDropDown.js';
import CustomButton from '../../components/CustomButton';
import TableViewcompleted from '../../components/OrdersCompletedListView';
import TableView from '../../components/OrdersListView';
import TableViewprepared from '../../components/OrdersPreparedListView';
import Header from '../../components/sideMenuHeaderMaster';
import TextInput from '../../components/Texinput';
import VoidOrderLIstView from '../../components/VoidOrdersListView';
import api from '../../services/api/callingApi';
import { endPoint } from '../../services/api/apiConstant';






export default function Category({ navigation, route }) {
  const [data, setData] = useState([]);
  const [prepareddata, setPreparedData] = useState([]);
  const [completeddata, setCompleteddData] = useState([]);
  const [runningOrderListdata, setRunningOrderListData] = useState([])
  const [voidOrderListData, setVoidOrderList] = useState([])


  const [tempcompleteddata, settempCompleteddData] = useState([]);
  const [temprunningOrderListdata, settempRunningOrderListData] = useState([])
  const [tempvoidOrderListData, settempVoidOrderList] = useState([])

  const optionsPerPage = [2, 3, 4];
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [isDataPresent, setDataPreset] = useState(false);
  const [isCompDataPresent, setCompDataPreset] = useState(false);
  const [isVoidDataPresent, setVoidDataPreset] = useState(false); 
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedValue2, setSelectedValue2] = useState("All Orders");
  const [activeTab, setActiveTab] = useState("Running");
  const isFocused = useIsFocused();
  const [orderTypeKey, setOrderTypeKey] = useState(0)
  const [activeOrderTypeDrop, setActiveOrderTypeDrop] = useState("Running")
  const [runningcolor, setRunningColor] = useState('#E83B42')
  const [preparedcolor, setPreparedColor] = useState('#484D54')
  const [completedcolor, setCompletedColor] = useState('#484D54')
  const [voidColor, setVoidColor] = useState('#484D54')
  const [printdata, setPrintData] = useState([]);
  const [tablenoset, settablenoset] = useState("");
  const [selectedPrinter, setSelectedPrinter] = React.useState();
  const [selectedItems, setselectedItems] = React.useState([]);
  const [selectedordertype, setselectedordertype] = React.useState([]);
  const [vatValue, setVatValue] = React.useState('');
  const [grandTotal, setGrandTotal] = React.useState('');
  const [subTotal, setSubTotal] = React.useState('');
  const [isrefreshingselected, setisrefreshingselected] = useState(false);
  const [orderType, setOrderType] = useState('')
  const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
  const [address, setAddress] = useState('')
  const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);
  const layout = useWindowDimensions();
  const [userRoleId, setuserRoleId] = useState('')
  const [outletId, setOutletId] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [outletName, setOutlet] = useState('');
  const [openVoidPop, setOpenVoidPop] = useState(false);
  const [voidOrder, setVoidOrder] = useState(false);
  const [userVoidPassword, setUserVoidPassword] = useState('');
  const [voidPassword, setVoidPassword] = useState({ value: '', error: '' })
  const [voidOrderDataId, setVoidOrderDataId] = useState('')
  const [changeordertype, setchangeordertype] = useState('Select All')
  const [restName, setRestName] = useState('')


  useEffect(() => {
    setTimeout(() => getRestaurant(), 1000);
    setActiveTab("Running")
    setActiveOrderTypeDrop("Running")
    setRunningColor('#E83B42')
    setPreparedColor('#484D54')
    setCompletedColor('#484D54')
    setVoidColor('#484D54')
    setOrderTypeKey(0);
    getPrintDesignList();
    setDataPreset(false);
  }, [isFocused]);

  useEffect(() => {
    // Check the value of changeordertype and perform actions accordingly
    if (changeordertype === 'Select All') {
      // Perform actions for SomeValue1
      if (activeTab === 'Completed') {
        getCompletedOrdersList();
      } else if (activeTab === 'Running') {
        getRunningOrdersList();
      } else if (activeTab === 'Void') {
        getVoidOrdersList();
      }
    }
  }, [changeordertype, activeTab]); 

  const getRestaurant = async () => {
    const userRoleId = await AsyncStorage.getItem('userRoleId')
    const restaurantName = await AsyncStorage.getItem('restaurantName')
    const outletName = await AsyncStorage.getItem('outletName')
    const outletAddress = await AsyncStorage.getItem('outletAddress')
    const outletid = await AsyncStorage.getItem('restaurantId')
    setOutletId(outletId)
    setRestaurant(restaurantName)
    setOutlet(outletName)
    setuserRoleId(userRoleId)
    

  }


  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    });
    return unsubscribe;
  }, [navigation]);

  /// Get the RunningOrders list
  useEffect(() => {
    getRunningOrdersList();
    return () => {
      setData([]);
      setRunningOrderListData([])
    }
  }, [isFocused]);

  const getRunningOrdersList = async () => {
    // setisrefreshingselected(true)
    if (changeordertype === 'Select All'){
        const jsonValue = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;
        let loginAddress = loginData.address
        setAddress(loginAddress)
        let status = 'Running'
        let orderType = 'Running'
        const result = await api.GetOrdersByStatus(token, orderType, outletId);
        if (result.data.length === 0) {
          // successInternetdownOpen()
          setDataPreset(false);

        } else {
          setisrefreshingselected(false)
          setData(result.data);
          settempRunningOrderListData(result.data)
          setDataPreset(true);
          setRunningOrderListData(result.data)
          setOrderTypeKey(0)
        }
    }else{
      let runningng = temprunningOrderListdata.filter((item) => item.orderType == changeordertype);
      setData(runningng);
     
      if (runningng.length > 0 ){
        setDataPreset(true);
      }else{
        setDataPreset(false);
      }
    }
  }
  /// Get the PreparedOrders list
  useEffect(() => {

    getpreparedOrdersList();
    return () => {
      setPreparedData([]);
    }
  }, [isFocused]);
  const getpreparedOrdersList = async () => {

    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    let orderType = 'Prepared'
    const result = await api.GetOrdersByStatus(token, orderType, outletId);
    if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
      successInternetdownOpen()

    } else {
      setPreparedData(result.data);

    }
  }
  // print desing
  // useEffect(() => {

  //   getPrintDesignList();
  //   return () => {
  //     // setPrintData([]);
  //   }
  // }, [isFocused]);
  const getPrintDesignList = async () => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const prodRestName = await AsyncStorage.getItem('RestaurantName')
    setRestName(prodRestName)
    const result = await api.GetPrintDesign(token, outletId);
    if (result.success) {
      const filterdata = result.data.filter((item) => item.activeStatus == true)
      setPrintData(filterdata);
    }
    else {
      successInternetdownOpen()
    }

  }

  /// Get the CompletedOrders list
  useEffect(() => {

    getCompletedOrdersList();
    return () => {
      setCompleteddData([]);
    }
  }, [isFocused]);
  const getCompletedOrdersList = async () => {
    if (changeordertype === 'Select All'){
      const jsonValue = await AsyncStorage.getItem('userInfo')
      let loginData = JSON.parse(jsonValue);
      let token = loginData.token;
      let outletId = loginData.outletId;
      let orderType = 'Completed'
      const result = await api.GetOrdersByStatus(token, orderType, outletId);
      if (result.data.length === 0) {
        setCompDataPreset(false)
      } else {
        setCompleteddData(result.data);
        settempCompleteddData(result.data);
        setCompDataPreset(true)
      } 
    }else{
      let completedfilter = tempcompleteddata.filter((item) => item.orderType == changeordertype);
      setCompleteddData(completedfilter);
      if (completedfilter.length > 0 ){
        setCompDataPreset(true)
      }else{
        setCompDataPreset(false)
      }
      
    }
  }
  // Call Void Orders List
  useEffect(() => {
    getVoidOrdersList();
    return () => {
      setVoidOrderList([]);
    }
  }, [isFocused]);

  const getVoidOrdersList = async () => {
    if (changeordertype === 'Select All'){
      const jsonValue = await AsyncStorage.getItem('userInfo')
      let loginData = JSON.parse(jsonValue);
      let token = loginData.token;
      let outletId = loginData.outletId;
      let orderType = 'Completed'
      const result = await api.GetVoidOrdersList(token, outletId);
      if (result.data.length === 0) {
        // successInternetdownOpen()
        setVoidDataPreset(false);
      } else {
        setVoidOrderList(result.data);
        settempVoidOrderList(result.data);
        setVoidDataPreset(true);
      }
    }else{
      let voidfilter = tempvoidOrderListData.filter((item) => item.orderType == changeordertype);
      setVoidOrderList(voidfilter);
      if (voidfilter.length > 0 ){
        setVoidDataPreset(true);
      }else{
        setVoidDataPreset(false);
      }
      
    }
  }
  //get User By ID
  useEffect(() => {
    getVoidPassword();
  });
  const getVoidPassword = async () => {
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let userId = loginData.userId
    let token = loginData.token;
    const getUserById = await api.GetVoidPassword(token, userId)
    setUserVoidPassword(getUserById?.data?.voidPassword)
  }
  const voidPasswordValidator = (voidPassword) => {
    if (!voidPassword) return "Void Password is required."
    return ''
  }

  const invalidVoidPasswordValidator = (voidPassword) => {
    if (!voidPassword) return "Invalid Void Password"
    return ''
  }
  //Calling Void Order API
  const callVoidOrder = async () => {
    const voidOrderErrorMsg = voidPasswordValidator(voidPassword.value)
    const invalidVoidPasswordErrorMsg = invalidVoidPasswordValidator(voidPassword.value)
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let userId = loginData.userId
    let token = loginData.token;
    var myJson = {
      userId: userId,
      OrderId: voidOrderDataId,
      VoidPassword: voidPassword.value
    }
    if (voidPassword.value === userVoidPassword) {
      setVoidPassword({ ...voidPassword, error: invalidVoidPasswordErrorMsg })
    }
    else if (voidPassword.value != userVoidPassword) {
      // Alert.alert('required')

      setVoidPassword({ ...voidPassword, error: voidOrderErrorMsg })
    }
    const voidOrder = await api.voidOrder(token, userId, myJson)
    if (voidOrder.success) {
      Toast.show(voidOrder.message)
      setVoidOrder(!voidOrder)
      getRunningOrdersList();
      getVoidOrdersList();
    }
    // setOpenVoidPop(false)
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
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("Running");
    setActiveOrderTypeDrop("Running")
    setRunningColor('#E83B42')
    setPreparedColor('#484D54')
    setCompletedColor('#484D54')
    setVoidColor('#484D54')
    getRunningOrdersList();


  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("Prepared");
    setActiveOrderTypeDrop("Prepared")
    setRunningColor('#484D54')
    setPreparedColor('#E83B42')
    setCompletedColor('#484D54')
    setVoidColor('#484D54')

  };
  const handleTab3 = () => {
    // update the state to tab2
    setActiveTab("Completed");
    setActiveOrderTypeDrop("Completed")
    setRunningColor('#484D54')
    setPreparedColor('#484D54')
    setCompletedColor('#E83B42')
    setVoidColor('#484D54')
    getCompletedOrdersList();

  };

  const handleTab4 = () => {
    // update the state to tab2
    setActiveTab("Void");
    setActiveOrderTypeDrop("Void")
    setRunningColor('#484D54')
    setPreparedColor('#484D54')
    setCompletedColor('#484D54')
    setVoidColor('#E83B42')
    getVoidOrdersList();

  };

  const sendDataToParent = (data) => { // the callback. Use a better name
  };
  const sendDataToParentPrepared = (prepareddata) => { // the callback. Use a better name
  };
  const sendDataToParentCompleted = (completeddata) => { // the callback. Use a better name
  };

  const sendPrintData = async(data) => { // the callback. Use a better name
    setVatValue(JSON.stringify(getVatValue(data.subTotal)))
    setGrandTotal(data.subTotal)
    const jsonValue = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    const result = await api.getAllMasterData(token, endPoint.GETINVOICEBYORDERID + data.orderId);
    print(data.items, data, result.data)

  };


  const filterordertypearray = [
    { key: 1, label: "Select All", value: "Select All" },
    { key: 2, label: 'DineIn', value: 'Dine-in' },
    { key: 3, label: 'Take Away', value: 'Walk-in' },
    { key: 4, label: 'Online', value: 'Online' }
  ]


  const getVatValue = (data) => {
    let value = (parseInt(data) * 3) / 100;
    let subvalue = parseInt(data) - value;
    setSubTotal(JSON.stringify(subvalue))
    return value;
  }
  const print = async (dataitems, datadtls, itemWisetax) => {
    if (printdata.length === 0) {
      Toast.show('Please Activate any one Print Design', {
        duration: Toast.durations.LONG,
      });
    }
    else{
// On iOS/android prints the given html. On web prints the HTML from the current page.
await Print.printAsync({
  html: htmltable(dataitems, datadtls, itemWisetax),
  printerUrl: selectedPrinter?.url, // iOS only
});
    }
    
  }
  const htmltable = (data, selectedorderamount, itemWisetax) => {
    var table = '';
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds()
    var currentime = date + '/' + month + '/' + year
      + ' ' + hours + ':' + min + ':' + sec
    let vat_value = getVatValue(selectedorderamount.subTotal)
    let grand_value = selectedorderamount.subTotal
    let sub_total_value = grand_value - vat_value
    let itemLevelTax = itemWisetax.itemWiseTax
    for (let i in data) {

      const item = data[i];
      settablenoset(item?.tableNo)
      const totalamnt = (parseInt(item?.itemAmount) * parseInt(item?.orderQuantity))
      if (parseInt(i) === parseInt(data.length - 1)) {
        table = table + `
        <tr>
    <td> ${item?.itemName}</td>
    <td> 0 </td> 
    <td> ${item?.orderQuantity.toFixed(2)}</td> 
    <td> ${item?.itemAmount.toFixed(2)}</td> 
    <td> ${totalamnt.toFixed(2)}</td>
    </tr> 
    <tr>
    <th colspan="4" class="text-right">Sub Total</th>
    <td class="text-right">${sub_total_value} </td>
    </tr>
    <tr>
    <th colspan="4" class="text-right">VAT</th>
    <td class="text-right">${vat_value}</td>
    </tr>`;
    if(itemWisetax?.discountedAmount === 0){
      table = table + 
      `<tr>
      <th colspan="4" class="text-right">${itemWisetax?.discountName === null ? "" : itemWisetax?.discountName} Discount</th>
      <td class="text-right"> 0 </td>
      </tr>
     <tr>
      `
    }
    else{
      `<tr>
      <th colspan="4" class="text-right">${itemWisetax?.discountName === null ? "" : itemWisetax?.discountName} Discount</th>
      <td class="text-right">${itemWisetax?.discountedAmount}</td>
      </tr>
     <tr>
      `
    }
    for (let j in itemLevelTax) {
      const itemtax = itemLevelTax[j];
      table = table + `
    <tr>
      <th colspan="4" class="text-right">${itemtax.taxName} of ${itemtax.itemName}: ${itemtax.taxPercent} %</th>
      <td class="text-right">${itemtax.taxAmount.toFixed(2)}</td>
    </tr>`;
    }
    table = table + `<th colspan="4" class="text-right">Grand Total</th>
    <td class="text-right">${grand_value}</td>
    </tr>`
      } else {
        table = table + `
       
    <tr>
      <td> ${item?.itemName}</td>
      <td> 0 </td> 
      <td> ${item?.orderQuantity.toFixed(2)}</td> 
      <td> ${item?.itemAmount.toFixed(2)}</td> 
      <td> ${totalamnt.toFixed(2)}</td>
    </tr> `
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
          <td colspan="5">
            <div class="header_blk">
            <p class="rest_name fw-bold">${restName}</p>
              <p class="rest_name fw-bold">Outlet: ${outletName}</p>
              <p class="rest_name"></p>
              <p class="rest_name">${address}</p>
            </div>
          </td>
          </tr>
          <tr>
          <td colspan="5" class="text-right">Date : ${currentime}</td>
        </tr>
        
          <tr>
            <td colspan="3" class="fw-bold">Order Type: ${selectedorderamount?.orderType === null ? "" : selectedorderamount?.orderType}</td>
            <td colspan="2" class="fw-bold">Table No : ${data[0]?.tableNo === null ? "" : data[0]?.tableNo}</td>
          </tr>
          <tr>
            <td class="fw-bold">${printdata[0]?.printItemHeaderSettings?.item != undefined ?printdata[0]?.printItemHeaderSettings?.item: "" }</td>
             <th>${printdata[0]?.printItemHeaderSettings?.discount != undefined ? printdata[0]?.printItemHeaderSettings?.discount : ""}</th>
             <th>${printdata[0]?.printItemHeaderSettings?.quantity != undefined ? printdata[0]?.printItemHeaderSettings?.quantity : ""}</th>
             <th>${printdata[0]?.printItemHeaderSettings?.amount != undefined ? printdata[0]?.printItemHeaderSettings?.amount : ""}</th>
            <th>Total Amount</th>
          </tr>
          ${table}
          
            <tr>
            <td colspan="5" class="text-center">${printdata[0]?.printFooderSettings?.fooderDetails}</td>
            </tr>
        </table>
      </body>
      </html>
      `;
    return html;
  }




  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html
    });
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }


  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  }
  //Filter Order Type
  const filterOrderTypeData = (data) => {
    setCompleteddData([])
    setVoidOrderList([])
    setData([])
    // Delay the filtering process
    let runFilter = temprunningOrderListdata.filter((item) => item.orderType == data);
    let preparedfilter = prepareddata.filter((item) => item.orderType == data);
    let completedfilter = tempcompleteddata.filter((item) => item.orderType == data);
    let voidfilter = tempvoidOrderListData.filter((item) => item.orderType == data);

    setData(runFilter);
    setPreparedData(preparedfilter);
    setCompleteddData(completedfilter);
    setVoidOrderList(voidfilter);

    
    
  }

  //Void Password data
  const toggleModal = () => {
    setVoidOrder(!voidOrder)
  };

  const sendVoidOrderdData = (data) => {
    setVoidOrder(true)
    setVoidOrderDataId(data.orderId)
  }
  //Void Password Popup
  const voidPaswordPopup = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>

          <View >
            <View>
              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Void Password
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>
              <TextInput
                style={style.signInput}
                secureTextEntry={true}
                onChangeText={(text: any) => setVoidPassword({ value: text, error: '' })}
                errorText={voidPassword.error}
                description={undefined}
              />

              <View style={styles.popupBtnCon}>
                <TouchableOpacity onPress={() => callVoidOrder()} >
                  <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={() => callVoidOrder()} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
  // ---------------------------------- User Interface ---------------------------------------------------------
  return (
    <>
      <Header heading={"Orders"} />
      <ScrollView>
        {
          isrefreshingselected ? <View style={[styles.flex1, styles.flexrow, styles.alignCenter, styles.justifyCenter, styles.loaderPopupBlk]}>
            <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styles.loaderIcon} />
          </View> :
            <View style={styles.categoryBlkCon}>
              <View style={[styles.textcontainer1, styles.catSubBlk]}>
                <Text style={styles.textStyle1}>
                  Orders
                </Text>
              </View>
              <ScrollView>
                <View style={styles.table}>
                  <View style={[styles.wdth50, styles.marBtm26]}>
                    <Text style={[styles.signLabel]}>Order Type</Text>
                    <View>
                      <ModalDropDown style={styles.dropdonwImg} />
                      <ModalSelector
                        data={filterordertypearray}
                        childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                        selectStyle={styles.selectText}
                        initValueTextStyle={styles.textStyle}
                        optionContainerStyle={styles.selectCont}
                        optionTextStyle={styles.textStyle}
                        overlayStyle={styles.overlayText}
                        cancelStyle={styles.selectCont}
                        cancelContainerStyle={styles.cancelCont}
                        cancelText={"Cancel"}
                        initValue={filterordertypearray.find(option => option.key === orderTypeKey)?.label || 'Select All'}
                        selectedKey={orderTypeKey}
                        onChange={(option) => {
                          if (option.key) {
                            setchangeordertype(option.value)
                            if (option.key == 1) {
                              getRunningOrdersList()
                            
                            }
                         
                            else {
                              filterOrderTypeData(option.value),
                                setOrderTypeKey(option.key)
                              setOrderType(option.value)
                            }


                          }
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.dashTab}>
                    <View style={styles.dashSubBlk}>
                      <TouchableOpacity onPress={() => handleTab1()}>
                        <Text style={{
                          color: runningcolor,
                          fontSize: 16,
                          lineHeight: 22,
                          fontWeight: '700',
                          marginTop: 4,
                        }}>Running</Text>
                        {activeTab === "Running" ?
                          <View style={styles.tabActive}></View>
                          :
                          <View ></View>
                        }

                      </TouchableOpacity>
                    </View>

                    {/* <View style={styles.dashSubBlk}>
                      <TouchableOpacity onPress={() => handleTab2()}>
                        <Text style={{
                          color: preparedcolor,
                          fontSize: 16,
                          lineHeight: 22,
                          fontWeight: '700',
                          marginTop: 4,
                        }}>Prepared</Text>
                        {activeTab === "Prepared" ?
                          <View style={styles.tabActive}></View>
                          :
                          <View ></View>
                        }

                      </TouchableOpacity>
                    </View> */}
                    <View style={styles.dashSubBlk}>
                      <TouchableOpacity onPress={() => handleTab3()}>
                        <Text style={{
                          color: completedcolor,
                          fontSize: 16,
                          lineHeight: 22,
                          fontWeight: '700',
                          marginTop: 4,
                        }}>Completed</Text>
                        {activeTab === "Completed" ?
                          <View style={styles.tabActive}></View>
                          :
                          <View ></View>
                        }
                      </TouchableOpacity>
                    </View>
                    <View style={styles.dashSubBlk}>
                      <TouchableOpacity onPress={() => handleTab4()}>
                        <Text style={{
                          color: voidColor,
                          fontSize: 16,
                          lineHeight: 22,
                          fontWeight: '700',
                          marginTop: 4,
                        }}>Void Order</Text>
                        {activeTab === "Void" ?
                          <View style={styles.tabActive}></View>
                          :
                          <View ></View>
                        }
                      </TouchableOpacity>
                    </View>
                  </View>

                  {activeTab === "Running" ?
                    <View>
                      {!isDataPresent ?
                        <View style={styles.noRecordFoundView}>
                          <Image
                            style={styles.noRecordImage}
                            source={(require('../../assets/images/clipboard.png'))}
                          />
                          <View>
                            <Text style={styles.recordDisplay}>There are no Running Orders to display.</Text>
                          </View>

                        </View> : <TableView data={data} sendVoidOrderdData={sendVoidOrderdData} updateDelete={() => getRunningOrdersList()} />
                      }
                    </View> : null
                  }
                  {activeTab === "Completed" ?
                    <View>
                      {!isCompDataPresent ?
                        <View style={styles.noRecordFoundView}>
                          <Image
                            style={styles.noRecordImage}
                            source={(require('../../assets/images/clipboard.png'))}
                          />
                          <View>
                            <Text style={styles.recordDisplay}>There are no Completed Orders to display.</Text>
                          </View>

                        </View> : <TableViewcompleted data={completeddata} sendEditData={sendDataToParentCompleted} sendPrintData={sendPrintData} updateDelete={() => getCompletedOrdersList()} />
                      }
                    </View> : null
                  }
                  {activeTab === "Void" ?
                    <View>
                      {!isVoidDataPresent ?
                        <View style={styles.noRecordFoundView}>
                          <Image
                            style={styles.noRecordImage}
                            source={(require('../../assets/images/clipboard.png'))}
                          />
                          <View>
                            <Text style={styles.recordDisplay}>There are no Void Orders to display.</Text>
                          </View>

                        </View> : <VoidOrderLIstView data={voidOrderListData} sendEditData={sendDataToParentCompleted} updateDelete={() => getVoidOrdersList()} />
                      }
                    </View> : null
                  }

                  {/* {

                    activeTab === "Running" ? <TableView data={data} sendVoidOrderdData={sendVoidOrderdData} updateDelete={() => getRunningOrdersList()} /> : activeTab === "Prepared" ? <TableViewprepared data={prepareddata} sendEditData={sendDataToParent} updateDelete={() => getpreparedOrdersList()} />
                      : activeTab === "Completed" ? <TableViewcompleted data={completeddata} sendEditData={sendDataToParentCompleted} sendPrintData={sendPrintData} updateDelete={() => getCompletedOrdersList()} /> : <VoidOrderLIstView data={voidOrderListData} sendEditData={sendDataToParentCompleted} updateDelete={() => getVoidOrdersList()} />

                  } */}
                </View>
                {voidOrder &&
                  <Modal isVisible={voidOrder}>
                    {voidPaswordPopup()}
                  </Modal>
                }
                {openInternetdownMsg &&
                  <Modal isVisible={openInternetdownMsg}>
                    {internetDownPop()}
                  </Modal>
                }
              </ScrollView>
            </View>
        }
      </ScrollView>
    </>
  );

}