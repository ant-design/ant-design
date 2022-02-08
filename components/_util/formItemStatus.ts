import React from 'react';
import { ValidateStatus } from '../form/FormItem';

export interface FormItemStatusContextProps {
  status?: ValidateStatus;
  hasFeedback?: boolean;
}

export const FormItemStatusContext = React.createContext<FormItemStatusContextProps>({});
