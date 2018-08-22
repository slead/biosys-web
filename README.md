# Biosys Client

## Installation

The Biosys Client is build on AngularJS. To use the commands below, you need to globally install Angular-CLI:

```bash
npm install -g @angular/cli
```

This project contains submodules. To clone both the project and submodules, use:

```bash
git clone --recurse-submodules https://github.com/gaiaresources/koala-watch
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

The build artifacts will be stored in the `dist/` directory.

### Build for production

To build the project for production, use: 

```bash
ng build --configuration=dbca-prod --prod
 ```

The build artifacts will be stored in the `dist/` directory.

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
