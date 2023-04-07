const accountListApi = () => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("loginToken");

    if (!token) {
      window.location = "/login/";
      reject(new Error("No credentials found"));
    }

    const response = await fetch("http://127.0.0.1:8000/accounts/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      window.location = "/login/";
      reject(new Error(`Failed: ${response.statusText}`));
    }

    const data = await response.json();
    console.log("Success");
    resolve(data);
  });
};

export default accountListApi;
