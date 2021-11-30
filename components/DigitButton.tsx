import { Dispatch } from "react";
import { Action, State } from "../hooks/state";

export default function DigitButton({
  dispatch,
  digit,
  state,
}: {
  dispatch: Dispatch<{ type: Action; payload: State | undefined }>;
  digit: string;
  state: State;
}) {
  return (
    <button
      onClick={() =>
        dispatch({ type: "ADD_DIGIT", payload: { ...state, digit } })
      }
    >
      {digit}
    </button>
  );
}
