# Netlify Deployment Guide

## ✅ What Has Changed

Your portfolio has been migrated from Vercel to Netlify! Here's what was updated:

### Removed (Vercel-specific):
- ✗ `vercel.json` - Vercel configuration
- ✗ `api/` folder - Vercel serverless functions  
- ✗ `server/` folder - Express server (local dev only)
- ✗ Server dependencies (Express, CORS, Helmet, Rate Limiting)

### Added (Netlify-specific):
- ✓ `netlify.toml` - Netlify configuration
- ✓ `netlify/functions/contact.js` - Netlify serverless function for contact form
- ✓ `.env.example` - Environment variables template

### Updated:
- ✓ `package.json` - Removed server dependencies, kept only nodemailer
- ✓ `public/assets/main.js` - Updated API endpoint to use Netlify Functions
- ✓ `README.md` - Updated with Netlify deployment instructions

---

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Code

```bash
# Make sure all changes are committed
git add .
git commit -m "Migrate from Vercel to Netlify"
git push origin main
```

### Step 2: Connect to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click **"New site from Git"**
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize Netlify
5. Select your portfolio repository
6. Netlify will auto-detect settings from `netlify.toml` ✓

### Step 3: Set Environment Variables

**IMPORTANT:** These must be set BEFORE first deployment, or contact form won't work!

1. In Netlify dashboard, go to **Site Settings**
2. Navigate to **Build & Deploy** → **Environment**
3. Click **Add environment variables**
4. Add these three variables:

| Variable | Value | Example |
|----------|-------|---------|
| `EMAIL_USER` | Your Gmail address | `your-email@gmail.com` |
| `EMAIL_PASS` | Gmail App Password (16 chars) | `abcd efgh ijkl mnop` |
| `EMAIL_TO` | Where to receive messages | `your-email@gmail.com` |

### Step 4: Get Gmail App Password

**Never use your regular Gmail password!** Use an App Password instead:

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** (left sidebar)
3. Make sure **2-Step Verification** is enabled
4. Scroll down to **App passwords**
5. Select:
   - App: **Mail**
   - Device: **Windows Computer** (or your device)
6. Google will show a 16-character password
7. Copy it (remove spaces if needed)
8. Paste in Netlify's `EMAIL_PASS` field

### Step 5: Deploy

1. After adding environment variables, click **Save**
2. Go to **Deployments** tab
3. Click **Trigger deploy** → **Deploy site**
4. Wait for deployment to complete (usually 1-2 minutes)
5. Your site URL will appear: `https://your-site.netlify.app`

---

## 🧪 Test Your Contact Form

1. Visit your live site
2. Scroll to the **Contact** section
3. Fill in the form with test data
4. Click **Send Message**
5. You should receive an email within seconds!

If you don't receive the email:
- Check spam/junk folder
- Check Netlify function logs (Site Settings → Functions → contact)
- Verify environment variables are correct
- Make sure Gmail App Password is set (not regular password)

---

## 📝 Local Development

Want to test locally before deploying?

### Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Set Up Local Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your actual credentials
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASS=your-app-password
# EMAIL_TO=your-email@gmail.com
```

### Run Local Server

```bash
netlify dev
```

Visit `http://localhost:8888` and test the contact form locally. It works exactly like production!

---

## ✨ Benefits of Netlify

- ✓ **Free tier** includes unlimited functions
- ✓ **Easy environment variables** - no complex dashboard
- ✓ **Better local dev** - `netlify dev` includes function support
- ✓ **Automatic deployments** from Git push
- ✓ **Better performance** with global CDN
- ✓ **Form handling** if you want to switch later (no code required)

---

## 🆘 Troubleshooting

### Contact form returns "Error sending message"

**Check:**
1. Environment variables in Netlify dashboard
2. Gmail App Password is correct (16 characters)
3. 2-Step Verification is enabled in Google Account
4. Account hasn't changed passwords recently

### No email received

**Check:**
1. Spam/Junk folder
2. Netlify function logs for errors
3. `EMAIL_TO` variable is a valid email

### Netlify function not running

**Check:**
1. Files exist at `netlify/functions/contact.js`
2. `netlify.toml` exists in root
3. Try redeploying: Deployments → Trigger deploy

### Local development (`netlify dev`) not working

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Reinstall project dependencies
rm -rf node_modules
npm install

# Try again
netlify dev
```

---

## 🔄 Redeploying

Any of these will trigger a new deploy:

- **Push to GitHub:** Automatic deploy
- **Netlify Dashboard:** Deployments → Trigger deploy
- **CLI:** `netlify deploy --prod`

---

## 📚 More Help

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)

---

**Your portfolio is now ready for Netlify! 🎉**
