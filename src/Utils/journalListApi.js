const journalListApi = async (success, fail) => {
    const token = await localStorage.getItem("loginToken")
    if (token === null){
        console.log("There is no credentials found")
        window.location = "/login/"
        return []
    }

    const response = await fetch(
        "http://127.0.0.1:8000/journals/",{
            method:"GET",
            headers:{
                'Content-Type':'Application/JSON',
                'Authorization':`Bearer ${token}`
            }
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
}
export default journalListApi