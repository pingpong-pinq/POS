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
  const checkout=async ()=>{
  if (cart.length===0){
  Alert.alert("エラー","商品が選択されていません");
  return;
  }
  try{
    const now = new Date();
      // "14:30:05" のような文字列を作成
    const timeString = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    const orderData={
      pickup_time: timeString,
      items:cart.map((cartItem)=>({
        item_id:cartItem.item.id,
        quantity:cartItem.quantity
      }))
    }
    const response=await fetch("http://172.20.10.4:8000/order",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(orderData),
    });
    if (response.ok){
        Alert.alert("注文完了","注文を確定しました",[
    {
      text:"OK",
      onPress:()=>setCart([])
    }
  ]);
    }
    else{
      const errorDetail = await response.text();
        console.error("【Pythonからのエラー詳細】:", errorDetail);
      Alert.alert("エラー","サーバー側で処理に失敗しました");

    }
  }
  catch (error){
    console.error(error);
    Alert.alert("通信エラー","サーバーに接続できませんでした")
  }

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
      <View style={styles.cartSection}>
        <Text style={styles.headerTitle}>現在の注文</Text>
        <View style={styles.cartList}>
          {cart.length===0?(
            <Text style={styles.emptyText}>まだ注文はありません</Text>
          ):(
            cart.map((cartItem)=>(
              <View key={cartItem.item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{fontSize :18}}>{cartItem.item.name}×{cartItem.quantity}</Text>
                <Text style={{fontSize:18}}>￥{cartItem.item.price*cartItem.quantity}</Text>
                </View>
            ))
          )}
        </View>
      <View style={styles.checkoutBox}>
        <Text style={styles.totalText}>
          合計:￥{cart.reduce((sum,cartItem)=>sum+(cartItem.item.price*cartItem.quantity),0)}
        </Text>
        <TouchableOpacity style={styles.orderButton} onPress={checkout}>
          <Text style={styles.orderButtonText}>注文を確定する</Text>
        </TouchableOpacity>
      </View>
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
  // --- ここからカート用のスタイルを追加 ---
  cartSection: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderLeftWidth: 1,
    borderColor: '#ddd',
    padding: 20,
  },
  cartList: {
    flex: 1,
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  checkoutBox: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 20,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'right',
  },
  orderButton: {
    backgroundColor: '#ff6b6b',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});