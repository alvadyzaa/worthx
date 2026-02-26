<div align="center">
  <img src="./frontend/public/favicon.svg" alt="WorthX Logo" width="100" height="100">
  <h1 align="center">WorthX • X Account Valuation</h1>

  <p align="center">
    <strong>Calculate the estimated price, engagement, and influence of your X (Twitter) account.</strong>
    <br />
    <br />
    <a href="https://worthx.pages.dev">View Demo</a>
    ·
    <a href="https://shadowbanchecker.pages.dev">Shadowban Checker</a>
  </p>
</div>

<br/>

![WorthX Preview](./preview.png "WorthX Dashboard")

<br/>

## ✨ Introduction

**WorthX** is a modern, premium web application built with React and Tailwind CSS that allows users to seamlessly estimate the value of their X (formerly Twitter) accounts.

By simply entering an X username, WorthX securely proxies public data (like followers and following), runs a deterministic algorithm to evaluate influence and engagement, and presents the results in a sleek, downloadable Valuation Card.

Whether you're an influencer tracking your worth, or just curious about your account's market value, WorthX provides an aesthetically pleasing, "Aura" style experience to find out.

---

## 🚀 Key Features

- 🌍 **Real-Time Data Integration** - Fetches live Twitter profile metadata (Avatar, Username, Name, Followers, Following, Verification Status, and Account Age) securely utilizing Shadowban API via `wsrv.nl` image proxies avoiding CORS restrictions.
- 🧠 **Deterministic Valuation Engine** - Predictable, non-random outputs. The engine utilizes a seeded hashing algorithm based on your `@username` to calculate Engagement Rate, Influence Tier, and Price, ensuring consistent results every time you check.
- 🎨 **Premium Glassmorphism UI** - Built with Tailwind CSS v4 and Framer Motion for incredibly smooth transitions, dark-mode-first aesthetic (with fully supported light mode), and responsive layout that works flawlessly on Mobile or PC.
- 📸 **Save & Share Your Card** - Want to flex your account's worth? Effortlessly download your generated Valuation Card as a high-quality PNG image thanks to `html-to-image` integration (powered natively to bypass `oklab` CSS errors). Web Share API is also supported for mobile sharing.
- ⚡ **Lightning Fast Deployments** - Built on Vite + React + TypeScript, specifically optimized for edge deployments like **Cloudflare Pages**.

---

## 📦 Local Development

To run this project locally, make sure you have [Node.js](https://nodejs.org/) installed, and follow these steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/worthx.git
   cd worthx/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or yarn install / pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 🌐 Deploy to Cloudflare Pages (CF Pages)

Deploying to Cloudflare is extremely fast using Wrangler or GitHub integration.

### Method 1: Using Wrangler CLI (Recommended for instant deploys)

Ensure you have your frontend built:

```bash
cd frontend
npm run build
```

Then deploy the `dist` folder directly:

```bash
npx wrangler pages deploy dist --project-name worthx
```

### Method 2: Connect Github to Cloudflare Dashboard

1. Push this repository to GitHub.
2. Go to your [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository.
4. Set the **Framework preset** to `Vite` (or specify build command: `npm run build` and output directory: `dist`).
5. Click **Save and Deploy**. Your site will be live instantly!

---

<br/>
<div align="center">
Made with ❤️ using React & Tailwind CSS. Not affiliated with X Corp.
</div>
