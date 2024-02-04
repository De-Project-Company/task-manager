import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="bg-rose-700/10 p-3 rounded-md flex  items-center gap-x-2 text-sm text-rose-600">
      <BsExclamationTriangle className="h-4 w-4" />
      <p className="text-center">{message}</p>
    </div>
  );
};

export default FormError;
