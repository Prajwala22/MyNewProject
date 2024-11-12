/**
 * Generated class for the Category Page.
 * Created by himanshu on 23/02/2022
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import Toast from 'react-native-root-toast';
import * as yup from 'yup';
import styles from '../../assets/css/style';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Header from '../../components/sideMenuHeaderMaster';
import TableView from '../../components/TableViewcategory';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import Colors from '../constants/colors';
import { Platform } from 'react-native';



export default function Category({ navigation, route }: { navigation: any, route: any }) {

  const [isDataPresent, setDataPreset] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [editData, setEditData] = useState(null);
  const [locationKey, setLocationKey] = useState(0);
  const [locationError, setErrorMessage] = useState('Select Location');
  const [data, setData] = useState([]);
  const optionsPerPage = [2, 3, 4];
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [catDataLength, setCatDataLength] = useState('0')
  const [openSuccessMsg, setopenSuccessMsg] = useState(false);
  const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false);


  var count = 1;
  const categoryId: any = "";
  const isFocused = useIsFocused();
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    });
    return unsubscribe;
  }, [navigation]);

  /// Get the category list
  useEffect(() => {
    getCategoryList();
    return () => {
      setData([]);
    }
  }, [isFocused]);

  const getCategoryList = async () => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;
    const result = await api.getAllMasterData(token, endPoint.GET_CATEGORY + outletId);
    setCatDataLength(result.data.length)
    if (result.data.length === 0) {
      // Toast.show("Some Error occured. Please try again.");
      setDataPreset(false);
    } else {
      setData(result.data);
      setDataPreset(true);
    }
  }

  const openAddCategory = () => {
    setOpenCategory(true)
  }

  const toggleModal = () => {
    setLocationKey(0)
    setOpenCategory(!openCategory)
  };

  const toggleEdit = () => {
    setLocationKey(0)
    setEditCategory(!editCategory)
  };

  const addCategoryValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name of the Category is required'),
    categoryCode: yup
      .string()
      .required('Category Code is required'),
    location: yup
      .string()
      .required('Location is required'),
    categoryDescription: yup
      .string()
      .required('Category Description is required'),
  })
  //Create Category
  const handleSubmit = async (data) => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    var myJson = {
      categoryName: data.name,
      categoryCode: data.categoryCode,
      description: data.categoryDescription,
      outletId: outletId,
      location: data.location
    }
    const result = await api.CreateMasterData(endPoint.CREATE_CATEGORY, token, myJson);
    if (catDataLength >= '1') {
      getCategoryList();
      setOpenCategory(false)
      successOpen()
    } else {
      // Add a Toast on screen.
      navigation.navigate('MapAddingData')
      setOpenCategory(false)
    }
    setLocationKey(0)
  }
  // Create Success msg 
  const successOpen = () => {
    setopenSuccessMsg(!openSuccessMsg)
  }

  const SuccessPopup = () => {
    return (
      // success popup
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
          <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Category Created Successfully</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => successOpen()}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - Ends
    );
  }
  //Update Category
  const updateCategory = async (data) => {
    const jsonValue: any = await AsyncStorage.getItem('userInfo')
    let loginData = JSON.parse(jsonValue);
    let token = loginData.token;
    let outletId = loginData.outletId;

    var myJson = {
      categoryId: editData.categoryId,
      categoryName: data.name,
      categoryCode: data.categoryCode,
      description: data.categoryDescription,
      outletId: outletId,
      location: data.location
    }


    const result = await api.UpdateMasterData(endPoint.EDIT_CATEGORY + editData.categoryId, token, myJson);
    if (JSON.stringify(result.data) === null) {

      Toast.show("Some Error occured. Please try again.");
    } else {
      // Add a Toast on screen.
      // Toast.show('Category Updated Successfully', {
      //   duration: Toast.durations.LONG,
      // });
      successOpenUpdate()
      setEditCategory(false)
      getCategoryList();
      setLocationKey(0)
    }

  }

  // Update Success msg 
  const successOpenUpdate = () => {
    setopenUpdateSuccessMsg(!openUpdateSuccessMsg)
  }
  const SuccessUpdatePopup = () => {
    return (
      // success popup
      <View style={[styles.flexrow, styles.justifyCenter]}>
        <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.SuccessPopup]}>
          <Text style={[styles.font24, styles.textBlack, styles.fontBold, styles.marBtm8]}>Success!</Text>
          <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Category Updated Successfully</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => successOpenUpdate()}>
            <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      // success popup - Ends
    );
  }
  const sendDataToParent = (data) => { // the callback. Use a better name

    const selectlocationlocationarray = locationDropDownData.filter((item) => item.value == data.location)
    setLocationKey(selectlocationlocationarray[0]?.key)

    setEditData(data)
    setEditCategory(true)
  };

  const locationDropDownData = [
    { key: 1, label: 'Kitchen', value: 'Kitchen' },
    { key: 2, label: 'Warehouse', value: 'Warehouse' },
  ]

  let locationArray = locationDropDownData.map((s, i) => {
    return (
      <Picker.Item key={i} value={s.value} label={s.label} />
    )
  })


  const popupAddCategory = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>

          <View>
            <View style={styles.popupHeadWrap}>
              <Text style={styles.textStyle3}>
                Add Category
              </Text>
              <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                <Text style={styles.closeText}>
                  Close
                </Text>
              </Pressable>
            </View>

            <Formik
              validationSchema={addCategoryValidationSchema}
              initialValues={{
                name: '',
                categoryCode: '',
                location: '',
                categoryDescription: '',
              }}
              onSubmit={values => handleSubmit(values)}
            >
              {({ handleSubmit, handleChange, isValid, values, setFieldValue, touched, errors }) => (
                <View >
                  <View style={[styles.popuprow]}>
                    <Field
                      component={CustomInput}
                      name="name"
                      label="Name of the Category"
                      mandate={true}

                    />
                    <Field
                      component={CustomInput}
                      name="categoryCode"
                      label="Category Code"
                      mandate={true}
                    />
                  </View>
                  <View style={[styles.popuprow]}>
                    <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                      <Text style={[styles.signLabel, styles.textDefault]}>Select Location<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                      <View style={styles.pickerView}>

                        <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
                        <ModalSelector
                          data={locationDropDownData}
                          childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                          selectStyle={styles.selectText}
                          optionContainerStyle={styles.selectCont}
                          optionTextStyle={styles.textStyle}
                          overlayStyle={styles.overlayText}
                          initValueTextStyle={styles.textStyle}
                          cancelStyle={styles.selectCont}
                          cancelContainerStyle={styles.cancelCont}
                          cancelText={"Cancel"}
                          initValue="Select Location"
                          selectedKey={locationKey}
                          onChange={(option) => {
                            if (option.key) { // workaround for ios https://github.com/peacechen/react-native-modal-selector/issues/140
                              setFieldValue('location', option.value)
                              setLocationKey(option.key)
                            }

                          }}
                        />
                      </View>

                      {touched.location && errors.location &&
                        <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Select Location is required.</Text>

                      }
                    </View>

                    <Field
                      component={CustomInput}
                      name="categoryDescription"
                      label="Category Description"
                      mandate={false}
                    />
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
  //-------------------------------Edit Category PopUp------------------------------------------

  const popupEditCategory = () => {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={styles.popupContainer}>

          <View>
            <View>
              <View style={styles.popupHeadWrap}>
                <Text style={styles.textStyle3}>
                  Edit Category
                </Text>
                <Pressable style={styles.closeView} onPress={() => toggleEdit()}>
                  {/* <Icon name={'cross'} color={Colors.black} size={20} /> */}
                  <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </Pressable>
              </View>

              <Formik
                validationSchema={addCategoryValidationSchema}
                initialValues={{
                  name: editData.categoryName,
                  categoryCode: editData.categoryCode,
                  location: editData.location,
                  categoryDescription: editData.description,
                }}
                onSubmit={values => updateCategory(values)}
              >
                {({ handleSubmit, handleChange, isValid, values, setFieldValue, touched, errors }) => (
                  <View>
                    <View style={[styles.popuprow]}>
                      <Field
                        component={CustomInput}
                        name="name"
                        label="Name of the Category"
                        mandate={true}
                      />
                      <Field
                        component={CustomInput}
                        name="categoryCode"
                        label="Category Code"
                        mandate={true}
                      />
                    </View>
                    <View style={[styles.popuprow]}>
                      <View style={[styles.popupInputBlk, styles.wdth50, styles.paddRL15]}>
                        <Text style={[styles.signLabel, styles.textDefault]}>Select Location<Text style={[styles.font12, styles.textPri]}>*</Text></Text>

                        <View>
                          <Image source={(require("../../assets/images/dropdown.png"))} style={styles.dropdonwImg} />
                          <ModalSelector
                            data={locationDropDownData}
                            childrenContainerStyle={[styles.AddsignInput, styles.selectMainInput]}
                            selectStyle={styles.selectText}
                            optionContainerStyle={styles.selectCont}
                            optionTextStyle={styles.textStyle}
                            overlayStyle={styles.overlayText}
                            initValueTextStyle={styles.textStyle}
                            cancelStyle={styles.selectCont}
                            cancelContainerStyle={styles.cancelCont}
                            cancelText={"Cancel"}
                            initValue="Select Location"
                            selectedKey={locationKey}
                            onChange={(option) => {
                              if (option.key) { // workaround for ios https://github.com/peacechen/react-native-modal-selector/issues/140
                                setFieldValue('location', option.value)
                                setLocationKey(option.key)
                              }
                            }
                            } />
                        </View>
                        {/* </View> */}
                        {touched.location && errors.location &&
                          <Text style={[styles.signLabel, { color: Colors.dangerRed }]}>Select Location is required.</Text>
                        }
                      </View>

                      <Field
                        component={CustomInput}
                        name="categoryDescription"
                        label="Category Description"
                        mandate={false}
                      />
                    </View>
                    <TouchableOpacity onPress={handleSubmit}>
                      <View style={styles.popupBtnCon}>
                        <CustomButton styles={styles.addCaaatBtn} label={"Continue"} />
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
  //------------------------------------------User Interface------------------------------------------
  return (
    <>
      <Header heading={"Category"} />

      <View style={styles.categoryBlkCon}>
        <ScrollView>
          <View style={[styles.textcontainer1, styles.catSubBlk]}>
            <Text style={styles.textStyle1}>
              Category
            </Text>
            <View>
            </View>

            <TouchableOpacity onPress={() => openAddCategory()}>
              <View style={styles.textcontainer2}>

                <Text style={styles.textStyle2}>
                  Add Category
                </Text>

              </View>
            </TouchableOpacity>

          </View>


          <View style={[styles.table, styles.pb80]}>
            {!isDataPresent
              ?
              // no record HTML
              <View style={styles.noRecordFoundView}>
                <Image
                  style={styles.noRecordImage}
                  source={(require('../../assets/images/clipboard.png'))}
                />
                <View>
                  <Text style={styles.recordDisplay}>There are no Category to display.</Text>
                </View>

                <View style={styles.noRecordItem}>
                  <Text style={styles.addText} onPress={() => openAddCategory()}>
                    Add Category
                  </Text>
                  <Text style={styles.recordDisplay}>
                    to continue.
                  </Text>
                </View>
              </View>
              // no record HTML Ends
              :
              <TableView data={data} sendEditData={sendDataToParent} updateDelete={() => getCategoryList()} />
            }
          </View>

          {openCategory &&
            <Modal isVisible={openCategory} style={styles.popup}>
              {popupAddCategory()}
            </Modal>
          }

          {editCategory &&
            <Modal isVisible={editCategory}>
              {popupEditCategory()}
            </Modal>
          }
          {openSuccessMsg &&
            <Modal isVisible={openSuccessMsg}>
              {SuccessPopup()}
            </Modal>
          }
          {openUpdateSuccessMsg &&
            <Modal isVisible={openUpdateSuccessMsg}>
              {SuccessUpdatePopup()}
            </Modal>
          }
        </ScrollView>
      </View>

    </>
  );

}