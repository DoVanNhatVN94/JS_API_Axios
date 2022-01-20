function AdminService(){
    this.layDS = () =>{
        return axios({
            // trả về đối tượng của AXIOS
            method: 'get',
            url: 'https://61e9bee47bc0550017bc645c.mockapi.io/Info',
            responseType: 'stream'
        });

    }
    this.themTV = (info) =>{
        return axios({
            method: 'post',
            url: 'https://61e9bee47bc0550017bc645c.mockapi.io/Info',
            data: info
        });
    }



}