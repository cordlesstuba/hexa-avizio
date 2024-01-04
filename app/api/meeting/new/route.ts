import { NextResponse } from 'next/server'
import { getToken } from "@/utils/token"

import axios from 'axios';

export async function POST (req: Request) {
    const { subject, startDate, endDate } = await req.json();
    const token = await getToken();
    
    try {
        const response = await axios.post(
          'https://api.zoom.us/v2/users/me/meetings',
          {
            topic: subject,
            startDate,
            duration: Math.floor((new Date(endDate).getTime() - new Date(startDate).getTime()) / 60000), // Duration in minutes
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token.access_token}`,
            },
          }
        );
        console.log(response)
        return NextResponse.json({ "data": response.data }, { status: 200 })

      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}