const typePrefix = "dashboard/uploadContract";

export const uploadContractExtraReducers = {
  [`${typePrefix}/pending`]: (state) => {
    state.uploadStatus = "loading";
    state.uploadError = null;
  },
  [`${typePrefix}/fulfilled`]: (state) => {
    state.uploadStatus = "succeeded";
  },
  [`${typePrefix}/rejected`]: (state, action) => {
    state.uploadStatus = "failed";
    state.uploadError = action.payload;
  },
};
