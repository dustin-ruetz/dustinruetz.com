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

[mkcert]: https://github.com/FiloSottile/mkcert/
[npm]: https://www.npmjs.com/get-npm/
[nodejs]: https://nodejs.org/en/download/
