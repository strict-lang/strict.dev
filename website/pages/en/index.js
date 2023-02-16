/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = props => (
      <h2 className="projectTitle">
        {props.title}
        <small>{props.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          {/* <ProjectTitle tagline={siteConfig.tagline} title={siteConfig.title} /> */}
          <img src="/img/StrictBanner.png" alt={siteConfig.title} />
          <MarkdownBlock>{siteConfig.tagline}</MarkdownBlock>
          <PromoSection>
            <Button href="https://github.com/strict-lang/strict">
              Try It Out
            </Button>
            <Button href="https://github.com/strict-lang/strict-vscode-client">
              IDE
            </Button>
            <Button href="">
              Packages
            </Button>
            <Button href="https://github.com/strict-lang/sdk">SDK</Button>
            <Button href="">
              Strict VM
            </Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl } = siteConfig;

    const Block = props => (
      <Container
        padding={["bottom", "top"]}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{ textAlign: "center" }}
      >
        <h2>Feature Callout</h2>
        <MarkdownBlock>These are features of this project</MarkdownBlock>
      </div>
    );

    const Layers = () => {
      return (
        <div
          className="productShowcaseSection"
          style={{
            paddingTop: "30px",
            paddingBottom: "30px",
            background: "#f7f7f7"
          }}
        >
          <img src="img/StrictLayers.svg" width="1280px" />
        </div>
      );
    };

    const LearnHow = () => (
      <Block>
        {[
          {
            content:
              "Strict is a simple to understand programming language that not only humans can read and understand, but also computer AI is able to read, modify and write. It has backends for many common frameworks like JDK, .NET and allows you to generate C++, C#, Java, etc. code or run in its own VM.",
            image: `${baseUrl}img/StrictLogoBlue256x256.png`,
            imageAlign: "right",
            title: "Strict is a language computers can understand"
          }
        ]}
      </Block>
    );

    const TryOut = () => (
      <Block id="try">
        {[
          {
            content:
              "To make your landing page more attractive, use illustrations! Check out " +
              "[**unDraw**](https://undraw.co/) which provides you with customizable illustrations which are free to use. " +
              "The illustrations you see on this page are from unDraw.",
            image: `${baseUrl}img/undraw_code_review.svg`,
            imageAlign: "left",
            title: "Wonderful SVG Illustrations"
          }
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              "This is another description of how this project is useful",
            image: `${baseUrl}img/undraw_note_list.svg`,
            imageAlign: "right",
            title: "Description"
          }
        ]}
      </Block>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Layers />
          <LearnHow />
        </div>
      </div>
    );
  }
}

module.exports = Index;
