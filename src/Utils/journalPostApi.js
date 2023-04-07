const journalPostApi = async (data, successPost, failed, callback) => {
    const token = localStorage.getItem('loginToken')
    if (token === null){
        window.location = '/login/'
        return []
    };

    const response = await fetch(
        "http://127.0.0.1:8000/journals/", {
            method:'POST',
            headers:{
                'Content-TYpe':'Application/JSON',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify(data)
        }
    );

    const text = await response.text();
    if (response.status === 401){
        console.log('token not valid');
        window.location = '/login/';
        return [];
    }
    if (response.status === 201){
        successPost(JSON.parse(text))
        console.log('success');
        callback()

    } else {
        failed(text);
    }
}

export default journalPostApi