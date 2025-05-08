import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { NextPage } from 'next';
import { cookies } from 'next/headers';
import { getLocale } from 'next-intl/server';
import { pickI18nText } from '#website/i18n/locales';
import { InAppHeaderRouteIndicatorDivider, InAppHeaderRouteIndicatorIcon, InAppHeaderRouteIndicatorLabel } from '#website/layout/global/header';
import { findUserUseCase } from '#website/use-case/find-user';
import { findUserLostItemsUseCase } from '~website/src/use-case/find-user-lost-items';

const RouteIndicator: NextPage = async () => {
  const cookieStore = cookies();
  const locale = await getLocale();

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

  if (!userLostItem.currentTargetLostItem || foundUser.lostAndFoundState === 'NONE') {
    return (
      <>
        <InAppHeaderRouteIndicatorDivider />
        <InAppHeaderRouteIndicatorLabel>Overview</InAppHeaderRouteIndicatorLabel>
      </>
    );
  }

  const titleI18nText = pickI18nText(
    userLostItem.currentTargetLostItem.lostItem.titleI18n,
    locale,
    userLostItem.currentTargetLostItem.lostItem.title,
  );

  return (
    <>
      <InAppHeaderRouteIndicatorDivider />
      {!!userLostItem.currentTargetLostItem.lostItem.imageUrls[0] && (
        <InAppHeaderRouteIndicatorIcon src={userLostItem.currentTargetLostItem.lostItem.imageUrls[0]} alt={titleI18nText} />
      )}
      <InAppHeaderRouteIndicatorLabel>{titleI18nText}</InAppHeaderRouteIndicatorLabel>
    </>
  );
};

export default RouteIndicator;
