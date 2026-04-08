---
name: image-generation
description: "AI image generation integration for Discord bots and websites using Hugging Face MCP, Replicate API, Stability AI, and fal.ai. Use when: adding image generation to Discord bots, creating bot avatar generator commands, background generation, profile card generators, AI art commands, banner generation, meme generators, upscaling images, bot commands that produce AI images, integrating Hugging Face models, Stable Diffusion, FLUX, DALL-E, Midjourney-style prompting, image-to-image, inpainting, ControlNet, image upscaling for bots or websites. Triggers: generate image, AI art, Stable Diffusion, FLUX, Hugging Face, Replicate, image generation, avatar generator, bot art, image command, profile card, banner generate, fal.ai, dalle."
argument-hint: "Describe the image generation feature (e.g. 'Discord bot command /generate that makes AI art with FLUX')"
---

# Image Generation Skill

## When to Use
- Building `/generate`, `/avatar`, `/banner`, `/pfp` Discord bot commands
- Adding AI image generation to a website or bot dashboard
- Integrating Hugging Face MCP tools for image generation in agent workflows
- Model selection guide (FLUX vs SD vs DALL-E)
- Prompt engineering for consistent aesthetic output

## Provider Comparison

| Provider | Model | Speed | Quality | Free Tier | Best For |
|---|---|---|---|---|---|
| Hugging Face MCP | FLUX.1-schnell | Fast | Excellent | Yes (limited) | Bot commands, quick gen |
| Hugging Face MCP | Stable Diffusion 3.5 | Medium | High | Yes (limited) | Art quality |
| Replicate | FLUX Pro/Dev | Medium | Excellent | Pay-per-use | Production bots |
| fal.ai | FLUX schnell | Very fast | Excellent | Pay-per-use | High-volume bots |
| Stability AI | SD3-Ultra | Medium | High | Pay-per-use | Fine-tuned styles |
| OpenAI (DALL-E 3) | dall-e-3 | Medium | High | Pay-per-use | Safe content bots |

## Using Hugging Face MCP (Agent-Native)

When working in a GitHub Copilot + Claude agent context, use the Hugging Face MCP tools directly:

```
// In agent workflow — use mcp_huggingface_h_gr1_z_image_turbo_generate
// This generates images using FLUX-turbo directly from the agent

Tool: mcp_huggingface_h_gr1_z_image_turbo_generate
Input: { prompt: "your prompt here", width: 1024, height: 1024 }
```

For searching available models:
```
Tool: mcp_huggingface_h_hub_repo_search
Params: { search: "text-to-image", filter: "task_categories:text-to-image" }
```

## Discord Bot Image Generation Command

### Setup
```bash
npm install @huggingface/inference replicate form-data sharp
```

```env
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxx
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxx
FAL_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### Command Pattern (`/generate`)
```typescript
import { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } from 'discord.js';
import { generateImage } from '../../services/imageGen.js';
import { Colors } from '../../utils/colors.js';
import { errorEmbed } from '../../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('generate')
  .setDescription('Generate an AI image with FLUX')
  .addStringOption(opt =>
    opt.setName('prompt').setDescription('What to generate').setRequired(true).setMaxLength(500)
  )
  .addStringOption(opt =>
    opt.setName('style')
      .setDescription('Art style preset')
      .addChoices(
        { name: 'Realistic', value: 'realistic' },
        { name: 'Anime', value: 'anime' },
        { name: 'Pixel Art', value: 'pixel' },
        { name: 'Cinematic', value: 'cinematic' },
      )
  );

export async function execute(interaction) {
  await interaction.deferReply();

  const prompt = interaction.options.getString('prompt', true);
  const style = interaction.options.getString('style') ?? 'realistic';

  // Validate prompt (no NSFW keywords)
  if (containsNSFW(prompt)) {
    return interaction.editReply({ embeds: [errorEmbed('That prompt is not allowed.')] });
  }

  try {
    const imageBuffer = await generateImage(prompt, style);
    const attachment = new AttachmentBuilder(imageBuffer, { name: 'generated.png' });

    const embed = new EmbedBuilder()
      .setTitle('🎨 Generated Image')
      .setDescription(`**Prompt:** ${prompt}`)
      .setImage('attachment://generated.png')
      .setColor(Colors.PRIMARY)
      .setFooter({ text: `Style: ${style} • Powered by FLUX` })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed], files: [attachment] });
  } catch (err) {
    await interaction.editReply({ embeds: [errorEmbed('Generation failed. Try a different prompt.')] });
  }
}
```

### Image Generation Service (`src/services/imageGen.ts`)
```typescript
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const STYLE_PREFIXES: Record<string, string> = {
  realistic: 'hyperrealistic photo, 8k, detailed, professional photography,',
  anime: 'anime art style, by studio ghibli, vibrant colors, cel shaded,',
  pixel: 'pixel art, 16-bit style, retro game art,',
  cinematic: 'cinematic film still, dramatic lighting, movie quality,',
};

const NEGATIVE_PROMPT = 'nsfw, explicit, blurry, low quality, watermark, text, logo';

export async function generateImage(
  prompt: string,
  style: string = 'realistic'
): Promise<Buffer> {
  const styledPrompt = `${STYLE_PREFIXES[style] ?? ''} ${prompt}`.trim();

  const blob = await hf.textToImage({
    model: 'black-forest-labs/FLUX.1-schnell',
    inputs: styledPrompt,
    parameters: {
      negative_prompt: NEGATIVE_PROMPT,
      width: 1024,
      height: 1024,
      num_inference_steps: 4,
    },
  });

  return Buffer.from(await blob.arrayBuffer());
}
```

## Prompt Engineering Guide

### Structure
```
[Style prefix], [Subject], [Action/Pose], [Setting/Background], [Lighting], [Quality tags]
```

### Quality Boosters
```
masterpiece, best quality, ultra detailed, sharp focus, professional
```

### Style Modifiers by Use Case
| Use Case | Prompt Addition |
|---|---|
| Profile Picture | `portrait, facing camera, neutral background, studio lighting` |
| Server Banner | `wide landscape, panoramic, 16:9 aspect ratio` |
| Emoji/Icon | `simple icon design, flat style, white background, centered` |
| Anime Avatar | `anime portrait, detailed face, solo, upper body` |
| Realistic Person | `photorealistic, DSLR photo, bokeh background` |

### NSFW Filter (Required for Public Bots)
```typescript
const BLOCKED_TERMS = ['nsfw', 'nude', 'naked', 'explicit', /* add more */];

export function containsNSFW(prompt: string): boolean {
  const lower = prompt.toLowerCase();
  return BLOCKED_TERMS.some(term => lower.includes(term));
}
```

## Rate Limiting for Image Commands
Image generation is expensive — apply strict cooldowns:
```typescript
// 30-second cooldown per user, 5 per hour per user
const COOLDOWN_SECONDS = 30;
const HOURLY_LIMIT = 5;
```

## Replicate API Alternative
```typescript
import Replicate from 'replicate';

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

const output = await replicate.run(
  'black-forest-labs/flux-schnell',
  { input: { prompt, num_outputs: 1, aspect_ratio: '1:1' } }
);
// output is array of URL strings — fetch the URL to get the buffer
```

## References
- [Prompt Templates](./references/prompts.md)
- [Model Comparison](./references/models.md)
- [NSFW Safety](./references/safety.md)
