import React, { useEffect, useReducer, useState } from "react";
import { assign, createMachine } from "xstate";
import { useMachine } from "@xstate/react";

const initialState = "inactive";

const statusMachine = createMachine({
  initial: initialState,
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: {
        TOGGLE: {
          target: "pending",
          actions: assign({
            count: (context, event) => {
              return context.count + 1;
            },
          }),
        },
      },
    },
    active: {
      on: {
        TOGGLE: "inactive",
      },
    },
    pending: {
      on: {
        TOGGLE: "inactive",
        SUCCESS: "active",
      },
    },
  },
});

// const statusReducer = (state, event) => {
//   return statusMachine.transition(state, event);
// };

export const ScratchApp = () => {
  // const [status, setStatus] = useState("inactive");
  // const [status, dispatch] = useReducer(statusReducer, initialState);
  const [status, dispatch] = useMachine(statusMachine);
  const { count } = status.context;

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ status:", status);

    if (status.value === "pending") {
      const timerId = setTimeout(() => {
        console.log("calling dispatch");
        dispatch({ type: "SUCCESS" });
      }, 2000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [status, dispatch]);

  return (
    <div className="scratch">
      <div className="alarm">
        <div className="alarmTime">
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          ({count})
        </div>
        <div
          className="alarmToggle"
          data-active={status.value === "active" || undefined}
          style={{
            opacity: status.value === "pending" ? 0.5 : 1,
          }}
          onClick={() => {
            dispatch({ type: "TOGGLE" });
          }}
        ></div>
      </div>
    </div>
  );
};
