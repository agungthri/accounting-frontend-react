const accountPutApi = (data) => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("loginToken");
    if (!token) {
      reject(new Error("No credentials found"));
    }

    const response = await fetch(`http://127.0.0.1:8000/accounts/${data.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      reject(new Error("Token not valid"));
    }

    if (!response.ok) {
      const errorData = await response.json();
      reject(new Error(errorData));
    }

    const responseData = await response.json();
    resolve(responseData);
  });
};

export default accountPutApi;
