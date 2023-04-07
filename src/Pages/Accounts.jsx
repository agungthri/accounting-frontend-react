import Home from "./Home";
import AccountList from "../Components/AccountList";
import AccountGet from "../Components/AccountGet";
import { Button } from "react-bootstrap";
import AccountPost from "../Components/AccountPost";
import { useEffect } from "react";
import accountListApi from "../Utils/accountListApi";
import { useState } from "react";


const Accounts = () => {

    // LIST ITEM
    const [list, setList] = useState([]);


    // GET ITEM
    const [get, setGet] = useState({});
    const [showGet, setShowGet] = useState(false);
    

    // POST ITEM
    const [post, setPost] = useState([])
    const [showPost, setShowPost] = useState(false)


    useEffect(() => {
        accountListApi()
        .then((data) => setList(data))
        .catch((data) => console.log(data));
    }, [post])


    return (
        <div>
            <Home/>
            <div style={{width: "800px", margin: "auto", marginTop: "20px", marginBottom: "50px", boxShadow: "5px 5px 20px #cccccccc", padding: "1em"}}>
                <h4 style={{textAlign:'left'}}>Accounts</h4>
                <Button onClick={() => setShowPost(true)} variant="primary" size="sm" active>Add Account</Button>
                <AccountList setShowGet={() => setShowGet(true)} list={list} setList={setList} setGet={setGet}/>
                <AccountGet setShowGet={() => setShowGet(false)} showGet={showGet} setGet={setGet} get={get} setPost={setPost}/>
                <AccountPost setShowPost={() => setShowPost(false)} showPost={showPost} setPost={setPost} list={list}/>
            </div>
        </div>
    )
}

export default Accounts