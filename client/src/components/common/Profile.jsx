import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import ProfilePhoto from "./ProfilePhoto";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import ProfileBottomBar from "./ProfileBottomBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {  useAuth, useUserContext } from "../../context/context";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 8, // Rounded corners
  boxShadow: 24,
  p: 4,
};

export default function Profile() {
  const { userProfile } = useAuth();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        startIcon={<AccountCircleIcon />}
      >
        Profile
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {userProfile && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    {/* Display profile photo */}
                    <ProfilePhoto name={`${userProfile.first_name} ${userProfile.last_name}`} />
                  </div>
                </Box>
                <Typography variant="h6" gutterBottom>
                  {/* Display first name and last name */}
                  {userProfile.first_name} {userProfile.last_name}
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {/* Display email */}
                    <Typography className="text-muted mb-4">
                      @User <span className="mx-2">|</span>
                      <a href="#!">{userProfile.email}</a>
                    </Typography>
                  </Typography>
                </div>
                <Typography variant="subtitle1" gutterBottom>
                  <Typography className="text-muted mb-4">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <div>
                        {/* Display social media icons */}
                        <FacebookOutlinedIcon style={{ fontSize: 40, cursor: "pointer" }} />
                        <TwitterIcon style={{ fontSize: 40, cursor: "pointer" }} />
                        <InstagramIcon style={{ fontSize: 40, cursor: "pointer" }} />
                      </div>
                    </Box>
                  </Typography>
                </Typography>
                <div
                  style={{
                    height: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {userProfile.role !== 'manager' &&
                    <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      fontSize: "1.0rem",
                      paddingY: "1rem",
                      paddingX: "2rem",
                    }}
                  >
                    Look Your Feedbacks
                  </Button>}
                </div>
              </Box>
            )}
            <ProfileBottomBar />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

