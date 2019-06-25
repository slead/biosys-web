# Biosys Web

## Requirements

* nodejs v8.11.4 or later

## Installation

The Biosys Client is build on Angular. To use the commands below, you need to globally install Angular-CLI v6.
Note: the use installation of the angular CLI is not mandatory. All the ng CLI command can be done through npm commands.
Optional
```bash
npm install -g @angular/cli@6.1.4
```

This project contains submodules. To clone both the project and submodules, use:

```bash
git clone --recurse-submodules https://github.com/gaiaresources/biosys-web
```

**Note:** If you already have the project cloned and are updating to the latest version, you'll also need to update the submodules. Use:

```bash
git pull
git submodule update --remote --recursive
```

Then install dependant packages:

```bash
npm install
```

## Development server

To run a development server, use: 

```bash
npm start
``` 

Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

## DBCA Builds

### Build for UAT

To build the project for UAT, use: 

```bash
npm run build -- --configuration=dbca-uat --prod
 ```

The build artifacts will be stored in the `dist/` directory, which are then to be copied to your UAT server.

### Build for production

To build the project for production (DBCA for example), use: 

```bash
npm run build -- --configuration=dbca-prod --prod
 ```

The build artifacts will be stored in the `dist/` directory, which are then to be copied to your production server.

## Running unit tests

To execute the unit tests via [Karma](https://karma-runner.github.io), use:

```bash
npm run test
```

## Running end-to-end tests

To execute the end-to-end tests via [Protractor](http://www.protractortest.org/), use:

```bash
npm run e2e
```

Before running the tests make sure you are serving the app via:
 
```bash 
npm start
```

Any other ng command can be issued through npm with:
```
npm run ng -- [ng-params]

## Further help

Ex: to get more help on the Angular CLI use:

```bash
npm run ng -- help
```

Alternatively read the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Deployments
####  Gaia Staging (EC2 instance: https://staging.gaiaresources.com.au))
assumes you have a ssh config name staging-biosys
```bash
npm run build -- --configuration=staging --prod
scp -rp ./dist/biosys-web/* staging-biosys:/srv/sites/biosys/biosys-web/
```

### OEH Koala Watch UAT (S3 bucket: https://uat-koalawatch.gaiaresources.com.au )
assumes that you have aws cli installed and that you have an aws profile called oeh.
```bash
npm run build -- --configuration=oeh-uat --prod
aws --profile oeh s3 cp ./dist/biosys-web s3://uat-koalawatch.gaiaresources.com.au --region ap-southeast-2 --recursive
```

### OEH Koala Watch PROD (S3 bucket: https://koalawatch.gaiaresources.com.au )
assumes that you have aws cli installed and that you have an aws profile called oeh.
```bash
npm run build -- --configuration=oeh-prod --prod
aws --profile oeh s3 cp ./dist/biosys-web s3://koalawatch.gaiaresources.com.au --region ap-southeast-2 --recursive
```

### OEH Mount Kaputar Snails and Slug UAT (S3 bucket: https://uat-mksas.gaiaresources.com.au )
assumes that you have aws cli installed and that you have an aws profile called mksas.
```bash
npm run build -- --configuration=mksas-uat --prod
aws --profile mksas s3 cp ./dist/biosys-web s3://uat-mksas.gaiaresources.com.au --region ap-southeast-2 --recursive
```

### OEH Mount Kaputar Snails and Slug Prod (S3 bucket: https://mksas.gaiaresources.com.au )
assumes that you have aws cli installed and that you have an aws profile called mksas.
```bash
npm run build -- --configuration=mksas-prod --prod
aws --profile mksas s3 cp ./dist/biosys-web s3://mksas.gaiaresources.com.au --region ap-southeast-2 --recursive
```
