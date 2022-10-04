<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brands</title>
    @vite('resources/js/app.jsx')
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
            background: rgb(0, 176, 50);
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
                <th>Serial No</th>
                <th>Description</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Created At</th>
                <th>Updated At</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($items as $item)
                <tr>
                    <th>{{ $item->id }}</th>
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->serial_no }}</td>
                    <td>{{ $item->description }}</td>
                    <td>{{ $item->category->name }}</td>
                    <td>{{ $item->brand->name }}</td>
                    <td>{{ $item->model->name }}</td>
                    <td>{{ $item->created_at }}</td>
                    <td>{{ $item->updated_at }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
