const siteConfig = {
  title: "Strict Programming Language", 
  tagline: "Write good code (fast)",
  cname: "strict.dev",
  url: "https://strict.dev",
  baseUrl: "/",
  projectName: "strict.dev",
  organizationName: "strict-lang",
  algolia: {
    apiKey: "7f6e29123c9235b4420f116e437ef737",
    indexName: "strict-lang",
    algoliaOptions: {} // Optional, if provided by Algolia
  },
  headerLinks: [
    { search: true },
    { doc: "overview", label: "Docs" },
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
  copyright: `Copyright © ${new Date().getFullYear()} The Strict contributors`,
  highlight: {
    theme: "androidstudio"
  },
  scripts: ["https://buttons.github.io/buttons.js"],
  onPageNav: "separate",
  cleanUrl: true,
  enableUpdateBy: true,
  enableUpdateTime: true,
  repoUrl: "https://github.com/strict-lang/strict.dev"
};

module.exports = siteConfig;