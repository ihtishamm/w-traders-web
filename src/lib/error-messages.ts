// The backend throws i18n-style keys as exception messages (e.g.
// `error.invalidCredentials`) but its TranslationInterceptor only runs on
// successful response bodies, not thrown exceptions — so these keys reach
// the client untranslated. Known keys get a friendly override; anything
// else falls back to humanizing the key itself rather than showing raw dots.
const KNOWN_ERROR_MESSAGES: Record<string, string> = {
  'error.invalidCredentials': 'Incorrect email or password.',
  'error.samePassword':
    'New password must be different from the current password.',
  'error.conditionRequiredForReturnType':
    'Condition must not be set for a repair return.',
  'error.planStatusDoesNotAllowReturn':
    "This plan's status does not allow a return to be recorded.",
  'error.repairNotEligibleForCompletion':
    'This return is not eligible to be marked as a completed repair.'
};

function humanizeErrorKey(key: string): string {
  const lastSegment = key.split('.').pop() ?? key;
  const withSpaces = lastSegment.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase();
}

export function resolveErrorMessage(message: string): string {
  if (!message.startsWith('error.')) return message;
  return KNOWN_ERROR_MESSAGES[message] ?? humanizeErrorKey(message);
}
