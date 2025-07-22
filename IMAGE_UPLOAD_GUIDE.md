# 📸 Image Upload Guide for Birthday Slideshow

## 🚀 Quick Steps to Upload Your Images

### Option 1: Google Drive (Recommended) ⭐

#### Step 1: Upload Images
1. Go to [Google Drive](https://drive.google.com)
2. Create a folder called "Birthday Images" or "Miss Av Photos"
3. Upload all your photos to this folder

#### Step 2: Make Images Public
For **each image**:
1. Right-click the image → **"Share"**
2. Click **"Change to anyone with the link"** 
3. Set permission to **"Viewer"**
4. Click **"Copy link"**

#### Step 3: Extract File IDs
From a Google Drive link like:
```
https://drive.google.com/file/d/1ABC123DEF456GHI789/view?usp=sharing
```

The **File ID** is: `1ABC123DEF456GHI789` (between `/d/` and `/view`)

#### Step 4: Update Your Code
Replace the placeholder IDs in your code:

**For PersonalSlideshow.tsx:**
```typescript
const personalImages = [
  { id: "1ABC123DEF456GHI789", label: "Av #1" },
  { id: "1XYZ789ABC123DEF456", label: "Av #2" },
  // ... continue for all 15 images
];
```

**For MemoriesSlideshow.tsx:**
```typescript
const memoryImages = [
  { id: "1QWE456RTY789UIO123", label: "Memory 1" },
  { id: "1ASD123FGH456JKL789", label: "Memory 2" },
  // ... continue for all 15 images
];
```

---

### Option 2: Local Images (Alternative)

If you prefer to keep images in your project:

#### Step 1: Create Images Folder
```
src/
  assets/
    images/
      personal/
        av1.jpg
        av2.jpg
        ...
      memories/
        memory1.jpg
        memory2.jpg
        ...
```

#### Step 2: Import Images
```typescript
import av1 from '../assets/images/personal/av1.jpg';
import av2 from '../assets/images/personal/av2.jpg';
// ... import all images

const personalImages = [
  { id: av1, label: "Av #1" },
  { id: av2, label: "Av #2" },
  // ...
];
```

#### Step 3: Update Image Source
Change the img src to:
```typescript
<img src={image.id} alt={image.label} />
```

---

## 🎯 Current Status

✅ **Code is ready** - Both slideshows are configured for Google Drive
✅ **Placeholders set** - Easy to find and replace the IDs
✅ **Instructions clear** - Follow the steps above

## 📝 What You Need to Do

1. **Upload 15 images for PersonalSlideshow** (photos of Miss Av)
2. **Upload 15 images for MemoriesSlideshow** (general memories)
3. **Get the Google Drive file IDs** for each image
4. **Replace the placeholder IDs** in the code
5. **Test the slideshow** to make sure images load

## 🔧 Troubleshooting

**Images not showing?**
- Make sure the Google Drive link is set to "Anyone with the link"
- Double-check the file ID is correct
- Verify the image is actually uploaded to Google Drive

**Wrong image format?**
- Use JPG, PNG, or WebP formats
- Recommended size: 400x600 pixels or similar aspect ratio

## 🎉 Ready to Go!

Once you replace the placeholder IDs with your actual Google Drive file IDs, your birthday slideshow will display your beautiful photos! 

The slideshows will automatically:
- ✨ Slide smoothly (PersonalSlideshow right, MemoriesSlideshow left)
- 🔄 Loop infinitely without stopping
- 💖 Show captions with pink/green themes
- 🎀 Display decorative animations (hearts, sparkles, leaves)
