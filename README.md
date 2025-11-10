# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

# Local Run

## Clone the repo

1. Clone the repository:

   ```terminal
   git clone https://github.com/megacodist/abali.git abali
   ```

   This creates `abali` folder in the current folder and clones the remote repository into it.

## Configure the development environment

1. Update `npm`:

    ```terminal
    npm update -g npm
    ```

3. Enable `corepack`: In Windows, you may need to use an elevated (administrator) terminal.

    ```terminal
    corepack enable
    ```

3. Prepare the package manager: This step is highly recommended.

    ```terminal
    corepack prepare yarn@4.11.0 --activate
    ```

4. Install dependencies:

    ```terminal
    yarn install --immutable
    ```


## Run the Development Server

In the build command in Cloudflare Pages, write this:

```terminal
corepack enable && corepack prepare yarn@4.11.0 --activate && yarn install --immutable && yarn build
```

This command starts a local development server, opens up a browser window and is accessible at `localhost:3000`. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build/` directory and can be served using any static contents hosting service. It is highly recommended to run this command locally to fix errors before Cloudflare Pages reports them.

# Deployment

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

# Make a "reproducible" Git commit

1. **Run `yarn install` (without `--immutable`)**

    Lets Yarn freely update `yarn.lock` and any internal files under `.yarn/` (e.g. `.yarn/install-state.gz` or `.yarn/plugins`).

    This captures the current dependency graph for your project and locks exact versions.

    👉 Result: you get the most up-to-date, internally consistent dependency snapshot.

2. **Stage & commit all files Yarn modified**

    Typical ones include:

    * `yarn.lock`
    * `.yarn/install-state.gz`
    * `.yarn/plugins/*`
    * `.yarn/patches/*`

    (You usually don’t commit `.yarn/cache/` unless you want a “zero-install” repo.)

    👉 Result: anyone cloning the repo (or CI) will have exactly the same dependency map and Yarn metadata.

3. **Verify with `yarn install --immutable`**

    This command refuses to change `yarn.lock` or any required Yarn files.

    If it finishes without error, your committed state is reproducible:
    every environment using the same Node + Yarn version will resolve identical packages.

    👉 Result: deterministic installs for you, collaborators, and CI (Cloudflare Pages in your case).
