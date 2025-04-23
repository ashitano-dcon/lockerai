import { Inject, Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';
import { EnvService } from '#api/common/service/env/env.service';

@Injectable()
export class LangchainService {
  // NOTE: LangChain is an ESModule, so CommonJS needs to reference it with import().
  private readonly OpenAIEmbeddings = (async () => (await import('@langchain/openai')).OpenAIEmbeddings)();

  private readonly openAIEmbeddings = (async () => new (await import('@langchain/openai')).OpenAIEmbeddings())();

  private readonly ChatOpenAI = (async () => (await import('@langchain/openai')).ChatOpenAI)();

  private readonly chatOpenAI = (async () => new (await import('@langchain/openai')).ChatOpenAI())();

  private readonly HumanMessage = (async () => (await import('@langchain/core/messages')).HumanMessage)();

  private readonly SystemMessage = (async () => (await import('@langchain/core/messages')).SystemMessage)();

  private readonly StructuredOutputParser = (async () => (await import('langchain/output_parsers')).StructuredOutputParser)();

  private readonly OutputFixingParser = (async () => (await import('langchain/output_parsers')).OutputFixingParser)();

  private embeddingModel: Awaited<typeof this.openAIEmbeddings> | null = null;

  private llm: Awaited<typeof this.chatOpenAI> | null = null;

  private lvlm: Awaited<typeof this.chatOpenAI> | null = null;

  private readonly logger = new Logger(LangchainService.name);

  constructor(@Inject(EnvService) private readonly envService: EnvService) {
    this.logger.debug(`${LangchainService.name} constructed`);
  }

  async embedding(text: string) {
    if (!this.embeddingModel) {
      await this.initEmbeddingModel();
      if (!this.embeddingModel) {
        throw new Error('Failed to create embedding model.');
      }
    }

    const vector = await this.embeddingModel.embedQuery(text);

    return vector;
  }

  async imageCaptioning(imageUrls: string[]) {
    const SystemMessage = await this.SystemMessage;
    const HumanMessage = await this.HumanMessage;

    if (!this.lvlm) {
      await this.initLvlm();
      if (!this.lvlm) {
        throw new Error('Failed to create LVLM instance.');
      }
    }

    const res = await this.lvlm.invoke([
      new SystemMessage({
        content: [
          {
            type: 'text',
            text: `
              Lost Item Descriptor is designed to generate structured descriptions of lost items based on photos.
              Upon receiving a photo of a lost item, the AI will provide output in JSON format with the following structure \`Result\`:

              title: This field will provide a very short summary of the description that works as a title. It must consist of a noun and few adjectives. e.g. "White Adidas 'Samba' classic shoes in US size 8½"
              description: This field will contain a detailed description of the item, starting with "This item is" and including all visible features such as color, shape, material, and text. The description will be comprehensive and include all relevant details. However, exclude the surroundings information like hands to hold the item and tables on which the item is placed. e.g. "The item is a pair of Adidas 'Samba' classic shoes. The primary colors are white, with grey suede on the toe area and black stripes on the sides. The text 'SAMBA' is written in gold next to the stripes. A blue rectangular logo is stitched on the tongue. The outsole appears to be brown gum rubber. The insole has the Adidas trefoil logo and the text 'THE BRAND WITH THE 3 STRIPES' in white on a black background. The shoe's size tag indicates that the shoes are made in Vietnam, with a US size of 8½, UK size of 8, FR size of 42, and JP/CHN size of 265. The production date is listed as 09/23, and the model number is LV 04-09/23."
              error: This field will provide the detailed reason why captioning a given item has failed.

              \`\`\`ts
              type Result =
                | {
                    title: string;
                    description: string;
                  }
                | {
                    error: string;
                  };
              \`\`\`
            `,
          },
        ],
      }),
      new HumanMessage({
        content: imageUrls.map((imageUrl) => ({
          type: 'image_url',
          image_url: { url: imageUrl },
        })),
      }),
    ]);

    const schema = z
      .object({
        title: z.string().describe(`A very short summary of the description that works as a title.`),
        description: z.string().describe(`A detailed description of the item, starting with "This item is".`),
      })
      .or(
        z.object({
          error: z.string().describe(`The reason why AI has failed to caption.`),
        }),
      );

    const caption = await this.parseOutputAsStructure(res.content.toString(), schema);

    return caption;
  }

  async translateFromAnyToEnglish(text: string) {
    const SystemMessage = await this.SystemMessage;
    const HumanMessage = await this.HumanMessage;

    if (!this.llm) {
      await this.initLlm();
      if (!this.llm) {
        throw new Error('Failed to create LLM instance.');
      }
    }

    const schema = z
      .object({
        translatedText: z.string().describe('The translated English text.'),
      })
      .or(
        z.object({
          error: z.string().describe(`The reason why AI has failed to translate.`),
        }),
      );

    const res = await this.llm.invoke([
      new SystemMessage({
        content: [
          {
            type: 'text',
            text: `
                Translator is designed to translate foreign language text into English.
                Upon receiving a text, the AI will provide output in JSON format with the following structure \`Result\`:

                translatedText: This field will provide the original text as is if the source text is in English, or the translated English text if the source text is not in English.
                error: This field will provide the detailed reason why translation has failed. The Reason must be explained in as much detail as possible and not just the fact of failure.

                \`\`\`ts
                type Result =
                  | {
                      translatedText: string;
                    }
                  | {
                      error: string;
                    };
                \`\`\`
              `,
          },
        ],
      }),
      new HumanMessage({
        content: [
          {
            type: 'text',
            text,
          },
        ],
      }),
    ]);

    const translatedText = await this.parseOutputAsStructure(res.content.toString(), schema);

    return translatedText;
  }

  private async initEmbeddingModel() {
    const OpenAIEmbeddings = await this.OpenAIEmbeddings;

    this.embeddingModel = new OpenAIEmbeddings({
      openAIApiKey: this.envService.OpenaiApiKey,
      modelName: 'text-embedding-3-small',
    });

    return this.embeddingModel;
  }

  private async initLlm() {
    const ChatOpenAI = await this.ChatOpenAI;

    this.llm = new ChatOpenAI({
      openAIApiKey: this.envService.OpenaiApiKey,
      modelName: 'gpt-4.1',
      maxTokens: 3000,
      temperature: 0.2,
    });

    return this.llm;
  }

  private async initLvlm() {
    const ChatOpenAI = await this.ChatOpenAI;

    this.lvlm = new ChatOpenAI({
      openAIApiKey: this.envService.OpenaiApiKey,
      modelName: 'gpt-4.1',
      maxTokens: 3000,
      temperature: 0.2,
    });

    return this.lvlm;
  }

  private async parseOutputAsStructure<T>(output: string, zodSchema: z.Schema<T>) {
    const StructuredOutputParser = await this.StructuredOutputParser;
    const OutputFixingParser = await this.OutputFixingParser;

    const structuredOutputParser = StructuredOutputParser.fromZodSchema(zodSchema);

    const parsedOutput = await structuredOutputParser.parse(output).catch(async (err) => {
      this.logger.warn(`Failed to parse output: ${err.message}`);

      if (!this.llm) {
        await this.initLlm();
        if (!this.llm) {
          throw new Error('Failed to create LLM instance.');
        }
      }

      const outputFixingParser = OutputFixingParser.fromLLM(this.llm, structuredOutputParser);
      const parsedFixedOutput = await outputFixingParser.parse(output);

      return parsedFixedOutput;
    });

    return parsedOutput;
  }
}
