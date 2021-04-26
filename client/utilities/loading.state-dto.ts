export interface LoadingState {
  loading: boolean,
  text?: string,
  context?: string
};

export const loadingInitialState = {
  loading: false,
  text: 'Processing...',
  context: 'default'
};