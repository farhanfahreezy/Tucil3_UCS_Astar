import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "./firebase";

function FileInput() {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileUrls, setFileUrls] = useState([]);
  const [fileContent, setFileContent] = useState("");

  const fileListRef = ref(storage, "test/");
  // const fileRef = ref(storage, `test/`);

  const getFileContent = async (url) => {
    const response = await fetch(url);
    const content = await response.text();
    setFileContent(content);
  };

  const uploadFile = () => {
    if (fileUpload == null) return;
    const fileRef = ref(storage, `test/${fileUpload.name}`);
    
    // // Upload file
    // uploadBytes(fileRef, fileUpload).then((asnapshot) => {
    //   getDownloadURL(snapshot.ref).then((url) => {
    //     setFileUrls((prev) => [...prev, url]);
    //   });
    // });
    
    // uploadBytes(fileRef, fileUpload).then((snapshot) => {
    //   getDownloadURL(snapshot.ref).then((url) => {
    //     get(url).then((fileContent) => {setFileContent(fileContent)});
    //   });
    // });

    uploadBytes(fileRef, fileUpload);

    getFileContent(fileRef);

    // // Menghapus file
    // deleteObject(fileRef)
    //   .then(() => {
    //     console.log("File berhasil dihapus dari Firebase Storage.");
    //   })
    //   .catch((error) => {
    //     console.error("Terjadi kesalahan saat menghapus file:", error);
    //   });
  };

  // useEffect(() => {
  //   listAll(fileListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setFileUrls((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  return (
    <div className="FileInput">
      <input
        accept = ".txt"
        type="file"
        onChange={(event) => {
          setFileUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Test File</button>
      {fileUrls.map((url) => {
        return <img src={url} />;
      })}
      
      {fileContent}
    </div>
  );
}

export default FileInput;
