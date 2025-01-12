import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { BsInfoCircleFill } from 'react-icons/bs';

type InformationIconProps = Omit<ComponentPropsWithoutRef<'svg'>, 'children'>;

export const InformationIcon = ({ ...props }: InformationIconProps): ReactNode => <BsInfoCircleFill {...props} />;
