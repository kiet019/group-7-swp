import UserLayout from "@/layout/CustomerLayout";
import { Grid} from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "@/component/login/AuthContext";
import NavLeft from "@/component/customer-component/profile/NavLeft";
import InformationUser from "@/component/customer-component/profile/InformationUser";
export default function Profile() {
    const { user, userBackend} = useContext(UserContext)
  return (
    <UserLayout>
      <Grid container spacing={2}>
        <Grid item xs={3}>
            <NavLeft/>
        </Grid>
        <Grid item xs={9}>
            <InformationUser user={user} userBackend={userBackend}/>
        </Grid>
      </Grid>
    </UserLayout>
  );
}
