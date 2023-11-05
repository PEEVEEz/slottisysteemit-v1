import { env } from "../env";

const getUserData = async (access_token: string) => {
  const result = await fetch("https://discord.com/api/users/@me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return await result.json();
};

const getAccessToken = async (code: string) => {
  const params = new URLSearchParams({
    client_id: env.CLIENT_ID,
    client_secret: env.CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: env.REDIRECT_URI,
  });

  const result = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: params,
    headers: {
      "Content-Type": `application/x-www-form-urlencoded`,
      "Accept-Encoding": "application/x-www-form-urlencoded",
    },
  });

  return (await result.json()).access_token;
};

export default { getUserData, getAccessToken };
