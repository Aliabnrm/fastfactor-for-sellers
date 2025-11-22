import { message } from "antd";
import { useState } from "react";
import { supabase } from "@/supabase";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      console.error("Supabase SignOut Error:", signOutError.message);
      setError("خطا در خروج از حساب. لطفا مجددا تلاش کنید.");
      message.error("خطا در خروج از حساب.");
    } else {
      message.success("با موفقیت از حساب خارج شدید.");
      navigate("/auth");
    }

    setLoading(false);
  };

  return {
    logout: handleLogout,
    loading,
    error,
  };
};

export default useLogout;
