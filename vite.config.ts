import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [enhancedImages(), tailwindcss(), sveltekit()],
	server: {
		watch: {
			ignored: [
				// ignore dotfiles to prevent watching nixpkgs
				/(^|[/\\])\../
			]
		}
	}
});
