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
    response1 = supabase.table("orders").insert({"status":0}).execute()
    new_order_id= response1.data[0]["id"]
    for item in order["items"]:
        supabase.table("order_items").insert({"order_id": new_order_id, "item_id": item["id"], "quantity": item["quantity"]}).execute()
    return {"message": "注文が完了しました", "order_id": new_order_id}
