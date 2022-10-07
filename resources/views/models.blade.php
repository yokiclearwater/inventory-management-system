<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brands</title>
    {{-- @vite('resources/js/app.jsx') --}}
    <style>
        * {
            box-sizing: border-box;
            font-size: 20px;
            text-align: left !important;
            font-family: 'Rubik', 'Arial', 'Roboto', 'Helvetica Neue', sans-serif;
        }

        table {
            border-collapse: collapse;
            font-family: sans-serif;
            min-width: 100%;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        }

        thead tr {
            background-color: #fc49af;
            color: #ffffff;
            text-align: left;
        }

        th,
        td {
            padding: 12px 15px;
        }

        tbody tr {
            border-bottom: 1px solid #dddddd;
        }

        tbody tr:nth-of-type(even) {
            background-color: #f3f3f3;
        }

        tbody tr:last-of-type {
            border-bottom: 2px solid #fc49af;
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
                <th>Created At</th>
                <th>Updated At</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($models as $model)
                <tr>
                    <th>{{ $model->id }}</th>
                    <td>{{ $model->name }}</td>
                    <td>{{ $model->description }}</td>
                    <td>{{ $model->created_at }}</td>
                    <td>{{ $model->updated_at }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
