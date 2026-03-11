# ✅ Netlify Migration Checklist

## Before Deploying to Netlify

### ✓ Files/Folders to DELETE (Vercel-specific)

These are no longer needed and should be removed:

```bash
# Delete these folders
rm -r api/
rm -r server/

# Delete this file
rm vercel.json
```

**Using Git:**
```bash
git rm -r api/
git rm -r server/
git rm vercel.json
git commit -m "Remove Vercel-specific code"
git push origin main
```

---

### ✓ NEW Files Created (Netlify-specific)

Keep these - they're essential for Netlify:

- ✅ `netlify.toml` - Netlify configuration
- ✅ `netlify/functions/contact.js` - Contact form handler
- ✅ `DEPLOYMENT.md` - Deployment guide
- ✅ `.env.example` - Environment template

---

### ✓ Files Updated

- ✅ `package.json` - Removed Express/server dependencies
- ✅ `public/assets/main.js` - Updated API endpoint to `/.netlify/functions/contact`
- ✅ `README.md` - Updated deployment instructions

---

## Ready to Deploy?

### Checklist:

- [ ] Deleted `api/` folder
- [ ] Deleted `server/` folder  
- [ ] Deleted `vercel.json` file
- [ ] Committed and pushed changes to GitHub
- [ ] Netlify account created at [netlify.com](https://netlify.com)
- [ ] Repository connected to Netlify
- [ ] Environment variables set:
  - [ ] `EMAIL_USER`
  - [ ] `EMAIL_PASS` (Gmail app password)
  - [ ] `EMAIL_TO`
- [ ] Site deployed and online
- [ ] Contact form tested and working

---

## After Cleanup

Your project structure will be clean:

```
portfolio/
├── netlify/
│   └── functions/
│       └── contact.js        ✓ NEW
├── public/
│   ├── index.html
│   └── assets/
│       ├── style.css
│       ├── main.js           ✓ UPDATED
│       └── projects.json
├── netlify.toml              ✓ NEW
├── package.json              ✓ UPDATED
├── README.md                 ✓ UPDATED
├── DEPLOYMENT.md             ✓ NEW
└── .env.example              ✓ NEW
```

No more Vercel references! 🎉

---

## Contact Form Flow (Working)

1. **User fills form** on portfolio website
2. **JavaScript submits** to `/.netlify/functions/contact`
3. **Netlify function** runs `netlify/functions/contact.js`
4. **Nodemailer sends email** to your Gmail with:
   - Visitor's name
   - Visitor's email
   - Message content
   - Timestamp
5. **You receive email** in inbox within seconds

**Fully functional - no backend server needed!** ✨
