# dustinruetz.com

Dustin Ruetz's website.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
  - [Application](#application)
  - [Use HTTPS in local development](#use-https-in-local-development)
- [Development](#development)
- [Build](#build)
- [Hosting and Deployment](#hosting-and-deployment)
  - [GitHub Pages/Git worktree](#github-pagesgit-worktree)
  - [Domain registrar DNS records](#domain-registrar-dns-records)
- [Notes](#notes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

### Application

1. Prerequisite: Have [Node.js][nodejs] and [NPM][npm] installed.
1. Clone the repository.
1. From the root of the repo, run: `npm install`.

### Use HTTPS in local development

1. Prerequisite: Have [mkcert][mkcert] installed.
2. From the root of the repo, run the following commands 1) to create the `./ssl/` directory, and 2) to generate certificate and key files for the local development domain. (ℹ️ Note: `./ssl/` is listed in `.gitignore` to keep these files out of version control.)

```
mkdir ./ssl/
mkcert -cert-file ./ssl/public.crt -key-file ./ssl/private.key development.dustinruetz.com
```

3. Add the following line to your `hosts` file:
   ```
   127.0.0.1 development.dustinruetz.com
   ```

## Development

From the root of the repo use `npm run dev` to start the development servers (i.e. local and network).

## Build

From the root of the repo use `npm run build` to compile the site to the `./www/` output directory of static files. (ℹ️ Note: `./www/` is listed in `.gitignore` to keep these files out of version control.)

## Hosting and Deployment

The repo is configured so that the `www` branch is a Git worktree that tracks the `./www/` directory; GitHub Pages hosts the site's files by sourcing from this branch. Continuous deployment/integration is handled by the [`build` GitHub Action][ga-build]; the site is compiled and deployed every time a commit is pushed to the `main` branch.

### GitHub Pages/Git worktree

- [Managing a custom domain for your GitHub Pages site][ghp-custom-domain] (especially the [configuring a subdomain][ghp-configure-subdomain] and [configuring an apex domain][ghp-configure-apex-domain] sections)
- ℹ️ Note: To enable secure redirects (from the apex domain with no protocol/subdomain/`http`/`http://www`/`www` to `https://www`) it's important that the build script copy the CNAME file (with a value of `www.dustinruetz.com`) to the root of the output directory.
- [Using git worktree to deploy GitHub Pages][ghp-using-git-worktree]

### Domain registrar DNS records

- Search "{name of domain registrar} DNS record types" for detailed documentation on how to configure the A and CNAME records.
- Configure four A records, one for each of GitHub Pages' four IP addresses; "host" is `@`, "value" is the IP address.
  - ℹ️ Note: An A record (Address record) associates an apex domain with an IPv4 address.
- Configure one CNAME record; "host" is `www`, "value" is `dustin-ruetz.github.io`.
  - ℹ️ Note: A trailing period (".") may be automatically appended to the CNAME domain value; this syntax is valid.

## Notes

- Attempting to `require()` a string variable causes Pug/Webpack to throw an error, but requiring a template literal (specifically a string literal containing an embedded expression) works. Example:
  - ❌ Doesn't work: `require(imageFilename)`
  - ✅ Does work: `` require(`./images/${imageFilename}`) ``
- Use the `!{variable}` syntax (i.e. the [Pug interpolation][pug-interpolation] feature) to buffer unescaped values into your template files. This is useful when combined with [Webpack's svg-inline-loader][webpack-svg-inline-loader] to output SVG code directly into the compiled HTML. Example:

```pug
- const icon = require('./icons/icon.svg')
//- this will output the icon.svg code as an <svg/> HTML element
figure
  | !{icon}
```

- Sass implementations don't provide URL rewriting, and [this issue also applies to Webpack's sass-loader][webpack-sass-loader-url-problems]. Use [Webpack's resolve-url-loader][webpack-resolve-url-loader] to solve this issue, which rewrites relative paths in `url()` statements relative to the original source file; this is useful when loading fonts via CSS.

[ga-build]: /.github/workflows/build.yaml
[ghp-configure-apex-domain]: https://docs.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site/#configuring-an-apex-domain
[ghp-configure-subdomain]: https://docs.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site/#configuring-a-subdomain
[ghp-custom-domain]: https://docs.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site/
[ghp-using-git-worktree]: https://sangsoonam.github.io/2019/02/08/using-git-worktree-to-deploy-github-pages.html
[mkcert]: https://github.com/FiloSottile/mkcert/
[npm]: https://www.npmjs.com/get-npm/
[nodejs]: https://nodejs.org/en/download/
[pug-interpolation]: https://pugjs.org/language/interpolation.html
[webpack-resolve-url-loader]: https://github.com/bholloway/resolve-url-loader/
[webpack-sass-loader-url-problems]: https://webpack.js.org/loaders/sass-loader/#problems-with-url
[webpack-svg-inline-loader]: https://webpack.js.org/loaders/svg-inline-loader/
