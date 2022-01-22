function AdminService(){
    this.mang=[];
    this.them = function (info) {
        this.mangSV.push(info);
    }
    this.layDS = () =>{
        return axios({
            // trả về đối tượng của AXIOS
            method: 'get',
            url: 'https://61e9bee47bc0550017bc645c.mockapi.io/Info',
            // responseType: 'stream'
        });

    }
    this.themTV = function (info) {
        return axios({
            method: 'post',
            url: 'https://61e9bee47bc0550017bc645c.mockapi.io/Info',
            data: info
        });
    }
    this.xoaTV = function (id) {
        return axios({
            method: 'delete',
            url: `https://61e9bee47bc0550017bc645c.mockapi.io/Info/${id}`

        });
    }
    this.layID = function (id) {
        return axios({
            method: 'get',
            url: `https://61e9bee47bc0550017bc645c.mockapi.io/Info/${id}`,

        });
    }
    this.capNhap = function (id,info) {
        return axios({
            method: 'put',
            url: `https://61e9bee47bc0550017bc645c.mockapi.io/Info/${id}`,
            data: info
        });
    }
    
    



}