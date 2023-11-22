/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://us21.api.mailchimp.com/3.0/:path*",
      },
    ];
  },
};
