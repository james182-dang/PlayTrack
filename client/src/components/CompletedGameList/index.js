function CompletedGameList({ games }) {

    return (
        <div className='completedGameList'>
            {games &&
              games.map(completedGame => (
                  <div key={completedGame.gameId}>
                      <p>
                          {completedGame.name}
                      </p>
                  </div>
              ))}
        </div>
    );
}

export default CompletedGameList;