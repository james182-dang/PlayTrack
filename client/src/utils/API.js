export const getGame = (searchInput) => {
    return fetch(`https://id.twitch.tv/oauth2/token?client_id=z0veutl1ez27ss3pfg23qobc0xhu5i&client_secret=csrkkvsobd4mm5ywpelns56qpbt4jx&grant_type=client_credentials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            const accessToken = data.access_token;


            return fetch(`https://fathomless-river-46653.herokuapp.com/https://api.igdb.com/v4/games/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Client-ID': 'z0veutl1ez27ss3pfg23qobc0xhu5i',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: `
                search "${searchInput}";
                fields name,platforms.name,cover.url;`
            })
        });
};

export const getSpecificGame = (gameId) => {
    return fetch(`https://id.twitch.tv/oauth2/token?client_id=z0veutl1ez27ss3pfg23qobc0xhu5i&client_secret=csrkkvsobd4mm5ywpelns56qpbt4jx&grant_type=client_credentials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            const accessToken = data.access_token;


            return fetch(`https://fathomless-river-46653.herokuapp.com/https://api.igdb.com/v4/games/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Client-ID': 'z0veutl1ez27ss3pfg23qobc0xhu5i',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: `
                fields name,summary,platforms.name,genres.name,cover.url;
                where id = ${gameId};`
            })
        });
};

export const getGameToSave = (gameId) => {
    return fetch(`https://id.twitch.tv/oauth2/token?client_id=z0veutl1ez27ss3pfg23qobc0xhu5i&client_secret=csrkkvsobd4mm5ywpelns56qpbt4jx&grant_type=client_credentials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            const accessToken = data.access_token;


            return fetch(`https://fathomless-river-46653.herokuapp.com/https://api.igdb.com/v4/games/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Client-ID': 'z0veutl1ez27ss3pfg23qobc0xhu5i',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: `
                fields name;
                where id = ${gameId};`
            })
        });
};

export const uploadProfileImage = (base64EncodedImage) => {
    return fetch(`https://api.cloudinary.com/v1_1/dzd5l8amr/image/upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            file: base64EncodedImage,
            upload_preset: 'profile_pic'
        })
    })
};