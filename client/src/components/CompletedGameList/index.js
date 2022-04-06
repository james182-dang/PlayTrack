function CompletedGameList({ games }) {

    return (
        <div className='completedGameList'>
            {games &&
              games.map(completedGame => (
                  <div key={completedGame.id}>
                      <p>
                          {completedGame.gameId}
                      </p>
                  </div>
              ))}
        </div>
    );
}

export default CompletedGameList;