const typePrefix = "contract/updateStatus";

export const updateStatusReducers = {
  [`${typePrefix}/pending`]: (state) => {
    state.updateContractStatus = "loading";
    state.updateStatusError = null;
  },
  [`${typePrefix}/fulfilled`]: (state) => {
    state.updateContractStatus = "succeeded";
  },
  [`${typePrefix}/rejected`]: (state, action) => {
    state.updateContractStatus = "failed";
    state.updateStatusError = action.payload;
  },
};
