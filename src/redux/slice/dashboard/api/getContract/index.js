const typePrefix = "contract/getContract";

export const getContractExtraReducers = {
  [`${typePrefix}/pending`]: (state) => {
    state.getContractStatus = "loading";
    state.getContractError = null;
  },
  [`${typePrefix}/fulfilled`]: (state, action) => {
    console.log(action.payload, "uo");
    state.getContractStatus = "succeeded";
    state.contract = action.payload?.data
  },
  [`${typePrefix}/rejected`]: (state, action) => {
    state.getContractStatus = "failed";
    state.getContractError = action.payload;
  },
};
