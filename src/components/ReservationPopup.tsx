import { useState } from "react";
import Button from "@mui/material/Button";
import { useStateContext } from "../contexts/ContextProvider";
import { handleConfirmReservation } from "../utils";
import { ReservationPopupProps } from "../types";

const ReservationPopup = ({ onClose }: ReservationPopupProps) => {
    const { currentColor, setCartData, cartData } = useStateContext();
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");

    const handleFinalizeRental = async () => {
        if (!dataInicio || !dataFim) {
            alert("Por favor, selecione as datas de início e fim da reserva.");
            return;
        }

        for (const car of cartData) {
            await handleConfirmReservation(car.id, dataInicio, dataFim, onClose);
        }

        setCartData([]);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                <h2 className="text-xl font-semibold mb-4">Confirmar Reserva</h2>
                <p>Selecione o período da reserva:</p>
                <div className="mt-4">
                    <label className="block text-sm font-medium">Data de Início:</label>
                    <input 
                        type="date"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                        className="border p-2 w-full rounded-md"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium">Data de Fim:</label>
                    <input 
                        type="date"
                        value={dataFim}
                        onChange={(e) => setDataFim(e.target.value)}
                        className="border p-2 w-full rounded-md"
                    />
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                    <Button onClick={onClose} variant="contained" color="inherit"
                        sx={{ borderRadius: "999px" }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleFinalizeRental} variant="contained"
                        sx={{ borderRadius: "999px", backgroundColor: currentColor }}>
                        Confirmar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReservationPopup;
