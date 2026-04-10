export const isAuthEnabled = () =>
  process.env.AUTH_ENABLED?.toLowerCase() !== 'false';
