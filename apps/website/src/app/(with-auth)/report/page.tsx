import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Metadata, NextPage } from 'next';
import { cookies } from 'next/headers';
import { ReportLostItemSection } from '#website/module/report/report-lost-item-section/report-lost-item-section.presenter';
import { findUserUseCase } from '#website/use-case/find-user';

const ReportPage: NextPage = async () => {
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

  return <ReportLostItemSection user={foundUser} />;
};

export default ReportPage;

export const generateMetadata = async (): Promise<Metadata> => ({
  title: 'Report',
});
