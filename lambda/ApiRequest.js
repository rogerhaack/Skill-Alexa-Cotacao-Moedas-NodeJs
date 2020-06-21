const axios = require("axios");

module.exports = class ApiRequest{
    
    async makeRequest(url){
        let dados;
    
        await axios.get(url)
            .then(resp=> dados = resp.data);
    
        return dados;
    }
    
}