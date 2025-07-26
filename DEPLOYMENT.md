# Hướng dẫn Deploy lên Vercel

## Các bước deploy:

1. **Cài đặt Vercel CLI (nếu chưa có):**

   ```bash
   npm i -g vercel
   ```

2. **Login vào Vercel:**

   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## Cấu hình đã được thiết lập:

- **vercel.json**: Cấu hình routing cho SPA
- **public/\_redirects**: Fallback cho các platform khác
- **vite.config.js**: Tối ưu build cho production

## Lưu ý:

- Đảm bảo tất cả environment variables được cấu hình trong Vercel dashboard
- Kiểm tra build logs nếu có lỗi
- Test các routes sau khi deploy

## Troubleshooting:

Nếu vẫn gặp lỗi 404:

1. Kiểm tra Vercel dashboard > Settings > Functions
2. Đảm bảo "Include source files outside of the Root Directory" được bật
3. Kiểm tra build logs trong Vercel dashboard
