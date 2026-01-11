import { createSignal, For, Show } from 'solid-js';
import { plugins, categories } from './data/plugins';
import { PluginTile } from './components/PluginTile';
import { PluginDetail } from './components/PluginDetail';
import type { Plugin } from './data/types';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = createSignal<string>('all');
  const [selectedPlugin, setSelectedPlugin] = createSignal<Plugin | null>(null);

  const filteredPlugins = () => {
    const category = selectedCategory();
    if (category === 'all') return plugins;
    return plugins.filter(p => p.categories.includes(category));
  };

  const openPlugin = (plugin: Plugin) => {
    setSelectedPlugin(plugin);
  };

  const closePlugin = () => {
    setSelectedPlugin(null);
  };

  return (
    <div class="app">
      <header class="header">
        <h1>OpenCode Plugin Marketplace</h1>
        <p>Discover and contribute plugins for OpenCode</p>
        <p class="disclaimer">
          <small>
            This is an independent, community-driven project and is not affiliated with, endorsed by, or officially connected to OpenCode (opencode.ai) or Anomaly Co.
          </small>
        </p>
      </header>

      <div class="container">
        <aside class="sidebar">
          <h2>Categories</h2>
          <ul class="category-list">
            <li>
              <button
                class={selectedCategory() === 'all' ? 'active' : ''}
                onClick={() => setSelectedCategory('all')}
              >
                All Plugins ({plugins.length})
              </button>
            </li>
            <For each={categories}>
              {(category) => {
                const count = plugins.filter(p => p.categories.includes(category)).length;
                return (
                  <li>
                    <button
                      class={selectedCategory() === category ? 'active' : ''}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category} ({count})
                    </button>
                  </li>
                );
              }}
            </For>
          </ul>
        </aside>

        <main class="main">
          <Show
            when={filteredPlugins().length > 0}
            fallback={<p class="no-results">No plugins found in this category.</p>}
          >
            <div class="plugin-grid">
              <For each={filteredPlugins()}>
                {(plugin) => (
                  <PluginTile
                    plugin={plugin}
                    onClick={() => openPlugin(plugin)}
                  />
                )}
              </For>
            </div>
          </Show>
        </main>
      </div>

      <Show when={selectedPlugin()}>
        <PluginDetail
          plugin={selectedPlugin()!}
          onClose={closePlugin}
        />
      </Show>

      <div class="footer-spacer"></div>
      <footer class="footer">
        <p>
          Want to contribute? Visit our{' '}
          <a href="https://github.com/your-org/opencode-plugin-marketplace" target="_blank" rel="noopener noreferrer">
            GitHub repository
          </a>{' '}
          and submit a PR with your plugin JSON file.
        </p>
        <p class="footer-disclaimer">
          This is an independent, community-driven project and is not affiliated with, endorsed by, or officially connected to OpenCode (opencode.ai) or Anomaly Co.
        </p>
      </footer>
    </div>
  );
}

export default App;
