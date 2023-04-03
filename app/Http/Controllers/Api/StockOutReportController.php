<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\StockOutReport;
use App\Rules\QuantityRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StockOutReportController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:create,admin')->only(['create', 'store']);
        $this->middleware('permission:view,admin')->only(['index', 'show']);
        $this->middleware(['permission:update,admin'])->only(['edit', 'update']);
        $this->middleware('permission:delete,admin')->only(['destroy']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $item = Item::find($request->item_id);
        $remaining_quantity = $item->quantity - $request->quantity;

        $request->validate([
            'item_id' => ['required', 'exists:items,id'],
            'received_by' => ['required', 'string'],
            'stock_out_date' => ['required', 'date'],
            'issued_by' => ['required', 'string'],
            'quantity' => ['required', new QuantityRule($item->quantity)]
        ]);

        $data = $request->all();
        $data['user_id'] = Auth::user()->id;
        $stockOutReport = StockOutReport::create($data);

        $item->quantity = $remaining_quantity;
        $item->save();

        return $stockOutReport;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $stockOutReport = StockOutReport::with('item.product')->find($id);

        return $stockOutReport;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $stockOutReport = StockOutReport::find($id);
        $user = Auth::user();

        if (!$request->user()->can('update', $stockOutReport)) {
            return response()->json(['message' => 'Access Denied']);
        } else {
            $item = Item::find($stockOutReport->item_id);
            // previous quantity before stocking out
            $previous_quantity = $item->quantity + $stockOutReport->quantity;
            $remaining_quantity = $previous_quantity - $request->quantity;

            $request->validate([
                'received_by' => ['required', 'string'],
                'stock_out_date' => ['required', 'date'],
                'issued_by' => ['required', 'string'],
                'quantity' => ['required', new QuantityRule($previous_quantity)]
            ]);

            $data = $request->all();
            $data['user_id'] = Auth::user()->id;
            $data['issued_by'] = Auth::user()->name;
            $stockOutReport->update($data);

            $item->quantity = $remaining_quantity;
            $item->save();

            return $stockOutReport;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
