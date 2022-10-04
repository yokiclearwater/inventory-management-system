<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use OwenIt\Auditing\Models\Audit;

class AuditLogController extends Controller
{
    public function index(Request $request) {
        // dd($request->toArray());

        $audits = Audit::when($request->type, function ($query, $search) {
            $type = str_replace("\\", "\\\\", $search);
            $query->where("auditable_type", "LIKE", "$type");
        })->when($request->event, function ($query, $search) {
            $query->where("event", "LIKE", "$search");
        })->paginate(10)->withQueryString();


        $auditable_types = Audit::distinct()->get(['auditable_type']);
        $events = Audit::distinct()->get(['event']);

        return Inertia::render('Log/Index', [
            'audits' => $audits,
            'auditable_types' => $auditable_types,
            'events' => $events,
        ]);
    }

    public function show($id) {
        // dd($id);
        $audit = Audit::with('user')->find($id);
        // dd($audit->toArray());

        return Inertia::render('Log/View')->with('audit', $audit);
    }
}
