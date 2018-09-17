const Movies = (props) => {
    var movies = props.movies.map((movie) => {
        return(
            <Movie movie={movie} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate}/>
        )
    })

    return(
        <div style={{ padding: 10, marginTop: 50 }}>
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
                    {movies}
                </tbody>
            </table>
        </div>
    )
}