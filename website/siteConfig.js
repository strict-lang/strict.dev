/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config
const siteConfig = {
  title: 'Strict Programming Language', // Title for your website.
  tagline: 'Strict is a simple to understand programming language for humans and AI',
  url: 'https://strict-lang.github.io', // Your website URL
  baseUrl: '/strict.dev/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',
  // Used for publishing and more
  projectName: 'strict.dev',
  organizationName: 'strict-lang',
  algolia: {
    apiKey: 'my-api-key',
    indexName: 'my-index-name',
    algoliaOptions: {} // Optional, if provided by Algolia
  },
  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {search: true},
    {doc: 'GettingStarted', label: 'Docs'},
    {blog: true, label: 'Blog'},
  ],
  /* path to images for header/footer */
  headerIcon: 'img/StrictLogo.png',
  footerIcon: 'img/StrictLogo.png',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#5DACBD',
    secondaryColor: '#24527A',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} strict-lang`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/strict-lang/strict.dev',
};

module.exports = siteConfig;
