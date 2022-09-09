/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const webpack = require("webpack");
const path = require("path");

// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     domains: ['assets.vercel.com'],
//     formats: ['image/avif', 'image/webp'],
//   },
// }

module.exports = withPlugins([ [withImages] , {
  webpack: (config, options) => {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
  images: {
    disableStaticImages: true,
  },
}]);