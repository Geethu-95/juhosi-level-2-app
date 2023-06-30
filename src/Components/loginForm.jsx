import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const initialValues = {
    id: "",
    password: "",
  };

  const schema = Yup.object().shape({
    id: Yup.string().required("Please enter user ID"),
    password: Yup.string().required("Please enter password"),
  });

  const submitForm = (values) => {
    console.log(values);
    authenticationMech(values);
  };

  const renderError = (message) => <p className="help is-danger">{message}</p>;

  // const [formValues, setFormValues] = useState()

  const authenticationMech = async (values) => {
    // setFormValues(values)

    var formBody = [];
    for (var property in values) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(values[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    // console.log(formBody);

    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
      body: formBody,
    };

  await  fetch(
      "https://celebrated-sawine-2b01a9.netlify.app/.netlify/functions/index/api/getFromId&Password",
      requestOptions
    )
      // .then((response) => console.log(response))
      .then((data) => {
        if (data) {
          console.log(data);
          navigate("/orderEntry", {
            state: { owner: data[0].name, id: data[0].id },
          });
        } else {return alert("Invalid credentials!");}
      })
      // .catch((error) => {
      //   console.error(error)
      // })
  };

  const changePassword = () => {
    // if(initialValues.id!=="")
    // console.log(initialValues.id)
    navigate("/changePassword");
    //  alert("Please enter Id")
  };

  return (
    <>
      <div style={{ marginLeft: "40%" }}>
        <Formik
          initialValues={initialValues}
          onSubmit={submitForm}
          validationSchema={schema}
        >
          {(formik) => {
            return (
              <Form>
                <div className="field">
                  {/* <label className="label" htmlFor="id">
                    ID
                  </label> */}
                  <div className="control">
                    <Field
                      name="id"
                      type="text"
                      className="input"
                      placeholder="Enter Id"
                    />
                    <ErrorMessage name="id" render={renderError} />
                  </div>
                </div>

                <div className="field">
                  {/* <label className="label" htmlFor="name">
                    Password
                  </label> */}
                  <div className="control">
                    <Field
                      name="password"
                      type="text"
                      className="input"
                      placeholder="Enter password"
                    />
                    <ErrorMessage name="password" render={renderError} />
                  </div>
                </div>
                <button type="submit" className="button is-primary">
                  Sign In
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <button
        style={{ marginLeft: "40%" }}
        className="button is-primary"
        onClick={changePassword}
      >
        Change Password
      </button>
    </>
  );
}
