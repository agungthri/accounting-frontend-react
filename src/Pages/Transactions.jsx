import Home from "./Home";
import transactionListApi from "../Utils/transactionListApi";
import TransactionList from "../Components/TransactionList.js";
import TransactionGet from "../Components/TransactionGet";
import TransactionPost from "../Components/TransactionPost";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";



const Transactions = () => {

    // LIST ITEM
    const [list, setList] = useState([])

    // GET ITEM
    const [get, setGet] = useState({});
    const [showGet, setShowGet] = useState(false);

    
    // POST ITEM
    const [post, setPost] = useState([]);
    const [showPost, setShowPost] = useState(false);


    useEffect(()=>{
        transactionListApi()
        .then((data) => setList(data))
        .catch((text) => console.log("Error: ", text))
    }, [post])


    return (
        <div>
            <Home/>
            <div style={{width: "800px", margin: "auto", marginTop: "20px", marginBottom: "50px", boxShadow: "5px 5px 20px #cccccccc", padding: "1em"}}>
                <h4 style={{textAlign:'left'}}>Transactions</h4>
                <Button onClick={() => setShowPost(true)} variant="primary" size="sm" active>Add Transaction</Button>
                <TransactionList 
                    setShowGet={() => setShowGet(true)} 
                    list={list}
                    setList={setList}
                    setGet={setGet}
                />
                <TransactionGet 
                    setShowGet={() => setShowGet(false)} 
                    showGet={showGet} 
                    get={get}
                    setGet={setGet}
                    setPost={setPost}
                />
                <TransactionPost 
                    setShowPost={() => setShowPost(false)} 
                    showPost={showPost}
                    setPost={setPost}
                />
            </div>
        </div>

    )
}

export default Transactions