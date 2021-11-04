import React, { useEffect, useState } from "react";
import { onlineAPI } from "../api/online/online";
import { Button, Image, Modal } from "react-bootstrap";
import { useRouter } from "next/dist/client/router";
const GetAllOnline = () => {
  const Router = useRouter();
  const [dataOnline, setDataOnline] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [idOnline, setIdOnline] = useState("");

  useEffect(() => {
    onlineAPI
      .getAllOnline()
      .then((res) => {
        setDataOnline(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => (e) => {
    onlineAPI
      .deleteOnline(id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="getplace">
      <div className="container alert alert-light">
        {" "}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Tất cả các khóa học Online</h2>
          <Button
            variant="primary"
            onClick={() => {
              Router.push("/online/createOnline");
            }}
          >
            Khóa học Online
          </Button>
        </div>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Tên khóa học</th>
              <th>Ảnh đại diện</th>
              <th style={{width: "20%"}}>Action</th>
            </tr>
          </thead>
          <tbody id="table">
            {dataOnline.map((course) => (
              <>
                <tr key={course.id}>
                  <td>{course.tenkhoahoc}</td>
                  <td >
                    <Image src={course.image} className="admin-img"></Image>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setIdOnline(course.id);
                        setLgShow(true);
                      }}
                    >
                      Xóa khóa học online 
                    </Button>
                    <Modal
                      size="lg"
                      show={lgShow}
                      onHide={() => setLgShow(false)}
                      aria-labelledby="example-modal-sizes-title-lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                          Bạn có muốn xóa khoá học online không
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="place-delete">
                        <Button
                          variant="primary"
                          onClick={handleDelete(idOnline)}
                        >
                          Xóa
                        </Button>{" "}
                      </Modal.Body>
                    </Modal>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllOnline;
