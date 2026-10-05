import colors from 'vuetify/es5/util/colors'

export default {
  // Server configuration
  server: {
    port: 8127,
    host: 'localhost'
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: process.env.IS_AGENCY === '1' ? 'Ghost Collective' : 'Mason Gentry',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'theme-color', content: "#C1C1C1"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/aos", mode: "client" },
    '@/plugins/vue-gtag',
    { src: '@/plugins/x-pixel', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  env: {
    IS_AGENCY: process.env.IS_AGENCY === '1'
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/axios'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // ...other modules you might already have
  ],

  // Server Middleware: Add this block to register your middleware
  // serverMiddleware: [
  //  '~/middleware/pdfProxy',  // Add this line
  // ],

  // process.server isn't defined while this config loads, so a ternary on it
  // always picked the relative URL, and server-side requests went to port 80.
  // The axios module takes separate server and browser base URLs instead.
  axios: {
    baseURL: `http://localhost:8127/domains/${process.env.IS_AGENCY === '1' ? 'agency' : 'portfolio'}`,
    browserBaseURL: `/domains/${process.env.IS_AGENCY === '1' ? 'agency' : 'portfolio'}`
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: false
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // extend(config, { isClient }) {
    //   // Extend only webpack config for client-bundle
    //   if (isClient) {
    //     config.devtool = 'source-map'
    //   }
    // }
  },

  // /experiment is a work project served at the top level instead of /work/
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'experiment',
        path: '/:project(experiment)',
        component: resolve(__dirname, 'pages/work/_project.vue')
      })
    }
  },

  // Generate configuration for static site generation
  generate: {
    routes() {
      const fs = require('fs')
      const path = require('path')
      const routes = []

      // Determine which domain to use based on IS_AGENCY env var
      const domain = process.env.IS_AGENCY === '1' ? 'agency' : 'portfolio'
      const workDir = path.resolve(__dirname, `static/domains/${domain}/work`)
      const auditsDir = path.resolve(__dirname, `static/domains/${domain}/audits`)

      // Generate routes for work projects
      if (fs.existsSync(workDir)) {
        const projects = fs.readdirSync(workDir).filter(file => {
          return fs.statSync(path.join(workDir, file)).isDirectory()
        })
        projects.forEach(project => {
          routes.push(`/work/${project}`)
        })
      }

      // Generate routes for audits
      if (fs.existsSync(auditsDir)) {
        const audits = fs.readdirSync(auditsDir).filter(file => {
          return fs.statSync(path.join(auditsDir, file)).isDirectory()
        })
        audits.forEach(audit => {
          routes.push(`/audits/${audit}`)
        })
      }

      routes.push('/experiment')

      return routes
    }
  }
}
