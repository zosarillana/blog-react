import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    const res = await fetch("/api/logout", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate("/");
    }
  }
  return (
    <>
      <div className="sticky top-0 z-50 navbar shadow-2xl bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            blog.
          </Link>
        </div>
        <div className="flex-none">
          {user ? (
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary className="font-semibold">
                    Welcome {user.name}
                  </summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                      <Link to="/">Profile</Link>
                    </li>
                    <li>
                      <form onSubmit={handleLogout}>
                        <button>Logout</button>
                      </form>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          ) : (
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link className="font-semibold" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="font-semibold" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          )}

          {/* <li>
              <details>
                <summary className="font-semibold">Parent</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <Link to="/">Link 1</Link>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </li> */}
        </div>
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
}
