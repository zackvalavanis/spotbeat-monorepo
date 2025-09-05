import { type Request, type Response } from 'express';
import fetch from 'node-fetch';
import dotenv from "dotenv";
dotenv.config();

const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const city = req.query.city as string | undefined;
    const postalCode = req.query.postalCode as string | undefined;
    const startDate = req.query.startDateTime as string | undefined;
    const endDate = req.query.endDateTime as string | undefined;

    if (!city && !postalCode) {
      res.status(400).json({ message: 'City or postalCode is required' });
      return;
    }

    // Convert YYYY-MM-DD to ISO 8601 for Ticketmaster
    const startDateTime = startDate ? `${startDate}T00:00:00Z` : undefined;
    const endDateTime = endDate ? `${endDate}T23:59:59Z` : undefined;

    // Build URL using URLSearchParams
    const params = new URLSearchParams();
    params.append('apikey', TICKETMASTER_API_KEY!);
    params.append('size', '50');
    if (city) params.append('city', city);
    if (postalCode) params.append('postalCode', postalCode);
    if (startDateTime) params.append('startDateTime', startDateTime);
    if (endDateTime) params.append('endDateTime', endDateTime);

    const url = `https://app.ticketmaster.com/discovery/v2/events.json?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ticketmaster API Error:', errorText);
      res.status(response.status).json({ message: 'Error fetching events from Ticketmaster', details: errorText });
      return;
    }

    const data = await response.json() as { _embedded?: { events: any[] } };

    res.json(data._embedded?.events || []);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'Event ID is required' });
      return;
    }

    const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${TICKETMASTER_API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ticketmaster API Error:', errorText);
      res.status(response.status).json({ message: 'Error fetching event', details: errorText });
      return;
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};