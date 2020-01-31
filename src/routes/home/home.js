import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TimelineLite, Power2 } from 'gsap';
import { bindActionCreators } from 'redux';
import imagesLoaded from 'imagesloaded';
import * as actionCreators from '../../common/actions';
import ImageSection from '../../components/imageSection';
import ContentSection from '../../components/contentSection';
import backgroundImage from '../../common/images/greg-image.jpeg';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: new TimelineLite(),
      dirty: false,
    };
  }

  componentDidMount() {
    const self = this;
    imagesLoaded(this.refs.mobileImage, { background: true }, () => {
      self.props.actions.removePageLoading();
      self.animateStart();
    });
  }

  animateStart() {
    const tl = this.state.tl;
    const {
      left,
      right,
      firstName,
      lastName,
      github,
      githubMobile,
      lang,
      mobileImage,
    } = this.refs;

    tl
      .set([firstName, lastName], { rotationX: -45 })
      .to([left, right, mobileImage], 1.5, {
        x: '0%',
        opacity: 1,
        ease: Power2.easeOut,
      })
      .to(
        firstName,
        1.5,
        {
          y: '0%',
          opacity: 1,
          transformOrigin: '0 50%',
          rotationX: 0,
          ease: Power2.easeOut,
        },
        0.8
      )
      .to(
        lastName,
        1.5,
        {
          y: '0%',
          opacity: 1,
          transformOrigin: '0 50%',
          rotationX: 0,
          ease: Power2.easeOut,
        },
        1
      )
      .to(
        [github, githubMobile, lang],
        1,
        { y: '0%', opacity: 1, ease: Power2.easeOut },
        1
      )
      .play();
  }

  changeLanguage() {
    this.props.actions.addPageLoading();
    setTimeout(() => {
      this.props.actions.removePageLoading();
      this.props.actions.setLanguage(
        this.props.common.lang === 'en' ? 'is' : 'en'
      );
    }, 300);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.common.pageRevealer) {
      this.state.tl.timeScale(3).reverse();
    }

    if (this.props.common.backButtonPressed && !this.state.dirty) {
      this.setState({ dirty: true });
      this.state.tl.timeScale(1).restart();
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="name">
          <span ref="firstName">{this.props.firstName}</span>
          <span ref="lastName">{this.props.lastName}</span>
        </h1>
        <div
          ref="mobileImage"
          className="mobile-background"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />

        <a
          ref="linkedIn"
          target="_blank"
          rel="noreferrer noopener"
          href="https://www.linkedin.com/in/gregoryakerman/"
          className="github-link mobile"
        >
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        <div className="col-50">
          <div className="left" ref="left">
            <ContentSection />
          </div>
        </div>
        <div className="col-50">
          <a
            ref="github"
            href="https://www.linkedin.com/in/gregoryakerman/"
            className="github-link"
          >
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <div className="right" ref="right">
            <ImageSection src={backgroundImage}  />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Maps state to components props
 *
 * @param {Object} state - Application state
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
function mapStateToProps(state) {
  return { common: state.common, translations: state.common.translations };
}

/**
 * Maps dispatch to components props
 *
 * @param {Object} dispatch - Redux dispatch medhod
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
