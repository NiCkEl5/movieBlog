class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            allMovies: false,
            display: true
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateMovie = this.updateMovie.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.submitNewMovie = this.submitNewMovie.bind(this)
        this.addNewMovie = this.addNewMovie.bind(this)
        this.liveSearch = this.liveSearch.bind(this)

    }
    componentDidMount(){
        if(this.state.display){
            fetch('/api/v1/movies')
                .then((response) => {return response.json()})
                .then((data) => {this.setState({ movies: data, allMovies: true }) })
                .catch((error) => console.error('Error:', error));
        }
    }

    addNewMovie(){
        this.setState({
            display: !this.state.display
        })
    }

    handleUpdate(movie){
        fetch(`/api/v1/movies/${movie.id}`,
            {
                method: 'PUT',
                body: JSON.stringify({movie: movie}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {this.updateMovie(movie)})
            .catch((error) => console.error('Error:', error));
    }

    updateMovie(movie){
        let newMovies = this.state.movies.filter((m) => m.id !== movie.id)
        newMovies.push(movie)
        this.setState({
            movies: newMovies
        })
    }

    handleFormSubmit(title, description){

        let body = JSON.stringify({movie: {title: title, description: description} })
        fetch('/api/v1/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        }).then((response) => {return response.json()})
            .then((movie)=>{
                this.submitNewMovie(movie)
        }).catch((error) => console.error('Error:', error));
    }

    submitNewMovie(movie){
        this.setState({
            movies: this.state.movies.concat(movie),
            display: !this.state.display
        })
    }

    handleDelete(id){
        fetch(`/api/v1/movies/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {this.deleteMovie(id)})
            .catch((error) => console.error('Error:', error));
    }

    deleteMovie(id){
        newMovies = this.state.movies.filter((movie) => movie.id !== id)
        this.setState({
            movies: newMovies
        })
    }

    liveSearch(event){
        var cleanSearch = [],
        newMovies = [];

        event.target.value.split(" ").forEach((element) => {
            cleanSearch.push(element.replace(/[^a-zA-Z0-9\\-\\' ]*$/g, "").toLowerCase());
        });

        searchString = cleanSearch.join(' ');

        if(searchString.length > 3){
            fetch('/api/v1/movies')
                .then((response) => {return response.json()})
                .then((data) => {
                    data.map((movie) => {
                        if(movie.title.indexOf(searchString) >= 0){
                            newMovies.push(movie);
                        }
                    });
                    this.setState({
                        movies: newMovies,
                        allMovies: false
                    })
                })
                .catch((error) => console.error('Error:', error));
        }else if(!this.state.allMovies){
            fetch('/api/v1/movies')
                .then((response) => {return response.json()})
                .then((data) => {
                    this.setState({
                    movies: data,
                    allMovies: true})
                }).catch((error) => console.error('Error:', error));
        }
    }

    render(){
        let bodyContent;

        if( this.state.display){
            bodyContent = <Movies movies={this.state.movies} handleDelete={this.handleDelete} handleUpdate = {this.handleUpdate}/>
        }else{
            bodyContent = <NewMovie handleFormSubmit={this.handleFormSubmit}/>
        }

        return(
            <div>/
                <NavBar addNewMovie={this.addNewMovie} liveSearch={this.liveSearch}/>
                {bodyContent}
            </div>
        )
    }
}