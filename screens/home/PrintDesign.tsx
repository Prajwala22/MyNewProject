import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';

import { Image, Pressable, ScrollView, Text, TouchableOpacity, View, Platform, SafeAreaView } from 'react-native';
// import CKEditor5 from 'react-native-ckeditor5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import Toast from 'react-native-root-toast';
import * as yup from 'yup';
import { default as style, default as styles } from '../../assets/css/style';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Header from '../../components/sideMenuHeaderMaster';
import ViewPrintDesign from '../../components/ViewPrintDesign';
import { endPoint } from '../../services/api/apiConstant';
import api from '../../services/api/callingApi';
import Colors from '../constants/colors';


export default function PrintDesign({ navigation, route }: { navigation: any, route: any }) {
    const [openPrintDesign, setOpenPrintDesign] = useState(false);
    const [editPrintDesign, setEditPrintDesign] = useState(false);
    const [editPrintDesignData, setEditPrintDesignData] = useState(null);
    const [isDataPresent, setDataPreset] = useState(false);
    const [footerval, setFooterval] = useState("");
    const [headerval, setHeaderval] = useState("");
    const [checkedItems, setCheckedItems] = React.useState<any>(false);
    const [checkededitItems, setCheckededitItems] = React.useState(false);
    const [data, setPrintDesignData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const optionsPerPage = [2, 3, 4];
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    var count = 1;
    const id: any = '';
    const isFocused = useIsFocused();
    const [userRoleId, setuserRoleId] = useState('')
    const [outletId, setOutletId] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [outletName, setOutlet] = useState('');
    const [openSuccessMsg, setopenSuccessMsg] = useState(false);
    const [headerValError, setHeaderValError] = useState(false);
    const [footervalError, setFootervalError] = useState(false)
    const [checkedItemError, setcheckedItemError] = useState(false);
    const [istobeActiveError, setIstobeActiveError] = useState(false)
    const [openUpdateSuccessMsg, setopenUpdateSuccessMsg] = useState(false); useEffect(() => {
        setTimeout(() => getRestaurant(), 1000);
    }, [isFocused]);
    const webViewRef = useRef(null);
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
    const colors = {
        backgroundColor: '{your color code here}',
        offContentBackgroundColor: '{your secondary color code here}',
        color: '{font color code here}',
        bg5: '{your toolbar button active and hover color}'
    }
    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        });
        return unsubscribe;
    }, [navigation]);
    /// ----------------------------Get the Print Design list------------------------------------------------------

    /// Get the Print Design list
    useEffect(() => {
        setCheckedItems(null)
        getPrintDesignList();
    }, [isFocused]);

    const getPrintDesignList = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;

        const result = await api.GetPrintDesign(token, outletId);
        if (result.data.length === 0) {
            // Toast.show("Some Error occured. Please try again.");
            setDataPreset(false);
        } else {
            setPrintDesignData(result.data);
            setDataPreset(true);
        }
    }

    /// ----------------------------Get the Print Design list Ends------------------------------------------------

    // ----------------------Create Print Design Group -----------------------------------------------------------
    const handleSubmit = async (data) => {
        if (headerval != "" && footerval != "" && checkedItemError != null) {
            const jsonValue: any = await AsyncStorage.getItem('userInfo')
            let loginData = JSON.parse(jsonValue);
            let token = loginData.token;
            let outletId = loginData.outletId;

            var myJson = {
                printItemHeaderSettings: {
                    item: data.item,
                    discount: data.discount,
                    quantity: data.quantity,
                    amount: data.amount
                },
                printGenerealSettings: {
                    title: data.titleLabel,
                    invoiceNumber: data.invoiceNumberLabel,
                    customer: data.customerLabel,
                    servedBy: data.servedByLabel,
                    isActive: checkedItems,
                },
                printHeaderSettings: {
                    headerDetails: headerval,
                },
                printFooderSettings: {
                    fooderDetails: footerval,
                },
                activeStatus: checkedItems,
                outletId: outletId,
            }

            const result = await api.CreateMasterData(endPoint.CREATE_PRINTDESIGN, token, myJson);
            if (result.success) {
                getPrintDesignList();
                successOpen();
                setOpenPrintDesign(false);
                setIsFooterCollapse(true);
                setIsHeaderCollapse(true);
                setHeaderval("");
                setFooterval("");
                setHeaderValError(false);
                setFootervalError(false);
                setcheckedItemError(false);
                setCheckedItems(null);
            }
            else {
                Toast.show('Something went wrong. please try again later')
            }
        }
        else {
            headerFooterval();
        }

    }
    const handleEditorChange = (data: string, editorType: string) => {

        if (editorType === 'header') {
            setHeaderval(data);  // Update header content
            setHeaderValError(false);
        } else if (editorType === 'footer') {
            setFooterval(data);  // Update footer content
            setFootervalError(false);
        }
    };

    // Load WebView with CKEditor configuration
    // function injectCKEditor(headerval: string, footerval: string = '') {
    //     return `
    //       <html>
    //         <head>
    //      <script src="https://cdn.ckeditor.com/ckeditor5/34.0.0/classic/ckeditor.js"></script>
    //         </head>
    //         <body>
    //           <textarea id="editor">${headerval || footerval}</textarea> <!-- Inject the content dynamically -->
    //           <script>
    //             ClassicEditor
    //               .create(document.querySelector('#editor'))
    //               .then(editor => {
    //                 editor.model.document.on('change:data', () => {
    //                   const data = editor.getData();
    //                   window.ReactNativeWebView.postMessage(data); // Send data to React Native
    //                 });
    //               })
    //               .catch(error => {
    //                 console.error(error);
    //               });
    //           </script>
    //         </body>
    //       </html>
    //     `;
    // }

    const injectCKEditor = (headerval) => {
        return `
          <html>
            <head>
              <script src="https://cdn.ckeditor.com/ckeditor5/34.0.0/classic/ckeditor.js"></script>
              <style>
            /* Add custom CSS for textarea */
            #editor {
              height: 550px; /* Increase the height of the textarea */
              width: 100%;   /* Ensure full width */
            }
          </style>
            </head>
            <body>
              <textarea id="editor">${headerval}</textarea>
              <script>
                if (!window.editorInitialized) {
                  ClassicEditor
                    .create(document.querySelector('#editor')), {
                            plugins: [AutoGrow ],
                            autoGrow: {
                            minHeight: 400, // Minimum height of the editor
                            maxHeight: 600  // Maximum height of the editor
                            }
                        })
                                        .then(editor => {
                      window.editor = editor;
                      editor.model.document.on('change:data', () => {
                        const data = editor.getData();
                        window.ReactNativeWebView.postMessage(data);
                      });
                      window.editorInitialized = true;
                    })
                    .catch(error => {
                      console.error(error);
                    });
                }
              </script>
            </body>
          </html>
        `;
    };

    // -----------------------Create Print Design Ends-----------------------------------------------------------

    // -------------------- Update Print Design  -----------------------------------------------------------------
    const updateModifierGroup = async (data) => {
        if (headerval != "" && footerval != "") {
            const jsonValue: any = await AsyncStorage.getItem('userInfo')
            let loginData = JSON.parse(jsonValue);
            let token = loginData.token;
            let outletId = loginData.outletId;
            var myJson = {
                id: editPrintDesignData.id,
                printItemHeaderSettings: {
                    item: data.item,
                    discount: data.discount,
                    quantity: data.quantity,
                    amount: data.amount
                },
                printGenerealSettings: {
                    title: data.titleLabel,
                    invoiceNumber: data.invoiceNumberLabel,
                    customer: data.customerLabel,
                    servedBy: data.servedByLabel,
                    isActive: checkededitItems,
                },
                printHeaderSettings: {
                    headerDetails: headerval,
                },
                printFooderSettings: {
                    fooderDetails: footerval,
                },
                activeStatus: checkededitItems,
                outletId: outletId,
            }
            const result = await api.UpdateMasterData(endPoint.EDIT_PRINTDESIGN + editPrintDesignData.id, token, myJson);
            if (result.success) {
                successOpenUpdate();
                setEditPrintDesign(false);
                getPrintDesignList();
                setIsFooterCollapse(true);
                setIsHeaderCollapse(true);
                setHeaderval("");
                setFooterval("");
                setHeaderValError(false);
                setFootervalError(false);
                setcheckedItemError(false);
                setCheckedItems(null)
            }
            else {
                Toast.show('Something went wrong. please try again later')
            }
        }
        else {
            headerFooterval();
        }

    }

    //----------------------- Update Print Design Ends-------------------------------------------------------------
    //Header and Footer validations
    const headerFooterval = () => {
        setIstobeActiveError(false)
        if (headerval === "") {
            setHeaderValError(true);
        }
        if (footerval === "") {
            setFootervalError(true);
        }
        if (checkedItems === null) {
            setcheckedItemError(true)
        }
    }
    const onHeaderTextChange = (data) => {
        setHeaderval(data)
    }

    const onFooterTextChange = (data) => {
        setFooterval(data)
    }

    //below code is the duplicate
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        });
        return unsubscribe;
    }, [navigation]);

    const openAddPrintDesign = () => {
        setOpenPrintDesign(true);
        setIsFooterCollapse(true);
        setIsHeaderCollapse(true);
    }

    const toggleModal = () => {
        setCheckedItems(null)
        setOpenPrintDesign(!openPrintDesign);
        setIsFooterCollapse(true);
        setIsHeaderCollapse(true);
        setHeaderval("");
        setFooterval("");
        setHeaderValError(false);
        setFootervalError(false);
        setcheckedItemError(false)
    };

    const toggleEdit = () => {
        setEditPrintDesign(!editPrintDesign);
        setIsFooterCollapse(true);
        setIsHeaderCollapse(true);
        setHeaderval("");
        setFooterval("");
        setHeaderValError(false);
        setFootervalError(false);
        setcheckedItemError(false);
        setIstobeActiveError(false)
    };

    const generalSettingsValidationSchema = yup.object().shape({
        titleLabel: yup
            .string()
            .required('Title Label is required'),
        invoiceNumberLabel: yup
            .string()
            .required('Invoice Number Label is required'),
        customerLabel: yup
            .string()
            .required('Customer Label is required'),
        servedByLabel: yup
            .string()
            .required('Served By Label is required'),
        item: yup
            .string()
            .required('Item is required'),
        quantity: yup
            .string()
            .required('Quantity is required'),
        amount: yup
            .string()
            .required('Amount is required'),
        discount: yup
            .string()
            .required('Discount is required'),
    })

    const sendDataToParent = (data: any) => {
        setEditPrintDesignData(data)
        setCheckededitItems(data.activeStatus)
        setEditPrintDesign(true);
        setHeaderval(data.printHeaderSettings.headerDetails);
        setFooterval(data.printFooderSettings.fooderDetails);
    };

    //header and footer collapse
    const [isHeaderCollapse, setIsHeaderCollapse] = useState(true);
    const [isFooterCollapse, setIsFooterCollapse] = useState(true);

    const headerCollapse = () => {
        setIsHeaderCollapse(false);
        setIsFooterCollapse(true);
    }

    const FooterCollapse = () => {
        setIsFooterCollapse(false);
        setIsHeaderCollapse(true);
    }

    //Check whether the Print Design is to be Active or not
    const isTobeActive = async () => {
        const jsonValue: any = await AsyncStorage.getItem('userInfo')
        let loginData = JSON.parse(jsonValue);
        let token = loginData.token;
        let outletId = loginData.outletId;

        const result = await api.getAllMasterData(token, endPoint.CHECKISTOBEACTIVEORNOT + "/" + editPrintDesignData.id + "?isTrue=true");
        if (result.success) {
            setCheckededitItems(true)
        }
        else {
            setIstobeActiveError(true)
        }

    }

    const injectCKEditor1 = (initialData: any) => {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>CKEditor</title>
                <script src="https://cdn.ckeditor.com/ckeditor5/34.0.0/classic/ckeditor.js"></script>
                <style>
                    body { margin: 0; padding: 0; }
                    .editor-container { width: 100%; height: 250px; }
                </style>
            </head>
            <body>
                <div class="editor-container" id="editor"></div>
                <script>
                    ClassicEditor
                        .create(document.querySelector('#editor'), {
                            toolbar: ['heading', 'bold', 'italic', 'underline', 'bulletedList', 'numberedList', 'fontSize', 'undo', 'redo'],
                        })
                        .then(editor => {
                            editor.setData('${initialData}');
                            editor.model.document.on('change:data', () => {
                                window.ReactNativeWebView.postMessage(editor.getData());
                            });
                        })
                        .catch(error => {
                            console.error(error);
                        });
                </script>
            </body>
            </html>
        `;
    };
    //------------------------------------ Print Design Add Popup ------------------------------------------------
    const popupAddPrintDesign = () => {
        return (
            <SafeAreaView>
                <KeyboardAwareScrollView enableOnAndroid={true}
                    enableAutomaticScroll={(Platform.OS === 'ios')}
                    keyboardOpeningTime={0}>
                    <ScrollView>
                        <View style={styles.popupContainer}>
                            <View style={styles.popupHeadWrap}>
                                <Text style={styles.textStyle3}>
                                    Add Print Design
                                </Text>
                                <Pressable style={styles.closeView} onPress={() => toggleModal()}>
                                    <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                    <Text style={styles.closeText}>
                                        Close
                                    </Text>
                                </Pressable>
                            </View>

                            <View style={[styles.width100]}>
                                <Formik
                                    validationSchema={generalSettingsValidationSchema}
                                    initialValues={{
                                        titleLabel: '',
                                        invoiceNumberLabel: '',
                                        customerLabel: '',
                                        servedByLabel: '',
                                        item: '',
                                        quantity: '',
                                        amount: '',
                                        discount: '',
                                    }}
                                    onSubmit={values => handleSubmit(values)}
                                >

                                    {({ handleSubmit, handleChange, isValid, values }) => (
                                        <View style={[styles.popuprow]}>
                                            <Field
                                                component={CustomInput}
                                                name="titleLabel"
                                                label="Title Label"
                                                mandate={true}
                                            />
                                            <Field
                                                component={CustomInput}
                                                name="invoiceNumberLabel"
                                                label="Invoice Number Label"
                                                mandate={true}
                                            />
                                            <Field
                                                component={CustomInput}
                                                name="customerLabel"
                                                label="Customer Label"
                                                mandate={true}
                                            />
                                            <Field
                                                component={CustomInput}
                                                name="servedByLabel"
                                                label="Served By Label"
                                                mandate={true}
                                            />
                                            <Field
                                                component={CustomInput}
                                                name="item"
                                                label="Item"
                                                mandate={true}
                                            />
                                            <Field
                                                component={CustomInput}
                                                name="quantity"
                                                label="Quantity"
                                                mandate={true}
                                            />
                                            <Field
                                                component={CustomInput}
                                                name="amount"
                                                label="Amount"
                                                mandate={true}
                                            />
                                            <Field
                                                component={CustomInput}
                                                name="discount"
                                                label="Discount"
                                                mandate={true}
                                            />
                                            <View style={[styles.popupInputBlk, styles.wdth100, styles.paddRL15]}>
                                                <Text style={[styles.signLabel, styles.textDefault]}>Status<Text style={[styles.font12, styles.textPri]}>*</Text></Text>

                                                <View style={[styles.flexAlignRow]}>
                                                    <TouchableOpacity style={[styles.flexAlignRow, styles.margrgt10]} onPress={() => { setCheckedItems(true), setcheckedItemError(false) }}>
                                                        <View style={[styles.radioButton, checkedItems === true && styles.radioBtnChecked]}>
                                                            {
                                                                (checkedItems === true) ? <View style={styles.radioBtnView}></View> : null
                                                            }
                                                        </View>
                                                        <Text style={[styles.promoValue]}>Active</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setCheckedItems(false), setcheckedItemError(false) }}>
                                                        <View style={[styles.radioButton, checkedItems === false && styles.radioBtnChecked]}>
                                                            {
                                                                (checkedItems === false) ? <View style={styles.radioBtnView}></View> : null
                                                            }
                                                        </View>
                                                        <Text style={[styles.promoValue]}>In Active</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            {checkedItemError === true &&
                                                <Text style={[styles.signLabelPrD, { color: Colors.dangerRed }]}>Status is required</Text>
                                            }
                                            <View style={[styles.popupInputBlk, styles.wdth100, styles.paddRL15]}>
                                                <View style={[styles.headerPrintBlk, styles.whiteBg]}>
                                                    <TouchableOpacity onPress={headerCollapse} style={[styles.wdth100, styles.receivedHeader, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                                                        <Text style={[styles.signLabel, styles.textDefault]}>Header</Text>
                                                        {isHeaderCollapse ? <Image
                                                            style={[styles.dineImg]}
                                                            source={(require('../../assets/images/kitchen_drop_down.png'))}
                                                            resizeMode='contain' /> :
                                                            <Image
                                                                style={[styles.dineImg, styles.imgRotate]}
                                                                source={(require('../../assets/images/kitchen_drop_down.png'))}
                                                                resizeMode='contain' />
                                                        }
                                                    </TouchableOpacity>
                                                    {isHeaderCollapse ? null :
                                                                <View style={[styles.receivedHeader, styles.borderTop,]}>
                                                                    {/* <WebView
                                                                        ref={webViewRef}
                                                                        originWhitelist={['*']}
                                                                        source={{ html: injectCKEditor(headerval) }}
                                                                        javaScriptEnabled={true}
                                                                        onMessage={(event) => {
                                                                            handleEditorChange(event.nativeEvent.data, 'header');
                                                                        }}
                                                                    /> */}
                                                                    <WebView
                                                                        ref={webViewRef}
                                                                        originWhitelist={['*']}
                                                                        source={{ html: injectCKEditor('') }}
                                                                        style={{width: '100%', height: 300}}
                                                                        javaScriptEnabled={true}
                                                                        injectedJavaScript={`
        if (!window.editorInitialized) {
          ClassicEditor
            .create(document.querySelector('#editor'))
            .then(editor => {
              window.editor = editor;
              editor.model.document.on('change:data', () => {
                const data = editor.getData();
                window.ReactNativeWebView.postMessage(data);
              });
              window.editorInitialized = true;
            })
            .catch(error => {
              console.error(error);
            });
        }
      `}
                                                                        onMessage={(event) => {
                                                                            handleEditorChange(event.nativeEvent.data, 'header');
                                                                        }}
                                                                    />
                                                            {/* Optionally display the header value */}

                                                        </View>

                                                    }
                                                </View>
                                            </View>
                                            {headerValError === true &&
                                                <Text style={[styles.signLabelPrD, { color: Colors.dangerRed }]}>Header is required</Text>
                                            }
                                            <View style={[styles.popupInputBlk, styles.wdth100, styles.paddRL15]}>
                                                <View style={[styles.headerPrintBlk, styles.whiteBg]}>
                                                    <TouchableOpacity onPress={FooterCollapse} style={[styles.wdth100, styles.receivedHeader, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                                                        <Text style={[styles.signLabel, styles.textDefault]}>Footer</Text>
                                                        {isFooterCollapse ? <Image
                                                            style={[styles.dineImg]}
                                                            source={(require('../../assets/images/kitchen_drop_down.png'))}
                                                            resizeMode='contain' /> :
                                                            <Image
                                                                style={[styles.dineImg, styles.imgRotate]}
                                                                source={(require('../../assets/images/kitchen_drop_down.png'))}
                                                                resizeMode='contain' />
                                                        }
                                                    </TouchableOpacity>
                                                    {isFooterCollapse ? null :
                                                        <View style={[styles.receivedHeader, styles.borderTop,]}>
                                                            {/* <CKEditor5
                                                                initialData={footerval}
                                                                onChange={value => { onFooterTextChange(value), setFootervalError(false) }}
                                                                editorConfig={{ toolbar: ['FontFamily', 'heading', 'bold', 'italic', 'underline', 'bulletedList', 'numberedList', 'fontSize', '|', 'undo', 'redo'] }}
                                                                onFocus={() => { }}
                                                                onBlur={() => { }}
                                                                style={{ width: '100%', height: 300 }}
                                                                colors={colors}
                                                                toolbarBorderSize="0px"
                                                                editorFocusBorderSize="0px"
                                                                placeHolderText="Enter text here..."
                                                            /> */}
                                                                        {/* <WebView
                                                                            ref={webViewRef}
                                                                            originWhitelist={['*']}
                                                                            source={{ html: injectCKEditor(footerval) }}
                                                                            javaScriptEnabled={true}
                                                                            onMessage={(event) => {
                                                                                handleEditorChange(event.nativeEvent.data, 'footer');
                                                                            }}
                                                                        /> */}
                                                                        <WebView
                                                                            ref={webViewRef}
                                                                            originWhitelist={['*']}
                                                                            source={{ html: injectCKEditor('') }}
                                                                            javaScriptEnabled={true}
                                                                            style={{width: '100%', height: 300}}
                                                                            injectedJavaScript={`
        if (!window.editorInitialized) {
          ClassicEditor
            .create(document.querySelector('#editor'))
            .then(editor => {
              window.editor = editor;
              editor.model.document.on('change:data', () => {
                const data = editor.getData();
                window.ReactNativeWebView.postMessage(data);
              });
              window.editorInitialized = true;
            })
            .catch(error => {
              console.error(error);
            });
        }
      `}
                                                                            onMessage={(event) => {
                                                                                handleEditorChange(event.nativeEvent.data, 'footer');
                                                                            }}
                                                                        />
                                                                
                                                                {/* Optionally display the header value */}

                                                        </View>
                                                    }
                                                </View>
                                            </View>
                                            {footervalError === true &&
                                                <Text style={[styles.signLabelPrD, { color: Colors.dangerRed }]}>Footer is required</Text>
                                            }
                                            <View style={[styles.popupBtnCon, styles.width100]}>
                                                <TouchableOpacity onPress={() => { handleSubmit(), headerFooterval() }}>
                                                    <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={() => { handleSubmit(), headerFooterval() }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                </Formik>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }


    //------------------------------------ Print Design Edit Popup ------------------------------------------------

    const popupEditPrintDesign = () => {
        return (
            <SafeAreaView>
                <KeyboardAwareScrollView enableOnAndroid={true}
                    enableAutomaticScroll={(Platform.OS === 'ios')}
                    keyboardOpeningTime={0}>
                    <ScrollView>
                        <View style={styles.popupContainer}>
                            <View style={styles.popupHeadWrap}>
                                <Text style={styles.textStyle3}>
                                    Edit Print Design
                                </Text>
                                <Pressable style={styles.closeView} onPress={() => toggleEdit()}>
                                    <Image source={(require("../../assets/images/cross_icon.png"))} style={styles.crossIcon} />
                                    <Text style={styles.closeText}>
                                        Close
                                    </Text>
                                </Pressable>
                            </View>
                            <View style={styles.width100}>
                                <Formik
                                    validationSchema={generalSettingsValidationSchema}
                                    initialValues={{
                                        titleLabel: editPrintDesignData.printGenerealSettings.title,
                                        invoiceNumberLabel: editPrintDesignData.printGenerealSettings.invoiceNumber,
                                        customerLabel: editPrintDesignData.printGenerealSettings.customer,
                                        servedByLabel: editPrintDesignData.printGenerealSettings.servedBy,
                                        item: editPrintDesignData.printItemHeaderSettings.item,
                                        quantity: editPrintDesignData.printItemHeaderSettings.quantity,
                                        amount: editPrintDesignData.printItemHeaderSettings.amount,
                                        discount: editPrintDesignData.printItemHeaderSettings.discount,
                                        header: editPrintDesignData.printHeaderSettings.showHeader,
                                        footer: editPrintDesignData.printFooderSettings.showFooder
                                    }}
                                    onSubmit={values => updateModifierGroup(values)}
                                >

                                    {({ handleSubmit, handleChange, isValid, values }) => (
                                        <View style={[styles.popuprow]}>
                                            <Field
                                                component={CustomInput}
                                                name="titleLabel"
                                                label="Title Label"
                                                mandate={true}
                                            />
                                            <Field
                                                component={CustomInput}
                                                name="invoiceNumberLabel"
                                                label="Invoice Number Label"
                                                mandate={true}
                                            />
                                            <Field
                                                component={CustomInput}
                                                name="customerLabel"
                                                label="Customer Label"
                                                mandate={true}
                                            />
                                            <Field
                                                component={CustomInput}
                                                name="servedByLabel"
                                                label="Served By Label"
                                                mandate={true}
                                            />
                                            <Field
                                                component={CustomInput}
                                                name="item"
                                                label="Item"
                                                mandate={true}
                                            />
                                            <Field
                                                component={CustomInput}
                                                name="quantity"
                                                label="Quantity"
                                                mandate={true}
                                            />
                                            <Field
                                                component={CustomInput}
                                                name="amount"
                                                label="Amount"
                                                mandate={true}
                                            />
                                            <Field
                                                component={CustomInput}
                                                name="discount"
                                                label="Discount"
                                                mandate={true}
                                            />

                                            <Text style={[styles.signLabel, styles.textDefault, styles.paddRL15]}>Status<Text style={[styles.font12, styles.textPri]}>*</Text></Text>
                                            <View style={[styles.popupInputBlk, styles.flexAlignRow, styles.wdth100, styles.paddRL15]}>
                                                <TouchableOpacity style={[styles.flexAlignRow, styles.margrgt10]} onPress={() => { isTobeActive() }}>
                                                    <View style={[styles.radioButton, checkededitItems === true && styles.radioBtnChecked]}>
                                                        {
                                                            (checkededitItems === true) ? <View style={styles.radioBtnView}></View> : null
                                                        }
                                                    </View>
                                                    <Text style={[styles.promoValue]}>Active</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.flexAlignRow} onPress={() => { setCheckededitItems(false) }}>
                                                    <View style={[styles.radioButton, checkededitItems === false && styles.radioBtnChecked]}>
                                                        {
                                                            (checkededitItems === false) ? <View style={styles.radioBtnView}></View> : null
                                                        }
                                                    </View>
                                                    <Text style={[styles.promoValue]}>In Active</Text>
                                                </TouchableOpacity>
                                            </View>
                                            {istobeActiveError === true &&
                                                <Text style={[styles.signLabelPrD, { color: Colors.dangerRed }]}>Please In Active old design to activate the current Print Design</Text>
                                            }
                                            <View style={[styles.popupInputBlk, styles.wdth100, styles.paddRL15]}>
                                                <View style={[styles.headerPrintBlk, styles.whiteBg]}>
                                                    <TouchableOpacity onPress={headerCollapse} style={[styles.wdth100, styles.receivedHeader, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                                                        <Text style={[styles.signLabel, styles.textDefault]}>Header</Text>
                                                        {isHeaderCollapse ? <Image
                                                            style={[styles.dineImg]}
                                                            source={(require('../../assets/images/kitchen_drop_down.png'))}
                                                            resizeMode='contain' /> :
                                                            <Image
                                                                style={[styles.dineImg, styles.imgRotate]}
                                                                source={(require('../../assets/images/kitchen_drop_down.png'))}
                                                                resizeMode='contain' />
                                                        }
                                                    </TouchableOpacity>
                                                    {isHeaderCollapse ? null :
                                                        <View style={[styles.receivedHeader, styles.borderTop,]}>
                                                            <WebView
                                                                ref={webViewRef}
                                                                originWhitelist={['*']}
                                                                source={{ html: injectCKEditor1(editPrintDesignData.printHeaderSettings.headerDetails) }}
                                                                javaScriptEnabled={true}
                                                                onMessage={(event) => {
                                                                    handleEditorChange(event.nativeEvent.data, 'header');
                                                                }}
                                                                style={{ width: '100%', height: 300 }}
                                                            />
                                                        </View>
                                                    }
                                                </View>
                                            </View>
                                            {headerValError === true &&
                                                <Text style={[styles.signLabelPrD, { color: Colors.dangerRed }]}>Header is required</Text>
                                            }
                                            <View style={[styles.popupInputBlk, styles.wdth100, styles.paddRL15]}>
                                                <View style={[styles.headerPrintBlk, styles.whiteBg]}>
                                                    <TouchableOpacity onPress={FooterCollapse} style={[styles.wdth100, styles.receivedHeader, styles.flexrow, styles.alignCenter, styles.justifyBetween]}>
                                                        <Text style={[styles.signLabel, styles.textDefault]}>Footer</Text>
                                                        {isFooterCollapse ? <Image
                                                            style={[styles.dineImg]}
                                                            source={(require('../../assets/images/kitchen_drop_down.png'))}
                                                            resizeMode='contain' /> :
                                                            <Image
                                                                style={[styles.dineImg, styles.imgRotate]}
                                                                source={(require('../../assets/images/kitchen_drop_down.png'))}
                                                                resizeMode='contain' />
                                                        }
                                                    </TouchableOpacity>
                                                    {isFooterCollapse ? null :
                                                        <View style={[styles.receivedHeader, styles.borderTop,]}>
                                                            <WebView
                                                                ref={webViewRef}
                                                                originWhitelist={['*']}
                                                                source={{ html: injectCKEditor1(editPrintDesignData.printFooderSettings.fooderDetails) }}
                                                                javaScriptEnabled={true}
                                                                onMessage={(event) => {
                                                                    handleEditorChange(event.nativeEvent.data, 'footer');
                                                                }}
                                                                style={{ width: '100%', height: 300 }}
                                                            />
                                                        </View>
                                                    }
                                                </View>
                                            </View>
                                            {footervalError === true &&
                                                <Text style={[styles.signLabelPrD, { color: Colors.dangerRed }]}>Footer is required</Text>
                                            }
                                            <View style={[styles.popupBtnCon, styles.width100]}>
                                                <TouchableOpacity onPress={() => { handleSubmit(), headerFooterval() }}>
                                                    <CustomButton styles={styles.addCaaatBtn} label={"Continue"} onPress={() => { handleSubmit(), headerFooterval() }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                </Formik>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
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
                    <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Print Design Created Successfully</Text>
                    <TouchableOpacity style={styles.continueBtn} onPress={() => successOpen()}>
                        <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
            // success popup - Ends
        );
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
                    <Text style={[styles.font16, styles.textBlack, styles.marBtm26]}>Print Design Updated Successfully</Text>
                    <TouchableOpacity style={styles.continueBtn} onPress={() => successOpenUpdate()}>
                        <Text style={[styles.textWhite, styles.font16]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
            // success popup - Ends
        );
    }

    //--------------------------- User Interface ---------------------------------------

    return (
        <>
            <Header heading={"Product"} />
            <ScrollView style={styles.categoryBlkCon}>
                <View style={[styles.textcontainer1, styles.catSubBlk]}>
                    <Text style={styles.textStyle1}>
                        Print Design
                    </Text>
                    <View>
                    </View>

                    <View style={styles.textcontainer2}>
                        <TouchableOpacity onPress={() => openAddPrintDesign()}>
                            <Text style={styles.textStyle2}>
                                Add Print Design
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={[styles.paddB60]}>
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
                                    <Text style={styles.recordDisplay}>There are no Print Design to display.</Text>
                                </View>

                                <View style={styles.noRecordItem}>
                                    <Text style={styles.addText} onPress={() => openAddPrintDesign()}>
                                        Add Print Design
                                    </Text>
                                    <Text style={styles.recordDisplay}>
                                        to continue.
                                    </Text>
                                </View>
                            </View>
                            // no record HTML Ends
                            :
                            <ViewPrintDesign data={data} sendEditData={sendDataToParent} updateDelete={() => getPrintDesignList()} />
                        }
                    </View>

                    {openPrintDesign &&
                        <Modal isVisible={openPrintDesign}>
                            {popupAddPrintDesign()}
                        </Modal>
                    }

                    {editPrintDesign &&
                        <Modal isVisible={editPrintDesign}>
                            {popupEditPrintDesign()}
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
                </View>
            </ScrollView>

        </>


    );


}