<?php

namespace App\Exports;

use App\Models\Item;
use App\Models\ProductModel;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithDefaultStyles;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Style;

class ItemsExport implements FromView, ShouldAutoSize, WithColumnWidths, WithDefaultStyles
{
    public function view(): View
    {
        // TODO: Implement view() method.
        return view('items', [
            'items' => Item::all(),
        ]);
    }

    public function columnWidths(): array
    {
        return [
            'J' => 60,
        ];
    }

    public function defaultStyles(Style $defaultStyle)
    {
        // TODO: Implement defaultStyles() method.
        return $defaultStyle->getAlignment()->setVertical(Alignment::VERTICAL_CENTER)->setWrapText(true);
    }
}
