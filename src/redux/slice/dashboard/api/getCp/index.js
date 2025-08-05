const typePrefix = "dashboard/getCp";

export const getCpExtraReducers = {
  [`${typePrefix}/pending`]: (state) => {
    state.getCpStatus = "loading";
    state.getCpError = null;
  },
  [`${typePrefix}/fulfilled`]: (state, action) => {
    state.getCpStatus = "succeeded";
    state.counterparties = action.payload?.data?.map((cp) => {
      state.counterpartiesMap[cp._id] = { ...cp };
      return {
        label: `${cp.name} ${cp.email ? `(${cp.email})` : ""}`,
        value: cp._id,
      };
    });
  },
  [`${typePrefix}/rejected`]: (state, action) => {
    state.getCpStatus = "failed";
    state.getCpError = action.payload;
  },
};
