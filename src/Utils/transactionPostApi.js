const transactionPostApi = (data) => {
    return new Promise(async (resolve, reject) => {
      const token = localStorage.getItem('loginToken')
      if (token === null){
          window.location = '/login/'
          reject(new Error('No token found.'))
      };
  
      const response = await fetch(
          "http://127.0.0.1:8000/transactions/", {
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
          reject(new Error('Token not valid.'))
      }
      if (response.status === 201){
          console.log('transactionPost', text);
          resolve(JSON.parse(text))
  
      } else {
          reject(new Error(`Failed to post data. Status code: ${response.status}`))
      }
    })
  };
  export default transactionPostApi;
  