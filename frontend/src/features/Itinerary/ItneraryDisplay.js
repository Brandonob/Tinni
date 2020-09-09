import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Badge } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ItneraryList from "./ItineraryList";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import DoneIcon from "@material-ui/icons/Done";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import LoginDialog from "../LoginDia/LoginDial";
import ShareDialog from "../ShareForm/ShareFormDial";
import {
  addItemToItin,
  selectCurrentItin,
  updateTime,
} from "../CurrentItinerary/currentItinerarySlice";
import "./ItineraryDisplay.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    width: 200,
    color: "black",
    fontSize: 20,
    opacity: 1,
    borderBottom: 0,
    "&:before": {
      borderBottom: 0,
    },
  },
  disabled: {
    color: "black",
    borderBottom: 0,
    "&:before": {
      borderBottom: 0,
    },
  },
}));

export default function ItineraryDisplay() {
  const classes = useStyles();
  const currentItinerary = useSelector(selectCurrentItin);
  const [ItineraryName, setItineraryName] = useState("My Itinerary");
  const [ItineraryDate, setItinerarydate] = useState("");
  const [ItineraryTime, setItineraryTime] = useState("19:00");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectCurrentItin);
  const [currUser, setcurrUser] = useState(false);
  const [opendia, setOpenDia] = useState(false);
  const [opendiaEmail, setOpenDiaEmail] = useState(false);

  useEffect(() => {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + month + "-" + day;
    setItinerarydate(today);
  }, []);

  useEffect(() => {
    if (currentItinerary.length) {
      debugger;
      handleTime();
    }
  }, []);

  const handleTime = () => {
    let target = new Date("2020-02-20 " + ItineraryTime);

    // target.setMinutes(target.getMinutes() + min);
    // setEndTime(target.getHours() + ":" + target.getMinutes());

    // target.setHours(Number(time[0] + time[1]), Number(time[2] + time[3]));
    // target.setMinutes(target.getMinutes() + min);

    currentItinerary.forEach((el, i) => {
      debugger;
      target.setMinutes(target.getMinutes() + [el][0].body.time.duration);

      dispatch(
        updateTime({
          Time: target.getHours() + ":" + target.getMinutes(),
          index: i,
        })
      );
      // [i][0].body.time.endTime = target.getHours() + ":" + target.getMinutes();

      debugger;
      console.log(currentItinerary);
    });
    // useDispatch()
  };

  const handleDiaClose = (value) => {
    setOpenDia(false);
    // setSelectedValue(value);
  };
  const handleEmailDiaClose = (value) => {
    setOpenDiaEmail(false);
    //  setSelectedValue(value);
  };
  const handleChange = (event) => {
    `set${event.target.name}`(event.target.value);
  };

  const handleClick = () => {
    setEditMode(true);
  };
  const handleDone = () => {
    setEditMode(false);
  };

  const handleClickReview = () => {
    // history.push("/user/itnerary");
    if (!currUser) {
      setOpenDia(true);
    } else {
      setOpenDiaEmail(true);
    }
  };
  const handleClickShare = () => {
    // history.push("/user/itnerary");
    if (!currUser) {
      setOpenDia(true);
    } else {
      setOpenDiaEmail(true);
    }
  };
  const navButton = () => {
    return (
      <div id="navItin">
        {/* <button onClick={handleClickReview}>Review</button> */}
        {/* <button>Save itnerary</button> */}
        <IconButton
          onClick={handleClickReview}
          style={{ backgroundColor: "#09BC8A" }}
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          onClick={handleClickShare}
          style={{ backgroundColor: "#09BC8A" }}
        >
          <ShareIcon />
        </IconButton>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div class="top" style={{ marginTop: "25px", padding: "0px" }}>
        <div class="menu" style={{ margin: "0px", padding: "0px" }}>
          {/* <TextField
            name="ItineraryName"
            id="ItineraryName"
            // defaultValue={value}
            value={ItineraryName}
            margin="none"
            style={{ margin: "0px", padding: "0px" }}
            onChange={(e) => setItineraryName(e.target.value)}
            disabled={!editMode}
            className={classes.textField}
            InputProps={{
              classes: {
                disabled: classes.disabled,
              },
            }}
          /> */}

          {/* <div
            class="time"
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0px",
              padding: "0px",
            }}
          >
            <TextField
              name="ItineraryName"
              id="ItineraryName"
              // defaultValue={value}
              value={ItineraryName}
              margin="none"
              style={{ margin: "0px", padding: "0px" }}
              onChange={(e) => setItineraryName(e.target.value)}
              disabled={!editMode}
              className={classes.textField}
              InputProps={{
                classes: {
                  disabled: classes.disabled,
                },
              }}
            />
            <TextField
              name="ItineraryDate"
              id="ItineraryDate"
              type="date"
              style={{ margin: "0px", padding: "0px" }}
              value={ItineraryDate}
              margin="none"
              onChange={(e) => {
                setItinerarydate(e.target.value);
              }}
              disabled={!editMode}
              className={classes.textField}
              InputProps={{
                classes: {
                  disabled: classes.disabled,
                },
              }}
            />
            <TextField
              name="ItineraryDate"
              id="ItineraryDate"
              type="time"
              margin="none"
              style={{ margin: "0px", padding: "0px" }}
              value={ItineraryTime}
              onChange={(e) => {
                setItineraryTime(e.target.value);
              }}
              margin="normal"
              disabled={!editMode}
              className={classes.textField}
              InputProps={{
                classes: {
                  disabled: classes.disabled,
                },
              }}
            />
          </div> */}
        </div>
      </div>
      <div
        class="time"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0px",
          padding: "0px",
        }}
      >
        <TextField
          name="ItineraryName"
          id="ItineraryName"
          // defaultValue={value}
          value={ItineraryName}
          margin="none"
          style={{ margin: "0px", padding: "0px" }}
          onChange={(e) => setItineraryName(e.target.value)}
          disabled={!editMode}
          className={classes.textField}
          InputProps={{
            classes: {
              disabled: classes.disabled,
            },
          }}
        />
        <TextField
          name="ItineraryDate"
          id="ItineraryDate"
          type="date"
          style={{ margin: "0px", padding: "0px" }}
          value={ItineraryDate}
          margin="none"
          onChange={(e) => {
            setItinerarydate(e.target.value);
          }}
          disabled={!editMode}
          className={classes.textField}
          InputProps={{
            classes: {
              disabled: classes.disabled,
            },
          }}
        />
        <TextField
          name="ItineraryDate"
          id="ItineraryDate"
          type="time"
          margin="none"
          style={{ margin: "0px", padding: "0px" }}
          value={ItineraryTime}
          onChange={(e) => {
            setItineraryTime(e.target.value);
          }}
          margin="normal"
          disabled={!editMode}
          className={classes.textField}
          InputProps={{
            classes: {
              disabled: classes.disabled,
            },
          }}
        />
      </div>

      {/* <div class="temp">
          79F<i class="wi wi-solar-eclipse"></i>
        </div> */}
      <div class="middle">
        {editMode ? (
          <InputAdornment position="end">
            <IconButton
              onClick={handleDone}
              style={{ backgroundColor: "#09BC8A" }}
            >
              <DoneIcon />
            </IconButton>
          </InputAdornment>
        ) : (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClick}
              style={{ backgroundColor: "#09BC8A" }}
            >
              <Edit />
            </IconButton>
          </InputAdornment>
        )}
        <div style={{ marginTop: "35px", marginLeft: "10px" }}>
          <ItneraryList time={ItineraryTime} />
          {currentItinerary.length ? (
            navButton()
          ) : (
            <p
              style={{ marginTop: "50px", color: "crimson", fontSize: "20px" }}
            >
              Add Items to Itinerary
            </p>
          )}
          <LoginDialog open={opendia} onClose={handleDiaClose} />
          <ShareDialog open={opendiaEmail} onClose={handleEmailDiaClose} />
        </div>
      </div>
    </div>
  );
}
