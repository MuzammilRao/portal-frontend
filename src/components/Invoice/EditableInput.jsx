import React, { FC } from 'react';
import { Text } from '@react-pdf/renderer';
import { Input } from '@chakra-ui/react';

const EditableInput = ({ placeholder, value, onChange, pdfMode }) => {
  return (
    <Input
      mb={1}
      type="text"
      placeholder={placeholder || ''}
      value={value || ''}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
    />
  );
};

export default EditableInput;
