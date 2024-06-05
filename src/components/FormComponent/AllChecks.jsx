import React from "react";
import prize from "./img/prize.png";
import pepsi from "./img/pepsi.png";
import timer from "./img/timer.png";

export default class AllChecks extends React.Component {


    render() {
        const { checks, checksMessage } = this.props;
        return (
            <>
            <header className="animate__animated animate__fadeInRight">
                <div className="row justify-content-center">
                    <div className="col-lg-auto">
                        <h2 className="text-orange uppercase golos text-3xl mb-8">Мои чеки</h2>
                    </div>
                    <p className='ubuntu text mb-8'>
                        При совершении покупки по карте «Клуб Друзей Дикси», чеки автоматически добавляются в личный кабинет, их не нужно сканировать.
                    </p>
                </div>
            </header>
                <div className="animate__animated animate__fadeInRight">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        {checks && (
                            <div className="check-table">
                                <div className="check-table__row check-table__header text-xl text-orange ubuntu">
                                    <div className="date">Дата</div>
                                    <div>Сумма чека</div>
                                    {/*<div>Розыгрыши</div>*/}
                                    <div>Еженедельный розыгрыш</div>
                                </div>
                                {checks.map((check, index) => (
                                    <div
                                        className={
                                            check.prizes
                                                ? "check-table__row win"
                                                : "check-table__row"
                                        }
                                        key={index}
                                    >
                                        <div className="date">
                                            <b>{check.created_at}</b>
                                        </div>
                                        <div className="summ">{check.sum}&#160;руб.</div>
                                        <div className="weeklyPrize">
                                            <>
                                                <p style={{ marginRight: "5px" }}>
                                                    <span className="systemMessage">
                                                        {check.prizes ? check.prizes : "участвует"}
                                                    </span>
                                                    {check.prizes && <>, </>}
                                                </p>
                                            </>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {checksMessage && <p>{checksMessage}</p>
                        }
                    </div>
                </div>

                    <div className="row userAccount__check justify-content-center">
                        <div
                            className="col-lg-auto navigation-form"
                            onClick={this.props.onClick}
                        >
                            <h2 className="text-orange text-xl text-bold">Личный кабинет &#10148;</h2>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
