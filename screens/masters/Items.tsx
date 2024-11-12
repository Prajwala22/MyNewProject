/**
 * Generated class for the Items Page.
 *Created by himanshu on 23/02/2022
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import Toast from 'react-native-root-toast';
import * as yup from 'yup';
import styles from '../../assets/css/style';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Header from '../../components/SidemeuItemsScreenHeader';
import TableViewItems from './TableViewItems';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import Colors from '../constants/colors';



export default function Items({ navigation, route }: { navigation: any, route: any }) {
  const [categoryIdItemclear, setcategoryIdItemclear] = useState('');

  const [isDataPresent, setDataPreset] = useState(false);
  const [openItem, setOpenItem] = useState(false);
  const [openEditItems, setOpenEditItems] = useState(false);
  const [editItems, setEditItems] = useState({});
  const [itemData, setItemData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [userData, setUserData] = useState();
  const [outletData, setOutletData] = useState([]);
  const [outletChecked, setOutletChecked] = useState([]);
  const [data, setData] = useState([]);
  const [catKey, setCatKey] = useState(0);

  const optionsPerPage = [2, 3, 4];
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  var count = 1;
  const categoryId: any = "";
  const isFocused = useIsFocused();
  const [checked, setChecked] = React.useState(true);
  const [itemLength, setItemLength] = useState('')



  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const addItemsValidationSchema = yup.object().shape({
    itemName: yup
      .string()
      .required('Item Name is required'),
    itemAmount: yup
      .string()
      .required('Item Amount is required'),
    itemDescription: yup
      .string()
      .required('Item Description is required'),
  })
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    });
    return unsubscribe;
  }, [navigation]);
  /// Get the Item list
  useEffect(() => {

    getItemList();
    return () => {
      +
        setData([]);
    }
  }, [isFocused]);

  const getItemList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    const categoyitem = await AsyncStorage.getItem('categoryIdItem')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    setUserData(loginData)
    var myJson = {
      IsAllItem: true,
      OutletId: outletId,
    }
    const result = await api.CreateMasterData(endPoint.GET_ITEMS, token, myJson);
    setItemLength(result.data.length)
    if (result.data.length === 0) {
      Toast.show("Some Error occured. Please try again.");
      setDataPreset(false);
    } else {
      if (categoyitem) {
        const filterdata = result.data.filter(item => item.itemCategoryId == categoyitem)
        setData(filterdata);
        setcategoryIdItemclear(categoyitem)
      } else {
        setData(result.data);
      }
      setDataPreset(true);
    }

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

  const openAddItems = () => {
    setOpenItem(true);
    setOutletChecked([]);
    getOutletList()
    getCategory()
  }

  const ClearItems = async () => {
    const categoyitem = await AsyncStorage.setItem('categoryIdItem', '')
    getItemList()
    setcategoryIdItemclear('')
  }

  const toggleModal = () => {
    getCategory()
    setOpenItem(!openItem)
  };

  const toggleItemsEdit = () => {
    getCategory()
    setOpenEditItems(!openEditItems)
  };
  //Get Category List
  const getCategory = async () => {
    const result_cat = await api.getAllMasterData(userData.token, endPoint.GET_CATEGORY + userData.outletId);
    if (JSON.stringify(result_cat.data) === null || JSON.stringify(result_cat.data) === "null" || result_cat.data === "") {
      Alert.alert("Some Error occured. Please try again.");
    } else {
      setCategoryData(result_cat.data);
    }

  };


  //Add Items
  const handleSubmit = async (data) => {

    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    let itemObj = {
      itemName: data.itemName,
      description: data.itemDescription,
      isActive: checked,
      itemCategoryId: data.itemCategory,
      itemSubCategoryId: "string",
      itemAmount: parseInt(data.itemAmount),
      bomDetails: [
      ],
      isReadyMade: true,
      modifiers: [
        "string"
      ],
      discount: [
      ],
      imageName: "",
      imagePath: null,
      imageExtension: "",
    }
    var myJson = {
      item: itemObj,
      outlets: data.itemOutlet

    }
    const result = await api.CreateMasterData(endPoint.CREATE_ITEMS, token, myJson);
   
    if (itemLength >= '2') {
      setOpenItem(false);
      getItemList();
    } else {
      setOpenItem(false);
      navigation.navigate('MapAddingData')
    }

  }
  //Update Items
  const updateItems = async (data) => {

    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    let itemObj = {
      id: editItems.id,
      itemName: data.itemName,
      description: data.itemDescription,
      itemCategoryId: data.itemCategory,
      isActive: checked,
      itemAmount: parseInt(data.itemAmount),
      bomDetails: [
      ],
      isReadyMade: true,
      modifiers: [
        "string"
      ],
      discount: [
      ],
      imageName: "",
      imagePath: null,
      imageExtension: "",
    }
    var myJson = {

      item: itemObj,
      outlets: outletChecked

    }

    const result = await api.UpdateMasterData(endPoint.EDIT_ITEMS + editItems.id, token, myJson);
    if (JSON.stringify(result.data) === null) {
      Toast.show("Some Error occured. Please try again.");
    } else {
      // Add a Toast on screen.
      Toast.show('Items Updated successfully', {
        duration: Toast.durations.LONG,
      });
      setOpenEditItems(false);
      getItemList();

    }

  }
  const sendDataToParent = (data) => { // the callback. Use a better name

    const selectCategoryarray = catarray.filter((item) => item.value == data.itemCategoryId)
    setCatKey(selectCategoryarray[0]?.key)

    setEditItems(data)
    setChecked(data.isActive)
    setOpenEditItems(true)
    setOutletChecked(data.outlets)
  };

  let catarray = categoryData.map((s, i) => {
    let newData = {
      key: i,
      label: s.categoryName,
      value: s.categoryId
    }
    return newData


  })
  //Add Item Popup
  const popupAddItem = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>

          <View>
            <View style={styles.popupHeadWrap}>
              <Text style={styles.textStyle3}>
                Add Items
              </Text>
              <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                <Text style={styles.closeText}>
                  Close
                </Text>
              </Pressable>
            </View>

            <Formik
              validationSchema={addItemsValidationSchema}
              initialValues={{
                itemCategory: '',
                itemName: '',
                itemAmount: '',
                itemDescription: '',
                itemOutlet: []
              }}
              onSubmit={values => handleSubmit(values)}
            >
              {({ handleSubmit, handleChange, isValid, values, setFieldValue, touched, errors }) => (
                <View style={{ flex: 1, alignItems: 'stretch', }} >
                  <View style={[styles.popuprow]}>
                    <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                      <Text style={[styles.signLabel, styles.textDefault]}>Select Category<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                      <View style={styles.pickerView}>

                        <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
                        <ModalSelector
                          data={catarray}
                          childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                          selectStyle={styles.selectText}
                          optionContainerStyle={styles.selectCont}
                          optionTextStyle={styles.textStyle}
                          initValueTextStyle={styles.textStyle}
                          overlayStyle={styles.overlayText}
                          cancelStyle={styles.selectCont}
                          cancelContainerStyle={styles.cancelCont}
                          cancelText={"Cancel"}
                          initValue="Select Category"
                          selectedKey={catKey}
                          onChange={(option) => {
                            if (option.key) {
                              setFieldValue('itemCategory', option.value)
                              setCatKey(option.key)
                            }
                          }}
                        />
                      </View>
                      {touched.itemCategory && errors.itemCategory &&
                        <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Please select Category </Text>

                      }
                    </View>

                    <Field
                      component={CustomInput}
                      name="itemName"
                      label="Item Name"
                    />

                  </View>
                  <View style={[styles.popuprow]}>
                    <Field
                      component={CustomInput}
                      name="itemAmount"
                      label="Item Amount"
                      keyboardType="numeric"
                    />
                    <Field
                      component={CustomInput}
                      name="itemDescription"
                      label="Item Description"
                    />


                    <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                      <Text style={[styles.signLabel, styles.textDefault]}>Select Outlets</Text>
                      <FlatList
                        data={outletData}
                        horizontal
                        renderItem={({ item }) =>
                          <View style={styles.checkboxContainer}>
                            <View style={[styles.paddR15]}>
                              <TouchableOpacity style={styles.flexAlignRow}
                                onPress={() => {
                                  const newIds = [...outletChecked];
                                  const index = newIds.indexOf(item.outletId);
                                  if (index > -1) {
                                    newIds.splice(index, 1);
                                  } else {
                                    newIds.push(item.outletId)
                                  }
                                  setOutletChecked(newIds)
                                  setFieldValue('itemOutlet', newIds)

                                }

                                }>
                                <View style={[styles.checkbox, outletChecked.includes(item.outletId) && styles.radioBtnChecked]}>
                                  {
                                    (outletChecked.includes(item.outletId)) ? <View style={styles.checkTick}></View> : null
                                  }
                                </View>
                                <Text style={styles.promoValue}>{item.outletName}</Text>

                              </TouchableOpacity>
                            </View>
                          </View>}
                        keyExtractor={item => item.outletId} />
                    </View>
                    <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                      <Text style={[styles.signLabel, styles.textDefault]}>Item Status</Text>
                      <View style={styles.flexAlignRow}>
                        <View style={[styles.flexAlignRow, styles.paddR15]}>
                          {/* <RadioButton
                          value={checked}
                          status={checked === true ? 'checked' : 'unchecked'}
                          onPress={() => { setChecked(true) }}
                        />
                        <Text style={[styles.textDefault,]}>True</Text> */}
                          <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setChecked(true) }}>
                            <View style={[styles.radioButton, checked === true && styles.radioBtnChecked]}>
                              {
                                (checked === true) ? <View style={styles.radioBtnView}></View> : null
                              }
                            </View>
                            <Text style={[styles.promoValue]}>True</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={[styles.flexAlignRow, styles.paddR15]}>
                          {/* <RadioButton
                          value={checked}
                          status={checked === false ? 'checked' : 'unchecked'}
                          onPress={() => { setChecked(false) }}
                        />
                        <Text style={[styles.textDefault,]}>False</Text> */}
                          <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setChecked(false) }}>
                            <View style={[styles.radioButton, checked === false && styles.radioBtnChecked]}>
                              {
                                (checked === false) ? <View style={styles.radioBtnView}></View> : null
                              }
                            </View>
                            <Text style={[styles.promoValue]}>False</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.popupBtnCon}>
                      <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={handleSubmit} />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

          </View>


        </View>
      </KeyboardAwareScrollView>

    );
  }

  //Edit Item Popup
  const popupEditItems = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>

          <View>
            <View style={styles.popupHeadWrap}>
              <Text style={styles.textStyle3}>
                Edit Items
              </Text>
              <Pressable style={styles.closeView} onPress={() => toggleItemsEdit()}>
                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                <Text style={styles.closeText}>
                  Close
                </Text>
              </Pressable>
            </View>
            <View>


              <Formik
                validationSchema={addItemsValidationSchema}
                initialValues={{
                  itemCategory: editItems.itemCategoryId,
                  itemName: editItems.itemName,
                  itemAmount: JSON.stringify(editItems.itemAmount),
                  itemDescription: editItems.description,
                  itemOutlet: editItems.outlets
                }}
                onSubmit={values => updateItems(values)}
              >
                {({ handleSubmit, handleChange, isValid, values, setFieldValue, touched, errors }) => (
                  <View style={{ flex: 1, alignItems: 'stretch', }} >
                    <View style={[styles.popuprow]}>
                      <View style={[styles.signViewBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Select Category<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                        <View style={styles.pickerView}>

                          <ModalSelector
                            data={catarray}
                            childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                            selectStyle={styles.selectText}
                            optionContainerStyle={styles.selectCont}
                            optionTextStyle={styles.textStyle}
                            initValueTextStyle={styles.textStyle}
                            overlayStyle={styles.overlayText}
                            cancelStyle={styles.selectCont}
                            cancelContainerStyle={styles.cancelCont}
                            cancelText={"Cancel"}
                            initValue="Select Category"
                            selectedKey={catKey}
                            onChange={(option) => {

                              if (option.key) {
                                setFieldValue('itemCategory', option.value)
                                setCatKey(option.key)
                              }


                            }}
                          />
                        </View>
                        {touched.itemCategory && errors.itemCategory &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Please select Table Type</Text>

                        }
                      </View>
                      <Field
                        component={CustomInput}
                        name="itemName"
                        label="Item Name"
                      />
                    </View>
                    <View style={[styles.popuprow]}>
                      <Field
                        component={CustomInput}
                        name="itemAmount"
                        label="Item Amount"
                        keyboardType="numeric"
                      />
                      <Field
                        component={CustomInput}
                        name="itemDescription"
                        label="Item Description"
                      />

                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Select Outlets</Text>
                        <FlatList
                          data={outletData}
                          horizontal
                          renderItem={({ item }) =>
                            <View style={styles.checkboxContainer}>
                              <View style={[styles.paddR15]}>
                                <TouchableOpacity style={styles.flexAlignRow}
                                  onPress={() => {
                                    const newIds = [...outletChecked];
                                    const index = newIds.indexOf(item.outletId);
                                    if (index > -1) {
                                      newIds.splice(index, 1);
                                    } else {
                                      newIds.push(item.outletId)
                                    }
                                    setOutletChecked(newIds)
                                    setFieldValue('itemOutlet', newIds)
                                  }
                                  }>
                                  <View style={[styles.checkbox, outletChecked.includes(item.outletId) && styles.radioBtnChecked]}>
                                    {
                                      (outletChecked.includes(item.outletId)) ? <View style={styles.checkTick}></View> : null
                                    }
                                  </View>
                                  <Text style={styles.promoValue}>{item.outletName}</Text>

                                </TouchableOpacity>
                              </View>
                            </View>
                          }
                          keyExtractor={item => item.outletId} />
                      </View>
                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Item Status</Text>
                        {/* <View style={styles.flexAlignRow}>
                          <View style={styles.flexAlignRow}>
                            <RadioButton
                              value={checked}
                              status={checked === true ? 'checked' : 'unchecked'}
                              onPress={() => { setChecked(true) }}
                            />
                            <Text style={[styles.textDefault,]}>True</Text>
                          </View>
                          <View style={styles.flexAlignRow}>
                            <RadioButton
                              value={checked}
                              status={checked === false ? 'checked' : 'unchecked'}
                              onPress={() => { setChecked(false) }}
                            />
                            <Text style={[styles.textDefault,]}>False</Text>
                          </View>
                        </View> */}
                        <View style={styles.flexAlignRow}>
                          <View style={[styles.flexAlignRow, styles.paddR15]}>
                            <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setChecked(true) }}>
                              <View style={[styles.radioButton, checked === true && styles.radioBtnChecked]}>
                                {
                                  (checked === true) ? <View style={styles.radioBtnView}></View> : null
                                }
                              </View>
                              <Text style={[styles.promoValue]}>Active</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={[styles.flexAlignRow, styles.paddR15]}>
                            <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setChecked(false) }}>
                              <View style={[styles.radioButton, checked === false && styles.radioBtnChecked]}>
                                {
                                  (checked === false) ? <View style={styles.radioBtnView}></View> : null
                                }
                              </View>
                              <Text style={[styles.promoValue]}>In Active</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity onPress={handleSubmit}>
                      <View style={styles.popupBtnCon}>
                        <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={handleSubmit} />
                      </View>
                    </TouchableOpacity>

                  </View>
                )}
              </Formik>

            </View>
          </View>


        </View>
      </KeyboardAwareScrollView>
    );
  }
  //HTML For Items
  return (
    <>
      <Header heading={"Item"} />
      <View style={styles.categoryBlkCon}>
        <View style={[styles.textcontainer1, styles.catSubBlk]}>
          <Text style={[styles.textStyle1, styles.categoryHead]}>
            Items
          </Text>
          <View style={styles.itemFlex}>
            <TouchableOpacity onPress={() => openAddItems()}>
              <View>
                <CustomButton label={'Add Items'} onPress={() => openAddItems()} customstyles={styles.addCategoryBtn} />
              </View>
            </TouchableOpacity>
            {
              (categoryIdItemclear) ? <View>
                <TouchableOpacity onPress={() => ClearItems()}>
                  <View>
                    <CustomButton label={'Get All Items'} onPress={() => ClearItems()} customstyles={styles.addCategoryBtn} />
                  </View>
                </TouchableOpacity></View> : null
            }
          </View>
        </View>

        <ScrollView>
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
                  <Text style={styles.recordDisplay}>There are no Items to display.</Text>
                </View>

                <View style={styles.noRecordItem}>
                  <Text style={styles.addText} onPress={() => openAddItems()}>
                    Add Items
                  </Text>
                  <Text style={styles.recordDisplay}>
                    to continue.
                  </Text>
                </View>
              </View>
              :
              <TableViewItems data={data} sendEditData={sendDataToParent} updateDelete={() => getItemList()} />
              // no record HTML Ends
            }

          </View>

          {openItem &&
            <Modal isVisible={openItem}>
              {popupAddItem()}
            </Modal>
          }

          {openEditItems &&
            <Modal isVisible={openEditItems}>
              {popupEditItems()}
            </Modal>
          }
        </ScrollView>
      </View>

    </>


  );
  //HTML For Items Ends


}