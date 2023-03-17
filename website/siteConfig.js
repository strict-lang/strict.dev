const users = [
  {
    caption: 'Benjamin',
    image: '/img/StrictLogoBlue128x128.png',
    infoLink: 'https://BenjaminNitschke.com',
    pinned: true,
  },
];

const siteConfig = {
  title: "Strict Programming Language",
  tagline: "Create well written and efficient code quickly",
  url: "https://strict.dev",
  baseUrl: '/',
  projectName: "strict.dev",
  organizationName: "strict-lang",
  algolia: {
    apiKey: "7f6e29123c9235b4420f116e437ef737",
    indexName: "strict-lang",
    algoliaOptions: {}
  },
  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { search: true },
    { doc: "Overview", label: "Docs" },
    { doc: "Keywords", label: "API" },
    { blog: true, label: "Blog" }
  ],
  users,
  headerIcon: 'img/StrictLogoWhite64x64.png',
  footerIcon: 'img/StrictHeadOnly.png',
  favicon: 'img/favicon.ico',
  colors: {
    primaryColor: "#52A0C6",
    secondaryColor: "#21434C"
  },
  fonts: {
    myFont: ["Verdana", "Serif"]
  },
  copyright: `Copyright © ${new Date().getFullYear()} strict-lang`,
  highlight: {
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  onPageNav: 'separate',
  cleanUrl: true,
  enableUpdateBy: true,
  enableUpdateTime: true,
  blogSidebarCount: 'ALL',
  repoUrl: "https://github.com/strict-lang/strict.dev",
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  // docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  // repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
