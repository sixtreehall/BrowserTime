import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
  Popover,
  Typography,
  IconButton,
  Button,
  Divider,
  Paper,
  InputBase,
  Select,
  MenuItem,
  ListSubheader,
  ListItemText,
  Switch,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
} from '@material-ui/core';
import { THEMES } from '../../lib/constants';
import { SettingsContext } from '../../context/SettingsContext';

const CustomInput = withStyles((theme) => ({
  input: {
    width: 210,
    padding: '5px 10px',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    fontSize: 16,
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  content: {
    width: 350,
    margin: '8px 16px',
  },
  settings: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(2),
  },
  formLabel: {
    marginBottom: theme.spacing(2),
  },
  root: {
    maringBottom: 10,
    padding: '2px 8px',
    display: 'flex',
    alignItems: 'center',
  },
  accountType: {
    padding: '10px 8px',
    marginBottom: theme.spacing(2),
  },
  upgradeBtn: {
    marginLeft: theme.spacing(2),
  },
  iconButton: {
    '&:hover': {
      background: 'none',
    },
  },
  themeSampleMain: {
    height: 20,
    width: 20,
    backgroundColor: theme.palette.background.dark,
  },
  themeSamplePrimary: {
    height: 20,
    width: 20,
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
  divider: {
    height: 28,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const SettingsMenu = ({ open, handleClose, anchorEl }) => {
  const { settingsState, updateSettings } = useContext(SettingsContext);
  const classes = useStyles();

  const handleThemeChange = (e) => {
    updateSettings(e.target.name, e.target.value);
  };

  const handleShowResultsCountChange = (e) => {
    updateSettings(e.target.name, !settingsState.showResultsCount);
  };

  const id = open ? 'settings-popover' : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <div className={classes.content}>
        <Typography variant="h4" align="left">Settings</Typography>
        <div className={classes.settings}>
          <FormLabel component="legend" className={classes.formLabel}>Account Type</FormLabel>
          <Paper component="form" className={`${classes.root} ${classes.accountType}`}>
            <Typography variant="h5">{settingsState.accountType}</Typography>
            <Button variant="outlined" size="small" className={classes.upgradeBtn}>Upgrade to Pro</Button>
          </Paper>
          <FormLabel component="legend" className={classes.formLabel}>Theme</FormLabel>
          <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} disableRipple disableFocusRipple size="small" aria-label="search">
              <span className={classes.themeSamplePrimary} />
              <span className={classes.themeSampleMain} />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <Select
              name="theme"
              labelId="settings-select-label"
              id="settings-select"
              value={settingsState.theme}
              onChange={handleThemeChange}
              input={<CustomInput />}
            >
              <ListSubheader>Basic</ListSubheader>
              {Object.keys(THEMES.free).map((theme) => (
                <MenuItem key={theme} value={theme}>
                  <ListItemText primary={theme} />
                </MenuItem>
              ))}
              <ListSubheader color="primary">Premium themes</ListSubheader>
              {Object.keys(THEMES.premium).map((theme) => (
                <MenuItem key={theme} value={theme}>
                  <ListItemText primary={theme} />
                </MenuItem>
              ))}
            </Select>
          </Paper>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.formLabel}>History</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={settingsState.showResultsCount} onChange={handleShowResultsCountChange} name="showResultsCount" />}
                label="Show results count"
              />
            </FormGroup>
          </FormControl>
        </div>
      </div>
    </Popover>
  );
};

SettingsMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.shape({}),
};

SettingsMenu.defaultProps = {
  anchorEl: null,
};

export default SettingsMenu;
