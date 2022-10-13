const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://dev-branch.d3qw7nr70bot5z.amplifyapp.com';