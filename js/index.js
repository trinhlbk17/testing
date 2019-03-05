import {NguoiDung} from '../models/nguoidung';
import $ from 'jquery';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'
var DSND = [];
//Chức năng : Hiển thị modal thêm người dùng
var hienThiModal = function () {
    //đổi title của modal
    $('.modal-title').html('Thêm Người Dùng');
    var btnGroups = `
        <button class="btn btn-success" id="btnThem">Thêm Người Dùng</button>
        <button class="btn btn-secondary" data-dismiss="modal">Đóng</button>
    `
    $('.modal-footer').html(btnGroups);
}
//chức năng : Thêm Người Dùng
var themNguoiDung = function () {
    var taiKhoan = $('#TaiKhoan').val();
    var matKhau = $('#MatKhau').val();
    var hoTen = $('#HoTen').val();
    var email = $('#Email').val();
    var soDT = $('#SoDienThoai').val();
    var maLoaiNguoiDung = $('#maLoaiNguoiDung').val();

    //tạo đối tượng người dùng
    var NguoiDungMoi = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung);

    //kết nối server, thêm người dùng mới
    $.ajax({
        url: 'http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung',
        type: 'POST',
        data: NguoiDungMoi
    }).done(function (result) {
        console.log(result);
        //cách 1:
        // getUserListFromDB();
        //Cách 2: 
        DSND.push(NguoiDungMoi);
        taoBang(DSND);

    }).fail(function (error) {
        console.log(error);
    })
    //ẩn modal
    $('.close').trigger('click');

    //clear input
    $('.modal-body input').val('');
}

var taoBang = function (danhSach) {
    var content = '';
    for (var i = 0; i < danhSach.length; i++) {
        content += `
            <tr>
                <td>${i + 1}</td>
                <td>${danhSach[i].TaiKhoan}</td>
                <td>${danhSach[i].MatKhau}</td>
                <td>${danhSach[i].HoTen}</td>
                <td>${danhSach[i].Email}</td>
                <td>${danhSach[i].SoDT}</td>
                <td>
                    <button class="btn btn-success btnXoa" data-taikhoan="${danhSach[i].TaiKhoan}">Xóa</button>
                    <button
                        data-taikhoan="${danhSach[i].TaiKhoan}" 
                        data-matkhau="${danhSach[i].MatKhau}" 
                        data-hoten="${danhSach[i].HoTen}" 
                        data-email="${danhSach[i].Email}" 
                        data-sodt="${danhSach[i].SoDT}"
                        data-maloainguoidung="${danhSach[i].MaLoaiNguoiDung}" 
                        data-toggle="modal"
                        data-target="#myModal"
                        class="btn btn-info btnCapNhat"
                    
                    >Cập Nhật</button>
                </td>
            </tr>
        `
    }
    $('#tblDanhSachNguoiDung').html(content);
}

var xoaNguoiDung = function () {
    //b1: lấy ra data-taikhoan ma btn đang lưu
    var taiKhoan = $(this).attr('data-taikhoan');
    $.ajax({
        url: 'http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/' + taiKhoan,
        type: 'DELETE'
    }).done(function (res) {
        var index = timViTriTheoTaiKhoan(DSND, taiKhoan);
        if (index !== -1) {
            DSND.splice(index, 1);
            taoBang(DSND);
        }

    }).fail(function (err) {
        console.log(err)
    })


}

var timViTriTheoTaiKhoan = function (danhSach, taiKhoan) {
    for (var i = 0; i < danhSach.length; i++) {
        if (danhSach[i].TaiKhoan === taiKhoan) {
            return i;
        }
    }
    return -1;
}

//Lấy thông tin người dùng
var layThongTinND = function () {
    //b1: lấy ra thông tin ma btn đang lưu
    var taiKhoan = $(this).attr('data-taikhoan');
    var matKhau = $(this).attr('data-matkhau');
    var HoTen = $(this).attr('data-hoten');
    var Email = $(this).attr('data-email');
    var soDT = $(this).attr('data-sodt');
    var maLoaiNguoiDung = $(this).attr('data-maloainguoidung');
    //b2: set giá trị cho input
    $('#TaiKhoan').val(taiKhoan)
    $('#MatKhau').val(matKhau);
    $('#HoTen').val(HoTen);
    $('#Email').val(Email);
    $('#SoDienThoai').val(soDT);
    $('#maLoaiNguoiDung').val(maLoaiNguoiDung);
    //b3 : gọi hàm  cập nhật lại modal

}



//----------------------------------AJAX--------------------------------------

var getUserListFromDB = function () {
    $.ajax({
        url: 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung',
        type: 'GET'
    }).done(function (res) {
        //code chạy khi server trả về kết quả
        console.log(res);
        DSND = res;
        taoBang(DSND);
    }).fail(function (err) {
        console.log(err);
    })

}
getUserListFromDB();



//----gắn sự kiện-----------
$('#btnThemNguoiDung').click(hienThiModal);
// $('#btnThemNguoiDung').click(function(){

// });

//đối với các thẻ mà được tạo động thông qua code javascript, thì
//ta sẽ sự kiện kiểu khác
$('body').delegate('#btnThem', 'click', themNguoiDung);
$('body').delegate('.btnXoa', 'click', xoaNguoiDung);
$('body').delegate('.btnCapNhat', 'click', layThongTinND);