var infoPeople = new AdminService();

let layDSSP = () => {
    infoPeople.layDS()
        .then((result) => {
            console.log(result.data);
            hienThiThongTin(result.data);
        })
        .catch((error) => {
            console.log(error);
        })

}
layDSSP();
let hienThiThongTin = (array) => {
    let content = "";
    let count = 1;
    array.map((info) => {
        content += `
            <tr>
                <td>${count}</td>
                <td>${info.taiKhoan}</td>
                <td>${info.matKhau}</td>
                <td>${info.hoTen}</td>
                <td>${info.email}</td>
                <td>${info.ngonNgu}</td>
                <td>${info.loaiND}</td>
                <td>
                    <button class="btn btn-info">Xem</button>
                </td>
            </tr>
        `;
        count++;
    });
    document.getElementById("tblDanhSachNguoiDung").innerHTML = content;

};
// Tạo Sự kiện thêm nút button Thêm 

document.getElementById("btnThemNguoiDung").addEventListener("click", () => {
   
    document.querySelector(".modal-footer").innerHTML = `<button class="btn btn-succes" onclick="themNguoiDung()">Thêm</button>`;
});
// Thêm Người Dùng 

let themNguoiDung = () => {
    let taikhoan = document.getElementById("TaiKhoan").value;
    let hoten = document.getElementById("HoTen").value;
    let matkhau = document.getElementById("MatKhau").value;
    let email = document.getElementById("Email").value;
    let hinhanh = document.getElementById("HinhAnh").value;
    let loaiND = document.getElementById("loaiNguoiDung").value;
    let ngonngu = document.getElementById("loaiNgonNgu").value;
    let mota = document.getElementById("MoTa").value;

    let info = new NguoiDung(taikhoan, hoten, matkhau, email, loaiND, ngonngu, mota, hinhanh);
    console.log(info);
}