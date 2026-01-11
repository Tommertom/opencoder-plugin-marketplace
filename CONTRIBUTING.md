# Contributing to OpenCode Plugin Marketplace

Thank you for your interest in contributing to the OpenCode Plugin Marketplace! This document provides step-by-step instructions for adding or updating plugins.

## How to Add a Plugin

### Step 1: Fork and Clone

1. **Fork this repository** by clicking the "Fork" button on GitHub
2. **Clone your fork** locally:

```bash
git clone https://github.com/YOUR_USERNAME/opencode-plugin-marketplace.git
cd opencode-plugin-marketplace
```

### Step 2: Create Your Plugin File

#### Option A: Use OpenCode AI Agent (Recommended)

If you have OpenCode installed, you can use the AI agent to automatically create your plugin file:

1. **Open your terminal** in the cloned repository directory
2. **Run OpenCode** with the following prompt:

```
Research the plugin at <url> and create a new plugin configuration in the plugins directory, using the schema in plugin.schema.json.
```

Replace `<url>` with your plugin's GitHub repository URL.

**Example**:
```
Research the plugin at https://github.com/yourusername/your-plugin-repo and create a new plugin configuration in the plugins directory, using the schema in plugin.schema.json.
```

The AI agent will:
- Analyze your plugin repository (README, package.json, etc.)
- Extract relevant information (name, description, authors, license)
- Generate a properly formatted `.plugin.json` file
- Place it in the `plugins/` directory with the correct filename
- Ensure it validates against the schema

#### Option B: Create Manually

1. **Navigate to the `plugins/` directory**
2. **Create a new file** named exactly: `your-plugin-name.plugin.json`
   - Use **lowercase** letters only
   - Use **hyphens** to separate words (no spaces or underscores)
   - Must end with `.plugin.json`
   - Example: `opencode-wakatime.plugin.json`

**Critical**: The filename must exactly match the `name` field inside the JSON (see Step 3).

### Step 3: Fill Out Required Fields

Copy this template into your new file and replace ALL placeholder values:

```json
{
  "name": "your-plugin-name",
  "displayName": "Your Plugin Display Name",
  "description": "A clear description of what your plugin does. Must be between 10-500 characters.",
  "categories": ["Development", "Utilities"],
  "authors": [
    {
      "name": "Your Name",
      "url": "https://github.com/yourusername"
    }
  ],
  "license": "MIT",
  "links": {
    "repository": "https://github.com/yourusername/your-plugin-repo"
  },
  "opencode": {
    "minimumVersion": "1.0.0"
  },
  "installation": {
    "summary": "Brief installation summary (10-200 characters)",
    "markdown": "## Installation\n\n```bash\nnpm install your-plugin\n```\n\nAdd to your OpenCode config:\n\n```json\n{\n  \"plugins\": [\"your-plugin\"]\n}\n```"
  },
  "maintained": true,
  "lastUpdated": "2026-01-11"
}
```

### Step 4: Understand Required vs Optional Fields

**Required Fields** (must be present):
- `name` - Lowercase, alphanumeric, hyphens only (must match filename)
- `displayName` - Human-readable name shown in marketplace
- `description` - 10-500 characters describing your plugin
- `categories` - Array with at least one category (see list below)
- `authors` - Array with at least one author object (`name` and `url`)
- `license` - License identifier (e.g., "MIT", "Apache-2.0", "GPL-3.0")
- `links.repository` - URL to your plugin's repository
- `opencode.minimumVersion` - Minimum OpenCode version (format: "X.Y.Z")
- `installation.summary` - Brief summary (10-200 characters)
- `installation.markdown` - Detailed installation instructions with Markdown
- `maintained` - `true` or `false`
- `lastUpdated` - Today's date in format: "YYYY-MM-DD"

**Optional Fields**:
- `links.homepage` - Plugin website URL
- `links.documentation` - Documentation URL  
- `opencode.maximumVersion` - Maximum compatible version
- `usage.markdown` - Usage instructions with Markdown

### Step 5: Choose Valid Categories

Select **one or more** categories from this exact list:
- `Development`
- `Productivity`
- `UI/UX`
- `Testing`
- `Debugging`
- `Documentation`
- `Integration`
- `Utilities`
- `Providers`
- `Other`

**Example**: `"categories": ["Productivity", "Integration"]`

### Step 6: Format Markdown Content

When writing `installation.markdown` and `usage.markdown`, use `\n` for newlines:

**Supported Markdown syntax**:
- Headings: `## Heading`, `### Subheading`
- Lists: `- Item` or `1. Item`  
- Code blocks: ` ```language\ncode\n``` `
- Links: `[text](url)`
- **Bold** (`**text**`) and *italic* (`*text*`)
- Raw HTML is not allowed (will be sanitized)

**Example**:
```json
"markdown": "## Installation\n\n```bash\nnpm install my-plugin\n```\n\nThen restart OpenCode."
```

### Step 8: Commit Your Plugin

```bash
# Add your plugin file
git add plugins/your-plugin-name.plugin.json

# Commit with descriptive message
git commit -m "Add your-plugin-name plugin"

# Push to your fork
git push origin main
```

### Step 9: Submit a Pull Request

1. Go to your fork on GitHub: `https://github.com/YOUR_USERNAME/opencode-plugin-marketplace`
2. Click the **"Contribute"** button, then **"Open pull request"**
3. **Title**: Use format: `Add [Your Plugin Display Name]`
4. **Description**: Briefly describe what your plugin does
5. Click **"Create pull request"**

---

## Updating an Existing Plugin

To update information for a plugin already in the marketplace:

### Step 1: Fork and Clone (if you haven't already)

```bash
git clone https://github.com/YOUR_USERNAME/opencode-plugin-marketplace.git
cd opencode-plugin-marketplace
```

### Step 2: Find and Edit the Plugin File

1. Navigate to `plugins/` directory
2. Find your plugin file: `your-plugin-name.plugin.json`
3. Make your changes

### Step 3: Update the Date

**Important**: Change `lastUpdated` to today's date:

```json
"lastUpdated": "2026-01-11"
```

### Step 4: Validate, Commit, and Submit PR

Follow the validation, commit, and PR steps above.

---

## Real-World Example

Here's a complete, real example from the marketplace:

**File**: `plugins/opencode-wakatime.plugin.json`

```json
{
  "name": "opencode-wakatime",
  "displayName": "OpenCode WakaTime",
  "description": "Track OpenCode usage with WakaTime - monitor coding time, track productivity metrics, and analyze your development patterns.",
  "categories": ["Productivity", "Integration"],
  "authors": [
    {
      "name": "angristan",
      "url": "https://github.com/angristan"
    }
  ],
  "license": "MIT",
  "links": {
    "repository": "https://github.com/angristan/opencode-wakatime"
  },
  "opencode": {
    "minimumVersion": "1.0.0"
  },
  "installation": {
    "summary": "Install via npm and configure with your WakaTime API key to start tracking.",
    "markdown": "## Installation\n\n```bash\nnpm install opencode-wakatime\n```\n\nAdd to your OpenCode config:\n\n```json\n{\n  \"plugins\": [\"opencode-wakatime\"]\n}\n```\n\nConfigure your WakaTime API key in the settings.\n\nRestart OpenCode to begin tracking."
  },
  "usage": {
    "markdown": "## Usage\n\nOnce installed and configured:\n\n### Features\n\n- **Automatic Tracking**: All OpenCode sessions tracked automatically\n- **Detailed Metrics**: Time spent per project, language, and file\n"
  },
  "maintained": true,
  "lastUpdated": "2026-01-11"
}
```

---

## Schema Reference

All plugins must validate against `schema/plugin.schema.json`.

### Complete Field Reference

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | string | ✅ | Lowercase, alphanumeric, hyphens only |
| `displayName` | string | ✅ | At least 1 character |
| `description` | string | ✅ | 10-500 characters |
| `categories` | array | ✅ | At least 1 valid category |
| `authors` | array | ✅ | At least 1 author with `name` and `url` |
| `license` | string | ✅ | SPDX license identifier |
| `links.repository` | string | ✅ | Valid URI |
| `links.homepage` | string | ❌ | Valid URI |
| `links.documentation` | string | ❌ | Valid URI |
| `opencode.minimumVersion` | string | ✅ | Semver format: "X.Y.Z" |
| `opencode.maximumVersion` | string | ❌ | Semver format: "X.Y.Z" |
| `installation.summary` | string | ✅ | 10-200 characters |
| `installation.markdown` | string | ✅ | At least 10 characters |
| `usage.markdown` | string | ❌ | Markdown content |
| `maintained` | boolean | ✅ | `true` or `false` |
| `lastUpdated` | string | ✅ | Format: "YYYY-MM-DD" |

---

## Getting Help

- **Questions?** Open an issue on [GitHub](https://github.com/Tommertom/opencoder-marketplace-vibed/issues)
- **Found a bug?** Report it on GitHub
- **Need clarification?** Ask in the issue tracker

## Code of Conduct

- Be respectful and constructive
- Provide accurate information about your plugin
- Keep your plugin information up to date
- We're all here to build great tools together!
