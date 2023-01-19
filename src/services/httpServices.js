import axios from 'axios'

export const handleError = (error = {}) => {
  const { status = '', statusText = '', data } = (error?.response || {})
  try {
    return {
      code: status,
      message: typeof data === 'string' ? data : (statusText || 'Something went wrong, Please try again later!')
    }
  } catch (error) {
    return {
      code: 'unknown issue',
      message: 'Something went wrong, Please try again later!'
    }
  }
}

export const apiCall = async ({
  method = 'GET', params = {}, data = {}, url = '/', headers = {}, auth = true, baseURL = 'https://jsonplaceholder.typicode.com', dummy = false, noDataValue = [], ignore404 = false
}) => {
  const mainUrl = dummy ? process?.env?.REACT_APP_DUMMY_API_URL : baseURL
  // const queryString = params && Object.keys(params).length ? `?${new URLSearchParams(params).toString()}` : ''
  const request = {
    url,
    baseURL: mainUrl,
    method,
    params,
    data,
    headers: {
      'Content-Type': 'application/json',
      // ...(auth ? { 'Authorization': `bearer ${getCookie('auth') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkpFR0lOVExcXFNJTkdIQTIzIiwibmJmIjoxNjM5Mzc4MDA2LCJleHAiOjE2Mzk5ODI4MDYsImlhdCI6MTYzOTM3ODAwNiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo0ODg0OSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDg4NDkifQ.2PacsyW84BKbs078P2qva8HVVqoJwqhPeBvusaqKczk'}` } : {}),
      ...headers
    },
    ...(auth ? { withCredentials: true } : {}),
  }
  try {
    const response = await (axios(request))
    return response.data
  } catch (error) {
    const err = handleError(error)
    // if (err.code === 404) {
    //   return Promise.resolve(noDataValue)
    // }
    return Promise.reject(err)
  }
}

