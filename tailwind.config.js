/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
        center: true,
    },
    extend: {
        colors: {
            primary: {
                DEFAULT: '#4361ee',
                light: '#eaf1ff',
                'dark-light': 'rgba(67,97,238,.15)',
                'my-bg' : '#2d90d2',
                'black': '#000000', 'blue-white': '#f0f9ff',
        
                
            },
            success: {
                DEFAULT: '#00ab55',
                light: '#ddf5f0',
                'dark-light': 'rgba(0,171,85,.15)',
            },
            danger: {
                DEFAULT: '#e7515a',
                light: '#fff5f5',
                'dark-light': 'rgba(231,81,90,.15)',
            },
            warning: {
                DEFAULT: '#e2a03f',
                light: '#fff9ed',
                'dark-light': 'rgba(226,160,63,.15)',
            },
            info: {
                DEFAULT: '#2196f3',
                light: '#e7f7ff',
                'dark-light': 'rgba(33,150,243,.15)',
            },

            'dark-bg':'#e8e8e8',
            'my-blue': '#2d90d2',
            'dark-white': '#ececec',
            'blue-white': '#f0f9ff',
        
        },
        fontFamily: {
            inter: ['Inter', 'sans-serif'],
          },
        spacing: {
            4.5: '18px',
        },
        boxShadow: {
            '3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
        },
        typography: ({ theme }) => ({
            DEFAULT: {
                css: {
                    '--tw-prose-invert-headings': theme('colors.white.dark'),
                    '--tw-prose-invert-links': theme('colors.white.dark'),
                    h1: { fontSize: '40px', marginBottom: '0.5rem', marginTop: 0 },
                    h2: { fontSize: '32px', marginBottom: '0.5rem', marginTop: 0 },
                    h3: { fontSize: '28px', marginBottom: '0.5rem', marginTop: 0 },
                    h4: { fontSize: '24px', marginBottom: '0.5rem', marginTop: 0 },
                    h5: { fontSize: '20px', marginBottom: '0.5rem', marginTop: 0 },
                    h6: { fontSize: '16px', marginBottom: '0.5rem', marginTop: 0 },
                    p: { marginBottom: '0.5rem' },
                    li: { margin: 0 },
                    img: { margin: 0 },
                },
            },
        }),
    },
},
  plugins: [],
}

