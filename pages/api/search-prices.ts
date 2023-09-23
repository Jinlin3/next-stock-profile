// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DailyOpenClose } from '@/models/DailyOpenClose';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchQuery = req.query.q?.toString();

  if (!searchQuery) {
    return res.status(400).json({ error: "search query is blank" });
  }

  const response = await fetch(`https://api.polygon.io/v1/open-close/${searchQuery}/2023-09-20?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`);
  const apiResponse: DailyOpenClose = await response.json();

  res.status(200).json(apiResponse);
}
