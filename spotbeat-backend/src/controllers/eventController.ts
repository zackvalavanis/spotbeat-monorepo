import { type Request, type Response } from 'express';
import fetch from 'node-fetch';
import dotenv from "dotenv";
dotenv.config();

const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;

console.log("TM API Key:", TICKETMASTER_API_KEY);


export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const postalCode = req.query.postalCode || '11201';
    const city = req.query.city as String || 'Chicago';
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&city=${city}}&size=10`;

    const response = await fetch(url)

    if (!response.ok) {
      res.status(response.status).json({ message: 'Error fetching events from Ticketmaster' });
      return;
    }

    const data = await response.json() as { _embedded?: { events: any[] } };

    console.log(JSON.stringify(data, null, 2));

    res.json(data._embedded?.events || []);

  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

}
