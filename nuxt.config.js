const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'VueJS, NuxtJS, Vue, Nuxt, JS'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#1876D2',
    height: '3px',
    continuous: true
  },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuetify', '@/plugins/bus', '@/plugins/filters.js'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: `http://${pkg.config.nuxt.host}:${pkg.config.nuxt.port}/api`
  },

  manifest: {
    name: 'Nuxt Vuetify',
    lang: 'pt-BR',
    short_name: 'Nuxt Vuetify',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#FFFFFF',
    theme_color: '#FFEA00',
    description: 'Server Side Rendering With Nuxt And Vuetify',
    icons: [
      {
        src: '/logo.png',
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: '/logo.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: '/logo.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: '/logo.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: '/logo.png',
        sizes: '168x168',
        type: 'image/png'
      },
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png'
      }
    ]
  },

  serverMiddleware: ['~/api/index.js'],

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
