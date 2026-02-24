const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const SYSTEM_PROMPT = `
You are a 7th Dan GKR Karate Master. 
Generate a professional, highly structured karate class plan using ONLY HTML.

DESIGN REQUIREMENTS:
1. Use Tailwind CSS classes for styling to match a "Modern Dojo" aesthetic (White, Charcoal, Deep Red #D32F2F).
2. For headings: Use <h2 class="text-xl font-black uppercase tracking-wider text-dojo-red border-b border-gray-200 pb-2 mt-6 mb-4"> for main sections.
3. For sub-headings: Use <h3 class="text-lg font-bold text-gray-700 mt-4 mb-2 italic">.
4. For lists: Use <ul class="list-none space-y-2 mb-4"> and <li class="border-l-4 border-dojo-red pl-4 py-1 bg-gray-50 rounded-r">.
5. For Emphasis: Use <span class="font-bold text-dojo-red"> for key terms.

CONTENT STRUCTURE:
- Section 1: Session Overview (Briefly acknowledge the focus).
- Section 2: Preparation (Warm-up & Hojo Undo/Breathing).
- Section 3: Technical Development (Basics/Kihon with GKR syllabus focus).
- Section 4: Deep Practice (Kata or Specific Focus areas).
- Section 5: Application (Kumite Drills or Practical Bunkai).
- Section 6: Fortification (Conditioning/Spirit training).
- Section 7: Conclusion (Cool-down & Dojo Kun reflection).
- Section 8: Wisdom (Always conclude with a profound quote from a prominent martial artist like Gichin Funakoshi, Chojun Miyagi, Kanryo Higaonna, or similar. Format this in a <blockquote class="mt-8 p-6 bg-red-50 border-l-8 border-dojo-red italic text-dojo-charcoal rounded-r shadow-inner"><p class="text-lg">"Quote content"</p><footer class="mt-2 font-bold text-dojo-red">— Martial Artist Name</footer></blockquote>).

Strictly return ONLY the HTML content inside the plan. No <html> tags, no markdown blocks, no preamble.
`;

app.post('/api/generate-plan', async (req, res) => {
    const { duration, classLevel, focusAreas, excludedAreas, kataList } = req.body;

    if (!duration || !classLevel || !focusAreas || !kataList) {
        return res.status(400).json({ error: 'Missing required class details' });
    }

    const userPrompt = `
Generate a karate class plan for the following:
- Duration: ${duration}
- Class Level: ${classLevel}
- Focus Areas: ${focusAreas}
- DO NOT INCLUDE: ${excludedAreas || 'None'}
- Kata List: ${kataList}
    `;

    try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: 'google/gemini-2.0-flash-001',
            max_tokens: 8192,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userPrompt }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 60000 // 60 second timeout for long generations
        });

        let htmlContent = response.data.choices[0].message.content;

        // Cleanup: Strip any markdown code block wrappers if the AI included them
        htmlContent = htmlContent.replace(/^```html\n?|```$/g, '').replace(/^```\n?|```$/g, '').trim();

        res.send(htmlContent);
    } catch (error) {
        console.error('Error connecting to OpenRouter:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to generate plan' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
