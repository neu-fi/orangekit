// tsup.config.ts

import { defineConfig } from "tsup"

export default defineConfig({
	// The file we created above that will be the entrypoint to the library.
	entry: ["./src/index.tsx"],
	// Enable TypeScript type definitions to be generated in the output.
	// This provides type-definitions to consumers.
	dts: true,
	// Clean the `dist` directory before building.
	// Set to false for not logging errors on hot reload
	clean: false,
	// Sourcemaps for easier debugging.
	sourcemap: true,
	loader: {
		".jpg": "dataurl",
		".png": "dataurl",
		".svg": "dataurl",
		".webp": "dataurl",
	},
})
