"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout"; // MUI Logout icon
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { showSnackbar } from "@/redux/features/snackbarSlice";
import { useGetAllBookingQuery } from "@/redux/services/bookingService/bookingApi";
import { extractDate } from "@/utility/utils";
import {
  GridCallbackDetails,
  GridRowSelectionModel,
  GridSortModel,
  DataGrid,
} from "@mui/x-data-grid";
import { clearLoginState } from "@/redux/features/authSlice";

const BookingListingPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [rows, setRows] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>();

  const { data, isSuccess, isError, isLoading, refetch } =
    useGetAllBookingQuery({ refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (isSuccess) {
      const rowData = data?.result.map((item: any) => ({
        id: item._id,
        slotDate: item.slotId.date,
        slotTime: item.slotId.time,
        name: item.name,
        email: item.email,
        bookedAt: extractDate(item.bookedAt),
      }));
      setRows(rowData);
      setRowCount(data?.result.length);
      setLoading(false);
    }
    if (isLoading) setLoading(true);
    if (isError) {
      setLoading(false);
      dispatch(
        showSnackbar({
          open: true,
          message: "Failed to fetch bookings",
          severity: "error",
          title: "Error",
        })
      );
    }
  }, [isSuccess, isError, isLoading, data]);

  const columns = [
    { field: "slotDate", headerName: "Slot Date", flex: 1, minWidth: 120 },
    { field: "slotTime", headerName: "Slot Time", flex: 1, minWidth: 100 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 2, minWidth: 200 },
    { field: "bookedAt", headerName: "Booked At", flex: 1, minWidth: 150 },
  ];

  const handleSortModelChange = (model: GridSortModel) => {
    setSortModel(model);
  };

  const handleRowSelectionChange = (
    newSelection: GridRowSelectionModel,
    details: GridCallbackDetails
  ) => {
    setRowSelectionModel(newSelection);
  };

  const handleLogout = () => {
    dispatch(clearLoginState());
    router.push("/");
  };

  return (
    <Box
      sx={{ height: "100%", overflow: "hidden", width: "100%", mr: 4, ml: 0 }}
    >
      {/* Header with Logout Icon */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
          mr: 0,
          px: 4,
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          Booking Listing
        </Typography>
        <IconButton onClick={handleLogout} sx={{ color: "black" }}>
          <LogoutIcon />
        </IconButton>
      </Box>

      {/* DataGrid */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          marginTop: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "90%", height: 600 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            sortingMode="server"
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
            checkboxSelection
            onRowSelectionModelChange={handleRowSelectionChange}
            rowSelectionModel={rowSelectionModel}
            loading={loading}
            hideFooterPagination
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BookingListingPage;
