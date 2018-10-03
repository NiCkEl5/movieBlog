const NewMovie = (props) => {
    let formFields = {}
    var categories = ['Action', 'Drama', 'SciFi', 'Comedy', 'Documentary'];

    var categories_option = categories.map((category, index) => {
        return (
            <option key={index} value={category}>{category}</option>
        )
    });


    return(
        <div class="movie-form">
            <form onSubmit={(e) => { props.handleFormSubmit(formFields.title.value, formFields.description.value, formFields.category.value); e.target.reset();}}>
                <div class="form-group">
                    <label >Movie title</label>
                    <input class="form-control" ref={input => formFields.title = input} placeholder='Enter the title of the movie'/>
                </div>
                <div class="form-group">
                    <input class="form-control" ref={input => formFields.description = input} placeholder='Enter a description' />
                </div>
                <div class="form-group">
                    <select class="custom-select" required ref={input => formFields.category = input}>
                        <option value="">Select a category</option>
                        {categories_option}
                    </select>
                </div>
                <button class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}