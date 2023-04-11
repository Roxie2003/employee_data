import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, handleClose } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }}>
      {children}
      {handleClose ? (
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

CustomizedDialogs.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  endButtonText: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  Modal: PropTypes.bool,
  hasfooter: PropTypes.string,
};

export default function CustomizedDialogs(props) {
  const { title, children, endButtonText, onClose, showModal, ...other } =
    props;

  const handleSaveChanges = () => {
    fetch(
      "https://employee-payroll-api.onrender.com/api/employees/" +
        children.props.employee._id,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PATCH",

        // Fields that to be updated are passed
        body: JSON.stringify(children.props.employee),
      }
    )
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        window.location.reload(false);
      });
  };
  return (
    <div>
      <BootstrapDialog
        children={title}
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={showModal}
        fullWidth
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          handleClose={onClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        {other.hasfooter === "true" && (
          <DialogActions>
            <Button autoFocus variant="contained" onClick={handleSaveChanges}>
              Save changes
            </Button>
          </DialogActions>
        )}
      </BootstrapDialog>
    </div>
  );
}
