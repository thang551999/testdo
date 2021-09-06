import { Router } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Form, Image } from "react-bootstrap";
import { onlineAPI } from "../api/online/online";
import { uploadAPI } from "../api/upload/upload";

const CreateOnline = () => {
  const Router = useRouter();
  const initOnline = {
    name: "",
    noidung: "",
    gia: "",
    thongtinthem: "",
    sdt: "",
  };
  const [dataOnline, setDataOnline] = useState(initOnline);
  const { name, noidung, gia, thongtinthem, sdt } = dataOnline;
  const [inputImage, setInputImage] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("0");

  const handleChangeOnline = (e) => {
    const { name, value } = e.target;
    setDataOnline({ ...dataOnline, [name]: value });
  };

  const handleChangeOnlineImage = (e) => {
    // console.log(e.target.files[0])
    setInputImage(e.target.files[0]);
  };

  useEffect(() => {
    uploadAPI
      .uploadAvatarAPI(inputImage)
      .then((res) => {
        // console.log(res.data.link)
        setImage(res.data.link);
      })
      .catch((err) => console.log(err));
  }, [inputImage]);

  const handleChangeStatus = (e) => {
    if (status === "0") {
      setStatus("1");
    } else {
      setStatus("0");
    }
  };

  const handleCreateOnline = (e) => {
    const body = {
      tenkhoahoc: name,
      noidung: noidung,
      thongtinthem: thongtinthem,
      gia: gia,
      image: image,
      sdt: sdt,
      status: status,
    };
    onlineAPI.createOnline(body).then((res) => {
      console.log(res);
      Router.push("/online/getAllOnline");
    });
  };

  return (
    <div className="profiles">
      <div className="container">
        <h1 className="title">Tạo Khóa Học Online</h1>

        <div className="profile-gird-name">
          <label htmlFor="name" className="profile-textlabel">
            Tên khóa học
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            name="name"
            onChange={handleChangeOnline}
          />
          <label htmlFor="name" className="profile-textlabel">
            Nội dung
          </label>
          <br />
          <textarea
            name="noidung"
            id=""
            className="profile-input"
            onChange={handleChangeOnline}
          ></textarea>
          <label htmlFor="name" className="profile-textlabel">
            Giá
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            name="gia"
            onChange={handleChangeOnline}
          />
          <label htmlFor="name" className="profile-textlabel">
            Số điện thoại
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            name="sdt"
            onChange={handleChangeOnline}
          />
          <label htmlFor="name" className="profile-textlabel">
            Ảnh
          </label>
          <br />
          <input
            id="name"
            type="file"
            className="profile-input"
            onChange={handleChangeOnlineImage}
          />
          <Image style={{width:"50%"}} src={image} alt="loading..."></Image>
          <br />
          <label htmlFor="name" className="profile-textlabel">
            Thông tin thêm
          </label>
          <br />
          <textarea
            id="name"
            className="profile-input"
            name="thongtinthem"
            onChange={handleChangeOnline}
          ></textarea>
          <br />
          <label htmlFor="name" className="profile-textlabel">
            Status
          </label><br />
          <Form.Check
            aria-label="option 1"
            name="status"
            onClick={handleChangeStatus}
          />
        </div>

        <div className="button-container">
          <button className="profile-button" onClick={handleCreateOnline}>
            Tạo thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOnline;
