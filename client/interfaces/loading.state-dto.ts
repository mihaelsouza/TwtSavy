export interface LoadingStateDTO {
  loading: boolean,
  text?: string,
  context?: string
};

export const loadingInitialState: LoadingStateDTO = {
  loading: false,
  text: 'Processing...',
  context: 'default'
};