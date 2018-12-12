# Biosys Web

## Requirements

* nodejs v8.11.4 or later

## Installation

The Biosys Client is build on Angular. To use the commands below, you need to globally install Angular-CLI:

```bash
npm install -g @angular/cli
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
ng serve
``` 

Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

## DBCA Builds

### Build for UAT

To build the project for UAT, use: 

```bash
ng build --configuration=dbca-uat --prod
 ```

The build artifacts will be stored in the `dist/` directory, which are then to be copied to your UAT server.

### Build for production

To build the project for production, use: 

```bash
ng build --configuration=dbca-prod --prod
 ```

The build artifacts will be stored in the `dist/` directory, which are then to be copied to your production server.

## Running unit tests

To execute the unit tests via [Karma](https://karma-runner.github.io), use:

```bash
ng test
```

## Running end-to-end tests

To execute the end-to-end tests via [Protractor](http://www.protractortest.org/), use:

```bash
ng e2e
```

Before running the tests make sure you are serving the app via:
 
```bash 
ng serve
```

## Further help

To get more help on the Angular CLI use:

```bash
ng help
```

Alternatively read the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Deployments
####  Staging (EC2 instance)
```bash
npm run build -- --configuration=staging --prod
scp -rp ./dist/biosys-web/* staging-biosys:/srv/sites/biosys/biosys-web/
```

### OEH UAT (S3 bucket)
assumes that you have aws cli installed and that you have a aws profile called oeh.
```bash
npm run build -- --configuration=oeh-uat --prod
aws --profile oeh s3 cp ./dist/biosys-web s3://uat-koalawatch.gaiaresources.com.au --region ap-southeast-2 --recursive
```
