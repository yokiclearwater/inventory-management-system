<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ItemRequest;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:create,admin')->only(['create', 'store']);
        $this->middleware('permission:view,admin')->only(['index', 'show']);
        $this->middleware('permission:update,admin')->only(['edit', 'update']);
        $this->middleware('permission:delete,admin')->only(['destroy']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $items = Item::when($request->search, function ($query, $search) {
            $query->whereHas('product', function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%");
            });
        })->when($request->category, function ($query, $search) {
            $query->whereHas('product', function ($q) use ($search) {
                $q->whereHas('category', function ($qc) use ($search) {
                    $qc->where('name', 'LIKE', "%$search%");
                });
            });
        })->when($request->model, function ($query, $search) {
            $query->whereHas('product', function ($q) use ($search) {
                $q->whereHas('model', function ($qc) use ($search) {
                    $qc->where('name', 'LIKE', "%$search%");
                });
            });
        })->when($request->brand, function ($query, $search) {
            $query->whereHas('product', function ($q) use ($search) {
                $q->whereHas('brand', function ($qc) use ($search) {
                    $qc->where('name', 'LIKE', "%$search%");
                });
            });
        })->with('product')->with('unit')->with('location')->with('status')->paginate(10)->withQueryString();

        return $items;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ItemRequest $request)
    {
        $request->validated();

        $item = new Item($request->all());
        $item->save();

        return $item;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Item::with('product')->with('status')->with('unit')->with('location')->find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ItemRequest $request, $id)
    {
        $request->validated();
        $item = Item::find($id);
        $item->update($request->all());
        return $item;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Item::destroy($id);
    }
}
