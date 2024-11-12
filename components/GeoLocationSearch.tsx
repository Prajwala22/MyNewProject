import React, { useState } from "react";
import { StyleSheet, View, Modal as NativeModal, Pressable, Text, TextInput } from 'react-native';
import { FAB } from 'react-native-paper';
import { theme } from "../configuration/theme";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapComponent from "./MapComponent";

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };
// const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };

// const GOOGLE_PLACES_API_KEY = 'AIzaSyAAsdOeoQ-BD9xngFod7wWObKsM5qAU_3Q';
const GOOGLE_PLACES_API_KEY = 'AIzaSyAAsdOeoQ-BD9xngFod7wWObKsM5qAU_3Q';


const GeoLocationSearch = (props: any) => {

    const [showGeoModal, setShowGeoModal] = useState(false);
    const [showMap, setShowMap] = useState(false);

    const filterBasedLocation = (locationMap: any) => {
        setShowMap(false);
        props.changeDisplayState();
        props.mapFilterSearch(locationMap);
    }
    function displayModal(show: boolean | ((prevState: boolean) => boolean)) {
        props.setShowGeoModal(show);
    }

    const MyComponent = () => {
        const [textInputValue, setTextInputValue] = useState('');
        
        return (
          <TextInput
            value={textInputValue}
            onChangeText={setTextInputValue}
            placeholder="Enter a place"
          />
        );
      };
    return (

        <NativeModal
            animationType="slide"
            transparent={false}
            visible={props.showGeoModal}
            style={styles.container1}
        >

            <View style={{ flex: 1, flexDirection: 'column', padding: 10, marginTop: 25 }}>

                <View style={{ flex: 1, alignContent: 'space-around' }}>
                    <GooglePlacesAutocomplete
                        placeholder="Location Search"
                        minLength={2} // minimum length of text to search
                        // returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed={true} // true/false/undefined
                        fetchDetails={true}
                        enableHighAccuracyLocation={true}
                        predefinedPlacesAlwaysVisible={true}
                        renderDescription={row => row.description} // custom description render
                        // onPress={(data, details = null) => {
                        //     var searchData = data?.terms;
                        //     let commaData: any[] = [];
                        //     searchData?.forEach((element: { value: any; }) => {
                        //         commaData?.push(element?.value);
                        //     });
                        //     let selectedLoc = commaData.join(',');
                        //     filterBasedLocation(selectedLoc);
                        // }}

                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: GOOGLE_PLACES_API_KEY,
                            language: 'en', // language of the results
                            // types: '(cities)', // default: 'geocode'
                        }}
                        styles={{
                            textInput: {
                                borderWidth: 1,
                                borderRadius: 20,
                            },
                            description: {
                                fontWeight: 'bold',
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },

                        }}

                        nearbyPlacesAPI="GooglePlacesSearch" // 
                        GoogleReverseGeocodingQuery={{
                            language: 'en'
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}

                        filterReverseGeocodingByTypes={[
                            'locality',
                            'administrative_area_level_3',
                        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        predefinedPlaces={[homePlace]}

                        debounce={200}
                        renderRightButton={() => {
                            return (
                                <FAB
                                    style={styles.fabClose}
                                    small
                                    label="X"
                                    onPress={props.changeDisplayState} icon={""} />
                            )
                        }}
                        renderHeaderComponent={() => {
                            return (
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 0.1, alignItems: 'flex-start' }}>
                                            <MaterialCommunityIcons name="crosshairs-gps" color="blue" size={25} style={{ padding: 5 }} />
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-start', padding: 5 }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'orange' }}>Choose Current Location</Text>
                                        </View>
                                    </View>

                            )
                        }}
                        listEmptyComponent={() => {
                            return (
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 0.1, alignItems: 'flex-start' }}>
                                    <MaterialCommunityIcons name="crosshairs-gps" color="blue" size={25} style={{ padding: 5 }} />
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-start', padding: 5 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Choose Current Location</Text>
                                </View>
                            </View>
                            )
                        }}
                        // suppressDefaultStyles={true}
                    />
                </View>

            </View>
            <NativeModal
                animationType="slide"
                transparent={false}
                visible={showMap}
                style={styles.container1}
            >
                <MapComponent getMapLocation={filterBasedLocation}></MapComponent>
            </NativeModal>
        </NativeModal>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        marginTop: 0
    },
    container1: {
        padding: 5,
        width: '100%',
        marginTop: 25,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
    },
    fabClose: {
        position: 'relative',
        color: 'white',
        backgroundColor: 'red',
    },
});


export default GeoLocationSearch;