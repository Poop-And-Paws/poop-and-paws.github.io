import React from 'react';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AppContext } from '../../contexts';
import { supabase } from '../../supabase';

export default function UploadButton() {
    const { fetchImages, user } = React.useContext(AppContext);

    async function uploadImage(file: File | null) {
        console.log('file', file)
        if (!file || !user) return alert("請選擇圖片並登入");

        const filePath = `${user.id}/${Date.now()}${file.name.split(".").pop()}`;
        const { error } = await supabase.storage.from("images").upload(filePath, file);

        if (error) console.error("上傳失敗", error);
        else {
            alert("圖片上傳成功！");
            fetchImages(); // 重新載入圖片
        }
    }

    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
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
            <input
                type="file"
                hidden
                onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                        uploadImage(event.target.files[0]);
                    }
                }}
            />
        </Button>
    )
}