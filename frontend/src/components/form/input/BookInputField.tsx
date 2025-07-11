import React from "react";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      className="w-full px-3 py-2 border rounded-md dark:bg-dark-900 dark:text-white"
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;