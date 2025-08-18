'use client';

import { useState, useEffect } from 'react';

export interface PageInitialization {
  [key: string]: boolean;
}

export interface UsePageInitializationOptions {
  initialTasks?: string[];
  autoStart?: boolean;
  delay?: number;
}

export function usePageInitialization(options: UsePageInitializationOptions = {}) {
  const { 
    initialTasks = ['data', 'components'], 
    autoStart = true, 
    delay = 100 
  } = options;

  const [mounted, setMounted] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);
  const [pageInitialization, setPageInitialization] = useState<PageInitialization>(() => {
    return initialTasks.reduce((acc, task) => ({ ...acc, [task]: false }), {});
  });

  const updateInitializationState = (updates: Partial<PageInitialization>) => {
    setPageInitialization(prev => {
      const newState = { ...prev };
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined) {
          newState[key] = value;
        }
      });
      return newState;
    });
  };

  const delayedStateUpdate = (updateFn: () => void): Promise<void> => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        updateFn();
        resolve();
      }, delay);
    });
  };

  const initializeTask = async (taskName: string, taskFn?: () => Promise<void> | void) => {
    try {
      if (taskFn) {
        await taskFn();
      }
      return delayedStateUpdate(() => updateInitializationState({ [taskName]: true }));
    } catch (error) {
      console.warn(`Task ${taskName} failed:`, error);
      return delayedStateUpdate(() => updateInitializationState({ [taskName]: true }));
    }
  };

  const initializePage = async (tasks: Array<{ name: string, fn?: () => Promise<void> | void }> = []) => {
    setMounted(true);
    
    // If no tasks provided, just mark all initial tasks as complete
    if (tasks.length === 0) {
      const defaultTasks = initialTasks.map(task => ({ name: task }));
      await Promise.allSettled(defaultTasks.map(task => initializeTask(task.name)));
    } else {
      await Promise.allSettled(tasks.map(task => initializeTask(task.name, task.fn)));
    }
    
    return delayedStateUpdate(() => setIsPageReady(true));
  };

  const isAllTasksComplete = () => {
    return Object.values(pageInitialization).every(completed => completed);
  };

  const getProgress = () => {
    const completed = Object.values(pageInitialization).filter(Boolean).length;
    const total = Object.keys(pageInitialization).length;
    return total > 0 ? (completed / total) * 100 : 0;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (autoStart) {
      initializePage().catch(error => {
        console.error('Page initialization error:', error);
        delayedStateUpdate(() => setIsPageReady(true));
      });
    }
  }, []);

  return {
    mounted,
    isPageReady,
    pageInitialization,
    updateInitializationState,
    initializeTask,
    initializePage,
    isAllTasksComplete,
    getProgress
  };
}
