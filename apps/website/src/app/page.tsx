import type { NextPage } from 'next';
import { HeroSection } from '#website/module/introduction/hero-section';
import { jsonLd } from './json-ld';

type RootPageProps = {
  searchParams: {
    asAuth?: boolean;
    redirectPathname?: string;
    asRelateResult?: boolean;
  };
};

const RootPage: NextPage<RootPageProps> = ({ searchParams }) => (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <HeroSection asAuth={searchParams.asAuth} redirectPathname={searchParams.redirectPathname} asRelateResult={searchParams.asRelateResult} />
  </>
);

export default RootPage;
