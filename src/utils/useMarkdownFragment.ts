// src/utils/useMarkdownFragment.ts
import { marked } from 'marked'

export async function useMarkdownFragment(path: string) {
  const raw = await fetch(path).then(res => res.text())

  const frontmatterRegex = /^---\n([\s\S]*?)\n---/
  const match = raw.match(frontmatterRegex)

  let meta = {}
  let content = raw

  if (match) {
    const yaml = match[1]
    meta = parseYaml(yaml)
    content = raw.replace(frontmatterRegex, '').trim()
  }

  const html = marked(content)
  return { meta, html }
}

function parseYaml(str: string) {
  const lines = str.split('\n')
  const result: Record<string, any> = {}

  for (const line of lines) {
    const [key, ...rest] = line.split(':')
    result[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '')
  }

  return result
}