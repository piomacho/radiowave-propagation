import { createStore } from 'react-hooks-global-state';


const initialState = {
    station: {value: '', label: ''},
    adapter: {value: '', label: '', dlugosc: '', szerokosc: '', wys_npm: undefined, antena_npt: undefined, czestotliwosc: '', erp: '', polaryzacja: '', id_antena: '', id_nadajnik: '', id_program: '', _mapahash: ''},
    gmapsCoordinates: [],
    corners: {
        maxLongMaxLat: {
            lat: null,
            lng: null
        },
        minLongMaxLat: {
            lat: null,
            lng: null
        },
        maxLongMinLat: {
            lat: null,
            lng: null
        },
        minLongMinLat: {
            lat: null,
            lng: null
        }
    },
    zoom: 9,
    coordinates: {elevations: [], distances: []}, trialCoords: [], elevationResults: []};


// router dom issue
  //@ts-ignore
const store = createStore(null, initialState);

export default store;
