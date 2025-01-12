import { PageTransitionAnimation } from '@lockerai/core/component/page-transition-animation';
import type { NextPage } from 'next';
import type { ReactNode } from 'react';

type RootTemplateProps = {
  children: ReactNode;
};

const RootTemplate: NextPage<RootTemplateProps> = ({ children }) => <PageTransitionAnimation>{children}</PageTransitionAnimation>;

export default RootTemplate;
