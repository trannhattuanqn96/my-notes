

let dataConfig = {}
if (process.env.REACT_APP_ENVIRONMENT === 'dev') {
    dataConfig = {
        baseURLAPI: 'http://localhost:4000'
    }
} else {
    dataConfig = {
        baseURLAPI: 'http://tuandevzz77.site/api'
    }
}

export default dataConfig