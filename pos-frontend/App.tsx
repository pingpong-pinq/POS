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
  const MENU_DATA: MenuItem[]=[
    {id:1,name:"三ツ矢サイダー",price:400},
    {id:2,name:"特濃グレープ",price:400},
    {id:3, name:"NOPE",price:400}
  ];
export default function App(){
  return (
    <View style={styles.container}>
      <View style={styles.menuSection}>
        <Text style={styles.headerTitle}>商品メニュー</Text>
        {MENU_DATA.map((item)=>(
          <TouchableOpacity key={item.id} style={styles.itemButton}>
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