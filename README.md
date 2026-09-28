# TempestVideo JavaScript SDK

A TypeScript/JavaScript client for the public TempestVideo API. It uses
`fetch`, so it runs in browsers and Node 18+.

```ts
import { createTempestClient } from "@tempestvideo/sdk"

const tempest = createTempestClient({ apiKey: process.env.TEMPESTVIDEO_API_KEY! })
const { installations } = await tempest.installations.listInstallations({})
```

Create an API key in the TempestVideo dashboard (account menu → API Keys). A
key acts as you, with your access. `baseUrl` points the client at another
environment.

## Branches

- `main` follows the production API.
- `development` follows the dev API (`https://api.dev.tempestvideo.net`) and
  may change at any time.

`src/gen/` is generated from the public API definition
(`tempestvideo/v1/api.proto` in the protocol repository) and updated
automatically. Don't edit it by hand; `src/index.ts` and this README are
maintained here.
