export type Status = 'idle' | 'loading' | 'error' | 'success';

export interface BaseState {
  status: Status;
  error: string | null;
}

export interface BaseActions {
  setStatus: (status: Status) => void;
  setError: (error: string | null) => void;
  reset: () => void;
} 
