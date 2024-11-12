/** @format */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import ModalSelector from "react-native-modal-selector";
import { Appbar } from "react-native-paper";
import Toast from "react-native-root-toast";
import * as yup from "yup";
import styles, { default as styless } from "../../assets/css/style";
import BarIcon from "../../assets/images/bar.js";
import DashboardIcon from "../../assets/images/dashbord.js";
import DineInIcon from "../../assets/images/dine_in.js";
import InternetDownIcon from "../../assets/images/internet_down.js";
import InvenIcon from "../../assets/images/inventory_icon_active.js";
import KitchenIcon from "../../assets/images/kitchen_icon.js";
import OnlineIcon from "../../assets/images/Online.js";
import ReportIcon from "../../assets/images/Report Icon";
import TakeAwayIcon from "../../assets/images/take_away.js";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import ProductSupplierMaster from "../../components/ProductSupplierMaster";
import api from "../../services/api/callingApi";
import { constRoleId } from "../common/RoleConstants";
import { formId } from "../common/FormIdConstants";
import { Platform } from 'react-native';

export default function Inventory({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [data, setData] = useState([]);
  const [supplierOrderData, setSupplierOrderData] = useState([]);

  const [restaurant, setRestaurant] = useState("");
  const [outletName, setOutlet] = useState("");
  const [outletId, setOutletId] = useState("");
  const [outletAddress, setAddress] = useState("");

  const optionsPerPage = [2, 3, 4];
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [isDataPresent, setDataPreset] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedValue2, setSelectedValue2] = useState("All Orders");
  const [activeTab, setActiveTab] = useState("Product/Stock");
  const isFocused = useIsFocused();
  const [orderType, setOrderType] = useState(0);
  const [activeOrderTypeDrop, setActiveOrderTypeDrop] = useState("Running");
  const [runningcolor, setRunningColor] = useState("#E83B42");
  const [preparedcolor, setPreparedColor] = useState("#484D54");
  const [completedcolor, setCompletedColor] = useState("#484D54");
  const [openStock, setOpenStock] = useState(false);
  const [productData, setProductData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  
  const [unitKey, setUnitKey] = useState("");
  const [pricekey, SetPricekey] = useState("");

  const [supplier_id, setSuplierId] = useState("");
  const [suppliername, setSupplierName] = useState("");
  const [supplierKey, setSupplierKey] = useState(0);
  const [editStockData, setEditStockData] = useState(null);
  const [editStock, setEditStock] = useState(false);
  const [openSuccessMsg, setopenSuccessMsg] = useState(false);
  const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false);
  const [openInternetdownMsg, setopenInternetdownMsg] = useState(false);
  const [userRoleId, setuserRoleId] = useState("");
  const [stockDataLength, setStockDataLength] = useState("1");

  const [dashboardPermission, setDashBoardPermission] = useState([]);
  const [dineInPermission, setDineInPermission] = useState([]);
  const [takeAwayPermission, setTakeAwayPermission] = useState([]);
  const [onlinePermission, setOnlinePermission] = useState([]);
  const [kitchenPermission, setKitchenPermission] = useState([]);
  const [reportsPermission, setReportsPermission] = useState([]);
  const [barPermission, setBarPermission] = useState([]);
  const [mastersPermission, setMastersPermission] = useState([]);
  const [restName, setRestName] = useState("");
  const [errormsg, setErrormsg] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);

  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Running Orders" },
    { key: "second", title: "Completed Orders" },
  ]);
  const [recipeValues, setRecipeValues] = useState({
    productName: "",
    price: "",
    unit: "",
    key1: 0,
    key2: 0,
  });

  var count = 1;
  const _id: any = "";
  const supplierId: any = "";
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    checkPermissions();
    getTableList();
  }, [isFocused]);
  const getTableList = async () => {
    const restaurantName = await AsyncStorage.getItem("restaurantName");
    const outletName = await AsyncStorage.getItem("outletName");
    setRestaurant(restaurantName);
    setOutlet(outletName);
    setOutletId(outletId);
    const userRoleId = await AsyncStorage.getItem("userRoleId");
    setuserRoleId(userRoleId);
    const prodRestName = await AsyncStorage.getItem("RestaurantName");
    setRestName(prodRestName);
  };

  //Permissions Filter Method
  const checkPermissions = async () => {
    const permissions = await AsyncStorage.getItem("permissions");
    const loginPermissions = JSON.parse(permissions);

    //Checking Permission for Dashboard
    const fetchDashboardStatus = loginPermissions.filter(
      (item) => item.formId === formId.DASHBOARD && item.isFormAccess === true
    );
    setDashBoardPermission(fetchDashboardStatus);
    //Checking Permission for Dinein
    const fetchDineInStatus = loginPermissions.filter(
      (item) => item.formId === formId.DINEIN && item.isFormAccess === true
    );
    setDineInPermission(fetchDineInStatus);
    //Checking Permission for Takeaway
    const fetchTakeAwayStatus = loginPermissions.filter(
      (item) => item.formId === formId.TAKEAWAY && item.isFormAccess === true
    );
    setTakeAwayPermission(fetchTakeAwayStatus);
    //Checking Permission for Online
    const fetchOnlineStatus = loginPermissions.filter(
      (item) => item.formId === formId.ONLINE && item.isFormAccess === true
    );
    setOnlinePermission(fetchOnlineStatus);
    //Checking Permission for Inventory
    const fetchInventoryStatus = loginPermissions.filter(
      (item) => item.formId === formId.MASTERS && item.isFormAccess === true
    );
    setMastersPermission(fetchInventoryStatus);
    //Checking Permission for Kitchen
    const fetchKitchenStatus = loginPermissions.filter(
      (item) => item.formId === formId.KITCHEN && item.isFormAccess === true
    );
    setKitchenPermission(fetchKitchenStatus);
    //Checking Permission for Bar
    const fetchBarStatus = loginPermissions.filter(
      (item) => item.formId === formId.BAR && item.isFormAccess === true
    );
    setBarPermission(fetchBarStatus);
    //Checking Permission for Reportsdashboard
    const fetchReportsStatus = loginPermissions.filter(
      (item) => item.formId === formId.REPORTS && item.isFormAccess === true
    );
    setReportsPermission(fetchReportsStatus);
  };

  /// Get Product Supplier Master list
  useEffect(() => {
    getProductSupplierMasterList();
    return () => {
      setData([]);
    };
  }, [isFocused]);

  const getProductSupplierMasterList = async () => {
    const jsonValue: any = await AsyncStorage.getItem("userInfo");
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const result = await api.GetProductSupplierMaster(token, outletId);
    setStockDataLength(result.data?.length);

    if (
      JSON.stringify(result.data) === null ||
      JSON.stringify(result.data) === "null" ||
      result.data === ""
    ) {
      setDataPreset(false);
    } else {
      setData(result.data);
      setDataPreset(true);
    }
  };

  /// Get All Product list
  useEffect(() => {
    getProductList();
    return () => {
      setProductData([]);
    };
  }, [isFocused]);
  const getProductList = async () => {
    const jsonValue: any = await AsyncStorage.getItem("userInfo");
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const result = await api.GetProductList(token, outletId);

    if (
      JSON.stringify(result.data) === null ||
      JSON.stringify(result.data) === "null" ||
      result.data === ""
    ) {
    } else {
      setProductData(result.data);
    }
  };

  /// Get All Supplier list
  useEffect(() => {
    getSuppliersList();
    return () => {
      setSupplierData([]);
    };
  }, [isFocused]);
  const getSuppliersList = async () => {
    const jsonValue: any = await AsyncStorage.getItem("userInfo");
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const result = await api.GetSupplier(token, outletId);

    if (
      JSON.stringify(result.data) === null ||
      JSON.stringify(result.data) === "null" ||
      result.data === ""
    ) {
    } else {
      setSupplierData(result.data);
    }
  };

  // Create errro msg
  const errorOpen = () => {
    setErrormsg(!errormsg);
  };

  const errorPopup = () => {
    return (
      // error popup
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View
          style={[
            styles.flexColumn,
            styles.alignCenter,
            styles.justifyCenter,
            styles.SuccessPopup,
          ]}>
          <Text
            style={[
              styles.font24,
              styles.textBlack,
              styles.fontBold,
              styles.marBtm8,
            ]}>
            Error!
          </Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>
            Something went wrong
          </Text>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => [errorOpen(), toggleStock()]}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Create already exist msg
  const alreadyOpen = () => {
    setAlreadyExist(!alreadyExist);
  };

  const alreadyPopup = () => {
    return (
      // already popup
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View
          style={[
            styles.flexColumn,
            styles.alignCenter,
            styles.justifyCenter,
            styles.SuccessPopup,
          ]}>
          <Text
            style={[
              styles.font24,
              styles.textBlack,
              styles.fontBold,
              styles.marBtm8,
            ]}></Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>
            Product already available with same supplier
          </Text>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => [alreadyOpen(), toggleStock()]}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  //Create Inventory  Product Supplier Stock
  const handleSubmit = async (data) => {

    // if (
    //   (recipeValues.price && recipeValues.unit === "") ||
    //   (recipeValues.price && recipeValues.unit === null) ||
    //   (recipeValues.price && recipeValues.unit === undefined)
    // ) {
    //   Alert.alert("Something went wrong");
    // }

    // {
    //   data.itemForRecipe === "" ? Alert.alert("Something went wrong") : null;
    // }

    {
      data?.itemForRecipe === "" ? setErrormsg(true) : null;
    }

    const jsonValue: any = await AsyncStorage.getItem("userInfo");
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    var myJson = {
      supplierId: supplier_id,
      productId: productId,
      price: pricekey,
      unit: unitKey,
      quantity: data.quantity,
      criticalQuantity: data.criticalQty,
      orderQuantity: data.orderQty,
      OutletId: outletId,
    };
    const result = await api.createStock(token, myJson);
    if (result?.data === null) {
      setAlreadyExist(!alreadyExist);
      // Alert.alert("Product already available with same supplier");
    } else if (stockDataLength >= "1") {
      successOpen();
      setOpenStock(false);
      getProductSupplierMasterList();
    } else {
      setOpenStock(false);
      navigation.navigate("MapAddingData");
    }
  };
  // Create Success msg
  const successOpen = () => {
    setopenSuccessMsg(!openSuccessMsg);
  };

  const SuccessPopup = () => {
    return (
      // success popup
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View
          style={[
            styles.flexColumn,
            styles.alignCenter,
            styles.justifyCenter,
            styles.SuccessPopup,
          ]}>
          {/* <Image source={(require("../../assets/images/success_msg_popup.png"))} style={[styles.marBtm20, styles.sucImg]} /> */}
          <Text
            style={[
              styles.font24,
              styles.textBlack,
              styles.fontBold,
              styles.marBtm8,
            ]}>
            Success!
          </Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>
            Stock Created Successfully
          </Text>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => successOpen()}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - Ends
    );
  };
  //Edit ProductSupplier Stock Data Api
  const stockUpdate = async (data) => {
    const jsonValue: any = await AsyncStorage.getItem("userInfo");
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    var myJson = {
      id: editStockData._id,
      supplierId: editStockData.supplierId,
      productId: editStockData.productId,
      price: data.price,
      unit: data.unit,
      quantity: data.quantity,
      criticalQuantity: data.criticalQty,
      orderQuantity: data.orderQty,
      OutletId: outletId,
    };
    const result = await api.updateProductSupplierMaster(
      token,
      myJson,
      editStockData._id
    );
    if (result.success) {
      Toast.show("Stock Updated Successfully", {
        duration: Toast.durations.LONG,
      });
      setOpenStock(false);
      getProductSupplierMasterList();
    } else {
      Alert.alert("Product already available with same supplier");
    }
  };
  // Update Success msg
  const successOpenUpdate = () => {
    setopenUpdateSuccessMsg(!openUpdateSuccessMsg);
  };
  const SuccessUpdatePopup = () => {
    return (
      // success popup
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View
          style={[
            styles.flexColumn,
            styles.alignCenter,
            styles.justifyCenter,
            styles.SuccessPopup,
          ]}>
          {/* <Image source={(require("../../assets/images/success_msg_popup.png"))} style={[styles.marBtm20, styles.sucImg]} /> */}
          <Text
            style={[
              styles.font24,
              styles.textBlack,
              styles.fontBold,
              styles.marBtm8,
            ]}>
            Success!
          </Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>
            Stock Updated Successfully
          </Text>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => successOpenUpdate()}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - Ends
    );
  };
  //  Internet down msg
  const successInternetdownOpen = () => {
    setopenInternetdownMsg(!openInternetdownMsg);
  };
  // internet down popup
  const internetDownPop = () => {
    return (
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View
          style={[
            styles.flexColumn,
            styles.alignCenter,
            styles.justifyCenter,
            styles.SuccessPopup,
          ]}>
          <InternetDownIcon style={[styles.marBtm20]} />
          <Text
            style={[
              styles.font24,
              styles.textBlack,
              styles.fontBold,
              styles.marBtm8,
            ]}>
            Oops!
          </Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>
            Something went wrong!
          </Text>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => successInternetdownOpen()}>
            <Text style={[styles.textWhite, styles.font16]}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // internet down popup - Ends

  const sendDataToParent = (data) => {
    // the callback. Use a better name
    setEditStock(true);
    setEditStockData(data);

    const selectproductnamearray = productListArray.filter(
      (item) => item.label == data.productName
    );
  };

  const toggleStock = () => {
    setOpenStock(!openStock);
    setProductName("Select Product")
    setSupplierKey(0)
    setRecipeValues ({
      productName: "Select Product",
      price: "",
      unit: "",
      key1: 0,
      key2: 0,
    });
   };
  const openAddStock = () => {
    setOpenStock(!openStock);
    setProductName("Select Product")
    setSupplierKey(0)

    setRecipeValues ({
      productName: "Select Product",
      price: "",
      unit: "",
      key1: 0,
      key2: 0,
    });
  };
  const toggleEditStock = () => {
    setEditStock(!editStock);
  };
  const stockValidationSchema = yup.object().shape({
    itemForRecipe: yup.string(),
    supplierRecipe: yup.string(),
    quantity: yup.string().required("Quantity is required"),
    criticalQty: yup.string().required("Critical Quantity is required"),
    orderQty: yup.string().required("Order Quantity is required"),
  });
  const uniqueIds = [];

  const uniqueProductName = productData.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.productName);

    if (!isDuplicate) {
      uniqueIds.push(element.productName);

      return true;
    }

    return false;
  });
  let productListArray = uniqueProductName.map((s, i) => {
    let newData = {
      key: i + 1,
      label: s.productName,
      value: s.productId,
      price: s.pricingRange?.list_price,
      unit: s.unit,
    };

    return newData;
  });
  let supplierListArray = supplierData.map((s, i) => {
    let newData = {
      key: i + 1,
      label: s.supplierName,
      value: s.supplierId,
    };

    return newData;
  });
  const handleInputChangeRecipe = (e, name) => {
    setRecipeValues((prevState) => ({
      ...prevState,
      [name]: e,
    }));
    // setRecipeValues({...recipeValues,{'key':e}]);
  };


  

  // Add Supplier Order Popup
  const popupAddStock = () => {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === "ios"}>
        <View style={styles.popupContainer}>
          <View>
            <View style={styles.popupHeadWrap}>
              <Text style={styles.textStyle3}>Add Stock</Text>
              <Pressable style={styles.closeView} onPress={() => toggleStock()}>
                <Image
                  source={require("../../assets/images/cross_icon.png")}
                  style={styles.crossIcon}
                />
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </View>

            <Formik
              validationSchema={stockValidationSchema}
              initialValues={{
                itemForRecipe: "",
                supplierRecipe: "",
                quantity: "",
                criticalQty: "",
                orderQty: "",
              }}
              onSubmit={(values) => handleSubmit(values)}>
              {({
                handleSubmit,
                handleChange,
                isValid,
                values,
                setFieldValue,
                touched,
                errors,
              }) => (
                <View style={{ flex: 1, alignItems: "stretch" }}>
                  <View style={[styles.popuprow]}>
                    <View
                      style={[
                        styles.popupInputBlk,
                        styles.wdth50,
                        styles.paddRL15,
                      ]}>
                      <Text style={[styles.signLabel, styles.textDefault]}>
                        Select Item From Product
                        <Text style={[styles.font12, styles.textPri]}>*</Text>
                      </Text>
                      <View style={styles.pickerView}>
                        <Image
                          source={require("../../assets/images/dropdown.png")}
                          style={styles.dropdonwImg}
                        />
                        <ModalSelector
                          data={productListArray.sort(function (a, b) {
                            return a.label < b.label
                              ? -1
                              : a.label > b.label
                              ? 1
                              : 0;
                          })}
                          childrenContainerStyle={[
                            styles.AddsignInput,
                            styles.selectMainInput,
                          ]}
                          selectStyle={styles.selectText}
                          optionContainerStyle={styles.selectCont}
                          optionTextStyle={styles.textStyle}
                          initValueTextStyle={styles.textStyle}
                          overlayStyle={styles.overlayText}
                          cancelStyle={styles.selectCont}
                          cancelContainerStyle={styles.cancelCont}
                          cancelText={"Cancel"}
                          initValue={productName || 'Select Item From Product'} 
                          // selectedKey={recipeValues.key1}
                          onChange={(option) => {
                            if (option.key) {
                              setFieldValue("itemForRecipe", option.label);
                              setProductName(option.label)
                              setProductId(option.value);
                              handleInputChangeRecipe(option.key, "key1");
                              handleInputChangeRecipe(option.unit, "unit")
                              handleInputChangeRecipe(option.price, "price")
                              setUnitKey(option.unit, "unit");
                              SetPricekey(option.price, "price");
                              handleInputChangeRecipe(option.key, "key2");
                            }
                          }}
                        />
                      </View>
                      {touched.itemForRecipe && errors.itemForRecipe && (
        <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>
          {errors.itemForRecipe}
        </Text>
      )}
                    </View>
                    <View
                      style={[
                        styles.popupInputBlk,
                        styles.wdth50,
                        styles.paddRL15,
                      ]}>
                      <Text style={[styles.signLabel, styles.textDefault]}>
                        Select Supplier From Supplier
                        <Text style={[styles.font12, styles.textPri]}>*</Text>
                      </Text>
                      <View style={styles.pickerView}>
                        <Image
                          source={require("../../assets/images/dropdown.png")}
                          style={styles.dropdonwImg}
                        />
                        <ModalSelector
                          data={supplierListArray.sort(function (a, b) {
                            return a.label < b.label
                              ? -1
                              : a.label > b.label
                              ? 1
                              : 0;
                          })}
                          childrenContainerStyle={[
                            styles.AddsignInput,
                            styles.selectMainInput,
                          ]}
                          selectStyle={styles.selectText}
                          optionContainerStyle={styles.selectCont}
                          optionTextStyle={styles.textStyle}
                          initValueTextStyle={styles.textStyle}
                          overlayStyle={styles.overlayText}
                          cancelStyle={styles.selectCont}
                          cancelContainerStyle={styles.cancelCont}
                          cancelText={"Cancel"}
                          initValue="Select Supplier recipe"
                          selectedKey={supplierKey}
                          onChange={(option) => {
                            if (option.key) {
                              setFieldValue("supplierRecipe", option.label);
                              setSuplierId(option.value);
                              setSupplierKey(option.key);
                              setSupplierName(option.label);
                            }
                          }}
                        />
                      </View>
                      {touched.supplierRecipe && errors.supplierRecipe && (
                        <Text
                          style={[
                            styles.signLabel,
                            { color: Colors.dangerRed },
                          ]}>
                          Please select Supplier For Recipe
                        </Text>
                      )}
                    </View>
                  </View>

                  <View style={[styles.flexrow]}>
                    <View
                      style={[
                        styles.popupInputBlk,
                        styles.wdth50,
                        styles.paddRL15,
                      ]}>
                      <Text style={[styles.signLabel, styles.textDefault]}>
                        Amount{" "}
                      </Text>
                      <TextInput
                        editable={false}
                        selectTextOnFocus={false}
                        style={styles.signInput}
                        placeholder='Amount'>
                        {recipeValues.price}
                      </TextInput>
                    </View>
                    <View
                      style={[
                        styles.popupInputBlk,
                        styles.wdth50,
                        styles.paddRL15,
                      ]}>
                      <Text style={[styles.signLabel, styles.textDefault]}>
                        Unit
                      </Text>
                      <TextInput
                        editable={false}
                        selectTextOnFocus={false}
                        style={styles.signInput}
                        placeholder='Unit'>
                        {recipeValues.unit}
                      </TextInput>
                    </View>
                  </View>

                  <View style={[styles.popuprow]}>
                    <Field
                      component={CustomInput}
                      name='quantity'
                      label='Quantity'
                      mandate={true}
                      keyboardType='numeric'
                    />
                    <Field
                      component={CustomInput}
                      name='criticalQty'
                      label='Critical Quantity'
                      mandate={true}
                      keyboardType='numeric'
                    />
                    <Field
                      component={CustomInput}
                      name='orderQty'
                      label='Order Quantity'
                      mandate={true}
                      keyboardType='numeric'
                    />
                  </View>
                  <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.popupBtnCon}>
                      <CustomButton
                        styles={styles.addCaaatBtn}
                        label={"Continue"}
                        onPress={handleSubmit}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  };
  const popupEditStock = () => {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === "ios"}>
        <View style={styles.popupContainer}>
          <View>
            <View style={styles.popupHeadWrap}>
              <Text style={styles.textStyle3}>Edit Stock</Text>
              <Pressable
                style={styles.closeView}
                onPress={() => toggleEditStock()}>
                <Image
                  source={require("../../assets/images/cross_icon.png")}
                  style={styles.crossIcon}
                />
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </View>

            <Formik
              validationSchema={stockValidationSchema}
              initialValues={{
                itemForRecipe: editStockData.productName,
                supplierRecipe: editStockData.supplierName,
                quantity: JSON.stringify(editStockData?.quantity),
                criticalQty:JSON.stringify(editStockData.criticalQuantity),
                orderQty: JSON.stringify(editStockData.orderQuantity),
                price: JSON.stringify(editStockData.price),
                unit: JSON.stringify(editStockData.unit),
              }}
              onSubmit={(values) => stockUpdate(values)}>
              {({
                handleSubmit,
                handleChange,
                isValid,
                values,
                setFieldValue,
                touched,
                errors,
              }) => (
                <View style={{ flex: 1, alignItems: "stretch" }}>
                  <View style={[styles.popuprow]}>
                    <View
                      style={[
                        styles.popupInputBlk,
                        styles.wdth50,
                        styles.paddRL15,
                      ]}>
                      <Text style={[styles.signLabel, styles.textDefault]}>
                        Select Item From Product
                        <Text style={[styles.font12, styles.textPri]}>*</Text>
                      </Text>
                      <View style={styles.pickerView}>
                        <Image
                          source={require("../../assets/images/dropdown.png")}
                          style={styles.dropdonwImg}
                        />
                        <ModalSelector
                          data={productListArray.sort(function (a, b) {
                            return a.label < b.label
                              ? -1
                              : a.label > b.label
                              ? 1
                              : 0;
                          })}
                          childrenContainerStyle={[
                            styles.AddsignInput,
                            styles.selectMainInput,
                          ]}
                          selectStyle={styles.selectText}
                          optionContainerStyle={styles.selectCont}
                          optionTextStyle={styles.textStyle}
                          initValueTextStyle={styles.textStyle}
                          overlayStyle={styles.overlayText}
                          cancelStyle={styles.selectCont}
                          cancelContainerStyle={styles.cancelCont}
                          cancelText={"Cancel"}
                          initValue={editStockData?.productName ? editStockData?.productName : recipeValues.key1}
                          // selectedKey={recipeValues.key1}
                          onChange={(option) => { 
                            if (option.key) {
                              setFieldValue("itemForRecipe", option.label);
                              // setProductValue(option.value)
                              setProductId(option.value);
                              handleInputChangeRecipe(
                                option.label,
                                "productName"
                              );
                              handleInputChangeRecipe(option.key, "key1");
                              handleInputChangeRecipe(option.unit, "unit");
                              handleInputChangeRecipe(option.price, "price");
                              handleInputChangeRecipe(option.key, "key2");
                            }
                          }}
                        />
                      </View>
                      {touched.itemForRecipe && errors.itemForRecipe && (
                        <Text
                          style={[
                            styles.signLabel,
                            { color: Colors.dangerRed },
                          ]}>
                          Select Ittom From Product is required
                        </Text>
                      )}
                    </View>
                    <View
                      style={[
                        styles.popupInputBlk,
                        styles.wdth50,
                        styles.paddRL15,
                      ]}>
                      <Text style={[styles.signLabel, styles.textDefault]}>
                        Select Supplier From Supplier
                        <Text style={[styles.font12, styles.textPri]}>*</Text>
                      </Text>
                      <View style={styles.pickerView}>
                        <Image
                          source={require("../../assets/images/dropdown.png")}
                          style={styles.dropdonwImg}
                        />
                        <ModalSelector
                          data={supplierListArray.sort(function (a, b) {
                            return a.label < b.label
                              ? -1
                              : a.label > b.label
                              ? 1
                              : 0;
                          })}
                          childrenContainerStyle={[
                            styles.AddsignInput,
                            styles.selectMainInput,
                          ]}
                          selectStyle={styles.selectText}
                          optionContainerStyle={styles.selectCont}
                          optionTextStyle={styles.textStyle}
                          initValueTextStyle={styles.textStyle}
                          overlayStyle={styles.overlayText}
                          cancelStyle={styles.selectCont}
                          cancelContainerStyle={styles.cancelCont}
                          cancelText={"Cancel"}
                          initValue={editStockData?.supplierName ? editStockData?.supplierName :supplierKey }
                          // selectedKey={supplierKey}
                          onChange={(option) => {
                            if (option.key) {
                              setFieldValue("supplierRecipe", option.label);
                              setSuplierId(option.value);
                              setSupplierKey(option.key);
                            }
                          }}
                        />
                      </View>
                      {touched.supplierRecipe && errors.supplierRecipe && (
                        <Text
                          style={[
                            styles.signLabel,
                            { color: Colors.dangerRed },
                          ]}>
                          Please select Supplier For Recipe
                        </Text>
                      )}
                    </View>
                  </View>

                  <View style={[styles.flexrow]}>
                    <View
                      style={[
                        styles.popupInputBlk,
                        styles.wdth50,
                        styles.paddRL15,
                      ]}>
                      <Text style={[styles.signLabel, styles.textDefault]}>
                        Amount
                      </Text>
                      <TextInput
                        editable={false}
                        selectTextOnFocus={false}
                        style={styles.signInput}
                        placeholder='Amount'>
                      </TextInput>
                    </View>
                    <View
                      style={[
                        styles.popupInputBlk,
                        styles.wdth50,
                        styles.paddRL15,
                      ]}>
                      <Text style={[styles.signLabel, styles.textDefault]}>
                        Unit 
                      </Text>
                      <TextInput
                        editable={false}
                        selectTextOnFocus={false}
                        style={styles.signInput}
                        placeholder='Unit'>
                      </TextInput>
                    </View>
                  </View>

                  <View style={[styles.popuprow]}>
                    <Field
                      component={CustomInput}
                      name='quantity'
                      label='Quantity'
                      mandate={true}
                      keyboardType='numeric'
                    />
                    <Field
                      component={CustomInput}
                      name='criticalQty'
                      label='Critical Quantity'
                      mandate={true}
                      keyboardType='numeric'
                    />
                    <Field
                      component={CustomInput}
                      name='orderQty'
                      label='Order Quantity'
                      mandate={true}
                      keyboardType='numeric'
                    />
                  </View>
                  <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.popupBtnCon}>
                      <CustomButton
                        styles={styles.addCaaatBtn}
                        label={"Continue"}
                        onPress={handleSubmit}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  };
  return (
    <>
      <View style={[styles.waterheader, styles.headerBlk]}>
        <View style={styles.headerFlexCenter}>
          <View style={[styles.headerFlexCenter, styles.headerLeftSec]}>
            <Image
              style={styles.headerLogo}
              source={require("../../assets/images/logo.png")}
            />
            {userRoleId === constRoleId.PRODUCT_ADMIN_ID ? (
              <View>
                <View>
                  <View style={styless.headerFlexCenter}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Restaurant")}
                      style={[styless.resFlex, styless.headingMargin]}>
                      <Text style={[styless.headingText]}>{restaurant}</Text>
                      <Image
                        style={styless.dropDownIcon}
                        source={require("../../assets/images/chevron_left.png")}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.headerFlexCenter}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SelectOutlet", {
                          outletId: outletId,
                        })
                      }
                      style={[styless.resFlex, styless.headingMargin]}>
                      <Text
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        style={[styless.headingText, styless.width100px]}>
                        {outletName}
                      </Text>
                      <Image
                        style={styless.dropDownIcon}
                        source={require("../../assets/images/chevron_left.png")}
                      />
                    </TouchableOpacity>
                    <View style={[styles.headerFlexCenter, styles.online]}>
                      <View style={styles.onlineCircle}></View>
                      <Text style={styles.onlineText}>Online</Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <View style={styless.headerFlexCenter}>
                  <Text style={[styless.headingText]}>{restName}</Text>
                  <Image
                    style={styless.dropDownIcon}
                    source={require("../../assets/images/chevron_left.png")}
                  />
                </View>
                <View style={styles.headerFlexCenter}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("SelectOutlet", {
                        outletId: outletId,
                      })
                    }
                    style={[styless.resFlex, styless.headingMargin]}>
                    <Text
                      ellipsizeMode='tail'
                      numberOfLines={1}
                      style={[styless.headingText, styless.width100px]}>
                      {outletName}
                    </Text>
                    <Image style={styless.dropDownIcon} source={(require('../../assets/images/chevron_left.png'))} />
                  </TouchableOpacity>
                  <View style={[styles.headerFlexCenter, styles.online]}>
                    <View style={styles.onlineCircle}></View>
                    <Text style={styles.onlineText}>Online</Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={[styles.dashboardMenuHeader]}>
            <View>
              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID ||
                userRoleId === constRoleId.COMPANY_ADMIN_ID ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Dashboard")}>
                      <View
                        style={[
                          styles.dashboardHeader,
                          styles.headerRightBorder,
                        ]}>
                        <DashboardIcon />
                        <Text
                          style={[
                            styles.font13,
                            styles.menuText,
                            styles.fontBold,
                            styles.padtop5,
                          ]}>
                          Dashboard
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : dashboardPermission[0]?.isFormAccess === true ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Dashboard")}>
                      <View
                        style={[
                          styles.dashboardHeader,
                          styles.headerRightBorder,
                        ]}>
                        <DashboardIcon />
                        <Text
                          style={[
                            styles.font13,
                            styles.menuText,
                            styles.fontBold,
                            styles.padtop5,
                          ]}>
                          Dashboard
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>

            <View>
              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID ||
                userRoleId === constRoleId.COMPANY_ADMIN_ID ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("DineIn")}>
                      <View
                        style={[
                          styles.dashboardHeader,
                          styles.headerRightBorder,
                        ]}>
                        <DineInIcon />
                        <Text
                          style={[
                            styles.font13,
                            styles.menuText,
                            styles.fontBold,
                            styles.padtop5,
                          ]}>
                          Dine In
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : dineInPermission[0]?.isFormAccess === true ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("DineIn")}>
                      <View
                        style={[
                          styles.dashboardHeader,
                          styles.headerRightBorder,
                        ]}>
                        <DineInIcon />
                        <Text
                          style={[
                            styles.font13,
                            styles.menuText,
                            styles.fontBold,
                            styles.padtop5,
                          ]}>
                          Dine In
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>

            <View>
              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID ||
                userRoleId === constRoleId.COMPANY_ADMIN_ID ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("TakeAway")}>
                      <View
                        style={[
                          styles.dashboardHeader,
                          styles.headerRightBorder,
                        ]}>
                        <TakeAwayIcon />
                        <Text
                          style={[
                            styles.font13,
                            styles.menuText,
                            styles.fontBold,
                            styles.padtop5,
                          ]}>
                          Take Away
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : takeAwayPermission[0]?.isFormAccess === true ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("TakeAway")}>
                      <View
                        style={[
                          styles.dashboardHeader,
                          styles.headerRightBorder,
                        ]}>
                        <TakeAwayIcon />
                        <Text
                          style={[
                            styles.font13,
                            styles.menuText,
                            styles.fontBold,
                            styles.padtop5,
                          ]}>
                          Take Away
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>

            <View>
              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID ||
                userRoleId === constRoleId.COMPANY_ADMIN_ID ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Online")}>
                      <View
                        style={[
                          styles.dashboardHeader,
                          styles.headerRightBorder,
                        ]}>
                        <OnlineIcon />
                        <Text
                          style={[
                            styles.font13,
                            styles.menuText,
                            styles.fontBold,
                            styles.padtop5,
                          ]}>
                          Online
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : onlinePermission[0]?.isFormAccess === true ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Online")}>
                      <View
                        style={[
                          styles.dashboardHeader,
                          styles.headerRightBorder,
                        ]}>
                        <OnlineIcon />
                        <Text
                          style={[
                            styles.font13,
                            styles.menuText,
                            styles.fontBold,
                            styles.padtop5,
                          ]}>
                          Online
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>

            <View>
              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID ||
                userRoleId === constRoleId.COMPANY_ADMIN_ID ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Inventory")}>
                      <View
                        style={[
                          styles.dashboardHeader,
                          styles.headerRightBorder,
                          styles.headerLeftBorder,
                          styles.dashMenuActive,
                        ]}>
                        <InvenIcon />
                        <Text
                          style={[
                            styles.font13,
                            styles.priText,
                            styles.fontBold,
                            styles.padtop5,
                          ]}>
                          Inventory
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : mastersPermission[0]?.isFormAccess === true ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Inventory")}>
                      <View
                        style={[
                          styles.dashboardHeader,
                          styles.headerRightBorder,
                          styles.headerLeftBorder,
                          styles.dashMenuActive,
                        ]}>
                        <InvenIcon />
                        <Text
                          style={[
                            styles.font13,
                            styles.priText,
                            styles.fontBold,
                            styles.padtop5,
                          ]}>
                          Inventory
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>

            <View>
              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID ||
                userRoleId === constRoleId.COMPANY_ADMIN_ID ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Kitchen")}>
                      <View
                        style={[
                          styles.dashboardHeader,
                          styles.headerRightBorder,
                        ]}>
                        <KitchenIcon />
                        <Text
                          style={[
                            styles.font13,
                            styles.menuText,
                            styles.fontBold,
                            styles.padtop5,
                          ]}>
                          Kitchen
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : kitchenPermission[0]?.isFormAccess ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Kitchen")}>
                      <View
                        style={[
                          styles.dashboardHeader,
                          styles.headerRightBorder,
                        ]}>
                        <KitchenIcon />
                        <Text
                          style={[
                            styles.font13,
                            styles.menuText,
                            styles.fontBold,
                            styles.padtop5,
                          ]}>
                          Kitchen
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>

            <View>
              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID ||
                userRoleId === constRoleId.COMPANY_ADMIN_ID ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Bar")}>
                      <View
                        style={[
                          styles.dashboardHeader,
                          styles.headerRightBorder,
                        ]}>
                        <BarIcon />
                        <Text
                          style={[
                            styles.font13,
                            styles.menuText,
                            styles.fontBold,
                            styles.padtop5,
                          ]}>
                          Bar
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : barPermission[0]?.isFormAccess === true ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Bar")}>
                      <View
                        style={[
                          styles.dashboardHeader,
                          styles.headerRightBorder,
                        ]}>
                        <BarIcon />
                        <Text
                          style={[
                            styles.font13,
                            styles.menuText,
                            styles.fontBold,
                            styles.padtop5,
                          ]}>
                          Bar
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>

            <View>
              <View>
                {userRoleId === constRoleId.PRODUCT_ADMIN_ID ||
                userRoleId === constRoleId.COMPANY_ADMIN_ID ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("ReportsDashboard")}>
                      <View style={[styles.dashboardHeader]}>
                        <ReportIcon />
                        <Text
                          style={[
                            styles.font13,
                            styles.menuText,
                            styles.fontBold,
                            styles.padtop5,
                          ]}>
                          Reports
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : reportsPermission[0]?.isFormAccess === true ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("ReportsDashboard")}>
                      <View style={[styles.dashboardHeader]}>
                        <ReportIcon />
                        <Text
                          style={[
                            styles.font13,
                            styles.menuText,
                            styles.fontBold,
                            styles.padtop5,
                          ]}>
                          Reports
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </View>
        <View style={styless.headerFlexCenter}>
          <View>
            <Appbar.Action
              style={{ alignSelf: "flex-end" }}
              icon='menu'
              onPress={() => navigation.openDrawer()}
            />
          </View>
        </View>
      </View>
      <ScrollView style={[styles.categoryBlkCon]}>
        <View style={[styles.textcontainer1, styles.catSubBlk]}>
          <Text style={styles.textStyle1}>Stock</Text>
          <View></View>

          <TouchableOpacity onPress={() => openAddStock()}>
            <View style={styles.textcontainer2}>
              <Text style={styles.textStyle2}>Add Stock</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.paddB60]}>
          <View style={styles.table}>
            {!isDataPresent ? (
              // no record HTML
              <View style={styles.noRecordFoundView}>
                <Image
                  style={styles.noRecordImage}
                  source={require("../../assets/images/clipboard.png")}
                />
                <View>
                  <Text style={styles.recordDisplay}>
                    There are no Stock to display.
                  </Text>
                </View>

                <View style={styles.noRecordItem}>
                  <Text style={styles.addText} onPress={() => openAddStock()}>
                    Add Stock
                  </Text>
                  <Text style={styles.recordDisplay}>to continue.</Text>
                </View>
              </View>
            ) : (
              // no record HTML Ends
              <ProductSupplierMaster
                data={data}
                sendEditData={sendDataToParent}
                updateDelete={() => getProductSupplierMasterList()}
              />
            )}
          </View>

          {openStock && (
            <Modal isVisible={openStock} style={styles.popup}>
              {popupAddStock()}
            </Modal>
          )}
          {editStock && (
            <Modal isVisible={editStock} style={styles.popup}>
              {popupEditStock()}
            </Modal>
          )}
          {openSuccessMsg && (
            <Modal isVisible={openSuccessMsg}>{SuccessPopup()}</Modal>
          )}
          {openUpdateSuccessMsg && (
            <Modal isVisible={openUpdateSuccessMsg}>
              {SuccessUpdatePopup()}
            </Modal>
          )}
          {openInternetdownMsg && (
            <Modal isVisible={openInternetdownMsg}>{internetDownPop()}</Modal>
          )}
          {alreadyExist && (
            <Modal isVisible={alreadyExist}>{alreadyPopup()}</Modal>
          )}
          {errormsg && <Modal isVisible={errormsg}>{errorPopup()}</Modal>}
        </View>
      </ScrollView>
    </>
  );
}

