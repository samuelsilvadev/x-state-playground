export const timerMachineConfig = {
  initial: "idle",
  states: {
    idle: {
      on: {
        TOGGLE: "running",
      },
    },
    running: {
      on: {
        TOGGLE: "paused",
        RESET: "idle",
      },
    },
    paused: {
      on: {
        TOGGLE: "running",
        RESET: "idle",
      },
    },
  },
};

export const timerMachine = (state, event) => {
  return timerMachineConfig.states[state].on[event.type];
};
