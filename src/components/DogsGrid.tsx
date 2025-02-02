import React from "react";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import DogCard from "@/components/DogCard";
import {Dog} from "@/types/types";

interface DogsGridProps {
    dogs: Dog[];
    loading: boolean;
    onFavorite: (dog: Dog) => void;
}

const DogsGrid: React.FC<DogsGridProps> = ({dogs, loading, onFavorite}) => {
    if (loading) {
        return (
            <div className="flex justify-center mb-4">
                <Spin indicator={<LoadingOutlined style={{fontSize: 48}} spin />} />
            </div>
        );
    }

    if (!loading && dogs.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">No dogs found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dogs.map((dog) => (
                <DogCard
                    hideDetails={false}
                    key={dog.id}
                    onPressFavorite={() => onFavorite(dog)}
                    dog={dog}
                />
            ))}
        </div>
    );
};

export default DogsGrid;
