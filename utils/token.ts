// I took this code from this repo to handle ZOOM API Key generation -> https://github.com/zoom/server-to-server-oauth-starter-api/blob/main/utils/token.js

import axios from 'axios';
import { ZOOM_OAUTH_ENDPOINT } from "@/constants"
import querystring from 'querystring';

type Token = {
  access_token: string;
  expires_in: number;
  error: any;
}

/**
  * Retrieve token from Zoom API
  *
  * @returns {Object} { access_token, expires_in, error }
  */
export const getToken = async (): Promise<Token> => {
  try {
    const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;
    const request = await axios.post(
      ZOOM_OAUTH_ENDPOINT,
      querystring.stringify({ grant_type: 'account_credentials', account_id: ZOOM_ACCOUNT_ID }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64')}`,
        },
      },
    );

    const { access_token, expires_in } = await request.data;

    return { access_token, expires_in, error: null };
  } catch (error) {
    return { access_token: '', expires_in: 0, error };
  }
};