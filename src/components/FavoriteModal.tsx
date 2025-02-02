"use client";

import React from "react";
import {Modal, Spin} from "antd";
import {Dog} from "@/types/types";
import DogCard from "@/components/DogCard";

interface FavoriteModalProps {
    visible: boolean;           // Determines if modal is open
    loading: boolean;           // Whether we're fetching the dog
    matchedDog: Dog | null;     // The dog that was matched (if any)
    onClose: () => void;        // Callback for closing the modal
}

const FavoriteModal: React.FC<FavoriteModalProps> = ({
    visible,
    loading,
    matchedDog,
    onClose,
}) => {
    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            title={loading ? "Finding Your Favorite Dog..." : "Your Favorite Dog!"}
        >
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <Spin />
                </div>
            ) : (
                matchedDog && (
                    <div className="py-4 flex flex-col items-center">
                        <DogCard dog={matchedDog} hideDetails />
                    </div>
                )
            )}
        </Modal>
    );
};

export default FavoriteModal;
