<?php

namespace App\Exports;

use App\Models\ItemModel;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ItemModelsExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return ItemModel::all();
    }

    public function headings(): array
    {
        return  array_keys($this->collection()->first()->toArray());
    }
}
