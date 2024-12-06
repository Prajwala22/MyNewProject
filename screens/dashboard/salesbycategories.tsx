import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { PieChart } from "react-native-gifted-charts";
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import DatePicker from 'react-native-neat-date-picker';
import XLSX from 'xlsx';
import { default as styles, default as styless } from '../../assets/css/style';
import CalenderIcon from '../../assets/images/calendar.js';
import ExcelIcon from '../../assets/images/excel_icon.js';
import InternetDownIcon from '../../assets/images/internet_down.js';
import ModalDropDown from '../../assets/images/ModalDropDown.js';
import SalesByCategoriesTableView from '../../components/categorySalesTableView';
import Header from '../../components/sideMenuHeaderMaster';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import { StyleSheet } from 'react-native';


export default function salesbyCategories() {
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])
  const isFocused = useIsFocused();
  const [isDataPresent, setDataPreset] = useState(false);
  const [dineinSalesCount, setDineinSalesCount] = useState(0)
  const [takeawaySalesCount, setTakeAwaySalesCount] = useState(0)
  const [outlet, SetOutlet] = useState('')
  const [isrefreshingresult, setIsrefreshingresult] = useState(false)
  const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(true);
  const [isStartDateTimePickerVisible, setIsStartDateTimePickerVisible] = useState(false);
  const [isEndDateTimePickerVisible, setIsEndDateTimePickerVisible] = useState(false)
  const [selectedStartDate, setSelectedStartDate] = React.useState<any>();
  const [selectedEndDate, setSelectedEndDate] = React.useState<any>();
  const [dateError, setDateError] = useState(false);
  const [userRoleId, setuserRoleId] = useState('')
  const [outletId, setOutletId] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [outletName, setOutlet] = useState('');
  const [selectedOutletName, setSelectedOutletName] = useState('');
  const [selectedOutletFirstName, setSelectedOutletFirstName] = useState('');
  const [defauloutlet, setdefauloutlet] = useState('')

  
  const [outletData, setOutletData] = useState([]);
  const [outletKey, setOutletKey] = useState(0);
  const [outletField, setOutletField] = useState('')
  
  const numberOfItemsPerPageList = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getRestaurant();
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        const userInfo = JSON.parse(storedUserInfo);
        setdefauloutlet(userInfo.outletId);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
  
    fetchData();
  }, [isFocused]);
  

  
  useEffect(() => {
    setTimeout(() => getRestaurant(), 1000);
  }, [isFocused]);

  const getRestaurant = async () => {
    const userRoleId = await AsyncStorage.getItem('userRoleId')
    const restaurantName = await AsyncStorage.getItem('restaurantName')
    const outletName = await AsyncStorage.getItem('outletName')
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    // const outletid = await AsyncStorage.getItem('checkoutletId')
    // setOutletField(outletid)
    setRestaurant(restaurantName)
    setOutlet(outletName)
    setuserRoleId(userRoleId)

  }

   //Get Outlet by Restaurant
   useEffect(() => {

    getOutletList();
    return () => { 
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
  let outletDataArray = (outletData && outletData.length > 0) ? outletData.map((s, i) => {
    let newData = {
      key: i + 1,
      label: s.outletName,
      value: s.outletId
    };
    return newData;
}) : [];  // If no data exists, return an empty array



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
  

  

 
  //get sales by category list Api
  useEffect(() => {
    getSalesbyCategoryList();
    return () => {
      setData([])
    }
  }, [isFocused]);

  const getSalesbyCategoryList = async () => {
    setIsrefreshingresult(true)
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    const outletName = await AsyncStorage.getItem('outletName')
    SetOutlet(outletName)
    let myJson = {
      outletId: outletField ? outletField : loginData.outletId,
      toDate: selectedEndDate,
      fromDate: selectedStartDate
    }
    const result = await api.CreateMasterData(endPoint.GET_SALES_BY_CATEGORIES, token, myJson)

    if (result.data.length === 0) {
      setDataPreset(false);
      setIsrefreshingresult(false)

    } else {
      setData(result.data);
      setDataPreset(true);
      setIsrefreshingresult(false)
    }
  }
  //calling API OutletField
  const getSalesbyCategoryListOutlet = async () => {
    setIsrefreshingresult(true)
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    const outletName = await AsyncStorage.getItem('outletName')
    SetOutlet(outletName)
    let myJson = {
      outletId: outletField ? outletField : loginData.outletId,
      toDate: selectedEndDate,
      fromDate: selectedStartDate
    }
    const result = await api.CreateMasterData(endPoint.GET_SALES_BY_CATEGORIES, token, myJson)
    setData(result.data);

    if (result.data.length === 0) {
      setDataPreset(false);
      setIsrefreshingresult(false)

    } else {

      setDataPreset(true);
      setIsrefreshingresult(false)
    }
  }



   const categorySalesCountList = () => {
    let dineinFilter = Array.isArray(data) ? data.filter((item) => item && item.orderType === "Dine-in") : [];
    let takeawayFilter = Array.isArray(data) ? data.filter((item) => item.orderType === "Walk-in") : [];
    
    setDineinSalesCount(dineinFilter.length); // Don't check for >= 0, the length is always >= 0
    setTakeAwaySalesCount(takeawayFilter.length);
  };


  const pieData = [
    {
      value: dineinSalesCount,
      color: '#008960',
      gradientCenterColor: '#008960',
    },
    { value: 0, color: '#959FAD', gradientCenterColor: '#959FAD' },
    { value: takeawaySalesCount, color: '#E83B42', gradientCenterColor: '#E83B42' },
    { value: 0, color: '#CCCCCC', gradientCenterColor: '#CCCCCC' },
  ];
  
  // Ensure the sum of all values is not zero (or replace with a valid fallback)
   // Filter out slices with zero value
   const filteredPieData = pieData.filter(slice => slice.value > 0);

   // Fallback to a default slice if filteredPieData is empty
   const finalPieData = filteredPieData.length > 0 ? filteredPieData : [
     { value: 1, color: '#CCCCCC', gradientCenterColor: '#CCCCCC' }
   ];
 
  // If both sales are zero, ensure there is at least some data to render
  
 


  
  useEffect(() => {
    categorySalesCountList();

  }, [data]);
  // const pieData = [
  //   {
  //     value: dineinSalesCount,
  //     color: '#008960',
  //     gradientCenterColor: '#008960',
  //   },
  //   { value: 0, color: '#959FAD', gradientCenterColor: '#959FAD' },
  //   { value: takeawaySalesCount, color: '#E83B42', gradientCenterColor: '#E83B42' },
  //   { value: 0, color: '#CCCCCC', gradientCenterColor: '#CCCCCC' },
  // ];
  const sendDataToParent = () => { // the callback. Use a better name
  };
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


  //--------------------------- Export Category Sales  ----------------------------------
  const exportXlsx = async () => {
    var ws = XLSX.utils.json_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CategorySales", true);


    const wbout = XLSX.write(wb, {
      type: 'base64',
      bookType: "xlsx"
    });
    const uri = FileSystem.cacheDirectory + 'CategorySales.xlsx';
    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64
    });
    FileSystem.downloadAsync(
      'http://techslides.com/demos/sample-videos/small.mp4',
      FileSystem.documentDirectory + 'small.mp4'
    )
      .then(() => {
      })
      .catch(() => {
      });
    await Sharing.shareAsync(uri, {
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      dialogTitle: 'MyWater data',
      UTI: 'com.microsoft.excel.xlsx'
    });
  }
  //--------------------------- Export Category Sales Ends ----------------------------------

  const colorOptions = {
    headerColor: '#EC187B',
    backgroundColor: '#fff',
    weekDaysColor: '#EC187B',
    selectedDateBackgroundColor: '#EC187B',
    confirmButtonColor: '#EC187B',
  };


  // ---------------------------------------- User Interface -----------------------------------------------------------

  return (
    <>
<Header heading={"Sales By Categories"} />
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
<ScrollView style={styles.dashScrollView}>
<View style={styles.categoryBlkCon}>
<View style={[styles.flexrow, styles.justifyCenter]}>
<View style={[styles.dashColTop, styles.width50]}>
<View style={styles.dashTopCon}>
<View style={styles.leftCon}>
<Text style={styles.dineInText}>Total Category Sales</Text>

<View style={styles.totComView}>
<View style={styles.comCircle}></View>
<Text style={styles.completedText}>
{dineinSalesCount ? dineinSalesCount : 0} Dine In Category Sales
</Text>
</View>

<View style={styles.totComView}>

<View style={styles.penCircle}></View>
<Text style={[styles.completedText, styles.textDefault]}>
{takeawaySalesCount} Take Away Category Sales
</Text>
</View>
  </View>

  <View style={[styles.dashrgtCon, styles.flexrow, styles.justifyEnd, styles.padL10]}>
  {(dineinSalesCount > 0 || takeawaySalesCount > 0) && (
  <PieChart data={pieData} radius={90} />
)}

</View>

  </View>
  </View>
  </View>

  <View style={[styles.textcontainer1, styles.catSubBlk]}>
<Text style={styles.textStyle1}>
Sales By Categories - {selectedOutletName ? selectedOutletName : outlet}
</Text>


</View>
<View style={[styles.flexrow, styles.marBtm30, styles.alignCenter, styles.justifyBetween]}>
<View style={[styles.flexrow]}>
  <View style={[styles.width170px]}>
    <View style={styles.pickerView}>
    <ModalDropDown style={styles.outletImg} />
    <ModalSelector
data={outletDataArray.sort((a, b) => a.label.localeCompare(b.label))}
childrenContainerStyle={StyleSheet.flatten([styles.stateDateCon])}  // Use flatten here
selectStyle={styles.selectText}
selectTextStyle={StyleSheet.flatten([styles.font10, styles.textBlack])}  // Flatten the array of styles
optionContainerStyle={styles.selectCont}
optionTextStyle={styles.textStyle}
initValueTextStyle={StyleSheet.flatten([styles.font10, styles.textDate])}  // Flatten here as well
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
setSelectedOutletName(option.label);
}
}}
/>
    </View>
    </View>
    <View style={[styles.width170px, styles.padL10]}>
    <TouchableOpacity
      style={[styles.stateDateCon, styles.flexrow, styles.alignCenter]}
      onPress={() => showDateTimePicker('startDate')}
    >
      <CalenderIcon />
      {selectedStartDate ? (
        <View style={[styles.paddL5]}>
          <Text style={[styles.font9, styles.textDate]}>Start Date</Text>
          <Text style={[styles.font10, styles.textBlack]}>
            {selectedStartDate ?? null}
          </Text>
        </View>
      ) : (
        <View style={[styles.paddL5]}>
          <Text style={[styles.font10, styles.textDate]}>Start Date</Text>
        </View>
      )}
    </TouchableOpacity>
    {selectedEndDate < selectedStartDate && (
<Text style={styles.errorText}>Start date cannot be greater than end date</Text>
)}

  </View>
  <View style={[styles.width170px, styles.paddL10]}>
    <TouchableOpacity
      style={[styles.stateDateCon, styles.flexrow, styles.alignCenter]}
      onPress={() => showDateTimePicker('endDate')}
    >
      <CalenderIcon />
      {selectedEndDate ? (
        <View style={[styles.paddL5]}>
          <Text style={[styles.font9, styles.textDate]}>End Date</Text>
          <Text style={[styles.font10, styles.textBlack]}>
            {selectedEndDate ?? null}
          </Text>
        </View>
      ) : (
        <View style={[styles.paddL5]}>
          <Text style={[styles.font10, styles.textDate]}>End Date</Text>
        </View>
      )}
    </TouchableOpacity>
  </View>
  <View style={[styles.paddL10]}>
    <TouchableOpacity
      style={[styles.SearchBtn, selectedEndDate < selectedStartDate && styles.disabledBtn]}
      disabled={selectedEndDate < selectedStartDate}
      onPress={() => {
        // Perform the search
        getSalesbyCategoryListOutlet();
      }}
    >
      <Text style={[styles.textWhite, styles.font11]}>Filter</Text>
    </TouchableOpacity>
  </View>
  </View>
  <TouchableOpacity onPress={() => exportXlsx()} style={[styles.flexrow, styles.alignCenter, styles.height35]}>
  <ExcelIcon />
  <Text style={[styles.font9, styles.padL5, styles.textBlack]}>Export</Text>
</TouchableOpacity>
 </View>
 <ScrollView>
<View style={styles.table}>
  { !isDataPresent ?(
    <View style={styles.noRecordFoundView}>
      <Image style={styles.noRecordImage} source={require('../../assets/images/clipboard.png')} />
      <View>
        <Text style={styles.recordDisplay}>There are no Category Sales to display.</Text>
      </View>
    </View>
  ) : (
    <SalesByCategoriesTableView data={data} sendEditData={sendDataToParent} updateDelete={() => getSalesbyCategoryList()} />
  )}
</View>

{openInternetdownMsg && (
  <Modal isVisible={openInternetdownMsg}>
    {internetDownPop()}
  </Modal>
)}
</ScrollView>
  </View>
</ScrollView>
</>
  );
}			
						
								
