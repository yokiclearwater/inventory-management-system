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
    public function __construct()
    {
        $this->authorizeResource(StockOutReport::class);

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

        $data = $stock_out_reports->getCollection()->transform(function ($stockOutReport) use ($user) {
            $stockOutReport->can = [
                'update' => $user->can('update', $stockOutReport),
            ];
            return $stockOutReport;
        });

        $stock_out_reports->setCollection($data);

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

        $data = $request->all();
        $data['user_id'] = Auth::user()->id;
        StockOutReport::create($data);


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
        $item = $stockOutReport->item;
        $product = $item->product;

        return Inertia::render('StockOutReport/Edit', compact('stockOutReport', 'item', 'product'));
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
        $stockOutReport->update($data);

        $item->quantity = $remaining_quantity;
        $item->save();

        return Redirect::route('stock-out-reports.index');

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
