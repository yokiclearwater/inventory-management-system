<?php

namespace App\Exports;

use App\Models\Brand;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithDefaultStyles;
use Maatwebsite\Excel\Concerns\WithHeadings;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Style;

class BrandsExport implements FromView, WithColumnWidths, ShouldAutoSize, WithDefaultStyles
{

    public function view(): View
    {
        // TODO: Implement view() method.
        return view('brands', [
            'brands' => Brand::all(),
        ]);
    }

    public function columnWidths(): array
    {
        return [
            'C' => 60,
        ];
    }

    public function defaultStyles(Style $defaultStyle)
    {
        // TODO: Implement defaultStyles() method.
        return $defaultStyle->getAlignment()->setVertical(Alignment::VERTICAL_CENTER)->setWrapText(true);
    }
}
