const path = require('path');
describe('Geolocation Utility Tests', () => {
    const utilPath = path.join(__dirname,'../../geolocation-util/geolocation-util.js');

    it('should return correct info for a location', () => {
        cy.exec(`node ${utilPath} "Tampa, FL"`).then(result => {
            expect(result.stdout).to.include('City: Tampa');
            expect(result.stdout).to.include('State: Florida');
            expect(result.stdout).to.include('Country: US');
            expect(result.stdout).to.include('Latitude: 27.9477595');
            expect(result.stdout).to.include('Longitude: -82.458444');
        });
    });

    it('should return correct info for a zip code', () => {
        cy.exec(`node ${utilPath} "60510"`).then(result => {
            expect(result.stdout).to.include('Zip: 60510');
            expect(result.stdout).to.include('City: Batavia');
            expect(result.stdout).to.include('Latitude: 41.8482');
            expect(result.stdout).to.include('Longitude: -88.3098');
        });
    });

    it('should handle multiple locations', () => {
        cy.exec(`node ${utilPath} "Aurora, IL" "44444"`).then(result => {
            expect(result.stdout).to.include('City: Aurora');
            expect(result.stdout).to.include('State: Illinois');
            expect(result.stdout).to.include('Country: US');
            expect(result.stdout).to.include('Latitude: 41.7571701');
            expect(result.stdout).to.include('Longitude: -88.3147539');

            expect(result.stdout).to.include('Zip: 44444');
            expect(result.stdout).to.include('City: Newton Falls');
            expect(result.stdout).to.include('Latitude: 41.191');
            expect(result.stdout).to.include('Longitude: -80.9701');
        });
    });

    it('should handle invalid city and state', () => {
        cy.exec(`node ${utilPath} "XXXXX, XX"`).then(result => {
            expect(result.stdout).to.include('No results found for city');
        });
    });

    it('should handle invalid zip code', () => {
        cy.exec(`node ${utilPath} "99999"`).then(result => {
            expect(result.stdout).to.include('No results found for zip');
        });
    });

    it('should handle empty input', () => {
        cy.exec(`node ${utilPath} ""`).then(result => {
            expect(result.stdout).to.include('Invalid city/state/zip format');
        });
    });

    it('should handle multiple city/state locations with one valid and one invalid', () => {
        cy.exec(`node ${utilPath} "Madison, WI" "XXXXX, XX"`).then(result => {
            expect(result.stdout).to.include('City: Madison');
            expect(result.stdout).to.include('State: Wisconsin');
            expect(result.stdout).to.include('Country: US');
            expect(result.stdout).to.include('Latitude');
            expect(result.stdout).to.include('Longitude');

            expect(result.stdout).to.include('No results found for city');
        });
    });

    it('should handle multiple zip codes with one valid and one invalid', () => {
        cy.exec(`node ${utilPath} "60510" "00000"`).then(result => {
            expect(result.stdout).to.include('Zip: 60510');
            expect(result.stdout).to.include('City: Batavia');
            expect(result.stdout).to.include('Latitude');
            expect(result.stdout).to.include('Longitude');

            expect(result.stdout).to.include('No results found for zip');
        });
    });
});
