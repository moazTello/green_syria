import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import PrivateRoute from "./pages/protectedRoutes/PrivateRoute";
import Home from "./pages/Home";
import Trafic from "./pages/Trafic";
import AddAdmin from "./pages/AddAdmin";
import Works from "./pages/Works";
import PlantStores from "./pages/PlantStores";
import JoinRequests from "./pages/JoinRequests";
import Profile from "./pages/Profile";
import Volunteers from "./pages/Volunteers";
import Categories from "./pages/Categories";
import Admins from "./pages/Admins";
import Category from "./pages/Category";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/syria_green" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute allowedRoles={["Master"]}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="traffics"
            element={
              <PrivateRoute allowedRoles={["Master"]}>
                <Trafic />
              </PrivateRoute>
            }
          />
          <Route
            path="addmasteradmin"
            element={
              <PrivateRoute allowedRoles={["Master"]}>
                <AddAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="works"
            element={
              <PrivateRoute allowedRoles={["Master"]}>
                <Works />
              </PrivateRoute>
            }
          />
          <Route
            path="plant_stores"
            element={
              <PrivateRoute allowedRoles={["Master"]}>
                <PlantStores />
              </PrivateRoute>
            }
          />
          <Route
            path="join_requests"
            element={
              <PrivateRoute allowedRoles={["Master"]}>
                <JoinRequests />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute allowedRoles={["Master"]}>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="volunteers"
            element={
              <PrivateRoute allowedRoles={["Master"]}>
                <Volunteers />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="categories"
            element={
              <PrivateRoute allowedRoles={['Master']}>
                <Categories/>
              </PrivateRoute>
            }
          /> */}
          <Route
            path="institutions"
            element={
              <PrivateRoute allowedRoles={["Master"]}>
                <Admins />
              </PrivateRoute>
            }
          />
          <Route path="categories">
            <Route
              index
              element={
                <PrivateRoute allowedRoles={["AssistentAdmin", "Master"]}>
                  <Categories />
                </PrivateRoute>
              }
            />
            <Route
              path="addcategory"
              element={
                <PrivateRoute allowedRoles={["AssistentAdmin", "Master"]}>
                  {/* <AddProject /> */}
                </PrivateRoute>
              }
            />
            <Route
              path=":category"
              element={
                <PrivateRoute allowedRoles={["Master"]}>
                  <Category />
                </PrivateRoute>
              }
            />
            <Route
              path="projectdetails/:projid"
              element={
                <PrivateRoute allowedRoles={["AssistentAdmin", "Master"]}>
                  {/* <ProjectDetails /> */}
                </PrivateRoute>
              }
            />
            <Route
              path="projectdetails/:projid/editProject"
              element={
                <PrivateRoute allowedRoles={["AssistentAdmin", "Master"]}>
                  {/* <EditProject /> */}
                </PrivateRoute>
              }
            />
            <Route
              path="projectdetails/:projid/suggestions"
              element={
                <PrivateRoute allowedRoles={["AssistentAdmin", "Master"]}>
                  {/* <Suggestions /> */}
                </PrivateRoute>
              }
            />
            <Route
              path="projectdetails/:projid/comments"
              element={
                <PrivateRoute allowedRoles={["AssistentAdmin", "Master"]}>
                  {/* <Comments /> */}
                </PrivateRoute>
              }
            />
            <Route
              path="projectdetails/:projid/comments/:actid"
              element={
                <PrivateRoute allowedRoles={["AssistentAdmin", "Master"]}>
                  {/* <CommentsAct /> */}
                </PrivateRoute>
              }
            />
            <Route
              path="projectdetails/:projid/openions"
              element={
                <PrivateRoute allowedRoles={["Master"]}>
                  {/* <Openions /> */}
                </PrivateRoute>
              }
            />
            <Route
              path="projectdetails/:projid/openiondetails/:opid"
              element={
                <PrivateRoute allowedRoles={["Master"]}>
                  {/* <OpenionDetails /> */}
                </PrivateRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
