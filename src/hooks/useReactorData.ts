import { useState, useEffect, useRef } from 'react';

export interface Reactor {
  id: string;
  name: string;
  temperature: number;
  pressure: number;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  lastUpdated: Date;
}

export interface Batch {
  id: string;
  reactorId: string;
  name: string;
  startTime: Date;
  endTime?: Date;
  status: 'running' | 'completed' | 'delayed' | 'failed';
  progress: number;
  operator: string;
  product?: string;
  batchSize?: number;
}

// Generate random temperature between min and max
const randomTemp = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

// Determine status based on temperature
const getStatus = (temp: number): Reactor['status'] => {
  if (temp < 0) return 'offline';
  if (temp < 70) return 'normal';
  if (temp < 90) return 'warning';
  return 'critical';
};

// Generate initial mock reactors
const generateMockReactors = (): Reactor[] => {
  return Array.from({ length: 4 }, (_, i) => {
    const temp = randomTemp(40, 100);
    return {
      id: `r-${i + 1}`,
      name: `Reactor ${i + 1}`,
      temperature: temp,
      pressure: randomTemp(20, 40),
      status: getStatus(temp),
      lastUpdated: new Date()
    };
  });
};

// Generate initial mock batches
const generateMockBatches = (reactors: Reactor[]): Batch[] => {
  const statuses: Batch['status'][] = ['running', 'completed', 'delayed', 'failed'];
  const operators = ['John Smith', 'Emma Johnson', 'Michael Brown', 'Sophia Garcia'];
  const products = ['Polymer A', 'Catalyst B', 'Solvent C', 'Compound D', 'Mixture E'];
  
  return Array.from({ length: 8 }, (_, i) => {
    const startDate = new Date();
    startDate.setHours(startDate.getHours() - randomTemp(1, 48));
    
    const progress = Math.min(100, randomTemp(10, 100));
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    let endDate;
    if (status === 'completed' || status === 'failed') {
      endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + randomTemp(1, 24));
    }
    
    return {
      id: `b-${i + 1}`,
      reactorId: reactors[Math.floor(Math.random() * reactors.length)].id,
      name: `Batch ${String.fromCharCode(65 + i)}`,
      startTime: startDate,
      endTime: endDate,
      status,
      progress,
      operator: operators[Math.floor(Math.random() * operators.length)],
      product: products[Math.floor(Math.random() * products.length)],
      batchSize: randomTemp(500, 1500)
    };
  });
};

export const useReactorData = (refreshRate = 5) => {
  const [reactors, setReactors] = useState<Reactor[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateReactorData = () => {
    setReactors(prevReactors => 
      prevReactors.map(reactor => {
        // 20% chance of changing temperature
        if (Math.random() < 0.2) {
          const tempChange = randomTemp(-5, 5);
          const newTemp = Math.max(0, Math.min(120, reactor.temperature + tempChange));
          
          return {
            ...reactor,
            temperature: newTemp,
            pressure: randomTemp(20, 40),
            status: getStatus(newTemp),
            lastUpdated: new Date()
          };
        }
        return reactor;
      })
    );

    setBatches(prevBatches => 
      prevBatches.map(batch => {
        // Update progress for running batches
        if (batch.status === 'running' && batch.progress < 100) {
          const newProgress = Math.min(100, batch.progress + randomTemp(1, 3));
          
          // 5% chance of batch being delayed
          const newStatus = Math.random() < 0.05 ? 'delayed' : batch.status;
          
          // If batch completes
          if (newProgress === 100) {
            return {
              ...batch,
              progress: 100,
              status: 'completed',
              endTime: new Date()
            };
          }
          
          return {
            ...batch,
            progress: newProgress,
            status: newStatus
          };
        }
        return batch;
      })
    );
  };

  // Initialize data
  useEffect(() => {
    const initialReactors = generateMockReactors();
    setReactors(initialReactors);
    setBatches(generateMockBatches(initialReactors));
    setIsLoading(false);
  }, []);

  // Set up periodic updates
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(updateReactorData, refreshRate * 1000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refreshRate]);

  return { reactors, batches, isLoading };
};
