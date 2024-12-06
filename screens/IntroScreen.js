// screens/IntroScreen.js
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { NavigationProp } from '@react-navigation/native';
import style from '../assets/css/style';

const slides = [
    {
      key: 's1',
      text: 'Our job is to ensure your orders are placed fast so that you can focus on delighting your customers',
      title: 'The Fastest POS',
      image: require('../assets/images/welcome.png'),
    },
    {
      key: 's2',
      title: 'The Fastest POS',
      text: 'Our job is to ensure your orders are placed fast so that you can focus on delighting your customers',
      image: require('../assets/images/slider_2.png'),
    },
    {
      key: 's3',
      title: 'The Fastest POS',
      text: 'Our job is to ensure your orders are placed fast so that you can focus on delighting your customers',
      image: require('../assets/images/slider_3.png'),
    },
  ];
const IntroScreen = ({ navigation }) => {
    let i = 0, timeout;
    let slider;
    const tick = () => {
      slider?.goToSlide(i);
      i += 1;
      if (i >= slides.length) {
        i = 0;
      }
    };
  
    useEffect(() => {
      timeout = setInterval(() => {
        tick();
      }, 2000);
  
      return () => clearInterval(timeout);
    }, []);
  
    const onDone = () => {
      navigation.navigate('LoginScreen');
    };
  
    const RenderItem = ({ item }) => {
      return (
        <View style={[style.flex1, style.intoBlk]}>
                <Image style={[style.introImageStyle, style.resizeCover]} source={item.image} />
                <View style={style.sliderText}>
                    <Text style={style.introTitleStyle}>{item.title}</Text>
                    <Text style={style.introTextStyle}>{item.text}</Text>
                    <TouchableOpacity onPress={() => onDone()}>
                        <View style={style.buttonCircle}>
                            <Text style={style.getStartText}>
                                Get Started
                        </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        // <View style={[style.flex1, style.intoBlk]}>
        //   <Image style={style.image} source={item.image} />
        //   <View style={style.sliderText}>
        //     <Text style={style.title}>{item.title}</Text>
        //     <Text style={style.text}>{item.text}</Text>
        //     <TouchableOpacity onPress={onDone}>
        //       <View style={style.button}>
        //         <Text style={style.buttonText}>Get Started</Text>
        //       </View>
        //     </TouchableOpacity>
        //   </View>
        // </View>
      );
    };
  
    return (
        <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        showNextButton={false}
        showDoneButton={false}
        ref={(ref) => (slider = ref)}
        dotStyle={style.dotStyle}
        activeDotStyle={style.activeDotStyle}
      />
    )
};

const styles = StyleSheet.create({
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    image: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      resizeMode: 'cover',
    },
    textContainer: {
      position: 'absolute',
      bottom: 100,
      alignSelf: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#000',
    },
    text: {
      fontSize: 18,
      color: '#000',
      textAlign: 'center',
      paddingVertical: 10,
    },
    button: {
      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#22bcb5',
      borderRadius: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    dotStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    activeDotStyle: {
      backgroundColor: '#22bcb5',
    },
  });
export default IntroScreen;
