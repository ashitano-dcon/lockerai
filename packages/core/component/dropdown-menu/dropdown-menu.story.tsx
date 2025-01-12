import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '#core/component/button';
import { DashboardIcon } from '#core/icon/dashboard-icon';
import { FigmaIcon } from '#core/icon/figma-icon';
import { GithubIcon } from '#core/icon/github-icon';
import { SearchIcon } from '#core/icon/search-icon';
import { DropdownMenuContent } from './dropdown-menu-content.presenter';
import { DropdownMenuGroup } from './dropdown-menu-group.presenter';
import { DropdownMenuItem } from './dropdown-menu-item.presenter';
import { DropdownMenuLabel } from './dropdown-menu-label.presenter';
import { DropdownMenuSeparator } from './dropdown-menu-separator.presenter';
import { DropdownMenuTrigger } from './dropdown-menu-trigger.presenter';
import { DropdownMenu } from './dropdown-menu.presenter';

type Story = StoryObj<typeof DropdownMenu>;

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  argTypes: {},
};

export default meta;

export const Default: Story = {
  render: ({ ...props }) => (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={{
            border: true,
            color: 'sage',
          }}
        >
          Open
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-6">
          <p className="text-base font-bold text-sage-12">John Doe</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <DashboardIcon className="h-4 w-4 fill-sage-11 transition group-hover:fill-sage-12" />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SearchIcon className="h-4 w-4 fill-sage-11 transition group-hover:fill-sage-12" />
            Search
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <GithubIcon className="h-4 w-4 fill-sage-11 transition group-hover:fill-sage-12" />
            GitHub
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FigmaIcon className="h-4 w-4 fill-sage-11 transition group-hover:fill-sage-12" />
            Figma
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
