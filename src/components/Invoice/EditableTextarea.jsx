import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const EditableTextarea = ({ placeholder, value, onChange, rows }) => {
  return (
    <TextareaAutosize
      style={{ width: '100%' }}
      minRows={rows || 1}
      placeholder={placeholder || ''}
      value={value || ''}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
    />
  );
};

export default EditableTextarea;
