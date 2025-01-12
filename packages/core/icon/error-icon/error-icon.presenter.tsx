import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';

type ErrorIconProps = Omit<ComponentPropsWithoutRef<'svg'>, 'children'>;

export const ErrorIcon = ({ ...props }: ErrorIconProps): ReactNode => <RiErrorWarningFill {...props} />;
