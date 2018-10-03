class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            allMovies: false,
            display: true,
            filter: {category: '', rating: ''}
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateMovie = this.updateMovie.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.submitNewMovie = this.submitNewMovie.bind(this);
        this.addNewMovie = this.addNewMovie.bind(this);
        this.liveSearch = this.liveSearch.bind(this);
        this.handleFilter = this.handleFilter.bind(this);

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
        let newMovies = this.state.movies.map((m) => {
            if( m.id === movie.id){
                return Object.assign(m, movie);
            }
            else
                return m
        });

        this.setState({
            movies: newMovies,
            filter: {category: '', rating: ''}
        })
    }

    handleFormSubmit(title, description, category){

        let body = JSON.stringify({movie: {title: title, description: description, category: category} })
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
                        if(movie.title.match(new RegExp(searchString, 'i'))){
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

    handleFilter(filter='', referrer=''){
        switch(referrer){
            case 'category':
                this.setState({filter: {category: filter, rating: this.state.filter.rating}})
                break;
            case 'rating':
                this.setState({filter: {category: this.state.filter.category, rating: filter}})
                break;
        };
    }

    render(){
        let bodyContent;

        if( this.state.display){
            bodyContent = <Movies filter={this.state.filter} movies={this.state.movies} handleFilter={this.handleFilter} handleDelete={this.handleDelete} handleUpdate = {this.handleUpdate}/>
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