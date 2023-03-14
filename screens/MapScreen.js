import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  useWindowDimensions,
  ActivityIndicator,
  ScrollView, Animated
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, AnimatedRegion } from "react-native-maps";
import MapViewDirections, {
  DirectionsService,
} from "react-native-maps-directions";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Card, Button } from "react-native-paper";
import COLORS from "../Constants/Colors";
import { UserContext } from "../services/UserContext";

const MapScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  console.log(user);
  const [origin, setOrigin] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalKm, setTotalKm] = useState(0);
  const { width, height } = useWindowDimensions();
  const [driverPosition, setDriverPosition] = useState(
    null
  );
  const NewCoordinates = [
    { latitude: 14.187818740084317, longitude: 77.62524233962212 },
    { latitude: 14.180226345688, longitude: 77.62924968892192 },
    { latitude: 14.17021947021324, longitude: 77.62135863020704 },
    { latitude: 14.147477902424004, longitude: 77.60575818703529 },
    {latitude:14.120284566071142, longitude:77.61097595116624},
    {latitude: 14.084959345841485, longitude: 77.5970996934118}
  ];

  useEffect(() => {
    const getHomeServiceLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //setOrigin(location.coords);
      setOrigin({
        latitude: parseFloat(user.latitude),
        longitude: parseFloat(user.longitude),
      });
      setDestination({
        latitude: 14.0930258502412,
        longitude: 77.59604662621587,
      });


      let currentLocation = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        (ordinates) => {
          NewCoordinates.map((x=>{
            setInterval(() => {
              setOrigin(x);
            }, 6000);
            
          }))
         
        }
      );
    };
    getHomeServiceLocation();
    if(origin && destination){
      
    }
  }, [origin,destination]);

   

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        height: height,
        width: width,
      }}
    >
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(user.latitude),
          longitude: parseFloat(user.longitude),
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}
        showsUserLocation
        followsUserLocation
      >
        {origin && (
          <Marker
            title={user.name}
            description={totalKm.toFixed(1)+" Km" +" | "+ totalMinutes.toFixed(1)+" Min"}
            coordinate={origin}
            labelStyle ={{padding:5}}
          >
            <View
              style={{
                backgroundColor: COLORS.secondary,
                padding: 5,
                borderRadius: 50,
              }}
            >
              <MaterialIcons
                name="bike-scooter"
                size={25}
                color={"Green"}
              ></MaterialIcons>
            </View>
          </Marker>
        )}
        {destination && (
          <Marker
            title={"Customer"}
            description={"Address"}
            coordinate={destination}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 5,
                borderRadius: 50,
                borderColor: COLORS.darkgrey,
              }}
            >
              <MaterialIcons
                name="home-filled"
                size={25}
                color={"Green"}
              ></MaterialIcons>
            </View>
          </Marker>
        )}
        <MapViewDirections
          origin={origin}
          destination={destination}
          strokeWidth={5}
          strokeColor={COLORS.primary}
          apikey="AIzaSyBdbtpnWfyMaY89Q4GqhYeQFnvueUZuBuM"
          onReady={(result)=>{
            setTotalMinutes(result.duration);
            setTotalKm(result.distance);
          }}
        ></MapViewDirections>
      </MapView>
     
        <Card style={styles.card}>
          <Card.Title
            title="Service Partner Details"
            style={{ backgroundColor: COLORS.secondary, color: COLORS.white}}
            labelStyle={{color:COLORS.white}}
            color={COLORS.white}
          />

          <Card.Content style={{ backgroundColor: COLORS.white }}>
            <Text variant="bodyMedium" style={styles.TextStyle}>
              Name: {user.name}
            </Text>
            <Text variant="bodyMedium" style={styles.TextStyle}>
              Will Take : {totalMinutes.toFixed(1)} Min
            </Text>
            <Text variant="bodyMedium" style={styles.TextStyle}>
              Partner on the Way: {totalKm.toFixed(1)} Km
            </Text>

            <Button style={{backgroundColor:COLORS.primary, height:50}} 
            labelStyle={{ fontSize: 20, padding:5, letterSpacing:2 }}
              icon="phone"
              mode="contained"
              onPress={() => console.log("Pressed")}
            >
             {user.phoneNo}
            </Button>
          </Card.Content>
        </Card>
 
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "70%",
  },
  destination: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    elevation: 5,
  },
  destinationText: {
    fontSize: 16,
    marginBottom: 5,
  },
  destinationInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  },
  card: {
    elevation: 10, // add shadow
    borderRadius: 20, // add border radius
    padding: 10, // add padding
    flex: 1,
    width: "100%",
    margin: 5,
  },
  TextStyle: {
    color: COLORS.greyShade,
    padding: 5,
    fontSize: 16,
    fontWeight:'500'
  },
});

export default MapScreen;
