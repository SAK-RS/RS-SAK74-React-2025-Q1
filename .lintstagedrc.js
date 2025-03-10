export default {
  '**/*.*': 'prettier --ignore-unknown --write',
  'src/**/*.{ts,tsx}': 'eslint --fix',
};
