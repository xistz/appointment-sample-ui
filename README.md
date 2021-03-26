# Appointment Sample UI

![Appointment Sample UI workflow](https://github.com/xistz/appointment-sample-ui/workflows/Appointment%20Sample%20UI%20workflow/badge.svg)

This repository contains code for the UI of the appointment sample service.

It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and relies on [Auth0](https://auth0.com/) for authorization and user management.

Appointment Sample can be accessed at <https://appointment-d8540.firebaseapp.com/>

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Required ENV variables

### `REACT_APP_AUTH0_DOMAIN`

Auth0 domain used for authorization. Excludes trailing slash and https protocol.

### `REACT_APP_AUTH0_CLIENT_ID`

Auth0 Client ID for a single page application.

### `REACT_APP_AUTH0_AUDIENCE`

Auth0 audience refers to the identifier of the API application (dummy URL, not the actual appointment sample API URL).

### `REACT_APP_AUTH0_NAMESPACE`

Auth0 namespace refers to the namespace (URL) used to define user roles for the appointment sample service.

## CI/CD

This repository is deployed using GitHub Actions to Firebase hosting.
