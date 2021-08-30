import { exec as _exec } from 'child_process';
import { promisify } from 'util';

const exec = promisify(_exec);

export interface MetadataEntry {
  group: string;
  id: number | undefined;
  tag: string;
  value: string;
}

const parseOutput = (out: string): MetadataEntry[] =>
  out
    .split(/[\r\n]+/)
    .map(l => {
      const sepIndex = l.indexOf(':');
      if (sepIndex < 1) {
        return undefined;
      }
      const match = /\[([A-Za-z]+)\]\s+([0-9\-]+)\s(.+)/.exec(l.substring(0, sepIndex));
      if (!match || match.length !== 4) {
        return undefined;
      }
      return {
        group: match[1],
        id: match[2] === '-' ? undefined : Number(match[2]),
        tag: match[3].trim(),
        value: l.substring(sepIndex + 1).trim(),
      };
    })
    .filter(e => !!e) as MetadataEntry[];

export const readMetadata = async (file: string): Promise<MetadataEntry[]> => {
  try {
    const { stdout, stderr } = await exec(`exiftool.exe -D -G ${file}`, { cwd: './bin' });
    if (stderr) {
      console.error(stderr);
      return [];
    }
    return parseOutput(stdout);
  } catch (err) {
    console.error('error: ' + err);
    return [];
  }
};
