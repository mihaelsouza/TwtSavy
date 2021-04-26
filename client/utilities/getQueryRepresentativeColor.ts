export function getQueryColor(evalCase: string): string {
  if (evalCase === 'positive') return 'green';
  else if (evalCase === 'negative') return 'red';
  else return 'grey';
};