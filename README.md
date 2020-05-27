# strict.dev
Strict Programming Language Website and Documentation hosted at https://strict.dev/

Made with https://docusaurus.io

to publish on github pages (npm also works, make sure to npm install first and run 'npm install --global docusaurus-init' if docusaurus commands are not available yet). Also set your github username as GIT_USER env, doesn't work very well with set in command line or powershell (docusaurus-publish script adds some space and git clone fails then, you can [also manually remove the space](https://github.com/facebook/docusaurus/issues/2258)). Also make sure not to use Node 12.17+, babel throws errors, stay on https://nodejs.org/download/release/v12.16.1/, and you will most likely encounter more issues like [Fatal: HttpRequestException](https://github.com/tschaub/gh-pages/issues/230), make sure you got at least git for windows 2.16, node and git is just such a mess on windows ..
```
cd websites
cmd /c "set CURRENT_BRANCH=master && set USE_SSH=true && yarn run publish-gh-pages"
```