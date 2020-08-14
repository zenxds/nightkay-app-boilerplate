module.exports = {
  webpack: (config, type) => {
    if (type === 'development') {
      config.externals = {
        'night-kay': 'nightKay',
      }
    }

    return config
  },
}
