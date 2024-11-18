// components/ImageUploader.tsx
import React from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages }) => {
  const onDrop = (acceptedFiles: File[]) =>
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`mt-4 border-2 p-6 text-center cursor-pointer ${
        isDragActive ? "border-blue-500" : "border-dashed border-gray-300"
      }`}
    >
      <input {...getInputProps()} style={{ display: "none" }} />
      <p className="text-gray-500">
        {isDragActive
          ? "Suelta las imágenes aquí..."
          : "Arrastra o haz clic para seleccionar imágenes"}
      </p>

      {images.length > 0 && (
        <div className="mt-4">
          <h4>Imágenes seleccionadas:</h4>
          <ul>
            {images.map((image, index) => (
              <li key={index}>{image.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
