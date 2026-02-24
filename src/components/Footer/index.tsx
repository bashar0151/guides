import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type {WrapperProps} from '@docusaurus/types';
import Feedback from '@site/src/components/Feedback';
import {useLocation} from '@docusaurus/router';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): JSX.Element {
  const location = useLocation();
  
  return (
    <>
      <Feedback resource={location.pathname} />
      <Footer {...props} />
    </>
  );
}