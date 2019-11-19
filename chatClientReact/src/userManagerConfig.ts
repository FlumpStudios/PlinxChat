import { UserManagerSettings } from 'oidc-client';
import  appSettings  from './appSettings';

export const userManagerConfig: UserManagerSettings = {
  client_id: 'dealLogReactClient',
  redirect_uri: `${appSettings.clientDomain}/callback`,
  response_type: 'token id_token',
  scope:"openid profile",
  authority: appSettings.authorityDomain,
  silent_redirect_uri:  `${appSettings.clientDomain}/silent_renew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  monitorSession: true
};