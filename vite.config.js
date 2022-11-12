import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist-client',
    lib: {
      entry: path.resolve(__dirname, 'src/main-client.ts'),
      name: 'masto',
      formats: [
        'es',
        'umd'
      ],
      fileName: (format) => `masto.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {
        },
      },
    },
  },
});
