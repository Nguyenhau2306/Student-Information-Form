function emailIsValid(email) {
  return /^[^s@]+@[^s@]+[^s@]+$/.test(email);
}
function save() {
  let fullname = document.getElementById("fullname").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let gender = "";
  if (document.getElementById("male").checked) {
    gender = document.getElementById("male").value;
  } else if (document.getElementById("famale").checked) {
    gender = document.getElementById("famale").value;
  }

  if (_.isEmpty(fullname)) {
    fullname = "";
    document.getElementById("fullname-error").innerHTML =
      "vui lòng nhập họ và tên!";
  } else if (fullname.trim().length <= 2) {
    fullname = "";
    document.getElementById("fullname-error").innerHTML =
      "Không được nhỏ hơn 2 kí tự!";
  } else if (fullname.trim().length > 50) {
    fullname = "";
    document.getElementById("fullname-error").innerHTML =
      "Không được lớn hơn 50 kí tự!";
  } else {
    document.getElementById("fullname-error").innerHTML = "";
  }

  if (_.isEmpty(email)) {
    email = "";
    document.getElementById("email-error").innerHTML =
      "vui lòng nhập email của bạn!";
  } else if (!emailIsValid(email)) {
    email = "";
    document.getElementById("email-error").innerHTML =
      "Email không đúng định dạng!";
  } else {
    document.getElementById("email-error").innerHTML = "";
  }

  if (_.isEmpty(phone)) {
    phone = "";
    document.getElementById("phone-error").innerHTML =
      "vui lòng nhập sđt của bạn!";
  } else if (phone.trim().length > 10) {
    phone = "";
    document.getElementById("phone-error").innerHTML =
      "số điện thoại không đúng!";
  } else {
    document.getElementById("phone-error").innerHTML = "";
  }

  if (_.isEmpty(address)) {
    address = "";
    document.getElementById("address-error").innerHTML =
      "vui lòng nhập địa chỉ của bạn!";
  } else {
    document.getElementById("address-error").innerHTML = "";
  }

  if (_.isEmpty(gender)) {
    gender = "";
    document.getElementById("gender-error").innerHTML =
      "vui lòng chọn giới tính!";
  } else {
    document.getElementById("gender-error").innerHTML = "";
  }
  if (fullname && email && phone && address && gender) {
    //lưu vào danh sách sinh viên
    let students = localStorage.getItem("students")
      ? JSON.parse(localStorage.getItem("students"))
      : [];
    students.push({
      fullname: fullname,
      email: email,
      gender: gender,
      phone: phone,
      address: address,
    });
    localStorage.setItem("students", JSON.stringify(students));
    this.renderListStudent();
  }
}

function renderListStudent() {
  let students = localStorage.getItem("students")
    ? JSON.parse(localStorage.getItem("students"))
    : [];
  if (students.length === 0) {
    document.getElementById("list-student").style.display = "none";
    return false;
  }
  document.getElementById("list-student").style.display = "block";
  let tableContent = `<tr>
    <td>#</td>
    <td>Học và tên</td>
    <td>Email</td>
    <td>Giới tính</td>
    <td>Điện thoại</td>
    <td>Địa chỉ</td>
    <td>Hành động</td>
</tr>`;

  students.forEach((student, index) => {
    let studentId = index;
    let genderLabel = parseInt(student.gender) === 1 ? "Nam" : "Nữ";
    index++;
    tableContent += `<tr>
  <td>${index}</td>
  <td>${student.fullname}</td>
  <td>${student.email}</td>
  <td>${genderLabel}</td>
  <td>${student.phone}</td>
  <td>${student.address}</td>
  <td>
  <a href='#'>Edit</a> | <a href='#'onclick='deleteStudent(${studentId})'>Delete</a>
  </td>
</tr>`;
  });
  document.getElementById("grid-students").innerHTML = tableContent;
}

function deleteStudent(id) {
  let students = localStorage.getItem("students")
    ? JSON.parse(localStorage.getItem("students"))
    : [];
  students.splice(id, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderListStudent();
}
