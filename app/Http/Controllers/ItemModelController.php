<?php

namespace App\Http\Controllers;

use App\Exports\ItemModelsExport;
use App\Models\ItemModel;
use App\Http\Requests\ItemModelRequest;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use OwenIt\Auditing\Models\Audit as Audit;

class ItemModelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $models = ItemModel::when($request->search, function ($query, $search) {
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
        return Inertia::render('Model/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\ItemModelRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ItemModelRequest $request)
    {
        $request->validated();
        $model = new ItemModel();
        $model->name = $request->name;
        $model->description = $request->description;
        $model->save();

        return Redirect::route('models.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ItemModel  $itemModel
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $model = ItemModel::findOrFail($id);

        return Inertia::render('Model/View')->with('model', $model);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ItemModel  $itemModel
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $model = ItemModel::find($id);

        return Inertia::render('Model/Edit', [
            'model' => $model,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\ItemModelRequest  $request
     * @param  \App\Models\ItemModel  $itemModel
     * @return \Illuminate\Http\Response
     */
    public function update(ItemModelRequest $request, $id)
    {
        $request->validated();
        $model = ItemModel::find($id);
        $model->name = $request->name;
        $model->description = $request->description;
        $model->save();

        return Redirect::route('models.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ItemModel  $itemModel
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $model = ItemModel::find($id);
        $model->delete();

        return Redirect::route('models.index');
    }

    public function export($method = 'xlsx') {
        if ($method === "csv") {
            return Excel::download(new ItemModelsExport, 'models.csv');
        }

        return Excel::download(new ItemModelsExport, 'models.xlsx');
    }

    public function show_pdf()
    {
        $models = ItemModel::all();
        return view('models', [
            'models' => $models,
        ]);
    }

    public function export_pdf() {
        $models = ItemModel::all();
        view()->share('models', $models);
        $pdf = Pdf::loadView('models')->setPaper('a4', 'landscape');
        return $pdf->download('models.pdf');
    }
}
