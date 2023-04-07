const journalPutApi = async (data, success, fail, callback) => {
    const token = localStorage.getItem("loginToken")
    if (token === null){
        console.log("There is no credentials found")
        window.location = "/login/"
        return []
    }

    const response = await fetch(
        `http://127.0.0.1:8000/journals/${data.id}/`,{
            method:"PUT",
            headers:{
                'Content-Type':'Application/JSON',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify(data)
        }
    );

    const text = await response.text();
    if (response.status === 401){
        console.log("Token Not Valid");
        window.location = "/login/";
        return [];
    }
    if (response.status === 200){
        console.log('Success');
        success(JSON.parse(text))
        
    } else {
        console.log("failed", text);
        Object.entries(JSON.parse(text)).forEach(([key, value]) => {
            fail(`${key}: ${value}`);
        })
    }
    callback()
}
export default journalPutApi