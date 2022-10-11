<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Items</title>
    <style>
        table {
            border-collapse: collapse;
        }
        thead {
            vertical-align: bottom;
            text-align: center;
            font-weight: bold;
        }
        tfoot {
            text-align: center;
            font-weight: bold;
        }
        th {
            text-align: left;
            padding: 10px 20px;
            vertical-align: middle !important;
        }
        td {
            padding: 10px 20px;
            vertical-align: middle !important;
        }

        thead tr {
            background: #c3ff80;
        }

        tbody tr:nth-child(even) {
            background: #e7e7e7;
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
            <td style="min-width: 200px; width: 200px;">{{ $item->product_location }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>

</html>
