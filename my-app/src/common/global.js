import { CoordinatesType } from "../Store/Store";

export const callApiFetch = async (api, params) => {
    const response = await fetch(api, params);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
};


export const generateTrialCoordinates = (x0, y0, range) => {
     const cArray  = [];

     for(let x = 0; x < range/2; x++ ) {
       for(let y = 0; y < range/2; y++) {
         cArray.push({latitude: Math.round(((x0 + 0.001 * x) + Number.EPSILON) * 1000) / 1000, longitude: Math.round(((y0 + 0.001 * y) + Number.EPSILON) * 1000) / 1000 })
       }
     }


     for(let x = 0; x < range/2; x++ ) {
      for(let y = 0; y < range/2; y++) {
        cArray.push({latitude: Math.round(((x0 - 0.001 * x) + Number.EPSILON) * 1000) / 1000, longitude: Math.round(((y0 + 0.001 * y) + Number.EPSILON) * 1000) / 1000 })
      }
    }

    for(let x = 0; x < range/2; x++ ) {
      for(let y = 0; y < range/2; y++) {
        cArray.push({latitude: Math.round(((x0 - 0.001 * x) + Number.EPSILON) * 1000) / 1000, longitude: Math.round(((y0 - 0.001 * y) + Number.EPSILON) * 1000) / 1000 })
      }
    }


    for(let x = 0; x < range/2; x++ ) {
      for(let y = 0; y < range/2; y++) {
        cArray.push({latitude: Math.round(((x0 + 0.001 * x) + Number.EPSILON) * 1000) / 1000, longitude: Math.round(((y0 - 0.001 * y) + Number.EPSILON) * 1000) / 1000 })
      }
    }

     return cArray;
   }

const degrees_to_radians = (degrees) =>
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

export const measureDistance = (lat1 , lon1, lat2 , lon2) => {
  const R = 6371e3; // metres
  const q1 = degrees_to_radians(lat1);
  const q2 = degrees_to_radians(lat2);
  const dq = degrees_to_radians(lat2-lat1);
  const da = degrees_to_radians(lon2-lon1);

  const a = Math.sin(dq/2) * Math.sin(dq/2) +
          Math.cos(q1) * Math.cos(q2) *
          Math.sin(da/2) * Math.sin(da/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c;

  return d / 1000;
}


export const lineFromPoints = (P, Q, ) =>
{
    const a = Q.y - P.y;
    const b = P.x - Q.x;

    const slope = (Q.y - P.y) / (Q.x - P.x);


    const c =  a*(P.x) + b*(P.y);

    return {intercept: c/b ,direction: slope}
}


export const getCorners = async(results) => {
  const grouped = sortAndGroupResultElements(results);
  const keysOfGroupedArray = Object.keys(grouped).map((item) =>  Number(item));
  const minLat = Math.min(...keysOfGroupedArray);
  const maxLat = Math.max(...keysOfGroupedArray);

  const maxLongMaxLat = maxLat && grouped[`${maxLat}`] && grouped[`${maxLat}`].slice(-1)[0].longitude;
  const minLongMaxLat = maxLat && grouped[`${maxLat}`] && grouped[`${maxLat}`][0].longitude;

  const maxLongMinLat = minLat && grouped[`${minLat}`] && grouped[`${minLat}`].slice(-1)[0].longitude;
  const minLongMinLat = minLat && grouped[`${minLat}`] && grouped[`${minLat}`][0].longitude;
  return {
      maxLongMaxLat: {
          lat: maxLat,
          lng: maxLongMaxLat
      },
      minLongMaxLat: {
          lat: maxLat,
          lng: minLongMaxLat
      },
      maxLongMinLat: {
          lat: minLat,
          lng: maxLongMinLat
      },
      minLongMinLat: {
          lat: minLat,
          lng: minLongMinLat
      }
  }

}
const sortAndGroupResultElements = (results) => {
  //@ts-ignore
  return results.sort((a, b) => {
         if (a.latitude === b.latitude) {
            // Price is only important when cities are the same
            return a.longitude - b.longitude ;
         }

         return a.latitude > b.latitude ? -1 : 1;
      }).reduce((r, a) => {
          //@ts-ignore
          r[a.latitude] = [...r[a.latitude] || [], a !== undefined && a];
          return r;
         }, {});
}
