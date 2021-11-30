import { Dispatch } from "react";
import { Action, State } from "../hooks/state";

export default function OperationButton({
  dispatch,
  operation,
  state,
}: {
  dispatch: Dispatch<{ type: Action; payload: State | undefined }>;
  operation: string;
  state: State;
}) {
  return (
    <button
      onClick={() =>
        dispatch({ type: "CHOOSE_OPERATION", payload: { ...state, operation } })
      }
    >
      {operation}
    </button>
  );
}
