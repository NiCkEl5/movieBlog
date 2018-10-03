function createCounter(movies){
    let filterParse = {'categories': {}, 'rates': {}};

    movies.map(movie => {
        if(filterParse['categories'][movie['category']] === undefined){
            filterParse['categories'][movie['category']] = 1;
        }else{
            filterParse['categories'][movie['category']]+=1
        }

        if(filterParse['rates'][movie['rating']] === undefined){
            filterParse['rates'][movie['rating']] = 1
        }else{
            filterParse['rates'][movie['rating']]+=1
        }
    });

    return filterParse;
}

class CategoryFilter extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        };
    };

    render(){
        let filterDetails = createCounter(this.props.movies);

        var categoryOption = Object.keys(filterDetails['categories']).map((item) => {
            return (
                <option value={item}>{item + ' ('+ filterDetails['categories'][item] + ')'}</option>
            )
        });

        var ratingOption = Object.keys(filterDetails['rates']).map((item) => {
            return (
                <option value={item}>{item + ' Star' + ' ('+ filterDetails['rates'][item] + ')'}</option>
            )
        });

        return(
            <div class="container" style={{ marginTop: 40 }}>
                <div class="row">
                    <div class="col-sm facet-filter">
                        <label class="facet-filter-label">Category</label>
                        <select class="custom-select" value={this.props.filter.category} onChange={input => this.props.handleFilter(input.target.value, 'category')}>
                            <option value=''>Select one</option>
                            {categoryOption}
                        </select>
                    </div>
                    <div class="col-sm facet-filter">
                        <label class="facet-filter-label">Rating</label>
                        <select class="custom-select" value={this.props.filter.rating} onChange={input => this.props.handleFilter(input.target.value, 'rating')}>
                            <option value=''>Select one</option>
                            {ratingOption}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}