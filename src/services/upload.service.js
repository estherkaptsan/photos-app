export const uploadService = {
  uploadFile
}

async function uploadFile(file) {
  const CLOUD_NAME = "dq9ms8jsq";
  const UPLOAD_PRESET = "ykbtnpi0";
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

  try {
    const formData = new FormData();
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('file', file);

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    });

    const responseJson = await res.json();
    return responseJson;
  } catch (err) {
    console.error('Failed to upload', err);
    throw err;
  }
}
