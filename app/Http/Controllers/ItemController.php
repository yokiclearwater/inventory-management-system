<?php

namespace App\Http\Controllers;

use App\Exports\CategoriesExport;
use App\Exports\ItemsExport;
use App\Http\Requests\ItemRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Item;
use App\Models\ItemStatus;
use App\Models\Location;
use App\Models\Product;
use App\Models\ProductModel;
use App\Models\Unit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Mpdf\Mpdf;

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
            })->orWhere('part_number', 'LIKE', "%$search%");
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
        })->with('product')->with('unit')->with('location')->paginate(10)->withQueryString();

        $user = Auth::user();

        return Inertia::render('Item/Index', [
            'items' => $items->toArray(),
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
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $products = Product::all();
        $units = Unit::all();
        $locations = Location::all();

        return Inertia::render('Item/Create', compact('products', 'locations', 'units'));
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

        return Redirect::route('items.index');
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = Item::with('product')->with('location')->with('unit')->find($id);

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
        $locations = Location::all();
        $units = Unit::all();

        return Inertia::render('Item/Edit', [
            'item' => $item,
            'products' => $products,
            'locations' => $locations,
            'units' => $units,
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
        // dd($request->toArray());
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
        $item = Item::find($id);

        if(!$item->stock_out_reports->isEmpty()) {
            throw ValidationException::withMessages([
                'message' => 'You cannot delete an item with stock report on it',
            ]);
        } else {
            $item->delete();
            return Redirect::route('items.index');
        }


    }

    public function export($method = "xlsx")
    {

        if ($method === "csv") {
            return Excel::download(new ItemsExport, 'items.csv');
        }

        return Excel::download(new ItemsExport, 'items.xlsx');
    }

    public function export_pdf()
    {
        $items = Item::with('product')->with('location')->get();
        $mpdf = new Mpdf([
            'mode' => 'utf-8',
            'orientation' => 'L',
            'default_font' => 'khmeros',
            'default_font_size' => 14,
        ]);
        $html = view("items", compact('items'));
        $mpdf->writeHTML($html);
        $mpdf->Output('items.pdf', 'I');

        return Redirect::route('items.index');
    }
}
