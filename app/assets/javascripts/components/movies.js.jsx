const Movies = (props) => {
    var tmpMovieList = props.movies.filter((movie) => {
        if(props.filter.category === '' || props.filter.category === movie.category){
            if(props.filter.rating === '' || props.filter.rating === movie.rating.toString()) {
                return movie;
            }
        }
    })

    var movieList = tmpMovieList.length === 0 ? props.movies : tmpMovieList
    var filters = tmpMovieList.length === 0 ? {category: '', rating: ''} : props.filter

    var displayMovies = movieList.map((displayMovie) => {
        return <Movie movie={displayMovie} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate}/>
    });

    return(
        <div>
            <CategoryFilter movies={movieList} handleFilter={props.handleFilter} filter={filters} />
            <div style={{ padding: 10 }}>
                <table class="table table-striped movie-table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Text</th>
                            <th scope="col">Actions</th>
                            <th scope="col">Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayMovies}
                    </tbody>
                </table>
            </div>
        </div>
    )
}