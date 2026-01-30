# Image Upload Feature - Admin Dashboard

## 🎯 Feature Overview

The admin dashboard now has a complete image upload feature that allows administrators to:
- ✅ Upload product images when creating new products
- ✅ Update product images when editing existing products
- ✅ Preview images before saving
- ✅ Remove images from products
- ✅ Store images on the server (not just base64)

---

## 🔧 Technical Implementation

### Backend (Node.js + Multer)
**File**: `src/routes/product.routes.js`

**Image Storage**:
- Directory: `public/uploads/`
- Supported formats: JPEG, PNG, WebP, GIF
- File naming: `product-${timestamp}-${random}.${ext}`
- Max file size: 5MB (default multer limit)

**API Endpoints**:
```
POST   /api/products              - Create product with image upload
PUT    /api/products/:id          - Update product with image upload
DELETE /api/products/:id          - Delete product
GET    /api/products              - Get all products
GET    /api/products/:id          - Get single product
```

**Image Response**:
```json
{
  "message": "Product created successfully",
  "product": {
    "id": "uuid",
    "name": "Product Name",
    "image": "/uploads/product-1706520345678-123456.jpg",
    ...
  }
}
```

### Frontend (Vanilla JavaScript)
**File**: `public/js/admin-dashboard.js`

**Functions Updated**:

1. **handleProductSubmit()** - Async function that:
   - Collects form data using FormData API
   - Appends selected image file (if any)
   - Sends to API with JWT token
   - Handles both CREATE and UPDATE operations
   - Shows success/error notifications

2. **previewImage()** - Displays:
   - Real-time image preview when file selected
   - Shows thumbnail in modal
   - Hides preview when image removed

3. **removeImage()** - Clears:
   - File input value
   - Preview display
   - Image data from form state

4. **loadProducts()** - Now:
   - Fetches products from API
   - Includes JWT authentication
   - Updates local state with server data
   - Displays server-stored image URLs

---

## 📋 HTML Form Structure

**File**: `public/admin-dashboard.html`

```html
<div class="form-group full-width">
    <label>Product Image</label>
    <div class="image-upload-area">
        <input 
            type="file" 
            id="productImage" 
            accept="image/*" 
            onchange="previewImage(event)"
        >
        <div id="imagePreview" class="image-preview hidden">
            <img id="previewImg" src="" alt="Preview">
            <button 
                type="button" 
                class="btn-remove-image" 
                onclick="removeImage()"
            >
                <i class="fas fa-trash"></i>
            </button>
        </div>
    </div>
</div>
```

---

## 🚀 How to Use

### Step 1: Login as Admin
```
URL: http://localhost:3000/login
Email: admin@example.com
Password: admin123
```

### Step 2: Navigate to Products Tab
- Click "Products" in sidebar
- Click "Add Product" button (top right)

### Step 3: Fill Product Form
- Product Name *
- Category * (Tops, Bottoms, Footwear, etc.)
- Price *
- Stock *
- Description *
- Material (optional)
- Dimensions (optional)
- Care Instructions (optional)

### Step 4: Upload Image
1. Click the file input under "Product Image"
2. Select an image file (JPEG, PNG, WebP, or GIF)
3. Image preview appears automatically
4. To remove: Click the trash icon on preview

### Step 5: Save Product
1. Click "Save Product" button
2. Form submits with FormData (including image)
3. Success notification appears
4. Product added to table with image thumbnail

### Step 6: Edit Product Image
1. Click "Edit" on product row
2. Modal opens with existing data
3. Current image displays in preview
4. Upload new image to replace
5. Or click trash to remove image
6. Click "Save Product" to update

---

## 💾 File Handling

### Upload Flow
```
User selects file
    ↓
previewImage() shows thumbnail
    ↓
User clicks "Save Product"
    ↓
handleProductSubmit() creates FormData
    ↓
FormData appends: image file + form fields
    ↓
POST/PUT to /api/products with Authorization header
    ↓
Multer middleware processes image on server
    ↓
Image saved to public/uploads/
    ↓
Database stores image path: /uploads/product-xxx.jpg
    ↓
Response returns product with image path
    ↓
Frontend displays success and reloads products
```

### Image Deletion
When deleting a product:
1. Frontend sends DELETE request to API
2. Backend deletes product from database
3. Image file remains (can implement cleanup logic)
4. Frontend reloads product list

---

## 🔒 Security Features

✅ **Authentication**: JWT token required for uploads
✅ **Authorization**: Only ADMIN role can upload
✅ **File Type Validation**: Only images allowed (JPEG, PNG, WebP, GIF)
✅ **File Size Limit**: 5MB maximum (configurable)
✅ **Unique Filenames**: Prevents file overwrites with timestamps
✅ **Directory Protection**: Uploads stored in public folder

---

## 📱 Image Display

### In Admin Dashboard
- Thumbnail appears in products table (if CSS styled)
- Full preview in edit modal when editing

### On Storefront
Products.js fetches product data and displays:
```javascript
<img src="${product.image}" alt="${product.name}">
```

Image URL from database:
```
http://localhost:3000/uploads/product-1706520345678-123456.jpg
```

---

## 🛠️ API Request Examples

### Create Product with Image
```javascript
const formData = new FormData();
formData.append('name', 'Premium Sneakers');
formData.append('category', 'Footwear');
formData.append('price', '75.00');
formData.append('stock', '50');
formData.append('description', 'High quality leather sneakers');
formData.append('image', fileObject); // File from input

fetch('/api/products', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + token
    },
    body: formData
})
.then(r => r.json())
.then(data => console.log(data.product.image));
```

### Response
```json
{
    "message": "Product created successfully",
    "product": {
        "id": "cm4xyz123",
        "name": "Premium Sneakers",
        "category": "Footwear",
        "price": 75.00,
        "stock": 50,
        "image": "/uploads/product-1706520345678-123456.jpg",
        ...
    }
}
```

---

## ✅ Checklist

**Before Using Feature**:
- [ ] Server running (`npm start`)
- [ ] Logged in as admin account
- [ ] Have image files ready (JPG, PNG, etc.)
- [ ] Image files are less than 5MB

**When Uploading**:
- [ ] Select image from file input
- [ ] See preview thumbnail appear
- [ ] Fill all required form fields
- [ ] Click "Save Product"
- [ ] See success notification

**After Uploading**:
- [ ] Image saved on server (`public/uploads/`)
- [ ] Product appears in table
- [ ] Can edit and replace image
- [ ] Image displays on storefront

---

## 🔧 Configuration

To modify image upload settings, edit `src/routes/product.routes.js`:

```javascript
// Change upload directory
const uploadDir = path.join(__dirname, '../../public/uploads');

// Change allowed file types
const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// Change max file size (in multer config)
limits: {
    fileSize: 5 * 1024 * 1024 // 5MB in bytes
}
```

---

## 📊 Supported Image Formats

| Format | MIME Type | Extension |
|--------|-----------|-----------|
| JPEG | image/jpeg | .jpg, .jpeg |
| PNG | image/png | .png |
| WebP | image/webp | .webp |
| GIF | image/gif | .gif |

---

## 🚨 Troubleshooting

### Image Not Uploading
**Problem**: File upload fails silently
**Solution**:
1. Check browser console (F12) for errors
2. Verify file is an image (JPG, PNG, WebP, GIF)
3. Check file size is under 5MB
4. Verify token is valid (login again if needed)
5. Check server logs for error messages

### Preview Not Showing
**Problem**: Image preview doesn't appear after selection
**Solution**:
1. Reload page (Ctrl+R)
2. Clear browser cache
3. Check file input `accept="image/*"` attribute
4. Verify JavaScript enabled in browser

### Image Not Displaying on Storefront
**Problem**: Image shows broken thumbnail
**Solution**:
1. Check `public/uploads/` directory exists
2. Verify image file in uploads folder
3. Check image path in database (use Prisma Studio)
4. Verify server can access upload folder

### 500 Error on Upload
**Problem**: Server returns 500 error
**Solution**:
1. Check `public/uploads/` directory exists
2. Verify write permissions on folder
3. Check image file type is allowed
4. Check server logs for detailed error
5. Run `npx prisma db push` to sync database

---

## 📈 Future Enhancements

- [ ] Image compression before upload
- [ ] Multiple image upload per product
- [ ] Image cropping tool
- [ ] CDN integration for faster delivery
- [ ] Image optimization (WebP conversion)
- [ ] Drag & drop upload support
- [ ] Image gallery for product
- [ ] Image deletion from server when product deleted

---

## ✨ Status

**Version**: 1.0  
**Status**: ✅ ACTIVE  
**Last Updated**: January 29, 2026  
**Backend**: Node.js + Multer ✅  
**Frontend**: Vanilla JS + FormData API ✅  
**Database Integration**: Prisma ORM ✅  
**Authentication**: JWT + Role-based ✅  

---

**Ready to upload images!** 🎉
