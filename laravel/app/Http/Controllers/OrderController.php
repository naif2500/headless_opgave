<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Book;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index() {
        $orders = Order::with("book")->get();
        return OrderResource::collection($orders);
    }

    public function store(StoreOrderRequest $request) {
        $bookIds = $request->validated("book_ids");

        $order = Order::create(['user_id' => auth()->id()]);

        $order->book()->attach($bookIds);

        return response()->json(['message' => 'Order created'], 201);
    }

    public function update(UpdateOrderRequest $request) {
        $orderId = $request->validated("id");

        $bookIds = $request->validated("book_ids");

        $order = Order::find($orderId);

        $order->book()->sync($bookIds);

        return response()->json(['message' => 'Order updated'], 200);

    }

    public function destroy(Order $order) {
        $id = $order->id;
        $order->destroy($id);

        return response()->json(['message' => 'Order deleted'], 200);

    }
}
