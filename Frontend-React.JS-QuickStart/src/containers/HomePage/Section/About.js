import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {
    render() {

        return (
            <div className='section-share section-about'>
                <div className="section-about-header">
                    Truyền thông nói về BookingCare
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            src="//youtube.com/embed/147SkAVXEqM"
                            width="100%"
                            height="467px"
                            title="Youtube video player"
                            frameBorder="0"
                            allow='accelerometer; autoplay; clipboard-write; encrypt-media; gyroscope;'
                            allowFullScreen></iframe>
                    </div>
                    <div className="content-right">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, quibusdam corporis totam quam voluptate ea culpa similique animi laboriosam, quidem aspernatur molestias numquam vero maiores perferendis pariatur nam tenetur! Quidem minima repudiandae excepturi nostrum ullam consequuntur laboriosam iste, iure officiis suscipit consectetur voluptatum optio, odit totam vel exercitationem impedit labore quae libero eos quaerat aperiam cumque distinctio veritatis. Incidunt temporibus porro vitae vero, voluptates quisquam autem tempora optio perferendis placeat repellat, recusandae ullam adipisci. Consequatur doloribus eligendi facere animi aspernatur at cumque dolore consequuntur voluptate ratione, vel repellendus laboriosam recusandae, molestiae corporis ea vitae deserunt! Voluptatum modi porro vel exercitationem?</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
