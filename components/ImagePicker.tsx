import React, { useState, useEffect } from "react";
import { Upload } from "antd";
import { CameraOutlined, CloseOutlined } from "@ant-design/icons";

export default function ImagePicker({ image, upload }) {
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(image);

  const onChange = ({ fileList: newFileList, file: newFile, event }) => {
    setFileList(newFileList);
    setFile(newFile);

    if (!newFile.response) {
      console.error("Upload failed.");
      return;
    }
    console.log(newFile);

    setFile(newFile.response.url);
    upload(newFile.response.url);
    // form.setFieldsValue(avatar:newFile.response.url);
  };

  useEffect(() => {
    if (fileList && fileList.length > 1) {
      setFileList([fileList[fileList.length - 1]]);
    }
  }, [fileList]);

  return (
    <>
      <Upload.Dragger
        action={process.env.UPLOAD_URL}
        data={{ upload_preset: process.env.CLOUDINARY_PRESET }}
        fileList={fileList}
        multiple={false}
        onChange={onChange}
      >
        {file ? (
          <img alt="image" src={file} className="object-cover w-full h-auto" />
        ) : (
          <>
            <p className="ant-upload-drag-icon">
              <CameraOutlined />
            </p>
            <p className="ant-upload-text">Add Logo Image</p>
          </>
        )}
      </Upload.Dragger>

      {file && (
        <div className="w-full flex justify-center">
          <CloseOutlined
            onClick={(e) => {
              setFile(null);
              e.preventDefault();
            }}
          />
        </div>
      )}
    </>
  );
}
