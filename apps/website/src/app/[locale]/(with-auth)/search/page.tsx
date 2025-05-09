import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Metadata, NextPage } from 'next';
import { cookies } from 'next/headers';
import { SearchLostItemSection } from '#website/module/search/search-lost-item-section';
import { findUserUseCase } from '#website/use-case/find-user';

const SearchPage: NextPage = async () => {
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

  return <SearchLostItemSection user={foundUser} />;
};

export default SearchPage;

export const generateMetadata = async (): Promise<Metadata> => ({
  title: 'Search',
});
