import React from 'react';
import { Input } from '../styled/Input';
import { InputLabel } from '../styled/InputLabel';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const InputField = ({ label, error, ...props }: InputProps) => {
  return (
    <div style={{ width: '100%' }}>
      <InputLabel>{label}</InputLabel>
      <Input {...props} />
    </div>
  );
};
