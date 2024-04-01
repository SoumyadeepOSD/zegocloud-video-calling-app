"use client";
import { useState } from 'react';
import axios from 'axios'
import {toast, Toaster} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react';
import LoadingPage from '@/components/loading-page';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleLogout = async() => {
    try {
      const response = await axios.get("/api/users/logout");
      setIsLoading(true);
      console.log(response.data);
      toast.success("User logged out successfully");
      router.replace("/login");
    } catch (error) {
      toast.error(`Something went wrong: ${error}`);
    }finally{
      setIsLoading(false);
    }
  }

  if(isLoading){
    return <LoadingPage />
  }

  return (
    <div>
      <Toaster/>
      Profile
      <Button color="danger" variant="solid" onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Profile