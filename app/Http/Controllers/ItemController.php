<?php

namespace App\Http\Controllers;

use App\Exports\ItemsExport;
use App\Http\Requests\ItemRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Item;
use App\Models\ItemModel;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

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
            $query->where('name', 'LIKE', "%$search%");
        })->paginate(10)->withQueryString()->toArray();

        return Inertia::render('Item/Index', [
            'items' => $items,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = Category::all();
        $brands = Brand::all();
        $models = ItemModel::all();

        return Inertia::render('Item/Create', [
            'categories' => $categories,
            'brands' => $brands,
            'models' => $models,
        ]);
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
        $item = new Item();
        $item->name = $request->name;
        $item->serial_no = $request->serial_no;
        $item->description = $request->description;
        $item->category_id = $request->category_id;
        $item->brand_id = $request->brand_id;
        $item->model_id = $request->model_id;
        $item->save();

        return Redirect::route('items.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = Item::findOrFail($id);
        $category = $item->category;
        $brand = $item->brand;
        $model = $item->model;

        return Inertia::render('Item/View', [
            'item' => $item,
            'category' => $category,
            'brand' => $brand,
            'model' => $model,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $item = Item::find($id);
        $categories = Category::all();
        $brands = Brand::all();
        $models = ItemModel::all();

        return Inertia::render('Item/Edit', [
            'item' => $item,
            'categories' => $categories,
            'brands' => $brands,
            'models' => $models,
        ]);
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
        $item->name = $request->name;
        $item->serial_no = $request->serial_no;
        $item->description = $request->description;
        $item->category_id = $request->category_id;
        $item->brand_id = $request->brand_id;
        $item->model_id = $request->model_id;
        $item->save();

        return Redirect::route('items.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Item::find($id);
        $item->delete();

        return Redirect::route('items.index');
    }

    public function export($method = "xlsx") {


        if ($method === "csv") {
            return Excel::download(new ItemsExport, 'items.csv');
        } else {
            return Excel::download(new ItemsExport, 'items.xlsx');
        }

        return Excel::download(new ItemsExport, 'items.xlsx');
    }

    public function show_pdf()
    {
        $items = Item::all();
        return view('items', [
            'items' => $items,
        ]);
    }

    public function export_pdf() {
        $items = Item::all();
        view()->share('items', $items);
        $pdf = Pdf::loadView('items')->setPaper('a4', 'landscape');
        return $pdf->download('items.pdf');
    }
}
