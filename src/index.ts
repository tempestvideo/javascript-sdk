import { createClient, type Client, type Interceptor } from "@connectrpc/connect"
import { createConnectTransport } from "@connectrpc/connect-web"

import {
  ApiKeysService,
  ChannelsService,
  ConnectorsService,
  DevicesService,
  InstallationsService,
  MembersService,
  ProfileService,
  TenantsService,
} from "./gen/tempestvideo/v1/api_pb.js"

// Request and response types, enums and service definitions.
export * from "./gen/tempestvideo/v1/api_pb.js"

/** The production API. */
export const DEFAULT_BASE_URL = "https://api.tempestvideo.net"

export type TempestClientOptions = {
  /** Create one in the dashboard (account menu, API Keys). It acts as you. */
  apiKey: string
  /** Another environment, e.g. https://api.dev.tempestvideo.net. */
  baseUrl?: string
  /** Extra interceptors, run after the one that adds the API key. */
  interceptors?: Interceptor[]
}

/** One client per API service. */
export type TempestClient = {
  profile: Client<typeof ProfileService>
  tenants: Client<typeof TenantsService>
  installations: Client<typeof InstallationsService>
  members: Client<typeof MembersService>
  connectors: Client<typeof ConnectorsService>
  channels: Client<typeof ChannelsService>
  devices: Client<typeof DevicesService>
  apiKeys: Client<typeof ApiKeysService>
}

/**
 * A client for the TempestVideo API. Uses fetch, so it runs in browsers and
 * Node 18+.
 *
 *   const tempest = createTempestClient({ apiKey: process.env.TEMPESTVIDEO_API_KEY! })
 *   const { installations } = await tempest.installations.listInstallations({})
 */
export function createTempestClient(options: TempestClientOptions): TempestClient {
  const auth: Interceptor = (next) => (req) => {
    req.header.set("Authorization", `Bearer ${options.apiKey}`)
    return next(req)
  }
  const transport = createConnectTransport({
    baseUrl: options.baseUrl ?? DEFAULT_BASE_URL,
    interceptors: [auth, ...(options.interceptors ?? [])],
  })
  return {
    profile: createClient(ProfileService, transport),
    tenants: createClient(TenantsService, transport),
    installations: createClient(InstallationsService, transport),
    members: createClient(MembersService, transport),
    connectors: createClient(ConnectorsService, transport),
    channels: createClient(ChannelsService, transport),
    devices: createClient(DevicesService, transport),
    apiKeys: createClient(ApiKeysService, transport),
  }
}
