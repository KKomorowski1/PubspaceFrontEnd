import {
  AuthServiceConfig,
  GoogleLoginProvider
} from 'angular5-social-login';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("809358122358-jn9ojomrpnk49qcbba16mp7cqujqnj8k.apps.googleusercontent.com")
  },
]);

export function provideConfig() {
  return config;
}
