import axios from "axios"

class UploadImageService {
    upload = async (files) => {
        if (!!files[0]) {
          const formUpload = new FormData();
          formUpload.append("file", files[0]);
          formUpload.append("upload_preset", "typer-upload");
    
          const { data, status } = await axios({
            url: "https://api.cloudinary.com/v1_1/toanil315/image/upload",
            method: "POST",
            data: formUpload,
          });
    
          if (status === 200) {
            return data
          }
        } else {
            return false
        }
      }
}

export const uploadImageService = new UploadImageService();