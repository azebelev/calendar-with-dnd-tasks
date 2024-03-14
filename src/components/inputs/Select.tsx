import { useTheme } from 'styled-components';
import { SelectContainer, StyledSelect } from '../styled/SelectItems';

export interface Option {
  value: number | string;
  label: string;
}

interface CustomSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

export const Select: React.FC<CustomSelectProps> = ({ options, ...props }) => {
  const { palette } = useTheme();
  return (
    <SelectContainer>
      <StyledSelect {...props}>
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </SelectContainer>
  );
};
