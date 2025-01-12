import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { FcGoogle } from 'react-icons/fc';

type GoogleIconProps = Omit<ComponentPropsWithoutRef<'svg'>, 'children'>;

export const GoogleIcon = ({ ...props }: GoogleIconProps): ReactNode => <FcGoogle {...props} />;
