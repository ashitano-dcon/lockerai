import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { FaCircleUser } from 'react-icons/fa6';

type UserAvatarPlaceholderIconProps = Omit<ComponentPropsWithoutRef<'svg'>, 'children'>;

export const UserAvatarPlaceholderIcon = ({ ...props }: UserAvatarPlaceholderIconProps): ReactNode => <FaCircleUser {...props} />;
