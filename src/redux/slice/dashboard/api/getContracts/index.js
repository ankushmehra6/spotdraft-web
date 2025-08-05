const typePrefix = "dashboard/getContracts";

export const getContractsExtraReducers = {
  [`${typePrefix}/pending`]: (state) => {
    state.getContractsStatus = "loading";
    state.getContractsError = null;
  },
  [`${typePrefix}/fulfilled`]: (state, action) => {
    state.getContractsStatus = "succeeded";
    state.contracts = action.payload?.data
  },
  [`${typePrefix}/rejected`]: (state, action) => {
    state.getContractsStatus = "failed";
    state.getContractsError = action.payload;
  },
};
