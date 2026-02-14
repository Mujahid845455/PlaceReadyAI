'use client';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { code } = await request.json();

        const clientId = process.env.GITHUB_CLIENT_ID;
        const clientSecret = process.env.GITHUB_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
            return NextResponse.json(
                { error: 'GitHub Client ID or Secret is not configured' },
                { status: 500 }
            );
        }

        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code,
            }),
        });

        const data = await response.json();

        if (data.error) {
            return NextResponse.json(
                { error: data.error_description || data.error },
                { status: 400 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('OAuth exchange error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
