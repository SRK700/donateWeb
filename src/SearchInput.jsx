function SearchInput(props){
    const handleChange = (e)=>{
    props.setSearchTerm(e.target.value);
    }

    return(
        <>
    <label>Enter your search term:</label>
    <input type="text" value={props.searchTerm} onChange={handleChange} />
    </>
    );
   }
   export default SearchInput;

