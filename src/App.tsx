import React from "react";
import ToolBar from './components/Toolbar';
import UploadButton from './components/UploadButton';
import { AppBar, Avatar, Box, Button, Container, CssBaseline, Grid, Paper, Toolbar, Typography } from "@mui/material";
import { AppContext } from "./contexts";

export default function App() {
    const { images } = React.useContext(AppContext);

    return (
        <Container
            maxWidth={false}
            sx={{
                width: "430px", // **固定 iPhone 16 Pro Max 寬度**
                height: "932px", // **固定 iPhone 16 Pro Max 高度**
                margin: "0 auto",
                backgroundColor: "#fff",
                overflow: "hidden",
            }}
        >
            <CssBaseline />

            <ToolBar />

            {/* Banner */}
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    height: "150px",
                    backgroundImage: `url("https://source.unsplash.com/800x400/?pear")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    marginBottom: "16px",
                }}
            >
                <Typography variant="h5" color="white" sx={{ backgroundColor: "rgba(0,0,0,0.5)", padding: "8px 16px", borderRadius: "8px" }}>
                    Banner title
                </Typography>
            </Paper>

            <UploadButton />

            {/* Image Grid */}
            <Grid container spacing={2}>
                {images.map((img, index) => (
                    <Grid item xs={6} key={index}>
                        <Paper elevation={2} sx={{ borderRadius: "12px", overflow: "hidden" }}>
                            <Box component="img" src={img} width="100%" height="150px" />
                            <Box padding="8px">
                                <Typography variant="caption" color="textSecondary">
                                    {'作者名'}
                                </Typography>
                                <Typography variant="body2" fontWeight="bold">
                                    {'圖片標題'}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
