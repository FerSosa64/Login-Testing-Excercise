import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Directory for your test files
  use: {
    baseURL: 'http://localhost:8080', // Update this if using Vite
    browserName: 'chromium',
    headless: false, // Set to `true` for headless mode
    viewport: { width: 1280, height: 720 },
    video: 'on',
    screenshot: 'on'
  },
});
