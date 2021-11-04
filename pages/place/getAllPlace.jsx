import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { placeAPI } from "../api/place/place";
import { Button, Modal } from "react-bootstrap";
import { useRouter } from "next/dist/client/router";
import { Image } from "react-bootstrap";
import { Carousel, Container } from "react-bootstrap";
const GetAllPlace = () => {
  const Router = useRouter();
  const [idPlace, setIdPlace] = useState("");
  const [message, setMessage] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const [status, setStatus] = useState("");
  var initPlace = [];
  const [adminPlace, setAdminPlace] = useState([]);
  const [updataStatus, setUpdateStatus] = useState("");
  useEffect(() => {
    placeAPI
      .getAllPlace()
      .then((res) => {
        console.log(res.data);
        setAdminPlace(res.data);
        initPlace.push(res.data);
        console.log(res.data);
        console.log(initPlace[0][1].name);
        setAdminPlace(initPlace[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  //   console.log(initPlace);

  const handleToCreatePt = () => {
    Router.replace("/pt/creatept");
  };

  const handleToCreateCourse = () => {
    Router.replace("/course/createCourse");
  };

  const handleDelete = (id) => (e) => {
    placeAPI
      .deletePlace(id)
      .then((res) => {
        // console.log(res)
        setMessage(res.data.message);
        // Router.replace("/place/getAllPlace");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setMessage("Bạn không được quyền xóa");
      });
  };
  const handleUpdateStatus = (id) => (e) => {
    const body = {
      update: "1",
      place: id,
    };
    console.log(body);
    placeAPI
      .updataStatus(body)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateStatusShow = (id) => (e) => {
    const body = {
      update: "0",
      place: id,
    };
    console.log(body);
    placeAPI
      .updataStatus(body)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="getplace">
      <div className="container alert alert-light">
        {" "}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{whiteSpace:"pre-wrap"}}> Tất cả các địa điểm</div>
          <Button
            variant="primary"
            onClick={() => {
              Router.push("/place/createPlace");
            }}
          >
            Thêm địa điểm 
          </Button>
        </div>
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
              <th>Tên</th>
              <th>Địa chỉ</th>
              <th>Ảnh</th>
              <th>Hiện thị/ Ẩn</th>
              <th>Tạo mới</th>
            </tr>
          </thead>
          <tbody id="table">
            {adminPlace.map((place) => (
              <tr key={place.id}>
                <td>{place.name}</td>
                <td>{place.diachi}</td>
                <td>
                 
                <div  className="multi-image">
              <Carousel interval={3000000} nextLabel='' prevLabel='' variant="dark" >
                {place.image &&
                  place.image.split(",").map((e, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <Image
                          className="d-block w-100"
                          src={e}
                          alt="First slide"
                        />
                        
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </div>
                    
                </td>
                <td>
                  {place.status === "0" ? (
                    <Button
                      style={{ marginTop: "10px" }}
                      variant="primary"
                      onClick={handleUpdateStatus(place.id)}
                    >
                      Ẩn
                    </Button>
                  ) : (
                    <Button
                      style={{ marginTop: "10px" }}
                      variant="primary"
                      onClick={handleUpdateStatusShow(place.id)}
                    >
                      Hiển Thị
                    </Button>
                  )}
                </td>
                <td
                  style={{
                    height:'100%',
                    minWidth: "200px",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    style={{ margin: "10px" }}
                    variant="primary"
                    onClick={handleToCreatePt}
                  >
                    Thêm huấn luận viên
                  </Button>{" "}
                  <Button
                    style={{ margin: "10px" }}
                    variant="primary"
                    onClick={handleToCreateCourse}
                  >
                    Thêm khoá học
                  </Button>{" "}
                  <Button
                    style={{ margin: "10px" }}
                    variant="primary"
                    onClick={() => {
                      setIdPlace(place.id);
                      setLgShow(true);
                      setMessage("");
                    }}
                  >
                    Xóa phòng gym
                  </Button>
                  <Button
                    style={{ margin: "10px" }}
                    variant="primary"
                    onClick={() => {
                     Router.push(`/place/${place.id}`)
                    }}
                  >
                   Xem chi tiết
                  </Button>
                  <Button
                    style={{ margin: "10px" }}
                    variant="primary"
                    onClick={()=>{
                      Router.push('/pt/getallpt')
                    }}
                  >
                    Danh sách huấn luận viên
                  </Button>
                  <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                        Bạn có muốn xóa địa điểm này không
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="place-delete">
                      <p>{message}</p>
                      <Button variant="primary" onClick={handleDelete(idPlace)}>
                        Xóa địa điểm
                      </Button>{" "}
                    </Modal.Body>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllPlace;
