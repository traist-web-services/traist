const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['"Atkinson Hyperlegible"', ...defaultTheme.fontFamily.sans]
		},
		extend: {}
	},

	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			{
				traist: {
					primary: '#0C6291',
					'primary-focus': '#094a6d',
					'primary-content': '#ffffff',
					secondary: '#F0D156',
					'secondary-focus': '#d8bc4d',
					'secondary-content': '#ffffff',
					accent: '#b1d4b0',
					'accent-focus': '#94b092',
					'accent-content': '#ffffff',
					neutral: '#3B413C',
					'neutral-focus': '#2c312d',
					'neutral-content': '#ffffff',
					'base-100': '#ffffff',
					'base-200': '#f5f6f5',
					'base-300': '#ced0ce',
					'base-content': '#063047',
					info: '#9ec0d3',
					success: '#C5EBC3',
					warning: '#F0D156',
					error: '#A63446'
				}
			}
		]
	}
};

module.exports = config;
