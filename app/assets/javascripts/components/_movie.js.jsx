class Movie extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editable: false
        }
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit(){
        if(this.state.editable){
            let title = this.title.value
            let description = this.description.value
            let id = this.props.movie.id
            let movie = {id: id, title: title, description: description}
            this.props.handleUpdate(movie)
        }

        this.setState({
            editable: !this.state.editable
        })
    }

    render(){
        let title = this.state.editable ? <input class="form-control" type='text' ref={input => this.title = input} defaultValue={this.props.movie.title}/>:<p>{this.props.movie.title}</p>
        let description = this.state.editable ? <input  class="form-control" type='text' ref={input => this.description = input} defaultValue={this.props.movie.description}/>:<p>{this.props.movie.description}</p>

        return(
            <tr key={this.props.movie.id}>
                <td scope='row'>{title}</td>
                <td scope='row'>{description}</td>
                <td scope='row'>
                    <div>
                            <button class="btn btn-success" onClick={() => this.handleEdit()}>{this.state.editable? 'Submit' : 'Edit'}</button>&nbsp;
                            <button class="btn btn-danger" onClick={() => this.props.handleDelete(this.props.movie.id)}>Delete</button>
                    </div>

                </td>
                <td scope='row'>TBD</td>
            </tr>
        )
    }
}