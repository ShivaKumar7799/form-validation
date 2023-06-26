import "./App.css";
import { useState } from "react";
import { useFormik } from 'formik';
import DynamicForm from "./components/dynamicForm";

function App() {
  
  const [firstFormValid, setFirstFormValid] = useState("{}");
  const [secondFormValid, setSecondFormValid] = useState("{}");
  const [thirdFormValid, setThirdFormValid] = useState("{}");

  const firstFormChange = (data) => {
  setFirstFormValid(data)
  }

  const secondFormChange = (data) => {
    setSecondFormValid(data)
  }

  const thirdFormChange = (data) => {
    setThirdFormValid(data)
  }

  const allSubmitHandle = () => {
    const firstData = JSON.parse(firstFormValid);
    const secondData = JSON.parse(secondFormValid);
    const thirdData = JSON.parse(thirdFormValid);

    console.log(firstData)

    firstData?.handleSubmit();
    secondData?.handleSubmit();
    thirdData?.handleSubmit();
    alert()
  }
  
  const checkFormValid = () => {
    console.log(JSON.parse(firstFormValid), JSON.parse(secondFormValid), JSON.parse(thirdFormValid))
    const firstData = JSON.parse(firstFormValid);
    const secondData = JSON.parse(secondFormValid);
    const thirdData = JSON.parse(thirdFormValid)
    if(firstData.values?.length > 0 || secondData.values?.length > 0 || thirdData.values?.length > 0){
      
     const firstValid = Array.isArray(firstData.errors) && firstData.errors.every((item) => item.valid === true ) ? false : firstData.values.length === 0 ? false : true
     const secondValid = Array.isArray(secondData.errors) && secondData.errors.every((item) => item.valid === true ) ? false : secondData.values.length === 0 ? false : true
     const thirdValid = Array.isArray(thirdData.errors) && thirdData.errors.every((item) => item.valid === true ) ? false : thirdData.values.length === 0 ? false : true
    

    console.log(firstValid, secondValid, thirdValid,"vals")

    if(firstValid || secondValid || thirdValid ){
      return true
    } else {
      return false
    }
      
      
    } else {
      return true
    }
  }

  return (
    <div>
      <DynamicForm handleChange = {firstFormChange} />
      <br />
      <br />
      <br />
      <DynamicForm handleChange = {secondFormChange} />
      <br />
      <br />
       <br />
      <DynamicForm handleChange = {thirdFormChange} />
      <button disabled = { checkFormValid() } >submit</button>
      <button onClick={allSubmitHandle} >All Submit</button>
    </div>
  );
}

export default App;
