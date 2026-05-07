---
name: image-generation
description: "AI image generation integration for Discord bots and websites. Use for prompt design, provider selection, image commands, safety filters, profile cards, banners, avatars, upscaling, and image workflows."
argument-hint: "Describe the image generation feature or asset."
---

# Image Generation Skill

## When To Use

- Building `/generate`, `/avatar`, `/banner`, `/pfp`, meme, or AI art commands.
- Adding image generation to websites or bot dashboards.
- Choosing providers and models.
- Writing prompt templates and safety filters.
- Designing image-to-image, inpainting, upscaling, or profile-card workflows.

## Provider Options

| Provider | Typical Use |
|---|---|
| Hugging Face | Fast experiments and open models. |
| Replicate | Production access to popular hosted models. |
| fal.ai | High-volume low-latency generation. |
| Stability AI | Stable Diffusion ecosystem. |
| OpenAI Images | Safe image generation and editing through OpenAI APIs. |
| Local models | Ollama-adjacent or self-hosted workflows when available. |

Use the provider already configured in the target project when possible.

## Prompt Structure

```txt
[style], [subject], [action/pose], [setting], [lighting], [composition], [quality constraints]
```

For public bots, always add:

- Max prompt length.
- Blocked unsafe terms.
- Per-user cooldowns.
- Hourly or daily usage caps.
- Clear error messages for generation failures.

## Discord Bot Requirements

- Defer before generation work.
- Validate prompts before sending them to a provider.
- Never expose provider tokens to users or client bundles.
- Attach generated images safely and include the prompt/style in the response when appropriate.
- Use strict rate limits because image generation is expensive.

## Website Requirements

- Keep provider calls server-side.
- Validate request body and user permissions.
- Store only necessary metadata.
- Avoid logging full prompts when prompts may contain personal data.

## Safety

- Do not generate or help generate disallowed sexual, abusive, exploitative, or illegal content.
- Reject unsafe prompts with a short, user-facing explanation.
- Keep logs free of API keys and raw provider credentials.
