import { NextRequest, NextResponse } from "next/server";
import { SearchProductsByTag } from "@/action/search.action";
 
export async function GET(req: NextRequest) {
  const tag = req.nextUrl.searchParams.get("tag") || "";
  const products = await SearchProductsByTag(tag);
  return NextResponse.json(products);
} 