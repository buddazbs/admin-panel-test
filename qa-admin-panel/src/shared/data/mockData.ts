// Моковые данные для автотестов

export interface Market {
  id: string;
  name: string;
  code: string;
}

export interface TestRun {
  id: string;
  marketId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'stopped';
  progress: number;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  startTime: string;
  endTime?: string;
}

export interface TestResult {
  id: string;
  testRunId: string;
  testName: string;
  expected: string;
  actual: string;
  status: 'passed' | 'failed' | 'running';
  errorMessage?: string;
  timestamp: string;
}

export const MOCK_MARKETS: Market[] = [
  { id: 'market-1', name: 'AT: BK', code: 'BK' },
  { id: 'market-2', name: 'AT: PB', code: 'PB' },
  { id: 'market-3', name: 'AT: NYSE', code: 'NYSE' },
  { id: 'market-4', name: 'AT: LSE', code: 'LSE' },
  { id: 'market-5', name: 'AT: TSE', code: 'TSE' },
  { id: 'market-6', name: 'AT: FWB', code: 'FWB' },
];

export const MOCK_TEST_RUNS: TestRun[] = [
  { 
    id: 'run-1',
    marketId: 'market-1',
    status: 'completed',
    progress: 100,
    totalTests: 20,
    passedTests: 18,
    failedTests: 2,
    startTime: '2023-07-15T10:00:00Z',
    endTime: '2023-07-15T10:15:00Z'
  },
  { 
    id: 'run-2',
    marketId: 'market-2',
    status: 'running',
    progress: 40,
    totalTests: 15,
    passedTests: 6,
    failedTests: 1,
    startTime: new Date(Date.now() - 2000).toISOString()
  },
  { 
    id: 'run-3',
    marketId: 'market-4',
    status: 'failed',
    progress: 30,
    totalTests: 10,
    passedTests: 3,
    failedTests: 4,
    startTime: '2023-07-15T09:45:00Z',
    endTime: '2023-07-15T10:05:00Z'
  },
];

export const MOCK_TEST_RESULTS: TestResult[] = [
  { 
    id: 'result-1', 
    testRunId: 'run-1', 
    testName: 'LoginTest', 
    expected: 'Success', 
    actual: 'Success', 
    status: 'passed', 
    timestamp: '2023-07-15T10:01:00Z'
  },
  { 
    id: 'result-2', 
    testRunId: 'run-1', 
    testName: 'PortfolioTest', 
    expected: 'Success', 
    actual: 'Failed', 
    status: 'failed', 
    errorMessage: 'Timeout exceeded', 
    timestamp: '2023-07-15T10:02:30Z'
  },
  { 
    id: 'result-3', 
    testRunId: 'run-2', 
    testName: 'OrderTest', 
    expected: 'Success', 
    actual: 'Success', 
    status: 'passed', 
    timestamp: '2023-07-15T10:31:15Z'
  },
  { 
    id: 'result-4', 
    testRunId: 'run-2', 
    testName: 'MarginTest', 
    expected: 'Success', 
    actual: 'Running', 
    status: 'running', 
    timestamp: '2023-07-15T10:40:30Z'
  },
];