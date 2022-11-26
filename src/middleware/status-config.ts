const monitorOptions: object = {
  title: 'My Boilerplate Application',
  path: '/status-monitor',
  spans: [
    {
      interval: 1, // Every second
      retention: 60 // Keep 60 data-points in memory
    },
    {
      interval: 5,
      retention: 60
    },
    {
      interval: 15,
      retention: 60
    }
  ],
  chartVisibility: {
    mem: true,
    rps: true,
    cpu: true,
    load: true,
    statusCodes: true,
    responseTime: true
  },
  healthChecks: [
    {
      protocol: 'http',
      host: 'localhost',
      path: '/api/v1/user',
      port: '3001'
    },
    {
      protocol: 'http',
      host: 'localhost',
      path: '/api/v1/user',
      port: '3001'
    }
  ]
};

export default monitorOptions;
