import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../supabase';
import { User } from '@supabase/supabase-js';

interface AppContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AppContext = createContext<AppContextType>({
    user: null,
    setUser: () => {}
});

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const listener = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });
        return () => {
            listener.data.subscription.unsubscribe();
        }
    }, []);

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;