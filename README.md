# strict.dev
Strict Programming Language Website and Documentation hosted at https://strict.dev/

Made with https://docusaurus.io

to publish on github pages (npm also works, make sure to npm install first and run 'npm install --global docusaurus-init' if docusaurus commands are not available yet). Also set your github username as GIT_USER env, doesn't work very well with set in command line or powershell (docusaurus-publish script adds some space and git clone fails then):
```
cd websites
cmd /c "set USE_SSH=true && yarn run publish-gh-pages"
```