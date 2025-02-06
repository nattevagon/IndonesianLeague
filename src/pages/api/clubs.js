// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clubs from './data/clubs.json'

export default function handler(req, res) {
  res.status(200).json(clubs);
}
