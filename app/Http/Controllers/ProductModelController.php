<?php

namespace App\Http\Controllers;

use App\Exports\ProductModelsExport;
use App\Models\Product;
use App\Models\ProductModel;
use App\Http\Requests\ProductModelRequest;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Mpdf\Mpdf;

class ProductModelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $models = ProductModel::when($request->search, function ($query, $search) {
            $query->where('name', 'LIKE', "%$search%");
        })->paginate(10)->withQueryString()->toArray();

        return Inertia::render('Model/Index', [
            'models' => $models,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // dd("Kosal");

        return Inertia::render('Model/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\ProductModelRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductModelRequest $request)
    {
        $request->validated();
        $model = new ProductModel();
        $model->name = $request->name;
        $model->description = $request->description;
        $model->save();

        return Redirect::route('models.index');
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\ProductModel $itemModel
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $model = ProductModel::findOrFail($id);

        return Inertia::render('Model/View')->with('model', $model);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\ProductModel $itemModel
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $model = ProductModel::find($id);

        return Inertia::render('Model/Edit', [
            'model' => $model,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\ProductModelRequest $request
     * @param \App\Models\ProductModel $itemModel
     * @return \Illuminate\Http\Response
     */
    public function update(ProductModelRequest $request, $id)
    {
        $request->validated();
        $model = ProductModel::find($id);
        $model->name = $request->name;
        $model->description = $request->description;
        $model->save();

        return Redirect::route('models.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\ProductModel $itemModel
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $model = ProductModel::find($id);
        $model->delete();

        return Redirect::route('models.index');
    }

    public function export($method = 'xlsx')
    {
        if ($method === "csv") {
            return Excel::download(new ProductModelsExport, 'models.csv');
        }

        return Excel::download(new ProductModelsExport, 'models.xlsx');
    }

    public function export_pdf()
    {
        $models = ProductModel::all();
        $mpdf = new Mpdf([
            'mode' => 'utf-8',
            'orientation' => 'L',
            'default_font' => 'khmeros',
            'default_font_size' => 14,
        ]);
        $html = view("models", compact('models'));
        $mpdf->writeHTML($html);
        $mpdf->Output('models.pdf', 'D');

        return Redirect::route('models.index');
    }
}
