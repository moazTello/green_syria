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
import AddVolunteer from "./pages/AddVolunteer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/green_syria" element={<Login />} />
        <Route path="/green_syria/dashboard" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="traffics"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Trafic />
              </PrivateRoute>
            }
          />
          <Route
            path="addmasteradmin"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AddAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="works"
            element={
              <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                <Works />
              </PrivateRoute>
            }
          />
          <Route
            path="plant_stores"
            element={
              <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                <PlantStores />
              </PrivateRoute>
            }
          />
          <Route
            path="join_requests"
            element={
              <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                <JoinRequests />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="volunteers"
            element={
              <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                <Volunteers />
              </PrivateRoute>
            }
          />
          <Route
            path="addvolunteer"
            element={
              <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                <AddVolunteer />
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
              <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                <Admins />
              </PrivateRoute>
            }
          />
          <Route path="categories">
            <Route
              index
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <Categories />
                </PrivateRoute>
              }
            />
            <Route
              path="addcategory"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  {/* <AddProject /> */}
                </PrivateRoute>
              }
            />
            <Route
              path=":category"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <Category />
                </PrivateRoute>
              }
            />
            <Route
              path="projectdetails/:projid"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  {/* <ProjectDetails /> */}
                </PrivateRoute>
              }
            />
            <Route
              path="projectdetails/:projid/editProject"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  {/* <EditProject /> */}
                </PrivateRoute>
              }
            />
            <Route
              path="projectdetails/:projid/suggestions"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  {/* <Suggestions /> */}
                </PrivateRoute>
              }
            />
            <Route
              path="projectdetails/:projid/comments"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  {/* <Comments /> */}
                </PrivateRoute>
              }
            />
            <Route
              path="projectdetails/:projid/comments/:actid"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  {/* <CommentsAct /> */}
                </PrivateRoute>
              }
            />
            <Route
              path="projectdetails/:projid/openions"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  {/* <Openions /> */}
                </PrivateRoute>
              }
            />
            <Route
              path="projectdetails/:projid/openiondetails/:opid"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
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
