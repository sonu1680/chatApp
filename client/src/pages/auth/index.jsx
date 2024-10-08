import React, { useState } from "react";
import Background from "@/assets/login2.png";
import victory from "@/assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
const { setUserInfo } = useAppStore();
  const validationSignup = async () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateLogin=async()=>{
 if (!email.length) {
   toast.error("Email is required");
   return false;
 }
  if (!password.length) {
    toast.error("Password is required");
    return false;
  }
  return true;
  };

  const handleLogin = async () => {
    if(await validateLogin()){
      const res=await apiClient.post(LOGIN_ROUTE,{email,password});
      console.log({res});
      if(res.data.user.id){
        setUserInfo(res.data.user);
        
        if(res.data.user.profileSetup){
          navigate('/chat')
        }
        else{
          navigate('/profile')
        }
      }
    }
  };

  const handleSignup = async () => {
    if (await validationSignup()) {
     const res=await apiClient.post(SIGNUP_ROUTE,{email,password},{withCredentials:true})
     console.log({res});
     if(res.status===201){
              setUserInfo(res.data.user);

      navigate("/profile");
     }
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="box flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={victory} alt="victory" className="h-[100px]" />
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login" >
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:text-black data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:text-black data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="flex flex-col gap-5 mt-10">
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full p-6"
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-full p-6"
                />
                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent value="signup" className="flex flex-col gap-5">
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full p-6"
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-full p-6"
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-full p-6"
                />
                <Button className="rounded-full p-6" onClick={handleSignup}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden background md:flex justify-center items-center">
          <img src={Background} alt="background" className="h-[700px]" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
