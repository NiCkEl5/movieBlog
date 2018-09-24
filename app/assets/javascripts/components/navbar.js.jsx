const NavBar = (props) =>
{
    return (
        <header>
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <a class="navbar-brand" href="/">Movie DB</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav mr-auto">
                        <li>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Movies
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#" onClick={props.addNewMovie}>Add</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <input type="text" class="form-control" id="searchField" placeholder="Search..." onKeyUp={props.liveSearch}/>
                </div>
            </nav>
        </header>
    )
}