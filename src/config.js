// These env vars are set automatically as a result of
// npm run test, start, and build
const env = {
  test: {
    API_URL: 'https://monteslu.iceddev.com',
  },
  development: {
    API_URL: 'https://monteslu.iceddev.com',
  },
  production: {
    API_URL: 'https://monteslu.iceddev.com',
  },
};

export default env[process.env.NODE_ENV];
