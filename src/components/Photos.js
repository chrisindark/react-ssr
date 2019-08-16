import './Photos.scss';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {Waypoint} from 'react-waypoint';
import Carousel from 'nuka-carousel';


class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      page: 0,
      limit: 10,
      totalCount: 0,
      currentSlideIndex: 0, // track the index of the current slide
      thresholdIndex: 8
    }
  }

  componentDidMount() {
    if (this.props.photos.length > 0) {
      const newState = {
        photos: this.props.photos.slice(0, 10),
        totalCount: this.props.photosTotalCount,
        page: 1,
        limit: 10
      };
      this.setState(newState);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (this.props.photos.length > 0 && prevProps.photos.length === 0) {
    //   const newState = {
    //     photos: this.props.photos.slice(0, 10),
    //     totalCount: this.props.photosTotalCount,
    //     page: 1,
    //     limit: 10
    //   };
    //   this.setState(newState);
    // }
  }

  render() {
    if (!this.props.photos && !this.props.photos.length) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    return (
      <div>
        <p>Photos:</p>

        {/*{this.renderPhotos()}*/}
        {this.renderPhotosCarousel()}
      </div>
    )
  }

  renderPhotos = () => {
    const { photos } = this.state;

    return (
      <div>
        {photos.map((p, index) => this.renderPhoto(p, index))}
      </div>
    );
  };

  renderPhoto = (p, index) => {
    return (
      <div key={p.id} style={{padding: '10px'}}>
        <p style={{margin: '0px'}}>{p.title}</p>
        {this.renderImage(p)}
      </div>
    )
  };

  renderImage = (p) => {
    return (
      <img key={p.id} style={{margin: '0px'}} src={p.thumbnailUrl} alt={'thumbnailUrl'} />
    );
  };

  renderPhotosCarousel = () => {
    const { photos } = this.state;

    return (
      <div style={{height: '200px'}} className={'photosCarousel'}>
        <Carousel beforeSlide={this.handleBeforeSlide} afterSlide={this.handleAfterSlide}
                  slideIndex={this.state.currentSlideIndex}>
          {photos.map((p, index) => this.renderImage(p, index))}
        </Carousel>
      </div>
    );
  };

  onEnter = (currentSlideIndex) => {
    // console.log('entered');
    const newState = {};
    // if (currentSlideIndex) {
    //   newState.currentSlideIndex = currentSlideIndex;
    // }
    const startIndex = this.state.page * this.state.limit;
    const endIndex = (this.state.page + 1) * this.state.limit;

    if (startIndex <= this.props.photosTotalCount) {
      newState.photos = this.state.photos.concat(this.props.photos.slice(startIndex, endIndex));
      newState.page = this.state.page + 1;
    }

    this.setState(newState);
  };

  onLeave = () => {
    // console.log('left');
  };

  handleBeforeSlide = (index) => {
    // console.log('before slide');
  };

  handleAfterSlide = (index) => {
    // console.log('after slide');
    // with every render triggered, check if there is a need to lazy load new data
    this.setState({
      currentSlideIndex: index
    });
    this.checkForGettingNewData();
  };

  checkForGettingNewData = () => {
    if (this.state.currentSlideIndex >= this.state.thresholdIndex * this.state.page) {
      this.onEnter();
    }
  }
}

const mapStateToProps = state => ({
  photos: state.photos.photos,
  photosTotalCount: state.photos.totalCount
});

// map api call which can be conditionally triggered
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
