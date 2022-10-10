<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brands</title>
    {{--    @vite('resources/js/app.jsx')--}}
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-size: 16px;
            text-align: left !important;
        }

        table {
            border-collapse: collapse;
            min-width: 100%;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        }

        thead tr {
            background-color: #ccffb2;
            text-align: left;
            color: black;
        }

        th,
        td {
            padding: 12px 15px;
        }

        tbody tr td, th {
            border-bottom: 1px solid rgb(221, 221, 221);
        }

        tbody tr:nth-child(even) {
            background-color: #f3f3f3;
        }
    </style>
</head>

<body>
<table>
    <thead style="color: white;">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Serial No.</th>
        <th>Received By</th>
        <th>Issued By</th>
        <th>Installation Date</th>
        <th>In Stock Date</th>
        <th>Out Of Stock Date</th>
        <th>Location</th>
        <th>Product Location</th>
    </tr>
    </thead>
    <tbody style="color: black;">
    @foreach ($items as $item)
        <tr>
            <th>{{ $item->id }}</th>
            <td>{{ $item->product->name }}</td>
            <td>{{ $item->serial_no }}</td>
            <td>{{ $item->received_by }}</td>
            <td>{{ $item->issued_by }}</td>
            <td>{{ $item->installed_date }}</td>
            <td>{{ $item->in_stock_date }}</td>
            <td>{{ $item->out_of_stock_date }}</td>
            <td>{{ $item->location }}</td>
            <td>{{ $item->product_location }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>

</html>
