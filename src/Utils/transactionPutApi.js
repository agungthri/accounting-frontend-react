const transactionPutApi = async (data) => {
    return new Promise(async (resolve, reject) => {
      const token = localStorage.getItem("loginToken")
      if (token === null) {
        console.log("There is no credentials found")
        reject("There is no credentials found")
      }
  
      const response = await fetch(`http://127.0.0.1:8000/transactions/${data.id}/`, {
        method: "PUT",
        headers: {
          'Content-Type': 'Application/JSON',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
  
      const text = await response.text()
      if (response.status === 401) {
        console.log("Token Not Valid")
        reject("Token Not Valid")
      }
      if (response.status === 200) {
        console.log('Success')
        resolve(JSON.parse(text))
      } else {
        console.log("failed", text)
        const errors = Object.entries(JSON.parse(text)).map(([key, value]) => `${key}: ${value}`)
        reject(errors.join('\n'))
      }
    })
  }
  
  export default transactionPutApi
  