# 📸 Image Upload Feature - Quick Reference

## 🚀 Quick Start (30 seconds)

```
1. Go to: http://localhost:3000/login
2. Email: admin@example.com
3. Password: admin123
4. Click "Products" tab
5. Click "Add Product"
6. Fill form + select image
7. Click "Save Product"
✅ Done! Image uploaded!
```

---

## 📋 Complete Workflow

### Adding a Product with Image

**Step 1**: Open form
```
1. Login as admin
2. Go to Products tab
3. Click "Add Product" button
```

**Step 2**: Fill details
```
Product Name:        Premium Black Hoodie
Category:            Tops
Price:               89.99
Stock:               50
Description:         Comfortable premium hoodie
Material:            100% Cotton (optional)
Dimensions:          S, M, L, XL (optional)
Care Instructions:   Machine wash cold (optional)
```

**Step 3**: Upload image
```
1. Click "Product Image" file input
2. Select image file (JPG, PNG, WebP, GIF)
3. See preview appear (automatic)
4. To remove: Click trash icon
```

**Step 4**: Save
```
Click "Save Product" button
✅ Success message appears
✅ Product added with image
```

---

## ✏️ Editing Product Image

```
1. Products tab
2. Find product in table
3. Click "Edit" button
4. Current image shows in preview
5. Option 1: Upload new image (replaces old)
6. Option 2: Click trash to remove image
7. Click "Save Product"
✅ Updated!
```

---

## 🗑️ Delete Product

```
1. Click "Delete" button on product row
2. Confirm dialog appears
3. Click "OK" to confirm
✅ Product deleted (image removed from list)
```

---

## 🖼️ Image Details

| Property | Value |
|----------|-------|
| Upload Type | Server-side storage |
| Formats | JPG, PNG, WebP, GIF |
| Max Size | 5MB |
| Storage Path | public/uploads/ |
| URL Format | /uploads/product-xxx.jpg |
| Authentication | JWT required (admin) |

---

## 🔐 Login Credentials

**Admin Account**:
```
Email: admin@example.com
Password: admin123
```

**Demo User Account** (for testing):
```
Email: user@example.com
Password: user123
```

---

## ⚡ Key Features

✅ Real-time image preview
✅ Drag-and-drop ready (future enhancement)
✅ File type validation
✅ File size limits
✅ Secure upload (JWT)
✅ Admin-only access
✅ Server-side storage
✅ Easy image management

---

## 🎯 Where to Find Images

After uploading, images are stored at:
```
Project Root/
└── public/
    └── uploads/
        └── product-1706520345678-123456.jpg
```

Access via browser:
```
http://localhost:3000/uploads/product-1706520345678-123456.jpg
```

---

## 🚨 Common Issues & Quick Fixes

| Issue | Solution |
|-------|----------|
| Preview not showing | Reload page (Ctrl+R) |
| Upload fails | Check file size < 5MB |
| Image not saving | Ensure logged in as admin |
| 500 error | Check public/uploads/ folder exists |
| Image broken on storefront | Check image URL in database |

---

## 📱 Supported Formats

| Format | Extension | Quality |
|--------|-----------|---------|
| JPEG | .jpg, .jpeg | High |
| PNG | .png | High (with transparency) |
| WebP | .webp | Best (modern browsers) |
| GIF | .gif | Good (for animations) |

---

## 💡 Pro Tips

1. **Use WebP format** for smaller file sizes
2. **Optimize images** before upload (reduce file size)
3. **Use consistent dimensions** across products
4. **Add descriptive product names** for organization
5. **Check browser console** (F12) if issues occur

---

## ✅ Verification Checklist

- [ ] Server running at http://localhost:3000
- [ ] Admin login works
- [ ] Products tab accessible
- [ ] "Add Product" modal opens
- [ ] Image input accepts files
- [ ] Preview appears after selection
- [ ] Form submits successfully
- [ ] Product saves with image
- [ ] Image displays in product table
- [ ] Edit modal shows saved image
- [ ] Can delete products

---

## 📞 Support

If images don't upload:

**Check 1**: File type
```
Allowed: JPG, PNG, WebP, GIF
Not allowed: PDF, DOC, ZIP, etc.
```

**Check 2**: File size
```
Max: 5MB
Too large? Compress before upload
```

**Check 3**: Folder exists
```
Verify: public/uploads/ folder exists
If missing: Create manually or restart server
```

**Check 4**: Server logs
```
Open: Terminal
Look for error messages
Share with support
```

---

## 🎉 You're All Set!

Your admin dashboard now has professional image upload capabilities!

**Visit**: http://localhost:3000/login  
**Enjoy**: Image uploading! 📸

---

**Version**: 1.0  
**Last Updated**: January 29, 2026  
**Status**: ✅ READY TO USE
