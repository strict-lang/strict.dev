// See https://docusaurus.io/docs/site-config
const siteConfig = {
  title: "Strict Programming Language",
  tagline: "Create well written and efficient code quickly",
  cname: "strict.dev",
  url: "https://strict.dev",
  baseUrl: "/",
  projectName: "strict.dev",
  organizationName: "strict-lang",
  algolia: {
    apiKey: "7f6e29123c9235b4420f116e437ef737",
    indexName: "strict-lang",
    algoliaOptions: {}
  },
  headerLinks: [
    { search: true },
    { doc: "Overview", label: "Docs" },
    { doc: "Keywords", label: "API" },
    { blog: true, label: "Blog" }
  ],
  headerIcon: "img/StrictLogoWhite64x64.png",
  footerIcon: "img/StrictLogoBlue128x128.png",
  favicon: "img/favicon.ico",
  colors: {
    primaryColor: "#52A0C6",
    secondaryColor: "#21434C"
  },
  fonts: {
    myFont: ["Verdana", "Serif"]
  },
  copyright: `Copyright © ${new Date().getFullYear()} strict-lang`,
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "default"
  },
  scripts: ["https://buttons.github.io/buttons.js"],
  onPageNav: "separate",
  cleanUrl: true,
  enableUpdateBy: true,
  enableUpdateTime: true,
  repoUrl: "https://github.com/strict-lang/strict.dev"
};

module.exports = siteConfig;
