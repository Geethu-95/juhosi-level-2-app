import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { useState } from "react";
// import axios from "axios";
import { useLocation } from "react-router-dom";

export default function OrderEntry() {
  const { state } = useLocation();
  const { owner, id } = state;

  const initialValues = {
    orderDate: new Date(),
    company: "",
    owner: owner,
    item: "",
    count: 0,
    weight: "",
    requests: "",
  };

  const schema = Yup.object().shape({
    orderDate: Yup.date()
      .default(() => new Date())
      .required("Please select date"),
    company: Yup.string().required("Please enter value"),
    owner: Yup.string().required("Please enter value"),
    item: Yup.string().required("Please enter value"),
    count: Yup.number().required("Please enter value"),
    weight: Yup.number().required("Please enter value"),
    requests: Yup.string().required("Please enter value"),
  });

  const submitForm = async (values) => {
    // console.log(values.orderDate);

    var postValues = {
      orderDate: values.orderDate,
      item: values.item,
      count: values.count,
      weight: values.weight,
      requests: values.requests,
      id: id,
    };
    // console.log("postValues",postValues)
    var formBody = [];
    for (var property in postValues) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(postValues[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    // console.log("hi ", formBody);
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
      body: formBody,
    };

   await fetch(`https://celebrated-sawine-2b01a9.netlify.app/.netlify/functions/index/api/create`, requestOptions).then(
      (response) => {
        console.log(response);
        alert("Successfully submitted data!");
      }
    );
  };

  const renderError = (message) => <p className="help is-danger">{message}</p>;

  const exportToCsv = () => {

    const postValues = {
      id: id,
    };
    
    var formBody = [];

    for (var property in postValues) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(postValues[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
      body: formBody,
    };

    fetch(`https://celebrated-sawine-2b01a9.netlify.app/.netlify/functions/index/export-csv`, requestOptions).then(
      (response) => {
        console.log(response);
        alert("Successfully downloaded order data");
      }
    );
  };

  return (
    <div style={{ marginLeft: "40%" }}>
      <button sytle={{ marginRight: "20%" }} onClick={exportToCsv}>
        Export to CSV
      </button>
      <Formik
        initialValues={initialValues}
        onSubmit={submitForm}
        validationSchema={schema}
      >
        {(formik) => {
          return (
            <Form>
              <div className="field">
                <label className="label" htmlFor="orderDate">
                  orderDate
                </label>
                <div className="control">
                  <Field
                    name="orderDate"
                    type="date"
                    className="input"
                    placeholder="Order date"
                  />
                  <ErrorMessage name="orderDate" render={renderError} />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="company">
                  Company
                </label>
                <div className="control">
                  <Field
                    name="company"
                    type="text"
                    className="input"
                    placeholder="Company"
                  />
                  <ErrorMessage name="company" render={renderError} />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="owner">
                  Owner
                </label>
                <div className="control">
                  <Field
                    name="owner"
                    type="text"
                    className="input"
                    placeholder="Owner"
                    disabled
                  />
                  <ErrorMessage name="owner" render={renderError} />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="item">
                  Item
                </label>
                <div className="control">
                  <Field
                    name="item"
                    type="text"
                    className="input"
                    placeholder="Item"
                  />
                  <ErrorMessage name="item" render={renderError} />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="count">
                  Count
                </label>
                <div className="control">
                  <Field
                    name="count"
                    type="number"
                    className="input"
                    placeholder="Count"
                  />
                  <ErrorMessage name="count" render={renderError} />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="weight">
                  Weight
                </label>
                <div className="control">
                  <Field
                    name="weight"
                    type="text"
                    className="input"
                    placeholder="Weight"
                  />
                  <ErrorMessage name="weight" render={renderError} />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="requests">
                  Requests
                </label>
                <div className="control">
                  <Field
                    name="requests"
                    type="text"
                    className="input"
                    placeholder="Requests"
                  />
                  <ErrorMessage name="requests" render={renderError} />
                </div>
              </div>

              <button type="submit" className="button is-primary">
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
