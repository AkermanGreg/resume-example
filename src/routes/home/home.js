import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TimelineLite} from 'gsap';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../common/actions';
import ImageSection from '../../components/imageSection';
import ContentSection from '../../components/contentSection';
import backgroundImage from '../../common/images/snaer_seljan_thoroddsson.jpg';
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
    this.animateStart();
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
      .set([firstName, lastName], {rotationX: -45})
      .to([left, right, mobileImage], 1.5, {
        x: '0%',
        opacity: 1,
        ease: Power2.easeOut, // eslint-disable-line
      })
      .to(
        firstName,
        1.5,
        {
          y: '0%',
          opacity: 1,
          transformOrigin: '0 50%',
          rotationX: 0,
          ease: Power2.easeOut, // eslint-disable-line
        },
        0.8,
      )
      .to(
        lastName,
        1.5,
        {
          y: '0%',
          opacity: 1,
          transformOrigin: '0 50%',
          rotationX: 0,
          ease: Power2.easeOut, // eslint-disable-line
        },
        1,
      )
      .to(
        [github, githubMobile, lang],
        1,
        {y: '0%', opacity: 1, ease: Power2.easeOut}, // eslint-disable-line
        1,
      )
      .play();
  }

  changeLanguage() {
    this.props.actions.addPageLoading();
    this.props.actions.removePageLoading();
    setTimeout(() => {
      this.props.actions.setLanguage(
        this.props.common.lang === 'en' ? 'is' : 'en',
      );
    }, 300);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.common.pageRevealer) {
      this.state.tl.timeScale(3).reverse();
    }

    if(!this.state.dirty) {
      console.log('Snær');
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="name">
          <span ref="firstName">{this.props.translations.firstName}</span>
          <span ref="lastName">{this.props.translations.lastName}</span>
        </h1>
        <div
          ref="mobileImage"
          className="mobile-background"
          style={{backgroundImage: `url(${backgroundImage})`}}
        >
          <div className="overlay" />
        </div>
        <span
          ref="lang"
          className="language-wrapper"
          onClick={() => this.changeLanguage()}
        >
          <svg className="icon-globe">
            <use href="#icon-globe" />
          </svg>
          <span className="language">
            {this.props.common.lang === 'en' ? 'Icelandic' : 'English'}
          </span>
        </span>
        <a
          ref="githubMobile"
          href="https://github.com/snaerth?tab=repositories"
          className="github-link mobile"
        >
          <svg className="icon-github">
            <use href="#icon-github" />
          </svg>
        </a>
        <div className="col-50">
          <div className="left" ref="left">
            <ContentSection />
          </div>
        </div>
        <div className="col-50">
          <a
            ref="github"
            href="https://github.com/snaerth?tab=repositories"
            className="github-link"
          >
            <svg className="icon-github">
              <use href="#icon-github" />
            </svg>
          </a>
          <div className="right" ref="right">
            <ImageSection />
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
  return {common: state.common, translations: state.common.translations};
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
