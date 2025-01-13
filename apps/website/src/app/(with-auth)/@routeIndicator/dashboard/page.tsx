import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { NextPage } from 'next';
import { cookies } from 'next/headers';
import { InAppHeaderRouteIndicatorDivider, InAppHeaderRouteIndicatorIcon, InAppHeaderRouteIndicatorLabel } from '#website/layout/global/header';
import { findUserUseCase } from '#website/use-case/find-user';
import { findUserLostItemsUseCase } from '~website/src/use-case/find-user-lost-items';

const RouteIndicator: NextPage = async () => {
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
    <>
      <InAppHeaderRouteIndicatorDivider />
      {!!userLostItem.currentTargetLostItem.lostItem.imageUrls[0] && (
        <InAppHeaderRouteIndicatorIcon
          src={userLostItem.currentTargetLostItem.lostItem.imageUrls[0]}
          alt={`An image of ${userLostItem.currentTargetLostItem.lostItem.title}`}
        />
      )}
      <InAppHeaderRouteIndicatorLabel>{userLostItem.currentTargetLostItem.lostItem.title}</InAppHeaderRouteIndicatorLabel>
    </>
  ) : (
    <>
      <InAppHeaderRouteIndicatorDivider />
      <InAppHeaderRouteIndicatorLabel>Overview</InAppHeaderRouteIndicatorLabel>
    </>
  );
};

export default RouteIndicator;
