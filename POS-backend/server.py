from fastapi import FastAPI
from supabase import create_client, Client
from fastapi.middleware.cors import CORSMiddleware
app= FastAPI()
URL="https://uknfmmnlwtyiohhryxwc.supabase.co"
KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmZtbW5sd3R5aW9oaHJ5eHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1NDUwODksImV4cCI6MjEwODEyMTA4OX0.Vq_syIu03Ujp3voviINQnooQ2d2zustxKDucmjusHbs"
supabase: Client = create_client(URL, KEY)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/menu")
def get_menu():
    response = supabase.table("items").select("*").execute()
    return response.data
@app.post("/order")
def create_order(order: dict):
    pickup = order.get("pickup_time")
    
    # ==========================================
    # ★追加ロジック：次の整理番号を自動計算する！
    # ==========================================
    # ordersテーブルのデータを全件取得する
    existing_orders = supabase.table("orders").select("id").execute()
    # データの数（リストの長さ）に ＋1 をした数字を次の番号にする！
    next_number = len(existing_orders.data) + 1
    
    # insertの中に "order_number" を追加！
    response1 = supabase.table("orders").insert({
        "status": 0, 
        "pickup_time": pickup,
        "order_number": next_number  # ←★ここを追加！
    }).execute()
    
    new_order_id = response1.data[0]["id"]
    
    for item in order["items"]:
        supabase.table("order_items").insert({
            "order_id": new_order_id, 
            "item_id": item["item_id"], 
            "quantity": item["quantity"]
        }).execute()
        
    # せっかくなので、画面に整理番号(order_number)も返してあげる！
    return {
        "message": "注文が完了しました", 
        "order_id": new_order_id, 
        "order_number": next_number
    }
@app.get("/orders/active")
def get_active_orders():
    response = supabase.table("orders").select("*").eq("status", 0).order("pickup_time").execute()
    return response.data
@app.put("/orders/{order_id}/complete")
def complete_order(order_id:int):
    response=supabase.table("orders").update({"status":1}).eq("id",order_id).execute()
    return {"message":f"注文 {order_id} の提供が完了しました"}