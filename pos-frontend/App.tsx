import React, {useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity,Alert} from "react-native";

type MenuItem={
  id:number;
  name:string;
  price:number;
};

type CartItem={
  item:MenuItem;
  quantity:number;
};
  const MENU_DATA: MenuItem[]=[
    {id:1,name:"三ツ矢サイダー",price:400},
    {id:2,name:"特濃グレープ",price:400},
    {id:3, name:"NOPE",price:400}
  ];
export default function App(){
    const [cart,setCart]=useState<CartItem[]>([]);
  const addToCart =(selectedItem:MenuItem)=>{
    const existingItem=cart.find((cartItem)=>cartItem.item.id===selectedItem.id);
    if (existingItem){
      setCart(
        cart.map((cartItem)=>cartItem.item.id===selectedItem.id
      ?{...cartItem,quantity:cartItem.quantity+1}
      :cartItem)
      );
      
    }
    else{
      setCart([...cart,{item:selectedItem,quantity:1

      }])
  }}
  const checkout=()=>{
  if (cart.length===0){
  Alert.alert("エラー","商品が選択されていません");
  return;
  }
  Alert.alert("注文完了","注文を確定しました",[
    {
      text:"OK",
      onPress:()=>setCart([])
    }
  ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.menuSection}>
        <Text style={styles.headerTitle}>商品メニュー</Text>
        {MENU_DATA.map((item)=>(
          <TouchableOpacity key={item.id} style={styles.itemButton} onPress={()=>addToCart(item)}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.priceText}>{item.price}</Text>
          </TouchableOpacity>
        )
        )}
      </View>
      
    </View>
  );

  }

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#f5f5f5', paddingTop: 50 },
  menuSection: { flex: 2, padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  itemButton: { backgroundColor: '#fff', padding: 20, marginBottom: 15, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  itemText: { fontSize: 20, fontWeight: 'bold' },
  priceText: { fontSize: 16, color: '#666', marginTop: 5 },
});