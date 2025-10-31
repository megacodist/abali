# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/megacodist/abali.git
   ```

1. Update `npm`:
    ```bash
    npm update -g npm
    ```

2. Install or update to the lastest version of `yarn`:
    ```bash
    yarn global add yarn@latest
   ```

3. Install dependencies:
    ```bash
    yarn install
    ```


## Local Development

```bash
yarn start
```

This command starts a local development server, opens up a browser window and is accessible at `localhost:3000`. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.


# Project Organization

## Branching Strategy

This repository utilizes a dual-branch strategy to separate development from the stable, published version of the site.

*   ### `main`
    This is the **primary development branch**. All new content, incremental changes, typo fixes, and experimental features are committed here. It should be considered the "bleeding edge" and may contain work-in-progress.

    **All pull requests from contributors MUST be targeted at the `main` branch.**

*   ### `publish`
    This branch contains the **latest stable release**. It is the source of truth for the live, deployed website that readers see. This branch is only updated by merging from `main` when a new version of the documentation is considered complete, consistent, and ready for publication. Direct commits to this branch are forbidden.

---

**Summary:**
*   **Developers and Contributors:** Work on the `main` branch.
*   **Readers:** See the content deployed from the `publish` branch.
