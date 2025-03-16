import React from 'react';
import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';
import { AppContext } from '../../contexts';
import UserButton from './UserButton';

export default function BoardToolbar() {
    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ padding: 0 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: 0 }}>
                <Typography variant="h6" color="primary">
                    主要畫面
                </Typography>
                <UserButton />
            </Toolbar>
        </AppBar>
    )
}