/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["index.html"],
	theme: {
		container: {
			center: true,
			padding: "24px",
		},
		extend: {
			screens: {
				"2xl": "1320px",
			},
			fontFamily: {
				plusJakartaSans: ["Plus Jakarta Sans", "sans-serif"],
			},
			colors: {
				primary: "#14b8a6",
				dark: "#334155",
				secondary: "#64748b",
			},
		},
	},
	plugins: [],
};
