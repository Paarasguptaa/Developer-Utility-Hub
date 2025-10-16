import { useParams } from 'react-router-dom'

const docs = {
  'json-formatter': 'Paste JSON and validate/format it. Shows parse errors.',
  'jwt': 'Decode JWT header/payload. Optionally validate signature with secret/public key.',
  'base64': 'Encode any text to Base64 or decode Base64 back to text.',
  'regex': 'Test regular expressions against input text. Shows matches and groups.',
  'timestamp': 'Convert timestamps (epoch ms/s) to human dates and vice versa.',
  'url': 'URL-encode or decode text using encodeURIComponent/decodeURIComponent.',
  'code-formatter': 'Format HTML/CSS/JS using js-beautify with customizable options.',
  'color': 'Convert between HEX, RGB, and HSL color formats.',
  'diff': 'Compare two text inputs and visualize line differences.',
  'hash': 'Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512).',
}

export function ToolDocs() {
  const { toolId } = useParams()
  const text = docs[toolId] || 'Tool documentation not found.'
  return (
    <div>
      <h2>Documentation: {toolId}</h2>
      <p>{text}</p>
    </div>
  )
}