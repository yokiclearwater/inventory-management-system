<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemRequest;
use App\Models\Item;
use App\Models\ItemStatus;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $items = Item::when($request->search, function ($query, $search) {
            $query->where('serial_no', 'LIKE', "%$search%")->orWhereHas('product', function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%");
            });
        })->with('product')->with('status')->paginate(10)->withQueryString();
//        $items = Item::with('product')->with('status')->paginate();

        return Inertia::render('Item/Index', [
            'items' => $items->toArray(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $products = Product::all();
        $statuses = ItemStatus::all();

        return Inertia::render('Item/Create', [
            'products' => $products,
            'statuses' => $statuses,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(ItemRequest $request)
    {
        $request->validated();
        Item::create($request->all());

//        return Redirect::route('items.index');
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = Item::with('product')->with('status')->find($id);

        return Inertia::render('Item/View', ['item' => $item]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $item = Item::find($id);
        $products = Product::all();
        $statuses = ItemStatus::all();
        return Inertia::render('Item/Edit', [
            'statuses' => $statuses,
            'item' => $item,
            'products' => $products,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ItemRequest $request, $id)
    {
        $request->validated();
        Item::find($id)->update($request->all());

        return Redirect::route('items.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        Item::destroy($id);

        return Redirect::route('items.index');
    }
}
