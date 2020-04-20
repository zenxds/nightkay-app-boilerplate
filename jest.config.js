module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/src/'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css',
  },
  setupFilesAfterEnv: ['jest-enzyme'],
  globals: {
    API_SERVER_PLACEHOLDER: 'http://www.dingxiang-inc.com',
  },
  testEnvironment: 'enzyme',
  preset: 'ts-jest',
}
