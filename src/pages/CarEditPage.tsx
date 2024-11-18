import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDropzone } from "react-dropzone";
import service from "../service/service.config";
import FormUploadEditCar from "../components/FormUploadEditCar";

const CarEdit: React.FC = () => {
  const { carId } = useParams<{ carId: string }>();

  const [carInfo, setCarInfo] = useState({
    model: "",
    brand: "",
    year: "",
    kilometers: "",
    price: "",
    fuelType: "",
    horsepower: "",
    seats: "",
    engine: "",
    transmission: "",
    imageUrls: [] as string[],
  });

  const [newImages, setNewImages] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await service.get(`/cars/${carId}`);
        setCarInfo(res.data);
      } catch (error) {
        console.error("Error al obtener información del coche", error);
      }
    };
    fetchCar();
  }, [carId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCarInfo((prevCarInfo) => ({
      ...prevCarInfo,
      [name]: value,
    }));
  };

  const handleDeletePhoto = async (index: number) => {
    try {
      await service.delete(`/cars/${carId}/images/${index}`);
      setCarInfo((prevCarInfo) => ({
        ...prevCarInfo,
        imageUrls: prevCarInfo.imageUrls.filter((_, i) => i !== index),
      }));
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  };

  const handleOnDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(carInfo.imageUrls);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCarInfo((prevCarInfo) => ({
      ...prevCarInfo,
      imageUrls: items,
    }));

    try {
      await service.put(`/cars/${carId}`, { imageUrls: items });
      console.log("Orden de imágenes actualizado en la base de datos.");
    } catch (error) {
      console.error(
        "Error al actualizar el orden de imágenes en el backend:",
        error
      );
    }
  };

  const handleSaveChanges = async () => {
    try {
      await service.put(`/cars/${carId}`, {
        ...carInfo,
        imageUrls: carInfo.imageUrls,
      });
      console.log("Cambios guardados exitosamente.");
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    setNewImages((prevImages) => [...prevImages, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/heic": [".heic"],
      "image/heif": [".heif"],
    },
    multiple: true,
  });

  const handleUploadNewImages = async () => {
    if (newImages.length === 0) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      newImages.forEach((image) => formData.append("images", image));

      const response = await service.post(`/cars/${carId}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Actualizar las imágenes asegurando que sean únicas
      setCarInfo((prevCarInfo) => ({
        ...prevCarInfo,
        imageUrls: Array.from(
          new Set([...prevCarInfo.imageUrls, ...response.data.imageUrls])
        ),
      }));

      setNewImages([]); // Limpiar las imágenes subidas
    } catch (error) {
      console.error("Error al subir nuevas imágenes:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Editar coche</h1>

      <FormUploadEditCar
        carInfo={carInfo}
        handleInputChange={handleInputChange}
      />

      {/* Mostrar las imágenes guardadas */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          Imágenes Guardadas
        </h2>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="images" direction="horizontal">
            {(provided) => (
              <div
                className="flex gap-4 mt-4 flex-wrap justify-center"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {carInfo.imageUrls.length > 0 ? (
                  carInfo.imageUrls.map((imageUrl, index) => (
                    <Draggable
                      key={`${imageUrl}-${index}`} // Combina la URL con el índice para garantizar unicidad
                      draggableId={`${imageUrl}-${index}`} // Lo mismo aquí
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative"
                        >
                          <img
                            src={imageUrl}
                            alt={`Imagen ${index + 1}`}
                            className="h-24 w-24 object-cover rounded-md"
                          />
                          <button
                            onClick={() => handleDeletePhoto(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          >
                            X
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <p>No hay imágenes guardadas</p>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-rojo text-white rounded-lg"
          onClick={handleSaveChanges}
        >
          Guardar cambios
        </button>
      </div>
      {/* Sección para subir nuevas imágenes */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          Agregar Nuevas Imágenes
        </h2>
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
        </div>
        {newImages.length > 0 && (
          <div className="mt-4">
            <h4>Imágenes seleccionadas:</h4>
            <ul>
              {newImages.map((image, index) => (
                <li key={index}>{image.name}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-center">
          <button
            onClick={handleUploadNewImages}
            disabled={isUploading}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isUploading ? "Subiendo..." : "Subir Nuevas Imágenes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarEdit;
