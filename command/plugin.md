---
description: Manage OpenCode plugins (install, create, remove)
agent: general
---

You are helping the user manage OpenCode plugins.

## Parse the user's command

The user invoked: `/plugin $ARGUMENTS`

First argument (subcommand): **$1**
Plugin name (if provided): **$2**

## Available Subcommands

- **install [-g] <name>** - Install a plugin from the OpenCode Plugin Marketplace (use -g for global installation to ~/.config/opencode/)
- **create <name>** - Scaffold a new plugin with boilerplate code
- **remove <name>** - Remove an installed plugin
- **list** - List all available plugins in the marketplace

---

## IMPORTANT: Follow these instructions based on the subcommand

### If $1 is "install"

**Goal**: Install a plugin from the marketplace to the local project or globally (if -g is used).

1. **Detect Installation Target**:
   - Check if the command includes the `-g` flag or any other intent to install the plugin globally.
   - If `-g` is present:
     - Target directory: `~/.config/opencode/` (resolve `~` to the user's home directory)
     - Config file: `~/.config/opencode/opencode.json`
   - Else (default):
     - Target directory: `./.opencode/` (current working directory)
     - Config file: `./opencode.json`

2. **Fetch marketplace plugins**:
   - Use WebFetch to load the plugin list from GitHub API:
     `https://api.github.com/repos/anomalyco/opencode-plugin-marketplace/contents/plugins`
   - This returns a JSON array of files in the plugins directory
   - Look for files ending in `.plugin.json`

3. **Find matching plugin**:
   - Search for a plugin file named `$2.plugin.json`
   - If not found, show available plugins and ask the user to clarify
   - If found, fetch the full plugin JSON file using the `download_url` from the API response

4. **Check if installable**:
   - Check if the plugin has `installableFromMarketplace: true`
   - If not present or false, inform the user:
     "This plugin is not marked as installable via the /plugin command. Please follow the manual installation instructions from the marketplace website."
   - Then stop processing

5. **Parse installation instructions**:
   - Extract the `installation.markdown` field
   - Parse it carefully to understand the installation steps
   - Common patterns include:
     - `git clone <repository>`
     - `npm install <package>`
     - `cp -r .opencode ./` or similar file copying
     - Configuration in `opencode.json`

6. **Create target directory**:
   - Ensure the target plugin directory exists:
     - Local: `.opencode/plugin/` and `.opencode/command/` in the CWD.
     - Global: `~/.config/opencode/plugin/` and `~/.config/opencode/command/` in the home directory.

7. **Execute installation steps**:
   - If installation requires git clone:
     - Clone to a temporary directory
     - Copy the `.opencode` folder from the cloned repo to the targeted `.opencode/` or `~/.config/opencode/` directory.
     - Remove the temporary clone directory
   - If installation requires npm install:
     - Check if the package is an npm package
     - If so, inform the user to add it to their `opencode.json` config manually
   - Copy any necessary files to `.opencode/plugin/` or `.opencode/command/`

8. **Update opencode.json if needed**:
   - Check if the targeted `opencode.json` exists.
   - If not, create it with the basic structure:

     ```json
     {
       "$schema": "https://opencode.ai/config.json"
     }
     ```

   - If the plugin requires being added to the config (check installation instructions), add it to the `plugin` array
   - Be very careful with JSON formatting - ensure valid JSON

9. **Verify installation**:
   - List the files that were created/copied
   - Confirm success to the user
   - Remind the user: "Installation complete! Please restart OpenCode for changes to take effect."

**Error handling**:

- If network requests fail: "Failed to fetch plugin information. Please check your internet connection."
- If plugin not found: "Plugin '$2' not found. Use `/plugin list` to see available plugins."
- If git/npm commands fail: Show the error verbosely and explain what went wrong
- Always provide clear, actionable error messages

---

### If $1 is "create"

**Goal**: Scaffold a new plugin with boilerplate code in the local project.

1. **Validate plugin name**:
   - Ensure $2 is provided
   - Validate: lowercase, alphanumeric, hyphens only (regex: `^[a-z0-9-]+$`)
   - If invalid, explain:
     "Plugin name must be lowercase, alphanumeric characters and hyphens only.
     Examples: my-plugin, opencode-helper, custom-tool-123"
   - Ask for a valid name and wait for user input

2. **Check if plugin already exists**:
   - Check if `.opencode/plugin/$2.ts` or `.opencode/command/$2.md` already exists
   - If yes, ask: "A plugin with this name already exists. Overwrite? (yes/no)"
   - If no, abort

3. **Ask user about plugin type**:
   - "What type of plugin would you like to create?
     1. Tool plugin (TypeScript - adds custom tools for the agent)
     2. Command plugin (Markdown - adds custom slash commands)
     3. Both (tool + command)

     Enter 1, 2, or 3:"
   - Wait for user input

4. **Create directory structure**:
   - Default to local installation: `.opencode/` in current working directory
   - Create the directories if they don't exist:
     - `.opencode/plugin/` (for tool plugins)
     - `.opencode/command/` (for command plugins)

5. **For tool plugins** (option 1 or 3), create `.opencode/plugin/$2.ts`:

   ```typescript
   /**
    * $2 plugin for OpenCode
    * 
    * This plugin provides custom tools for the OpenCode agent.
    */

   export function setup(mcp: any) {
     // Example tool - replace with your own logic
     mcp.tool({
       name: '$2_example',
       description: 'Example tool for the $2 plugin',
       parameters: {
         type: 'object',
         properties: {
           input: {
             type: 'string',
             description: 'Input parameter for the tool'
           }
         },
         required: ['input']
       },
       execute: async ({ input }: { input: string }) => {
         // Add your tool logic here
         return {
           success: true,
           result: `Processed: ${input}`
         };
       }
     });

     // Add more tools as needed
   }
   ```

6. **For command plugins** (option 2 or 3), create `.opencode/command/$2.md`:

   ```markdown
   ---
   description: Description of what the /$2 command does
   agent: general
   ---

   Instructions for the AI agent when this command is invoked.

   ## Task

   Describe what the agent should do when the user runs `/$2`.

   ## Steps

   1. First step
   2. Second step
   3. Third step

   ## Example

   Provide an example of what this command accomplishes.
   ```

7. **Provide next steps to user**:

   ```
   ✅ Plugin scaffolded successfully!

   Created files:
   - .opencode/plugin/$2.ts (if tool plugin)
   - .opencode/command/$2.md (if command plugin)

   Next steps:
   1. Edit the generated files to implement your plugin logic
   2. For tool plugins: Implement the `execute` function in the TypeScript file
   3. For command plugins: Update the markdown file with agent instructions
   4. Restart OpenCode to load the plugin
   5. Test your plugin with: /$2 (for commands) or by invoking the tool

   Documentation:
   - Tools: https://opencode.ai/docs/custom-tools
   - Commands: https://opencode.ai/docs/commands
   ```

**Error handling**:

- If directory creation fails: "Failed to create directories. Please check file permissions."
- If file write fails: Show verbose error with full path and system error message
- Always provide clear, actionable error messages

---

### If $1 is "remove"

**Goal**: Remove an installed plugin from the local project.

1. **Validate plugin name**:
   - Ensure $2 is provided
   - If not: "Please specify a plugin name: `/plugin remove <name>`"

2. **Search for plugin files**:
   - Look in local locations:
     - `.opencode/plugin/$2.ts`
     - `.opencode/plugin/$2.js`
     - `.opencode/command/$2.md`
   - Also check for directories:
     - `.opencode/plugin/$2/` (entire folder)
   - Create a list of all found files/directories

3. **If no files found**:
   - "Plugin '$2' not found in this project. No files to remove."
   - Stop processing

4. **Show what will be removed**:
   - Display a clear list:

     ```
     The following files/directories will be removed:
     - .opencode/plugin/$2.ts
     - .opencode/command/$2.md
     
     Total: 2 items
     ```

5. **Require confirmation**:
   - Ask: "Are you sure you want to remove these files? This cannot be undone. (yes/no)"
   - Wait for user input
   - Only proceed if user types "yes" (case-insensitive)
   - If "no" or anything else: "Removal cancelled. No files were deleted."

6. **Remove the files**:
   - Delete each file/directory found
   - Use `rm -f` for files and `rm -rf` for directories
   - Track which deletions succeed

7. **Check and update opencode.json**:
   - If `opencode.json` exists in the current directory, read it
   - Check if the plugin is referenced in the `plugin` array
   - If found, offer to remove it:
     "The plugin is also referenced in opencode.json. Remove it? (yes/no)"
   - If yes, remove the entry and save the file with proper JSON formatting

8. **Report results**:

   ```
   ✅ Plugin '$2' removed successfully!

   Removed files:
   - .opencode/plugin/$2.ts ✓
   - .opencode/command/$2.md ✓

   Updated:
   - opencode.json (removed plugin reference)

   Note: Restart OpenCode for changes to take effect.
   ```

**Error handling**:

- If file deletion fails: Show verbose error with file path and system error message
- If opencode.json parsing fails: "Failed to parse opencode.json. Please update manually."
- Always provide clear, actionable error messages

---

### If $1 is "list"

**Goal**: List all available plugins in the marketplace.

1. **Fetch marketplace plugins**:
   - Use WebFetch to load: `https://api.github.com/repos/anomalyco/opencode-plugin-marketplace/contents/plugins`
   - Parse the JSON response to get all `.plugin.json` files

2. **Fetch plugin details**:
   - For each plugin file, fetch its content using the `download_url`
   - Parse the JSON to extract: name, displayName, description, categories, installableFromMarketplace

3. **Display the list**:
   - Format as a readable table or list:

     ```
     Available OpenCode Plugins:
     
     ⚡ opencode-context-analysis
        Context Analysis - Detailed token usage analysis
        Categories: Productivity
        Installable: Yes
     
     📦 micode
        micode - Structured workflow plugin
        Categories: Productivity
        Installable: No (manual installation required)
     
     ...
     ```

   - Mark installable plugins with ⚡
   - Mark non-installable plugins with 📦

4. **Provide usage hints**:

   ```
   To install a plugin: /plugin install <name>
   To create a new plugin: /plugin create <name>
   
   View more details: https://opencode.ai/plugins
   ```

**Error handling**:

- If network request fails: "Failed to fetch plugin list. Please check your internet connection."
- Show partial results if some plugins fail to load

---

### If $1 is empty or unrecognized

Show usage information:

```
OpenCode Plugin Manager

Usage: /plugin <subcommand> [arguments]

Subcommands:
  install <name>  Install a plugin from the marketplace
  create <name>   Create a new plugin with scaffolding
  remove <name>   Remove an installed plugin
  list            List all available plugins

Examples:
  /plugin install opencode-context-analysis
  /plugin install -g opencode-context-analysis (Global installation)
  /plugin create my-custom-plugin
  /plugin remove my-custom-plugin
  /plugin list

For more information: https://opencode.ai/plugins
```

---

## General Guidelines

- **Be verbose with errors**: Show full error messages, file paths, and system errors
- **Confirm destructive actions**: Always require "yes" confirmation for deletions
- **Update opencode.json carefully**: Always validate JSON before saving
- **Provide clear feedback**: Show what was done, what files were affected
- **Include next steps**: Tell the user what to do after the operation completes
- **Handle network failures gracefully**: Provide helpful error messages
- **Default to local installation**: Use `.opencode/` in the current directory unless `-g` is specified.
