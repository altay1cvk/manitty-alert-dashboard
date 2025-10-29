import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, pathname } = new URL(request.url);
  
  // Redirect to Auth0 login
  if (pathname.includes('/login')) {
    const auth0Domain = process.env.AUTH0_ISSUER_BASE_URL;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const redirectUri = `${process.env.AUTH0_BASE_URL}/api/auth/callback`;
    
    const loginUrl = `${auth0Domain}/authorize?` +
      `response_type=code&` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=openid profile email&` +
      `audience=${process.env.AUTH0_AUDIENCE}`;
    
    return NextResponse.redirect(loginUrl);
  }
  
  // Handle logout
  if (pathname.includes('/logout')) {
    const auth0Domain = process.env.AUTH0_ISSUER_BASE_URL;
    const returnTo = process.env.AUTH0_BASE_URL;
    
    const logoutUrl = `${auth0Domain}/v2/logout?` +
      `client_id=${process.env.AUTH0_CLIENT_ID}&` +
      `returnTo=${encodeURIComponent(returnTo || 'http://localhost:3000')}`;
    
    const response = NextResponse.redirect(logoutUrl);
    response.cookies.set('auth-token', '', { maxAge: 0 });
    
    return response;
  }
  
  // Handle callback
  if (pathname.includes('/callback')) {
    const code = searchParams.get('code');
    
    if (!code) {
      return NextResponse.redirect(`${process.env.AUTH0_BASE_URL}/?error=no_code`);
    }
    
    try {
      // Exchange code for token
      const tokenResponse = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          code,
          redirect_uri: `${process.env.AUTH0_BASE_URL}/api/auth/callback`,
        }),
      });
      
      const tokens = await tokenResponse.json();
      
      if (tokens.access_token) {
        const response = NextResponse.redirect(`${process.env.AUTH0_BASE_URL}/dashboard`);
        response.cookies.set('auth-token', tokens.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        return response;
      }
    } catch (error) {
      console.error('Auth error:', error);
      return NextResponse.redirect(`${process.env.AUTH0_BASE_URL}/?error=auth_failed`);
    }
  }
  
  // Handle /me endpoint
  if (pathname.includes('/me')) {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({}, { status: 200 });
    }
    
    try {
      const userInfo = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (userInfo.ok) {
        const user = await userInfo.json();
        return NextResponse.json(user);
      }
    } catch {
      return NextResponse.json({}, { status: 200 });
    }
    
    return NextResponse.json({}, { status: 200 });
  }
  
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
