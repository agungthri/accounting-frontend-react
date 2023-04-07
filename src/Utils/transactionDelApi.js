const transactionDelApi = (id) => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("loginToken");
      if (token === null) {
        console.log("There are no credentials found");
        window.location = "/login/";
        reject("No credentials found");
      }
  
      fetch(`http://127.0.0.1:8000/transactions/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/JSON",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 401) {
            console.log("Token Not Valid");
            window.location = "/login/";
            reject("Token Not Valid");
          } else if (response.status === 204) {
            console.log("Success");
            resolve();
          } else {
            console.log("Failed");
            reject("Failed");
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };
  
  export default transactionDelApi;
  