import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { RxCross2 } from 'react-icons/rx';

type CrossIconProps = Omit<ComponentPropsWithoutRef<'svg'>, 'children'>;

export const CrossIcon = ({ ...props }: CrossIconProps): ReactNode => <RxCross2 {...props} />;
