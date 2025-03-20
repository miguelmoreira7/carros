import { Car } from "../types";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { generateImageUrl, handleCancelReservation } from "../utils";
import { differenceInDays, format, isBefore, isAfter, parseISO } from "date-fns";
import Button from "@mui/material/Button";
import { useStateContext } from "../contexts/ContextProvider";

interface ReservationDetailsProps {
    isOpen: boolean;
    closeModal: () => void;
    car: Car;
}

const ReservationDetails = ({ isOpen, closeModal, car }: ReservationDetailsProps) => {
    const formatDate = (date: string) => format(new Date(date), "dd/MM/yyyy");
    
    const today = new Date();
    const reservationStartDate = new Date(car.data_inicio);
    const reservationEndDate = new Date(car.data_fim);
    const canCancel = isBefore(today, reservationStartDate);


    const [isAvailable, setIsAvailable] = useState(car.available);

    useEffect(() => {
        if (isAfter(today, reservationEndDate) && !isAvailable) {
            setIsAvailable(true);
            console.log(`O carro ${car.make} ${car.model} agora está disponível para aluguel.`);
        }
    }, [today, reservationEndDate, isAvailable, car]);

    const totalDays = differenceInDays(reservationEndDate, reservationStartDate);
    const totalPrice = (totalDays * car.preco_diario * 10).toFixed(2);
    
    const { currentColor } = useStateContext();
    
    const reservationDetails = [
        { label: "Data Início", value: formatDate(car.data_inicio) },
        { label: "Data Fim", value: formatDate(car.data_fim) },
        { label: "Diária", value: `R$ ${(car.preco_diario * 10).toFixed(2)}` },
        { label: "Preço Total", value: `R$ ${totalPrice}` },
        { label: "Status da Reserva", value: `${isAvailable ? 'Reserva concluída' : 'Reservado'}` }
    ];

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="car-details__dialog-panel">
                                <button type="button" onClick={closeModal} className="car-details__close-btn">
                                    <img src="close.svg" alt="Fechar" className="w-5 h-5 object-contain" />
                                </button>
                                <div className="flex-1 flex flex-col gap-3">
                                    <div className="car-details__main-image">
                                        <img src={generateImageUrl(car)} alt="Carro" className="w-full relative h-40 object-contain" />
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-2 mt-4">
                                    <h2 className="font-semibold text-xl capitalize">
                                        {car.make} {car.model}
                                    </h2>
                                    <div className="mt-3 flex flex-wrap gap-4">
                                        {reservationDetails.map(({ label, value }) => (
                                            <div className="flex justify-between gap-5 w-full text-right" key={label}>
                                                <h4 className="text-grey">{label}</h4>
                                                <p className="text-black-100 font-semibold">{value}</p>
                                            </div>
                                        ))}
                                        <div className="mt-4">
                                            <Button
                                                onClick={() => handleCancelReservation(car.id, closeModal)}
                                                variant="contained"
                                                disabled={!canCancel}
                                                sx={{
                                                    backgroundColor: currentColor,
                                                    width: "460px",
                                                    borderRadius: "999px",
                                                    paddingY: "12px",
                                                    fontSize: "1rem",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Cancelar reserva
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ReservationDetails;
