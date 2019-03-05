var courseList = [];
var getCourseListFromDB = function () {
    $.ajax({
        url: 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc',
        type: 'GET'
    }).done(function (result) {
        courseList = result;
        renderCourseItems();
    }).fail(function (err) {
        console.log(err);
    })
}

var renderCourseItems = function () {
    var content = '';
    for (var i = 0; i < courseList.length; i++) {
        content += `
            <div class="col-3">
                <div class="card mb-3">
                    <img src="${courseList[i].HinhAnh}" style="height:300px" />
                    <p>${courseList[i].TenKhoaHoc}</p>
                    <p>Người tạo :${courseList[i].NguoiTao} </p>
                    <a href="chitiet.html?makhoahoc=${courseList[i].MaKhoaHoc}" class="btn btn-success btnXemChiTiet">Xem Chi Tiết</a>
                </div>
            </div>
        `
    }
    $('#danhSachKhoaHoc').html(content);
}
// $('body').delegate('.btnXemChiTiet','click',function(){
//     window.location.assign('chitiet.html?makhoahoc=' + maKhoaHoc)
// })
getCourseListFromDB();