import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../supabase';
import { User } from '@supabase/supabase-js';

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface ImageContextType {
    images: string[];
    setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

interface AppContextType extends UserContextType, ImageContextType {
    fetchImages: () => Promise<void>;
}

export const AppContext = createContext<AppContextType>({
    user: null,
    setUser: () => { },
    images: [],
    setImages: () => { },
    fetchImages: async () => { },
});

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const listener = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });
        return () => {
            listener.data.subscription.unsubscribe();
        }
    }, []);

    const fetchImages = async () => {
        const { data: uidFolders, error } = await supabase.storage.from("images").list("");

        if (error) {
            console.error(error);
            return;
        }

        let allImages: string[] = [];

        for (const folder of uidFolders) {
            if (folder.metadata) continue;

            const { data: userImages, error: imgError } = await supabase.storage.from("images").list(folder.name);

            if (imgError) {
                console.error(`讀取使用者 ${folder.name} 圖片失敗`, imgError);
                continue;
            }

            // 取得圖片 URL
            const userImageUrls = userImages.map((file) => {
                return supabase.storage.from("images").getPublicUrl(`${folder.name}/${file.name}`).data.publicUrl;
            });
            allImages = [...allImages, ...userImageUrls];
        }
        setImages(allImages);
    }

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <AppContext.Provider value={{ user, setUser, images, setImages, fetchImages }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;