import kebabCase from 'lodash.kebabcase';
import capitalize from 'lodash.capitalize';

const spotMap: Record<string, Record<string, string>> = {
  rhodeIsland: {
    '846': 'Second Beach',
    '907': 'First Beach',
    '377': 'Matunuck',
    '1103': 'Narragansett',
    '574': 'Ruggles',
    '2096': "Bailey's",
    '783': 'Misquamicut',
    '375': "Monahan's Dock",
    '376': 'Point Judith',
    '7911': 'Scarborough',
    '4058': 'Weekapaug',
  },
  hamptons: {
    '2160': 'Atlantic Terrace',
    '4875': 'Coopers Beach',
    '4224': 'Cupsogue',
    '2159': 'Ditch Plains',
    '4225': 'Flies',
    '379': 'Fortress',
    '4226': 'Georgica',
    '4877': 'Hither Hills State Park',
    '4874': 'K Road',
    '7646': 'Napeague Bay',
    '7916': 'Napeague Beach',
    '378': 'North Bar',
    '4878': 'Park Line',
    '2161': 'Turtle Cove',
    '4876': 'West Dune Road',
  },
  newYorkCity: {
    '4867': 'Breezy Point',
    '7947': 'Long Branch',
    '384': 'Rockaway',
    '383': 'Long Beach',
    '2162': 'Jones Beach State Park',
    '381': 'Robert Moses State Park',
  },
  newJersey: {
    '4050': 'Avon',
    '4055': 'Monmouth',
    '385': 'Sandy Hook',
    '857': 'Asbury Park',
    '7944': 'Bradley Beach',
    '3683': 'Belmar',
    '7941': 'Spring Lake',
  },
};

export default spotMap;

export const getLocations = (): Array<Record<string, string>> => {
  return Object.keys(spotMap).map((location) => ({
    [location]: titleizeLocation(location),
  }));
};

const titleizeLocation = (location: string): string =>
  kebabCase(location)
    .split('-')
    .map((locale) => capitalize(locale))
    .join(' ');
