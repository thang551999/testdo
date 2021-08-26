import React, { useEffect } from "react";
import { useState } from "react";
import { spaAPI } from "../api/spa/spa";
import { Image } from "react-bootstrap";

const GetAllService = () => {
  const [serviceSpa, setServiceSpa] = useState([]);
  useEffect(() => {
    spaAPI
      .getAllSpa()
      .then((res) => {
        // console.log(res);
        setServiceSpa(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="getplace">
      <div className="container alert alert-light">
        {" "}
        <h2>Tất cả các dịch vụ thể thao giải trí</h2>
        <br />
        {/* <input
            id="search"
            type="text"
            className="form-control"
            placeholder="Search for name and email......"
          />
          <br /> */}
        <table className="table">
          <thead>
            <tr>
              <th>Tên dịch vụ</th>
              <th>Nội dung</th>
              <th>Ảnh</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody id="table">
            {serviceSpa.map((serviceSport) => (
              <>
                {serviceSport.dichvu.map((dichvu) => (
                  <tr key={dichvu.id}>
                    <td>{dichvu.tendichvu}</td>
                    <td>{dichvu.noidung}</td>
                    <td style={{ width: "25%" }}>
                      <Image
                        src={dichvu.image}
                        alt="loading..."
                        style={{ width: "100%" }}
                      />
                    </td>
                    <td>{dichvu.gia}</td>
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

export default GetAllService;
