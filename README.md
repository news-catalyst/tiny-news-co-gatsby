# tiny-news-co-gatsby
<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Testing Gatsby + Netlify-CMS
</h1>

This is hello-world boilerplate used to test Gatsby + Netlify-CMS for Tiny News Collectives. 

## 🚀 Quick start

1. **Install gatsby command line tools.**

    ```shell
    npm install -g gatsby-cli
    ```

1.  **Clone this repo.**

    ```shell
    git clone git@github.com:news-catalyst/tiny-news-co-gatsby.git
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd tiny-news-co-gatsby/
    npm install
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `tiny-news-co-gatsby` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

1. **Check out the Netlify-CMS interface.**

    Open `http://localhost:8000/admin/`

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-hello-world)

[![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/import/project?template=https://github.com/gatsbyjs/gatsby-starter-hello-world)

<!-- AUTO-GENERATED-CONTENT:END -->

## 🎣 Publishing Hooks

We have a few options as far as publishing content goes:

### Immediate publishing from the article editor in Netlify CMS

The default CMS settings do not include what Netlify calls the "editorial workflow" - when you create a new article, you can publish it immediately.

How this works: behind the scenes, the CMS triggers a commit to the git repo. Default settings are that any commit to master should trigger a build. 

* create a new article in the CMS
* publish now 
* that adds and commits the new article (markdown file) to the git repo
* netlify runs a build (`gatsby build`)
* this publishes the site as static files

### Using the editorial workflow in Netlify CMS

It's trivial to configure the CMS to instead use an editorial workflow. Instead of an article getting published immediately, it goes through a review process where its status changes from `draft` to `in review` to `ready`.  Once `ready` it may then be published (immediately) by clicking a publish button from the workflow page.

How this works: saving an article generates a pull request in the github repo and applies a `draft` label. Changing its status will change the labeling on the pull request (`pending_review`, `pending_publish`). The article gets published either by clicking the workflow page's publish button, by clicking the `publish now` button in the article editor, or by merging the PR in Github. Note that clicking either CMS button is actually using Github APIs to merge the PR, so it's a UI wrapper to that GH process.

* create a new article in the CMS
* `save` instead of `publish now` (save is now your only option)
* change the article status in either workflow tab or article editor
* when ready to publish, click the publish now button in the CMS

### Other options

I think the above gives us decent publishing options, but they're also limited: you can't schedule content for publishing, it's all a manual process.

However, all of our tools are highly configurable, so that means we should be able to extend them to allow for more flexibility.

* interface with Github's API to merge a PR (opened in Netlify CMS's workflow) into master 🚀 automatically publish immediately
* integrate other article editors with Github API to create PRs 🏗 draft new content for publishing
  * care needs to be taken about proper formatting for gatsby articles
* write lambda functions that run on cron to schedule publishing
  * [netlify supports serverless function management](https://docs.netlify.com/functions/overview/#manage-your-serverless-functions)
  * extend Netlify CMS with publish scheduler UI element
  * cms scheduler UI element could write to dynamodb table `scheduled_articles` via AWS APIs
  * lambda/netlify function could look for entries in `scheduled_articles` every hour and integrate with Github API to merge PR 🚀 publish
* netlify also supports [build hooks](https://docs.netlify.com/configure-builds/build-hooks/#parameters)
  * create a build hook on master, get URL
  * integrate other services (like facet) into CMS
  * trigger new build by posting to build hook URL
  * I could see this being useful for media management, for example