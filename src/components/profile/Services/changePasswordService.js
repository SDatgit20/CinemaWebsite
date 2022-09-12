import { object, string } from "yup";

const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const formSchema = object({
  oldPassword: string("Enter current password").required(
    "Current password is required"
  ),
  newPassword: string("Enter new password")
    .required("New password is required")
    .max(12, "Password can have maximum 12 characters")
    .matches(
      /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.{8,})(?=.[!@#\$%\^&\*])/,
      "Must contain One Number,One Special Character,One Upper & Lower case, & length min 8"
    ),
  confirmNewPassword: string("Enter again new password")
    .required("New password is required"),
});