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
            font-size: 18px;
            text-align: left !important;
            font-family: 'Arial', 'Roboto', 'Helvetica Neue', sans-serif;
        }

        table {
            text-align: left;
            width: 100%;
            border-collapse: collapse;
            border: 1px solid gray;
        }

        thead {
            background: rgb(255, 75, 156);
            color: white;
        }

        th,
        td {
            padding: 10px 20px;
            border-bottom: 1px solid gray;
            border-right: 1px solid gray;
        }

        tbody {
            background: white;
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
