import React from "react";
import { useRoutes } from "react-router-dom";
import LoginSignup from "./common/auth/login";
import GuestHomePage from "./guest/GuestHomePage";
import GuestBookingsMadePage from "./guest/GuestBookingsMadePage";
import OwnerListingPropertiesPage from "./owner/OwnerListingPropertiesPage";
import OwnerPropertiesPage from "./owner/OwnerPropertiesPage";
import InspectorPage from "./inspector/InspectorPage";
import Distributer from "./Distributer";
import GuestDetailsPage from "./guest/GuestDetailsPage";
import CleaningAppointments from "./cleaning_stuff/CleaningAppointments";
import OwnerCleaningAppointmentForm from "./owner/OwnerCleaningAppointmentsForm";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Distributer /> },
    {
      path: "/guesthome",
      element: <GuestHomePage />,
    },
    {
      path: "/guestbookings",
      element: <GuestBookingsMadePage />,
    },
    {
      path: "/guestdetails/:id",
      element: <GuestDetailsPage />,
    },
    {
      path: "/ownerlisting",
      element: <OwnerListingPropertiesPage />,
    },
    {
      path: "/ownerproperties",
      element: <OwnerPropertiesPage />,
    },
    {
      path: "/inspector",
      element: <InspectorPage />,
    },
    {
      path: "/login",
      element: <LoginSignup />,
    },
    {
      path: "/cleaningappointments",
      element: <CleaningAppointments />,
    },
    {
      path: "/newcleaningappointment/:propertyId",
      element: <OwnerCleaningAppointmentForm />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
