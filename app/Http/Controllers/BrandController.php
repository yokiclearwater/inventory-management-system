<?php

namespace App\Http\Controllers;

use App\Exports\BrandsExport;
use App\Http\Requests\BrandRequest;
use App\Models\Brand;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Maatwebsite\Excel\Facades\Excel;
use Mpdf\Mpdf;

class BrandController extends Controller
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
        $brands = Brand::when($request->search, function ($query, $search) {
            $query->where('name', 'LIKE', "%$search%");
        })->paginate(10)->withQueryString()->toArray();
        $user = Auth::user();


        return Inertia::render('Brand/Index', [
            'brands' => $brands,
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
        return Inertia::render('Brand/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BrandRequest $request)
    {
        $request->validated();
        $brand = new Brand();
        $brand->name = $request->name;
        $brand->description = $request->description;
        $brand->save();

        return Redirect::route('brands.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $brand = Brand::find($id);

        return Inertia::render('Brand/View', [
            'brand' => $brand,
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
        $brand = Brand::find($id);

        return Inertia::render('Brand/Edit', [
            'brand' => $brand,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(BrandRequest $request, $id)
    {
        $request->validated();
        $product = Brand::find($id);
        $product->name = $request->name;
        $product->description = $request->description;
        $product->save();

        return Redirect::route('brands.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Brand::find($id);
        $product->delete();

        return Redirect::route('brands.index');
    }

    public function export($method = 'xlsx')
    {
        if ($method === "csv") {
            return Excel::download(new BrandsExport, 'brands.csv');
        }

        return Excel::download(new BrandsExport, 'brands.xlsx');
    }

    public function export_pdf()
    {
        $brands = Brand::all();
        $mpdf = new Mpdf([
            'mode' => 'utf-8',
            'orientation' => 'L',
            'default_font' => 'khmeros',
            'default_font_size' => 14,
        ]);
        $html = view("brands", compact('brands'));
        $mpdf->writeHTML($html);
        ob_clean();
        $mpdf->Output('brands.pdf', 'I');

        return Redirect::route('brands.index');
    }
}
