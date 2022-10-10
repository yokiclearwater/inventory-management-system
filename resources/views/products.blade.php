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
            font-size: 20px;
            text-align: left !important;
            font-family: 'Rubik', 'Arial', 'Roboto', 'Helvetica Neue', sans-serif;
        }

        table {
            border-collapse: collapse;
            min-width: 100%;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        }

        thead tr {
            background-color: #119ef0;
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
            border-bottom: 2px solid #119ef0;
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
                <th>Category</th>
                <th>Brand</th>
                <th>Model</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($products as $product)
                <tr>
                    <th>{{ $product->id }}</th>
                    <td>{{ $product->name }}</td>
                    <td>{{ $product->description }}</td>
                    <td>{{ $product->category->name }}</td>
                    <td>{{ $product->brand->name }}</td>
                    <td>{{ $product->model->name }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
