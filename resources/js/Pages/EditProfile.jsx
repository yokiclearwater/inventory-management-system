import React from "react";
import Main from "@/Layouts/Main";
import { Head, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import FormInput from "@/Components/FormInput";
import FormTextArea from "@/Components/FormTextArea";
import Button from "@/Components/Button";
import Swal from "sweetalert2";

function EditProfile(props) {
    const user = props.user;

    const profileForm = useForm({
        name: user.name,
        email: user.email,
    });

    const passwordForm = useForm();

    const profileSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure you want to edit this category?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Proceed",
            confirmButtonColor: "orange",
        }).then((result) => {
            if (result.isConfirmed) {
                profileForm.put(route("edit-profile.update", user.id), {
                    onSuccess: () =>
                        Swal.fire("Updated Successfully", "", "success"),
                    onError: () => Swal.fire("Updated Error", "", "error"),
                });
            }
        });
    };

    const passwordSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure you want to edit this category?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Proceed",
            confirmButtonColor: "orange",
        }).then((result) => {
            if (result.isConfirmed) {
                passwordForm.put(route("edit-profile.update_password", user.id), {
                    onSuccess: () =>
                        Swal.fire("Updated Successfully", "", "success"),
                    onError: () => Swal.fire("Updated Error", "", "error"),
                });
            }
        });
    }

    const profileFormChange = (e) => {
        profileForm.setData(e.target.name, e.target.value);
    };

    const passwordFormChange = (e) => {
        passwordForm.setData(e.target.name, e.target.value);
    }

    return (
        <Main auth={props.auth} title="Edit Profile">
            <Head title="Edit Profile" />

            <div className="max-w-full m-auto flex flex-col gap-4">
                <div className="py-2 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                    <a
                        href={route("dashboard")}
                        className="bg-blue-600 text-xl hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faBackward} /> Back
                    </a>
                </div>
                <FormContainer form={profileForm} handleSubmit={profileSubmit} title="Profile Detail" >
                    <FormInput
                        formDataValue={profileForm.data.name}
                        placeholder={"Username"}
                        formErrorMessage={profileForm.errors.name}
                        handleChange={profileFormChange}
                        name={"name"}
                    />
                    <FormInput
                        type="email"
                        formDataValue={profileForm.data.email}
                        placeholder={"E-Mail"}
                        formErrorMessage={profileForm.errors.email}
                        handleChange={profileFormChange}
                        name={"email"}
                    />
                </FormContainer>
                <FormContainer form={passwordForm} handleSubmit={passwordSubmit} title="Change Password" buttonPlaceholder={"Set Password"} >
                    <FormInput
                        formDataValue={passwordForm.data.current_password}
                        placeholder={"Current Password"}
                        formErrorMessage={passwordForm.errors.current_password}
                        handleChange={passwordFormChange}
                        name={"current_password"}
                    />
                    <FormInput
                        formDataValue={passwordForm.data.new_password}
                        placeholder={"New Password"}
                        formErrorMessage={passwordForm.errors.new_password}
                        handleChange={passwordFormChange}
                        name={"new_password"}
                    />
                    <FormInput
                        formDataValue={passwordForm.data.new_password_confirmation}
                        placeholder={"Confirm New Password"}
                        formErrorMessage={passwordForm.errors.new_password_confirmation}
                        handleChange={passwordFormChange}
                        name={"new_password_confirmation"}
                    />
                </FormContainer>
            </div>
        </Main>
    );
}

const FormContainer = ({ form, handleSubmit, title, children, buttonPlaceholder = "Save" }) => {
    return (
        <>
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                <div className="bg-white shadow-sm rounded-lg p-4">
                    <div
                        className={
                            "flex flex-row flex-wrap justify-between text-blue-800 font-semibold text-3xl md:text-4xl border-b-2 py-4 border-gray-400"
                        }
                    >
                        <div>{title}</div>
                    </div>
                    <form
                        className="p-4 flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        {children}
                        <Button
                            className="w-fit bg-green-500 !text-base hover:bg-green-700 shadow-lg"
                            processing={form.processing}
                        >
                            {buttonPlaceholder}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProfile;
