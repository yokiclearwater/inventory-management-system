<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductModelRequest;
use App\Models\ProductModel;
use Illuminate\Http\Request;

class ProductModelController extends Controller
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
        $categories = ProductModel::when($request->search, function ($query, $search) {
            $query->where('name', 'LIKE', "%$search%");
       })->paginate(10)->withQueryString();

        return $categories;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductModelRequest $request)
    {
        $request->validated();

        $category = new ProductModel();
        $category->name = $request->name;
        $category->description = $request->description;
        $category->save();

        return $category;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ProductModel::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProductModelRequest $request, $id)
    {
        $request->validated();
        $category = ProductModel::find($id);
        $category->name = $request->name;
        $category->description = $request->description;
        return $category;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return ProductModel::destroy($id);
    }
}
