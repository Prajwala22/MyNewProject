import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React,{ useContext, useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import { Appbar, DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { default as styles, default as styless } from '../../assets/css/style';
import BarIcon from '../../assets/images/bar.js';
import DashboardIcon from '../../assets/images/dashboard_active.js';
import DineInIcon from '../../assets/images/dine_in.js';
import InternetDownIcon from '../../assets/images/internet_down.js';
import InvenIcon from '../../assets/images/inventory_icon.js';
import KitchenIcon from '../../assets/images/kitchen_icon.js';
import OnlineIcon from '../../assets/images/Online.js';
import ReportIcon from '../../assets/images/Report Icon';
import TakeAwayIcon from '../../assets/images/take_away.js';
import TableView from '../../components/DineinorderDashboard';
import TableView1 from '../../components/TakeawayorderDashboard';
import { AuthContext } from '../../App.js';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import { constRoleId } from "../common/RoleConstants"
import { formId } from '../common/FormIdConstants';



export default function Dashboard({ navigation, route }) {

    const [clicked, setClicked] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [fullData, setFullData] = useState([]);
    const [selectedValue, setSelectedValue] = useState("Top floor");
    const [tableListMaster, setTableListMaster] = useState([]);
    const [isrefreshingresultTablelist, setisrefreshingresultTablelist] = useState(false)
    const [tableListData, setTableListData] = useState([]);
    const [tableSelect, setTableSelect] = useState(null);
    const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [fakeData, setFakeData] = useState();
    const [data, setData] = useState({});
    const [datadine, setdatadine] = useState([]);
    const [dataTakeaway, setdataTakeaway] = useState([]);
    const [dataTableList, setdataTableList] = useState([]);
    const [temptableData, setTempTableData] = useState([]);
    const [outletName, setOutlet] = useState('');
    const [runningordercnt, setrunningordercnt] = useState(0);
    const [completedordercnt, setcompletedordercnt] = useState(0);
    const [restaurant, setRestaurant] = useState('');
    const [editTaxData, setEditTaxData] = useState(null);
    const [outletAddress, setAddress] = useState('');
    const [settingvisible, setSettingVisible] = useState(false);
    const [profilevisible, setProfileVisible] = useState(false);
    const hideSettingMenu = () => setSettingVisible(false);
    const showSettingMenu = () => setSettingVisible(true);
    const hideProfileMenu = () => setProfileVisible(false);
    const showProfileMenu = () => setProfileVisible(true);
    const { signOut } = useContext(AuthContext);
    const isFocused = useIsFocused();
    const [outletId, setOutletId] = useState('');
    const [tableData, setTableData] = useState([]);
    const [selectedTableId, setSelectedTableId] = React.useState('');
    const [colorcoding, setcolorcoding] = useState('#E83B42')
    const [colorcoding2, setcolorcoding2] = useState('#484D54')
    const [isrefreshingresult, setIsrefreshingresult] = useState(false)
    const [totalordercount, setTotalordercount] = React.useState('');
    const [occupiedtablecnt, setoccupiedtablecnt] = useState(0);
    const [emptytablecnt, setemptytablecnt] = useState(0)
    const [totaltablecnt, settotaltablecount] = React.useState(0);
    const [userRoleId, setuserRoleId] = useState('')
    const [criticalQtyData, setCriticalQtyData] = useState([])
    const [prodname1, set1ProdName] = useState('')
    const [prodname2, set2ProdName] = useState('')
    const [prodname3, set3ProdName] = useState('')
    const [prodname4, set4ProdName] = useState('')
    const [prodname5, set5ProdName] = useState('')
    const [criticQty1, set1CriticQty] = useState(0)
    const [criticQty2, set2CriticQty] = useState(0)
    const [criticQty3, set3CriticQty] = useState(0)
    const [criticQty4, set4CriticQty] = useState(0)
    const [criticQty5, set5CriticQty] = useState(0)
    const [dashboardPermission, setDashBoardPermission] = useState([])
    const [dineInPermission, setDineInPermission] = useState([])
    const [takeAwayPermission, setTakeAwayPermission] = useState([])
    const [onlinePermission, setOnlinePermission] = useState([])
    const [kitchenPermission, setKitchenPermission] = useState([])
    const [reportsPermission, setReportsPermission] = useState([])
    const [barPermission, setBarPermission] = useState([])
    const [mastersPermission, setMastersPermission] = useState([])
    const [activeTab, setActiveTab] = useState("Dine in order");
    const [restName, setRestName] = useState('')


    /// Get user information
    useEffect(() => {
        setTimeout(() => getRestaurant(), 1000);
        checkPermissions();
    }, [isFocused]);

    const getRestaurant = async () => {
        const userRoleId = await AsyncStorage.getItem('userRoleId')
        const restaurantName = await AsyncStorage.getItem('restaurantName')
        const outletName = await AsyncStorage.getItem('outletName')
        const outletAddress = await AsyncStorage.getItem('outletAddress')
        const outletid = await AsyncStorage.getItem('restaurantId')
        const prodRestName = await AsyncStorage.getItem('RestaurantName')
        setRestName(prodRestName)

        setOutletId(outletId)
        setRestaurant(restaurantName)
        setOutlet(outletName)
        setAddress(outletAddress)
        setuserRoleId(userRoleId)

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

    //View Dinein Order
    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab("Dine in order");
        setcolorcoding('#E83B42')
        setcolorcoding2('#484D54')
    };

    //View Takeawy Order
    const handleTab2 = () => {
        // update the state to tab2
        setcolorcoding('#484D54')
        setcolorcoding2('#E83B42')
        setActiveTab("Take away order");
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

    /// Get the Orders list
    useEffect(() => {

        GetOrdersByCountList();
        setSelectedTableId('');

        return () => {
            setData([]);
        }
    }, [isFocused]);
    const GetOrdersByCountList = async () => {
        setIsrefreshingresult(true)
        const jsonValue = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let userId = loginData.userId;
        let access_token = loginData.token;
        console.log(access_token,"access_token")
        let outletId = loginData.outletId;
        let token = loginData.token
        const data =
        {
            outletId: loginData.outletId,
            toDate: null,
            fromDate: null,
        }
        const result = await api.GetOrdersByCount(access_token, data);
        if (JSON.stringify(result.data) === null || JSON.stringify(result.data) === "null" || result.data === "") {
            setIsrefreshingresult(false)

        } else {
            setData(result.data);
            setcompletedordercnt(result.data.completedOrders)
            setrunningordercnt(result.data.runningOrders)
            setdatadine(result.data.todayDineInSalesList)
            setdataTakeaway(result.data.todayTakeAwaySalesList)
            setdataTableList(result.data.tableDetailsList)
            setTempTableData(result.data.tableDetailsList)
            setCriticalQtyData(result?.data?.stockNearToCritical)
            set1ProdName(result?.data?.stockNearToCritical[0]?.productName)
            set2ProdName(result?.data?.stockNearToCritical[1]?.productName)
            set3ProdName(result?.data?.stockNearToCritical[2]?.productName)
            set4ProdName(result?.data?.stockNearToCritical[3]?.productName)
            set5ProdName(result?.data?.stockNearToCritical[4]?.productName)
            set1CriticQty(result?.data?.stockNearToCritical[0]?.criticalQuantity)
            set2CriticQty(result?.data?.stockNearToCritical[1]?.criticalQuantity)
            set3CriticQty(result?.data?.stockNearToCritical[2]?.criticalQuantity)
            set4CriticQty(result?.data?.stockNearToCritical[3]?.criticalQuantity)
            set5CriticQty(result?.data?.stockNearToCritical[4]?.criticalQuantity)
            setIsrefreshingresult(false)
            setTotalordercount(result.data.completedOrders + result.data.runningOrders)

        }
        //Get Section List 
        const tableresult = await api.getAllMasterData(token, endPoint.GET_TABLE_TYPE + outletId);

        if (JSON.stringify(tableresult.data) === null || JSON.stringify(tableresult.data) === "null" || tableresult.data === "") {

        } else {
            setTableData(tableresult.data);
        }
        setisrefreshingresultTablelist(true)
        //Get Table Details List
        const tableResult = await api.getAllMasterData(token, endPoint.GET_TABLE_LIST + outletId);
        if (JSON.stringify(tableResult.data) === null || JSON.stringify(tableResult.data) === "null" || tableResult.data === "") {
            setisrefreshingresultTablelist(false)
        } else {
            setTableListData(tableResult.data);
            setTableListMaster(tableResult.data);
            setisrefreshingresultTablelist(false)
        }
    }
    const criticalQtyStatus = () => {
        const filterProdnamedata = criticalQtyData.map(e => e.productName)
        const filterCritic = criticalQtyData.map(e => e.criticalQuantity)

        set1ProdName(criticalQtyData[0]?.productName)
        set2ProdName(criticalQtyData[1]?.productName)
        set1CriticQty(criticalQtyData[0]?.criticalQuantity)
        set2CriticQty(criticalQtyData[1]?.criticalQuantity)

    }
    const sendDataToParent = (datadine) => {
        setEditTaxData(datadine)
    };

    //Pie chart status data for running and completed orders
    const pieData = [
        {
            value: runningordercnt,
            color: '#E83B42',
            gradientCenterColor: '#E83B42',
        },
        { value: 0, color: '#959FAD', gradientCenterColor: '#959FAD' },
        { value: completedordercnt, color: '#008960', gradientCenterColor: '#008960' },
        { value: 0, color: '#CCCCCC', gradientCenterColor: '#CCCCCC' },
    ];
    //Pie chart status data for occupied and availabale table status
    const pieDataTable = [
        {
            value: occupiedtablecnt,
            color: '#E83B42',
            gradientCenterColor: '#E83B42',
        },
        { value: 0, color: '#959FAD', gradientCenterColor: '#959FAD' },
        { value: emptytablecnt, color: '#008960', gradientCenterColor: '#008960' },
        { value: 0, color: '#CCCCCC', gradientCenterColor: '#CCCCCC' },
    ];
    // Bar chart status data for top 5 critical quantity Items
    const barDataTable = [
        {
            value: criticQty1,
            frontColor: '#008960',
        },
        { value: criticQty2, frontColor: '#E83B42' },
    ];

    const renderDot = color => {
        return (
            <View
                style={[styles.chartDot, { backgroundColor: color }]}
            />
        );
    };
    //showing the legend ui method for table status
    const renderLegendComponent = () => {
        return (
            <>
                <View style={[styles.flexrow, styles.marBtm10, styles.wdth100]}>
                    <View style={[styles.wdth50, styles.flexrow, styles.alignCenter]}>
                        {renderDot('#E83B42')}
                        <Text style={styles.chartLabel}>Occupied: {occupiedtablecnt}</Text>
                    </View>
                    <View style={[styles.wdth50, styles.flexrow, styles.alignCenter]}>
                        {renderDot('#008960')}
                        <Text style={styles.chartLabel}>Available: {emptytablecnt}</Text>
                    </View>
                </View>
            </>
        );
    };
    //showing the legend ui method for Critical quantity status
    const renderLegendComponent1 = () => {
        return (
            <>
                <View style={[styles.flexrow, styles.marBtm10, styles.wdth100, styles.flexWrap]}>
                    <View style={[styles.wdth50, styles.flexrow, styles.alignCenter, styles.padRgt15, styles.marBtm10]}>
                        {renderDot('#E83B42')}
                        <Text style={styles.chartLabel}> {prodname1}</Text>
                    </View>
                    <View style={[styles.wdth50, styles.flexrow, styles.alignCenter, styles.padRgt15, styles.marBtm10]}>
                        {renderDot('#008960')}
                        <Text style={styles.chartLabel}>{prodname2}</Text>
                    </View>
                    {/* <View style={[styles.wdth50, styles.flexrow, styles.alignCenter, styles.padRgt15, styles.marBtm10]}>
                        {renderDot('#8CDDED')}
                        <Text style={styles.chartLabel}>{prodname3}</Text>
                    </View>
                    <View style={[styles.wdth50, styles.flexrow, styles.alignCenter, styles.padRgt15, styles.marBtm10]}>
                        {renderDot('#FF97C0')}
                        <Text style={styles.chartLabel}>{prodname4}</Text>
                    </View>
                    <View style={[styles.wdth50, styles.flexrow, styles.alignCenter]}>
                        {renderDot('#FFA500')}
                        <Text style={styles.chartLabel}>{prodname5}</Text>
                    </View> */}
                </View>
                {/* <View style={[styles.flexrow, styles.marBtm10, styles.wdth100]}> */}

                {/* <View style={[styles.wdth50, styles.flexrow, styles.alignCenter]}>
                        {renderDot('#CCCCCC')}
                        <Text style={styles.chartLabel}>Not Available: 0</Text>
                    </View> */}
                {/* </View> */}
            </>
        );
    };

    //filter table status based on status starts
    useEffect(() => {
        tableCountList();
        return () => {
        }
    });
    const tableCountList = () => {

        let tableOccupied = temptableData?.filter((el) => el.tableStatus == 'Occupied')
        let tableEmpty = temptableData?.filter((el) => el.tableStatus == 'Empty')
        setoccupiedtablecnt(tableOccupied.length)
        setemptytablecnt(tableEmpty.length)
        settotaltablecount(tableOccupied.length + tableEmpty.length)

    }
    //filter table status based on status ends

    // //filter table details method starts
    // let tablenewarray = tableData.map((s, i) => {

    //     let newData1 = {
    //         key: s + i,
    //         label: s.tableTypeName,
    //         value: s.tableTypeName
    //     }
    //     return newData1

    // })

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
    //filter table details method ends

    //update Table details
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


    //-------------------------------------User Interface---------------------------------------------------------
    return (
        <>
            {/* Dashboard Header Starts*/}
            <View style={[styles.waterheader, styles.headerBlk]}>

                <View style={styles.headerFlexCenter}>
                    <View style={[styles.headerFlexCenter, styles.headerLeftSec, styles.headerRightBorder]}>
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
                                    <View style={[styles.dashboardHeader, styles.dashMenuActive]}>
                                        <DashboardIcon />
                                        <Text style={[styles.font13, styles.priText, styles.fontBold, styles.padtop5]}>Dashboard</Text>
                                    </View> : dashboardPermission[0]?.isFormAccess === true ?
                                        <View>
                                            <View style={[styles.dashboardHeader, styles.dashMenuActive]}>
                                                <DashboardIcon />
                                                <Text style={[styles.font13, styles.priText, styles.fontBold, styles.padtop5]}>Dashboard</Text>
                                            </View>
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
            {/* Dashboard Header Ends*/}

            <SafeAreaView>
                <ScrollView style={[styles.dashScrollView]}>
                    {
                        isrefreshingresult ? <View style={[styless.flex1, styless.flexrow, styless.alignCenter, styless.justifyCenter, styless.loaderPopupBlk]}>
                            <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
                        </View> :
                            <View style={[styles.dineViewBlk, styles.paddB60]}>
                                <View style={styles.dasCon}>
                                    <View style={[styles.dashTopHeader]}>
                                        {/* dashboard top HTML */}
                                        <View style={[styles.dashColTop]}>
                                            <View style={styles.dashTopCon}>
                                                <View style={styles.leftCon}>
                                                    <Text style={styles.dineInText}>Dine In</Text>
                                                    <Text style={styles.dineinNum}>{data.dineIn}</Text>
                                                </View>
                                                <View style={styles.dashrgtCon}>
                                                    <TouchableOpacity style={styles.orderBtn} onPress={() => navigation.navigate('DineIn')}><Text style={styles.OrderText}>View Orders</Text></TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.dashColTop}>
                                            <View style={styles.dashTopCon}>
                                                <View style={styles.leftCon}>
                                                    <Text style={styles.dineInText}>Take Away</Text>
                                                    <Text style={styles.dineinNum}>{data.walkIn}</Text>
                                                </View>
                                                <View style={styles.dashrgtCon}>
                                                    <TouchableOpacity style={styles.orderBtn} onPress={() => navigation.navigate('TakeAway')}><Text style={styles.OrderText}>View Orders</Text></TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.dashColTop}>
                                            <View style={styles.dashTopCon}>
                                                <View style={styles.leftCon}>
                                                    <Text style={styles.dineInText}>Total Order</Text>
                                                    <View style={styles.totComView}>
                                                        <View style={styles.comCircle}></View>
                                                        <Text style={styles.completedText}>{data.completedOrders} Completed</Text>
                                                    </View>
                                                    <View style={styles.totComView}>
                                                        <View style={styles.penCircle}></View>
                                                        <Text style={styles.completedText}>{data.runningOrders} Running</Text>
                                                    </View>
                                                </View>
                                                <View style={[styles.dashrgtCon, styles.flexrow, styles.justifyEnd]}>
                                                    <PieChart
                                                        data={pieData}
                                                        donut
                                                        showGradient
                                                        sectionAutoFocus
                                                        radius={35}
                                                        innerRadius={25}
                                                        innerCircleColor={'#fff'}
                                                        centerLabelComponent={() => {
                                                            return (
                                                                <View style={[styles.justifyCenter, styles.alignCenter]}>
                                                                    <Text style={styles.chartCount}>{totalordercount}</Text>
                                                                </View>
                                                            );
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        {/* dashboard top HTML - Ends  */}

                                        {/* table HTML */}
                                        <View style={[styles.dashColTop, styles.upperSecCol]}>
                                            <View style={[styles.dashTopCon, styles.dashUpperCon]}>
                                                <View style={[styles.dashUpprow]}>
                                                    <View style={[styles.HeadingCol, styles.dashbrddrp]}>
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
                                                                        GetOrdersByCountList()
                                                                    } else {
                                                                        updateTableList(option)

                                                                    }

                                                                }
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={styles.dashobardtable}>
                                                        {
                                                            isrefreshingresultTablelist ? <View style={[styless.flexrow, styless.alignCenter, styless.justifyCenter, styless.pad20]}>
                                                                <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
                                                            </View> :
                                                                <FlatList
                                                                    nestedScrollEnabled
                                                                    data={tableListData.sort(function (a, b) {
                                                                        return (a.tableNo < b.tableNo) ? -1 : (a.tableNo > b.tableNo) ? 1 : 0
                                                                    })}
                                                                    extraData={tableListData}
                                                                    numColumns={3}
                                                                    columnWrapperStyle={styles.dashobardtable}
                                                                    keyExtractor={(item, _index) => item.tableId}
                                                                    renderItem={({ item }) =>
                                                                        <View style={styles.dashboardtableheader}>
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
                                                                        </View>
                                                                    }
                                                                />
                                                        }
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        {/* table HTML Ends */}

                                        {/* table status col */}
                                        {


                                            <View style={[styles.dashColTop]}>
                                                <View style={[styles.dashTopCon, styles.marBtm20]}>
                                                    <View style={styles.HeadingCol}>
                                                        <Text style={styles.tableHead}>Table Status</Text>
                                                        {isrefreshingresultTablelist ? <View style={[styless.flexrow, styless.alignCenter, styless.justifyCenter, styless.pad20]}>
                                                            <Image source={require('../../assets/images/Watermelon-Loader-Gif.gif')} style={styless.loaderIcon} />
                                                        </View> :
                                                            <View style={styles.marTop10}>
                                                                <View>
                                                                    <PieChart
                                                                        data={pieDataTable}
                                                                        donut
                                                                        showGradient
                                                                        sectionAutoFocus
                                                                        radius={90}
                                                                        innerRadius={60}
                                                                        innerCircleColor={'#fff'}
                                                                        centerLabelComponent={() => {
                                                                            return (
                                                                                <View style={[styles.justifyCenter, styles.alignCenter]}>
                                                                                    <Text style={styles.chartCount}>{totaltablecnt}</Text>
                                                                                </View>
                                                                            );
                                                                        }}
                                                                    />
                                                                </View>
                                                                {renderLegendComponent()}
                                                            </View>}
                                                    </View>
                                                </View>
                                            </View>
                                        }
                                        {/* table status col - Ends */}

                                        {/* dine in tab col */}
                                        <View style={[styles.dashColTop, styles.dashTabCon]}>
                                            <View style={styles.dashtabContaier}>
                                                <View style={[styles.dashTab, styles.dashboardtab]}>
                                                    <View style={styles.viewallorder}>
                                                        <View style={styles.dashSubBlk}>
                                                            <TouchableOpacity onPress={() => handleTab1()}>

                                                                <Text style={{
                                                                    color: colorcoding,
                                                                    fontSize: 16,
                                                                    lineHeight: 22,
                                                                    fontWeight: '700',
                                                                    marginTop: 4,
                                                                }}>Dine In Orders</Text>
                                                                {activeTab === "Dine in order" ?
                                                                    <View style={[styles.tabActive, styles.dashnavActive]}></View>
                                                                    :
                                                                    null
                                                                }
                                                            </TouchableOpacity>
                                                        </View>

                                                        <View style={styles.dashSubBlk}>
                                                            <TouchableOpacity onPress={() => handleTab2()}>
                                                                <Text style={{
                                                                    color: colorcoding2,
                                                                    fontSize: 16,
                                                                    lineHeight: 22,
                                                                    fontWeight: '700',
                                                                    marginTop: 4,
                                                                }}>Take Away Orders</Text>
                                                                {activeTab === "Take away order" ?
                                                                    <View style={[styles.tabActive, styles.dashnavActive]}></View>
                                                                    :
                                                                    null
                                                                }
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                                                        <View style={[styles.textcontainer2, styles.margrgt10]}>
                                                            <Text style={styles.textStyle2}>
                                                                View all Orders
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>

                                                {/* dine in tab table */}
                                                <View style={styles.dashTable}>
                                                    <DataTable>
                                                        <ScrollView>
                                                            {activeTab === "Dine in order" ?
                                                                <TableView data={datadine} sendEditData={sendDataToParent} /> : <TableView1 data={dataTakeaway} sendEditData={sendDataToParent} />}
                                                        </ScrollView>
                                                    </DataTable>
                                                </View>
                                                {/* dine in tab table - Ends */}
                                            </View>
                                        </View>
                                        {/* dine in tab col - Ends */}
                                    </View>
                                </View>
                            </View>
                    }
                    {openInternetdownMsg &&
                        <Modal isVisible={openInternetdownMsg}>
                            {internetDownPop()}
                        </Modal>
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    );

}
