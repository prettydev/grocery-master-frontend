import React, { useState, useEffect } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

export default function Uploader(props) {
  const [fileList, setFileList] = useState(
    props.fileList ? props.fileList : []
  );
  const [file, setFile] = useState();

  const onChange = ({ fileList: newFileList, file: newFile, event }) => {
    setFileList(newFileList);
    setFile(newFile);

    if (!newFile.response) return;
    console.log(newFile);

    props.upload(newFile.response.url);
    // form.setFieldsValue(avatar:newFile.response.url);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotate>
      <Upload
        action={process.env.UPLOAD_URL}
        data={{ upload_preset: process.env.CLOUDINARY_PRESET }}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 1 && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
}
