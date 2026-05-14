import { useState, useEffect, useRef } from 'react';

export function useStreamAnimation(initialBalance: number, monthlyFlowRate: number) {
  const [balance, setBalance] = useState(initialBalance);
  const startTimeRef = useRef(Date.now());
  
  // Convert monthly flow rate to per-millisecond flow rate
  // Assuming 30 days in a month for simplicity
  const flowRatePerMs = monthlyFlowRate / (30 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedMs = Date.now() - startTimeRef.current;
      const currentBalance = initialBalance + (elapsedMs * flowRatePerMs);
      setBalance(currentBalance);
    }, 100);

    return () => clearInterval(interval);
  }, [initialBalance, flowRatePerMs]);

  return balance;
}
