import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled MUI Button with Blue Gradient
const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', // blue gradient
  color: '#fff',
  padding: '8px 16px',
  borderRadius: '8px',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  textTransform: 'none',
  fontWeight: 500,
  '&:hover': {
    background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)', // darker on hover
  },
}));

// Props extended from MUI ButtonProps for flexibility
interface CommonButtonProps extends ButtonProps {
  label: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({ label, ...props }) => {
  return <GradientButton {...props}>{label}</GradientButton>;
};

export default CommonButton;