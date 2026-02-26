# 🎨 JobConcierge Frontend (React / Vite)

This is the user interface for the JobConcierge application. It is built using React and Vite. 
This is a **static frontend**, meaning once it is built, it is just plain HTML, CSS, and JavaScript.

## 🛠 Local Development
To run this project on your local machine:
1. Open the terminal in this folder.
2. Run `npm install` to download dependencies.
3. Create a `.env` file in the root directory and add the backend API URL:
   \`\`\`env
   VITE_API_URL="http://127.0.0.1:3001"
   \`\`\`
4. Run `npm run dev` to start the local server.

## 🚀 Production Build (For Deployment)
When you are ready to put this on the live server (like Namecheap, Vercel, or Netlify):

1. **Update the Environment Variable:** Open the `.env` file and change the API URL to the LIVE backend URL:
   \`\`\`env
   VITE_API_URL="https://api.your-live-domain.com"
   \`\`\`
2. **Generate the Build:** Run this command:
   \`\`\`bash
   npm run build
   \`\`\`
3. **The Output:** Vite will create a new folder called **`dist`**. 
4. **Deploy:** Take the contents of that `dist` folder and upload them directly to your public HTML folder (e.g., `public_html`) on Namecheap.