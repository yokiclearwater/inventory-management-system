<?php

namespace App\Http\Controllers;

use App\Models\ItemModel;
use App\Http\Requests\ItemModelRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use OwenIt\Auditing\Audit as Audit;

class ItemModelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $models = ItemModel::paginate()->toArray();

        // $all_models = ItemModel::all();
        // $all = array();
        // foreach($all_models as $model) {
        //     array_push($all, $model->audits->toArray());
        // }

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
        $model = ItemModel::find($id);

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
}
