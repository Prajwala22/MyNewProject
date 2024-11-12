// import { Alert } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
// Action to be taken after select location button click


export default function ShowGoogleMap(props: any) {
    const [isMapReady, setIsMapReady] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState("");
    const [regionChangeProgress, setRegionChangeProgress] = useState(false);
    const [region, setRegion] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
    });
    const [marginTop, setMarginTop] = useState(1);
    const [location, setLocation] = useState('');

    const onLocationSelect = () => {
        props.getMapLocation(userLocation);
    }
    const onMapReady = () => {
        setIsMapReady(true);
        setMarginTop(0);
    }

    // Fetch location details as a JOSN from google map API
    const fetchAddress = () => {
        try {
            fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + region.latitude + "," + region.longitude + "&key=" + "AIzaSyDanBRIZikwcv7U-BI4wsZaLJkdw6DmkDk")
                .then((response) => response.json())
                .then((responseJson) => {
                    const userLocation = responseJson.results[0].formatted_address;
                    setUserLocation(userLocation);
                    setRegionChangeProgress(false);
                });
        }
        catch (error) {
        }

    }

    // Update state on region change
    const onRegionChange = (region: any) => {
        setRegion(region);
        setRegionChangeProgress(true);
    }

    useEffect(() => {
        fetchAddress();
        //   return () => {
        //       cleanup
        //   }
    }, [region])

    useEffect(() => {
        let streetAdd = "";
        (async () => {
            let foreGroundPermission = await Location.getForegroundPermissionsAsync();
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            Location.setGoogleApiKey('AIzaSyAAsdOeoQ-BD9xngFod7wWObKsM5qAU_3Q');
            // Location.installWebGeolocationPolyfill();
            let location: any;
            try {
                location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.BestForNavigation,
                    LocationActivityType: Location.ActivityType.OtherNavigation,
                    maximumAge: 5000,
                    timeout: 15000,
                });
            } catch {
                location = await Location.getLastKnownPositionAsync({
                    accuracy: Location.Accuracy.BestForNavigation,
                    LocationActivityType: Location.ActivityType.OtherNavigation,
                    maxAge: 5000,
                    timeout: 15000,
                });
            }
            setLocation(location);
            const regionNew = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            };
            setRegion(regionNew);
            setLoading(false);
        })();
    }, []);


    if (loading) {
        return (
            <View style={styles.spinnerView}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={{ flex: 2 }}>
                    {!!region.latitude && !!region.longitude &&
                        <MapView
                            style={{ ...styles.map, marginTop: marginTop }}
                            initialRegion={region}
                            showsUserLocation={true}
                            onMapReady={onMapReady}
                            onRegionChangeComplete={onRegionChange}
                        >
                            <Marker
                                coordinate={{ "latitude": region.latitude, "longitude": region.longitude }}
                                title={"Your Location"}
                                draggable
                            />
                        </MapView>
                    }

                </View>
                <View style={styles.deatilSection}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 20 }}>Move map for location</Text>
                    <Text style={{ fontSize: 10, color: "#999" }}>LOCATION</Text>
                    <Text numberOfLines={2} style={{ fontSize: 14, paddingVertical: 10, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
                        {!regionChangeProgress ? userLocation : "Identifying Location..."}</Text>
                    <View style={styles.btnContainer}>
                        <Button
                            title="PICK THIS LOCATION"
                            onPress={onLocationSelect}
                        >
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width
    },
    map: {
        flex: 1
    },
    mapMarkerContainer: {
        left: '47%',
        position: 'absolute',
        top: '42%'
    },
    mapMarker: {
        fontSize: 40,
        color: "red"
    },
    deatilSection: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        display: "flex",
        justifyContent: "flex-start"
    },
    spinnerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    btnContainer: {
        width: Dimensions.get("window").width - 20,
        position: "absolute",
        bottom: 100,
        left: 10
    }
});

function setErrorMsg(arg0: string) {
    throw new Error("Function not implemented.");
}
// export default ShowGoogleMap;