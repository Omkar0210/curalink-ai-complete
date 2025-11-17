/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "No items provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get Lovable AI API key from environment
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Prepare content for summarization
    const content = items.map((item: any) => {
      if (item.type === "expert") {
        return `Expert: ${item.name}, ${item.specialization} at ${item.institution}`;
      } else if (item.type === "trial") {
        return `Clinical Trial: ${item.title}, Phase: ${item.phase}, Status: ${item.status}`;
      } else if (item.type === "publication") {
        return `Publication: ${item.title} by ${item.authors?.join(", ")} (${item.year})`;
      }
      return "";
    }).join("\n");

    // Call Lovable AI Gateway
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a medical research assistant. Create a clear, professional summary of the selected research items that a patient can share with their doctor. Include key points about experts, clinical trials, and publications. Keep it concise but informative."
          },
          {
            role: "user",
            content: `Please summarize these research items for a patient to discuss with their doctor:\n\n${content}`
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("AI Gateway error:", error);
      throw new Error("Failed to generate summary");
    }

    const data = await response.json();
    const summary = data.choices[0]?.message?.content || "Unable to generate summary";

    return new Response(
      JSON.stringify({ summary }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
