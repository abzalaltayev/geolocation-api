# Geolocation-API

## Overview

This utility allows users to fetch geographical coordinates (`latitude`, `longitude`) and place information (city, state, country) for a given city/state combination or a zip code using the **OpenWeather Geocoding API**. It can handle multiple location inputs and return the relevant information for each input.

The repository includes:

- **Utility**: A command-line utility to fetch coordinates.
- **Tests**: Cypress integration tests for verifying the correctness of the utility.
- **Configuration**: A `config.js` file for managing API keys and URLs.

## Prerequisites

To run the utility and tests, you need the following installed:

- **Node.js** (v14 or above)
- **npm** (v6 or above)

## Setup

### Clone the repository:

```bash
git clone git@github.com:username/geolocation-api.git
cd geolocation-api
```
### Install dependencies:

```bash
npm install
```
### API Key:

The API key for OpenWeather is included in the `config.js` file. However, in a production setting, you would want to store this API key in environment variables or use a secret manager.

## Files Overview

- **`geolocation-util/geoloc-util.js`**: The main utility file that fetches coordinates for city/state and zip code inputs.
- **`config.js`**: Configuration file containing the API key and API endpoint URLs.
- **`cypress/integration/geolocation-util.spec.js`**: Cypress test file to validate the functionality of the geolocation utility.
- **`cypress.config.js`**: Cypress configuration file for setting up test patterns and environments.

## Running the Utility

The utility can be run from the command line. It accepts both zip codes and city/state combinations as input.

### Example Usage:

#### Single city/state input:

```bash
node geolocation-util/geoloc-util.js "Tampa, FL"
```
#### Single zip code input:
```bash
node geolocation-util/geoloc-util.js "60510"
```
#### Multiple location inputs:
```bash
node geolocation-util/geoloc-util.js "Aurora, IL" "44444"
```
### Expected Output:

For each location, the output will include:

- **City** name
- **State** name
- **Country** code
- **Latitude**
- **Longitude**

#### Example:

```bash
City: Tampa, State: Florida, Country: US, Latitude: 27.9477595, Longitude: -82.458444
Zip: 60510, City: Batavia, Latitude: 41.8482, Longitude: -88.3098
```
If the input is invalid, the utility will return an appropriate error message such as:

- `No results found for zip: XXXXX`
- `Invalid city/state/zip format`
## Run Cypress Tests:

### Install Cypress:
```bash
npm install cypress --save-dev
```
#### Open Cypress UI:

```bash
npx cypress open
```
#### Once Cypress is open, select the geolocation-util.spec.js file to run the tests.
#### Run Cypress in headless mode:
```bash
npx cypress run
```
