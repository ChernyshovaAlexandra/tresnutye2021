import QrReader from "react-qr-reader";
import React from "react";
import HandleForm from "./HandleForm";
import API from "../../utils/API";
import SystemMessage from "./SystemMessage";

export default class Scr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "No result",
      message: false,
      token: "",
      isScannerWork: true,
    };
  }

  closeAll = () => {
    const { openScaner, setForm, setScanerForm } = this.props;
    openScaner(false);
    setScanerForm(false);
    setForm(false);
    document.querySelector("#root").classList.remove("scrolled");
  };

  async componentDidMount() {
    let token = window.localStorage.getItem("userToken");
    if (token) {
      this.setState({
        token: token,
      });
    }
  }

  scan = async (data) => {
    if (data) {
      window.ym(10665502, "reachGoal", "mandarim-check");
      this.setState({
        result: data,
        isScannerWork: false,
      });
      const fn = data.slice(data.indexOf("fn=") + 3, data.indexOf("&i="));
      const fp = data.slice(data.indexOf("fp=") + 3, data.indexOf("&n="));
      const doc_number = data.slice(
        data.indexOf("&i=") + 3,
        data.indexOf("&fp=")
      );
      const date = data.slice(data.indexOf("t=") + 2, data.indexOf("&s="));
      let _this = this;
      let token = window.localStorage.getItem('userToken')
      await API.post("/checks", {
        date,
        fn,
        fp,
        doc_number,
      }, { headers: { "Authorization": `Bearer ${token}` } })
        .then(
          (response) => {
            if (response.data.success) {
              _this.setState({
                message: response.data.message,
                name: "Чек принят",
              });
            }
            else {
              _this.setState({
                message: response.data.message,
                name: "Чек не принят",
              });
            }
          },
          (error) => {
            _this.setState({
              message: "Qr-код, который вы сканируете, не прошел валидацию",
              name: "Чек не принят",
            });
          }
        );
    }
  };

  handleError = (err) => {
    console.error(err);
  };

  handleScan = () => {
    const { setScanerForm } = this.props;
    setScanerForm(true);
  };
  handleClick = () => {
    const { openScaner } = this.props;
    openScaner(false);
  };

  render() {
    const { scanerForm, setScanerForm, openScaner, setForm } = this.props;
    const { message, name } = this.state;
    return (
      <div className="container-fluid">
        <div className="scaner__box">
          {scanerForm ? (
            <HandleForm
              setForm={setForm}
              setScanerForm={setScanerForm}
              openScaner={openScaner}
            />
          ) : (
              <>
                {!message ? (
                  <>
                    <header>
                      <div className="container">
                        <div className="row justify-content-center">
                          <div className="col-lg-auto ">
                            <h3>Сканер штрихкодов</h3>
                          </div>
                        </div>
                      </div>
                    </header>
                    <div className="close-btn__container cursor-pointer">
                      <div
                        className="close-btn"
                        onClick={() => this.handleClick()}
                      >
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                    {this.state.isScannerWork && (
                      <QrReader
                        delay={300}
                        onError={this.handleError}
                        onScan={this.scan}
                      />
                    )}
                    <div className="btnContainer noborder">
                      <button
                        className="btn mandarim-button with-bg no-mandarin"
                        onClick={() => this.handleScan()}
                      >
                        ввести вручную
                    </button>
                    </div>
                  </>
                ) : (
                    <>
                      <div className="handleScanContainer">
                        <div className="close-btn__container cursor-pointer">
                          <div
                            className="close-btn"
                            onClick={() => this.handleClick()}
                          >
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                        <SystemMessage
                          data={{
                            message: name,
                            description: message,
                          }}
                        />
                        <div className="row">
                          <div className="btnContainer noborder">
                            <button
                              className="btn mandarim-button with-bg no-mandarin"
                              onClick={() => this.closeAll()}
                            >
                              понятно
                        </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
              </>
            )}
        </div>
      </div>
    );
  }
}
