import { message } from "antd";
import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = useCallback(async () => {
    setLoading(true);

    const { error } = await supabase.auth.signOut();

    setLoading(false);

    if (error) {
      console.error("Logout error:", error);
      message.error("خطا در خروج از حساب");
      return false;
    }

    message.success("با موفقیت خارج شدید");
    navigate("/auth");
    return true;
  }, [navigate]);

  return { logout, loading };
};

export default useLogout;
