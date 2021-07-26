import { useRouter } from "next/dist/client/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { placeAPI } from "../api/place/place";
import { uploadAPI } from "../api/upload/upload";
import { Image } from "react-bootstrap";

const CreatePlace = () => {
  const Router = useRouter();
  const initPlace = { name: "", diachi: "", thongtinthem: "" };
  const [adminPlace, setAdminPlace] = useState(initPlace);
  const { name, diachi, thongtinthem } = adminPlace;
  const [inputImage,setInputImage] = useState();
  const [image, setImage] = useState("");

  const handleChangePlace = (e) => {
    const { name, value } = e.target;
    setAdminPlace({ ...adminPlace, [name]: value });
  };

  const handleChangeImage = (e) => {
    // console.log(e.target.files[0])
    setInputImage(e.target.files[0])
  }

  useEffect(()=>{
    uploadAPI.uploadAvatarAPI(inputImage)
      .then(res => {
        // console.log(res.data.link)
        setImage(res.data.link)
      })
      .catch(err => console.log(err))
  },[inputImage])

  const handleCreatePlace = (e) => {
    e.preventDefault();
    const body = {
      "name": name,
      "diachi": diachi,
      "image": image,
      "thongtinthem": thongtinthem
    };
    placeAPI
      .createPlace(body)
      .then((res) => {
        console.log(res);
        Router.replace("/place/getAllPlace");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profiles">
      <div className="container">
        <h1 className="title">Thêm địa điểm mới</h1>

        <div className="profile-gird-name">
          <label htmlFor="name" className="profile-textlabel">
            Tên địa chỉ
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            name="name"
            onChange={handleChangePlace}
          />

          <label htmlFor="name" className="profile-textlabel">
            Địa chỉ
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            name="diachi"
            onChange={handleChangePlace}
          />

          <label htmlFor="name" className="profile-textlabel">
            Image
          </label>
          <br />
          <input
            id="name"
            type="file"
            className="profile-input"
            name="image"
            onChange={handleChangeImage}
          />
          <Image src={image} alt="loading..."></Image><br />

          <label htmlFor="name" className="profile-textlabel">
            Thông tin thêm
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            name="thongtinthem"
            onChange={handleChangePlace}
          />
        </div>
        <div className="button-container">
          <button className="profile-button" onClick={handleCreatePlace}>
            Tạo thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlace;
