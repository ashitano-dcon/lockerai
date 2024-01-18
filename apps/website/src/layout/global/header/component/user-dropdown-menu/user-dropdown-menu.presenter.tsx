'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@lockerai/core/component/dropdown-menu';
import { Image } from '@lockerai/core/component/image';
import { Link } from '@lockerai/core/component/link';
import { Tag } from '@lockerai/core/component/tag';
import { DashboardIcon } from '@lockerai/core/icon/dashboard-icon';
import { ExternalLinkIcon } from '@lockerai/core/icon/external-link-icon';
import { FigmaIcon } from '@lockerai/core/icon/figma-icon';
import { GithubIcon } from '@lockerai/core/icon/github-icon';
import { SearchIcon } from '@lockerai/core/icon/search-icon';
import { SignOutIcon } from '@lockerai/core/icon/sign-out-icon';
import { UploadIcon } from '@lockerai/core/icon/upload-icon';
import { cn } from '@lockerai/tailwind';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { User } from '#website/common/model/user';

type UserDropdownMenuProps = Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'className'> & {
  user: User;
  signOut: () => Promise<void>;
};

export const UserDropdownMenu = ({ user, signOut, ...props }: UserDropdownMenuProps): ReactNode => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="relative h-10 w-10 rounded-full drop-shadow-md" {...props}>
        <Image
          aria-hidden
          src={user.avatarUrl}
          alt=""
          width={40}
          height={40}
          skeleton={{
            className: cn('absolute inset-0 overflow-visible before:hidden'),
          }}
          className="absolute inset-0 h-full w-full rounded-full blur-sm"
        />
        <Image
          src={user.avatarUrl}
          alt="Your avatar image."
          width={40}
          height={40}
          skeleton={{
            className: 'rounded-full',
          }}
          className="h-10 w-10"
        />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel className="flex items-center gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-base font-bold text-sage-12">{user.name}</p>
          <p className="text-sm text-sage-11">{user.email}</p>
        </div>
        {user.lostAndFoundState !== 'NONE' ? (
          <Tag variant={{ color: user.lostAndFoundState === 'DELIVERING' ? 'purple' : 'cyan' }}>{user.lostAndFoundState.toLowerCase()}</Tag>
        ) : null}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <DashboardIcon className="h-4 w-4 fill-sage-11 transition group-hover:fill-sage-12" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/search">
            <SearchIcon className="h-4 w-4 fill-sage-11 transition group-hover:fill-sage-12" />
            Search lost item
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/report">
            <UploadIcon className="h-4 w-4 stroke-sage-11 transition group-hover:stroke-sage-12" />
            Report dropped lost item
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="https://github.com/nitic-pbl-p8/lockerai" external>
            <GithubIcon className="h-4 w-4 fill-sage-11 transition group-hover:fill-sage-12" />
            GitHub
            <ExternalLinkIcon className="ml-auto h-4 w-4 stroke-sage-11 transition group-hover:stroke-sage-12" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="https://www.figma.com/file/xNKAhniAfPPTsL987xRCVe/website?type=design&node-id=20%3A35&mode=design&t=oAlQP6Jqqk0ZcqOy-1"
            external
          >
            <FigmaIcon className="h-4 w-4 fill-sage-11 transition group-hover:fill-sage-12" />
            Figma
            <ExternalLinkIcon className="ml-auto h-4 w-4 stroke-sage-11 transition group-hover:stroke-sage-12" />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <button
          onClick={async () => {
            await signOut();
          }}
        >
          <SignOutIcon className="h-4 w-4 stroke-sage-11 transition group-hover:stroke-sage-12" />
          Sign out
        </button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
