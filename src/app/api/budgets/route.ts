import { NextResponse } from "next/server";
import pool from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM budgets");
    return NextResponse.json(rows);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";
    console.error("Database query error:", message);
    return NextResponse.json(
      { error: "Failed to fetch budgets", details: message },
      { status: 500 }
    );
  }
}
