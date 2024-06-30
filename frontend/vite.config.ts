import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import path from "path";
import {defineConfig} from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), legacy()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@vueuse/core": path.resolve(__dirname, "node_modules/@vueuse/core"),
			"@services": path.resolve(__dirname, "./src/services"),
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
	},
});
