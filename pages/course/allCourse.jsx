import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { courseAPI } from "../api/course/course";
import { Image } from "react-bootstrap";

const AllCourse = () => {
  const [adminCourse, setAdminCourse] = useState([]);
  const [adminCoursePlace, setAdminCoursePlace] = useState();
  useEffect(() => {
    courseAPI
      .getAllCourse()
      .then((res) => {
        // console.log(res.data);
        setAdminCourse(res.data);
        setAdminCoursePlace(res.data.courseList);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="getplace">
      <div className="container alert alert-light">
        {" "}
        <h2>Tất cả các Khóa học</h2>
        <br />
        <input
          id="search"
          type="text"
          className="form-control"
          placeholder="Search for name and email......"
        />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Tên khóa học</th>
              <th>Nội dung</th>
              <th>Thông tin thêm</th>
              <th>Ảnh đại diện</th>
              <th>Số lượng</th>
              <th>Địa chỉ</th>
            </tr>
          </thead>
          <tbody id="table">
            {adminCourse.map((course) => (
              <>
                {course.courseList.map((courselist) => (
                  <tr>
                    <td>{courselist.tenkhoahoc}</td>
                    <td>{courselist.noidung}</td>
                    <td>{courselist.thongtinthem}</td>
                    <td>
                      <Image src={courselist.image}></Image>
                    </td>
                    <td>{courselist.soluong}</td>
                    <td>{course.diachi}</td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCourse;
