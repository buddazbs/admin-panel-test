import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TestRun, TestResult, Market } from '../../shared/data/mockData';

interface AutotestsState {
  markets: Market[];
  testRuns: TestRun[];
  testResults: TestResult[];
  loading: boolean;
  error: string | null;
}

const initialState: AutotestsState = {
  markets: [],
  testRuns: [],
  testResults: [],
  loading: false,
  error: null,
};

export const autotestsSlice = createSlice({
  name: '@@app/autotests',
  initialState,
  reducers: {
    setMarkets: (state, action: PayloadAction<Market[]>) => {
      state.markets = action.payload;
    },
    setTestRuns: (state, action: PayloadAction<TestRun[]>) => {
      state.testRuns = action.payload;
    },
    setTestResults: (state, action: PayloadAction<TestResult[]>) => {
      state.testResults = action.payload;
    },
    addTestRun: (state, action: PayloadAction<TestRun>) => {
      state.testRuns.unshift(action.payload);
    },
    updateTestRun: (state, action: PayloadAction<TestRun>) => {
      const index = state.testRuns.findIndex(run => run.id === action.payload.id);
      if (index !== -1) {
        state.testRuns[index] = action.payload;
      }
    },
    addTestResult: (state, action: PayloadAction<TestResult>) => {
      state.testResults.unshift(action.payload);
    },
    updateTestResult: (state, action: PayloadAction<TestResult>) => {
      const index = state.testResults.findIndex(result => result.id === action.payload.id);
      if (index !== -1) {
        state.testResults[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setMarkets,
  setTestRuns,
  setTestResults,
  addTestRun,
  updateTestRun,
  addTestResult,
  updateTestResult,
  setLoading,
  setError,
} = autotestsSlice.actions;

export default autotestsSlice.reducer;