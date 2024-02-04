import { CheckCircle } from "lucide-react";
import React from "react";

interface FormSuccessProps {
  message?: string;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-700/10 p-3 rounded-md flex  items-center gap-x-2 text-sm text-emerald-700">
      <CheckCircle className="h-4 w-4" />
      <p className="text-center">{message}</p>
    </div>
  );
};

export default FormSuccess;
