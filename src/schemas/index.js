import * as Yup from "yup";

export const resetPasswordSchema = Yup.object({
    current_password: Yup.string().min(4).required("please enter your password"),
    new_password: Yup.string().min(4).required("please enter your password"),
    confirm_password: Yup.string().required("please enter your password").oneOf([Yup.ref("new_password"), null ], "Password must match" ),
});

export const loginSchema = Yup.object({
    loginType: Yup.string().required("please enter your login type").oneOf([ 'admin', 'employees' ], "login type must match" ),
    email: Yup.string().email().required("please enter your email"),
    password: Yup.string().min(4).required("please enter your password"),
});

export const signupSchema = Yup.object({
    firstName: Yup.string().min(2).required("please enter your first name"),
    lastName: Yup.string().min(2).required("please enter your last name"),
    email: Yup.string().email().required("please enter your email"),
    password: Yup.string().min(4).required("please enter your password"),
});