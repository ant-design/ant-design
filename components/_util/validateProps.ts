import { tuple } from './type';

const ValidateStatuses = tuple('success', 'warning', 'error', 'validating', '');
export type ValidateStatus = typeof ValidateStatuses[number];

export type ValidateProps = {
  validateStatus?: ValidateStatus;
  hasFeedback?: boolean;
};
