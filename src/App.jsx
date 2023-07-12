import { Form, Field, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import "./appStyle.css";
import { useEffect, useState } from "react";

function App() {
  const [year, setYear] = useState("- -");
  const [month, setMonth] = useState("- -");
  const [day, setDay] = useState("- -");
  const [hasError, setHasError] = useState(false);

  const [errorStyle, setErrorStyle] = useState("errorInput animate__animated animate__headShake");


  const currentDate = new Date();

  const currentDay = currentDate.getDate(); // Günü alır (1-31 arası değer)
  const currentMonth = currentDate.getMonth() + 1; // Ayı alır (0-11 arası değer, bu yüzden +1 eklenir)
  const currentYear = currentDate.getFullYear(); // Yılı alır (4 basamaklı bir sayı)

  const initialValues = {
    day: "",
    month: "",
    year: "",
  };

  useEffect(() => {
    if (month < 0) {
      setMonth((prev) => prev + 12);
      setYear((prev) => prev - 1);
    }
  }, [month]);

  useEffect(() => {
    if (day < 0) {
      setDay((prev) => prev + 30);
      setMonth((prev) => prev - 1);
    }
  }, [day]);

  const handleSubmit = (values) => {
    const { day, month, year } = values;

    setYear(currentYear - year);
    setMonth(currentMonth - month);
    setDay(currentDay - day);

    setHasError(false)
  };


  const schema = yup.object().shape({
    day: yup
      .number()
      .required("This field is required")
      .min(1, "Cannot be less than 1")
      .max(31, "Cannot be greater than 31")
      .test("is-valid-day", "Invalid day", function (value) {
        const { month, year } = this.parent;
        const date = new Date(year, month - 1, value);
        return (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === value
        );
      }),
    month: yup
      .number()
      .min(1, "Cannot be less than 1")
      .max(12, "Cannot be greater than 12")
      .required("This field is required"),
    year: yup
      .number()
      .min(1900, "Cannot be less than 1900")
      .max(currentYear, "Must be in the past")
      .required("This field is required"),
  });

  const handleChange = () => {
    console.log(test);
  }

  return (
    <div className="ageCalculator">
      <div className="ageCalculatorWrapper">
        <div className="wrapperTop">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={schema}
            validateOnChange={false}
          >
           
              <Form className="ageCalculatorForm">
                <div className="ageCalculatorFormInputBoxs">
                  <div className={`ageCalculatorFormInputBox`}>
                    <label htmlFor="day" className="ageCalculatorFormLabel">
                      Day
                    </label>
                    <Field
                      name="day"
                      type="number"
                      className={`ageCalculatorFormInput`}
                      placeholder="DD"
                    />
                               <div className="errorMessage">
                    {hasError && (<ErrorMessage name="day" />)} 
                    </div>
                  </div>
                  <div className="ageCalculatorFormInputBox">
                    <label htmlFor="month" className="ageCalculatorFormLabel">
                      Month
                    </label>
                    <Field
                      name="month"
                      type="number"
                      className={`ageCalculatorFormInput`}
                      placeholder="MM"
                    />
                    <div className="errorMessage">
                    {hasError && (<ErrorMessage name="month" />)} 
                    </div>
                  </div>
                  <div className="ageCalculatorFormInputBox">
                    <label htmlFor="year" className="ageCalculatorFormLabel">
                      Year
                    </label>
                    <Field
                      name="year"
                      type="number"
                      className={`ageCalculatorFormInput `}
                      placeholder="YYYY"
                    />
                    <div className="errorMessage">
                    {hasError && (<ErrorMessage name="year" />)} 
                    </div>
                  </div>
                </div>
                <div className="formSeperatorContainer">
                  <hr className="formSeperator" />
                  <button className="formButton" onClick={() => setHasError(true)}>
                    <img src="assets/images/icon-arrow.svg" alt="" className="formButtonImg"/>
                  </button >
                </div>
              </Form>
    
          </Formik>
        </div>
        <div className="wrapperBottom">
          <div className="resultBoxs">
            <div className="resultBox">
              <h1 className="resultBoxNumber">{year}</h1>
              <p className="resultBoxText">years</p>
            </div>
            <div className="resultBox">
              <h1 className="resultBoxNumber">{month}</h1>
              <p className="resultBoxText">months</p>
            </div>
            <div className="resultBox">
              <h1 className="resultBoxNumber">{day}</h1>
              <p className="resultBoxText">days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
