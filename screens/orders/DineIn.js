
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, Image, Platform, Pressable, ScrollView, SectionList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import { Appbar, Searchbar } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import { default as styles, default as styless } from '../../assets/css/style';
import OnlineIcon from '../../assets/images/Online.js';
import ReportIcon from '../../assets/images/Report Icon';
import BarIcon from '../../assets/images/bar.js';
import DashboardIcon from '../../assets/images/dashbord.js';
import DineInIcon from '../../assets/images/dine_in_active.js';
import InvenIcon from '../../assets/images/inventory_icon.js';
import KitchenIcon from '../../assets/images/kitchen_icon.js';
import SearchIcon from '../../assets/images/search.js';
import TakeAwayIcon from '../../assets/images/take_away.js';
import logo from '../../assets/images/logo.png';
 import CustomButton from '../../components/CustomButton';
import TextInputComp from '../../components/Texinput';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import { formId } from '../common/FormIdConstants';
import { constRoleId } from "../common/RoleConstants";
import Colors from '../../screens/constants/colors';




export default function DineIn({ navigation, route }) {
  const [selectedValue, setSelectedValue] = useState("Top floor");
  const [selectedValue2, setSelectedValue2] = useState("All Category");
  const [searchQuery, setSearchQuery] = React.useState('');
  const [subTotal, setSubTotal] = React.useState(0);
  const [grandTotal, setGrandTotal] = React.useState(0);
  const [amountreceivedchange, setamountreceivedchange] = React.useState(0);
  const [balancereturnedchange, setbalancereturnedchange] = React.useState(0);
  const [isLoading, setLoading] = useState(false);
  const [vatValue, setVatValue] = React.useState(0);
  const [selectedTableId, setSelectedTableId] = React.useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [tableSelect, setTableSelect] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [tempitemsData, setTempItemsData] = useState([]);
  const [tableListData, setTableListData] = useState([]);
  const [tableListMaster, setTableListMaster] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [tempselectedItems, settempSelectedItems] = useState([])
  const [tableOrders, setTableOrders] = useState([]);
  const [userToken, setUserToken] = useState('');
  const [userOutletId, setUserOutletId] = useState('');
  const [isNewOrder, setIsNewOrder] = useState(true);
  const [outletName, setOutlet] = useState('');
  const [selectpaymenttype, setselectpaymenttype] = useState('');
  const [paymentModeError, setPaymentModeError] = useState({ value: '', error: '' })
  const [cardTypeError, setCardTypeError] = useState({ value: '', error: '' })
  const [amountRecievedError, setAmountRecievedError] = useState({ value: '', error: '' })
  const [openPaynow, setOpenPaynow] = useState(false);
  const [openSuccessMsg, setopenSuccessMsg] = useState(false);
  const [openSuccessPaymentMsg, setopenSuccessPaymentMsg] = useState(false);
  const [openUpdateSuccess, setopenUpdateSuccess] = useState(false);
  const [openNotes, setOpenNotes] = useState(false)
  const [paynowKey, setPaynowkey] = useState(0);
  const [paycardtype, setpaycardtype] = useState(0);
  const [cardtypedata, setcardtypedata] = useState('');
  const isFocused = useIsFocused();
  const [isrefreshingresultTablelist, setisrefreshingresultTablelist] = useState(false)
  const [isrefreshingresultitemslist, setisrefreshingresultitemslist] = useState(false)
  const [isrefreshingresultselecteditemslist, setisrefreshingresultselecteditemslist] = useState(false)
  const [outletId, setOutletId] = useState('');
  const [printdata, setPrintData] = useState([]);
  const [tablenoset, settablenoset] = useState("");
  const [openDiscount, setOpenDiscount] = useState(false);
  const [checkeddiscnt, setCheckeddiscnt] = React.useState(false);
  const [checkeddiscntId, setCheckeddiscntId] = React.useState("");
  const [getpromofilterdata, setgetpromofilterdata] = useState([]);
  const [itemsmasterdata, setItemsmasterdate] = useState([]);
  const [notes, setNotes] = useState("")
  const [finalNotesOrder, setFinalNotesOrder] = useState('')
  const [updataFinalNotes, setUpdateFinalNotes] = useState(finalNotesOrder)
  const [notesIndex, setNotesIndex] = useState(0)
  const [modIndex, setModIndex] = useState(0);
  const [selectItemModifier, setSelectItemModifier] = useState([]);
  const [selectItemModifierList, setSelectItemModifierList] = useState([]);
  const [modifierGroupId, setModifierGroupId] = useState('');
  const [modfierGroupName, setModfierGroupName] = useState('');
  const [openModifierModal, setOpenModifierModal] = useState(false);
  const [updatedModifierItem, setUpdatedModifierItem] = useState([]);
  const [openMergeTable, setOpenMergeTable] = useState(false)
  const [selectedTableNo, setSelectedTableNo] = useState('')
  const [oldTableId, setOldTableId] = useState('')
  const [newTableId, setNewTableId] = useState('')
  const [oldTableNo, setOldTableNo] = useState('')
  const [newTableNo, setNewTableNo] = useState('')
  const [orderId, setOrderId] = useState('')
  const [tableKey, setTableKey] = useState(0)
  const [itemorderDateKitchen, setItemorderDateKitchen] = React.useState();
  const [itemorderTypeKitchen, setItemOrderTypeKitchen] = React.useState();
  const [itemorderNoKitchen, setItemOrderNoKitchen] = React.useState();
  const [openShiftTable, setOpenShiftTable] = useState(false)
  const [taxData, setTaxData] = useState([])
  const [taxSetupData, setTaxSetupData] = useState([])
  const [taxPerc, setTaxPerc] = useState(null)
  const [taxName, setTaxName] = useState(null)
  const [isSubtractFromSubTotal, setisSubtractFromSubTotal] = useState(null)
  const [isItemIncludeTax, setisItemIncludeTax] = useState(null)
  const [discountData, setDiscountData] = useState([])
  const [discPromoAmtcal, setDiscPromoAmt] = useState(0)
  const [refreshDiscount, setRefreshDiscount] = useState(false)
  const [userRoleId, setuserRoleId] = useState('')
  const [voidItem, setVoidItem] = useState(false);
  const [userVoidPassword, setUserVoidPassword] = useState('');
  const [voidPassword, setVoidPassword] = useState({ value: '', error: '' })
  const [voidItemFromList, setVoidItemFromList] = useState([])
  const [orderQty, setOrderQty] = useState(0);
  const [dashboardPermission, setDashBoardPermission] = useState([])
  const [dineInPermission, setDineInPermission] = useState([])
  const [takeAwayPermission, setTakeAwayPermission] = useState([])
  const [onlinePermission, setOnlinePermission] = useState([])
  const [kitchenPermission, setKitchenPermission] = useState([])
  const [reportsPermission, setReportsPermission] = useState([])
  const [barPermission, setBarPermission] = useState([])
  const [mastersPermission, setMastersPermission] = useState([])
  const [discountName, setDiscountName] = useState('')
  const [dineInDiscountdata, setDineInDiscountData] = useState([])
  const [discountdataparticular, setdiscountdataparticular] = useState([]);
  const [openDineInDiscount, setOpenDIneInDiscount] = useState(false);
  const [promocode, setPromocode] = useState([]);
  const [checkedpromo, setCheckedpromo] = React.useState(false);
  const [checkedpromoId, setCheckedpromoId] = React.useState("");
  const [restName, setRestName] = useState('')
  const [address, setAddress] = useState('')
  const [tableNoError, setTableNoError] = useState('');
  const [itemLevelTax, setItemLevelTax] = useState([])
  const [discPromoValue, setDiscPromoVal] = useState(0);
  const [discPromoType, setDiscPromoType] = useState("Percentage");
  const [isDiscPromoSelected, setIsDiscPromoSelected] = useState("false");
  const [isPromocode, setIsPromocode] = useState(false);
  const [restaurant, setRestaurant] = useState('');
  const [discPromoName, setDiscpromoName] = useState("");
  const [selectedModifier, setSelectedModifier] = useState(null);
  const [selectedItemmod, setSelectedItemMod] = useState("");
  const [modifirerror, setmodifirerror] = useState(false)


  //Search Categories starts
  const handlesearchchange = (text) => {
    setSearchQuery(text);

    const filteredData = itemsmasterdata.filter(
      element => element.itemName.toLowerCase().includes(text.toLowerCase())
    );
    let items_array = []
    items_array = filteredData.reduce((re: { id: any; name: any; data: any[]; }[], o: { categoryName: any; itemCategoryId: any; }) => {
      let existObj = re.find(
        (obj: { name: any; }) => obj.name === o.categoryName
      )

      if (existObj) {
        existObj.data.push(o)
      }
      else {
        re.push({
          id: o.itemCategoryId,
          name: o.categoryName,
          data: [o]
        })
      }
      return re
    }, [])
    if (text.length > 0) {
      setItemsData(items_array)
    } else {
      setItemsData(tempitemsData)
    }

  };
  //Search Categories ends

  //get All Table details, Category, Items, Tax List Starts 
  useEffect(() => {
    setSearchQuery('');
    setItemLevelTax([])
    setVatValue(0);
    setDiscPromoVal(0);
    setDiscpromoName("");
    setDiscPromoAmt(0);
    checkPermissions()
    setRefreshDiscount(false)
    getTableList();
    setSelectedTableId('');
    setSelectedItems([]);
    setIsNewOrder(true);
    getDineInDiscountList();
    getPromocodes();
    getPrintDesignList();
    setSelectItemModifier([]);
    setSelectedModifier(null);
    setSelectedItemMod("")
    setmodifirerror(false)
    setFinalNotesOrder("")
    return () => {
    }
  }, [isFocused])


  const validateForm = () => {
    let isValid = true;

    if (!selectedTableNo) {
      setTableNoError('Table No is required');
      isValid = false;
    } else {
      setTableNoError('');
    }

    return isValid;
  };

  const getTableList = async () => {
    const userRoleId = await AsyncStorage.getItem('userRoleId')
    setuserRoleId(userRoleId)
    const jsonValue = await AsyncStorage.getItem('userInfo')
    const outletName = await AsyncStorage.getItem('outletName')
    setOutlet(outletName)
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let loginAddress = loginData.address
    setAddress(loginAddress)
    setUserToken(token);
    let outletId = loginData.outletId;
    setOutletId(outletId)
    setUserOutletId(outletId);
    const prodRestName = await AsyncStorage.getItem('RestaurantName')
    setRestName(prodRestName)
    const restaurantName = await AsyncStorage.getItem('restaurantName')
    setRestaurant(restaurantName)


    //Get Category List
    const resultCat = await api.getAllMasterData(token, endPoint.GET_CATEGORY + outletId);
    if (JSON.stringify(resultCat.data) === null || JSON.stringify(resultCat.data) === "null" || resultCat.data === "") {

    } else {
      setCategoryData(resultCat.data);
    }
    //Get Tax List
    const resultTax = await api.getAllMasterData(token, endPoint.GET_TAX + outletId);
    if (JSON.stringify(resultCat.data) === null || JSON.stringify(resultTax.data) === "null" || resultCat.data === "") {

    } else {
      setTaxData(resultTax.data);
      setTaxPerc(resultTax.data[0]?.taxPercent[0]?.taxPercent)
      setTaxName(resultTax.data[0]?.taxName)
    }
    //Get Taxset up List
    const resultTaxSetup = await api.getAllMasterData(token, endPoint.GET_TAXSETUP + outletId);
    if (JSON.stringify(resultTaxSetup.data) === null || JSON.stringify(resultTaxSetup.data) === "null" || resultTaxSetup.data === "") {

    } else {
      setTaxSetupData(resultTaxSetup.data);
      setisItemIncludeTax(resultTaxSetup.data[0]?.isItemIncludeTax)
      setisSubtractFromSubTotal(resultTaxSetup.data[0]?.isSubtractFromSubTotal)
    }
    //Get Sections List
    const result = await api.getAllMasterData(token, endPoint.GET_TABLE_TYPE + outletId);
    if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {

    } else {
      setTableData(result.data);
    }
    setisrefreshingresultTablelist(true)
    //Get Table List
    const tableResult = await api.getAllMasterData(token, endPoint.GET_TABLE_LIST + outletId);
    if (JSON.stringify(tableResult.data) === null || JSON.stringify(tableResult.data) === "null" || tableResult.data === "") {
      setisrefreshingresultTablelist(false)
    } else {
      setTableListData(tableResult.data);
      setTableListMaster(tableResult.data);
      setisrefreshingresultTablelist(false)
    }
    //Get Items List
    var myJson = {
      IsAllItem: true,
      OutletId: outletId,
    }
    setisrefreshingresultitemslist(true)
    const itemsResponse = await api.CreateMasterData(endPoint.GET_ITEMS, token, myJson);
    const itemresult = itemsResponse.data.filter((item:any) => item?.isActive === true);
    if (JSON.stringify(itemsResponse.data) === null || JSON.stringify(itemsResponse.data) === "null" || itemsResponse.data === "") {
      setisrefreshingresultitemslist(false)
    } else {
      let items_array;
      items_array = itemresult.reduce((re: { id: any; name: any; data: any[]; }[], o: { categoryName: any; itemCategoryId: any; }) => {
        let existObj = re.find(
          (obj: { name: any; }) => obj.name === o.categoryName
        )

        if (existObj) {
          existObj.data.push(o)
        }
        else {
          re.push({
            id: o.itemCategoryId,
            name: o.categoryName,
            data: [o]
          })
        }
        return re
      }, [])
      setItemsData(items_array);
      setisrefreshingresultitemslist(false)
      setTempItemsData(items_array);
      setItemsmasterdate(itemresult)
    }
  }
  //get All Table details, Category, Items, Tax List Ends

  //Permissions Filter Method Starts
  const checkPermissions = async () => {
    const permissions = await AsyncStorage.getItem('permissions')
    const loginPermissions = JSON.parse(permissions)

    //Checking Permission for Dashboard
    const fetchDashboardStatus = loginPermissions.filter((item:any) => item.formId === formId.DASHBOARD && item.isFormAccess === true)
    setDashBoardPermission(fetchDashboardStatus)
    //Checking Permission for Dinein
    const fetchDineInStatus = loginPermissions.filter((item:any) => item.formId === formId.DINEIN && item.isFormAccess === true)
    setDineInPermission(fetchDineInStatus)
    //Checking Permission for Takeaway
    const fetchTakeAwayStatus = loginPermissions.filter((item:any) => item.formId === formId.TAKEAWAY && item.isFormAccess === true)
    setTakeAwayPermission(fetchTakeAwayStatus)
    //Checking Permission for Online
    const fetchOnlineStatus = loginPermissions.filter((item:any) => item.formId === formId.ONLINE && item.isFormAccess === true)
    setOnlinePermission(fetchOnlineStatus)
    //Checking Permission for Inventory
    const fetchInventoryStatus = loginPermissions.filter((item:any) => item.formId === formId.MASTERS && item.isFormAccess === true)
    setMastersPermission(fetchInventoryStatus)
    //Checking Permission for Kitchen
    const fetchKitchenStatus = loginPermissions.filter((item:any) => item.formId === formId.KITCHEN && item.isFormAccess === true)
    setKitchenPermission(fetchKitchenStatus)
    //Checking Permission for Bar
    const fetchBarStatus = loginPermissions.filter((item:any) => item.formId === formId.BAR && item.isFormAccess === true)
    setBarPermission(fetchBarStatus)
    //Checking Permission for Reportsdashboard
    const fetchReportsStatus = loginPermissions.filter((item:any) => item.formId === formId.REPORTS && item.isFormAccess === true)
    setReportsPermission(fetchReportsStatus)

  }
  //Permissions Filter Method Ends

  //Refreshing the tables Starts
  const refreshTable = async () => {
    const tableResult = await api.getAllMasterData(userToken, endPoint.GET_TABLE_LIST + userOutletId);
    if (JSON.stringify(tableResult.data) === null || JSON.stringify(tableResult.data) === "null" || tableResult.data === "") {
    } else {
      setTableListData(tableResult.data);
      setTableListMaster(tableResult.data);
    }
  }
  //Refreshing the tables Ends


  //get UpdateTable List 
  const updateTableList = (data: any) => {

    let items_data;

    let filtereddata = tableListMaster.filter((el) => {

      if (data.value != '') {
        return el.tableType === data.value
      }
      else {
        return true
      }
    })
    setTableListData(filtereddata);
    setSelectedValue(data.key)
  }

  //get Update Itemlist
  const updateItemList = (data) => {
    let items_data;
    const filteredData = itemsmasterdata.filter(
      element => element.itemCategoryId === data?.value
    );
    let items_array = []
    items_array = filteredData.reduce((re: { id: any; name: any; data: any[]; }[], o: { categoryName: any; itemCategoryId: any; }) => {
      let existObj = re.find(
        (obj: { name: any; }) => obj.name === o.categoryName
      )

      if (existObj) {
        existObj.data.push(o)
      }
      else {
        re.push({
          id: o.itemCategoryId,
          name: o.categoryName,
          data: [o]
        })
      }
      return re
    }, [])
    setItemsData(items_array);
    setTempItemsData(items_array);
    setSelectedValue2(data.key)
  }

  //Discount Popup Call
  const toggleModa3 = () => {
    setOpenDiscount(!openDiscount)
  };



  //hiding and displaying the loader after few seconds
  const addSelectedItem = async (data: { id: any; itemName: any; categoryName: any; itemCategoryId: any; itemAmount: any; isReadyMade: any; itemLocation: any, taxId: any }) => {
    if (tableSelect != null) {
      var chek = selectedItems.find(c => c.itemId === data.id);
      if (chek === undefined) {
        setisrefreshingresultselecteditemslist(true)
        let selectedItemsList = {
          id: data.id,
          itemId: data.id,
          itemName: data.itemName,
          orderQuantity: 1,
          itemCategory: data.itemCategoryId,
          itemLocation: data.itemLocation,
          itemSubCategory: data.categoryName,
          itemAmount: data.itemAmount,
          isReadyMade: data.isReadyMade,
          notes: notes,
          createdDateTime: "2022-01-18T10:10:41.798Z",
          orderTakenBy: "Admin",
          tableNo: tableSelect.tableNo,
          itemStatus: "Order",
          itemDiscountType: "string",
          itemDiscountValue: 0,
          statusChangeTime: "2022-01-18T10:10:41.798Z",
          tableType: tableSelect.tableType,
          subTotal: data.itemAmount,
          modifiers: [],
          discount: data?.discount,
          taxId: data.taxId
        }
        await setSelectedItems([...selectedItems, selectedItemsList])
        if (selectedItems[0]?.tableNo != oldTableNo) {
          await settempSelectedItems([...tempselectedItems, selectedItemsList])

        }
        getTotal(selectedItems)
        setisrefreshingresultselecteditemslist(false)
      }

      else {
        let selectedItemsList = {
          id: data.id,
          itemId: data.id,
          itemName: data.itemName,
          orderQuantity: 1,
          itemCategory: data.categoryName,
          itemLocation: data.itemLocation,
          itemSubCategory: data.itemSubCategoryId,
          itemAmount: data.itemAmount,
          isReadyMade: data.isReadyMade,
          notes: notes,
          createdDateTime: "2022-01-18T10:10:41.798Z",
          orderTakenBy: "Admin",
          tableNo: tableSelect.tableNo,
          itemStatus: "Order",
          itemDiscountType: "string",
          itemDiscountValue: 0,
          statusChangeTime: "2022-01-18T10:10:41.798Z",
          tableType: tableSelect.tableType,
          subTotal: data.itemAmount,
          modifiers: [],
          discount: data?.discount,
          taxId: data.taxId
        }
        setQuantity(selectedItemsList, 1)
        Toast.show("Item Quantity Increased");
      }
    }
    else {
      Toast.show('Please select the table', {
        duration: Toast.durations.LONG,
      });
    }

  }

  //Update Order Quantity List
  const setQuantity = (product: Item, amount: number) => {
    if (product.orderQuantity <= 1 && amount === -1) {

    }
    else {
      let updateCountArray;
      let filteredArray;

      updateCountArray = selectedItems.map(item => item.id === product.id ? {
        ...item,
        orderQuantity: item.orderQuantity + amount,
        subTotal: item.itemAmount * item.orderQuantity
      } : item)

      filteredArray = updateCountArray.filter((obj) => obj.orderQuantity !== 0)

      setSelectedItems(filteredArray);
      getTotal(filteredArray)
    }

  };



  //Order Vatvalue Calculation Starts
  const getVatValue = (data: any) => {
    if (isItemIncludeTax === true && isSubtractFromSubTotal === true) {
      let value = (parseFloat(data) * parseFloat(taxPerc)) / 100;
      let subvalue = parseFloat(data) - value;
      return value;
    }
    else if (isItemIncludeTax === false && isSubtractFromSubTotal === true) {
      let value = (parseFloat(data) * parseFloat(taxPerc)) / 100;
      let subvalue = parseFloat(data) - value;
      let totalValue = parseFloat(value) + parseFloat(subvalue)
      //setSubTotal(JSON.stringify(totalValue))
      return value;
    }
    else if (isItemIncludeTax) {
      let value = 0;
      return value;
    }
    //isItemIncludedTax and isSubtractFromSubTotal false condition
    else if (isItemIncludeTax != true && isSubtractFromSubTotal != true) {
      let value = (parseFloat(data) * parseFloat(taxPerc)) / 100;
      let subvalue = parseFloat(data) - value;
      let totalValue = parseFloat(value) + parseFloat(subvalue)
      //setSubTotal(JSON.stringify(totalValue)); //surendra commented this at last.... for case -3 & case -4
      return value;
    } else {
    }

  }
  //Order Vatvalue Calculation Ends

  //get Orderdetails 
  const getOrderData = (data) => {
    setTableSelect(data)
    setSelectedTableId(data.tableId)
    if (data.tableStatus != "Empty") {
      setIsNewOrder(false)
      getOrderDetails(data.orderId)
      setSelectedTableNo(data.tableNo)
      setOldTableId(data.tableId)
      setOldTableNo(data.tableNo)
      setOrderId(data.orderId)
    }
    else {
      setSelectedItems([])
      setIsNewOrder(true)
      setSubTotal(0)
      setVatValue(0)
      setGrandTotal(0)
      setNewTableId(data.tableId)
      setNewTableNo(data.tableNo)
    }
  }

  //getOrderDetails by Table Id
  const getOrderDetails = async (table_id: string) => {
    const result = await api.getAllMasterData(userToken, endPoint.GET_TABLE_ORDERS + table_id);
    if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {

    } else {
      setTableOrders(result.data);
      setSelectedItems(result.data.items)
      setVatValue(getVatValue(result.data.subTotal).toFixed(2))
      getTotal(result.data.items)

    }
  }

  const getPrintDesignList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const result = await api.GetPrintDesign(token, outletId);
    if (result.success) {
      const filterdata = result.data.filter((item) => item.activeStatus == true)
      setPrintData(filterdata);
    }
    else {

    }
  }

  //Place Order API Call Strats
  const PlaceOrder = async () => {
    if (selectedItems.length > 0) {
      setLoading(true);
      const jsonValue: any = await AsyncStorage.getItem('userInfo')
      let loginData = JSON.parse(jsonValue);

      let token = loginData.token;
      let outletId = loginData.outletId;

      let OrderDetails = [
        {
          orderType: 'Dine-in',
          orderMode: "offline",
          partnerName: "string",
          partnerId: "string",
          deliveryPerson: "string",
          deliveryPersonPhone: "string"
        }
      ]

      let createOrderJSON;
      createOrderJSON = {
        customerId: loginData.userId,
        items: selectedItems != null ? selectedItems : [],
        orderType: 'Dine-in',
        finalNotes: finalNotesOrder,
        subTotal: parseInt(grandTotal),
        total: parseInt(grandTotal),
        orderStatus: "Running",
        orderDetails: OrderDetails,

        orderHistories: [{
          "orderStatus": "string",
          "timeLog": "2022-01-18T10:10:41.798Z",
          "staffName": "string"
        }],
        outletId: outletId

      }
      const result = await api.CreateMasterData(endPoint.CREATE_DINEIN_ORDER, token, createOrderJSON);
      if (JSON.stringify(result.data) === null) {

      } else {
        setopenSuccessMsg(true)
        setLoading(false);
        setItemorderDateKitchen(moment(result?.data?.orderDateTime).format('H:mm'));
        setItemOrderTypeKitchen(result?.data?.orderType);
        setItemOrderNoKitchen(result?.data?.orderNo)
        setSelectedItems([])
        refreshTable();

      }
    } else {
      Toast.show("Please select the Items");
    }
  }
  //Place Order API Call Ends

  //Payment to the order API Call starts
  const PaynowOrder = async () => {
    const paymentModeErrorMsg = "Please Select the Payment Mode";
    const cardTypeErrorMsg = "Please Select the Card Type";
    const amountRecievedErrorMsg = "Please Enter The Amount Recieved"

    if (paymentModeError.value == "" && cardTypeError.value == "" && amountRecievedError.value == "") {
      setPaymentModeError({ ...paymentModeError, value: '', error: paymentModeErrorMsg });
      setCardTypeError({ ...cardTypeError, value: '', error: cardTypeErrorMsg });
      setAmountRecievedError({ ...amountRecievedError, value: '', error: amountRecievedErrorMsg })

      return
    }

    if (paymentModeError.value != "" && cardTypeError.value == "" && amountRecievedError.value == "") {
      setCardTypeError({ ...cardTypeError, error: cardTypeErrorMsg });
      setAmountRecievedError({ ...amountRecievedError, error: amountRecievedErrorMsg })

      return
    }
    else {
      if (amountreceivedchange || cardtypedata?.length > 0) {

        setLoading(true);

        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);

        let token = loginData.token;
        let outletId = loginData.outletId;
        let payadata = {
          orderId: tableOrders.orderId,
          orderType: "Dine-in",
          orderDateTime: "2022-06-30T09:36:07.881Z",
          customerId: loginData.userId,
          subTotal: parseInt(grandTotal),
          total: parseInt(grandTotal),
          promocode: "",
          isPromocodeApplied: false,
          promocodeDiscountType: "",
          promocodeDiscount: discPromoValue,
          promocodeAmount: discPromoAmtcal,
          discountType: "",
          discountValue: discPromoValue,
          discountName: discPromoName,
          discountedAmount: discPromoAmtcal,
          discountNotes: "",
          taxDetails: [
            {
              taxName: taxName,
              taxPercent: taxPerc,
              taxAmount: vatValue
            }
          ],
          itemWiseTax: itemLevelTax,
          totalPayableAmount: parseInt(grandTotal),
          ReceivedAmount: parseInt(grandTotal),
          paymentMode: "",
          isPaid: true,
          paymentBreakage: [
            {
              paymentMode: selectpaymenttype,
              amount: parseInt(grandTotal),
              cashRecived: amountreceivedchange,
              balanceReturned: balancereturnedchange,
              cardType: cardtypedata
            }
          ],
          isItemIncludeTaxPercentage: "undefined",
          outletId: outletId
        }
        const result = await api.Paynoworder(token, payadata);
        if (JSON.stringify(result.data) === null) {

        } else {
          setPaynowkey(0)
          setVatValue(0);
          setPaymentModeError({ value: '', error: '' });
          setCardTypeError({ value: '', error: '' });
          setAmountRecievedError({ value: '', error: '' });
          setpaycardtype(0)
          setamountreceivedchange(0)
          setbalancereturnedchange(0)
          setselectpaymenttype(null)
          setpaycardtype(0)
          setamountreceivedchange(0)
          setbalancereturnedchange(0)

          setopenSuccessPaymentMsg(true)
          setOpenPaynow(false)
          setLoading(false);
          refreshTable();

        }
      }
    }

  }
  //Payment to the order API Call ends

  //Update Order API Call starts
  const UpdateOrder = async () => {
    setLoading(true);
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    let OrderDetails = [
      {
        orderType: 'Dine-in',
        orderMode: "string",
        partnerName: "string",
        partnerId: "string",
        deliveryPerson: "string",
        deliveryPersonPhone: "string"
      }
    ]

    let updateOrderJSON;
    updateOrderJSON = {
      customerId: loginData.userId,
      orderId: tableOrders.orderId,
      items: selectedItems != null ? selectedItems : [],
      orderType: tableOrders.orderType,
      finalNotes: updataFinalNotes,
      subTotal: parseInt(grandTotal),
      total: parseInt(grandTotal),
      orderStatus: tableOrders.orderStatus,
      orderDetails: tableOrders.orderDetails,
      outletId: outletId,
      orderNo: tableOrders.orderNo
    }

    const result = await api.UpdateMasterData(endPoint.UPDATE_DINEIN_ORDER + tableOrders.orderId, token, updateOrderJSON);
    if (JSON.stringify(result.data) === null) {

    } else {
      setopenUpdateSuccess(true)
      refreshTable();
      setLoading(false);
    }

  }
  //Update Order API Call ends

  //Filter Category Details
  let categorynewarray = []
  categorynewarray.push({
    key: 1,
    label: "Select All",
    value: "Select All",
  })
  categoryData.map((s, i) => {
    let newData = {
      key: i + 2,
      label: s.categoryName,
      value: s.categoryId,
    }
    categorynewarray.push(newData)

  })

  //Filter Tabledetails
  let tablenewarray = []
  tablenewarray.push({
    key: 1,
    label: "Select All",
    value: "Select All",
  })
  tableData.map((s, i) => {
    let newData1 = {
      key: i + 2,
      label: s.tableTypeName,
      value: s.tableTypeName,
    }
    tablenewarray.push(newData1)
  })

  //Payment Popup Close
  const toggleModal = () => {
    setPaynowkey(0)
    setpaycardtype(0)
    setOpenPaynow(!openPaynow)
    setamountreceivedchange(0)
    setbalancereturnedchange(0)
    setselectpaymenttype('')
  };
  //Notes Popup
  const toggleModal1 = () => {
    setOpenNotes(!openNotes)
  };

  //Notes for Item
  const submitNotes = () => {
    const list = [...selectedItems];
    list[notesIndex]["notes"] = notes;
    setSelectedItems(list);
    setNotes(notes)
    setOpenNotes(!openNotes)
    Toast.show('Item Notes Saved Successfully', {
      duration: Toast.durations.LONG,
    });
  };

  //Merge Table Popup
  const toggleMergeTable = () => {
    setTableKey(0)
    setSelectedTableNo("")
    setOpenMergeTable(!openMergeTable)
  }
  //Shift table Popup
  const toggleShiftTable = () => {
    setTableNoError("")
    setSelectedTableNo("")
    setOpenShiftTable(!openShiftTable)
    setTableKey(0)
  }

  //Pament Popup
  const Paynowop = () => {
    setOpenPaynow(!openPaynow)
  }
  // Success msg 
  const successOpen = () => {
    setopenSuccessMsg(!openSuccessMsg)
  }
  //Update Success
  const successupdateOpen = () => {
    setopenUpdateSuccess(!openUpdateSuccess)
  }
  //Payment Success
  const successPaymentOpen = () => {
    setopenSuccessPaymentMsg(!openSuccessPaymentMsg)
  }
  // Success msg - ends 

  //Payment Type Select dropdown data
  const paymentDropDownData = [
    { key: 1, label: 'Card', value: 'Card' },
    { key: 2, label: 'Cash', value: 'Cash' },
    { key: 3, label: 'Online', value: 'Online' },
    { key: 4, label: 'TapnGo', value: 'TapnGo' },

  ]

  //Card Type Select method dropdown data
  const paymentcardDropDownData = [
    { key: 1, label: 'Master', value: 'Master' },
    { key: 2, label: 'Visa', value: 'Visa' },
    { key: 3, label: 'Others', value: 'Others' },
  ]

  //Invoice HTML Table  
  const htmltable = () => {
    var table = '';
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds()
    const imagePath1 = 'assets/images/logo.png';
    const imageUri = FileSystem.documentDirectory + imagePath1;
    var currentime = date + '/' + month + '/' + year
      + ' ' + hours + ':' + min + ':' + sec

    for (let i in selectedItems) {
      const item = selectedItems[i];
      settablenoset(item?.tableNo)
      const totalamnt = (parseInt(item?.itemAmount) * parseInt(item?.orderQuantity))
      if (parseInt(i) === parseInt(selectedItems.length - 1)) {
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
     <td class="text-right"> ${subTotal}</td>
     </tr>`;
        if (discPromoAmtcal === 0) {
          table = table +
            `<tr>
      <th colspan="4" class="text-right">${discPromoName} Discount</th>
      <td class="text-right"> 0 </td>
      </tr>
     <tr>
      `
        }
        else {
          table = table +
            `<tr>
      <th colspan="4" class="text-right">${discPromoName} Discount</th>
      <td class="text-right"> - ${discPromoAmtcal}</td>
      </tr>
     <tr>`;
        }
        table = table + `
     <th colspan="4" class="text-right">VAT</th>
     <td class="text-right"> ${vatValue}</td>
     </tr>
     `;

        for (let j in itemLevelTax) {
          const itemtax = itemLevelTax[j];
          table = table + `
      <tr>
  <th colspan="4" class="text-right">
    {itemtax.taxName} of {itemtax.itemName}: {itemtax.taxPercent} %
  </th>
  <td class="text-right">
    {typeof itemtax.taxAmount === 'number' ? itemtax.taxAmount.toFixed(2) : '0.00'}
  </td>
</tr>`;
        }

        table = table + ` 
     <tr>
     <th colspan="4" class="text-right">Grand Total</th>
     <td class="text-right"> ${grandTotal}</td>
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
           <tr>
           <td colspan="5">
             <div class="header_blk">
               <p class="rest_name fw-bold">${restName}</p>
               <p class="rest_name">Outlet: ${outletName}</p>
               <p class="rest_name">${address}</p>
             </div>
           </td>
           </tr>
           <tr>
           <td colspan="5" class="text-right">Date: ${currentime}</td>
         </tr>
         
           <tr>
             <td colspan="3" class="fw-bold">Order Type: Dine-In</td>
             <td colspan="2" class="fw-bold">Table No: ${tablenoset}</td>
           </tr>
           <tr>
             <td class="fw-bold">${printdata[0]?.printItemHeaderSettings?.item != undefined ? printdata[0]?.printItemHeaderSettings?.item : ""}</td>
             <th>${printdata[0]?.printItemHeaderSettings?.discount != undefined ? printdata[0]?.printItemHeaderSettings?.discount : ""}</th>
             <th>${printdata[0]?.printItemHeaderSettings?.quantity != undefined ? printdata[0]?.printItemHeaderSettings?.quantity : ""}</th>
             <th>${printdata[0]?.printItemHeaderSettings?.amount != undefined ? printdata[0]?.printItemHeaderSettings?.amount : ""}</th>
             <th>Total Amount</th>
           </tr>
           ${table}
           
             <tr>
             <td colspan="5" class="text-center">${printdata[0]?.printFooderSettings?.fooderDetails != undefined ? printdata[0]?.printFooderSettings?.fooderDetails : ""}</td>
             </tr>
         </table>
       </body>
       </html>
       `;
    return html;
  }
  //Invoice HTML Table ends

  //Call Print Invoice
  const print = async () => {
    if (printdata.length === 0) {
      Toast.show('Please Activate any one Print Design', {
        duration: Toast.durations.LONG,
      });
    }
    else {
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      await Print.printAsync({
        html: htmltable(),
      });
    }

  }

  //After Place order default print invoice HTML table starts
  const htmltableKitchen = () => {
    var table = '';
    for (let i in selectedItems) {
      const item = selectedItems[i];
      if (itemorderTypeKitchen === 'Dine-in') {
        table = table + `
      <tr>
      <td> ${item?.tableNo} </td> 
      <td> ${item?.itemName}</td>
<td>${item?.notes || 'No notes available'}</td>
      <td> ${item?.orderQuantity?.toFixed(2)}</td> 
      </tr>`

      } else {
        table = table + `
      <tr>
      <td> Walk-in</td> 
      <td> ${item?.itemName}</td>
      <td>NA</td>
      <td> ${item?.orderQuantity?.toFixed(2)}</td> 
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
            <th colspan="4"><p class="heade_print">Order Print</p><p class="Order_no">Order No: <span class="fw-bold">${itemorderNoKitchen}</span></p></th>
          </tr>
          <tr>
            <td colspan="3" class="fw-bold">Order Type : ${itemorderTypeKitchen}</td>
            <td class="text-right">Time : ${itemorderDateKitchen}</td>
          </tr>
          <tr>
          <th>Table No</th>
          <th>Item</th>
          <th>Item Notes</th>
          <th>Quantity</th>
          </tr>
          ${table}
          
            <tr>
            <tr>
            <tr>
        </table>
      </body>
      </html>
      `;
    return html;
  }
  //After Place order default print invoice HTML table ends

  //Pay and Bill Calculation
  const payBill = async (text) => {

    if (parseInt(text) < parseInt(grandTotal)) {
      setbalancereturnedchange(0)
      setamountreceivedchange(text)

    } else {
      const returnedamount = parseInt(text) - parseInt(grandTotal)
      setbalancereturnedchange(returnedamount)
      setamountreceivedchange(text)
    }
  }

  // success message UI
  const SuccessPopup = () => {
    return (
      // success popup
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
          <Image source={(require("../../assets/images/placeordergif1.gif"))} style={[styles.marBtm20, styles.sucImg]} />
          <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Order placed Successfully</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => [successOpen(), navigation.navigate('Kitchen')]}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - ends
    );
  }
  // success message UI ends

  // success message UI
  const UpdateSuccessPopup = () => {
    return (
      // success popup
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
          <Image source={(require("../../assets/images/placeordergif1.gif"))} style={[styles.marBtm20, styles.sucImg]} />
          <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Order Updated Successfully</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => [successupdateOpen(), navigation.navigate('Orders')]}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - ends
    );
  }
  // success message UI ends

  //Payment Success Popup Ui
  const SuccessPaymentPopup = () => {
    return (
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
          <Image source={(require("../../assets/images/placeordergif1.gif"))} style={[styles.marBtm20, styles.sucImg]} />
          <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Payment done successfully</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => [successPaymentOpen(), navigation.navigate('Orders')]}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - ends

    );
  }

  //Open Payment Popup strats
  const popupAddPaynow = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>
          <View>
            <View style={styles.popupHeadWrap}>
              <Text style={styles.textStyle3}>
                Payment
              </Text>
              <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                <Text style={styles.closeText}>
                  Close
                </Text>
              </Pressable>
            </View>
            <View style={styles.paynowPopupRow}>
              <View style={[styles.popupInputBlk, styles.wdth100, styles.paddRL15]}>
                <View style={[styles.paynowpop]}>
                  <Text style={styles.orderPopup}>
                    Order No : {tableOrders.orderNo}
                  </Text>
                  <Text style={styles.orderPopup}>
                    Total Amount : {grandTotal}
                  </Text>
                </View>
              </View>
              <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                <Text style={[styles.signLabel, styles.menuText]}>Select Payment Type</Text>
                <View>
                  <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
                  <ModalSelector
                    data={paymentDropDownData}
                    childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                    selectStyle={styles.selectText}
                    initValueTextStyle={styles.textStyle}
                    optionContainerStyle={styles.selectCont}
                    optionTextStyle={styles.textStyle}
                    overlayStyle={styles.overlayText}
                    cancelStyle={styles.selectCont}
                    cancelText={"Cancel"}
                    cancelContainerStyle={styles.cancelCont}
                    initValue="Select PaymentMode"
                    selectedKey={paynowKey}
                    onChange={(option) => {
                      if (option.key) {
                        setselectpaymenttype(option.value)
                        setPaynowkey(option.key)
                        setpaycardtype(0)
                        setamountreceivedchange(0)
                        setbalancereturnedchange(0)
                        setPaymentModeError({ value: option.value, error: '' })
                      }
                    }}
                  />

                  <Text style={styles.errorMsg} >{paymentModeError.error}</Text>

                </View>
              </View>
              <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                <Text style={[styles.signLabel, styles.menuText]}>Amount</Text>
                <TextInput style={styles.signInput}>{grandTotal}</TextInput>
              </View>

              {
                selectpaymenttype === 'Cash' && (
                  <View style={styles.paynowPopupRow}>
                    <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                      <TextInput
                        style={styles.signInput}
                        placeholder='Amount Received'
                        keyboardType="numeric"
                        onChangeText={(text: string) => {
                          const amountReceived = parseFloat(text); // Convert the string to a number
                          if (isNaN(amountReceived)) {
                            // Handle the case when the input is not a valid number
                            setAmountRecievedError({ value: text, error: 'Please enter the amount recieved.' });
                          } else if (amountReceived < parseFloat(grandTotal)) {
                            // Handle the case when the input is a valid number but less than the grandTotal
                            setAmountRecievedError({ value: text, error: 'Amount received is less than the total amount' });

                          } else {
                            // Handle the case when the input is a valid number and greater than or equal to the grandTotal
                            setAmountRecievedError({ value: text, error: '' });
                            payBill(amountReceived);
                          }
                        }}
                      />
                      <Text style={[styles.errorMsg, { left: 15 }]} >{amountRecievedError.error}</Text>
                    </View>
                    <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                      <TextInput style={styles.signInput} placeholder='Balance Returned'>
                        {balancereturnedchange}
                      </TextInput>
                    </View>
                    <Text style={styles.errorMsg} >{paymentModeError.error}</Text>
                  </View>
                )
              }
              {
                selectpaymenttype != 'Cash' && (<View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                  <Text style={[styles.signLabel, styles.menuText]}>Select Card Type</Text>
                  <View>
                    <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
                    <ModalSelector
                      data={paymentcardDropDownData}
                      childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                      selectStyle={styles.selectText}
                      initValueTextStyle={styles.textStyle}
                      optionContainerStyle={styles.selectCont}
                      optionTextStyle={styles.textStyle}
                      overlayStyle={styles.overlayText}
                      cancelStyle={styles.selectCont}
                      cancelContainerStyle={styles.cancelCont}
                      cancelText={"Cancel"}
                      initValue="Select Card Type"
                      selectedKey={paycardtype}

                      onChange={(option) => {
                        if (option.key) { // workaround for ios https://github.com/peacechen/react-native-modal-selector/issues/140

                          setcardtypedata(option.value)
                          setpaycardtype(option.key)
                          setCardTypeError({ value: option.value, error: '' })
                        }
                      }}
                    />
                    <Text style={styles.errorMsg} >{cardTypeError.error}</Text>
                  </View>
                </View>)
              }

              {
                (selectpaymenttype) ? <>
                  <View style={[styles.wdth100, styles.paddRL15]}>
                    <View style={[styles.paynowpopAddmore]}>
                      <Text style={[styles.orderPopuptext, selectpaymenttype != 'Cash' ? null : styless.wdth25]}>
                        Payment Type
                      </Text>

                      {selectpaymenttype != 'Cash' ?
                        <Text style={[styles.orderPopuptext, selectpaymenttype != 'Cash' ? null : styless.wdth25]}>

                          Card Type
                        </Text> : null
                      }
                      <Text style={[styles.orderPopuptext, selectpaymenttype != 'Cash' ? null : styless.wdth25]}>

                        Amount
                      </Text>
                      <Text style={[styles.orderPopuptext, selectpaymenttype != 'Cash' ? null : styless.wdth25]}>

                        Amount Received
                      </Text>
                      <Text style={[styles.orderPopuptext, selectpaymenttype != 'Cash' ? null : styless.wdth25]}>

                        Amount Returned
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.wdth100, styles.paddRL15]}>
                    <View style={[styles.paynowpopAddmorevalue]}>
                      <Text style={[styles.orderPopuptext, selectpaymenttype != 'Cash' ? null : styless.wdth25]}>

                        {selectpaymenttype}
                      </Text>
                      {selectpaymenttype != 'Cash' ?
                        <Text style={[styles.orderPopuptext, selectpaymenttype != 'Cash' ? null : styless.wdth25]}>

                          {cardtypedata}
                        </Text> : null
                      }
                      <Text style={[styles.orderPopuptext, selectpaymenttype != 'Cash' ? null : styless.wdth25]}>

                        {grandTotal}
                      </Text>
                      <Text style={[styles.orderPopuptext, selectpaymenttype != 'Cash' ? null : styless.wdth25]}>

                        {amountreceivedchange}
                      </Text>
                      <Text style={[styles.orderPopuptext, selectpaymenttype != 'Cash' ? null : styless.wdth25]}>

                        {balancereturnedchange}
                      </Text>
                    </View>
                  </View></> : null
              }

              <View style={[styles.popupBtnCon, styles.wdth100]}>
                <TouchableOpacity onPress={PaynowOrder}>
                 <CustomButton style={styles.addCaaatBtn} onPress={PaynowOrder} label={"Pay"} /> 
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
  //Open payment popup ends
  const getItemsByModifier = async (data: any) => {
    setSelectedModifier(data.modifierGroupId)
    setModfierGroupName(data.modifierGroupName)
    setModifierGroupId(data.modifierGroupId)
    const modifierItemResult = await api.getAllMasterData(userToken, endPoint.GET_ITEMS_BY_MODIFIER + data.modifierGroupId);
    if (JSON.stringify(modifierItemResult.data) === null || JSON.stringify(modifierItemResult.data) === "null" || modifierItemResult.data === "") {
      Alert.alert("Some Error occured. Please try again.");
    } else {
      setSelectItemModifierList(modifierItemResult.data);
    }
  }

  //Add Modifier
  const openModifierSelector = (data, index) => {
    setModIndex(index)
    setSelectedItemMod(data.itemName)
    let selectModifier = getIndex(data.id)
    setSelectItemModifier(selectModifier?.modifierGroupNameId)
    setOpenModifierModal(true)
  }

  function getIndex(id) {
    return itemsmasterdata.find(obj => obj.id == id);
  }

  //Add Modifier for Item
  const addItemfromModifier = (data) => {
    setmodifirerror(false)
    let data_item = {
      modifierGroup: modfierGroupName,
      modifierGroupId: modifierGroupId,
      modifierItemId: data.itemId,
      modifierItemName: data.itemName,
      price: parseInt(data.price)
    }
    const newIds = [...updatedModifierItem];
    const search = obj => obj.modifierItemId == data.itemId;
    const index = newIds.findIndex(search);

    if (index > -1) {
      newIds.splice(index, 1);
    } else {
      newIds.push(data_item)
    }
    setUpdatedModifierItem(newIds)
  }
  const addModifiers = () => {
    if(updatedModifierItem.length > 0 ){
      const list = [...selectedItems];
      list[modIndex]['modifiers'] = updatedModifierItem;
      setSelectedItems(list);
      setOpenModifierModal(false);
      setUpdatedModifierItem([]);
      setSelectedItemMod("");
      setSelectItemModifier(null);
      setSelectItemModifier([]);
      getTotal(list)
    }
    else{
      setmodifirerror(true)
      // Toast.show("Please Select Modifier")
    }
  }

  //Popup Modifier for Item
  // const popupModifier = () => {
  //   return (
  //     <View style={styles.popupContainer}>
  //       <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode="on-drag">
  //         <View>
  //           <View style={[styles.flexrow, styles.justifyEnd, styles.marBtm12]}>
  //             <Pressable style={[styles.closeView]} onPress={() => addModifiers()}>
  //               <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
  //               <Text style={styles.closeText}>
  //                 Close
  //               </Text>
  //             </Pressable>
  //           </View>
  //           {selectItemModifier?.length > 0 ?
  //             <>
  //               <View style={[styles.flexAlignRow, styles.paddRL15, styles.marBtm10]}>
  //                 <View style={[styles.wdth50]}>
  //                   <FlatList
  //                     nestedScrollEnabled
  //                     data={selectItemModifier}
  //                     keyExtractor={(item, _index) => item?.modifierGroupId}
  //                     renderItem={({ item }) =>
  //                       <View >
  //                         <TouchableOpacity onPress={() => getItemsByModifier(item)} style={styles.marBtm5}>
  //                           <View style={styles.leftTable}>
  //                             <Text style={[styles.overallText, styles.tableTitleText]}>{item?.modifierGroupName}</Text>
  //                           </View>
  //                         </TouchableOpacity>
  //                       </View>
  //                     }
  //                   />
  //                 </View>

  //                 <View style={[styles.wdth50]}>
  //                   <FlatList
  //                     nestedScrollEnabled
  //                     horizontal
  //                     data={selectItemModifierList.modifierItems}
  //                     keyExtractor={(item, _index) => item.itemId}
  //                     renderItem={({ item }) =>
  //                       <View style={styles.paddR8}>
  //                         <TouchableOpacity >
  //                           <View style={styles.flexrow}>
  //                             <View >
  //                               <TouchableOpacity style={styles.flexAlignRow}
  //                                 onPress={() => {
  //                                   addItemfromModifier(item)
  //                                 }}>
  //                                 <View style={[styles.checkbox, updatedModifierItem.some(val => val.modifierItemId == item.itemId) && styles.radioBtnChecked]}>
  //                                   {
  //                                     (updatedModifierItem.some(val => val.modifierItemId == item.itemId)) ? <View style={styles.checkTick}></View> : null
  //                                   }
  //                                 </View>

  //                               </TouchableOpacity>
  //                             </View>
  //                             <View >
  //                               <Text style={[styles.overallText, styles.tableTitleText]}>{item.itemName}</Text>
  //                               <Text style={[styles.overallText, styles.tableTitleText]}>{item.price}</Text>
  //                             </View>
  //                           </View>

  //                         </TouchableOpacity>
  //                       </View>
  //                     }
  //                   />
  //                 </View>
  //               </View>

  //               <View>
  //                 <TouchableOpacity onPress={() => addModifiers()}>
  //                   <View style={styles.popupBtnCon}>
  //                     <CustomButton style={styles.addCaaatBtn} label={"Add Modifiers"} onPress={() => addModifiers()} />
  //                   </View>
  //                 </TouchableOpacity>
  //               </View>
  //             </> :
  //             <View>
  //               <Text style={[styles.font14, styles.textBlack, styles.textCenter]}>There is no Modifiers for this Item </Text>
  //             </View>
  //           }
  //         </View>
  //       </ScrollView>
  //     </View>
  //   )
  // }
  const popupModifier = () => {
    return (
      <View style={styles.popupContainer}>
        <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode="on-drag">
          <View>

            <View style={[styles.flexrow, styles.justifyBetween, styles.marBtm20, styles.paddRL15]}>
              <Text style={styles.textStyle3}>
                {selectedItemmod}
              </Text>
              <Pressable style={[styles.closeView]} onPress={() => { setUpdatedModifierItem([]), setOpenModifierModal(false), setSelectItemModifier(null), setSelectItemModifierList([]), setmodifirerror(false) }}>
                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                <Text style={styles.closeText}>
                  Close
                </Text>
              </Pressable>
            </View>
            {selectItemModifier.length != 0 ?
              <>
                <View style={[styles.flexAlignRow, styles.paddRL15, styles.marBtm10]}>
                  <View style={[styles.wdth33, styles.addModBorRgt]}>
                    <FlatList
                      nestedScrollEnabled
                      data={selectItemModifier}
                      keyExtractor={(item, _index) => item?.modifierGroupId}
                      renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => getItemsByModifier(item)} style={styles.marBtm10}>
                          <View style={[styles.addModTab, styles.flexrow, styles.justifyCenter,
                          selectedModifier === item.modifierGroupId ? styles.greenBg : null]}>
                            <Text style={[styles.font13, styles.textBlack, selectedModifier === item.modifierGroupId ? styles.textWhite : null]}>{item?.modifierGroupName}</Text>
                          </View>
                        </TouchableOpacity>
                      }
                    />
                  </View>

                  <View style={[styles.wdth60, styles.paddL15]}>
                    <FlatList
                      nestedScrollEnabled
                      horizontal
                      data={selectItemModifierList.modifierItems}
                      keyExtractor={(item, _index) => item.itemId}
                      renderItem={({ item }) =>
                        <View style={styles.paddR8}>
                          <TouchableOpacity>
                            <View style={styles.flexrow}>
                              <View >
                                <TouchableOpacity style={styles.flexAlignRow}
                                  onPress={() => {
                                    addItemfromModifier(item)
                                  }}>
                                  <View style={[styles.checkbox, updatedModifierItem.some(val => val.modifierItemId == item.itemId) && styles.radioBtnChecked]}>
                                    {
                                      (updatedModifierItem.some(val => val.modifierItemId == item.itemId)) ? <View style={styles.checkTick}></View> : null
                                    }
                                  </View>
                                </TouchableOpacity>
                              </View>
                              <View >
                                <Text style={[styles.overallText, styles.tableTitleText]}>{item.itemName}</Text>
                                <Text style={[styles.overallText, styles.tableTitleText]}>{item.price}</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }
                    />
                  </View>
                  
                </View>
                {(modifirerror === true) &&
                    <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Select Modifier is required</Text>
                  }
                <View style={[styles.popupBtnCon, styles.alignCenter]}>
                <TouchableOpacity onPress={() => { setUpdatedModifierItem([]), setOpenModifierModal(false), setSelectItemModifier(null), setSelectItemModifierList([]), setmodifirerror(false) }} style={[styles.cancelBtn, styles.marRgt18]}>
                    <Text onPress={() => { setUpdatedModifierItem([]), setOpenModifierModal(false), setSelectItemModifier(null), setSelectItemModifierList([]), setmodifirerror(false) }} style={styles.textRed}>Continue</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => addModifiers()} style={styles.UpdateBtn}>
                    <Text onPress={() => addModifiers()} style={styles.textWhite}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </> :
              <View>
                <Text style={[styles.font14, styles.textBlack, styles.textCenter]}>There is no Modifiers for this Item </Text>
              </View>
            }
          </View>
        </ScrollView>
      </View>
    )
  }



  //Popup Discount for order
  const popupAddDiscount = () => {
    return (
      <View style={styles.popupContainer}>
        <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode="on-drag">
          <View style={styles.popupHeadWrap}>
            <Text style={styles.textStyle3}>
              Add Discount for<Text style={styles.addmoifieritem}> {discountData[0]?.discountName}</Text>
            </Text>
            <Pressable style={styles.closeView} onPress={() => toggleModa3()}>
              <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
              <Text style={styles.closeText}>
                Close
              </Text>
            </Pressable>
          </View>
          <View style={styles.disPromoBlk}>
            <View style={[styles.paddR8, styles.discountBlk]}>
              <View style={[styles.discountSeg, styles.disseg]}>
                <Text style={[styles.tableCell, styles.marBtm10]}>Selected Discount</Text>
                {
                  (
                    <View>
                      <View style={styles.discountvalueBlk}>
                        <Text style={styles.tableHeader}>Discount Type : </Text><Text style={[styles.promoValue]}>{discountData[0]?.discountType}</Text>
                      </View>
                      <View style={styles.discountvalueBlk}>
                        <Text style={styles.tableHeader}>Discount Value : </Text><Text style={[styles.promoValue]}>{discountData[0]?.discountValue}</Text>
                      </View>
                      <View style={styles.discountvalueBlk}>
                        <Text style={styles.tableHeader}>Discount Amount : </Text><Text style={[styles.promoValue]}>{discPromoAmtcal}</Text>
                      </View>
                      <View style={styles.discountvalueBlk}>
                        <Text style={styles.tableHeader}>Discount Notes : </Text><Text style={[styles.promoValue]}>{discountData[0]?.discoutNotes}</Text>
                      </View>
                      <View style={styles.popupBtnCon}>
                     <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={() => [getTotal(selectedItems), setOpenDIneInDiscount(!openDineInDiscount)]} /> 
                      </View>
                    </View>
                  )

                }
              </View>
            </View>

          </View>
        </ScrollView>
      </View>

    );
  }

  //Notes Functionality
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
              <Pressable style={styles.closeView} onPress={() => toggleModal1()}>
                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                <Text style={styles.closeText}>
                  Close
                </Text>
              </Pressable>
            </View>
            <View style={styles.paynowPopupRow}>
              <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                <TextInput style={styles.signInput} placeholder='Item Notes Write here'
                  onChangeText={(text: string) => {
                    setNotes(text)
                  }} />
              </View>
              <View style={[styles.popupBtnCon, styles.wdth100]}>
                <TouchableOpacity onPress={submitNotes}>
   <CustomButton style={styles.addCaaatBtn} onPress={submitNotes} label={"Save"} /> 
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }

  //Merge Table Api Integration
  const mergeTableApi = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const result = await api.MergeTable(token, endPoint.MERGE_TABLE + oldTableId + '/' + newTableId + '/' + outletId + '/' + orderId);
    if (result.success) {
      Toast.show('Successfully Merged Table', {
        duration: Toast.durations.LONG,
      });
      setOpenMergeTable(!openMergeTable)
      refreshTable();
      setSelectedTableNo('')
      setTableKey(0)
    }
    else {
      Alert.alert("Table is not empty! Please select empty table!");
      setTableKey(0)

    }
  }

  //Shift Table Api Integration
  const shiftTableApi = async () => {
    if (validateForm()) {
      const jsonValue: any = await AsyncStorage.getItem('userInfo')
      let loginData = JSON.parse(jsonValue);
      let token = loginData.token;
      let outletId = loginData.outletId;
      const result = await api.MergeTable(token, endPoint.SHIFT_TABLE + oldTableNo + '/' + newTableNo + '/' + outletId + '/' + orderId);
      if (result.success == false) {

      }
      else {
        Toast.show(' Successfully Shifted Table', {
          duration: Toast.durations.LONG,
        });
        setOpenShiftTable(!openShiftTable)
        refreshTable();
        setTableNoError("")

        setSelectedTableNo('')
        setSelectedItems([]);
        setTableKey(0);

      }
      setSelectedTableNo('');
      setTableKey(0)
      setTableNoError("")

      setNewTableId(null);
      setNewTableNo('');
    }
  }

  //Merge table list 
  const mergeTableListArray = tableListData.filter(el => el.tableId != oldTableId && el.tableStatus === 'Empty')

  const tableNoListArray = mergeTableListArray.map((k, v) => {

    var newData = {
      key: v + 1,
      label: k.tableNo,
      value: k.tableId,
    }
    return newData;
  })

  //Merge Table Popup
  const mergeTablePop = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>
          <View>
            <View style={styles.popupHeadWrap}>
              <Text style={styles.textStyle3}>
                Merge Table
              </Text>
              <Pressable style={styles.closeView} onPress={() => toggleMergeTable()}>
                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                <Text style={styles.closeText}>
                  Close
                </Text>
              </Pressable>
            </View>
            <View style={styles.paynowPopupRow}>
              <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                <Text>Current Table No<Text style={[styles.font12, styles.textPri]}>*</Text> </Text>
                <TextInput editable={false} selectTextOnFocus={false} style={styles.signInput} placeholder='Table No'>
                  {selectedTableNo}
                </TextInput>

              </View>
              <View style={[styles.popupInputBlk, styles.wdth33, styles.pr15]}>
                <Text style={[styles.signLabel, styles.menuText]}> Select Merge Table No<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                <View>
                  <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
                  <ModalSelector
                    data={tableNoListArray}
                    childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                    selectStyle={styles.selectText}
                    optionContainerStyle={styles.selectCont}
                    optionTextStyle={styles.textStyle}
                    initValueTextStyle={styles.textStyle}
                    overlayStyle={styles.overlayText}
                    cancelStyle={styles.selectCont}
                    cancelContainerStyle={styles.cancelCont}
                    cancelText={"Cancel"}
                    initValue="Select Table No "
                    selectedKey={tableKey}
                    onChange={(option) => {
                      if (option.key) {
                        setNewTableNo(option.label)
                        setTableKey(option.key)
                        setNewTableId(option.value)
                      }
                    }}
                  />
                </View>
              </View>
              <View style={[styles.popupBtnCon, styles.wdth100]}>
                <TouchableOpacity onPress={mergeTableApi}>
                 <CustomButton style={styles.addCaaatBtn} onPress={mergeTableApi} label={"Submit"} /> 
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }

  //Shift Table Popup
  const shiftTablePop = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>
          <View>
            <View style={styles.popupHeadWrap}>
              <Text style={styles.textStyle3}>
                Shift Table
              </Text>
              <Pressable style={styles.closeView} onPress={() => toggleShiftTable()}>
                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                <Text style={styles.closeText}>
                  Close
                </Text>
              </Pressable>
            </View>
            <View style={styles.paynowPopupRow}>
              <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                <Text>Current Table Number </Text>
                <TextInput editable={false} selectTextOnFocus={false} style={styles.signInput} placeholder='Table No'>
                  {selectedTableNo}
                </TextInput>
              </View>

              <View style={[styles.popupInputBlk, styles.wdth33, styles.pr15]}>
                <Text style={[styles.signLabel, styles.menuText]}> Select Shift Table No<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                <View>
                  <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
                  <ModalSelector
                    data={tableNoListArray}
                    childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                    selectStyle={styles.selectText}
                    optionContainerStyle={styles.selectCont}
                    optionTextStyle={styles.textStyle}
                    initValueTextStyle={styles.textStyle}
                    overlayStyle={styles.overlayText}
                    cancelStyle={styles.selectCont}
                    cancelContainerStyle={styles.cancelCont}
                    cancelText={"Cancel"}
                    initValue="Select Table No "
                    selectedKey={tableKey}
                    onChange={(option) => {
                      if (option.key) {
                        setTableKey(option.key)
                        setNewTableId(option.value)
                        setNewTableNo(option.label)
                        setTableNoError('')
                      }
                    }}
                  />
                </View>

                {tableNoError.length > 0 && (
                  <Text
                    style={[
                      styles.signLabel,
                      { color: Colors.dangerRed },
                    ]}>
                    Select table no is required
                  </Text>
                )}
              </View>
              <View style={[styles.popupBtnCon, styles.wdth100]}>
                <TouchableOpacity onPress={() => shiftTableApi()}>
                 <CustomButton style={styles.addCaaatBtn} onPress={() => shiftTableApi()} label={"Submit"} /> 
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }

  //----------------------------- Void Password -------------------------------------------------
  //get User By ID
  useEffect(() => {
    getVoidPassword();
  });
  const getVoidPassword = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let userId = loginData.userId
    let token = loginData.token;
    const getUserById = await api.GetVoidPassword(token, userId)
    setUserVoidPassword(getUserById?.data?.voidPassword)
  }
  const voidPasswordValidator = (voidPassword: string) => {
    if (!voidPassword) return "Void Password is required."
    return ''
  }

  const invalidVoidPasswordValidator = (voidPassword: string) => {
    if (!voidPassword) return "Invalid Void Password"
    return ''
  }
  //Calling Void Order API
  const callVoidItem = async () => {
    const voidOrderErrorMsg = voidPasswordValidator(voidPassword.value)
    const invalidVoidPasswordErrorMsg = invalidVoidPasswordValidator(voidPassword.value)

    if (voidPassword.value != userVoidPassword) {
      setVoidPassword({ ...voidPassword, error: invalidVoidPasswordErrorMsg })
    }

    else {
      let updateCountArray;
      let filteredArray;

      updateCountArray = selectedItems.map(item => item.id === voidItemFromList.id ? {
        ...item,
        orderQuantity: item.orderQuantity - orderQty,
        subTotal: item.itemAmount * item.orderQuantity
      } : item)

      filteredArray = updateCountArray.filter((obj) => obj.orderQuantity !== 0)

      setSelectedItems(filteredArray);
      getTotal(filteredArray)
      toggleModalVoidPassword()
    }

  }

  //Voidpassword Popup call
  const toggleModalVoidPassword = () => {
    setVoidItem(!voidItem)
  };
  //open Voidpassword popup 
  const voidPaswordPopup = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>
          <View >
            <View>
              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Remove Item
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleModalVoidPassword()}>
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>
              <View style={[styles.wdth100, styles.paddRL15]}>
                <TextInputComp
                  style={styles.signInput}
                  secureTextEntry={true}
                  onChangeText={(text: any) => setVoidPassword({ value: text, error: '' })}
                  errorText={voidPassword.error}
                  description={undefined}
                />
              </View>
              <View style={styles.popupBtnCon}>
                <TouchableOpacity onPress={() => callVoidItem()} >
                 <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={() => callVoidItem()} /> 
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
  //----------------------------------------------------  Void Password Ends -----------------------------------------------------------------

  // --------------------------------------------------- Dine In Discount Starts --------------------------------------------------
  //Get DineIn Discount List 

  const getDineInDiscountList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const result = await api.getAllMasterData(token, endPoint.GET_DISCOUNT + outletId);
    const dineDisc = result.data.filter(item => item.discountDineIn && item.discountStatus)
    setDineInDiscountData(dineDisc)
  }

  const showdiscountype = (discntId) => {
    setCheckeddiscntId(discntId)
    setgetpromofilterdata([])
    const result = dineInDiscountdata.filter(data => data.discountId == discntId)
    setdiscountdataparticular(result)
    if (discountdataparticular) {
    }
  }

  let DiscountFromArray = dineInDiscountdata.map((s, i) => {
    return (
      <View style={[styles.flexAlignRow, styles.marBtm10]}>
        <TouchableOpacity style={styles.flexAlignRow} onPress={() => {
          [setIsPromocode(false), submitdiscount(s), setCheckeddiscnt(!checkeddiscnt), showdiscountype(s.discountId)]
        }}>
          <View style={[styles.radioButton, checkeddiscntId === s.discountId && !isPromocode && styles.radioBtnChecked]}>
            {
              (checkeddiscntId === s.discountId) && !isPromocode ? <View style={styles.radioBtnView}></View> : null
            }
          </View>
          <Text style={[styles.promoValue]}>Discount Name :{s.discountName}</Text>
        </TouchableOpacity>
      </View>
    )
  })
  // ---------------------------------- Promocode---------------------------
  const getPromocodes = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const result1 = await api.getAllMasterData(token, endPoint.GET_PROMOCODE + outletId);
    setPromocode(result1.data);
  }
  const showpromotype = (promocodeids) => {
    setCheckedpromoId(promocodeids)
    setdiscountdataparticular([])
    const result = promocode.filter(data => data.promocodeId == promocodeids)
    setgetpromofilterdata(result)
  }
  let PromocodeFromArray = promocode.map((s, i) => {
    return (
      <View style={[styles.flexAlignRow, styles.marBtm10]}>
        <TouchableOpacity style={styles.flexAlignRow} onPress={() => {
          [setIsPromocode(true), submitPromocode(s), setCheckedpromo(!checkedpromo), showpromotype(s.promocodeId)]
        }}>
          <View style={[styles.radioButton, checkedpromoId === s.promocodeId && isPromocode && styles.radioBtnChecked]}>
            {
              (checkedpromoId === s.promocodeId) && isPromocode ? <View style={styles.radioBtnView}></View> : null
            }
          </View>
          <Text style={[styles.promoValue]}>Promo Name :{s.promocodeName} - Promo Code : {s.promocode}</Text>
        </TouchableOpacity>
      </View>
    )
  })

  //Discount Popup Call
  const toggleModalDineDisc = () => {
    setOpenDIneInDiscount(!openDineInDiscount)
  };

  const popupAddDineInDiscount = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>
          <View style={styles.popupHeadWrap}>
            <Text style={styles.textStyle3}>
              Add Discount for<Text style={styles.addmoifieritem}> {discountdataparticular[0]?.discountName}</Text>
            </Text>
            <Pressable style={styles.closeView} onPress={() => toggleModalDineDisc()}>
              <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
              <Text style={styles.closeText}>
                Close
              </Text>
            </Pressable>
          </View>
          <View style={styles.disPromoBlk}>
            <View style={[styles.paddR8, styles.discountBlk]}>
              <View style={styles.discountSeg}>
                <Text style={[styles.tableCell, styles.marBtm10]}>Choose Discount</Text>
                <ScrollView style={styles.disHei}>
                  {
                    (DiscountFromArray)
                  }
                </ScrollView>
              </View>
              <View style={[styles.discountSeg, styles.disseg]}>
                <Text style={[styles.tableCell, styles.marBtm10]}>Selected Discount</Text>
                {
                  (
                    <View>
                      <View style={styles.discountvalueBlk}>
                        <Text style={styles.tableHeader}>Discount Type : </Text><Text style={[styles.promoValue]}>{discountdataparticular[0]?.discountType}</Text>
                      </View>
                      <View style={styles.discountvalueBlk}>
                        <Text style={styles.tableHeader}>Discount Value : </Text><Text style={[styles.promoValue]}>{discountdataparticular[0]?.discountValue}</Text>
                      </View>
                      <View style={styles.discountvalueBlk}>
                        <Text style={styles.tableHeader}>Discount Notes : </Text><Text style={[styles.promoValue]}>{discountdataparticular[0]?.discoutNotes}</Text>
                      </View>
                    </View>
                  )
                }
              </View>
            </View>

            <View style={[styles.paddL8, styles.discountBlk]}>
              <View style={[styles.discountSeg]}>
                <Text style={[styles.tableCell, styles.marBtm10]}>Add Promo Code</Text>
                <ScrollView style={styles.disHei}>

                  {
                    (PromocodeFromArray)
                  }
                </ScrollView>
              </View>
              <View style={[styles.discountSeg, styles.disseg]}>
                <Text style={[styles.tableCell, styles.marBtm10]}>Selected Promo Code</Text>
                {
                  (
                    <View>
                      <View style={styles.discountvalueBlk}>
                        <Text style={styles.tableHeader}>Promo Type : </Text><Text style={[styles.promoValue]}>{getpromofilterdata[0]?.promocodeType}</Text>
                      </View>
                      <View style={styles.discountvalueBlk}>
                        <Text style={styles.tableHeader}>Promo Value : </Text><Text style={[styles.promoValue]}>{getpromofilterdata[0]?.promocodeValue}</Text>
                      </View>
                      <View style={styles.discountvalueBlk}>
                        <Text style={styles.tableHeader}>Promo Notes : </Text><Text style={[styles.promoValue]}>{getpromofilterdata[0]?.discountNotes}</Text>
                      </View>
                    </View>
                  )
                }
              </View>
              <View style={[styles.wdth100, styles.martop15]}>
                <TouchableOpacity onPress={() => [getTotal(selectedItems), setOpenDIneInDiscount(!openDineInDiscount)]}>
                  <View>
                    <CustomButton styles={styles.addCaaatBtn} onPress={() => [getTotal(selectedItems), setOpenDIneInDiscount(!openDineInDiscount)]} label={"Continue"} /> 
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  //Selected Discount Calculation 
  const submitdiscount = (data) => {

    setDiscPromoVal(data?.discountValue);
    setDiscPromoType(data?.discountType);
    setDiscpromoName(data?.discountName);
    setIsDiscPromoSelected("true");
    if (data?.discountType === "Percentage") {
      let discPerCal = (parseInt(subTotal) * (parseInt(data?.discountValue) / 100));
      setDiscPromoAmt(discPerCal.toFixed(2))
      setRefreshDiscount(true)
    }
    else if (data?.discountType === "Amount") {
      setDiscPromoAmt(data?.discountValue)
      setRefreshDiscount(true)
    }
  }

  //Selected Promocode Calculation 

  const submitPromocode = (data) => {

    setDiscPromoVal(data?.promocodeValue);
    setDiscPromoType(data?.promocodeType);
    setDiscpromoName(data?.promocodeName);
    setIsDiscPromoSelected("true");
    if (data?.promocodeType === "Percentage") {
      let promoPerCal = (parseInt(subTotal) * (parseInt(data?.promocodeValue) / 100));
      setDiscPromoAmt(promoPerCal.toFixed(2))
      setRefreshDiscount(true)
    }
    else if (data?.promocodeType === "Amount") {
      setDiscPromoAmt(data?.promocodeValue)
      setRefreshDiscount(true)
    }
  }


  // ------------------------------ DIne In Discount Ends ------------------------------------------------------------------------

  // ------------------------------- Order Subtotal Calculation Starts ----------------------------------------------------------
  useEffect(() => {
    setTimeout(() => getTotal(selectedItems), 2000)
    setTimeout(() => htmltable(), 2000)
  }, [selectedItems])

  const getTotal = async (data: any[] | never[]) => {
    let sub_total = 0;
    let discount_total = 0
    let discount = discPromoAmtcal;

    setSubTotal(0)
    setGrandTotal(0)
    await data.forEach(async (element: { itemAmount: string; orderQuantity: string; }) => {
      sub_total += JSON.parse(element.itemAmount) * JSON.parse(element.orderQuantity)
      if (element.modifiers != []) {
        await element.modifiers.forEach((newData) => {
          sub_total += JSON.parse(newData.price)
        })
      }

      //isItemIncludedTax and isSubtractFromSubTotal false condition

      if (isItemIncludeTax != true && isSubtractFromSubTotal != true && discPromoAmtcal === 0) {
        //Apply Tax on subtotal and Calcualte to grand total and show the vat value
        let vatValue = getVatValue(sub_total);
        setVatValue(vatValue.toFixed(2));
        let subValue = parseFloat(sub_total) + parseFloat(discount);
        setSubTotal(subValue.toFixed(2))
        let total = parseFloat(subValue) + parseFloat(vatValue)
        setGrandTotal(total.toFixed(2));
      }
      else if (isItemIncludeTax === true && isSubtractFromSubTotal === false) {
        //Sub total and grand total remains same if discount added subtract discount from subtotal
        let discAmt;
        let tempSubtotal;
        setSubTotal(parseFloat(sub_total.toFixed(2)))
        tempSubtotal = sub_total;
        if (discPromoType === "Percentage") {
          discAmt = (parseFloat(sub_total) * parseFloat(discPromoValue)) / 100;
          tempSubtotal = (parseFloat(sub_total) - parseFloat(discAmt)) + parseFloat(vatValue);
        }
        else {
          discAmt = parseFloat(discPromoValue);
          tempSubtotal = (parseFloat(sub_total) - parseFloat(discAmt)) + parseFloat(vatValue);
        }
        setDiscPromoAmt(parseFloat(discAmt.toFixed(2)))
        // let grandTotal = parseFloat(sub_total) - parseFloat(discAmt)
        let grandTotal = parseFloat(sub_total);
        setGrandTotal(parseFloat(tempSubtotal.toFixed(2))) //for case -1, as per the document
      }
      else if (isItemIncludeTax === false && isSubtractFromSubTotal === true) {
        let vatValue = getVatValue(sub_total);
        setVatValue(vatValue.toFixed(2));
        let subValue = parseFloat(sub_total) + parseFloat(discount)

        //setSubTotal(subValue)
        let total = parseFloat(subValue) + parseFloat(vatValue);
        setGrandTotal(total.toFixed(2));
      }
      else if (isItemIncludeTax === true && isSubtractFromSubTotal === true) {
        let vatValue = getVatValue(sub_total);
        setVatValue(vatValue.toFixed(2));
        let updatedsubtotal = parseFloat(sub_total) - parseFloat(vatValue)
        setSubTotal(parseFloat(updatedsubtotal.toFixed(2))) // case -2, as per the document
        let discAmt;
        let tempSubtotal;
        let tempGrandTotal;
        tempSubtotal = sub_total; //working-1
        //tempSubtotal = updatedsubtotal; //testing-1
        if (discPromoType === "Percentage") {
          discAmt = (parseFloat(tempSubtotal) * parseFloat(discPromoValue)) / 100;
          tempSubtotal = (parseFloat(tempSubtotal) - parseFloat(discAmt))
          let tempVatValue = getVatValue(tempSubtotal);
          setVatValue(tempVatValue.toFixed(2));
          tempSubtotal = tempSubtotal - parseFloat(tempVatValue);
          if (isDiscPromoSelected === "false") {
            //if discount is not selected, assigning the grand total as subtotal + vat
            tempGrandTotal = tempSubtotal + vatValue; //working-1
          } else if (isDiscPromoSelected === "true") {
            //if discount is selected, assigning the grand total as discountsubtotal + vat
            discAmt = (parseFloat(updatedsubtotal) * parseFloat(discPromoValue)) / 100;
            tempSubtotal = (parseFloat(updatedsubtotal) - parseFloat(discAmt))
            tempVatValue = getVatValue(tempSubtotal);
            tempGrandTotal = tempSubtotal + tempVatValue; //working-1
            tempVatValue = tempVatValue.toFixed(2);
            setVatValue((tempVatValue.toFixed(2)));
          }
        }
        else if (discPromoType === "Amount") {
          discAmt = parseFloat(discPromoValue);
          tempSubtotal = (parseFloat(tempSubtotal) - parseFloat(discAmt));
          let tempVatValue = getVatValue(tempSubtotal);
          setVatValue(tempVatValue.toFixed(2));
          tempSubtotal = tempSubtotal - parseFloat(tempVatValue);
          if (isDiscPromoSelected === "false") {
            //if discount is not selected, assigning the grand total as subtotal + vat
            tempGrandTotal = tempSubtotal + vatValue; //working-1
          } else if (isDiscPromoSelected === "true") {
            //if discount is selected, assigning the grand total as discountsubtotal + vat
            tempSubtotal = (parseFloat(updatedsubtotal) - parseFloat(discAmt))
            tempVatValue = getVatValue(tempSubtotal);
            tempGrandTotal = tempSubtotal + tempVatValue; //working-1
            tempVatValue = tempVatValue.toFixed(2);
            setVatValue((tempVatValue.toFixed(2)));
          }
        }
        setDiscPromoAmt(parseFloat(discAmt.toFixed(2)))
        setGrandTotal(tempGrandTotal.toFixed(2));
      }
      else {
        //empty
      }
    });
    //--------------------- ItemWise Calculation Starts By KVenkatesh on 15-09-2023 -------------------------------

    const itemTaxValue = [];
    const itemTaxsetup = [];
    const uniqueItemIds = new Set();

    // Filter taxData based on the taxId from data items and populate itemTaxValue
    data.forEach((selItemData) => {
      //Checking Whether the taxid is coming as null and if not pushing into itemTaxValue Object Starts
      if (selItemData.taxId !== null && selItemData.taxId !== undefined && selItemData.taxId !== "") {
        const matchingTaxData = taxData.find((item) => item.taxId === selItemData.taxId);
        if (matchingTaxData) {
          itemTaxValue.push(matchingTaxData);
        } else {
          // If no matching tax data is found, you can provide default values or handle it as needed
          itemTaxValue.push({ taxName: "", taxPercent: 0 });
        }
      }
      //Checking Whether the taxid is coming as null and if not pushing into itemTaxValue Object Ends
    });

    data.forEach((selItemData) => {
      //Checking Whether the taxid is coming as null and if not pushing into itemTaxValue Object Starts
      if (selItemData.taxId !== null && selItemData.taxId !== undefined && selItemData.taxId !== "") {
        const matchingTaxData = taxSetupData.find((item) => item.taxId === selItemData.taxId);
        if (matchingTaxData) {
          itemTaxsetup.push(matchingTaxData);
        } else {
          // If no matching tax data is found, you can provide default values or handle it as needed
          itemTaxsetup.push({ isItemIncludeTax: "" });
        }
      }
      //Checking Whether the taxid is coming as null and if not pushing into itemTaxValue Object Ends
    });

    //Checking Whether the selected item is having Taxid and if it have storing into selecetedItemData and if not handling the taxid value Starts
    const selecetedItemData = data.filter((selItemData) =>
      itemsmasterdata.some((item) => selItemData.itemId === item.id) &&
      (selItemData.taxId !== null && selItemData.taxId !== undefined && selItemData.taxId !== "")
    );
    //Checking Whether the selected item is having Taxid and if it have storing into selecetedItemData and if not handling the taxid value Ends

    // Now, iterate through selecetedItemData to create and append tax information to itemLevelTax - C
    selecetedItemData.forEach((itemData, index) => {
      let itemsubtotal;
      let itemleveltaxperval;
      let isitempriceincludeed
      // Check if an item with the same itemId already exists in itemLevelTax
      const existingItemIndex = itemLevelTax.findIndex((item) => item.itemId === itemData.itemId);
      if (existingItemIndex !== -1) {
        // If the item already exists, update its properties
        itemsubtotal = parseFloat(itemData.orderQuantity) * parseFloat(itemData.itemAmount);
        itemleveltaxperval = (itemsubtotal) * (itemTaxValue[index]?.taxPercent?.[0]?.taxPercent / 100);

        const updatedItem = {
          isItemIncludeTax: itemTaxsetup[index]?.isItemIncludeTax,
          taxName: itemTaxValue[index]?.taxName,
          taxPercent: itemTaxValue[index]?.taxPercent?.[0]?.taxPercent,
          itemName: itemData.itemName,
          itemTaxValue: 0,
          taxId: itemData.taxId,
          taxAmount: (itemleveltaxperval).toFixed(2),
          itemId: itemData.itemId,
          itemAmount: itemData.itemAmount,
          orderQuantity: parseFloat(itemLevelTax[existingItemIndex].orderQuantity) + parseFloat(itemData.orderQuantity), // Update the order quantity
        };

        // Update the existing item in itemLevelTax
        itemLevelTax[existingItemIndex] = updatedItem;
        // Initialize itemVatAddGrandTotal to 0
        let itemVatAddGrandTotal = 0;
        // Iterate through itemLevelTax and sum up taxAmount properties
        itemLevelTax.forEach((item) => {
          if (item.isItemIncludeTax != true) {
            itemVatAddGrandTotal += parseFloat(item.taxAmount);
          }
        });

        if (isItemIncludeTax != true) {
          if (discPromoType === "Percentage") {
            let updateDiscAmt = (parseFloat(sub_total) * parseFloat(discPromoValue)) / 100;
            setDiscPromoAmt(updateDiscAmt.toFixed(2));
            let updateSubtotal = parseFloat(sub_total) - parseFloat(updateDiscAmt);

            let updateVatValue = (parseFloat(updateSubtotal) * parseFloat(taxPerc)) / 100;
            setVatValue(parseFloat(updateVatValue.toFixed(2)));
            const orderGrandTotal = parseFloat(sub_total) - parseFloat(updateDiscAmt) + parseFloat(updateVatValue) + parseFloat(itemVatAddGrandTotal)
            setGrandTotal(parseFloat(sub_total.toFixed(2))); //Case -1 as per the document for Item - Item price includes tax
          }
          else {
            let updateDiscAmt = parseFloat(discPromoValue);
            setDiscPromoAmt(updateDiscAmt.toFixed(2));

            let updateSubtotal = parseFloat(sub_total) - parseFloat(discPromoAmtcal);

            let updateVatValue = (parseFloat(updateSubtotal) * parseFloat(taxPerc)) / 100;
            setVatValue(parseFloat(updateVatValue.toFixed(2)));

            const orderGrandTotal = parseFloat(sub_total) - parseFloat(updateDiscAmt) + parseFloat(updateVatValue) + parseFloat(itemVatAddGrandTotal)
            setGrandTotal(parseFloat(orderGrandTotal.toFixed(2)));
          }
          //below code for the case -3 & case -4
          if ((isItemIncludeTax === false && isSubtractFromSubTotal === true) ||
            (isItemIncludeTax === false && isSubtractFromSubTotal === false)) {
            let subValue = parseFloat(sub_total)
            setSubTotal(subValue.toFixed(2))
            let vatValue = getVatValue(subValue);
            setVatValue(vatValue.toFixed(2));
            let total = parseFloat(subValue) + parseFloat(vatValue) + parseFloat(itemVatAddGrandTotal);
            setGrandTotal(total.toFixed(2));

            if (isDiscPromoSelected === "false") {
              //nothing
            } else if (isDiscPromoSelected === "true") {
              if (discPromoType === "Percentage") {
                discount_total = (parseFloat(sub_total) * parseFloat(discPromoValue)) / 100;
                let tempSubtotal = parseFloat(sub_total) - parseFloat(discount_total);
                let tempVatValue = getVatValue(tempSubtotal);
                setVatValue(tempVatValue.toFixed(2));
                setGrandTotal((tempSubtotal + tempVatValue + parseFloat(itemVatAddGrandTotal)).toFixed(2));
              } else if (discPromoType === "Amount") {
                discount_total = (parseFloat(discPromoValue));
                let tempSubtotal = parseFloat(sub_total) - parseFloat(discount_total);
                let tempVatValue = getVatValue(tempSubtotal);
                setVatValue(tempVatValue.toFixed(2));
                setGrandTotal((tempSubtotal + tempVatValue + parseFloat(itemVatAddGrandTotal)).toFixed(2));
              }
            }

          }
        }
      } else {
        // If the item is not found, create a new entry in itemLevelTax
        itemsubtotal = parseFloat(itemData.orderQuantity) * parseFloat(itemData.itemAmount);
        itemleveltaxperval = (itemsubtotal) * (itemTaxValue[index]?.taxPercent?.[0]?.taxPercent / 100);

        const selectedItemTaxList = {
          isItemIncludeTax: itemTaxsetup[index]?.isItemIncludeTax,
          taxName: itemTaxValue[index]?.taxName,
          taxPercent: itemTaxValue[index]?.taxPercent?.[0]?.taxPercent,
          itemName: itemData.itemName,
          itemTaxValue: 0,
          taxId: itemData.taxId,
          taxAmount: (itemleveltaxperval).toFixed(2),
          itemId: itemData.itemId,
          itemAmount: itemData.itemAmount,
          orderQuantity: itemData.orderQuantity,
          itemSubTotal: itemsubtotal // Use the new order quantity
        };
        itemLevelTax.push(selectedItemTaxList);
        // Initialize itemVatAddGrandTotal to 0
        let itemVatAddGrandTotal = 0;

        // Iterate through itemLevelTax and sum up taxAmount properties
        itemLevelTax.forEach((item) => {
          if (item.isItemIncludeTax != true) {
            itemVatAddGrandTotal += parseFloat(item.taxAmount);
          }
        });
        if (isItemIncludeTax != true) {
          if (discPromoType != "Percentage") {
            let updateDiscAmt = parseFloat(discPromoValue);
            setDiscPromoAmt(updateDiscAmt.toFixed(2));
            let updateSubtotal = parseFloat(sub_total) - parseFloat(discPromoAmtcal);
            let updateVatValue = (parseFloat(updateSubtotal) * parseFloat(taxPerc)) / 100;
            setVatValue(parseFloat(updateVatValue.toFixed(2)));
            const orderGrandTotal = parseFloat(sub_total) - parseFloat(updateDiscAmt) + parseFloat(updateVatValue) + parseFloat(itemVatAddGrandTotal)
            setGrandTotal(parseFloat(orderGrandTotal.toFixed(2)));
          }
          else {
            let updateDiscAmt = (parseFloat(sub_total) * parseFloat(discPromoValue)) / 100;
            setDiscPromoAmt(updateDiscAmt.toFixed(2));

            let updateSubtotal = parseFloat(sub_total) - parseFloat(updateDiscAmt);

            let updateVatValue = (parseFloat(updateSubtotal) * parseFloat(taxPerc)) / 100;
            setVatValue(parseFloat(updateVatValue.toFixed(2)));
            const orderGrandTotal = parseFloat(sub_total) - parseFloat(updateDiscAmt) + parseFloat(updateVatValue) + parseFloat(itemVatAddGrandTotal)
            setGrandTotal(parseFloat(orderGrandTotal.toFixed(2)));
          }

        }

      }
    });

    //--------------------- ItemWise Calculation Ends By KVenkatesh on 15-09-2023 -------------------------------
  }


  // ----------------------------------- Order Subtotal Calculation Ends -------------------------------------------------------

  return (
    <>
      {/* Header Starts */}

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
                  <View style={[styles.dashboardHeader, styles.headerRightBorder, styles.dashMenuActive]}>
                    <DineInIcon />
                    <Text style={[styles.font13, styles.priText, styles.fontBold, styles.padtop5]}>Dine In</Text>
                  </View> : dineInPermission[0]?.isFormAccess === true ?
                    <View style={[styles.dashboardHeader, styles.headerRightBorder, styles.dashMenuActive]}>
                      <DineInIcon />
                      <Text style={[styles.font13, styles.priText, styles.fontBold, styles.padtop5]}>Dine In</Text>
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
      {/* Header Ends */}
      <View>
        {isLoading ?
          <View style={{ flex: 1 }}>
            <View style={[styless.flexrow, styless.alignCenter, styless.justifyCenter, styless.loaderImg]}>
              <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
            </View>
          </View> :
          <KeyboardAwareScrollView enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')} style={styles.dineScrollView}>
            <View style={styles.dineViewBlk}>

              {/* View Table Flat List Starts*/}
              <View style={styles.dineLeftBlk}>
                <View style={[styles.dineViewBlk, styles.floorSecViewBlk]}>
                  <View style={styles.floorBlk}>
                    <View style={styles.floorSecBlk}>
                      <Text style={styles.floorText}>Floor</Text>
                      <View>
                        <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg1} />
                        <ModalSelector
                          data={tablenewarray}
                          childrenContainerStyle={[styles.selectSection]}
                          selectStyle={styles.selectText1}
                          initValueTextStyle={styles.textStyle4}
                          optionContainerStyle={styles.selectCont}
                          optionTextStyle={styles.textStyle}
                          selectTextStyle={styles.textStyle4}
                          overlayStyle={styles.overlayText}
                          cancelStyle={styles.selectCont}
                          cancelContainerStyle={styles.cancelCont}
                          cancelText={"Cancel"}
                          initValue="Table Type"
                          selectedKey={selectedValue}
                          onChange={(option) => {
                            if (option.key) {
                              if (option.key == 1) {
                                getTableList()
                              } else {
                                updateTableList(option)
                              }
                            }
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View>
                  {
                    isrefreshingresultTablelist ? <View style={[styless.flexrow, styless.alignCenter, styless.justifyCenter]}>
                      <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
                    </View> : <FlatList
                      nestedScrollEnabled
                      data={tableListData.sort(function (a, b) {
                        return (a.tableNo < b.tableNo) ? -1 : (a.tableNo > b.tableNo) ? 1 : 0;

                      })}
                      extraData={tableListData}
                      keyExtractor={(item, _index) => item.tableId}
                      renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => getOrderData(item)}>
                          <View style={[styles.dineCompletedBlk, selectedTableId === item.tableId && styles.hilightTable1, selectedTableId === item.tableId && item.tableStatus == 'Empty' && styles.hilightTable]}>
                            <View style={[styles.completeOverlayRed, item.tableStatus == 'Empty' && styles.complteOverlay, selectedTableId === item.tableId && styles.removeOvelay, selectedTableId === item.tableId && item.tableStatus == 'Empty' && styles.removeOvelay]}></View>
                            <View style={[styles.comleftBlk]}>
                              <View style={[styles.textCntainWhite, item.tableStatus == 'Empty' && styles.textContain, selectedTableId === item.tableId && styles.textContain1]}>
                                <Text style={[styles.textRed, item.tableStatus == 'Empty' && styles.textOne]}>T{item.tableNo}</Text>
                              </View>
                              <View>

                                <Text style={[styles.tComplted, selectedTableId === item.tableId && styles.hilightText]}>{item.tableStatus == 'Empty' ? 'Available' : 'Occupied'}</Text>
                                <Text style={[styles.ordersSec, selectedTableId === item.tableId && styles.hilightText]}>{item.capacity} Capacity</Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      }
                    />
                  }
                </View>
              </View>
              {/* View Table Flat List Ends*/}

              {/* Select category Search Starts */}
              <View style={styles.dinMidBlk}>
                <View style={styles.padHor}>
                  <Searchbar
                    icon={() => <SearchIcon />}
                    inputStyle={styles.searchInput}
                    style={styles.searchContainer}
                    placeholderTextColor={'#484D54'}
                    placeholder="Search"
                    onChangeText={(queryText: any) => handlesearchchange(queryText)}
                    value={searchQuery}
                  />
                </View>

                <View style={styles.padHor}>
                  <View style={styles.changeCategoryBlk}>
                    <Text style={styles.floorText}>Choose Categories</Text>
                    <View>
                      <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
                      <ModalSelector
                        // data={categorynewarray.sort(function (a, b) {
                        //   return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0
                        // })}
                        data={categorynewarray}
                        childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                        selectStyle={styles.selectText}
                        optionContainerStyle={styles.selectCont}
                        optionTextStyle={styles.textStyle}
                        initValueTextStyle={styles.textStyle}
                        overlayStyle={styles.overlayText}
                        cancelStyle={styles.selectCont}
                        cancelText={"Cance"}
                        cancelContainerStyle={styles.cancelCont}
                        initValue="Select Category"
                        selectedKey={selectedValue2}
                        cancelButtonAccessible={true}
                        onChange={(option) => {
                          if (option.key) {
                            if (option.key === 1) {
                              getTableList()
                            } else {
                              updateItemList(option)
                            }
                          }
                        }}
                      />
                    </View>
                  </View>
                </View>

                {
                  isrefreshingresultitemslist ? <View style={[styless.flexrow, styless.alignCenter, styless.justifyCenter, styless.loaderImg]}>
                    <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
                  </View> : <SectionList
                    nestedScrollEnabled
                    sections={itemsData}
                    renderItem={({ item }) => {
                      return null;
                    }}
                    style={[styles.pb80]}
                    renderSectionHeader={({ section }) => (
                      <>
                        <Text style={[styles.milkText, styles.padHor]}>{section.name}</Text>
                        <FlatList
                          numColumns={3}
                          data={section.data}
                          keyExtractor={(item, _index) => item.id}
                          renderItem={({ item }) =>
                            <View style={styles.milkCol}>
                              <TouchableHighlight onPress={() => addSelectedItem(item)}>
                                <View style={styles.milkBlk}>
                                  <View style={styles.squareCap}>
                                    <View style={styles.squareCapCircle} />
                                  </View>
                                  <Image style={styles.milImage} source={{ uri: `${item.imagePath}` }} />
                                  <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.coffeeText]}>{item.itemName}</Text>
                                </View>

                              </TouchableHighlight>
                            </View>
                          }
                        />
                      </>
                    )}
                  />
                }
              </View>
              {/* Select category Search Ends */}

              {/* Order Items List View Starts */}
              <View style={styles.dineRgtBlk}>
                <View style={{ height: Platform.OS === 'ios' ? Dimensions.get('window').height - 500 : Dimensions.get('window').height - 400, }}>
                  <View style={styles.overallItems}>
                    <Text style={styles.overallText}>Overall Items :{selectedItems.length} </Text>
                    <View style={styles.shiftManageTable}>

                      {!isNewOrder &&
                        <>
                          <TouchableOpacity style={styles.shitTableLink} onPress={() => setOpenShiftTable(!openShiftTable)} ><Text style={styles.shitTableText}>Shift Table</Text></TouchableOpacity>
                          <TouchableOpacity style={styles.shitTableLink} onPress={() => setOpenMergeTable(!openMergeTable)} ><Text style={styles.shitTableText}>Merge Table</Text></TouchableOpacity>

                        </>
                      }
                    </View>
                  </View>
                  {oldTableNo != selectedItems[0]?.tableNo &&
                    isrefreshingresultselecteditemslist ? <View style={[styless.flexrow, styless.alignCenter, styless.justifyCenter, styless.loaderImg]}>
                    <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
                  </View> : <FlatList
                    nestedScrollEnabled
                    data={selectedItems}
                    keyExtractor={(item, _index) => item.id}
                    renderItem={({ item, index }) =>
                      <View style={styles.wdth100}>

                        <View style={[styles.tableTr, styles.flexWrap]}>
                          <View style={styles.leftTable}>
                            <Text style={[styles.overallText, styles.tableTitleText]}>{item.itemName}</Text>
                            <Text style={[styles.ordersSec, styles.tableValueText]}>{item.itemAmount}</Text>
                          </View>
                          <View style={[styles.flexrow, styles.alignCenter, styles.justifyEnd, styles.rgtTable]}>
                            <View style={[styles.flexrow, styles.alignCenter, styles.justifyEnd]}>
                              <TouchableOpacity style={styles.marRgt15} onPress={() => openModifierSelector(item, index)}><Text style={[styles.searchInput]}>Add Modifier</Text></TouchableOpacity>
                              <TouchableOpacity style={styles.nodeMargin} onPress={() => {
                                setOpenNotes(!openNotes)
                                setNotesIndex(index)
                              }} >
                                <Text style={[styles.searchInput, styles.textUnderline]}>Note</Text>
                              </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => { setQuantity(item, -1) }} >
                              <View style={styles.minusView}>
                                <Text style={styles.minusTable}>-</Text>
                              </View>
                            </TouchableOpacity>
                            <View style={styles.minsPlusView}><Text style={styles.minsPlusText}>{item.orderQuantity}</Text></View>
                            <TouchableOpacity onPress={() => { setQuantity(item, 1) }} >
                              <View style={styles.minusView}>
                                <Text style={styles.minusTable}>+</Text>
                              </View>
                            </TouchableOpacity>
                            <View style={styles.marLeft10}>
                              <Pressable style={styles.closeView} onPress={() => [toggleModalVoidPassword(), setVoidItemFromList(item), setOrderQty(item.orderQuantity)]}>
                                <Image source={(require("../../assets/images/trash_icon.png"))} style={styles.DeleteIcon} />
                              </Pressable>
                            </View>
                          </View>
                          {item.modifiers != [] &&
                            <View style={[styles.wdth100, styles.padtop15]}>
                              {
                                item.modifiers.map((item, i) => {
                                  return (
                                    <View style={[styles.wdth100]}>
                                      {item.modifierItemName && <Text style={[styles.overallText, styles.tableTitleText]}>{item.modifierItemName}</Text>}
                                      <Text style={styles.floorText}>{item.price}</Text>
                                    </View>
                                  )
                                })
                              }
                            </View>}
                        </View>
                      </View>
                    }
                  />
                  }
                </View>
                <View>
                  <View style={styles.updateViewBlk}>
                    <View style={styles.updateLeftBlk}>
                      {isNewOrder ?
                        <TextInput multiline style={styles.spicyText} placeholder={"Add extra instructions.."}
                          onChangeText={(text: string) => {
                            setFinalNotesOrder(text)
                          }} 
			value={finalNotesOrder}/> :
                        <TextInput multiline style={styles.spicyText} placeholder={"Add extra instructions.."}
                          onChangeText={(text: string) => {
                            setUpdateFinalNotes(text)
                          }} />
                      }
                    </View>
                    {
                      isNewOrder ?
                        <TouchableOpacity style={styles.updateBtn} onPress={() => PlaceOrder()}>
                          <Text style={styles.updateText} onPress={() => PlaceOrder()}>Place Order</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.updateBtn} onPress={() => UpdateOrder()} >
                          <Text style={styles.updateText} onPress={() => UpdateOrder()}>Update Order</Text>
                        </TouchableOpacity>
                    }
                  </View>

                  {!isNewOrder &&
                    <>
                      <ScrollView style={[{ paddingBottom: Platform.OS === 'ios' ? 0 : 80, height: Platform.OS === 'ios' ? 200 : 140, backgroundColor: '#F8F8F8', }]}>
                        <View style={[styles.totalDineBlk]}>
                          <View style={styles.totalDine80}>
                            <Text style={[styles.shitTableText, styles.totalDineTotal]}>Sub Total :</Text>
                          </View>
                          <View style={styles.totalDine20}>
                            <Text style={[styles.shitTableText, styles.totalDineTotal]}>{subTotal}</Text>
                          </View>

                          {refreshDiscount ?

                            <View style={[styles.flexrow]}>
                              <View style={styles.totalDine80}>
                                <Text style={[styles.shitTableText, styles.totalDineTotal]}>Discount :</Text>
                              </View>
                              <View style={styles.totalDine20}>
                                <Text style={[styles.shitTableText, styles.totalDineTotal]}>- {discPromoAmtcal}</Text>
                              </View>
                            </View>
                            :
                            <View style={[styles.flexrow]}>
                              <View style={styles.totalDine80}>
                                <Text style={[styles.shitTableText, styles.totalDineTotal]}>Discount :</Text>
                              </View>
                              <View style={styles.totalDine20}>
                                <Text style={[styles.shitTableText, styles.totalDineTotal]}>0</Text>
                              </View>
                            </View>

                          }

                          <View style={styles.totalDine80}>
                            <Text style={[styles.shitTableText, styles.totalDineTotal]}>VAT - {taxName}{taxPerc}% :</Text>
                          </View>
                          <View style={styles.totalDine20}>
                            <Text style={[styles.shitTableText, styles.totalDineTotal]}>{vatValue}</Text>
                          </View>
                          {itemLevelTax.length != 0 && itemLevelTax.map((item) =>
                          (
                            <View style={[styles.flexrow]}>
                              <View style={styles.totalDine80}>
                                <Text style={[styles.shitTableText, styles.totalDineTotal]}>{item.taxName} {item.taxPercent}% Added for {item.itemName} : </Text>
                              </View>
                              <View style={styles.totalDine20}>
                                <Text style={[styles.shitTableText, styles.totalDineTotal]}>{item.taxAmount}</Text>
                              </View>
                            </View>
                          ))}

                          <View style={[styles.totalDine80, styles.totalDineGreen]}>
                            <Text style={[styles.shitTableText, styles.totalDineGreenAmt]}>Total: </Text>
                          </View>
                          <View style={[styles.totalDine20, styles.totalDineGreen]}>
                            <Text style={[styles.shitTableText, styles.totalDineGreenAmt]}> {grandTotal}</Text>
                          </View>
                        </View>
                      </ScrollView>

                      <View style={[styles.payLaterNowBlk]}>
                        <TouchableOpacity style={styles.printerBlk} onPress={print}>
                          <Image style={styles.printerIcon} source={(require('../../assets/images/printer.png'))} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.printerBlk} onPress={() => toggleModalDineDisc()}>
                          <Image style={styles.printerIcon} source={(require('../../assets/images/percent.png'))} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.payLater]} onPress={() => navigation.navigate('Orders')}>
 <CustomButton label="Pay later" ></CustomButton> 
                          <Text style={[styles.paylater]}>Pay Later</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.PaynoeBlk, styles.marLeft10]} onPress={() => Paynowop()}>
                          <Text style={[styles.paylaterText, styles.payNowText]}>Pay now</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  }
                </View>
              </View>
              {/* Order Items List View Ends */}

              {openModifierModal &&
                <Modal onRequestClose={() => {
                  setOpenModifierModal(!openModifierModal);
                }} isVisible={openModifierModal}>
                  {popupModifier()}
                </Modal>
              }
              {openPaynow &&
                <Modal isVisible={openPaynow}>
                  {popupAddPaynow()}
                </Modal>
              }
              {openSuccessMsg &&
                <Modal isVisible={openSuccessMsg}>
                  {SuccessPopup()}
                </Modal>
              }
              {openUpdateSuccess &&
                <Modal isVisible={openUpdateSuccess}>
                  {UpdateSuccessPopup()}
                </Modal>
              }
              {openSuccessPaymentMsg &&
                <Modal isVisible={openSuccessPaymentMsg}>
                  {SuccessPaymentPopup()}
                </Modal>
              }
              {openDineInDiscount &&
                <Modal isVisible={openDineInDiscount}>
                  {popupAddDineInDiscount()}
                </Modal>

              }
              {openDiscount &&
                <Modal isVisible={openDiscount}>
                  {popupAddDiscount()}
                </Modal>
              }
              {
                openNotes &&
                <Modal isVisible={openNotes}>
                  {notesPop()}
                </Modal>
              }
              {
                openMergeTable &&
                <Modal isVisible={openMergeTable}>
                  {mergeTablePop()}
                </Modal>
              }

              {
                openShiftTable &&
                <Modal isVisible={openShiftTable}>
                  {shiftTablePop()}
                </Modal>

              }
              {voidItem &&
                <Modal isVisible={voidItem}>
                  {voidPaswordPopup()}
                </Modal>
              }
            </View>
          </KeyboardAwareScrollView>
        }
      </View>
    </>
  );

}
