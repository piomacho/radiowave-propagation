import React, { useState, useEffect } from 'react';
import Select from 'react-select';


const SelectBox = ({ options, setSelectedOption, selectedValue }) => {

    useEffect(() => {
        setSelectedOption(selectedValue)
    }, []);

    return (
      <Select
        value={selectedValue.value ? selectedValue : options[0]}
        onChange={setSelectedOption}
        options={options}
      />
    );

}

export default SelectBox;