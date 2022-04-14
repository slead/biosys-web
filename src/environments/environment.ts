// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    server: 'http://test-biosys-nsw.eba-x46ymxtj.ap-southeast-2.elasticbeanstalk.com',
    apiExtension: '/api/',
    adminOnly: false,  // special case/hack, if true prevents anyone except admin and data-engineer to access the app after login.
};
