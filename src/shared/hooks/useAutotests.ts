import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setMarkets,
  setTestRuns,
  setTestResults,
  addTestRun,
  addTestResult,
  updateTestRun,
  updateTestResult,
} from '../../app/slices/autotestsSlice';
import { MOCK_MARKETS, MOCK_TEST_RUNS, MOCK_TEST_RESULTS } from '../data/mockData';
import type { TestRun, TestResult } from '../data/mockData';

interface UseAutotestsReturn {
  markets: typeof MOCK_MARKETS;
  testRuns: TestRun[];
  testResults: TestResult[];
  loading: boolean;
  error: string | null;
  startTestRun: (marketId: string) => void;
  stopTestRun: (testRunId: string) => void;
  rerunTest: (testResultId: string) => void;
}

export const useAutotests = (): UseAutotestsReturn => {
  const dispatch = useAppDispatch();
  const { markets, testRuns, testResults, loading, error } = useAppSelector(state => state.autotests);

  // timers for running simulations (in-memory)
  const timersRef = { current: new Map<string, number>() } as { current: Map<string, number> };
  // store created results for each run so we can finalize them later
  const resultsMapRef = { current: new Map<string, TestResult[]>() } as { current: Map<string, TestResult[]> };

  // Set markets (static mock)
  useEffect(() => {
    dispatch(setMarkets(MOCK_MARKETS));
  }, [dispatch]);

  // Helper: simulate a test run — creates incremental TestResult entries and updates progress
  const startSimulationForRun = (run: TestRun, opts?: { resume?: boolean }) => {
    const runId = run.id;
    if (timersRef.current.has(runId)) return; // already running

    const totalTests = run.totalTests ?? Math.max(5, Math.floor(Math.random() * 15) + 5);
    const durationMs = 4000 + Math.floor(Math.random() * 4000); // 4-8s total for quicker demo
    const tickInterval = 400; // ms
    const ticks = Math.max(1, Math.ceil(durationMs / tickInterval));

    // determine how many tests already completed
    let completedCount = (run.passedTests ?? 0) + (run.failedTests ?? 0);

    // if resuming and progress is present, derive completedCount from progress
    if (opts?.resume && run.progress && run.progress > 0) {
      completedCount = Math.round((run.progress / 100) * totalTests);
    }

    const resultsArr: TestResult[] = [];
    resultsMapRef.current.set(runId, resultsArr);

    const intervalId = window.setInterval(() => {
      // on each tick, add 1..n results until totalTests reached
      const remaining = totalTests - completedCount;
      const ticksLeft = Math.max(1, ticks - Math.floor((completedCount / totalTests) * ticks));
      const perTick = Math.max(1, Math.ceil(remaining / ticksLeft));

      for (let i = 0; i < perTick && completedCount < totalTests; i++) {
        const idx = completedCount + 1;
        const result: TestResult = {
          id: `res-${runId}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,
          testRunId: runId,
          testName: `Test ${idx}`,
          expected: 'Success',
          actual: 'Running',
          status: 'running',
          timestamp: new Date().toISOString(),
        };
        resultsArr.push(result);
        dispatch(addTestResult(result));
        completedCount++;
      }

      const progress = Math.round((completedCount / totalTests) * 100);
      dispatch(updateTestRun({ ...run, progress, totalTests }));

      if (completedCount >= totalTests) {
        // finalize results
        const finalized = resultsArr.map(r => {
          const isSuccess = Math.random() > 0.2; // 80% pass chance
          return {
            ...r,
            status: isSuccess ? 'passed' : 'failed',
            actual: isSuccess ? 'Success' : 'Failed',
            errorMessage: isSuccess ? undefined : 'Test failed due to timeout',
            timestamp: new Date().toISOString(),
          } as TestResult;
        });

        finalized.forEach(fr => dispatch(updateTestResult(fr)));

        const passed = finalized.filter(f => f.status === 'passed').length;
        const failed = finalized.filter(f => f.status === 'failed').length;

        dispatch(updateTestRun({
          ...run,
          status: 'completed',
          progress: 100,
          passedTests: passed,
          failedTests: failed,
          endTime: new Date().toISOString(),
          totalTests,
        }));

        clearInterval(intervalId);
        timersRef.current.delete(runId);
        resultsMapRef.current.delete(runId);
      }
    }, tickInterval);

    timersRef.current.set(runId, intervalId as unknown as number);
  };


  // Load persisted runs/results or fallback to mocks; resume running tests
  useEffect(() => {
    const savedTestRuns = localStorage.getItem('testRuns');
    const savedTestResults = localStorage.getItem('testResults');

    if (savedTestRuns) {
      try {
        const parsedTestRuns = JSON.parse(savedTestRuns) as TestRun[];
        dispatch(setTestRuns(parsedTestRuns));
        // resume any running
        parsedTestRuns.forEach(r => {
          if (r.status === 'running') startSimulationForRun(r, { resume: true });
        });
      } catch (e) {
        console.error('Ошибка при парсинге testRuns из localStorage', e);
        dispatch(setTestRuns(MOCK_TEST_RUNS));
      }
    } else {
      dispatch(setTestRuns(MOCK_TEST_RUNS));
    }

    if (savedTestResults) {
      try {
        const parsedTestResults = JSON.parse(savedTestResults) as TestResult[];
        dispatch(setTestResults(parsedTestResults));
      } catch (e) {
        console.error('Ошибка при парсинге testResults из localStorage', e);
        dispatch(setTestResults(MOCK_TEST_RESULTS));
      }
    } else {
      dispatch(setTestResults(MOCK_TEST_RESULTS));
    }
  }, [dispatch]);

  // Сохранение данных в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('testRuns', JSON.stringify(testRuns));
  }, [testRuns]);

  useEffect(() => {
    localStorage.setItem('testResults', JSON.stringify(testResults));
  }, [testResults]);

  const startTestRun = (marketId: string) => {
    const existingRun = testRuns.find(run => run.marketId === marketId && run.status === 'running');
    
    if (existingRun) {
      // Если уже есть запущенные тесты для этого рынка, не запускаем новые
      return;
    }
    
    const newRun: TestRun = {
      id: `run-${Date.now()}`,
      marketId,
      status: 'running',
      progress: 0,
      // smaller total for quicker demo
      totalTests: Math.floor(Math.random() * 10) + 6,
      passedTests: 0,
      failedTests: 0,
      startTime: new Date().toISOString(),
    };

    dispatch(addTestRun(newRun));
    // start simulation immediately
    startSimulationForRun(newRun, { resume: false });
  };

  const stopTestRun = (testRunId: string) => {
    const updatedRun = testRuns.find(run => run.id === testRunId);
    if (updatedRun) {
      dispatch(updateTestRun({
        ...updatedRun,
        status: 'stopped',
        endTime: new Date().toISOString()
      }));
      // clear any running timer
      const timerId = timersRef.current.get(testRunId);
      if (timerId) {
        clearInterval(timerId as unknown as number);
        timersRef.current.delete(testRunId);
        resultsMapRef.current.delete(testRunId);
      }
    }
  };

  const rerunTest = (testResultId: string) => {
    const testResult = testResults.find(result => result.id === testResultId);
    
    if (!testResult) return;
    
    // Проверяем, не запущен ли уже тест
    if (testResult.status === 'running') {
      return;
    }
    
    // Обновляем статус теста на "выполняется"
    dispatch(updateTestResult({
      ...testResult,
      status: 'running',
      actual: 'Running'
    }));
    
    // Имитация завершения теста через короткое время
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% шанс успеха
      dispatch(updateTestResult({
        ...testResult,
        status: isSuccess ? 'passed' : 'failed',
        actual: isSuccess ? 'Success' : 'Failed',
        errorMessage: isSuccess ? undefined : 'Test failed due to timeout'
      }));
    }, 800);
  };

  return {
    markets,
    testRuns,
    testResults,
    loading,
    error,
    startTestRun,
    stopTestRun,
    rerunTest,
  };
};