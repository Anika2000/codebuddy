import  OpenAI  from "openai";

  const openai = new OpenAI(
    {
        apiKey: process.env.OPENAI_API_KEY,
    }
  );

  export async function POST(req) {
    const { messages } = await req.json();
    
  
    if (!messages) {
      return new Response(JSON.stringify({ error: 'No message provided' }), { status: 400 });
    }
  
    try {

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

  
      return new Response(JSON.stringify({ response: chatCompletion.choices[0].message }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }