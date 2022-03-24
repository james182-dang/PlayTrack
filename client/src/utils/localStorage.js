export const getSavedGameIds = () => {
    const savedGameIds = localStorage.getItem('saved_games')
    ? JSON.parse(localStorage.getItem('saved_games'))
    : [];

    return savedGameIds;
};

export const saveGameIds = (gameIdArr) => {
    if (gameIdArr.length) {
        localStorage.setItem('saved_games', JSON.stringify(gameIdArr));
    } else {
        localStorage.removeItem('saved_games');
    }
};

export const getNowPlayingIds = () => {
    const nowPlayingIds = localStorage.getItem('now_playing')
    ? JSON.parse(localStorage.getItem('now_playing'))
    : [];

    return nowPlayingIds;
};

export const nowPlayingIds = (gameIdArr) => {
    if (gameIdArr.length) {
        localStorage.setItem('now_playing', JSON.stringify(gameIdArr));
    } else {
        localStorage.removeItem('now_playing');
    }
};

export const removeGameId = (gameId) => {
    const savedGameIds = localStorage.getItem('saved_games')
      ? JSON.parse(localStorage.getItem('saved_games'))
      : null;

    if (!savedGameIds) {
        return false;
    }

    const updatedSavedGameIds = savedGameIds?.filter((savedGameId) => savedGameId !== gameId);
    localStorage.setItem('saved_games', JSON.stringify(updatedSavedGameIds));

    return true;
};