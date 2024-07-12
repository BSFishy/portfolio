import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

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
		POSTS: readdirSync(join(__dirname, 'posts'))
			.filter((filename) => filename.endsWith('.md'))
			.map((filename) => filename.substring(0, filename.length - '.md'.length))
	}
});
