import {CircularProgress} from "@nextui-org/react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
       <CircularProgress size="lg" aria-label="Loading..."/>
    </div>
  )
}

export default LoadingPage