import React from "react";
import TextField from "@material-ui/core/TextField";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputMask from "react-input-mask";
import API from "../../utils/API";
import question from "./img/quest.png";
import check from "./img/check.jpg";
import SystemMessage from "./SystemMessage";

const useStylesReddit = makeStyles((theme) => ({
  root: {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#fcfcfb",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff",
    },
    "&$focused": {
      backgroundColor: "#fff",
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));

function RedditTextField(props) {
  const classes = useStylesReddit();
  return (
    <TextField InputProps={{ classes, disableUnderline: true }} {...props} />
  );
}

export default class HandleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      example: false,
      fn: "",
      fp: "",
      doc_number: "",
      date: "",
      inputError: "",
      message: false,
    };
  }
  closeAll = () => {
    const { openScaner, setForm, setScanerForm } = this.props;
    openScaner(false);
    setScanerForm(false);
    setForm(false);
  };

  hideSystemMessage = () => {

    if (this.state.name === 'Чек не принят') {
      this.setState({
        example: false,
        name: false,
        message: false,
      })
    }

    if (this.state.name === 'Чек принят') {
      const { openScaner, setForm, setScanerForm } = this.props;
      openScaner(false);
      setScanerForm(false)
      this.setState({
        example: false,
        name: false,
        message: false,
      })
    }
  }

  handleClick = () => {
    const { setScanerForm } = this.props;
    setScanerForm(false);

  };

  handleScan = async (e) => {
    const { fn, fp, doc_number, date } = this.state;
    if (
      fn.length > 0 &&
      fp.length > 0 &&
      doc_number.length > 0 &&
      date.length > 0
    ) {
      e.preventDefault();
      const dateLength = this.state.date
        .replaceAll(".", "")
        .replaceAll(":", "")
        .replaceAll(" ", "").length;
      if (dateLength === 10) {
        this.setState({
          inputError: "",
          message: "Загружаем...",
        });
        const year = date.slice(6, 8);
        const mounth = date.slice(3, 5);
        const day = date.slice(0, 2);
        const time = date.slice(9).replace(":", "");
        const trueData = `20${year}${mounth}${day}T${time}`;
        let _this = this
        let token = window.localStorage.getItem('userToken')
        window.ym(10665502, "reachGoal", "mandarim-check");
        await API.post("/checks", {
          date: trueData,
          fn,
          fp,
          doc_number,
        }, { headers: { "Authorization": `Bearer ${token}` } })

          .then(
            (response) => {
              if (response.data.success) {
                _this.setState({
                  message: 'Сохраняйте чек до конца акции! Следите за статусом в личном кабинете. Если вы выиграете приз, то мы обязательно пришлем вам СМС.',
                  name: 'Чек принят',
                  fn: "",
                  fp: "",
                  doc_number: "",
                  date: "",
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
                message: "Неверный формат введенных данных",
                name: "Чек не принят",
              });
            }
          );

        // }

      } else {
        this.setState({
          inputError: "Неверный формат данных",
        });
      }
    }
  };

  showHow = () => {
    this.setState({
      example: !this.state.example,
    });
  };

  setFormValue = (e, input) => {
    if (input === "date") {
      this.setState({ date: e.target.value });
    }
    const newValue = {};
    if (!/\D/.test(e.target.value)) {
      newValue[input] = e.target.value;
      this.setState(newValue);
    }
  };

  render() {
    const {
      example,
      inputError,
      message,
      fn,
      fp,
      doc_number,
      phone,
      name
    } = this.state;
    return (
      <div className="handleScanContainer">
        <div className="close-btn__container cursor-pointer">
          <div className="close-btn" onClick={() => this.handleClick()}>
            <span></span>
            <span></span>
          </div>
        </div>
        {!message ? (
          <div className="handleScanContainer__inner">
            <div className="row justify-content-center">
              <div className="col-lg-auto">
                {example ? (
                  <h2>
                    Расположение данных <br />
                    на чеке:
                  </h2>
                ) : (
                  <h2 className='text-orange text-bold text-xl golos'>Ввести код чека вручную</h2>
                )}
              </div>
            </div>

            {example ? (
              <>
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <div className="imgContainer-scan">
                      <img src={check} alt="" />
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-lg-auto">

                    <div className="flex justify-center handleScanContainer__inner--input">
                      <button className='btn my-8 mx-auto' onClick={() => this.showHow()}>
                        <div className='bg'></div>
                        <span>понятно</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <form className="row justify-content-center">
                <div className="col-lg-12 handleScanContainer__inner--input ">
                  <div className="desktop">
                    <RedditTextField
                      label="ФД"
                      required
                      variant="filled"
                      id="fn-input"
                      onChange={(e) => this.setFormValue(e, "doc_number")}
                      value={doc_number}
                    />
                  </div>
                  <div className="mobile row">
                    <div className="col-lg-10">
                      <RedditTextField
                        label="ФД"
                        required
                        variant="filled"
                        id="fn-input"
                        onChange={(e) => this.setFormValue(e, "doc_number")}
                        value={doc_number}
                      />
                    </div>
                    <div className="col-lg-2" onClick={() => this.showHow()}>
                      <img src={question} alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 handleScanContainer__inner--input">
                  <div className="desktop">
                    <RedditTextField
                      label="ФП"
                      required
                      variant="filled"
                      id="fp-input"
                      onChange={(e) => this.setFormValue(e, "fp")}
                      value={fp}
                    />
                  </div>
                  <div className="mobile row">
                    <div className="col-lg-10">
                      <RedditTextField
                        label="ФП"
                        required
                        variant="filled"
                        id="fp-input"
                        onChange={(e) => this.setFormValue(e, "fp")}
                        value={fp}
                      />
                    </div>
                    <div className="col-lg-2" onClick={() => this.showHow()}>
                      <img src={question} alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 handleScanContainer__inner--input">
                  <div className="desktop">
                    <RedditTextField
                      label="ФН"
                      required
                      variant="filled"
                      id="doc_number-input"
                      onChange={(e) => this.setFormValue(e, "fn")}
                      value={fn}
                    />
                  </div>
                  <div className="mobile row">
                    <div className="col-lg-10">
                      <RedditTextField
                        label="ФН"
                        required
                        variant="filled"
                        id="doc_number-input"
                        onChange={(e) => this.setFormValue(e, "fn")}
                        value={fn}
                      />
                    </div>
                    <div className="col-lg-2" onClick={() => this.showHow()}>
                      <img src={question} alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 handleScanContainer__inner--input">
                  <div className="desktop">
                    <InputMask
                      id="date-input"
                      mask="99.99.99 99:99"
                      value={phone}
                      disabled={false}
                      maskChar=" "
                      onChange={(e) => this.setFormValue(e, "date")}
                    >
                      {() => (
                        <RedditTextField
                          required
                          label="Дата и время покупки"
                          variant="filled"
                          helperText={inputError}
                        />
                      )}
                    </InputMask>
                  </div>
                  <div className="mobile row">
                    <div className="col-lg-10">
                      <InputMask
                        id="date-input"
                        mask="99.99.99 99:99"
                        value={phone}
                        disabled={false}
                        maskChar=" "
                        onChange={(e) => this.setFormValue(e, "date")}
                      >
                        {() => (
                          <RedditTextField
                            required
                            label="Дата и время покупки"
                            variant="filled"
                            helperText={inputError}
                          />
                        )}
                      </InputMask>
                    </div>
                    <div className="col-lg-2" onClick={() => this.showHow()}>
                      <img src={question} alt="" />
                    </div>
                  </div>
                  <div className="row justify-content-center errorMessage mgtp-1">
                    <div className="col">
                      <p>{message}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center handleScanContainer__inner--input">

                  <button className='btn my-8 mx-auto' onClick={this.handleScan}>
                    <div className='bg'></div>
                    <span>готово</span>
                  </button>
                </div>
              </form>
            )}
            {!example && (
              <div className="row justify-content-center example">
                <div className="col" onClick={() => this.showHow()}>
                  <p>Как найти данные на чеке?</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <SystemMessage
              data={{
                message: name,
                description: message,
              }}
            />
            <div className="row">
              <div className="flex justify-center handleScanContainer__inner--input">
                <button className='btn my-8 mx-auto' onClick={() => this.hideSystemMessage()}>
                  <div className='bg'></div>
                  <span>понятно</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
