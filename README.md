# Naiem Ur Rahman Riyad - Portfolio

A modern, responsive portfolio website showcasing data science projects and skills.

## 🚀 Features

- Responsive design for all devices
- Interactive project showcase with filtering
- Contact form with email integration
- Smooth animations and modern UI
- Dark theme with custom cursor effects

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Deployment:** Netlify (serverless functions)
- **Email:** Nodemailer with Gmail SMTP

## 📧 Contact Form Setup

The contact form uses Gmail SMTP to send emails. For security, it uses environment variables.

### Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use the App Password (not your regular password) in environment variables

### Environment Variables

Create a `.env` file in the root directory:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_TO=your-receiving-email@gmail.com
```

For Netlify deployment, add these as environment variables in your Netlify dashboard.

## 🚀 Deployment to Netlify

### Quick Start (Recommended)

1. **Connect to Netlify:**
   - Push your code to GitHub
   - Go to [netlify.com](https://netlify.com) and sign up
   - Click "New site from Git"
   - Connect your GitHub repository
   - Netlify will auto-detect netlify.toml

2. **Set Environment Variables:**
   - Go to Site Settings → Build & Deploy → Environment
   - Add these variables:
     - `EMAIL_USER`: your-gmail@gmail.com
     - `EMAIL_PASS`: your-16-character-app-password
     - `EMAIL_TO`: where-to-receive@gmail.com
   - Save and redeploy

3. **Done!**
   - Your site will be live at `your-site.netlify.app`
   - Contact form will be fully functional

## 🔧 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in your email credentials

3. **Run locally:**
   ```bash
   npm run dev  # Development with auto-reload
   # or
   npm start    # Production mode
   ```

4. **Open in browser:**
   - http://localhost:3000

## 📁 Project St with Netlify CLI:**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
netlify/
│   └── functions/        # Netlify serverless functions
│       └── contact.js   # Contact form handler
├── public/              # Static files
│   ├── index.html       # Main HTML
│   └── assets/
│       ├── style.css    # Styles
│       ├── main.js      # JavaScript
│       └── projects.json # Project data
├── netlify.toml        # Netlify Express server (dev only)
│   ├── server.js
│   └── routes/
├── vercel.json          # Vercel configuration
├── package.json
└── .env.example        # Environment template
```

## 🎨 Customization

- **Projects:** Edit `public/assets/projects.json`
- **Styling:** Modify `public/assets/style.css`
- **Content:** Update `public/netlify/functions/contact.js`

## 📞 Support / Troubleshooting

If the contact form doesn't work after deployment:

1. **Check Netlify Function logs:**
   - Go to Site Settings → Functions
   - Check the logs for `contact` function

2. **Verify environment variables:**
   - Site Settings → Build & Deploy → Environment
   - Ensure all three email variables are set

3. **Gmail App Password:**
   - Make sure it's the 16-character app password, not your regular password
   - Regenerate if needed: [Google Account Settings](https://myaccount.google.com/)

4. **Test locally:**
   - Run `netlify dev` and test contact form
   - Check browser console for any errors

5. **Check spam folder for test emails**d
4. Check spam folder for test emails

## 📄 License

© 2025 Naiem Ur Rahman Riyad. All rights reserved.