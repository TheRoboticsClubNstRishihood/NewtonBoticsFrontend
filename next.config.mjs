/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/DashBoard",
        permanent: true, // Change to false if you want a temporary redirect
      },
    ];
  },
};

export default nextConfig;
