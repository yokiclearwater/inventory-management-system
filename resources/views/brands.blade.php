<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brands</title>
    {{-- @vite('resources/js/app.jsx') --}}
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
            background: #3be5ff;
        }

        tbody tr:nth-child(even) {
            background: #e7e7e7;
        }
    </style>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($brands as $brand)
                <tr>
                    <th>{{ $brand->id }}</th>
                    <td>{{ $brand->name }}</td>
                    <td>{{ $brand->description }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
