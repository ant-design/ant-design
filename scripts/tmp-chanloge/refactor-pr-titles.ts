import fs from 'fs-extra';
import path from 'path';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize OpenAI client
// Ensure you have OPENAI_API_KEY in your environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const run = async () => {
  const inputPath = path.join(__dirname, 'pr-titles_v1.json');
  if (!fs.existsSync(inputPath)) {
    console.error(`Error: ${inputPath} not found.`);
    return;
  }

  const titles: Record<string, string> = await fs.readJSON(inputPath);

  console.log(`Processing ${Object.keys(titles).length} titles with OpenAI...`);

  const systemPrompt = `
You are an expert release manager for the Ant Design component library.
Your goal is to standardize PR titles into the Conventional Commits format (Angular convention).

Input: A JSON object mapping PR IDs to their original titles.
Output: A JSON object mapping PR IDs to the refactored titles.

Guidelines:
1. Structure: \`type(scope): description\`
2. Type: Use \`feat\` for new features, \`fix\` for bugs, \`refactor\` for code restructuring, \`docs\` for documentation.
3. Scope:
   - Identify the specific UI component (e.g., \`Button\`, \`Table\`, \`ConfigProvider\`).
   - Use PascalCase for component names.
4. Description:
   - Use imperative mood.
   - **CRITICAL**: The changes usually imply support for semantic styles in both the component props AND ConfigProvider.
   - **CRITICAL**: If the title involves "ConfigProvider" and "classNames/styles", use the standard format: **\`support \`classNames\` and \`styles\` for component and ConfigProvider\`**.
   - **CRITICAL**: Do NOT use parentheses in the description.
   - **CRITICAL**: Always wrap \`classNames\` and \`styles\` in backticks (e.g., \`\`classNames\`\`, \`\`styles\`\`).
   - **CRITICAL**: Preserve the exact casing of \`classNames\` and \`styles\`.
   - Common pattern: "ConfigProvider support classNames and styles for X" => \`feat(X): support \`classNames\` and \`styles\` for component and ConfigProvider\`.
   - Common pattern: "ConfigProvider support X" => \`feat(X): support ConfigProvider\`.
5. Edge Cases:
   - If the title is already correct, keep it.
   - If the scope is unclear, infer it from the context.

Example:
Input: { "123": "feat: ConfigProvider support classNames and styles for Button" }
Output: { "123": "feat(Button): support \`classNames\` and \`styles\` for component and ConfigProvider" }
`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: JSON.stringify(titles, null, 2) },
      ],
      model: 'gpt-5-mini', // Using a capable model for better formatting
      response_format: { type: 'json_object' },
      temperature: 0.1, // Low temperature for consistent output
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content returned from OpenAI');
    }

    const refactored = completion.choices[0].message.content;

    const outputPath = path.join(__dirname, 'refactored-pr-titles_v1.json');
    await fs.writeJSON(outputPath, refactored, { spaces: 2 });
    console.log(`Generated refactored titles at ${outputPath}`);
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    console.log('Make sure you have installed the "openai" package and set OPENAI_API_KEY.');
  }
};

run();
