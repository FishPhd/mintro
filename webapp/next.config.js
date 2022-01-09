const withPWA = require("next-pwa");

module.exports = withPWA({
  images: {
    domains: ["webapp-profile-images.s3.amazonaws.com"],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  }
});
