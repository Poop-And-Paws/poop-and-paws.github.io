import React, { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { supabase } from '../../supabase';
import { AppContext } from '../../contexts';

export default function UserButton() {
    const { user, setUser } = React.useContext(AppContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLoginIn = () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin,
            }
        });
    }

    const handleLoginLogout = () => {
        supabase.auth.signOut();
        handleMenuClose();
    };

    const handleLanguageSwitch = () => {
        // Handle language switch
        handleMenuClose();
    };

    return (
        <>
            <IconButton onClick={handleMenuOpen}>
                {!user ? (
                    <AccountCircleOutlinedIcon />
                ) : (
                    <Avatar src={user.user_metadata.avatar_url} />
                )}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {!user
                    ? <MenuItem onClick={handleLoginIn}>Login</MenuItem>
                    : <MenuItem onClick={handleLoginLogout}>Logout</MenuItem>
                }
                <MenuItem onClick={handleLanguageSwitch}>Switch Language</MenuItem>
            </Menu>
        </>
    );
}