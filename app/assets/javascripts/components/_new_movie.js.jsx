const NewMovie = (props) => {
    let formFields = {}

    return(
        <div style={{ padding: 10, marginTop: 30 }}>
            <form onSubmit={(e) => { props.handleFormSubmit(formFields.title.value, formFields.description.value); e.target.reset();}}>
                <div class="form-group">
                    <label >Movie title</label>
                    <input class="form-control" ref={input => formFields.title = input} placeholder='Enter the title of the movie'/>
                </div>
                <div class="form-group">
                    <input class="form-control" ref={input => formFields.description = input} placeholder='Enter a description' />
                </div>
                <button class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}