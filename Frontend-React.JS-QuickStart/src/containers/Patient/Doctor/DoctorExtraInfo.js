import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './DoctorExtraInfo.scss';
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';


class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailsInfo: false
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    toggleDetailInfo = (status) => {
        this.setState({
            isShowDetailsInfo: status
        })
    }

    render() {
        let { isShowDetailsInfo } = this.state
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className='text-address'>ĐỊA CHỈ PHÒNG KHÁM</div>
                    <div className='name-clinic'>Phòng khám chuyên khoa Da Liễu</div>
                    <div className='detail-address'>207 Phố Huế, Hà Nội</div>
                </div>
                <div className="content-down">
                    {!isShowDetailsInfo &&
                        <div className="short-info">
                            GIÁ KHÁM.
                            <span onClick={() => this.toggleDetailInfo(!isShowDetailsInfo)}>Xem chi tiết</span>
                        </div>
                    }
                    {isShowDetailsInfo &&
                        <>
                            <div className="title-price">GIÁ KHÁM: </div>
                            <div className="detail-info">
                                <div className="price">
                                    <span className="left">Giá khám: </span>
                                    <span className="right">250.000đ</span>
                                </div>
                                <div className="note">
                                    Được ưu tiên
                                </div>
                            </div>
                            <div className="payment">
                                Người bệnh có thể thanh toán bằng hình thức tiền mặt hoặc quẹt thẻ
                            </div>
                            <div className="hide-price"><span onClick={() => this.toggleDetailInfo(!isShowDetailsInfo)}>Ẩn bảng giá</span></div>
                        </>
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DoctorExtraInfo));