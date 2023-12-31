import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    const postValues = {
      id: values.id,
      password: values.password,
    };
    var formBody = [];
    for (var property in postValues) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(postValues[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    // console.log(formBody);

    // const requestOptions = {
    //   method: "POST",
    //   // mode: "cors",
    //   headers: {
    //     // "Content-Type": "application/x-www-form-urlencoded",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   body: formBody,
    // };

    // await fetch(
    //   "https://courageous-boba.netlify.app/.netlify/functions/api/api/getFromIdAndPassword",
    //   requestOptions
    // )
    await axios.post("https://courageous-boba.netlify.app/.netlify/functions/api/api/getFromIdAndPassword",postValues,
    {headers: {
      'content-type': 'application/json'
  }}
      )
      // .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log("data ",data);
          navigate("/orderEntry", {
            state: { owner: data.data[0].name, id: data.data[0].id },
          });
        } else alert("Invalid credentials!");
      })
    .catch((error) => {
      // console.error(error)
    })
  };

  const changePassword = () => {
    // if(initialValues.id!=="")
    // console.log(initialValues.id)
    navigate("/changePassword");
    //  alert("Please enter Id")
  };

  const MySpecialField = ({ field }) => {
    return <input {...field} 
    style={{
    width: '25%',
  padding: '12px 20px',
  margin:'8px 0',
  display: 'inline-block',
  border:'1px solid #ccc',
  borderRadius: '4px'
    }}/>
  };

  // const MyButton = ({ button }) => {
  //   return <input {...button} 
  //   style={{
  //     backgroundColor: "blue",
  //     border: "none",
  //     color: "white",
  //     padding: "15px 32px",
  //     textAlign: "center",
  //     textDecoration: "none",
  //     display: "inline-block",
  //     fontSize: "16px
  //   }}/>
  // };
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
                  <label className="label" htmlFor="id">
                    ID
                  </label>
                  <div className="control">
                    <Field
                      name="id"
                      type="text"
                      // className="input"
                      
                      component={MySpecialField}
                    />
                    <ErrorMessage name="id" render={renderError} />
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="name">
                    Password
                  </label>
                  <div className="control">
                    <Field
                      name="password"
                      type="text"
                      // className="input"
                      placeholder="Enter password"
                      component={MySpecialField}
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
