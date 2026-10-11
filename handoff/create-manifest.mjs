import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const output = path.join(root, 'handoff', 'FILE_INVENTORY.sha256');
const excluded = new Set([
  path.normalize(output),
  path.join(root, 'node_modules'),
  path.join(root, '.git'),
  path.join(root, '.netlify')
]);

function collect(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if ([...excluded].some(item => absolute === item || absolute.startsWith(item + path.sep))) continue;
    if (entry.isDirectory()) files.push(...collect(absolute));
    else files.push(absolute);
  }
  return files;
}

const lines = collect(root).sort().map(absolute => {
  const bytes = fs.readFileSync(absolute);
  const hash = crypto.createHash('sha256').update(bytes).digest('hex');
  const relative = path.relative(root, absolute).replaceAll(path.sep, '/');
  return `${hash}  ${relative}`;
});

fs.writeFileSync(output, lines.join('\n') + '\n', 'utf8');
console.log(`${lines.length} fichiers inventoriés dans handoff/FILE_INVENTORY.sha256`);
