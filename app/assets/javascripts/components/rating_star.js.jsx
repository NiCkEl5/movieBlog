function Star(props){
    if(props.state.rating >= props.rating){
        return <img value={props.state.rating} src="/assets/star.png" onClick={  props.onClick } />
    }else{
        return <img value={props.state.rating} src="/assets/no_star.png" onClick={  props.onClick } />
    }

}

class RatingStar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie_id: this.props.movie.id,
            rating: this.props.movie.rating,
        };
    }

    updateRating(fProps){
        this.props.handleUpdate({id: this.state.movie_id, rating: fProps.rating})
    }

    componentDidUpdate(){
        if(this.state.movie_id === this.props.movie.id && this.state.rating !== this.props.movie.rating){
            this.setState({rating: this.props.movie.rating});
        }
    }

    render () {

        return (
            <div>
                <Star state={this.state} rating={1} onClick={()=> this.updateRating({rating: 1})}/>
                <Star state={this.state} rating={2} onClick={()=> this.updateRating({rating: 2})}/>
                <Star state={this.state} rating={3} onClick={()=> this.updateRating({rating: 3})}/>
                <Star state={this.state} rating={4} onClick={()=> this.updateRating({rating: 4})}/>
                <Star state={this.state} rating={5} onClick={()=> this.updateRating({rating: 5})}/>
            </div>
        );
    }
}