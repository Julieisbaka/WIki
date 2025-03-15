import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import { NodeData } from '../types/NodeTypes';

export class MarkdownParser {
  private static linkRegex = /\[(.*?)\]\((.*?)\)/g;

  static async parseDirectory(directoryPath: string): Promise<NodeData[]> {
    const files = await readdir(directoryPath);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    const nodes: NodeData[] = [];
    
    for (const file of markdownFiles) {
      const filePath = join(directoryPath, file);
      const content = await readFile(filePath, 'utf-8');
      
      const links = Array.from(content.matchAll(this.linkRegex))
        .map(match => match[2])
        .filter(link => link.endsWith('.md'))
        .map(link => link.replace('.md', ''));
      
      const preview = content.slice(0, 200) + '...';
      
      nodes.push({
        id: file.replace('.md', ''),
        title: file.replace('.md', ''),
        path: filePath,
        preview,
        links,
        x: 0,
        y: 0
      });
    }
    
    return nodes;
  }
}
