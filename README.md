# Levenshtein Distance Calculator

## How can I edit this code?

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### GitHub Pages (Automatic Deployment)

This project is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages:**
   - Go to your repository on GitHub: `https://github.com/Baraa282/levenshtein-lens`
   - Click on **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

2. **Automatic Deployment:**
   - Every time you push to the `main` branch, GitHub Actions will automatically build and deploy your site
   - Your site will be available at: `https://baraa282.github.io/levenshtein-lens/`

3. **Manual Deployment (if needed):**
   ```sh
   npm run build
   # The dist folder will contain your built files
   ```

### Other Hosting Options

You can also deploy this project using:
- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder or connect your GitHub repo
- **Any static hosting service**: Upload the contents of the `dist` folder after running `npm run build`
