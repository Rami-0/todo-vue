import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // Import the 'path' module

export default defineConfig({
	plugins: [vue()],
  resolve: {
    alias: {
      // Specify your aliases here
      '@': path.resolve(__dirname, 'src'),
    },
  },
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@/assets/scss/global.scss";`,
			},
		},
	},
});
