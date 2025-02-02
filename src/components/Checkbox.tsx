import React from "react";

interface CheckboxProps {
    checked: boolean;
    onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({checked, onChange}) => {
    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-5 h-5 accent-blue-500"
            />
            <span>Favorite</span>
        </label>
    );
};

export default Checkbox;
