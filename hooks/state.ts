export type Action =
  | "ADD_DIGIT"
  | "CHOOSE_OPERATION"
  | "CLEAR"
  | "DELETE_DIGIT"
  | "EVALUATE";

export interface State {
  overwrite: boolean;
  currentOperand: string;
  previousOperand: string;
  operation: string;
  digit: string;
}

function evaluate({ currentOperand, previousOperand, operation }: State) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = 0;
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
}

export const initialState: State = {
  overwrite: false,
  currentOperand: "",
  previousOperand: "",
  operation: "",
  digit: "",
};

export default function reducer<ReducerWithoutAction>(
  state: State,
  { type, payload }: { type: Action; payload: State | undefined }
): State {
  switch (type) {
    case "ADD_DIGIT":
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload?.digit ? payload?.digit : "",
          overwrite: false,
        };
      }
      if (payload?.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload?.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload?.digit}`,
      };

    case "CHOOSE_OPERATION":
      if (state.currentOperand == "" && state.previousOperand == "") {
        return state;
      }

      if (state.currentOperand == "") {
        return {
          ...state,
          operation: payload?.operation ? payload?.operation : "",
        };
      }

      if (state.previousOperand == "") {
        return {
          ...state,
          operation: payload?.operation ? payload?.operation : "",
          previousOperand: state.currentOperand,
          currentOperand: "",
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload?.operation ? payload?.operation : "",
        currentOperand: "",
      };
    case "CLEAR":
      return { ...initialState };
    case "DELETE_DIGIT":
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: "",
        };
      }
      if (state.currentOperand == "") return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: "" };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case "EVALUATE":
      if (
        state.operation == "" ||
        state.currentOperand == "" ||
        state.previousOperand == ""
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: "",
        operation: "",
        currentOperand: evaluate(state),
      };
  }
}
