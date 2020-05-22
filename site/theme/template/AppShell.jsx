/**
 * Empty component for app shell
 * See https://github.com/NekR/offline-plugin/blob/master/docs/app-shell.md
 */
import React from 'react';
import Theming from '../../../components/varnish';

const { ThemeProvider } = Theming;

const AppShell = () => <ThemeProvider />;

export default AppShell;
