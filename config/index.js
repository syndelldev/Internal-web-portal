const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://dev-branch.d2t0i33uykx3cf.amplifyapp.com';