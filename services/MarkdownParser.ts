import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { NodeData } from '../types/NodeTypes';

const readFileAsync = promisify(fs.readFile);
const readdirAsync = promisify(fs.readdir);

export class MarkdownParser {
  private static linkRegex = /\[(.*?)\]\((.*?)\)/g;

  static async parseDirectory(directoryPath: string): Promise<NodeData[]> {
    const files = await readdirAsync(directoryPath);
    const markdownFiles = files.filter((file: string) => file.endsWith('.md'));
    
    const nodes: NodeData[] = [];
    
    for (const file of markdownFiles) {
      const filePath = path.join(directoryPath, file);
      const content = await readFileAsync(filePath, 'utf-8');
      
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
