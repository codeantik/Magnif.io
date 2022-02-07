import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Upload, message } from "antd";
const { Dragger } = Upload;
import { CloudUploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import axios from "axios";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	height: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 10,
};

export default function Files() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [uploadedFile, setUploadedFile] = useState();

  const handleUpload = async () => {
      await axios.post('http://34.223.255.47/uploadText', {
        file: uploadedFile,
        company: 'magnifio'
      }, {
        headers: {
          'Content-Type': uploadedFile.type
        },
      })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })

      message.success('File uploaded successfully!');
      setOpen(false)
  }

	const props = {
		customRequest({ file, onSuccess }) {
			console.log(file, onSuccess);
			setTimeout(() => {
				onSuccess("ok");
			}, 1000);
		},

		onChange(info) {
			const { status } = info.file;
			if (status !== "uploading") {
				console.log(info.file, info.fileList);
				setUploadedFile(info.file);
			}
			if (status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed`);
			}
		},

		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
			setUploadedFile(e.dataTransfer.files[0]);
		},
	};

  return (
        <div className="modal-container">
            <button 
                onClick={handleOpen} 
                className="upload-btn" 
                style={{ background: '#007090', padding: '5px 20px', 
                    margin: '10px', color: '#fff', borderRadius: '5px'}}
                >
                New
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <button onClick={handleUpload} style={{ marginBottom: '10px', marginTop: '-50px', marginLeft: '37%', outline: 'none', background: '#2f6e8c', color: 'white', width: '25%', padding: '5px', borderRadius: '10px'}}>Upload</button>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <CloudUploadOutlined style={{ fontSize: '100px', color: '#5e99d0' }}/>
                        </p>
                        <p className="ant-upload-text">Drag and Drop your File</p>
                        <button 
                            style={{ all: 'none', background: '#2f6e8c', color: 'white', padding: '5px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                        >
                            Click to Browse
                        </button>
                    </Dragger>
                </Box>
            </Modal>
            {/* <button>Upload</button> */}
        </div>
    );
  }
