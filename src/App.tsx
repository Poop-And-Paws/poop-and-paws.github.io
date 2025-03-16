import { useState, useEffect, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import { supabase } from "./supabase";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    fetchAllImages();
  }, []);

  // 監聽登入狀態變化
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  // 取得 Storage 內的圖片
  async function fetchAllImages() {
    const { data: folders, error } = await supabase.storage.from("images").list("");

    if (error) {
      console.error("取得使用者 ID 失敗", error);
      return;
    }

    let allImages: string[] = [];

    for (const folder of folders) {
      if (folder.metadata) continue; // 跳過不是資料夾的東西

      // 取得該 user_id 內的所有圖片
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
    setImageUrls(allImages);
  }

  // 上傳圖片
  async function uploadImage() {
    if (!file || !user) return alert("請選擇圖片並登入");

    const filePath = `${user.id}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("images").upload(filePath, file);

    if (error) console.error("上傳失敗", error);
    else {
      alert("圖片上傳成功！");
      fetchAllImages(); // 重新載入圖片
    }
  }

  // 🖌 取得畫布圖像並上傳到 Supabase
  const uploadDrawing = async () => {
    if (!canvasRef.current) return;

    // 取得畫布的 Base64 圖像
    const drawingData = canvasRef.current.getDataURL("image/png");
    const blob = await (await fetch(drawingData)).blob();
    const fileName = `${user.id}/drawing-${Date.now()}.png`;

    // 上傳到 Supabase Storage
    const { data, error } = await supabase.storage
      .from("images") // ⚠️ 確保 Supabase Storage 有 `drawings` Bucket
      .upload(fileName, blob, { contentType: "image/png" });

    if (error) {
      console.error("上傳失敗", error);
      alert("上傳失敗：" + error.message);
    } else {
      console.log("上傳成功", data);
    }
    fetchAllImages();
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Supabase Image Gallery</h1>

      {!user ? (
        <button onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}>
          使用 Google 登入
        </button>
      ) : (
        <>
          <p>歡迎, {user.email}</p>
          <button onClick={() => supabase.auth.signOut()}>登出</button>

          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <button onClick={uploadImage} disabled={!file}>上傳圖片</button>
        </>
      )}

      <h2>🎨 你的畫布</h2>
      <CanvasDraw
        ref={canvasRef}
        brushColor="black"
        brushRadius={3}
        lazyRadius={5}
        hideGrid
        canvasWidth={400}
        canvasHeight={400}
      />
      <div>
        <button onClick={() => canvasRef.current.clear()}>清除畫布</button>
        <button onClick={uploadDrawing}>上傳畫布</button>
      </div>

      <h2>已上傳的圖片</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt="Uploaded" width="150" style={{ borderRadius: "10px" }} />
        ))}
      </div>
    </div>
  );
}
