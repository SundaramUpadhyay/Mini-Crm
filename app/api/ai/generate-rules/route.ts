import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    console.log("Generating rules for prompt:", prompt)

    // For now, use mock implementation since OpenAI might not be configured
    // In production, replace this with actual OpenAI API call
    const rules = generateMockRules(prompt)

    console.log("Generated rules:", rules)

    return NextResponse.json({ rules })
  } catch (error) {
    console.error("Error generating AI rules:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

function generateMockRules(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase()

  const conditions: any[] = []

  // Parse different types of conditions
  if (
    lowerPrompt.includes("haven't shopped") ||
    lowerPrompt.includes("inactive") ||
    lowerPrompt.includes("not purchased")
  ) {
    const months = lowerPrompt.match(/(\d+)\s*months?/)?.[1] || "6"
    conditions.push({
      field: "lastPurchaseDate",
      operator: "lessThan",
      value: `${months} months ago`,
    })
  }

  if (lowerPrompt.includes("spent over") || lowerPrompt.includes("spend") || lowerPrompt.includes("purchase")) {
    const amount = lowerPrompt.match(/₹(\d+)/)?.[1] || lowerPrompt.match(/(\d+)/)?.[1] || "5000"
    conditions.push({
      field: "totalSpend",
      operator: "greaterThan",
      value: Number.parseInt(amount),
    })
  }

  if (lowerPrompt.includes("new customer") || lowerPrompt.includes("recent") || lowerPrompt.includes("joined")) {
    const days = lowerPrompt.match(/(\d+)\s*days?/)?.[1] || "30"
    conditions.push({
      field: "createdAt",
      operator: "greaterThan",
      value: `${days} days ago`,
    })
  }

  if (lowerPrompt.includes("email") && lowerPrompt.includes("contains")) {
    const domain = lowerPrompt.match(/@([a-zA-Z0-9.-]+)/)?.[1] || "gmail.com"
    conditions.push({
      field: "email",
      operator: "contains",
      value: domain,
    })
  }

  // Default condition if no specific patterns found
  if (conditions.length === 0) {
    conditions.push({
      field: "totalSpend",
      operator: "greaterThan",
      value: 1000,
    })
  }

  const rules = {
    conditions: conditions,
    logic: conditions.length > 1 ? "AND" : "ALL",
  }

  return JSON.stringify(rules, null, 2)
}
