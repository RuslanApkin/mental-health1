import { useEffect, useState } from "react";

import { useTelegram } from "../../app/hooks/telegram";
import ProgressBar from "./components/ProgressBar";
import { COLORS } from "./colors/colors";
import { Success } from "./components/Success";
import { InternalError } from "./components/InternalError";
import { validateAge } from "./utils/validations";

import { IntroStep } from "./steps/00_intro";
import { Step1 } from "./steps/01_age";
import { Step2 } from "./steps/02_gender";
import { Step3 } from "./steps/03_self_employed";
import { Step4 } from "./steps/04_family_history";
import { Step5 } from "./steps/05_no_employees";
import { Step6 } from "./steps/06_remote_work";
import { Step7 } from "./steps/07_benefits";
import { Step8 } from "./steps/08_wellness_program";
import { Step9 } from "./steps/09_seek_help";
import { Step10 } from "./steps/10_leave";
import { Step11 } from "./steps/11_mental_health_consequence";
import { Step12 } from "./steps/12_coworkers";
import { Step13 } from "./steps/13_supervisor";
import { Step14 } from "./steps/14_mental_vs_physical";
import { Outro } from "./steps/99_outro";

const steps = [
  IntroStep,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  Step7,
  Step8,
  Step9,
  Step10,
  Step11,
  Step12,
  Step13,
  Step14,
  Outro,
];

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [isFormValid, setIsFormValid] = useState(true);
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const { MainButton, BackButton, close, themeParams, user } = useTelegram();
  const [formData, setFormData] = useState({
    age: "",
    gender: 0,
    self_employed: 0,
    family_history: 0,
    no_employees: 0,
    remote_work: 0,
    benefits: 0,
    wellness_program: 0,
    seek_help: 0,
    leave: 0,
    mental_health_consequence: 0,
    coworkers: 0,
    supervisor: 0,
    mental_vs_physical: 0,
  });

  useEffect(() => {
    validateAge(formData.age, setIsFormValid, setError);
  }, [formData, step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const handleMainButtonClick = () => {
      const isLastStep = step === steps.length - 1;
      if (response) {
        close();
      } else if (isLastStep) {
        MainButton.showProgress().setParams({
          text: "Loading...",
          color: COLORS.secondarySumbit,
        });
        fetch(`${import.meta.env.VITE_BACKEND_URL}/score/${user?.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ test_score: 0.5 }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(`Error: ${response.status}`);
            }
          })
          .then((data) => {
            MainButton.hideProgress().setParams({
              text: "Submit",
              color: COLORS.primarySumbit,
            });
            setResponse({ ok: true, data });
            console.log(data);
          })
          .catch((error) => {
            MainButton.hideProgress().setParams({
              text: "Submit",
              color: COLORS.primarySumbit,
            });
            setResponse({ ok: false });
            console.error(error.message);
          });
      } else if (isFormValid) {
        setStep((prev) => prev + 1);
      }
    };

    const handleBackButtonClick = () => {
      if (step > 0) {
        setStep((prev) => prev - 1);
      }
    };

    MainButton.onClick(handleMainButtonClick);
    BackButton.onClick(handleBackButtonClick);

    return () => {
      MainButton.offClick(handleMainButtonClick);
      BackButton.offClick(handleBackButtonClick);
    };
  }, [step, isFormValid, response, MainButton, BackButton, close, user]);

  useEffect(() => {
    MainButton.show();
  }, [MainButton]);

  useEffect(() => {
    if (isFormValid) {
      MainButton.enable().setParams({
        text: "Next",
        color: themeParams.button_color,
      });
    } else {
      MainButton.disable().setParams({
        text: error,
        color: COLORS.primaryWarning,
      });
    }
  }, [isFormValid, MainButton, themeParams, error]);

  useEffect(() => {
    const isLastStep = step === steps.length - 1;
    if (response) {
      BackButton.hide();
      MainButton.setParams({
        text: "Ok",
        color: themeParams.button_color,
      });
    } else if (isLastStep) {
      MainButton.setParams({
        text: "Submit",
        color: COLORS.primarySumbit,
      });
    } else {
      MainButton.setParams({
        text: "Next",
        color: themeParams.button_color,
      });
    }
    if (step > 0) {
      BackButton.show();
    } else {
      MainButton.enable();
      setIsFormValid(true);
      BackButton.hide();
    }
  }, [step, response, MainButton, BackButton, themeParams]);

  return (
    <>
      {!response ? (
        <>
          <ProgressBar value={step} max={steps.length - 1} />
          <div
            style={{
              width: "100vw",
              boxSizing: "border-box",
              padding: "0 35px",
            }}
          >
            {`${import.meta.env.VITE_BACKEND_URL}/score/${user.id}`}
            {steps[step]({
              formData,
              handleChange,
              setIsFormValid,
              setError,
            })}
          </div>
        </>
      ) : response.ok ? (
        <Success response={response} />
      ) : (
        <InternalError />
      )}
    </>
  );
};

export default MultiStepForm;
