import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { UserContext } from "../../Context/Context";
import axios from "axios";
import { toast } from "react-toastify";

const AuthLinks = ({ status, username }) => {
  const { setUser } = useContext(UserContext);

  const signOutHandler = async () => {
    try {
      await axios.get("/api/auth/signout");
      setUser({ status: "unauthenticated", user: null });
      localStorage.clear();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {status === "authenticated" ? (
        <>
          <Link to={"/profile"} className=" ">
            Hello,{username}
          </Link>
          <button
            className="bg-primary rounded-full py-2 px-8  text-white"
            onClick={signOutHandler}
          >
            Logout
          </button>
        </>
      ) : status === "unauthenticated" ? (
        <>
          <Link to={"/login"} className=" ">
            Login
          </Link>
          <Link to={"/register"}>
            <button className="bg-primary w-full rounded-full py-2 px-8  text-white">
              Register
            </button>
          </Link>
        </>
      ) : (
        ""
      )}
    </>
  );
};

const Header = () => {
  const { user, cart } = useContext(UserContext);
  const status = user.status;
  const userData = user.userData;

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <header className="w-full border-b border-gray-300 pb-3">
      {/* Mobile Header */}

      <div className="hidden max-md:flex items-center justify-between max-lg:text-[15px]">
        <Link to={"/"}>
          <h1 className="text-primary text-2xl font-bold whitespace-nowrap">
            ST PIZZA
          </h1>
        </Link>
        <div className="flex items-center gap-5">
          <Link to={"/cart"} className="relative">
            <MdOutlineShoppingCart className="text-gray-500 text-2xl" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full text-xs w-4 h-4 text-center">
                {cart.length}
              </span>
            )}
          </Link>
          <div
            className="border border-gray-300 rounded-lg p-1"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <HiOutlineBars3BottomLeft className="text-xl" />
          </div>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden bg-gray-200 p-2 rounded-lg flex flex-col text-[16px] text-center gap-2 my-2"
        >
          <Link to={"/"}>Home</Link>
          <Link to={"/menu"}>Menu</Link>
          <Link to={"/#about"}>About</Link>
          <AuthLinks
            status={status}
            username={userData?.name || userData?.email.split("@")[0]}
            className="items-stretch"
          />
        </div>
      )}

      {/* Desktop Header */}
      <div className="max-md:hidden flex items-center justify-between max-lg:text-[15px]">
        <div className="flex items-center text-gray-500 gap-10 font-semibold max-lg:gap-5 ">
          <Link to={"/"}>
            <h1 className="text-primary text-2xl font-semibold whitespace-nowrap">
              ST PIZZA
            </h1>
          </Link>
          <Link to={"/"}>Home</Link>
          <Link to={"/menu"}>Menu</Link>
          <Link to={"/practice"}>Practice</Link>
          <a href={"#about"}>About</a>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-4 items-center text-textColor font-semibold">
            <AuthLinks
              status={status}
              username={userData?.name || userData?.email.split("@")[0]}
            />
          </div>
          <Link to={"/cart"} className="relative">
            <MdOutlineShoppingCart className="text-gray-500 text-2xl" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full text-xs w-4 h-4 text-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
