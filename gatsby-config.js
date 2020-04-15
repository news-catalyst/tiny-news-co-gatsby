/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-netlify-cms`,
    {
      resolve: "gatsby-source-google-docs",
      options: {
          //---
          // All the following options are OPTIONAL
          //---
          //
          // To fetch only documents to specific folders
          // folders Ids can be found in Google Drive URLs
          // https://drive.google.com/drive/folders/FOLDER_ID
          folders: ["1r6jrpyn5-ATpxoRuwQuFjyJgFmj23RMi"],
          // You could need to fetch additional documents fields to your nodes
          // All available options: https://developers.google.com/drive/api/v3/reference/files#resource
          // For a better stack trace and more information
          // Usefull when you open a issue to report a bug
          debug: true,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/src/articles`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },

  ],

}
