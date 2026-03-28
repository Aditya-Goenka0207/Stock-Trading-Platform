import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      const { data } = await axios.post(
        "https://zerodha-auth-server.onrender.com/api/auth/verify",
        {},
        { withCredentials: true },
      );

      const { status, user } = data;
      setUsername(user);

      if (status) {
        toast(`Hello ${user}`, { position: "top-right" });
      } else {
        removeCookie("token", { path: "/" });
        navigate("/login");
      }
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token", { path: "/" });
    navigate("/login");
  };

  return (
    <>
      <div className="home_page">
        <h4>
          Welcome <span>{username}</span>
        </h4>

        <button onClick={Logout}>LOGOUT</button>
      </div>

      <ToastContainer />
    </>
  );
};

export default Home;
