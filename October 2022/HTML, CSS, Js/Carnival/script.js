'use strict';function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
const root = document.querySelector('#root');

const imgBucket = {
  "brandy": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/brandy.png",
  "hotSauce": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/hot-sauce.png",
  "hypnotiq": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/hypnotiq.png",
  "littleKetchup": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/little-ketchup.png",
  "littleMustard": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/little-mustard.png",
  "moonshine": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/moonshine.png",
  "peachVodka": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/peach-vodka.png",
  "pepper": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/pepper.png",
  "purplePoison": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/poison-purple.png",
  "greenPoison": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/poison-green.png",
  "orangePoison": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/poison-orange.png",
  "pinkPoison": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/poison-pink.png",
  "fuschiaPoison": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/poison-fuschia.png",
  "bluePoison": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/poison-blue.png",
  "vinegar": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/vinegar.png",
  "whiskey": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/whiskey.png",
  "wine": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/81484/wine.png" };


class CarnivalEnv extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "calcParentWidth",













    () => {
      const width = this.containerRef.current.clientWidth;
      this.setState({
        containerWidth: width,
        population: Math.ceil(width / this.state.childSize) + 2 });

    });this.containerRef = React.createRef();this.state = { containerWidth: undefined, population: 0, childSize: 200 };}componentDidMount() {window.addEventListener('resize', this.calcParentWidth);this.calcParentWidth();}

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "CarnivalEnv" }, /*#__PURE__*/
      React.createElement("div", { className: "CarnivalEnv__booth", ref: this.containerRef }, /*#__PURE__*/
      React.createElement(BottleRow, { imgSequence: ['brandy', 'hotSauce', 'hypnotiq', 'wine', 'purplePoison'], unitSize: this.state.childSize, width: this.state.containerWidth, direction: 'left', speed: 41, numChildren: this.state.population }), /*#__PURE__*/
      React.createElement(BottleRow, { imgSequence: ['fuschiaPoison', 'littleMustard', 'moonshine', 'bluePoison', 'vinegar', 'littleKetchup'], unitSize: this.state.childSize, width: this.state.containerWidth, direction: 'right', speed: 30, numChildren: this.state.population }), /*#__PURE__*/
      React.createElement(BottleRow, { imgSequence: ['peachVodka', 'pepper', 'orangePoison', 'vinegar', 'greenPoison'], unitSize: this.state.childSize, width: this.state.containerWidth, direction: 'left', speed: 20, numChildren: this.state.population }))));



  }}


class BottleRow extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "startScroll",































    () => {
      this.scrollInterval = setInterval(
      () => this.scrollRow(),
      this.props.speed);

    });_defineProperty(this, "stopScroll",

    () => {
      clearInterval(this.scrollInterval);
    });_defineProperty(this, "addNextChild",

    i => {
      if (this.props.direction === 'left') {
        this.setState(state => ({
          componentSequence: [...state.componentSequence, this.getNextChild(i)] }));

      } else {
        this.setState(state => ({
          componentSequence: [this.getNextChild(i), ...state.componentSequence] }));

      }
    });_defineProperty(this, "getNextChild",

    i => {
      const nextChild = this.getChild.next();
      return /*#__PURE__*/React.createElement(Bottle, { imgSrc: imgBucket[nextChild.value], alt: "bottle img", unitSize: this.props.unitSize, key: 'bottle' + i });
    });_defineProperty(this, "removeFirstChild",

    () => {
      const arr = this.state.componentSequence;
      if (this.props.direction === 'left') {
        arr.shift();
      } else {
        arr.pop();
      }
      this.setState({ componentSequence: arr });
    });_defineProperty(this, "scrollRow",

    () => {
      let dirFactor = this.props.direction === 'left' ? -1 : 1;
      if (this.state.scrollDistance * dirFactor === this.props.unitSize) {
        console.log('hit here');
        this.removeFirstChild();
        this.setState({ scrollDistance: 0 });
        this.incrementor += 1;
        this.addNextChild(this.incrementor);
      } else {
        if (this.props.direction === 'left') {
          this.setState(state => ({
            scrollDistance: state.scrollDistance - 1 }));

        } else {
          this.setState(state => ({
            scrollDistance: state.scrollDistance + 1 }));

        }
      }
    });this.innerRowRef = React.createRef();this.sqLength = this.props.imgSequence.length;this.scrollInterval;this.getChild = this.generateNextChild();this.incrementor = undefined;this.state = { scrollDistance: 0, componentSequence: new Array() };}componentDidMount() {this.innerRowRef.current.style[this.props.direction] = this.state.scrollDistance;this.startScroll();}componentDidUpdate() {if (this.props.numChildren !== 0 && this.state.componentSequence.length === 0) {for (let i = 0; i < this.props.numChildren; i++) {this.addNextChild(i);}}if (this.incrementor === undefined) {this.incrementor = this.props.numChildren;}}componentWillUnmount() {this.stopScroll();}

  *generateNextChild() {
    let index = 0;
    while (true) {
      if (index > this.sqLength - 1) {
        index = 0;
      }
      yield this.props.imgSequence[index++];
    }
  }

  render() {
    const styles = {
      justifyContent: 'flex-' + (this.props.direction === 'left' ? 'start' : 'end') };

    const rowStyles = {
      ...styles,
      transform: `translateX(${this.state.scrollDistance}px)` };

    return /*#__PURE__*/(
      React.createElement("div", { className: "BottleRow", style: styles, onMouseOver: this.stopScroll, onMouseOut: this.startScroll }, /*#__PURE__*/
      React.createElement("div", { className: "BottleRow__inner", ref: this.innerRowRef, style: rowStyles },
      this.state.componentSequence)));



  }}


function Bottle(props) {
  const styles = {
    height: props.unitSize + 'px',
    width: props.unitSize + 'px' };

  return /*#__PURE__*/(
    React.createElement("div", { className: "Bottle", style: styles }, /*#__PURE__*/
    React.createElement("img", { src: props.imgSrc, alt: props.alt, className: "Bottle__img" })));


}

let main = React.createElement(CarnivalEnv);
ReactDOM.render( /*#__PURE__*/React.createElement(CarnivalEnv, null), root);