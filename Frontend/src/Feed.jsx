import {React,useEffect,useState} from 'react'
import Navbar from './navbar';
import Footer from './Footer';
import './feed.css';

function Feed() {
    const [diseases, setDiseases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const[page,setPage]=useState(1);
    const [totalpage,setTotalpage]=useState(1);

    useEffect(() => {
      async function fetchDiseases(){
        try {
          const res = await fetch(`http://localhost:6969/add-disease?page=${page}&limit=4`);
          const data = await res.json();
          setDiseases(data.data);
          setTotalpage(data.totalpage);
        } catch (err) {
          console.error("Failed to fetch diseases", err);
        } finally {
          setLoading(false);
        }
      };
      fetchDiseases();
    }, [page]);


    const filteredDiseases = diseases.filter((disease) =>
        disease.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  return (
    <>
      <Navbar/>
      <div className="feed-container">
        <h2>Disease Feed</h2>



        <input
          type="text" placeholder="Search diseases" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-bar"/>
        {loading ? (
          <p>Loading...</p>
        ) : filteredDiseases.length === 0 ? (
          <p>No diseases found.</p>
        ) : (
            <>
          <div className="disease-cards">
            {filteredDiseases.map((disease, index) => (
              <div className="disease-card" key={index}>
                <h3>{disease.title}</h3>
                <img src={disease.image} alt={disease.title} />
                <p>{disease.description}</p>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button style={{color:'white'}}disabled={page===1} onClick={()=>setPage(page-1)}>Previous</button>
            <span>Page {page} of {totalpage} </span>
            <button style={{color:'white'}} disabled={page===totalpage} onClick={()=>setPage(page+1)}>next</button>
          </div>
          </>
        )}
      </div>
      <Footer/>
    </>
  )
}

export default Feed