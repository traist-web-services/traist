module.exports = {
  images: {
    domains: ["source.unsplash.com"]
  },
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });
    return config;
  }
};
