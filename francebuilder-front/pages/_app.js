import React from 'react';
import { wrapper } from '../src/redux/store';

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default wrapper.withRedux(MyApp);