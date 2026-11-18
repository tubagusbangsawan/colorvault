import { build } from 'vite';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  console.log('Compiling test suite with Vite...');
  await build({
    build: {
      outDir: path.resolve(__dirname, '../dist-test'),
      lib: {
        entry: path.resolve(__dirname, 'test-validation.ts'),
        formats: ['es'],
        fileName: () => 'test-bundle.mjs',
      },
      rollupOptions: {
        external: ['html-to-image'],
      },
      emptyOutDir: true,
    },
    configFile: false,
  });

  console.log('Running test bundle...');
  const testProc = spawn('node', [path.resolve(__dirname, '../dist-test/test-bundle.mjs')], {
    stdio: 'inherit',
  });

  testProc.on('close', code => {
    process.exit(code || 0);
  });
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
