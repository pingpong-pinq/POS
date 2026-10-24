import React, {useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";

type MenuItem={
  id:number;
  name:string;
  price:number;
};

type CartItem={
  item:MenuItem;
  quantity:number;
};
export default function App(){
  const MENU_DATA: MenuItem[]=[
    {id:1,name:"三ツ矢サイダー",price:400},
    {id:2,name:"特濃グレープ",price:400},
    {id:3, name:"NOPE",price:400}

  ];
  const [cart,setCart]=useState<CartItem[]>([]);
}
