module.exports = {
  testEnvironment: 'node',
  testRegex: './src/.*\\.(test|spec)?\\.(ts|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@(root.*)$': '<rootDir>./$1',
    '^@user-module(.*)$': '<rootDir>/src//module/user$1',
    '^@core(.*)$': '<rootDir>/src//shared/core$1',
    '^@shared-infra(.*)$': '<rootDir>/src//shared/infra$1',
    '^@ioc(.*)$': '<rootDir>/src//ioc$1'
  },
  collectCoverage: true,
  coverageReporters: ['json', 'html']
};
