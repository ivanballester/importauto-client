import React from "react";

interface ImageManagerProps {
  imageUrls: string[];
  handleDeletePhoto: (index: number) => void;
  moveImage: (index: number, direction: "up" | "down") => void;
  handleAddPhoto: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageManager: React.FC<ImageManagerProps> = ({
  imageUrls,
  handleDeletePhoto,
  moveImage,
  handleAddPhoto,
}) => (
  <div className="my-4 max-w-4xl mx-auto">
    <h2 className="text-xl font-semibold mb-2">Fotos del coche</h2>
    <div className="grid grid-cols-3 gap-4">
      {imageUrls.length === 0 && <p>No hay fotos cargadas.</p>}
      {imageUrls.map((url, index) => (
        <div key={index} className="relative">
          <img
            src={url}
            alt={`Foto ${index + 1}`}
            className="w-full h-32 object-cover rounded-md"
          />
          <div className="absolute top-0 right-0 p-2 flex flex-col gap-1">
            <button
              className="bg-red-500 text-white text-xs px-2 py-1 rounded"
              onClick={() => handleDeletePhoto(index)}
            >
              Eliminar
            </button>
            {index > 0 && (
              <button
                className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                onClick={() => moveImage(index, "up")}
                type="button"
              >
                Subir
              </button>
            )}
            {index < imageUrls.length - 1 && (
              <button
                className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                onClick={() => moveImage(index, "down")}
                type="button"
              >
                Bajar
              </button>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Input para agregar nuevas imágenes */}
    <div className="flex justify-center mt-4">
      <label className="bg-green-500 text-white font-bold py-2 px-4 rounded cursor-pointer">
        Añadir foto
        <input
          type="file"
          className="hidden"
          multiple // Permitir seleccionar múltiples archivos
          onChange={handleAddPhoto}
        />
      </label>
    </div>
  </div>
);

export default ImageManager;
