<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\StockOutReport;
use App\Rules\QuantityRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class StockOutReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $stock_out_reports = StockOutReport::when($request->search, function($query, $search) {
            $query->whereHas('item', function ($que) use ($search) {
                $que->whereHas('product', function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%$search%");
                })->orWhere('part_number', 'LIKE', "%$search%");
            });
        })->with('item.product')->paginate(10);
        $user = Auth::user();

        return Inertia::render('StockOutReport/Index', [
            'stockOutReports' => $stock_out_reports,
            'can' => [
                'create' => $user->can('create', $user),
                'view' => $user->can('view', $user),
                'update' => $user->can('update', $user),
                'delete' => false,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $items = Item::with('product')->with('location')->get();
        // dd($items->toArray());
        // $user = Auth::user();

        return Inertia::render('StockOutReport/Create', compact('items'));
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

        StockOutReport::create($request->all());


        $item->quantity = $remaining_quantity;
        $item->save();

        return Redirect::route('stock-out-reports.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StockOutReport  $stockOutReport
     * @return \Illuminate\Http\Response
     */
    public function show(StockOutReport $stockOutReport)
    {
        $item = $stockOutReport->item;
        $product = $item->product;

        return Inertia::render('StockOutReport/View', compact('stockOutReport', 'item', 'product'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StockOutReport  $stockOutReport
     * @return \Illuminate\Http\Response
     */
    public function edit(StockOutReport $stockOutReport)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StockOutReport  $stockOutReport
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StockOutReport $stockOutReport)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StockOutReport  $stockOutReport
     * @return \Illuminate\Http\Response
     */
    public function destroy(StockOutReport $stockOutReport)
    {
        //
    }
}
