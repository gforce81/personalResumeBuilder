/**
 * Suppress specific console warnings during development
 * This is specifically for the SimpleMDE passive event listener warnings
 * that flood the console and impact performance
 */

if (import.meta.env.DEV) {
  const originalWarn = console.warn;
  const originalError = console.error;

  // Suppress passive listener violations
  console.warn = function filterWarnings(msg, ...args) {
    // Suppress SimpleMDE/CodeMirror passive listener warnings
    if (
      typeof msg === 'string' &&
      (msg.includes('Added non-passive event listener') ||
       msg.includes('passive event listener') ||
       msg.includes('scroll-blocking'))
    ) {
      return;
    }
    originalWarn.apply(console, [msg, ...args]);
  };

  console.error = function filterErrors(msg, ...args) {
    // Suppress the same warnings that come through as errors
    if (
      typeof msg === 'string' &&
      (msg.includes('Added non-passive event listener') ||
       msg.includes('passive event listener') ||
       msg.includes('scroll-blocking'))
    ) {
      return;
    }
    originalError.apply(console, [msg, ...args]);
  };

  console.log('%c Console Warning Filter Active', 'color: #0ea5e9; font-weight: bold;');
  console.log('%c Passive listener warnings suppressed for better dev experience', 'color: #64748b;');
}

