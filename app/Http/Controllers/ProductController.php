<?php

namespace App\Http\Controllers;

use App\Exports\ProductsExport;
use App\Http\Requests\ProductRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductModel;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Mpdf\Mpdf;
use Mpdf\MpdfException;

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
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $products = Product::when($request->search, function ($query, $search) {
            $query->where('name', 'LIKE', "%$search%");
        })->when($request->category, function ($query, $search) {
            $query->whereHas('category', function($q) use ($search) {
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
        $user = Auth::user();

        return Inertia::render('Product/Index', [
            'products' => $products,
            'categories' => Category::all(),
            'models' => ProductModel::all(),
            'brands' => Brand::all(),
            'can' => [
                'create' => $user->can('create', $user),
                'view' => $user->can('view', $user),
                'update' => $user->can('update', $user),
                'delete' => $user->can('delete', $user),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        $categories = Category::all();
        $brands = Brand::all();
        $models = ProductModel::all();

        return Inertia::render('Product/Create', [
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
    public function store(ProductRequest $request)
    {
        $request->validated();
        Product::create($request->all());
        // $product = new Product();
        // $product->name = $request->name;
        // $product->description = $request->description;
        // $product->category_id = $request->category_id;
        // $product->brand_id = $request->brand_id;
        // $product->model_id = $request->model_id;
        // $product->save();

       return Redirect::route('products.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::with('model')->with('category')->with('brand')->findOrFail($id);

        // dd($product->toArray());

        return Inertia::render('Product/View', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        $product = Product::find($id);
        $categories = Category::all();
        $brands = Brand::all();
        $models = ProductModel::all();

        return Inertia::render('Product/Edit', [
            'product' => $product,
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ProductRequest $request, $id)
    {
        $request->validated();
        $product = Product::find($id);
        $product->name = $request->name;
        $product->description = $request->description;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->model_id = $request->model_id;
        $product->save();

        return Redirect::route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if(!$product->items->isEmpty()) {
            throw ValidationException::withMessages([
                'message' => 'You cannot delete an product relating to existing items',
            ]);
        } else {
            $product->delete();
            return Redirect::route('products.index');
        }
    }

    public function export($method = "xlsx") {
        if ($method === "csv") {
            return Excel::download(new ProductsExport, 'products.csv');
        }

        return Excel::download(new ProductsExport, 'products.xlsx');
    }


    public function export_pdf()
    {
        $products = Product::all();
        $mpdf = new Mpdf([
            'mode' => 'utf-8',
            'orientation' => 'L',
            'default_font' => 'khmeros',
            'default_font_size' => 14,
        ]);
        $html = view("products", compact('products'));
        $mpdf->writeHTML($html);
        $mpdf->Output('products.pdf', 'I');

        return Redirect::route('products.index');
    }
}
