import { useContext,  useState } from "react";
import { PostContext } from "../../contexts/PostContext";

import SearchItem from "./SearchItem/SearchItem";

const Search = () => {
  const [search, setSearch] = useState([])
  const [boolen, setBoolen] = useState(true)
  const { posts } = useContext(PostContext);
 
  
  const onSubmit = (e) => { 
    e.preventDefault();
    //console.log(e.target.value)
    
    let searchField = Object.fromEntries(new FormData(e.target));

    const searchList = posts.filter(p =>
     p.title.toLowerCase().includes(searchField.search.toLowerCase()));

      setSearch(searchList)

       if (searchList.length > 0) {
        setBoolen(true) 
        //not to show the No-post before we have submitted
       } else {
        setBoolen(false)
       }
       e.target.reset() 
      
  }   

  return(
  <section  id="search">
  <h2>Search by Title</h2>
  <form onSubmit={onSubmit} className="searchForm">
    <input type="text" name="search" placeholder="Search here..." />
     <button type="submit">Search</button>
   </form>
  <h5>Results:</h5>
  

{search.length > 0
  ? <div className="search">
      <ul className="posts">
          {search.map(post => <SearchItem key={`${post._id}${5*9}`} post={post} />)}
      </ul>
    </div>
    
  : <p style={{display: boolen && 'none'}} className="nopost">We don/t have avelable rooms!</p> 
  
}

</section>
  )
}

export default Search;

// style={{ background: "red"}}
