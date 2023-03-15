import React, { Component, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { List, Button, Divider } from "react-native-paper";
import { UserContext } from "../services/UserContext";
import COLORS from "../Constants/Colors";

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const navigateToMyorders = () => {
    navigation.navigate("My Orders");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{ uri: user.image }} />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{user.name}</Text>

          <Button
            mode="outline"
            style={{
              borderColor: COLORS.primary,
              borderRadius: 20,
              backgroundColor: COLORS.secondary,
              marginBottom: 5,
              color:COLORS.white
            }}
           labelStyle ={{color:COLORS.white}}
            onPress={() => console.log("Pressed")}
          >
            Edit Profile
          </Button>
        </View>
        <View style={{ margin: 3 }}>
          <Divider style={{ color: COLORS.darkgrey, padding: 1 }}></Divider>
          <TouchableOpacity>
            <List.Item
              title="My Orders"
              onPress={navigateToMyorders}
              left={(props) => <List.Icon {...props} icon="shopping" />}
            />
          </TouchableOpacity>
          <Divider style={{ color: COLORS.darkgrey, padding: 1 }}></Divider>
          <TouchableOpacity>
            <List.Item
              title="Address"
              left={(props) => <List.Icon {...props} icon="google-maps" />}
            />
          </TouchableOpacity>
          <Divider style={{ color: COLORS.darkgrey, padding: 1 }}></Divider>
          <TouchableOpacity>
            <List.Item
              title="Help"
              left={(props) => (
                <List.Icon {...props} icon="help-circle-outline" />
              )}
            />
            <Divider style={{ color: COLORS.darkgrey, padding: 1 }}></Divider>
          </TouchableOpacity>
          <TouchableOpacity>
            <List.Item
              title="Logout"
              left={(props) => <List.Icon {...props} icon="logout" />}
            />
          </TouchableOpacity>
          <Divider style={{ color: COLORS.darkgrey, padding: 1 }}></Divider>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    height: 180,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 120,
  },
  name: {
    fontSize: 22,
    color: COLORS.primary,
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    alignItems: "center",
    padding: 35,
  },
  name: {
    fontSize: 28,
    color: COLORS.primary,
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: COLORS.primary,
    marginTop: 10,
    alignSelf: "center",
    width: "100%",
    borderRadius: 50,
    borderColor: COLORS.primary,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 5,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  buttonP2: {
    marginTop: 16,
    alignSelf: "center",
    width: "50%",
    borderRadius: 10,
  },
});
