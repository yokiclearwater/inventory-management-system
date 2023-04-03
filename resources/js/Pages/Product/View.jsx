import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const View = (props) => {
    const product = props.product;

    console.log(product);

    return (
        <Main auth={props.auth} errors={props.errors} title="Products">
            <Head title="View Product" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                        <a
                            href={route("products.index")}
                            className="bg-blue-600 text-xl hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faBackward} /> Back
                        </a>
                    </div>
                    <div className="bg-white shadow-sm rounded-lg p-4">
                        <div className="flex flex-col gap-4 p-4">
                            <div
                                className={
                                    "flex flex-row flex-wrap justify-between text-blue-800 font-semibold text-3xl md:text-4xl border-b-2 py-4 border-gray-400"
                                }
                            >
                                <div>Product Detail</div>
                            </div>
                            <div className="md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600">
                                ID: {product.id}
                            </div>
                            <div className="md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600">
                                Name: {product.name}
                            </div>
                            <div className="md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600">
                                Description:
                                <p className={"py-4 px-2"}>
                                    {product.description}
                                </p>
                            </div>
                            <div className="md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600">
                                <a
                                    className="hover:text-blue-700 hover:font-semibold cursor-pointer"
                                    href={product.category && route("categories.show", product.category.id)}
                                >
                                    Category: {product.category && product.category.name}
                                </a>
                            </div>
                            <div className="md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600">
                                <a
                                    className="hover:text-blue-700 hover:font-semibold cursor-pointer"
                                    href={product.brand && route("brands.show", product.brand.id)}
                                >
                                    Brand: {product.brand && product.brand.name}
                                </a>
                            </div>
                            <div className="md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600">
                                <a
                                    className="hover:text-blue-700 hover:font-semibold cursor-pointer"
                                    href={product.model && route("models.show", product.model.id)}
                                >
                                    Model: {product.model && product.model.name}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default View;
