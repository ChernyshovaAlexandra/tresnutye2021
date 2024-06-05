import React from "react";
import { connect } from "react-redux";
import {
  setShopPage,
  setSponsoryPage,
  setForm,
  openScaner,
  handleCheckToken,
  setScanerForm,
  GetAllChecks,
  getWinners,
  selectShop
} from "./store/actions";

export const Hoc = (Components) => {
  const mapStateToProps = (state) => ({ state });
  const mapDispatchToProps = (dispatch) => {
    return {
      selectShop: (action) => dispatch(selectShop(action)),
      setShopPage: (action) => dispatch(setShopPage(action)),
      setSponsoryPage: (action) => dispatch(setSponsoryPage(action)),
      setForm: (action) => dispatch(setForm(action)),
      openScaner: (action) => dispatch(openScaner(action)),
      handleCheckToken: (userToken) => dispatch(handleCheckToken(userToken)),
      setScanerForm: (action) => dispatch(setScanerForm(action)),
      GetAllChecks: () => dispatch(GetAllChecks()),
      getWinners: () => dispatch(getWinners())
    };
  };

  class HOComponent extends React.Component {
    render() {
      return <Components {...this.props} />;
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(HOComponent);
};
