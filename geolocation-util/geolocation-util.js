const axios = require('axios');
const { API_KEY, CITY_API_URL, ZIP_API_URL } = require('./config.js');

async function getCoordinatesByCity(city, state) {
    const country = 'US'; // limit the search to the United States
    try {
        const response = await axios.get(CITY_API_URL, {
            params: {
                q: `${city},${state},${country}`,
                limit: 1,
                appid: API_KEY
            }
        });

        const location = response.data[0];
        
        if (location) {
            const { name, lat, lon } = location;
            const stateCode = location.state;
            const countryCode = location.country;

            console.log(`City: ${name}, State: ${stateCode}, Country: ${countryCode}, Latitude: ${lat}, Longitude: ${lon}`);
        } else {
            console.log(`No results found for city: ${city}, state: ${state}, country: ${country}`);
        }
    } catch (error) {
        console.error(`Error fetching coordinates for ${city}, ${state}, ${country}:`, error.message);
    }
}

async function getCoordinatesByZip(zip) {
    try {
        const response = await axios.get(ZIP_API_URL, {
            params: {
                zip: `${zip},US`,
                appid: API_KEY
            }
        });

        const location = response.data;

        if (location && location.name && location.lat && location.lon) {
            const { name, lat, lon } = location;
            console.log(`Zip: ${zip}, City: ${name}, Latitude: ${lat}, Longitude: ${lon}`);
        } else {
            console.log(`No results found for zip: ${zip}`);
        }
    } catch (error) {
        console.error(`Error fetching coordinates for zip: ${zip}:`, error.message);
        console.log(`No results found for zip: ${zip}`);
    }
}


async function fetchLocations(locations) {
    const results = [];
    for (const loc of locations) {
        if (/^\d{5}$/.test(loc)) {  // check for zip code
            const result = await getCoordinatesByZip(loc);
            if (result) results.push(result);
        } else {
            const [city, state] = loc.split(',');
            if (city && state) {
                const result = await getCoordinatesByCity(city.trim(), state.trim());
                if (result) results.push(result);
            } else {
                console.log(`Invalid city/state/zip format: ${loc}`);
            }
        }
    }
    return results;
}

(async () => {
    const locations = process.argv.slice(2);
    if (locations.length === 0) {
        console.log('Please provide at least one location (City, State or Zip Code).');
        return;
    }

    const results = await fetchLocations(locations);
    results.forEach(result => {
        if (result.zip) {
            console.log(`Zip: ${result.zip}, City: ${result.city}, Latitude: ${result.lat}, Longitude: ${result.lon}`);
        } else {
            console.log(`City: ${result.city}, State: ${result.state}, Latitude: ${result.lat}, Longitude: ${result.lon}`);
        }
    });
})();
