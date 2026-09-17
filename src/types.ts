export interface PluginFile {
  name: string;
  content: string;
  language: string;
}

export interface PluginData {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
  type: 'movie' | 'anime' | 'tv';
  icon: string;
  files: PluginFile[];
}
