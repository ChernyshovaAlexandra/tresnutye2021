import React from "react";
import { connect } from "react-redux";
import {
  editUserInfo,
  loading,
  setForm,
  quitAccount,
  openScaner,
  showCheckList,
} from "../../store/actions";
import AllChecks from "./AllChecks";

class UserAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastName: "",
    };
  }
  init = () => {
    const { userName, userLastName } = this.props;
    this.setState({
      name: userName,
      lastName: userLastName,
    });
  };
  componentDidMount() {
    this.init();
  }
  componentWillReceiveProps() {
    this.init();
  }

  edit = () => {
    const { loading, editUserInfo } = this.props;
    loading(true);
    setTimeout(() => {
      editUserInfo(true);
      loading(false);
    }, 800);
  };

  quit = () => {
    document.querySelector("#root").classList.remove("scrolled");
    const { quitAccount, loading } = this.props;
    localStorage.clear();
    loading(true);
    setTimeout(() => {
      quitAccount();
      loading(false);
    }, 800);
  };
  render() {
    const {
      openScaner,
      userName,
      userLastName,
      checks,
      showCheckList,
      checkList,
      checksMessage,
    } = this.props;
    const token = localStorage.getItem("userToken");
    return (
      <div className="userAccount">
        {!checkList ? (
          <>
            <header className="animate__animated animate__fadeInLeft">
              <div className="row justify-content-center">
                <div className="col-lg-auto">
                  <h2 className="text-orange uppercase golos text-3xl mb-4">Личный кабинет </h2>
                </div>
              </div>
            </header>
            <div>
              <div className="inner flex flex-row flex-wrap justify-between p-4">
                <div className="info">
                  <h3 className='text-orange text-2xl text-bold ubuntu mb-5'>
                    Здравствуйте,{" " + userName + " " + userLastName}
                  </h3>

                  <p className='ubuntu text'>
                    Чеки, участвующие в акции, добавляются следующим способом:
                    <br />
                    1) при сканировании или вводе данных в ручную на сайте;
                    <br />
                    2) <b>автоматически</b> при
                    использовании карты «Клуба Друзей ДИКСИ» во время покупки;
                    <br />
                    3) <b>автоматически</b> при заказе
                    доставки;
                    <br />
                    Обновление информации о чеках происходит{" "}
                      <b>раз в сутки</b>.
                    </p>
                  <p className="ubuntu text">
                    Напоминаем о необходимости указывать реальные данные, а также{" "}
                    <b>сохранять оригинал чека</b> до
                  конца акции.
                  </p>
                </div>
                <div className="editing-for-mob">
                  <div className="edit">
                    <div className='flex flex-col max-w-xs'>
                        <div className="col-lg-auto mob-only max-w-xs">
                          <button className="btn mb-8 max-w-xs"
                            onClick={() => showCheckList(true)}
                          >
                            <div className="bg"></div>
                            <span>Мои чеки</span>
                          </button>
                        </div>
                        <button className="btn mb-8 mt max-w-xs"
                          onClick={() => {
                            openScaner(true);
                          //   window.ym(10665502,'reachGoal','mandarim-add-check-button')
                           }}
                        >
                          <div className="bg"></div>
                          <span>добавить чек</span>
                        </button>
                        {/*<div
                          className="tooltip2"
                          style={{
                            zIndex: "100000",
                            right: "0",
                            transform: "none",
                            left: 0,
                          }}
                        >
                          {" "}
                          Акция завершена
                        </div>*/}
                        <button className="btn mb-8 max-w-xs"
                          onClick={() => this.edit()}
                        >
                          <div className="bg"></div>
                          <span>Редактировать</span>
                        </button>
                        <button className="btn mb-8 max-w-xs"
                          onClick={() => this.quit()}
                        >
                          <div className="bg"></div>
                          <span>Выход</span>
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="userAccount__check animate__animated animate__fadeInLeft desktop-only">
              <div className="row  justify-content-center">
                <div
                  className="col-lg-auto navigation-form"
                  onClick={() => showCheckList(true)}
                >
                  <h2 className="text-orange text-xl text-bold">Мои чеки &#10148;</h2>
                </div>
              </div>
            </div>
          </>
        ) : (
          <AllChecks
            checks={checks}
            onClick={() => showCheckList(false)}
            checksMessage={checksMessage}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    edit: state.store.edit,
    userName: state.store.userName,
    userLastName: state.store.userLastName,
    userEmail: state.store.userEmail,
    userBirthDate: state.store.userBirthDate,
    userPhone: state.store.userPhone,
    userCity: state.store.userCity,
    loader: state.store.loader,
    form: state.store.form,
    checkList: state.store.checkList,
    checks: state.store.checks,
    checksMessage: state.store.checksMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUserInfo: (action) => dispatch(editUserInfo(action)),
    loading: (action) => dispatch(loading(action)),
    setForm: (action) => dispatch(setForm(action)),
    quitAccount: (action) => dispatch(quitAccount(action)),
    openScaner: (action) => dispatch(openScaner(action)),
    showCheckList: (action) => dispatch(showCheckList(action)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
