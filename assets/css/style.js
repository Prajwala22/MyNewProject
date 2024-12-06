
import { Dimensions, Platform, StyleSheet } from 'react-native';
import Colors from '../../screens/constants/colors';

export default StyleSheet.create({
  // introslide 
  flex1: {
    flex: 1,
    height: Dimensions.get('window').height - 90,
    width: Dimensions.get('window').width,
    // fontFamily: 'inter'
  },
  intoBlk: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  introImageStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  resizeCover: {
    resizeMode: 'cover'
  },
  resizeContain: {
    resizeMode: 'contain'
  },
  sliderText: {
    width: 365,
    backgroundColor: '#F2FCF9',
    padding: 50,
    marginRight: 50,
  },
  introTitleStyle: {
    color: '#484D54',
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '600',
    marginBottom: 17,
  },
  introTextStyle: {
    color: '#484D54',
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
    marginBottom: 25,
  },
  dotOpe: {
    width: 10,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 29,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
  buttonCircle: {
    width: 265,
    height: 38,
    backgroundColor: '#E83B42',
    borderRadius: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartText: {

    fontSize: 14,
    color: '#fff',
    lineHeight: 19,
  },
  //login screen
  bottomView: {
    flex: 1,
    padding: Dimensions.get('window').height > 767 ? 15 : 30,
    height: Dimensions.get('window').height,
    backgroundColor: '#F2FCF9',
  },
  registrationContainerView: {
    top: 120
  },
  inputText: {
    width: '100%',
    marginLeft: 10,
    fontSize: 14,
    textAlign: 'left',
    color: '#fff',
  },
  uiView: {
    top: 120
  },
  uicompbutton: {
    top: 20
  },
  loginInputView: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    marginVertical: 5,
    borderColor: '#fff',
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  btnLogin: {
    width: '95%',
    backgroundColor: '#fff',
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  textLogin: {
    alignSelf: 'center',
    color: '#6362F4',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 5
  },
  textRegistration: {
    alignSelf: 'flex-end',
    color: '#000000',
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 5,
    marginVertical: 5
  },
  textRegistration2: {
    fontSize: 12,
    color: '#E83B42',
    marginVertical: 5
  },
  registrationStyle: {
    display: 'flex',
    flexDirection: 'row',
    color: '#000',
    fontSize: 25,
    alignSelf: 'center',
    textAlignVertical: 'bottom',
    marginVertical: 80,
    top: 10,
    zIndex: 1
  },

  signBtn: {
    backgroundColor: '#E83B42',
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: 'auto',
    minWidth: 130,
  },
  signinText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '400',
  },
  dropdownBorder: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    overflow: 'hidden',
    aspectRatio: 8,
    width: '90%',
    marginEnd: 20,
    marginStart: 20,
    marginVertical: 15
  },
  dropdown: {
    width: '100%',
    fontSize: 12,
    color: '#000',
    height: '100%',
    borderColor: '#fff',
  },

  containerinternet: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  registrationButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-evenly'
  },
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
  mobilenumberviewcontainer: {
    aspectRatio: 6.3,
    width: '95%',
    top: 10,
    marginBottom: 20,
    height: 65,
    marginEnd: 10,
    marginStart: 10,
    backgroundColor: "#b8cdff"
  },
  addressText: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  address: {
    borderRadius: 4,
    backgroundColor: '#fff',
    width: '100%',
    height: 45,
    color: '#484D54',
    fontSize: 14,
    lineHeight: 19,
    borderColor: '#DBDBDB',
    borderWidth: 1,
    paddingVertical: 2,
    textAlignVertical: 'top',
    display: 'flex',
    height: 51,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  // Login pages
  headingLogo: {
    width: 70,
    height: 70
  },
  resizecontain: {
    resizeMode: 'contain',
  },
  headingTextContainer2: {
    marginTop: 50,
  },
  textCenter: {
    textAlign: 'center',
  },
  headingText1: {
    color: '#407C6A',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '600',
    paddingLeft: 13,
    textAlign: 'left',
  },
  LogoText: {
    color: '#407C6A',
    fontSize: 25,
    lineHeight: 26,
    fontWeight: '700',
    paddingLeft: 13,
    textAlign: 'left',
  },
  headingText2: {
    lineHeight: 21,
    marginBottom: 3,
    fontSize: 18,
    color: '#1A0607',
    fontWeight: 'bold',
  },
  headingsubText2: {
    color: '#747474',
    fontSize: 11,
    marginBottom: 29,
    lineHeight: 15,
    fontWeight: '400',
  },
  checkboxConLogin: {
    marginTop: 3,
    width: '100%',
    marginBottom: 24,
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  checkboxText: {
    fontSize: 11,
    lineHeight: 15,
    color: '#000000'
  },
  forgetText: {
    padding: 0,
  },
  textForgotPassword: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: 12,
    marginEnd: 25,
    marginTop: 10
  },
  logincontainer2: {
    flex: 1.5,
    height: '100%',
  },
  flex: {
    display: 'flex',
  },
  flexrow: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  whiteBg: {
    backgroundColor: '#fff',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  loginFieldView: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DBDBDB',
    height: 41,
    width: '100%',
    borderRadius: 4,
    margin: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#000000',
    fontSize: 14,
    marginBottom: 19,
    lineHeight: 17,
  },
  width100: {
    width: '100%',
    height: '100%',
  },
  loginLabel: {
    color: '#747474',
    fontSize: 10,
    lineHeight: 12,
    marginBottom: 4,
    width: '100%',
    fontWeight: '400',
  },
  loginInput: {
    marginTop: 3,
    borderWidth: 0,
    height: 17,
    backgroundColor: '#fff',
    padding: 0,
    fontSize: 14,
    lineHeight: 17,
    color: '#000000',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  accSignView: {
    marginTop: 50,
  },
  textBlack: {
    color: '#484D54',
  },
  textPri: {
    color: '#E83B42',
  },
  borderBtmpri: {
    borderBottomColor: '#E83B42',
    borderBottomWidth: 1,
  },
  font11: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '500',
  },
  heigh100: {
    height: '100%',
  },
  headerBlk: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
  },

  // signUp page
  signUPView: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 100,
    backgroundColor: '#fff',
  },
  font32: {
    fontSize: 32,
    lineHeight: 48,
  },
  signHeading: {
    marginBottom: 33,
  },
  wdth50: {
    width: '50%',
  },
  wdth25: {
    witdth: '25%',
  },
  wdth33: {
    width: '33.33%',
  },
  pr15: {
    paddingRight: 15,
  },
  signViewBlk: {
    marginBottom: 21,
  },
  dragDropViewBlk: {
    width: '100%',
  },
  errorText: {
    fontSize: 10,
    color: Colors.dangerRed,
  },
  errorInput: {
    borderColor: Colors.dangerRed,
  },
  signInput: {
    borderRadius: 4,
    backgroundColor: '#fff',
    width: '100%',
    height: 45,
    color: '#484D54',
    fontSize: 14,
    lineHeight: 19,
    borderColor: '#DBDBDB',
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  AddsignInput: {
    borderRadius: 4,
    backgroundColor: '#fff',
    width: '100%',
    height: 45,
    color: '#484D54',
    fontSize: 14,
    lineHeight: 19,
    borderColor: '#DBDBDB',
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  discountViewFlex: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  disHei: {
    height: 135,
  },
  font12: {
    fontSize: 12,
    lineHeight: 15,
  },
  radioBtn: {
    width: 15,
    height: 15,
  },
  margin0: {
    margin: 0,
  },
  signLabel: {
    fontSize: 12,
    lineHeight: 15,
    color: '#484d54',
    marginBottom: 4,
  },
  marBtm10: {
    marginBottom: 10,
  },
  promoValue: {
    fontSize: 12,
    color: '#484d54',
    lineHeight: 15,
    textTransform: 'capitalize'
  },
  // phoneCon: {
  //   backgroundColor: '#fff',
  //   width: '100%',
  //   elevation: 0,
  //   shadowOpacity: 0,
  //   borderRadius: 4,
  //   borderWidth: 1,
  //   borderColor: '#DBDBDB',
  //   height: 50,
  // },
  phoneCon: {
    backgroundColor: '#fff',
    width: '100%',
    elevation: 0,
    shadowOpacity: 0,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    height: 60,
  },
  phoneConflag: {
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#DBDBDB',
    padding: 0,
    width: 90,
  },
  phoneConinput: {
    paddingVertical: 0,
    color: '#000',
    fontSize: 14,
    height: 40,
    lineHeight: 1,
  },
  phoneCode: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 14,
    height: 20,
    lineHeight: 17,
  },
  // phoneinputContainer: {
  //   backgroundColor: '#fff',
  //   borderTopRightRadius: 4,
  //   padding: 0,
  //   borderBottomRightRadius: 4,
  // },
  phoneinputContainer: { backgroundColor: '#fff', 
  borderTopRightRadius: 4, 
  padding: 5, 
  display: 'flex', 
  alignItems: 'flex-start', 
  justifyContent: 'center', 
  borderBottomRightRadius: 4, 
},
  AddressSignBlk: {
    paddingRight: 110,
    paddingTop: 5,
    display: 'flex',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  accurateImg: {
    width: 17,
    height: 17,
  },
  font14: {
    fontSize: 14,
    lineHeight: 17,
  },
  selcAccText: {
    paddingLeft: 5,
    color: '#6D6D6D',
  },
  selaccView: {
    position: 'absolute',
    right: 25,
    flexDirection: 'row',
    alignItems: 'center',
    top: 35,
  },
  checkboxsign: {
    width: '100%',
    marginTop: 8,
    alignItems: 'center',
    position: 'relative',
    marginBottom: 11,
    flexDirection: 'row',
  },
  dragdropCon: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#B6BBC2',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  dragDropIcon: {
    width: 29,
    height: 36,
    marginBottom: 7,
  },
  dragDorpText: {
    color: '#747474',
  },
  saveAlreadyView: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 12,
  },
  dragView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  alreadyView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textsec: {
    color: '#407C6A',
  },
  // sidemenu
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  sideMenuUserText: {
    alignSelf: 'center',
  },
  sideMenuItemText: {
    color: '#000',
    fontSize: 13,
    lineHeight: 16,
  },
  versionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verText: {
    fontSize: 14,
    color: '#959fad',
    lineHeight: 16,
  },
  padL5: {
    paddingLeft: 5,
  },
  versionText: {
    position: 'relative',
  },
  //dashboard
  bottom: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    top: 25,
    backgroundColor: '#407C6A',
    zIndex: 1,
    width: Dimensions.get('window').width
  }, headerTitle: {
    flex: 0.5,
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 45
  },
  drawer: {

  },
  //Add oulet u
  popupContainer: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    // flex: 1,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  //success popup
  SuccessPopup: {
    width: 560,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: '#fff'
  },
  outtletCon: {
    paddingVertical: 30,
    paddingHorizontal: 35,
  },
  paddL15: {
    paddingLeft: 15,
  },
  paddR15: {
    paddingRight: 15,
  },
  paddL8: {
    paddingLeft: 8,
  },
  paddR8: {
    paddingRight: 8,
  },
  popupBtnCon: {
    marginTop: 15,
    paddingHorizontal: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textcontainer1: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textStyle1: {
    alignSelf: 'flex-start',
    lineHeight: 29,
    color: '#000000',
    fontSize: 24,
    fontWeight: '600'
  },
  textcontainer2: {
    borderRadius: 20,
    width: 'auto',
    elevation: 0,
    paddingVertical: 8,
    paddingHorizontal: 27,
    justifyContent: 'center',
    backgroundColor: Colors.highlightGreen,
    flexDirection: 'row',
    fontSize: 13,
    lineHeight: 22,
    fontWeight: '600',
  },
  closeView: {
    justifyContent: 'center', alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  closeText: {
    textAlign: 'left', paddingLeft: 0,
    color: '#000',
    fontSize: 14,
    lineHeight: 17,
  },
  textStyle2: {

    alignSelf: 'center',
    color: '#fff',
  },
  table: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#F5F3F6',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  datatableextraline: {
    borderBottomColor: 'white'
  },

  textStyle3: {
    margin: 0,
    color: '#000',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 30,
  },
  popupHeadWrap: {
    marginBottom: 15,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  //Table types
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  dropdowncontainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    marginHorizontal: 30,
  },
  dropdownContainerBorder: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#B4B4B4',
    overflow: 'hidden',
    aspectRatio: 9,
    width: '80%',
    marginEnd: 20,
    marginStart: 20,

  },

  // header css
  dropDownIcon: {
    width: 7,
    marginLeft: 5,
    height: 7,
    resizeMode: 'contain',
  },
  waterheader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    borderStyle: 'solid',
  },
  regheader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    paddingVertical: 16,
  },
  settings_icon: {
    marginRight: 23,
  },
  headerLogo: {
    width: 31,
    height: 31,
    marginRight: 10,
  },
  headingText: {
    color: '#484d54',
    fontWeight: '600',
    fontSize: 11,
    lineHeight: 14,
  },
  headingMargin: {
    marginBottom: 4,
  },
  headingTextStr: {
    color: '#484d54',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 14,
  },
  online: {
    backgroundColor: '#f3f4f5',
    borderRadius: 7,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginLeft: 10,
  },
  onlineCircle: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: '#008960',
  },
  onlineText: {
    color: '#959fad',
    fontWeight: '500',
    fontSize: 9,
    lineHeight: 11,
    paddingLeft: 2,
  },
  headerFlexCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftSec: {
    paddingRight: 20,
    borderRightColor: '#EBEBEB',
    paddingVertical: 14,
    borderRightWidth: 1,
    borderStyle: 'solid',
  },
  listIcon: {
    width: 31,
    height: 'auto',
  },
  SettingIcon: {
    width: 16,
    resizeMode: 'contain',
  },
  ProfileIcon: {
    width: 21,
    resizeMode: 'contain',
  },
  // header css Ends

  // dine css
  dineScrollView: {
    backgroundColor: '#fff',
  },
  dineViewBlk: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dineLeftBlk: {
    width: '25%',
    padding: 12,
    height: Dimensions.get('window').height - 85,
    paddingBottom: 50,
  },
  takeMidBlk: {
    width: '40%',
    height: Dimensions.get('window').height - 85,
    backgroundColor: '#F2F2F2',
    paddingVertical: 12,
    paddingHorizontal: 7,
  },
  dinMidBlk: {
    width: '30%',
    height: Dimensions.get('window').height - 85,
    backgroundColor: '#F2F2F2',
    paddingVertical: 12,
    paddingHorizontal: 7,
    paddingBottom: 20
  },
  dineRgtBlk: {
    width: '45%',
    position: 'relative',
    height: Dimensions.get('window').height - 85,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  dineRgtView: {
    height: Dimensions.get('window').height - 400,
  },
  dineRgtView1: {
    height: Dimensions.get('window').height - 200,
  },
  takeRgtBlk: {
    width: '60%',
    height: Dimensions.get('window').height - 85,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  takdineRgtBlk: {
    width: '70%',
  },
  floorSecViewBlk: {
    justifyContent: 'space-between',
  },
  floorBlk: {
    width: '100%',
  },
  floorSecBlk: {
    borderColor: '#EBEBEB',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  floorText: {
    marginBottom: 2,
    color: '#959FAD',
    fontSize: 9,
    lineHeight: 11,
    fontWeight: '600',
  },
  selectInput: {
    color: '#484D54',
    width: '100%',
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
  },
  complteOverlay: {
    width: 2,
    height: 60,
    backgroundColor: '#407C6A',
    position: 'absolute',
    left: -1,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  dineCompletedBlk: {
    width: '100%',
    position: 'relative',
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    paddingVertical: 14,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowColor: '#00000029',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#00000029',
    elevation: 6,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  comleftBlk: {
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContain: {
    width: 32,
    height: 32,
    backgroundColor: '#DFF4ED',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textContain1: {
    backgroundColor: '#fff',
  },
  textOne: {
    color: '#407C6A',
    fontSize: 12,
  },
  tComplted: {
    color: '#484d54',
    paddingLeft: 10,
    marginBottom: 2,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 16,
  },
  ordersSec: {
    color: '#959fad',
    fontSize: 11,
    lineHeight: 14,
    paddingLeft: 10,
  },
  clockIm: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  comminBlk: {
    color: '#959fad',
    fontSize: 11,
    lineHeight: 14,
  },
  dineComBlkRed: {
    backgroundColor: '#E83B42',
    borderRadius: 4,
  },
  textRed: {
    color: '#E83B42',
    fontSize: 12,
  },
  completeOverlayRed: {
    backgroundColor: '#E83B42',
    width: 2,
    height: 60,
    position: 'absolute',
    left: -1,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  textCntainWhite: {
    backgroundColor: '#e83b421c',
    width: 32,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textOneRed: {
    color: '#fff',
  },
  textContainRed: {
    backgroundColor: '#E83B421C',
  },
  textOneredText: {
    color: '#E83B42',
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderColor: '#EBEBEB',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 45,
    elevation: 0,
  },
  searchCon: {
    backgroundColor: 'red',
  },
  searchInput: {
    color: '#484D54',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '400',
    marginLeft: -10,
    marginTop: -6
  },
  changeCategoryBlk: {
    marginTop: 9,
    marginBottom: 22,
    shadowColor: '#0000000F',
    elevation: 6,
    height: 80,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ChooseCatSElect: {
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '600',
    backgroundColor: '#fff',
    padding: 0,
    color: '#484D54',
    margin: 0,
    width: '100%',
    padding: 0,
    height: 19,
    textAlign: 'left',
  },
  milkText: {
    color: '#484D54',
    fontSize: 13,
    marginBottom: 6,
    lineHeight: 16,
  },
  milkWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5.5,
  },
  milkCol: {
    width: '50%',
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  milkBlk: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    elevation: 6,
    borderRadius: 2,
    marginBottom: 18,
    shadowColor: '#0000000F',
    flex: 1,
    justifyContent: 'center',
  },
  squareCapRed: {
    borderColor: '#E83B42',
  },
  squareCapCircleRed: {
    backgroundColor: '#E83B42',
  },
  squareCap: {
    width: 10,
    height: 10,
    borderColor: '#008960',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 7,
    top: 7,
    zIndex: 1,
  },
  squareCapCircle: {
    width: 4,
    height: 4,
    backgroundColor: '#008960',
    borderRadius: 3,
  },
  milImage: {
    resizeMode: 'contain',
    width: 56,
    height: 56,
    marginBottom: 7,
  },
  coffeeText: {
    textAlign: 'center',
    color: '#484D54',
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '600',
  },
  overallItems: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  overallText: {
    color: '#484D54',
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '600',
  },
  shiftManageTable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shitTableLink: {
    marginLeft: 20,
  },
  shitTableText: {
    color: '#E83B42',
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '400',
  },
  textUnderline: {
    borderBottomColor: '#484D54',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  nodeMargin: {
    marginLeft: 16,
  },
  tableTr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  tableTitleText: {
    marginBottom: 3,
  },
  tableValueText: {
    paddingLeft: 0,
  },
  linkFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nodeMargin: {
    marginLeft: 14,
    marginRight: 30,
  },
  minusView: {
    backgroundColor: '#F3F4F5',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    width: 23,
    height: 23,
    justifyContent: 'center',
  },
  minusTable: {
    fontSize: 12,
    lineHeight: 15,
    color: '#407C6A',
    fontWeight: '600',
  },
  minsPlusText: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
    color: '#000000',
    marginHorizontal: 10,
  },
  updateViewBlk: {
    paddingTop: 20,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  updateLeftBlk: {
    padding: 8,
    borderColor: '#EBEBEB',
    borderStyle: 'solid',
    backgroundColor: '#fff',
    borderWidth: 1,
    flexWrap: 'wrap',
    borderRadius: 4,
    width: '60%',
  },
  spicyText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#484D54',
    fontWeight: '400',
    height: 51,
    textAlignVertical: 'top',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '100%',
    textAlignVertical: 'top'
  },
  updateBtn: {
    backgroundColor: '#E83B421C',
    borderRadius: 17,
    elevation: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '30%',
  },
  payLater: {
    backgroundColor: '#E83B421C',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  updateText: {
    fontSize: 13,
    lineHeight: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: '#E83B42',
  },
  totalDineBlk: {
    padding: 20,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  totalDine80: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '60%',
    marginBottom: 7,
  },
  totalDine20: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '40%',
    marginBottom: 7,
    paddingLeft: 10,
  },
  totalDineTotal: {
    color: '#484D54',
  },
  fabInput: {
    backgroundColor: '#fff',
    width: 45,
    height: 18,
    paddingHorizontal: 7,
    marginLeft: 7,
    paddingVertical: 1,
    fontSize: 12,
    lineHeight: 14,
    color: '#484D54',
    borderColor: '#CCCCCC',
  },
  totalDineGreen: {
    marginTop: 13,
    marginBottom: 0,
  },
  totalDineGreenText: {
    color: '#008960',
    fontWeight: '600',
  },
  totalDineGreenAmt: {
    color: '#008960',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 24,
  },
  payLaterNowBlk: {
    height: 49,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    width: '100%',
  },
  printerBlk: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#EBEBEB',
    borderStyle: 'solid',
  },
  printerIcon: {
    width: 19,
    height: 20,
    resizeMode: 'contain',
  },
  paylaterText: {
    fontSize: 13,
    lineHeight: 16,
    paddingHorizontal: 10,
    fontWeight: '600',
    color: '#484D54',
  },
  paylater: {
    fontSize: 13,
    lineHeight: 16,
    paddingHorizontal: 10,
    fontWeight: '400',
    color: '#E83B42',
  },
  payLaterBlk: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  PaynoeBlk: {
    backgroundColor: '#E83B42',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  payNowText: {
    fontWeight: '400',
    color: '#fff',
  },
  dashboardMenuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 65
  },
  // dine css End

  // category view
  categoryView: {
    backgroundColor: '#F7F7F7',
    paddingTop: 30,
  },
  catContainer: {
    paddingHorizontal: 30,
    paddingBottom: 19,
  },
  categoryHead: {
    marginStart: 0,
  },
  addCategoryBtn: {
    backgroundColor: '#008960',
    paddingHorizontal: 17,
    paddingVertical: 8,
    fontSize: 13,
    lineHeight: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    width: 'auto',
  },
  popupScroll: {
    backgroundColor: '#fff',
  },
  formContainer: {
    backgroundColor: '#fff',
  },
  addCatLabel: {
    backgroundColor: 'blue',
  },
  addCatLabel: {
    color: '#484D54',
    fontSize: 12,
    lineHeight: 15,
    marginBottom: 4,
    padding: 0,
  },
  addCatCol: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  addCatColPa: {
    paddingHorizontal: 15,
  },
  closeTextPaddrgt: {
    paddingRight: 15,
  },
  popupInputBlk: {
    marginBottom: 11,
  },
  // category view Ends

  // no record - Ends
  noRecordFoundView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  noRecordImage: {
    resizeMode: 'contain',
    width: 28,
    height: 31,
    marginBottom: 16,
  },
  recordDisplay: {
    color: '#484D54',
    fontSize: 13,
    lineHeight: 19,
  },
  noRecordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: '#E83B42',
    fontSize: 13,
    lineHeight: 19,
    paddingRight: 3,
  },
  // no record css Ends

  //category css
  categoryBlkCon: {
    padding: 30,
  },
  catSubBlk: {
    paddingBottom: 20,
  },
  flexAlignRowbet: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  flexAlignRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paddRL15: {
    paddingHorizontal: 15,
  },
  marBtm26: {
    marginBottom: 26,
  },
  addCaaatBtn: {
    backgroundColor: '#008960',
  },
  editPopupContainer: {
    flex: 1,
  },
  //category css Ends

  //Table css
  tableHeader: {
    fontSize: 12,
    lineHeight: 30,
    color: '#959FAD',
    fontWeight: '600',
  },
  tableHeader1: {
    fontSize: 12,
    lineHeight: 30,
    color: '#2B2120',
    fontWeight: '600',
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  tableCell: {
    fontSize: 13,
    lineHeight: 16,
    color: '#2B2120',
    fontWeight: 'bold',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    flex: 1
  },
  tableRow: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    shadowColor: '#0000000D',
    elevation: 26,
    // padding: 10,
    borderRadius: 6,
  },
  itemtableRow: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#F5F3F6',
    shadowColor: '#0000000D',
    elevation: 26,
    padding: 0,
    borderRadius: 6,
  },
  ProductRow: {
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#F5F3F6',
    borderWidth: 1,
    borderStyle: 'solid',
    shadowColor: '#0000000D',
    marginBottom: 10,
    elevation: 26,
    padding: 0,
    borderRadius: 6,
  },
  tableButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewBtn: {
    paddingRight: 13,
    borderRightColor: '#e8e8e8',
    borderRightWidth: 1,
    borderStyle: 'solid',
  },
  editBtn: {
    paddingLeft: 13,
  },
  ViewIcon: {
    width: 17,
    height: 13,
    resizeMode: 'contain',
  },
  editIcon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
  modiIcon: {
    width: 23,
    height: 20,
    resizeMode: 'contain',
  },
  DeleteIcon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
  //Table css Ends


  // sidemenu css
  settingsSidemenu: {
    color: '#000',
    fontSize: 13,
    lineHeight: 16,
    marginBottom: 1,
    fontWeight: 'bold',
  },
  drawerLabelSty: {
    color: '#484D54',
    padding: 0,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  proName: {
    color: '#484D54',
    padding: 0,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  textBold: {
    fontWeight: 'bold',
  },
  // sidemenu css Ends

  // add popup css 
  crossIcon: {
    width: 9,
    resizeMode: 'contain',
    height: 9,
    marginRight: 6,
  },
  crossIcon1: {
    width: 9,
    resizeMode: 'contain',
    height: 9,
  },
  popupHead: {
    paddingHorizontal: 15,
  },
  // add popup css Ends


  // select restaurant css 
  rescontainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#F3F4F5'
  },
  RestHead: {
    marginBottom: 29,
    fontSize: 32,
    paddingHorizontal: 10,
    lineHeight: 39,
    fontWeight: '400',
  },
  restItemBlk: {
    width: '33%',
    paddingHorizontal: 10,
    paddingBottom: 24,
  },
  restImage: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
    marginRight: 14,
  },
  restitle: {
    fontSize: 13,
    lineHeight: 22,
    fontWeight: '600',
  },
  resitem: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 8,
  },
  // select restaurant css Ends
  //FormAccess Picker
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  picker: {
    flex: 1,
    width: 300,
    height: 45,
    borderWidth: 2,


  },



  // view category css 
  viewCon: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 25,
    width: '100%',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  tableViewBorder: {
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderTopColor: '#CCCCCC',
    paddingTop: 15,
  },
  ViewConBlk: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  viewCatView: {
    backgroundColor: '#fff',
    width: '50%',
    paddingTop: 10,
    flexDirection: 'row',
  },
  catName: {
    fontSize: 12,
    color: '#959FAD',
    fontWeight: '600',
    lineHeight: 15,
  },
  catValue: {
    fontSize: 13,
    color: '#484D54',
    fontWeight: '400',
    paddingLeft: 0,
    lineHeight: 16,
    position: 'relative',
    top: -1
  },
  checkboxContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addTextPercentBtn: {
    backgroundColor: Colors.highlightGreen,
    borderRadius: 5,
    elevation: 1, marginBottom: 10
  },
  removeTaxBtn: {
    backgroundColor: Colors.primaryButton,
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 20,
    flexDirection: 'row'
  },

  // add popup css Ends
  // view category css Ends

  // fogot password css
  forgetPassBlk: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 20,
  },
  forgotPassView: {
    backgroundColor: '#fff',
    flex: 1,
  },
  forgotKey: {
    width: 49,
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9D7D9',
    borderRadius: 50,
    marginBottom: 30,
  },
  KeyIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  forgotText: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
    marginBottom: 16,
    color: '#1A0607',
  },
  forgotPara: {
    width: 300,
    textAlign: 'center',
    color: '#747474',
    fontSize: 11,
    lineHeight: 19,
    marginBottom: 8,
  },
  forgotInputView: {
    width: 300,
  },
  fogotLabel: {
    color: '#747474',
    fontSize: 10,
    lineHeight: 12,
    width: '100%',
    marginBottom: 4,
  },
  resetBtn: {
    backgroundColor: '#E83B42',
    width: 300,
    marginTop: 37,
    marginBottom: 50,
  },
  backLogin: {
    color: '#E83B42',
    fontSize: 11,
    lineHeight: 15,
  },
  // fogot password css Ends

  // add category 
  pickerInput: {
    elevation: 0,
    width: '100%',
    backgroundColor: '#fff',
    top: 1,
    margin: 0,
    left: 0,
    // height: 60,
    padding: 0,
    // position: 'absolute',
  },
  pickerView: {
    position: 'relative',
  },
  pickerItemOne: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '400',
    color: '#000000'
  },
  checkLabel: {
    fontSize: 14,
    lineHeight: 17,
  },
  dinePicker: {
    backgroundColor: '#fff',
  },
  flxDirow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modifierName: {
    fontSize: 15,
    color: '#484D54',
    lineHeight: 19,
  },
  flexend: {
    justifyContent: 'flex-end',
  },
  modifierAddInput: {
    paddingVertical: 10,
  },
  addmodView: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  checkBlkSetup: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  taxsetCheckbox: {
    position: 'absolute',
    left: 0,
  },
  modalPopup: {
    margin: 0,
    padding: 0,
  },
  // add category Ends

  // reg header
  dragFile: {
    width: 29,
    marginBottom: 7,
    height: 36,
  },
  regviewbg: {
    backgroundColor: '#F3F4F5',
  },
  // reg header Ends


  itemsCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },

  // dashboard 
  dashScrollView: {
    backgroundColor: '#F3F4F5',
  },
  dasCon: {
    paddingHorizontal: 21,
    paddingVertical: 23,
    width: '100%',
  },
  dashTopHeader: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  dashColTop: {
    paddingHorizontal: 9,
    width: '33.33%',
    paddingBottom: 21,
  },
  dashColTop100: {
    paddingHorizontal: 9,
    width: '100%',
    paddingBottom: 21,
  },
  dashTopCon: {
    backgroundColor: '#fff',
    borderRadius: 4,
    flexDirection: 'row',
    shadowColor: '#0000000D',
    elevation: 3,
    paddingVertical: 14,
    paddingHorizontal: 15,
  },
  dashtabContaier: {
    backgroundColor: '#fff',
    borderRadius: 4,
    flexDirection: 'row',
    shadowColor: '#0000000D',
    elevation: 3,
    flexWrap: 'wrap',
    padding: 30,
  },
  dineInText: {
    fontSize: 14,
    lineHeight: 17,
    color: '#484D54',
    marginBottom: 7,
    fontWeight: '700',
  },
  dineinNum: {
    fontSize: 39,
    lineHeight: 54,
    color: '#484D54',
    fontWeight: '400',
  },
  leftCon: {
    width: '40%',
  },
  dashrgtCon: {
    width: '60%',
    paddingLeft: 10,
  },
  orderBtn: {
    width: '100%',
    backgroundColor: '#E83B42',
    borderRadius: 4,
    padding: 10,
  },
  OrderText: {
    fontSize: 11,
    lineHeight: 13,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
  completedText: {
    fontSize: 12,
    lineHeight: 15,
    color: '#008960',
    fontWeight: '600',
    paddingLeft: 7,
  },
  totComView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  comCircle: {
    width: 9,
    height: 9,
    borderRadius: 9 / 2,
    backgroundColor: '#008960',
  },
  penCircle: {
    width: 9,
    height: 9,
    borderRadius: 9 / 2,
    backgroundColor: '#E83B42',
  },
  TotalOrderValueOnline: {
    width: 9,
    height: 9,
    borderRadius: 9 / 2,
    backgroundColor: '#FF97C0'
  },
  VoidCircle: {
    backgroundColor: '#959DFF',
  },
  reppenCircle: {
    backgroundColor: '#FF97C0',
  },
  repComCircle: {
    backgroundColor: '#8CDDED',
  },
  salesDineIn: {
    backgroundColor: '#8CDDED'
  },
  upperSecCol: {
    width: '66.66%',
  },
  dashUpprow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dashUpperCon: {
    paddingHorizontal: 6,
    paddingTop: 26,
    paddingBottom: 6,
  },
  dashdineCompletedBlk: {
    width: '33.33%',
    paddingHorizontal: 10,
    paddingBottom: 18,
  },
  HeadingCol: {
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 28,
  },
  upperSec: {
    color: '#484D54',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 15,
  },
  tableHead: {
    color: '#484D54',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 17,
  },
  dashTabCon: {
    width: '100%',
  },
  inprogressBtn: {
    backgroundColor: '#FFF0F1',
    borderRadius: 4,
    color: '#E83B42',
    fontSize: 12,
    lineHeight: 15,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  inproText: {
    color: '#E83B42',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 15,
  },
  completeBtn: {
    backgroundColor: '#EFFFF1',
    borderRadius: 4,
    color: '#008960',
    fontSize: 12,
    lineHeight: 15,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  comText: {
    color: '#008960',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 15,
  },
  dashTab: {
    flexDirection: 'row',
    paddingBottom: 15,
    width: '100%',
    marginBottom: 25,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  tabActive: {
    position: 'absolute',
    width: '100%',
    height: 2,
    bottom: -15,
    backgroundColor: '#E83B42',
  },
  dashnavActive: {
    bottom: -25,
  },
  dashSubBlk: {
    marginRight: 40,
  },
  redText: {
    color: '#E83B42',
  },
  textContainRed: {
    backgroundColor: '#E83B421C',
  },
  redOverlay: {
    backgroundColor: '#E83B42',
  },
  notAvatextContain: {
    backgroundColor: '#CCCCCC',
  },
  notAvatComplted: {
    color: '#959FAD',
  },
  dashTable: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  wdth25: {
    width: '25%',
  },
  dineInput: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // dashboard Ends
  //for dine in highlate the table
  hilightTable: {
    backgroundColor: Colors.highlightGreen,
    borderColor: Colors.highlightGreen,
  },
  hilightTable1: {
    backgroundColor: '#e83b42',
    borderColor: '#e83b42',
  },
  removeOvelay: {
    backgroundColor: '#fff',
    width: 0,
    height: 0,
  },


  modalSelect: {
    borderRadius: 4,
    backgroundColor: '#fff',
    width: '100%',
    height: 45,
    color: '#484D54',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'left',
    borderColor: '#DBDBDB',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  selectText: {
    color: '#484D54',
    fontSize: 14,
    lineHeight: 19,
  },
  selectcontainer: {
    width: 300,
    height: 200,
    margin: 'auto',
  },
  sectionStyle: {
    backgroundColor: 'red',
  },


  DropdownImg: {
    width: 8,
    height: 8,
    color: '#fff',
    borderLeftColor: "#000",
    borderBottomColor: '#000',
    borderStyle: 'solid',
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: '#fff',
  },
  menuBlk: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hilightText: {
    color: '#fff',
  },
  paynowpop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1085fc1f',
    marginTop: 20,
    padding: 20,
  },
  paynowpopAddmore: {
    flexDirection: 'row',
    backgroundColor: '#1085fc1f',
    marginTop: 20,
    padding: 10,
  },
  paynowpopAddmorevalue: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
  },


  paynowamount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    textAlign: 'center'
  },
  orderPopup: {
    fontSize: 14,
    lineHeight: 17,
  },
  paynowPopupRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  disPromo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  wdth100: {
    width: '100%',
  },
  orderPopuptext: {
    color: '#484d54',
    width: '20%',
  },
  itemFlex: {
    flexDirection: 'row',
  },
  margrgt10: {
    marginRight: 10,
  },
  popuprow: {
    flexDirection: 'row', flexWrap: 'wrap'
  },
  flexSl: {
    flex: 0.3,
  },
  FlexproducName: {
    flex: 1
  },
  producName: {
    flex: 0.4
  },
  flexcat: {
    flex: 0.5,
  },
  flexSta: {
    flex: 0.3,
  },
  flexAmot: {
    flex: 0.3
  },
  flexitemAmt: {
    flex: 0.8,
  },
  itemName: {
    paddingRight: 10,
    flex: 0.4
  },
  selectMainInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  selectText: {
    borderWidth: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 0,
    height: '100%',
    alignItems: 'center',
    width: '100%',
  },
  selectCont: {
    width: 200,
    margin: 0,
  },
  textStyle: {
    fontSize: 14,
    lineHeight: 17,
    color: '#484D54',
  },
  overlayText: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  cancelCont: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dropdonwImg: {
    position: 'absolute',
    right: 10,
    top: 22,
    zIndex: 2,
  },
  outletImg: {
    position: 'absolute',
    right: 10,
    top: 16,
    zIndex: 2,
  },
  selectText1: {
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 0,
    fontSize: 10,
  },
  textStyle4: {
    fontSize: 11,
    lineHeight: 20,
    color: '#484D54',
  },
  dropdonwImg1: {
    position: 'absolute',
    top: 8,
    right: 0,
    width: 8,
    resizeMode: 'contain',
  },
  leftTable: {
    width: '40%',
  },
  rgtTable: {
    width: '60%',
  },
  padHor: {
    paddingHorizontal: 5,
  },
  padHor0: {
    paddingHorizontal: 0,
  },
  dinecloseView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  marginBtm11: {
    marginBottom: 11,
  },
  userssl: {
    flex: 0.4,
  },
  username: {
    flex: 1,
  },
  userAdd: {
    flex: 1,
    paddingRight: 20,
  },
  disPromoBlk: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  discountBlk: {
    marginTop: 10,
    width: '50%',
  },
  tableCellNor: {
    fontWeight: '600',
  },
  discountvalueBlk: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  marBtm10: {
    marginBottom: 10,
  },
  disseg: {
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  marTop10: {
    marginTop: 10,
  },
  discountSeg: {
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  radioButton: {
    width: 15,
    height: 15,
    borderColor: '#dbdbdb',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginRight: 8,
    position: 'relative',
  },
  radioBtnView: {
    width: 8,
    height: 8,
    backgroundColor: Colors.highlightGreen,
    borderRadius: 10,
    position: 'absolute',
    top: 2.5,
    left: 2.5,
  },
  radioBtnChecked: {
    borderColor: Colors.highlightGreen,
  },
  checkbox: {
    width: 15,
    height: 15,
    borderColor: '#dbdbdb',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#fff',
    borderRadius: 4,
    marginRight: 8,
    position: 'relative',
  },
  checkTick: {
    width: 3,
    height: 7,
    position: 'absolute',
    zIndex: 1,
    left: 5.5,
    top: 2.5,
    borderRightWidth: 1,
    borderRightColor: Colors.highlightGreen,
    borderBottomColor: Colors.highlightGreen,
    borderBottomWidth: 1,
    transform: [{ rotate: "45deg" }]
  },
  padRgt15: {
    paddingRight: 15,
  },
  restbg: {
    paddingHorizontal: 25,
    paddingVertical: 16,
  },
  restView: {
    width: '33.33%',
    paddingHorizontal: 9,
  },
  addmoifieritem: {
    fontWeight: '700',
    margin: 0,
    color: '#000',
    fontSize: 24,
    lineHeight: 30,
  },
  martop15: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  drawerLabelSty1: {
    fontWeight: '400',
    color: '#484D54',
    fontSize: 13,
    lineHeight: 16,
    paddingLeft: 10,
  },
  dawerLabelItems: {
    paddingLeft: 10,
  },
  resLogo: {
    width: 80,
    height: 65,
    margin: 5,
    borderRadius: 3,
    resizeMode: 'contain',
  },
  resFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorMsg: {
    fontSize: 12,
    lineHeight: 14,
    bottom: -14,
    color: 'red',
    position: 'absolute',
    width: '100%',
    left: 0,

  },
  loginerror: {
    bottom: -16,
  },
  addPrinyCard: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexWrap: 'wrap',
  },
  cardTitle: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    color: '#484d54',
  },
  cardImg: {
    width: 11,
    height: 11,
    resizeMode: 'contain',
  },
  cardbod: {
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  imgRotate: {
    transform: [{ rotate: "180deg" }]
  },
  upimageRotate: {
    transform: [{ rotate: "360deg" }]
  },
  paddR25: {
    paddingRight: 25,
  },
  action: {
    flex: 0.5,
  },
  statusName: {
    flex: 0.5,
  },
  statusNameCode: {
    flex: 0.6,
  },
  StatusDes: {
    flex: 0.8,
  },
  flexalignBet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewTable: {
    paddingVertical: 15,
    marginLeft: -15,
  },
  viewTableHead: {
    width: '100%',
    borderBottomColor: 'white',
  },
  // popup: {
  //   display: 'flex',
  //   padding: 0,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'flex-start',
  //   margin: 0,
  // },
  drawerLabelSty3: {
    paddingLeft: 30,
    color: '#484D54',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '400',
  },
  drawerLabelSty4: {
    padding: 0,
  },
  dropDownRot: {
    width: 8, height: 8, transform: [{ rotate: "180deg" }]
  },
  dropDownNotRot: {
    width: 8, height: 8
  },
  dashboardloader: {
    paddingBottom: '50%',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  loader: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 90,
    backgroundColor: '#fff'
  },
  orderAction: {
    flex: 0.8,
  },
  orderDate: {
    flex: 1.5,
  },
  loaderImg: {
    width: '100%',
    height: Dimensions.get('window').height - 300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashobardtable: {
    width: '100%',
  },
  dashboardtableheader: {
    width: '33.33%',
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  dashbrddrp: {
    width: 90,
  },
  viewallorder: {
    flexDirection: 'row'
  },
  viewalldash: {
    color: '#407C6A'
  },
  dashboardtab: {
    justifyContent: 'space-between'
  },

  /********** kitchen css  ***********/
  kitchenCon: {
    backgroundColor: '#fff',
    padding: 25,
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  kitchensearch: {
    elevation: 0,
    backgroundColor: '#F7FAFB',
    borderColor: '#EBEBEB',
    borderWidth: 1,
    borderRadius: 4,
    height: 38,
  },
  kitInputStyle: {
    color: '#484D54',
    fontSize: 11,
    lineHeight: 12,
  },
  justifyEnd: {
    justifyContent: 'flex-end'
  },
  marBtm20: {
    marginBottom: 20,
  },
  alignCenter: {
    alignItems: 'center'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  dineImg: {
    width: 14,
    height: 11,
  },
  font13: {
    fontSize: 13,
    lineHeight: 15,
  },
  TextGreen: {
    color: '#008960'
  },
  TextBlack: {
    color: '#484D54'
  },
  padL4: {
    paddingLeft: 4,
  },
  padR9: {
    paddingRight: 9
  },
  font9: {
    fontSize: 9,
    lineHeight: 10,
  },
  dineKitch: {
    paddingHorizontal: 9,
    paddingVertical: 10,
    borderColor: '#EBEBEB',
    borderStyle: 'solid',
    marginLeft: 18,
    borderWidth: 1,
    borderRadius: 4,
  },
  wdth30: {
    width: '30%',
  },
  receivedBg: {
    backgroundColor: '#EBF2FC'
  },
  receivedCol: {
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderRadius: 8,
  },
  padR4: {
    paddingRight: 4,
  },
  CountRound: {
    width: 19,
    height: 19,
    borderRadius: 10,
  },
  receiCountBg: {
    backgroundColor: '#959FAD'
  },
  font10: {
    fontSize: 10,
    lineHeight: 12,
  },
  textWhite: {
    color: '#fff'
  },
  marBtm16: {
    marginBottom: 16
  },
  receivedBlk: {
    backgroundColor: '#fff',
    shadowColor: '#CFDFF5CC',
    elevation: 2,
    marginBottom: 10
  },
  font11: {
    fontSize: 11,
    lineHeight: 14,
  },
  marBtm2: {
    marginBottom: 2,
  },
  receiTime: {
    borderRadius: 9,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  redBg: {
    backgroundColor: '#E83B42'
  },
  receivedHeader: {
    padding: 13
  },
  ReceivedFooter: {
    borderTopWidth: 1,
    borderTopColor: '#EDECF1',
    paddingHorizontal: 13,
    paddingVertical: 5
  },
  textDefault: {
    color: '#6d6d6d'
  },
  receivedBody: {
    paddingBottom: 13,
  },
  borderBtm: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  tablePad: {
    paddingHorizontal: 13,
    paddingVertical: 5
  },
  wdth60: {
    width: '60%'
  },
  wdth20: {
    width: '20%'
  },
  prapareView: {
    paddingTop: 13,
  },
  prepareBtn: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    backgroundColor: '#484D54',
    borderRadius: 4
  },
  imgRotate: {
    transform: [{ rotate: "180deg" }]
  },
  YellowBg: {
    backgroundColor: '#FFF5A6'
  },
  grayBg: {
    backgroundColor: '#F1F6FE',
  },
  preparaBg: {
    backgroundColor: '#FFF2F0'
  },
  readyBg: {
    backgroundColor: '#E5F7E8'
  },
  greenBg: {
    backgroundColor: '#008960'
  },
  greenTimeBg: {
    backgroundColor: '#E1F1E4'
  },
  padR6: {
    paddingRight: 6
  },
  padL6: {
    paddingLeft: 6
  },
  marLeft10: {
    marginLeft: 10,
  },
  /********** kitchen css - Ends ***********/


  /****** chart css *****/
  chartLabel: {
    color: '#959FAD',
    fontSize: 13,
    lineHeight: 15,
    fontWeight: '500',
  },
  chartDot: {
    height: 9,
    width: 9,
    borderRadius: 9,
    marginRight: 4,
  },
  chartCount: {
    fontSize: 20,
    lineHeight: 20,
    color: '#484D54',
    fontWeight: '600'
  },
  marBtm5: {
    marginBottom: 5,
  },
  /****** chart css - Ends *****/


  longDataTable: {
    flex: 1,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  flexOne: {
    flex: 1,
  },
  InvenCreated: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  unitflex: {
    flex: 0.5
  },
  unitflex1: {
    flex: 0.3
  },
  productFlex: {
    flex: 0.9
  },
  qtyflex: {
    flex: 0.6
  },
  ShowEye: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
    height: 40,
    width: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  padr40: {
    paddingRight: 40,
  },
  avatarIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },


  resOut: {
    width: '10%',
  },

  // edit profile 
  font16: {
    fontSize: 16,
    lineHeight: 20,
  },
  editProImgBlk: {
    width: 92,
    height: 92,
  },
  editProIcon: {
    width: 92,
    height: 92,
    borderRadius: 92,
  },
  editProIcon1: {
    width: 92,
    height: 92,
    borderRadius: 6,
  },
  editIconBlk: {
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: '#E83B42',
    position: 'absolute',
    bottom: 10,
    right: -1,
    zIndex: 1,
  },
  proImgEdit: {
    width: 12,
    height: 12,
  },
  editprofileRightBlk: {
    width: Dimensions.get('window').width - 152,
    paddingLeft: 20,
  },
  paddRL12: {
    paddingHorizontal: 12,
  },
  wdth80: {
    width: '80%',
  },
  DocDelete: {
    width: 12,
    resizeMode: 'contain'
  },
  uploadImage: {
    width: 23,
    resizeMode: 'contain'
  },
  padL10: {
    paddingLeft: 10,
  },
  profileText: {
    color: '#484D54',
  },
  uploDocBlk: {
    paddingTop: 5,
  },
  footerBtn: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#00000012',
    padding: 15,
  },
  marginTop0: {
    marginTop: 0,
  },
  cancelBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E83B42',
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 10,
    paddingHorizontal: 35,
    color: '#E83B42',
    borderRadius: 22,
  },
  marRgt18: {
    marginRight: 18,
  },
  UpdateBtn: {
    backgroundColor: '#E83B42',
    borderWidth: 1,
    borderColor: '#E83B42',
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 10,
    paddingHorizontal: 35,
    color: '#fff',
    borderRadius: 22,
  },
  SearchBtn: {
    backgroundColor: '#EC187B',
    borderWidth: 1,
    borderColor: '#EC187B',
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 7,
    paddingHorizontal: 13,
    color: '#fff',
    borderRadius: 4,
  },
  mt14: {
    marginTop: 14,
  },
  editProfileBtn: {
    backgroundColor: '#E83B42',
    borderWidth: 1,
    borderColor: '#E83B42',
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 9,
    paddingHorizontal: 12,
    color: '#fff',
    borderRadius: 4,
  },
  sidemenuIcon: {
    width: 21,
    height: 21,
    borderRadius: 21,
    backgroundColor: '#F2F2F2'
  },
  sidemenuImg: {
    width: 10,
    resizeMode: 'contain'
  },
  proBtmBorder: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  padB25: {
    paddingBottom: 25,
  },
  padL12: {
    paddingLeft: 12,
  },

  // add Items
  padB6: {
    paddingBottom: 6,
  },
  padV25: {
    paddingVertical: 25
  },
  padH10: {
    paddingHorizontal: 10
  },
  width33: {
    width: '33.33%'
  },
  martop32: {
    marginTop: 32,
  },
  receipeCon: {
    borderWidth: 1,
    borderColor: '#B6BBC2',
    borderRadius: 4,
    padding: 25,
  },

  receipeText: {
    position: 'absolute',
    top: -15,
    left: 25,
    width: 65,
    zIndex: 2,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#B6BBC2',
    borderRadius: 4,
  },
  modifierWidth: {
    width: 75,
  },
  headerBorder: {
    borderBottomWidth: 0,
  },
  addReceipe: {
    backgroundColor: '#E83B42',
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 11,
  },
  padd20: {
    padding: 20,
  },
  fontBold: {
    fontWeight: '700'
  },
  marBtm8: {
    marginBottom: 8
  },
  font24: {
    fontSize: 24,
    lineHeight: 29
  },
  continueBtn: {
    backgroundColor: '#E83B42',
    borderRadius: 23,
    paddingHorizontal: 28,
    borderWidth: 1,
    borderColor: '#E83B42',
    paddingVertical: 12,
  },
  noBtn: {
    backgroundColor: '#fff',
    borderRadius: 23,
    paddingHorizontal: 28,
    borderWidth: 1,
    borderColor: '#E83B42',
    paddingVertical: 12,
  },
  sucImg: {
    width: 450,
    height: 150,
    resizeMode: 'contain',
    position: 'relative',
    zIndex: 1,
  },
  marRgt30: {
    marginRight: 30,
  },
  marBtm34: {
    marginBottom: 34,
  },
  marBtm45: {
    marginBottom: 45,
  },
  loaderIcon: {
    width: 70,
    height: 70,
  },
  loaderPopupBlk: {
    backgroundColor: '#484D546E'
  },
  width50: {
    width: '50%',
  },
  greenbtn: {
    backgroundColor: Colors.highlightGreen,
    borderColor: Colors.highlightGreen,
  },
  taxPerWidth: {
    width: 130
  },
  recQuaText: {
    width: 150
  },
  sucGif: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 20,
    right: 165,
    zIndex: 2,
  },
  trashGif: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 20,
    right: 50,
    zIndex: 2,
  },
  OutletsucGif: {
    width: 48,
    height: 48,
    borderRadius: 48,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 20,
    right: 100,
    zIndex: 2,
  },
  OutletupdateGif: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 20,
    right: 100,
    zIndex: 2,
  },
  marRgt10: {
    marginRight: 10,
  },
  headerStyle: {
    borderBottomWidth: 0,
    alignItems: 'center',
  },
  width70: {
    width: '70%'
  },
  paddB60: {
    paddingBottom: 60
  },
  width100px: {
    maxWidth: 80,
  },
  restCol: {
    padding: 15,
    borderRadius: 8,
    flex: 1,
  },
  loginMobileHeight: {
    height: Dimensions.get('window').height < 400 ? 700 : 'auto',
  },
  loginBg: {
    backgroundColor: '#F2FCF9'
  },
  padB15: {
    paddingBottom: 15,
  },
  outletAdd: {
    fontSize: 13,
    lineHeight: 15,
  },
  pad20: {
    padding: 20,
  },
  runningStatus: {
    backgroundColor: '#FFF0F1',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  Prepared: {
    backgroundColor: '#FFF8DE'
  },
  ComplStatus: {
    backgroundColor: '#EFFFF1'
  },
  preText: {
    color: '#D4A500'
  },
  wdth32: {
    width: '32%'
  },
  pr10: {
    paddingRight: 10
  },
  width4: {
    width: '4%'
  },
  height35: {
    height: 35
  },
  marBtm12: {
    marginBottom: 12
  },
  alignEnd: {
    alignItems: 'flex-end'
  },

  // report dashboard css
  reportDashVieew: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60,
  },
  stateDateCon: {
    backgroundColor: '#fff',
    padding: 7,
    paddingRight: 20,
    borderRadius: 4,
    height: 35,
  },
  paddL5: {
    paddingLeft: 5,
  },
  textDate: {
    color: '#959FAD'
  },
  font6: {
    fontSize: 6,
    lineHeight: 7,
  },
  width170px: {
    width: 170,
  },
  paddL10: {
    paddingLeft: 10,
  },
  marBtm30: {
    marginBottom: 30
  },
  priText: {
    color: '#EC187B'
  },
  paddRL10: {
    paddingHorizontal: 10
  },
  dashedBorderRgt: {
    borderRightColor: '#DEDEDE',
    borderRightWidth: 1,
    borderStyle: 'solid',
  },
  headerRightBorder: {
    borderRightColor: '#EBEBEB',
    borderRightWidth: 1,
    borderStyle: 'solid',
  },
  headerLeftBorder: {
    // borderLeftColor: '#EBEBEB',
    // borderLeftWidth: Platform.OS === 'ios' ? 0 : 1,
    // borderStyle: 'solid',
  },
  padL2: {
    paddingLeft: 2,
  },
  dashboardHeader: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    width: 85,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashMenuActive: {
    backgroundColor: '#F3F4F5',
  },
  padtop5: {
    paddingTop: 5,
  },
  menuText: {
    color: '#959FAD'
  },
  // report dashboard css - Ends
  marRgt15: {
    marginRight: 15,
  },
  orderColumn: {
    width: '32%'
  },
  salesColumn: {
    width: '66%'
  },
  padH9: {
    paddingHorizontal: 9
  },
  // report dashboard css - Ends

  // after login css
  afterLoginScroll: {
    backgroundColor: '#484D54D6'
  },
  afterloginView: {
    padding: 45,
  },
  font34: {
    fontSize: 34,
    lineHeight: 47,
  },
  width30: {
    width: '30%'
  },
  stepsCol: {
    borderRadius: 20,
    padding: 25,
    position: 'relative',
  },
  defaultViewBg: {
    backgroundColor: '#5c6166',
  },
  stepText: {
    color: '#5c6166'
  },
  addCatBtn: {
    backgroundColor: '#E83B42',
    borderWidth: 1,
    borderColor: '#E83B42',
    padding: 11,
    borderRadius: 19,
  },
  skipBtn: {
    backgroundColor: '#fff',
  },
  opacity36: {
    backgroundColor: '#e83b405c',
    borderColor: '#e83b405c'
  },
  opacityText: {
    color: '#ffffff5c'
  },
  tickIcon: {
    position: 'absolute',
    top: 9,
    left: 9,
  },
  left50: {
    position: 'absolute',
    top: 9,
    left: 150,
  },
  positionabsolute: {
    position: 'absolute',
    width: '100%',
    top: 40,
    left: 0
  },
  defbuttonBg: {
    backgroundColor: '#614a51',
    borderColor: '#614a51'
  },
  defBtnText: {
    color: '#64666b'
  },
  afterLoginLog: {
    width: 41,
    height: 41,
  },
  stepsPro: {
    paddingHorizontal: 45,
    paddingVertical: 34,
    position: 'relative'
  },
  progressBar: {
    backgroundColor: '#EBEBEB',
    borderRadius: 20,
    height: 13,
    width: '100%'
  },
  progressView: {
    backgroundColor: "#07D008",
    position: 'absolute',
    height: 13,
    borderRadius: 20,
  },
  footerCompletedAlign: {
    position: 'absolute', right: 45, top: 18
  },
  sidemenuCompletedAlign: {
    position: 'absolute', right: 0, top: -18
  },
  formView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 15,
    width: '100%',
  },
  // after login css - Ends

  sidemenuprogress: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  marTop5: {
    marginTop: 5,
  },
  posAbsolute: {
    position: 'absolute',
    top: 0,
    letf: 0,
    zIndex: 1,
  },

  //Toggle Button
  toggleButton: {
    width: 36,
    height: 14,
    borderColor: '#dbdbdb',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#fff',
    borderRadius: 8,
    position: 'relative',
  },
  togglRound: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: Colors.highlightGreen,
    position: 'absolute',
    top: -1,
    left: -1
  },
  toogleRoundActive: {
    left: 22,
    backgroundColor: 'white',

  },
  toggleButtonActive: {
    backgroundColor: Colors.highlightGreen,
  },
  dangerIcon: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  pb80: {
    paddingBottom: 80
  },
  // css changes27/06/2023
  closePos: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 2
  },
  // css changes27/06/2023 Ends

  // css changes 29/06/2023 
  mt5: {
    marginTop: 5
  },
  // css changes 29/06/2023 Ends

  // css changes 30/06/2023
  padtop15: {
    marginTop: 15
  },
  // css changes 30/06/2023 Ends

  // css changes 03/07/2023
  heightauto: {
    minHeight: 45,
    height: 'auto'
  },
  width100per: {
    width: '100%'
  },
  // css changes 03/07/2023 Ends

  // css changes 03/07/2023
  padl0: {
    paddingLeft: 0
  },
  // css changes 03/07/2023 Ends

  //09/09/23//
  siNo:{
    flex:0.2
  },

  // add print
  headerPrintBlk: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  },
    dnone: {
    display: 'none'
  },
  //add print

  // add modifier
  padV10: {
    paddingVertical: 10,
  },
  lineHeight20: {
    lineHeight: 20
  },
  pad15: {
    padding: 15
  },
  signLabelPrD: {
    fontSize: 12,
    lineHeight: 15,
    color: '#484d54',
    marginBottom: 8,
    marginLeft: 20
  },
  width7: {
    width: '7%'
  },
  wdth31: {
    width: '31%'
  },
  padt15: {
    paddingTop: 15
  },

  
  // add modifier
  popupheight: {
      height: Dimensions.get('window').height - 150,
  }
}); 
