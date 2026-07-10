module.exports = {
    important: false,
    content: [
        "src/views/**/*.twig",
        "src/assets/js/**/*.js",
        //todo:: inject it via the plugin or easier way
        'node_modules/@salla.sa/twilight-tailwind-theme/safe-list-css.txt',
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme   : {
        container : {
            center : true,
            padding: '10px',
            screens: {
                '2xl': "1280px"
            }
        },
        fontFamily: {
            sans: [
                'var(--font-main)',
                '-apple-system',
                'BlinkMacSystemFont',
            ],
            primary: "var(--font-main)"
        },
        extend    : {
            transitionTimingFunction: {
              'elastic'    : 'cubic-bezier(0.55, 0, 0.1, 1)',
              'standard'   : 'var(--ease-standard)',
              'emphasized' : 'var(--ease-emphasized)',
            },
            transitionDuration: {
              'fast': 'var(--duration-fast)',
              'base': 'var(--duration-base)',
              'slow': 'var(--duration-slow)',
            },
            gridTemplateColumns: {
                'auto-fill'  : 'repeat(auto-fill, 290px)',
            },
            colors             : {
                'dark'         : '#1D1F1F',
                'darker'       : '#0E0F0F',
                'danger'       : 'var(--color-danger)',
                'primary-dark' : 'var(--color-primary-dark)',

                // --- Design-token colors (Editorial Luxe) ---
                'ink'          : 'var(--color-ink)',
                'ink-soft'     : 'var(--color-ink-soft)',
                'ink-muted'    : 'var(--color-ink-muted)',
                'line'         : 'var(--color-line)',
                'line-strong'  : 'var(--color-line-strong)',
                'canvas'       : 'var(--surface-canvas)',
                'raised'       : 'var(--surface-raised)',
                'sunken'       : 'var(--surface-sunken)',
                'neutral': {
                    50 : 'var(--neutral-50)',
                    100: 'var(--neutral-100)',
                    200: 'var(--neutral-200)',
                    300: 'var(--neutral-300)',
                    400: 'var(--neutral-400)',
                    500: 'var(--neutral-500)',
                    600: 'var(--neutral-600)',
                    700: 'var(--neutral-700)',
                    800: 'var(--neutral-800)',
                    900: 'var(--neutral-900)',
                },
                'success'      : 'var(--color-success)',
                'success-soft' : 'var(--color-success-soft)',
                'warning'      : 'var(--color-warning)',
                'warning-soft' : 'var(--color-warning-soft)',
                'danger-soft'  : 'var(--color-danger-soft)',
                'info'         : 'var(--color-info)',
                'sale'         : 'var(--color-sale)',
            },
            spacing: {
              '3.75': '15px',
              '7.5' : '30px',
              '58'  : '232px',
              '62'  : '248px',
              '100' : '28rem',
              '116' : '464px',
              '132' : '528px',
              '200' : '800px',
            },
            borderRadius       : {
                // ATELIER editorial: sharp corners everywhere. The built-in
                // scale is intentionally collapsed toward 0 so the whole store
                // sheds Twilight's rounded look. rounded-full still available.
                'none' : '0',
                'tiny' : '0',
                'sm'   : '0',
                DEFAULT: '0',
                'md'   : '1px',
                'lg'   : '2px',
                'xl'   : '2px',
                '2xl'  : '3px',
                '3xl'  : '3px',
                'large': '2px',
                'big'  : '3px',
                'full' : '9999px',
                // token-backed aliases (kept for any explicit references)
                'token-xs' : 'var(--radius-xs)',
                'token-sm' : 'var(--radius-sm)',
                'token-md' : 'var(--radius-md)',
                'token-lg' : 'var(--radius-lg)',
                'token-xl' : 'var(--radius-xl)',
                'token-2xl': 'var(--radius-2xl)',
            },
            letterSpacing      : {
                'tightest': 'var(--tracking-tight)',
                'wider'   : 'var(--tracking-wide)',
            },
            fontSize           : {
                'icon-lg'   : '33px',
                'xxs'       : '10px',
                'xxxs'      : '8px',
                'title-size': '42px',
                '22px'      : '22px',
            },
            lineHeight         : {
                '12': '3rem',
                '14': '3.5rem',
                '16': '4rem',
                '18': '4.5rem',
                '20': '5rem',
            },
            boxShadow          : {
                'default' : '5px 10px 30px #2B2D340D;',
                'top'     : '0px 0px 10px #0000001A;',
                'md'      : '5px 10px 99px #2B2D340D',
                'dropdown'      : '0 4px 8px rgba(161, 121, 121, 0.07)',
                'light'   : '0px 4px 15px rgba(1, 1, 1, 0.06)',
                'huge'    : '0px 3px 6px #00000029',
                'progress': '0 5px 15px rgba(92, 213, 196, 0.4)',
                'mobile': 'rgb(0 0 0 / 9%) 0px 2px 1px, rgb(0 0 0 / 9%) 0px 4px 2px, rgb(0 0 0 / 9%) 0px 8px 4px, rgb(0 0 0 / 9%) 0px 16px 18px, rgb(0 0 0 / 9%) -15px 10px 7px, rgb(0 0 0 / 9%) -20px 10px 20px, rgb(0 0 0 / 9%) -20px 10px 20px, rgb(0 0 0 / 9%) -25px 20px 20px',
                // --- token-backed elevation (distinct names) ---
                'token-xs' : 'var(--shadow-xs)',
                'token-sm' : 'var(--shadow-sm)',
                'token-md' : 'var(--shadow-md)',
                'token-lg' : 'var(--shadow-lg)',
                'focus'    : 'var(--shadow-focus)',
            },
            width              : {
                '18': '4.5rem',
                '22': '5.5rem',
                '74': '18.5rem',
                '76': '19rem',
                '78': '19.5rem',
            },
            height             : {
                'banner'        : '200px',
                'lg-banner'     : '428px',
                'full-banner'   : '600px',
                '500'           : '500px',
                '460'           : '460px',
            },
            minWidth           : {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
            },
            maxWidth           : {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
            },
            zIndex             : {
                '1': '1',
                '2': '2',
                '-1': '-1',
                // --- semantic layering (distinct names) ---
                'sticky' : 'var(--z-sticky)',
                'header' : 'var(--z-header)',
                'drawer' : 'var(--z-drawer)',
                'overlay': 'var(--z-overlay)',
                'modal'  : 'var(--z-modal)',
                'toast'  : 'var(--z-toast)',
            },
            screens            : {
                'xxs': {'min': '380px', 'max': '479px'},
                'xs': '480px',
            },
            backgroundOpacity  : {
                '05': '0.05',
            },
            transitionProperty : {
                'height': 'height'
            },
            keyframes: {
                slideUpFromBottom: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0%)', opacity: '1' },
                },
                slideDownFromBottom: {
                    '0%': { transform: 'translateY(0%)', opacity: '1' },
                    '100%': { transform: 'translateY(100%)', opacity: '0' },
                },
            },
            animation: {
                slideUpFromBottom: 'slideUpFromBottom .6s linear',
                slideDownFromBottom: 'slideDownFromBottom .6s linear',
            },
        },
    },
    corePlugins: {
      outline: false,
    },
    plugins: [
      require('@salla.sa/twilight-tailwind-theme'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
    ],
}
