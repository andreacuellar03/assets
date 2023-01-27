## **Perform the following before updating the config-es.json or confign.json files**

1. update config files
2. Go to `.github\workflows\main.yml`
3. update the value for your repository
   `repository: amanueltsfy@assets` to `repository: <username>@assets`
4. update `uses: amanueltsfy/assets@main` to `uses: <username>/assets@main`
5. create a PR to `Focusbear/assets`

&nbsp;

### .github\workflow\main.yml

```
name: 'Compare config files'

on:
  pull_request:
    branches:
      - main

jobs:
  Compare:
    name: Compare keys in config-es.json & config.json
    runs-on: windows-latest

    steps:
      - name: Checkout the repo
        uses: actions/checkout@v3
        with:
          repository: <username>/assets
          ref: main

      - name: Checking config keys
        uses: <username>/assets@main

```
