import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FooterUbi() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">Ubicación</h2>
      <div className="h-48 rounded overflow-hidden z-10">
        <MapContainer
          center={[38.294503413284055, -0.7328529311591067]}
          zoom={15}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[38.294503413284055, -0.7328529311591067]}>
            <Popup>
              Importauto Elche <br /> Ven a visitarnos.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default FooterUbi;
