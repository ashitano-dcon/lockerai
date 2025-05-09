import { CheckIcon } from '@lockerai/core/icon/check-icon';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Metadata, NextPage } from 'next';
import { cookies } from 'next/headers';
import { PinnedTaskSection } from '#website/module/dashboard/pinned-task-section';
import { findUserUseCase } from '#website/use-case/find-user';
import { findUserLostItemsUseCase } from '~website/src/use-case/find-user-lost-items';

const DashboardPage: NextPage = async () => {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }

  const foundUser = await findUserUseCase(user.id);
  if (!foundUser) {
    return null;
  }

  const userLostItem = await findUserLostItemsUseCase(foundUser.authId);
  if (!userLostItem) {
    return null;
  }

  return userLostItem.currentTargetLostItem && foundUser.lostAndFoundState !== 'NONE' ? (
    <PinnedTaskSection
      user={foundUser}
      currentTargetLostItem={userLostItem.currentTargetLostItem}
      variant={{
        'lost-and-found-state': foundUser.lostAndFoundState,
      }}
    />
  ) : (
    <h1 className="flex flex-col items-center p-5 py-10">
      <span className="relative">
        <CheckIcon className="h-10 w-10 fill-green-11" />
        <CheckIcon aria-hidden className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 fill-green-11 blur-sm" />
      </span>
      <span className="text-center text-4xl font-bold text-sage-12">You have no task</span>
    </h1>
  );
};

export default DashboardPage;

export const generateMetadata = async (): Promise<Metadata> => ({
  title: 'Dashboard',
});
