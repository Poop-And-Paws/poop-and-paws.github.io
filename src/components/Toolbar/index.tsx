import React from 'react';
import { AppBar, Toolbar, Typography, Tooltip, Paper, Box } from '@mui/material';
import UserButton from './UserButton';
import './index.css';

export default function BoardToolbar() {
    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ padding: '0 !important' }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: '0 !important' }}>
                <Tooltip title="你好呀～要不要跟大家分享你可愛的貓貓卡片？登入後，就可以上傳你的照片了呦！">
                    <Paper sx={{ border: '1px solid #E0E0E0', backgroundColor: 'white', padding: '4px 8px', overflow: 'hidden' }}>
                        <Box sx={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 8s linear infinite' }}>
                            <Typography variant="body2">
                                你好呀～要不要跟大家分享你可愛的貓貓卡片？登入後，就可以上傳你的照片了呦！
                            </Typography>
                        </Box>
                    </Paper>
                </Tooltip>
                <UserButton />
            </Toolbar>
        </AppBar>
    )
}