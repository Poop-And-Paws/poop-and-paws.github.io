import React from "react";
import ToolBar from './components/Toolbar';
import { AppBar, Avatar, Box, Button, Container, CssBaseline, Grid, Paper, Toolbar, Typography } from "@mui/material";

const images = [
  { src: "https://thumbs.dreamstime.com/z/random-cat-love-cats-pet-catsslave-110819582.jpg?ct=jpeg", title: "圖片標題", author: "作者名" },
  { src: "https://thumbs.dreamstime.com/z/random-cat-love-cats-pet-catsslave-110819582.jpg?ct=jpeg", title: "圖片標題", author: "作者名" },
  { src: "https://thumbs.dreamstime.com/z/random-cat-love-cats-pet-catsslave-110819582.jpg?ct=jpeg", title: "圖片標題", author: "作者名" },
  { src: "https://thumbs.dreamstime.com/z/random-cat-love-cats-pet-catsslave-110819582.jpg?ct=jpeg", title: "圖片標題", author: "作者名" },
];

export default function App() {
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

      {/* Upload Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "black",
          color: "white",
          fontSize: "16px",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "16px",
          "&:hover": { backgroundColor: "#333" },
        }}
      >
        Upload Kitty Card / 上傳貓貓卡
      </Button>

      {/* Image Grid */}
      <Grid container spacing={2}>
        {images.map((img, index) => (
          <Grid item xs={6} key={index}>
            <Paper elevation={2} sx={{ borderRadius: "12px", overflow: "hidden" }}>
              <Box component="img" src={img.src} width="100%" height="150px" />
              <Box padding="8px">
                <Typography variant="caption" color="textSecondary">
                  {img.author}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {img.title}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
