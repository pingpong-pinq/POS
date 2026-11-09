import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import PosScreen from "./screens/PosScreen";
const Stack =createNativeStackNavigator();
export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="POS"></Stack.Navigator>
      <Stack.Screen
      name="POS"
      component={PosScreen}
      options={{title:'pinqPOS-レジ受付'}}></Stack.Screen>
    </NavigationContainer>
  )
}