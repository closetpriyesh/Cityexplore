// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseEmergencyUrl: 'http://prod-emergency.cityexploro.com/',
  baseDataEntryUrl: 'http://prod-dataentry.cityexploro.com/',
  baseSearchUrl: 'http://prod-search.cityexploro.com/',
  baseHealthUrl:'http://uat2-healthcare.cityexploro.com/',
  baseTransportUrl:'http://uat-transport.cityexploro.com/',
};
