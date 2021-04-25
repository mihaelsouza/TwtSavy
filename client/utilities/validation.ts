export function validateEmail (input: string): string | boolean {
  const messages: {
    required: string,
    invalid: string
  } = {
    required: 'An E-mail is required!',
    invalid: 'Invalid e-mail!'
  };

  if (!input) return messages.required;
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(input)) return messages.invalid;
  else return true;
};

export function validatePassword (input: string): string | boolean {
  const messages: {
    short: string,
    invalid: string
  } = {
    short: 'Must have at least 8 characters',
    invalid: 'Must have at least one upper and lowercase letter and one number'
  };

  if (input.length < 8) return messages.short;
  else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input)) return messages.invalid;
  return true;
};

export function validateUserQuery (searchTerm: string): string {
  if (searchTerm === '@') throw new Error('Invalid input.')
  else {
    const search = searchTerm.match(/.*?[@|#]+(\w+)\b.*/)![1] || '';
    return search.toLowerCase();
  }
}