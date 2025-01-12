import type { NextPage } from 'next';
import { ChallengeSection } from '#locker-dashboard/module/introduction/challenge-section';
import { HeroSection } from '#locker-dashboard/module/introduction/hero-section';
import { jsonLd } from './json-ld';

const RootPage: NextPage = async () => {
  const lockerId = process.env['LOCKER_ID'];
  if (!lockerId) {
    throw new Error('enviroment variable LOCKER_ID is not defined');
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ChallengeSection lockerId={lockerId} fallback={<HeroSection />} />
    </>
  );
};

export default RootPage;
