import { NextPage } from "next";
import { useReducer } from "react";
import DigitButton from "../components/DigitButton";
import OperationButton from "../components/OperationButton";
import reducer from "../hooks/state";
import styles from "../styles/Home.module.css";

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand: string) {
  if (operand === "") return;
  const [integer, decimal] = operand.split(".");
  const pareseint = integer ? parseInt(integer) : 0;
  if (decimal == null) return INTEGER_FORMATTER.format(pareseint);
  return `${INTEGER_FORMATTER.format(pareseint)}.${decimal}`;
}

const Home: NextPage = () => {
  const [state, dispatch] = useReducer(reducer, {
    overwrite: false,
    currentOperand: "",
    previousOperand: "",
    operation: "",
    digit: "",
  });

  return (
    <div className={styles.calculatorGrid}>
      <div className={styles.output}>
        <div className={styles.previousOperand}>
          {formatOperand(state.previousOperand)} {state.operation}
        </div>
        <div className={styles.currentOperand}>
          {formatOperand(state.currentOperand)}
        </div>
      </div>
      <button
        className={styles.spanTwo}
        onClick={() => dispatch({ type: "CLEAR", payload: undefined })}
      >
        AC
      </button>
      <button
        onClick={() => dispatch({ type: "DELETE_DIGIT", payload: undefined })}
      >
        DEL
      </button>
      <OperationButton state={state} operation="÷" dispatch={dispatch} />
      <DigitButton state={state} digit="1" dispatch={dispatch} />
      <DigitButton state={state} digit="2" dispatch={dispatch} />
      <DigitButton state={state} digit="3" dispatch={dispatch} />
      <OperationButton state={state} operation="*" dispatch={dispatch} />
      <DigitButton state={state} digit="4" dispatch={dispatch} />
      <DigitButton state={state} digit="5" dispatch={dispatch} />
      <DigitButton state={state} digit="6" dispatch={dispatch} />
      <OperationButton state={state} operation="+" dispatch={dispatch} />
      <DigitButton state={state} digit="7" dispatch={dispatch} />
      <DigitButton state={state} digit="8" dispatch={dispatch} />
      <DigitButton state={state} digit="9" dispatch={dispatch} />
      <OperationButton state={state} operation="-" dispatch={dispatch} />
      <DigitButton state={state} digit="." dispatch={dispatch} />
      <DigitButton state={state} digit="0" dispatch={dispatch} />
      <button
        className={styles.spanTwo}
        onClick={() => dispatch({ type: "EVALUATE", payload: undefined })}
      >
        =
      </button>
    </div>
  );
};

export default Home;
