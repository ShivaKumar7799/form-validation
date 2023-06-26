import React from 'react'
import { useState } from 'react';
import { useFormik } from 'formik';

function DynamicForm({ handleChange}) {

  const [inputFields, setInputFields] = useState([]);

  const validateForm = (values) => {

    const errorValidations = values.map((value,index) => {
      const errros = {}

      if(value.name === ""){
        errros.name = "name is required"
      }
      if(value.age === ""){
        errros.age = "age is required"
      }
      
      let errorValues = Object.values(value);
      errorValues = errorValues.every((value) => value !== "" )
      errros.valid = errorValues

      return errros

    } )

    return errorValidations

  }

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: inputFields,
    validate : validateForm,
    onSubmit: (values) => {
      console.log(values,'form submit values')
    },
  });

  const addFields = () => {
    let newfield = { name: "", age: "" };
    setInputFields([...formik.values, newfield]);
  };

  const removeFields = (index) => {
    let data = [...formik.values];
    data.splice(index, 1);
    setInputFields(data);
  };
  return (
    <div>
        {handleChange(JSON.stringify(formik))}
        {Array.isArray(formik.errors) && formik.errors.every((item) => item.valid === true ) ? "valid" : inputFields.length === 0 ? "valid" : "not valid" }
        <form onSubmit={formik.handleSubmit} >
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <input
                name={`[${index}].name`}
                placeholder="Name"
                value={formik.values[index]?.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.values[index]?.name === "" && formik.touched[index]?.name && "Name is Required" }
              
              <input
                name={`[${index}].age`}
                placeholder="Age"
                value={formik.values[index]?.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.values[index]?.age === "" && formik.touched[index]?.age && "age is Required" }
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          );
        })}
        <button type='submit' >Submit</button>
      </form>
      <button onClick={addFields}>Add More..</button>
    </div>
  )
}

export default React.memo(DynamicForm)