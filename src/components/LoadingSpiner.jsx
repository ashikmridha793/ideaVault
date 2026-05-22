import { Spinner } from "@heroui/react";

const LoadingSpiner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <Spinner size="lg" />
      <span className="text-sm text-gray-500">Loading...</span>
    </div>
  );
};

export default LoadingSpiner;
