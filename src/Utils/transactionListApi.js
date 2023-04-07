const transactionListApi = () => {
    return new Promise(async (resolve, reject) => {
      const token = localStorage.getItem("loginToken");
      if (!token) {
        console.log("There are no credentials found");
        window.location = "/login/";
        reject(new Error("No credentials found"));
      }
  
      const response = await fetch("http://127.0.0.1:8000/transactions/", {
        method: "GET",
        headers: {
          "Content-Type": "Application/JSON",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      if (response.status === 401) {
        console.log("Token Not Valid");
        window.location = "/login/";
        reject(new Error("Token not valid"));
      }
      if (response.ok) {
        console.log("Success");
        resolve(data);
      } else {
        console.log("failed", data);
        const errorMessage = Object.entries(data)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n");
        reject(new Error(errorMessage));
      }
    });
  };
  
  export default transactionListApi;
  