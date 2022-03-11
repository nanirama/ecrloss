const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
});

//const HtmlSerializer = require('./src/utils/htmlSerializer');
//const prismicLinkResolver = require('./src/utils/linkResolver');
module.exports = {
  siteMetadata: {
    title: 'Ecr Shrink Group',
    titleAlt: 'Ecr Shrink Group',
    titleTemplate: '%s | Ecr Shrink Group',
    description: 'The ECR Community Shrink & OSA Group is a retailer-manufacturer working group focused on creating imaginative new ways to, together, better manage the problems of on-shelf availability, shrink and food waste.',
    siteUrl: 'https://ecr-shrink-group.com',
    siteLanguage: 'en-GB',
    ogLanguage: 'en_GB',
    defaultImage: '/logos/logo-1024.png',
    shortName: 'Ecr Shrink Group',
    themeColor: '#FFFFFF',
    backgroundColor: '#4E50F7',
    twitter: '@ECRGroup',
    facebook: 'ECRGroup',
    author: 'Ecr Shrink Group',
    organization: 'Ecr Shrink Group',
    mapboxToken: process.env.MAPBOX_PUBLIC_TOKEN,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          quality: 100,
          backgroundColor: `transparent`,
          webpOptions: {quality: 100}
        }
      }
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        "displayName": false,
        "fileName": false,
        "minify": false,
        "transpileTemplateLiterals": false
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: "GTM-P9KZRJZ",
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Homepage',
        short_name: 'Ecr Shrink Group',
        description: 'The ECR Community Shrink & OSA Group is a retailer-manufacturer working group focused on creating imaginative new ways to, together, better manage the problems of on-shelf availability, shrink and food waste.',
        start_url: 'https://ecr-shrink-group.com',
        background_color: '#4E50F7',
        theme_color: '#FFFFFF',
        display: 'standalone',
        icon: 'src/assets/images/favicon.png',
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Montserrat",
              variants: ["300", "400", "500", "600", "700"],
            },
          ],
        },
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: process.env.PRISMIC_REPO_NAME,
        accessToken: process.env.MAPBOX_PUBLIC_TOKEN,
        schemas: {
          home: require('./src/schemas/home.json'),
          page: require('./src/schemas/page.json'),
          person: require('./src/schemas/person.json'),
          research: require('./src/schemas/research.json'),
          layout: require('./src/schemas/layout.json'),
          meganav: require('./src/schemas/meganav.json'),
          meganavitem: require('./src/schemas/meganavitem.json'),
          organisation: require('./src/schemas/organisation.json'),
          category: require('./src/schemas/category.json'),
          blog: require('./src/schemas/blog.json'),
          webinar: require('./src/schemas/webinar.json'),
          event: require('./src/schemas/event.json'),
          question: require('./src/schemas/question.json'),
        }
      },
    },
    `gatsby-plugin-preload-fonts`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Montserrat",
              variants: ["300", "400", "500","600","700","800","900"],
              strategy: 'base64' // 'base64' || 'cdn'
            },
          ],
        },
        useMinify: true,
        usePreload: true
      },
    },   
    
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
