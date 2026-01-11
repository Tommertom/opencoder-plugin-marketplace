# OpenCode Plugin Manager Command

This directory contains the `/plugin` custom command for OpenCode.

## What is this?

The `plugin.md` file defines a custom slash command that allows you to manage OpenCode plugins from the OpenCode Plugin Marketplace directly from your terminal.

## Installation

See the main [README.md](../README.md) for installation instructions.

## What does it do?

The `/plugin` command provides four subcommands for managing OpenCode Plugin Marketplace plugins:

### `/plugin list`
Lists all available plugins in the marketplace with their:
- Display name and description
- Categories
- Installability status (⚡ = installable, 📦 = manual install only)

### `/plugin install <name>`
Installs a plugin from the marketplace to your local `.opencode/` directory.

**Requirements:**
- Plugin must be marked with `installableFromMarketplace: true`
- Automatically clones repositories and copies necessary files
- Updates `opencode.json` if needed

### `/plugin create <name>`
Scaffolds a new plugin with boilerplate code.

**Features:**
- Validates plugin name format
- Creates TypeScript tool plugins (`.ts` files)
- Creates Markdown command plugins (`.md` files)
- Generates proper file structure in `.opencode/`

### `/plugin remove <name>`
Removes an installed plugin.

**Safety:**
- Shows what will be deleted
- Requires "yes" confirmation
- Updates `opencode.json` configuration
- Provides verbose error messages

## Technical Details

- **Type:** Custom OpenCode command (Markdown-based)
- **Agent:** Uses the `general` agent
- **Location:** Should be placed in `~/.config/opencode/command/` or `.opencode/command/`
- **Format:** Markdown file with YAML frontmatter

## How it works

1. User types `/plugin <subcommand>`
2. OpenCode reads the `plugin.md` file
3. The AI agent receives instructions from the markdown content
4. Agent executes the appropriate workflow (install/create/remove/list)
5. Agent uses tools like WebFetch, Bash, Read, Write to complete the task

## Customization

You can modify `plugin.md` to:
- Change default installation behavior
- Add new subcommands
- Customize error messages
- Adjust confirmation prompts

## Marketplace Integration

This command integrates with the OpenCode Plugin Marketplace:
- **API Endpoint:** `https://api.github.com/repos/Tommertom/opencode-plugin-marketplace/contents/plugins`
- **Plugin Schema:** `schema/plugin.schema.json`
- **Installable Flag:** Respects `installableFromMarketplace` field

## Documentation

- [OpenCode Commands Docs](https://opencode.ai/docs/commands)
- [OpenCode Custom Tools Docs](https://opencode.ai/docs/custom-tools)
- [Marketplace Website](https://opencode-plugin-market.web.app)