const reportApi = () => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('loginToken')
      if (token === null) {
        console.log('there is no token, login needed')
        window.location = '/login/'
        reject([])
      }
  
      fetch("http://127.0.0.1:8000/report/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.status === 401) {
            console.log(response.status, 'need authorization')
            window.location = '/login/'
            reject([])
          } else if (response.status === 200) {
            response.json().then(data => {
              console.log('success', data)
              resolve(data)
            })
          } else {
            response.text().then(text => {
              console.log('failed', text)
              reject(text)
            })
          }
        })
        .catch(error => {
          console.log('error', error)
          reject(error)
        })
    })
  }
  
  export default reportApi
  