function GameSearch() {

    
    
    return (
        <Form onSubmit={handleFormSubmit}>
            <label class="search">
                <ul class="search-links">
                    <li>
                        <a href="#double">
                            <h4>Double, double</h4>
                            <p>toil and trouble</p>
                        </a>
                    </li>
                    <li>
                        <a href="#fire">
                            <h4>Fire burn</h4>
                            <p>and caldron bubble</p>
                        </a>
                    </li>
                    <li>
                        <a href="#fillet">
                            <h4>Fillet</h4>
                            <p>of a fenny snake</p>
                        </a>
                    </li>
                    <li>
                        <a href="#caldron">
                            <h4>In the caldron</h4>
                            <p>boil and bake</p>
                        </a>
                    </li>
                </ul>
                <input class="input" type="text" />
                    <button class="button"></button>
            </label>
        </Form>
    );

}

export default GameSearch;