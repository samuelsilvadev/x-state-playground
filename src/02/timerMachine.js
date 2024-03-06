import { createMachine, assign } from "xstate";

const initialContextState = {
  duration: 60,
  elapsed: 0,
  interval: 0.1,
};

export const timerMachine = createMachine({
  initial: "idle",
  context: initialContextState,
  states: {
    idle: {
      entry: assign({
        duration: initialContextState.duration,
        elapsed: initialContextState.elapsed,
      }),
      on: {
        TOGGLE: "running",
      },
    },
    running: {
      on: {
        TOGGLE: "paused",
        ADD_MINUTE: {
          actions: assign({
            duration: (context, event) =>
              context.duration + initialContextState.duration,
          }),
        },
      },
    },
    paused: {
      on: {
        TOGGLE: "running",
        RESET: "idle",
      },
    },
  },
});
