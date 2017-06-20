const depcheck = require('depcheck');

const options = {
  ignoreMatches: [
    'eslint-*',
    'husky',
    'cron',
    'stream',
    'mocha-clean',
  ],
};

depcheck(__dirname, options, ({ dependencies, devDependencies }) => {
  if (!dependencies.length && !devDependencies.length) {
    process.exit(0);
  }

  if (dependencies.length) {
    console.log('Unused dependencies');
    dependencies.forEach((dep) => console.log(`* ${dep}`));
  }
  if (devDependencies.length) {
    console.log('Unused devDependencies');
    devDependencies.forEach((dep) => console.log(`* ${dep}`));
  }
  process.exit(1);
});

