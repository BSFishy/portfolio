import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [enhancedImages(), sveltekit()],
	server: {
		watch: {
			ignored: [
				// ignore dotfiles to prevent watching nixpkgs
				/(^|[/\\])\../
			]
		}
	}
});
