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
import EditVolunteer from "./pages/EditVolunteer";
import AddPlantStore from "./pages/AddPlantStore";
import Events from "./pages/Events";
import AddEvent from "./pages/AddEvent";
import EventDetails from "./pages/EventDetails";
import DetailsPlantStore from "./pages/DetailsPlantStore";
import EditPlantStore from "./pages/EditPlantStore";
import DetailsVolunteer from "./pages/DetailsVolunteer";

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

<Route path="events">
            <Route
              index
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <Events />
                </PrivateRoute>
              }
            />
            <Route
              path="addevent"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <AddEvent />
                </PrivateRoute>
              }
            />
            <Route
              path=":eventid"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <EventDetails />
                </PrivateRoute>
              }
            />
          </Route>


          <Route path="plant_stores">
            <Route
              index
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <PlantStores />
                </PrivateRoute>
              }
            />
            <Route
              path="addPlantStore"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <AddPlantStore />
                </PrivateRoute>
              }
            />
            <Route
              path="edit/:editplantstoreid"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <EditPlantStore />
                </PrivateRoute>
              }
            />
            <Route
              path=":plantstoreid"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <DetailsPlantStore />
                </PrivateRoute>
              }
            />
          </Route>
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
          <Route path="volunteers">
            <Route
              index
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
            <Route
              path=":volid"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <DetailsVolunteer />
                </PrivateRoute>
              }
            />
             <Route
              path="edit/:volid"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <EditVolunteer />
                </PrivateRoute>
              }
            />
          </Route>
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
