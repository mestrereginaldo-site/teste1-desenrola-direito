import { build } from 'esbuild';
import { execSync } from 'child_process';

// Build do client
console.log('Building client...');
execSync('cd client && npm run build', { stdio: 'inherit' });

// Build do server
console.log('Building server...');
await build({
  entryPoints: ['server/index.ts'],
  platform: 'node',
  bundle: true,
  format: 'esm',
  outdir: 'dist',
  external: [
    'pg',
    'pg-native',
    '@neondatabase/serverless',
    'bcrypt',
    'crypto'
  ],
});
