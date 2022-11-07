import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./Screens/Home";
import News from "./Screens/News";
import Prices from "./Screens/Prices";
import { initializeApp } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCpjPJCT-bO49GkuQq982fVp3Ju0sm5prM",
    authDomain: "native-9ba01.firebaseapp.com",
    projectId: "native-9ba01",
    storageBucket: "native-9ba01.appspot.com",
    messagingSenderId: "140174126073",
    appId: "1:140174126073:web:f79e36a08b365da9572b28",
    measurementId: "G-6W3KPL713D",
  };
  const app = initializeApp(firebaseConfig);
  const Stack = createNativeStackNavigator();

  const theme = {
    bgColor : '#36454f',
    fontColor : '#fff',
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
          name="Home"
          children={({ navigation }) => (
            <Home app={app} navigation={navigation} theme={theme}/>
          )}
        />
        <Stack.Screen
          options={{
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
          name="News"
          children={({ navigation }) => (
            <News app={app} navigation={navigation} theme={theme}/>
          )}
        />
        <Stack.Screen
          name="Prices"
          children={({ navigation }) => (
            <Prices app={app} navigation={navigation} theme={theme}/>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const config = {
  animation: "timing",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
