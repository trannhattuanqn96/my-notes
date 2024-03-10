

let dataConfig = {}
if (process.env.ENVIRONMENT === 'dev') {
    dataConfig = {
        baseURLAPI: 'http://localhost:4000'
    }
} else {
    dataConfig = {
        baseURLAPI: 'http://mynoteapi.tuandevzz77.io.vn'
    }
}

export default dataConfig