import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { placeAPI } from "../api/place/place";
import { Button } from "react-bootstrap";
import { useRouter } from "next/dist/client/router";
import { Image } from "react-bootstrap";

const getAllSchedule = () => {
    const Router = useRouter();
  var initPlace = [];
  const [adminPlace, setAdminPlace] = useState([]);
  useEffect(() => {
    placeAPI
      .getAllPlace()
      .then((res) => {
        // console.log(res.data.length);
        // setAdminPlace(res.data)
        initPlace.push(res.data);
        console.log(res.data);
        console.log(initPlace[0][1].name);
        setAdminPlace(initPlace[0]);
      })
      .catch((err) => console.log(err));
  });
  //   console.log(initPlace);

  const handleToCreatePt = () =>{
    Router.replace("/pt/creatept");
  }

  const handleToCreateCourse = () => {
    Router.replace("/course/createCourse");
  }

  return (
    <div className="getplace">
      <div className="container alert alert-light">
        {" "}
        <h2>Tất cả các địa điểm</h2>
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
              <th>Phòng tập</th>
              <th>Địa chỉ</th>
              <th>Ảnh</th>
              <th>Tạo mới</th>
            </tr>
          </thead>
          <tbody id="table">
            {adminPlace.map((place) => (
              <tr>
                <td>{place.name}</td>
                <td>{place.diachi}</td>
                <td>
                  <Image src={place.image} alt="loading..."></Image>
                </td>
                <td>
                  <Button variant="primary" onClick={handleToCreatePt}>Thêm PT</Button>{" "}
                  <Button variant="primary" onClick={handleToCreateCourse}>Thêm Course</Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default getAllSchedule;
