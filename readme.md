# dustinruetz.com

Dustin Ruetz's website.

<!-- START doctoc -->
<!-- END doctoc -->

## Installation

### Application

1. Prerequisite: Have [Node.js][nodejs] and [NPM][npm] installed.
1. Clone the repository.
1. From the root of the repo, run `npm install`.

### Use HTTPS in local development

1. Prerequisite: Have [mkcert][mkcert] installed.
1. From the root of the repo, run `mkdir ./ssl/ && mkcert -cert-file ./ssl/public.cert -key-file ./ssl/private.key development.dustinruetz.com` to generate a certificate and a key (note that the `./ssl/` directory is in `.gitignore` to keep these files out of version control).
1. Add the following line to your `hosts` file: `127.0.0.1 development.dustinruetz.com`

## Development

From the root of the repo use `npm run dev` to start the dev server with hot reloading.

## Build

From the root of the repo use `npm run build` to compile the site to the `./www/` output directory of static files.

## Hosting

The repo is configured so that the `gh-pages` branch is a Git worktree that tracks the `./www/` directory; GitHub Pages provides hosting of the site's files by sourcing this branch.

- [Using git worktree to deploy GitHub Pages][ghp-using-git-worktree]
- [Managing a custom domain for your GitHub Pages site][ghp-custom-domain] (especially the sections on [configuring a subdomain][ghp-configure-subdomain] and [configuring an apex domain][ghp-configure-apex-domain]).

**Note:** To enable secure redirects (from `http://` or the `www` subdomain to `https://`) it's important that the build script copy the CNAME text file (with a vaule of `www.dustinruetz.com`) to the root of the output directory.

[ghp-configure-apex-domain]: https://docs.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site/#configuring-an-apex-domain
[ghp-configure-subdomain]: https://docs.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site/#configuring-a-subdomain
[ghp-custom-domain]: https://docs.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site/
[ghp-using-git-worktree]: https://sangsoonam.github.io/2019/02/08/using-git-worktree-to-deploy-github-pages.html
[mkcert]: https://github.com/FiloSottile/mkcert/
[npm]: https://www.npmjs.com/get-npm/
[nodejs]: https://nodejs.org/en/download/
