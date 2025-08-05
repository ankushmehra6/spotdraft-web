import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axios";
import urls from "../../../constants/urls";
import { uploadContractExtraReducers } from "./api/uploadContract";
import { getCpExtraReducers } from "./api/getCp";
import { getContractsExtraReducers } from "./api/getContracts";
import { getContractExtraReducers } from "./api/getContract";
import { updateStatusReducers } from "./api/updateStatus";


const initialState = {
  name: "Saksham Jain",
  isUploadOpen: false,
  uploadStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  uploadError: null,
  getCpError: null,
  getCpStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  counterparties: [],
  counterpartiesMap:{},
  contracts: [],
  getContractsError: null,
  getContractsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  contract: null,
  getContractError: null,
  getContractStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
};

export const uploadContractAsync = createAsyncThunk(
  'dashboard/uploadContract',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(urls.upload, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const getCpAsync = createAsyncThunk(
  "dashboard/getCp",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(urls.getCounterparties);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch CPs");
    }
  }
);

export const getContractsAsync = createAsyncThunk(
  "dashboard/getContracts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(urls.getContracts);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch contracts");
    }
  }
);


export const getContractById = createAsyncThunk(
  'contract/getContract',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`${urls.getContracts}/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error fetching contract');
    }
  }
);

export const updateContractStatusAsync = createAsyncThunk(
  'contract/updateContractStatus',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(urls.updateContractStatus, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const userSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
    setUploadOpen: (state, action) => {
      state.isUploadOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    Object.entries(uploadContractExtraReducers).forEach(([actionType, reducerFn]) => {
      builder.addCase(actionType, reducerFn);
    });
    Object.entries(getCpExtraReducers).forEach(([actionType, reducerFn]) => {
      builder.addCase(actionType, reducerFn);
    });
    Object.entries(getContractsExtraReducers).forEach(([actionType, reducerFn]) => {
      builder.addCase(actionType, reducerFn);
    });
    Object.entries(getContractExtraReducers).forEach(([actionType, reducerFn]) => {
      builder.addCase(actionType, reducerFn);
    });
    Object.entries(updateStatusReducers).forEach(([actionType, reducerFn]) => {
      builder.addCase(actionType, reducerFn);
    });
  },
});

export const { updateName, setUploadOpen } = userSlice.actions;
export default userSlice.reducer;
