import React, { useState } from "react";
import Home from "./Home";
import { Button } from "react-bootstrap";
import journalListApi from "../Utils/journalListApi";
import detailApi from "../Utils/detailApi";
import JournalList from "../Components/JournalList";
import JournalGet from "../Components/JournalGet";
import journalPostApi from "../Utils/journalPostApi";
import JournalPost from "../Components/JournalPost";
import transactionListApi from "../Utils/transactionListApi";
import accountListApi from "../Utils/accountListApi";

const Journals = () => {

    // LIST ITEM
    const [list, setList] = React.useState([])
    const listData = () => {
        journalListApi()
        .then((data) => setList(data))
        .catch((text) => console.log("Error: ", text))
    }
    

    // GET ITEM
    const [get, setGet] = React.useState([]);
    const [showGet, setShowGet] = React.useState(false);
    const handleCloseGet = () => setShowGet(false);
    const handleShowGet = () => setShowGet(true);

    const getData = (url) => {
        detailApi(url, (data) => setGet(data), (text)=>{console.log("Error: ", text)})
    }


    // POST ITEM
    const [post, setPost] = React.useState([]);
    const [showPost, setShowPost] = React.useState(false);
    const handleClosePost = () => setShowPost(false)
    const handleShowPost = () => setShowPost(true)

    const postData = (journal) => {
        journalPostApi(journal)
        .then((data) => setPost(data))
        .catch((text)=>{console.log("Error: ", text)})
    }


    // ADDITIONAL
    const [listAccount, setListAccount] = useState()
    const [listTransaction, setListTransaction] = useState()

    const getListAccountTransaction = () => {
        accountListApi()
        .then((data) => setList(data))
        .catch((data) => console.log(data));
        
        transactionListApi()
        .then((data) => setListTransaction(data))
    }

    React.useEffect(()=>{listData()}, [])

    return (
        <div>
            <Home/>
            <div style={{width: "800px", margin: "auto", marginTop: "20px", marginBottom: "50px", boxShadow: "5px 5px 20px #cccccccc", padding: "1em"}}>
                <h4 style={{textAlign:'left'}}>Journals</h4>
                <Button 
                    style={{marginTop:'20px'}} 
                    onClick={() => {handleShowPost(); getListAccountTransaction()}} 
                    variant="primary" size="sm" active>Add Journal
                </Button>
                <JournalList 
                    handleShowGet={handleShowGet} 
                    list={list} 
                    getData={getData}
                />
                <JournalGet 
                    handleCloseGet={handleCloseGet} 
                    showGet={showGet} 
                    get={get} 
                />
                <JournalPost 
                    handleClosePost={handleClosePost} 
                    showPost={showPost} 
                    postData={postData} 
                    listAccount={listAccount} 
                    listTransaction={listTransaction} 
                />
            </div>
        </div>
    )
}

export default Journals