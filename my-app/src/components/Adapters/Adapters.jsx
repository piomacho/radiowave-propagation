import React from 'react';
import { callApiFetch } from '../../common/global';
import SelectBox from '../SelectBox/SelectBox';
import store from "../../Store/Store";
import Loader from 'react-loader-spinner'
import { SelectContainer, LoaderContainer } from './Adapters.style';


const setParameters = (adapters) => {
    return adapters.map((adapter) => {
        return {
          value: adapter.id_obiekt,
          label: adapter.obiekt,
          szerokosc: adapter.szerokosc,
          dlugosc: adapter.dlugosc,
          wys_npm: adapter.wys_npm,
          erp: adapter.erp,
          polaryzacja: adapter.polaryzacja,
          antena_npt: adapter.antena_npt,
          czestotliwosc: adapter.czestotliwosc,
          id_antena: adapter.id_antena,
          id_nadajnik: adapter.id_nadajnik,
          id_program: adapter.id_program,
          _mapahash: adapter._mapahash
        }
    });
}

const Adapters = () => {
    const { useGlobalState } = store;
    const [station] = useGlobalState('station');
    const [adapter, setAdapter] = useGlobalState('adapter');
    const [ adapters, setAdapters ] = React.useState([{value: '', label: ''}]);
    const [ loading, setLoading ] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        callApiFetch(`api/adapters/all/${station.value}`)
        .then(response =>  setParameters(response))
        .then(adapters =>  {
          setAdapters(adapters);
          if(adapters.length > 0) {
            setAdapter(adapters[0]);
          }
          setLoading(false) })
        .catch(err => console.log(err));
      }, [station])

    const sortedAdapers = adapters.sort((a, b) => a.label.localeCompare(b.label));
    return (

    <SelectContainer>
      {loading ? <LoaderContainer><Loader type="Circles" color="#22a6b3" height={40} width={40}/></LoaderContainer>:
      <SelectBox
        options={sortedAdapers}
        setSelectedOption={setAdapter}
        selectedValue={adapter}
      />}
    </SelectContainer>
    );

}

export default Adapters;