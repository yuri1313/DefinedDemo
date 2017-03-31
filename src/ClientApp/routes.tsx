import * as React from 'react';
import { Router, Route, HistoryBase } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Uploader } from './components/Uploader';

export default <Route component={ Layout }>
    <Route path='/' components={{ body: Home }} />
    <Route path='/uploader' components={{ body: Uploader }} />
</Route>;

// Allow Hot Module Reloading
declare var module: any;
if (module.hot) {
    module.hot.accept();
}
