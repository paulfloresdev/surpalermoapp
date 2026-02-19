//import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { Provider } from 'react-redux';
import store from './store/configStore/store';

interface ProviderProps {
    children: React.ReactNode;
    hash?: boolean;
}

const Providers: React.FC<ProviderProps> = ({ children, hash = false }) => {
    if (hash) {
        return (
            <Provider store={store}>
                <HashRouter>
                    <HeroUIProvider >
                        <ToastProvider />
                        {children}
                    </HeroUIProvider>
                </HashRouter>
            </Provider>
        );
    }

    return (
        <Provider store={store}>
            <BrowserRouter>
                <HeroUIProvider >
                    <ToastProvider />
                    {children}
                </HeroUIProvider>
            </BrowserRouter>
        </Provider>
    );

}

export default Providers;