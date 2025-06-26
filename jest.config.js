/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',

    // ✅ Указываем как путь к файлу
    '^@api$': '<rootDir>/src/utils/burger-api.ts',

    '^@utils-types(.*)$': '<rootDir>/src/utils/types.ts',
    '^@components(.*)$': '<rootDir>/src/components$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)']
};
