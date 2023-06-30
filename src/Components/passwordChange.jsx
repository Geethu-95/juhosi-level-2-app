import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PasswordChange() {
  const navigate = useNavigate();
  const initialValues = {
    npassword: "",
    cnpassword: "",
    phone: "",
  };

  const schema = Yup.object().shape({
  phone: Yup.string().required("Please enter phone number"),
    npassword: Yup.string().required("Please enter new password"),
    cnpassword: Yup.string().required("Please enter new password again"),
  });

  const submitForm = (values) => {
    console.log(values);
    authenticationMech(values);
  };

  const renderError = (message) => <p className="help is-danger">{message}</p>;

  const [apiResp, setApiResp] = useState();

  const authenticationMech = async (values) => {
    // console.log("hi ",values)
    var formBody = [];

    var postValues = {
     phone: values.phone,
     npassword: values.npassword,
     cnpassword: values.cnpassword
    };

    for (var property in postValues) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(postValues[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log("formBody", formBody);

    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
      body: formBody,
    };
    // console.log(values.phone)

   await fetch("https://celebrated-sawine-2b01a9.netlify.app/.netlify/functions/index/api/getPhone", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setApiResp(data[0]);
          // console.log("apiresp ", data);
        } else return alert("Incorrect phone number!");
      })
      .catch((error) => console.error(error));

    // console.log(apiResp);

    if (apiResp.phone_number === values.phone) {
    await  fetch("https://celebrated-sawine-2b01a9.netlify.app/.netlify/functions/index/api/update", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            console.log(data);
            alert("Password successfuly changed");
            navigate("/home");
          }
        })
        .catch((error) => console.error(error));

      // navigate("/home");
    }
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
                  <div className="control">
                    <Field
                      name="phone"
                      type="text"
                      className="input"
                      placeholder="Mobile"
                    />
                    <ErrorMessage name="phone" render={renderError} />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <Field
                      name="npassword"
                      type="text"
                      className="input"
                      placeholder="Enter new password"
                    />
                    <ErrorMessage name="npassword" render={renderError} />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <Field
                      name="cnpassword"
                      type="text"
                      className="input"
                      placeholder="Confirm new password"
                    />
                    <ErrorMessage name="cnpassword" render={renderError} />
                  </div>
                </div>
                <button type="submit" className="button is-primary">
                  SUBMIT
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
