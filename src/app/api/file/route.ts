import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const publicFolderPath = path.resolve(process.cwd(), 'public') 
  const filePath = path.join(publicFolderPath, 'uploads', file.name)

  await writeFile(filePath, buffer)

  return NextResponse.json({ success: true })
}
