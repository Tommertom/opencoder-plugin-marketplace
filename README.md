# OpenCode Plugin Marketplace

A community-driven marketplace for discovering and sharing OpenCode plugins.

## 🌟 Features

- **Browse Plugins**: Explore plugins by category
- **Detailed Information**: View installation instructions, usage examples, and documentation
- **Community-Driven**: Anyone can contribute via Pull Requests
- **Validated Submissions**: Automatic JSON schema validation ensures quality
- **Fast & Static**: Built with SolidJS and hosted on Firebase

## 🚀 Live Site

Visit the marketplace at: `https://your-firebase-project.web.app`

## 📦 Project Structure

```
opencode-plugin-marketplace/
├── web/                     # SolidJS frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── data/            # Plugin data loader and types
│   │   ├── App.tsx          # Main application component
│   │   └── App.css          # Styles
│   ├── vite.config.ts       # Vite configuration
│   └── package.json
├── plugins/                 # Plugin JSON files (one per plugin)
│   └── *.plugin.json
├── schema/                  # JSON Schema for validation
│   └── plugin.schema.json
├── scripts/                 # Validation scripts
│   ├── validate-plugins.js
│   └── package.json
├── .github/workflows/       # CI/CD pipelines
│   ├── validate.yml         # PR validation
│   └── deploy.yml           # Deploy to Firebase
├── firebase.json            # Firebase Hosting config
├── CONTRIBUTING.md          # Contribution guidelines
└── README.md
```

## 🤝 Contributing a Plugin

Want to add your plugin to the marketplace? It's easy!

### Quick Start

1. **Fork this repository**

2. **Create a plugin JSON file** in the `plugins/` directory:
   - Filename: `your-plugin-name.plugin.json`
   - Must match the `name` field in the JSON

3. **Fill out the required information** (see schema below)

4. **Submit a Pull Request**
   - Our CI will automatically validate your submission
   - Once approved, your plugin appears on the marketplace

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions.

### Plugin JSON Example

```json
{
  "name": "example-plugin",
  "displayName": "Example Plugin",
  "description": "A demonstration plugin for the marketplace.",
  "categories": ["Development", "Utilities"],
  "authors": [
    {
      "name": "John Doe",
      "url": "https://github.com/johndoe"
    }
  ],
  "license": "MIT",
  "links": {
    "repository": "https://github.com/example/example-plugin",
    "homepage": "https://example.com",
    "documentation": "https://docs.example.com"
  },
  "opencode": {
    "minimumVersion": "1.0.0"
  },
  "installation": {
    "summary": "Install via npm and configure in settings.",
    "markdown": "## Installation\n\n```bash\nnpm install example-plugin\n```"
  },
  "maintained": true,
  "lastUpdated": "2026-01-10"
}
```

## 🛠️ Local Development

### Prerequisites

- Node.js 20+
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/opencode-plugin-marketplace.git
   cd opencode-plugin-marketplace
   ```

2. **Install web dependencies**
   ```bash
   cd web
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser** to `http://localhost:5173`

### Validating Plugins Locally

```bash
cd scripts
npm install
npm run validate
```

### Building for Production

```bash
cd web
npm run build
```

Output will be in `web/dist/`

## 🔧 Firebase Setup

### First-Time Setup

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory to `web/dist`
   - Configure as single-page app: Yes
   - Don't overwrite index.html

4. **Deploy manually**
   ```bash
   cd web
   npm run build
   cd ..
   firebase deploy --only hosting
   ```

### GitHub Actions Deployment

To enable automatic deployment on merge to `main`:

1. **Generate Firebase service account key**
   ```bash
   firebase init hosting:github
   ```
   Follow prompts to connect your GitHub repository

2. **Add secrets to GitHub**
   - `FIREBASE_SERVICE_ACCOUNT` - Service account JSON
   - `FIREBASE_PROJECT_ID` - Your Firebase project ID

The `.github/workflows/deploy.yml` workflow will automatically deploy on push to `main`.

## 📋 JSON Schema

All plugin submissions must validate against `schema/plugin.schema.json`.

### Required Fields

- `name` - Unique plugin identifier (lowercase, alphanumeric, hyphens)
- `displayName` - Human-readable name
- `description` - 10-500 characters
- `categories` - Array of categories
- `authors` - Array with name and URL
- `license` - SPDX license identifier
- `links.repository` - Git repository URL
- `opencode.minimumVersion` - Minimum OpenCode version (semver)
- `installation.summary` - Brief summary (10-200 chars)
- `installation.markdown` - Detailed instructions (Markdown)
- `maintained` - Boolean for maintenance status
- `lastUpdated` - Date in YYYY-MM-DD format

### Optional Fields

- `links.homepage` - Plugin website
- `links.documentation` - Docs URL
- `opencode.maximumVersion` - Max compatible version
- `usage.markdown` - Usage guide (Markdown)

### Available Categories

- Development
- Productivity
- UI/UX
- Testing
- Debugging
- Documentation
- Integration
- Utilities
- AI/ML
- Other

## 🤖 CI/CD

### Pull Request Validation (`.github/workflows/validate.yml`)

Triggered on PRs that modify plugin JSON files:
- Validates all plugins against JSON schema
- Checks filename matches plugin name
- Prevents duplicate plugin names
- Fails PR if validation errors found

### Automatic Deployment (`.github/workflows/deploy.yml`)

Triggered on merge to `main`:
- Builds SolidJS application
- Deploys to Firebase Hosting
- Site updates automatically

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

## 🙋 Support

- **Issues**: [GitHub Issues](https://github.com/your-org/opencode-plugin-marketplace/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/opencode-plugin-marketplace/discussions)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)

## 🌟 Acknowledgments

Built with:
- [SolidJS](https://www.solidjs.com/) - Reactive UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Firebase Hosting](https://firebase.google.com/docs/hosting) - Static hosting
- [solid-markdown](https://github.com/andi23rosca/solid-markdown) - Markdown rendering
- [Ajv](https://ajv.js.org/) - JSON Schema validation

---

**Made with ❤️ by the OpenCode community**
# opencoder-marketplace-vibed
