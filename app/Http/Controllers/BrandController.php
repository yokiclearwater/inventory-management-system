<?php

namespace App\Http\Controllers;

use App\Exports\BrandsExport;
use App\Http\Requests\BrandRequest;
use App\Models\Brand;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Maatwebsite\Excel\Facades\Excel;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $brands = Brand::paginate()->toArray();

        return Inertia::render('Brand/Index', [
            'brands' => $brands,
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

    public function export($method = 'xlsx') {
        if ($method === "csv") {
            return Excel::download(new BrandsExport, 'brands.csv');
        }

        return Excel::download(new BrandsExport, 'brands.xlsx');
    }

    public function show_pdf()
    {
        $brands = Brand::all();
        return view('brands', [
            'brands' => $brands,
        ]);
    }

    public function export_pdf() {
        $brands = Brand::all();
        view()->share('brands', $brands);
        $pdf = Pdf::loadView('brands')->setPaper('a4', 'landscape');
        return $pdf->download('brands.pdf');
    }
}
