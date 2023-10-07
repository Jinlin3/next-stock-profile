// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { FMPResponse } from '@/models/FMP';
import { DailyOpenClose } from '@/models/PolygonResponse';
import type { NextApiRequest, NextApiResponse } from 'next';

let selectedIndex: FMPResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchQuery = req.query.q?.toString();

  if (searchQuery === 'dow') {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/dowjones_constituent?apikey=${process.env.FMP_API_KEY}`);
    const apiResponse = await response.json();
    selectedIndex = apiResponse;
  } else if (searchQuery === 'nasdaq') {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${process.env.FMP_API_KEY}`);
    const apiResponse = await response.json();
    selectedIndex = apiResponse;
  } else {
    return res.status(400).json({ error: "Invalid index specified" });
  }

  res.status(200).json(selectedIndex);
}
