const devMode = process.env.NODE_ENV === 'development';

export const server = dev ? 'http://localhost:3000' : 'https://myurl.com';
