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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->string('serial_no')->unique();
            $table->string('received_by')->nullable();
            $table->string('issued_by')->nullable();
            $table->date('installed_date')->nullable();
            $table->string('location');
            $table->string('inventory_location')->nullable();
            $table->date('in_stock_date');
            $table->date('out_of_stock_date')->nullable();
            $table->foreignId('status_id')->constrained('item_statuses')->cascadeOnDelete();
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
        Schema::dropIfExists('items');
    }
};
