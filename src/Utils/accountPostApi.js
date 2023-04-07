const accountPostApi = (data) => {
    return new Promise(async (resolve, reject) => {
      const token = localStorage.getItem('loginToken');
      if (!token){
        return reject(new Error('Token not found'));
      }
  
      const response = await fetch(
        "http://127.0.0.1:8000/accounts/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data)
        }
      );
  
      if (response.status === 401){
        console.log('Token not valid');
        return reject(new Error('Token not valid'));
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        return reject(new Error(errorText));
      }
      
      const jsonResponse = await response.json();
      resolve(jsonResponse);
    });
  };
  
  export default accountPostApi;
  