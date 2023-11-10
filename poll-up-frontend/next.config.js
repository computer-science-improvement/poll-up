/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'app.trainual.com',
      'new-trainual-staging.s3.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
