import Anthropic from '@anthropic-ai/sdk'

export function getAnthropicClient(): Anthropic {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) throw new Error('ANTHROPIC_API_KEY ist nicht gesetzt')
  return new Anthropic({ apiKey: key })
}
