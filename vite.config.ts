import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		watch: {
			ignored: [
				// ignore dotfiles to prevent watching nixpkgs
				/(^|[/\\])\../
			]
		}
	},
	define: {
		global: {},
		globalThis: {}
	}
});
