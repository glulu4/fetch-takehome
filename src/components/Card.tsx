import Image from "next/image";
import React from "react";

interface CardProps {
    title: string;
    imageUrl: string;
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({title, imageUrl, children}) => {
    return (
        <div className="border rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <Image 
            width={300}
            height={200}
            src={imageUrl} 
            alt={title} 
            className="w-full h-48 object-cover rounded-md mb-2" />
            {children}
        </div>
    );
};

export default Card;
