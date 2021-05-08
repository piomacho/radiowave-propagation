import React, { useState, useEffect } from 'react';
import { callApiFetch } from '../../common/global';
import SelectBox from '../SelectBox/SelectBox';
import store from '../../Store/Store';

const setParameters = (programs) => {
    return programs.map((program) => {
        return { value: program.id_program, label: program.nazwa}
    });
}

const Stations = () => {
  const { useGlobalState } = store;
  const [station, setStation] = useGlobalState('station');
  const [ stations, setStations ] = useState([{value: '', label: ''}]);
  const sortedStations = stations.sort((a, b) => a.label.localeCompare(b.label));

    useEffect(() => {
        callApiFetch('api/stations/all')
        .then(response =>  setParameters(response))
        .then(programs =>  { setStations(programs); setStation(programs[0]); })
        .catch(err => console.log(err));
      }, [])


    return (
    stations &&
      <SelectBox
        options={sortedStations}
        setSelectedOption={setStation}
        selectedValue={station}
      />
    );

}

export default Stations;