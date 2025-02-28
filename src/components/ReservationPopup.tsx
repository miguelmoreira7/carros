import { Car } from "../types";
import Button from '@mui/material/Button';
import axios from "axios";

interface ReservationPopupProps {
    car: Car;
    onClose: () => void;
    onConfirm: (carId: string) => void;
}

const ReservationPopup = ({ car, onClose }: ReservationPopupProps) => {

    const handleConfirmReservation = async (carId: string) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error("Token de autenticação não encontrado.");
                return;
            }

            const response = await axios.patch(
                `http://localhost:3051/api1/car-details/rent/${carId}`,
                { 
                    available: false,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: `${window.localStorage.getItem("token")}`
                    }
                }
            );
            console.log("Carro reservado com sucesso:", response.data);
            onClose();
        } catch (error) {
            console.error("Erro ao reservar o carro:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                <h2 className="text-xl font-semibold mb-4">Confirmar Reserva</h2>
                <p>Você deseja reservar o carro <strong>{car.model}</strong>?</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <Button onClick={onClose} variant="contained" color="error">Cancelar</Button>
                    <Button onClick={() => handleConfirmReservation(car.id)} variant="contained" color="success">
                        Confirmar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReservationPopup;
