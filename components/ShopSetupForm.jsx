import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { useLocalStorage } from "@rehooks/local-storage";
import axios from "axios";
import Swal from "sweetalert2";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
export default function SetupShopForm() {
  const [open, setOpen] = useState(false);
  const [userInfo] = useLocalStorage("userInfo");

  const router = useRouter();
  const handelSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    const { data } = await axios.post(
      `/api/shopSetup/create`,
      {
        shopName,
        currency,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setOpen(false);
    if (data == "Shop's name and currency saved successfully") {
      e.target.reset();
      Swal.fire("Success", data, "success").then((result) => {
        if (result.isConfirmed) {
          router.reload(window.location.reload);
        }
      });
    } else {
      Swal.fire("Error", data, "error");
    }
  };
  return (
    <React.Fragment>
      <Stack spacing={2} component="form" onSubmit={handelSubmit}>
        <TextField
          label="Shop Name"
          type="text"
          placeholder="Enter shop name"
          size="small"
          fullWidth
          color="yallo"
          onChange={(e) => setShopName(e.target.value)}
        />
        <TextField
          label="Currency"
          type="text"
          placeholder="Enter you currency symbol"
          size="small"
          fullWidth
          color="yallo"
          onChange={(e) => setCurrency(e.target.value)}
        />
        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard")}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="yallo" size="small">
            Save
          </Button>
        </CreateFormButtonSpacer>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
