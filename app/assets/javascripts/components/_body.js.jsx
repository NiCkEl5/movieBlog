class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            display: true
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateMovie = this.updateMovie.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.submitNewMovie = this.submitNewMovie.bind(this)
        this.addNewMovie = this.addNewMovie.bind(this)

    }
    componentDidMount(){
        if(this.state.display){
            fetch('/api/v1/movies')
                .then((response) => {return response.json()})
                .then((data) => {this.setState({ movies: data }) });
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
            }).then((response) => {
            this.updateMovie(movie)
        })
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
            })
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
    }

    deleteMovie(id){
        newMovies = this.state.movies.filter((movie) => movie.id !== id)
        this.setState({
            movies: newMovies
        })
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
                <NavBar addNewMovie={this.addNewMovie}/>
                {bodyContent}
            </div>
        )
    }
}