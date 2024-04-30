# Easy Contentful migration sample

- Clone .env.example to .env and fill it with your credentials
- Edit migrate.js or index.js to your liking
    - migrate.js do not provide autocomplete and it's simpler
    - index.js provides autocomplete and gives more control
    - cma.js if your case is not covered by Contentful migrations
- Run `npm install`
- if you edited `migrate.js` run
    ```sh
    sh migrate.sh
    ```
- if you edited `index.js` run
    ```sh
    npn run
    ```
- if you edited `cma.js` run
    ```sh
    sh cma.sh
    ```
