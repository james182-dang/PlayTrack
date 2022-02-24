export const getGameToken = (token) => {
    return fetch(`https://id.twitch.tv/oauth2/token?client_id=z0veutl1ez27ss3pfg23qobc0xhu5i&client_secret=d5bzt8a4pdmp9szgz6r58iupafkyjp&grant_type=client_credentials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        }
    });
};