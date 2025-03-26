import React from 'react';
import Select from 'react-select';
import { Box, FormControl, FormLabel } from '@chakra-ui/react';

const CustomSelect = ({ label, options, onChange, value, placeholder, color = '#0D4C6D' }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,

      borderColor: '#CBD5E0',
      '&:hover': { borderColor: color, color: '#000' },
    }),
  };

  return (
    <Box w="100%" mr="30px">
      <FormControl my="10px">
        <FormLabel color={'black'}>{label}</FormLabel>
        <Select
          options={options}
          onChange={onChange}
          value={options.find((option) => option.value === value)}
          placeholder={placeholder}
          classNamePrefix="filter"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? '#CBD5E0' : '#0D4C6D',
              color: '#0D4C6D',
              opacity: 1,
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              color: '#0D4C6D',
            }),
          }}
        />
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
