module.exports = function () {
  return {
    files: ['src/*.ts'],

    tests: ['test/*spec.ts'],

    env: {
      type: 'node',
    },

    testFramework: 'jest',

    workers: {
      recycle: true,
    },
  };
};
