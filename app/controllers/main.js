let infoPeople = new AdminService();
let validation = new Validation();



let layDSSP = () => {
    infoPeople.layDS()
        .then((result) => {
            console.log(result.data);
            hienThiThongTin(result.data);
            infoPeople.mang = result.data;

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
                    <button class="btn btn-info" data-toggle="modal"
                    data-target="#myModal" onclick="xemChiTiet(${info.id})">Xem</button>
                    <button class="btn btn-danger" onclick="xoaNguoiDung(${info.id})">Xoa</button>
                </td>
            </tr>
        `;
        count++;
    });
    document.getElementById("tblDanhSachNguoiDung").innerHTML = content;

};
// Tạo Sự kiện thêm nút button Thêm 

document.getElementById("btnThemNguoiDung").addEventListener("click", () => {
    document.getElementById("TaiKhoan").disabled = false;
    document.getElementById("foodForm").reset();
    document.querySelector(".modal-footer").innerHTML = `<button class="btn btn-info" onclick="reset()">Reset</button>
    <button class="btn btn-success" onclick="themNguoiDung()">Thêm</button>`;
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

    let isValid = true;

    isValid &= validation.checkEmpty(taikhoan, "spanTaiKhoan", "Tài Khoản Ko Để Trống")
        && validation.checkID(taikhoan, "spanTaiKhoan", "Tai khoang Bi Trung", infoPeople.mang);

    isValid &= validation.checkEmpty(hoten, "spanHoTen", "Họ Tên Ko Để Trống")
    && validation.checkName(hoten,"spanHoTen","Họ Tên Ko Nên chứa Số Và Ký Tự Đăc Biệt");

    isValid &= validation.checkEmpty(matkhau, "spanMatKhau", "Mật Khẩu Ko Để Trống")
    && validation.checkPass(matkhau, "spanMatKhau", "Mật KHẩu ko Đúng ĐỊnh Dạng");

    isValid &= validation.checkEmpty(email, "spanEmail", "Email Ko Để Trống")
    && validation.checkEmail(email, "spanEmail","Email ko Đúng ĐỊnh Dạng");

    isValid &= validation.checkEmpty(hinhanh, "spanHinhAnh", "Hình Ảnh Ko Để Trống");

    isValid &= validation.checkSelect("loaiNguoiDung", "spanloaiNguoiDung", "Chọn Loai ND");

    isValid &= validation.checkSelect("loaiNgonNgu", "spanloaiNgonNgu", "Chọn Loai Ngôn Ngữ");


    isValid &= validation.checkEmpty(mota, "spanMoTa", "Mô Tả Ko Để Trống")
    && validation.check60(mota,"spanMoTa","Mô Tả ko Nên Vượt Quá 60 ký Tự");

    if (isValid) {
        let info = new NguoiDung(taikhoan, hoten, matkhau, email, loaiND, ngonngu, mota, hinhanh);
        console.log(info);
        infoPeople.themTV(info)
            .then(function (result) {
                //thành công
                console.log(result.data);
                //Lấy Danh Sách Sản Phẩm Mới
                layDSSP();
                document.querySelector("#myModal .close").click();


            })
            .catch(function (error) {
                //thất bại
                console.log(error);
            })
    }




}

function xoaNguoiDung(id) {
    infoPeople.xoaTV(id)
        .then(function (result) {
            //thành công
            console.log(result.data);
            //Lấy Danh Sách Sản Phẩm Mới
            layDSSP();


        })
        .catch(function (error) {
            //thất bại
            console.log(error);
        })
}
function xemChiTiet(id) {
    infoPeople.layID(id)
        .then(function (result) {

            console.log("thanh cong", result.data);


            document.getElementById("TaiKhoan").value = result.data.taiKhoan;
            document.getElementById("HoTen").value = result.data.hoTen;
            document.getElementById("MatKhau").value = result.data.matKhau;
            document.getElementById("Email").value = result.data.email;
            document.getElementById("HinhAnh").value = result.data.hinhAnh;
            document.getElementById("loaiNguoiDung").value = result.data.loaiND;
            document.getElementById("loaiNgonNgu").value = result.data.ngonNgu;
            document.getElementById("MoTa").value = result.data.moTa;

            document.querySelector(".modal-footer").innerHTML = `<button class="btn btn-info" onclick="reset()">Reset</button>
            <button class="btn btn-success" onclick="capNhapNguoiDung('${result.data.id}')">Cập Nhập</button>`;
            document.getElementById("TaiKhoan").disabled = true;
        })
        .catch(function (error) {
            //thất bại
            console.log(error);
        })
}

function capNhapNguoiDung(id) {

    let taikhoan = document.getElementById("TaiKhoan").value;
    let hoten = document.getElementById("HoTen").value;
    let matkhau = document.getElementById("MatKhau").value;
    let email = document.getElementById("Email").value;
    let hinhanh = document.getElementById("HinhAnh").value;
    let loaiND = document.getElementById("loaiNguoiDung").value;
    let ngonngu = document.getElementById("loaiNgonNgu").value;
    let mota = document.getElementById("MoTa").value;

    let isValid = true;

    isValid &= validation.checkEmpty(taikhoan, "spanTaiKhoan", "Tài Khoản Ko Để Trống");

    isValid &= validation.checkEmpty(hoten, "spanHoTen", "Họ Tên Ko Để Trống")
    && validation.checkName(hoten,"spanHoTen","Họ Tên Ko Nên chứa Số Và Ký Tự Đăc Biệt");

    isValid &= validation.checkEmpty(matkhau, "spanMatKhau", "Mật Khẩu Ko Để Trống")
    && validation.checkPass(matkhau, "spanMatKhau", "Mật KHẩu ko Đúng ĐỊnh Dạng");

    isValid &= validation.checkEmpty(email, "spanEmail", "Email Ko Để Trống")
    && validation.checkEmail(email, "spanEmail","Email ko Đúng ĐỊnh Dạng");

    isValid &= validation.checkEmpty(hinhanh, "spanHinhAnh", "Hình Ảnh Ko Để Trống");

    isValid &= validation.checkSelect("loaiNguoiDung", "spanloaiNguoiDung", "Chọn Loai ND");

    isValid &= validation.checkSelect("loaiNgonNgu", "spanloaiNgonNgu", "Chọn Loai Ngôn Ngữ");


    isValid &= validation.checkEmpty(mota, "spanMoTa", "Mô Tả Ko Để Trống")
    && validation.check60(mota,"spanMoTa","Mô Tả ko Nên Vượt Quá 60 ký Tự");

    if (isValid) {
        let info = new NguoiDung(taikhoan, hoten, matkhau, email, loaiND, ngonngu, mota, hinhanh)

        infoPeople.capNhap(id, info)
            .then(function (result) {
                console.log("thành công", result.data);
                layDSSP();
                //UX : Tắt modal boostrap
                document.querySelector("#myModal .close").click();

            })
            .catch(function (error) {
                //thất bại
                console.log(error);
            })
    }

}
function resetSpan() {
    var nodeList = document.querySelectorAll("span.text-danger");
    var nodeArray = [];
    for (var i = 0; i < nodeList.length; ++i) {
        nodeArray[i] = nodeList[i];
    }
    nodeArray.map(x => x.style.display = "none")
}

let reset = () => {
    resetSpan();
    document.getElementById("myModal").reset();
    document.getElementById("TaiKhoan").disabled = false;
}

document.querySelector(".close").onclick = reset;