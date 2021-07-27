import { AuthContext } from "../context/auth/auth-context";
import { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import MyCheckbox from "../forms/MyCheckbox";
import MyTextInput from "../forms/MyTextInput";

const Registration = () => {
  const { setUserList, userList, isLoggedIn, setSuccessReg, successReg } =
    useContext(AuthContext);
  return (
    <div>
      <h1>Sign Up</h1>
      <h2>Sign up to view intriguing facts on Starwars movies.</h2>
      <div className="form-user">
        <div className="container-form shadow-dark">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              passwordConfirmation: "",
              acceptedTerms: false, // added for our checkbox
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              lastName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string().required("Password is required"),
              passwordConfirmation: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Passwords must match"
              ),
              acceptedTerms: Yup.boolean()
                .required("Required")
                .oneOf([true], "You must accept the terms and conditions."),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                //alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
              let newUser = values;
              console.log(newUser);
              setUserList([...userList, newUser]);
            }}
          >
            <Form>
              <div className="field-form">
                <MyTextInput
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="Your name"
                />
              </div>
              <div className="field-form">
                <MyTextInput
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Your Surname"
                />
              </div>
              <div className="field-form">
                <MyTextInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="jonah@formik.com"
                />
              </div>
              <div className="field-form">
                <MyTextInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                />
              </div>
              <div className="field-form">
                <MyTextInput
                  label="Repeat Password"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Your password"
                />
              </div>
              <MyCheckbox name="acceptedTerms">
                <span className="checkbox-text">
                  I accept the terms and conditions
                </span>
              </MyCheckbox>
              <div className="field-form-btn">
                <button className="btn btn-primary btn-block" type="submit">
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
          {successReg && (
            <p className="text-black">You are now signed up and can login!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
