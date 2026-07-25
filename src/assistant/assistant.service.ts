import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AssistantService {
  async ask(prompt: string, context?: string): Promise<string> {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new InternalServerErrorException(
        'ANTHROPIC_API_KEY não configurada no backend. Adicione-a no .env para habilitar o assistente.',
      );
    }

    const systemContext = context
      ? `Dados atuais do usuário no app LifeFlow:\n${context}\n\nResponda em português, de forma direta e prática (máx. ~120 palavras), como um assistente pessoal de produtividade.`
      : 'Responda em português, de forma direta e prática, como um assistente pessoal de produtividade.';

    // fetch nativo do Node 18+ — sem dependência extra.
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        system: systemContext,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new InternalServerErrorException(`Erro ao chamar a Anthropic API: ${text}`);
    }

    const data = await res.json();
    const reply = (data.content || []).map((c: any) => c.text || '').join('\n').trim();
    return reply || 'Não consegui gerar uma resposta agora.';
  }
}
