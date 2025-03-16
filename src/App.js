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
import AddCategory from "./pages/AddCategory";
import DetailsInstitution from "./pages/DetailsInstitution";
import PlantStoreTrees from "./pages/PlantStoreTrees";
import AddTree from "./pages/AddTree";
import AddArticle from "./pages/AddArticle";
import DetailsArticle from "./pages/DetailsArticle";
import VolunteerWorks from "./pages/VolunteerWorks";
import DetailsPlantStoreWaiting from "./pages/DetailsPlantStoreWaiting";
import DetailsVolunteerWaiting from "./pages/DetailsVolunteerWaiting";
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
            <Route path="tree/:plantstoreid">
              <Route
                index
                element={
                  <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                    <PlantStoreTrees />
                  </PrivateRoute>
                }
              />
              <Route
                path="addtree"
                element={
                  <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                    <AddTree />
                  </PrivateRoute>
                }
              />
            </Route>
          </Route>
          <Route path="join_requests">
            <Route
              index
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <JoinRequests />
                </PrivateRoute>
              }
            />
            <Route
              path=":waitingaccount"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <DetailsPlantStoreWaiting />
                </PrivateRoute>
              }
            />
            <Route
              path="volunteer/:waitingaccount"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <DetailsVolunteerWaiting />
                </PrivateRoute>
              }
            />
          </Route>
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
            <Route
              path="works/:volid"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <VolunteerWorks />
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
          <Route path="institutions">
            <Route
              index
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <Admins />
                </PrivateRoute>
              }
            />
            <Route
              path=":institutionid"
              element={
                <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                  <DetailsInstitution />
                </PrivateRoute>
              }
            />
          </Route>

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
                  <AddCategory />
                </PrivateRoute>
              }
            />
            <Route path=":categoryid">
              <Route
                index
                element={
                  <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                    <Category />
                  </PrivateRoute>
                }
              />
              <Route
                path="addArticle"
                element={
                  <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                    <AddArticle />
                  </PrivateRoute>
                }
              />
              <Route
                path="details/:articleid"
                element={
                  <PrivateRoute allowedRoles={["adminAss", "admin"]}>
                    <DetailsArticle />
                  </PrivateRoute>
                }
              />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
