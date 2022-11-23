<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_out_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_id')->constrained('items')->restrictOnDelete();
            $table->string('received_by');
            $table->string('issued_by');
            $table->unsignedInteger('quantity');
            $table->date('stock_out_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stock_out_reports');
    }
};
