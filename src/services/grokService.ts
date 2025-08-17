export const getGrokResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct", // ✅ Use Groq-supported model
        messages: [
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response from Groq AI.";
  } catch (error) {
    console.error("Grok API Error:", error);
    return "Oops, I couldn't fetch a response from Groq.";
  }
};
