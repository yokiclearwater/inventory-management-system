<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
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
        $products = Product::when($request->search, function ($query, $search) {
            $query->where('name', 'LIKE', "%$search%");
        })->when($request->product, function ($query, $search) {
            $query->whereHas('product', function($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%");
            });
        })->when($request->model, function ($query, $search) {
            $query->whereHas('model', function($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%");
            });
        })->when($request->brand, function ($query, $search) {
            $query->whereHas('brand', function($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%");
            });
        })->paginate(10)->withQueryString()->toArray();

        return $products;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        $request->validated();

        $product = new Product($request->all());
        $product->save();

        return $product;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Product::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, $id)
    {
        $request->validated();
        $product = Product::find($id);
        $product->update($request->all());
        // $product->name = $request->name;
        // $product->description = $request->description;
        return $product;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Product::destroy($id);
    }
}
