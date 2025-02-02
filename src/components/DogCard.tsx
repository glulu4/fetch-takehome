
import React from "react";
import Card from "./Card";
import {Button} from "./ui/button";
import {Dog} from "@/types/types";

interface DogCardProps {
    dog: Dog;
    onPressFavorite?: () => void;
    hideDetails: boolean;
}

export default function DogCard({dog, onPressFavorite, hideDetails}: DogCardProps) {
    return (
        <Card key={dog.id} title={dog.name} imageUrl={dog.img}>
            <div className="flex flex-col items-center p-4">
                {!hideDetails && 
                <>
                    <h3 className="text-lg font-semibold text-gray-800">Breed: {dog.breed}</h3>
                    <p className="text-sm text-gray-600">Age: {dog.age}</p>
                    <p className="text-sm text-gray-600">Location: {dog.zip_code}</p>
                </>

                }


                {onPressFavorite &&
                    <div className="w-full flex justify-center pt-6">
                        <Button onClick={onPressFavorite} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                            ❤️ Add to Favorites
                        </Button>
                    </div>
                 }
 
            </div>
        </Card>
    );
}
