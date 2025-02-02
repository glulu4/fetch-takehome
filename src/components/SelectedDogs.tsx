"use client";
import React from "react";
import {Modal, Spin} from "antd";
import {Dog} from "@/types/types";
import DogCard from "@/components/DogCard";
import {X} from "lucide-react";

interface SelectedDogsModalProps {
    visible: boolean;
    loading: boolean;
    dogs: Dog[];
    onClose: () => void;
    onRemoveDog: (dog: Dog) => void;
    onFindMatch?: () => void;
}

const SelectedDogsModal: React.FC<SelectedDogsModalProps> = ({
    visible,
    loading,
    dogs,
    onClose,
    onRemoveDog,
    onFindMatch
}) => {
    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            title={
                <div className="flex justify-between items-center">
                    <span>Selected Dogs ({dogs.length})</span>

                </div>
            }
            width={800}
            className="max-h-[90vh]"
        >
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <Spin />
                </div>
            ) : dogs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No dogs selected yet
                </div>
            ) : (
                <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
                    {dogs.map((dog) => (
                        <div key={dog.id} className="relative group">
                            <button
                                onClick={() => onRemoveDog(dog)}
                                className="absolute top-2 right-2 z-10 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove dog"
                            >
                                <X size={16} />
                            </button>
                            <DogCard dog={dog} hideDetails />
                        </div>
                    ))}
                </div>
            )}

            {dogs.length > 0 && (
                <div className="mt-4 pt-4 border-t text-sm text-gray-500 flex justify-between items-center">
                    <span>{dogs.length} dogs selected</span>
                    <button
                        onClick={() => dogs.forEach(dog => onRemoveDog(dog))}
                        className="text-red-500 hover:text-red-600 transition-colors"
                    >
                        Clear all
                    </button>
                </div>
            )}
        </Modal>
    );
};

export default SelectedDogsModal;