const FAQ = () => {

    return (
        <div className='FAQ'>
            <div className='myHeader'>
                <h2>
                    FAQ
                </h2>
            </div>

            <div className='FAQContent'>
                <h2>
                    What is PlayTrack?
                </h2>

                <h4>
                    Playtrack began when I went through
                    a period of completing many 3-5 hour games
                    and started to lose track of what I'd completed.
                    Beginning with just a way to track completed games,
                    it eventually evolved into a casual gaming social-media site.
                </h4>

                <h2>
                    How does it work?
                </h2>

                <h4>
                    With PlayTrack you can interact with games in a
                    variety of ways. Your first task upon signing up
                    should be to head to the Explore page and search for
                    a game. You can then add the game to your Completed games,
                    Followed games, or your Now Playing.

                    <br />

                    On the technical side, PlayTrack is built with React
                    and graphQL, utilizing the IGDB database for game data.
                </h4>

                <h2>
                    Great! I've added some games. Now what?
                </h2>

                <h4>
                    Your completed games, followed games,
                    and Now Playing are displayed on your profile.
                    Your completed games counter goes up with each 
                    completion, which feels good to see if you play
                    a lot of single-player titles. Completing a game
                    unlocks the ability to leave a review for the game.
                </h4>

                <h2>
                    How do games interact with posts?
                </h2>

                <h4>
                    PlayTrack is meant to be a place to casually
                    discuss/share your triumphs, defeats, and thoughts about the games 
                    you are playing. PlayTrack allows you to select a game
                    to attach to each post, which helps users find discussions
                    on the games they want to discuss. When a game is attached
                    to a post, it allows the post to show up on the discussions
                    section on the game's page.
                </h4>

                <h2>
                    What's next?
                </h2>

                <h4>
                    There's a lot of planned features for the future of 
                    PlayTrack. Profile levelling, connection to Steam/PSN/Xbox Live,
                    and updating the Now Playing feature to reflect what you are playing 
                    in real time are currently next on the features to
                    implement. If you have any suggestions, just send a
                    message to James182 and I'll see what I can do!
                </h4>

                <h2>
                    Privacy Information
                </h2>

                <h4>
                    Profile Images are stored securely on Cloudinary.
                </h4>
            </div>
        </div>
    );
}

export default FAQ;