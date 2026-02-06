// /app/api/visits/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'visits.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir);
  }
}

async function readVisits(): Promise<number> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data).count;
  } catch {
    // If file doesn't exist, start from 0
    return 0;
  }
}

async function writeVisits(count: number): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify({ count }), 'utf-8');
}

export async function GET() {
  const count = await readVisits();
  return NextResponse.json({ count });
}

export async function POST(request: NextRequest) {
  // Optional: Check if this is a page refresh by checking a timestamp
  // This prevents counting the same user multiple times within 30 minutes
  const currentCount = await readVisits();
  const newCount = currentCount + 1;
  await writeVisits(newCount);
  
  return NextResponse.json({ 
    success: true, 
    count: newCount 
  });
}