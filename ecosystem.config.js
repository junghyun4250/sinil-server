module.exports = {
  apps: [
    {
      name: "my-app",
      script: "main.js",
      node_args: "--trace-deprecation",
      max_memory_restart: "4096M",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
