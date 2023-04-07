const transactionJournalPostApi = (data) => {
    return new Promise(async (resolve, reject) => {
      const token = localStorage.getItem('loginToken');
      if (token === null) {
        window.location = '/login/';
        reject([]);
      }
  
      try {
        const response = await fetch('http://127.0.0.1:8000/transaction-journal/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
  
        const text = await response.text();
        if (response.status === 401) {
          console.log('token not valid');
          window.location = '/login/';
          reject([]);
        } else if (response.status === 201) {
          console.log('success');
          resolve(JSON.parse(text));
        } else {
          reject(text);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  
  export default transactionJournalPostApi;
  